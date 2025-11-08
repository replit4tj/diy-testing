import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';

/**
 * Vercel Serverless Function for AI Assessment
 * Endpoint: POST /api/assess
 *
 * This function:
 * 1. Receives text from the frontend
 * 2. Sends it to OpenAI for assessment
 * 3. Stores the result in Supabase
 * 4. Returns the assessment to the frontend
 */

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    // Extract text from request body
    const { text } = req.body;

    // Validate input
    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return res.status(400).json({
        error: 'Invalid input. Please provide text to assess.'
      });
    }

    // Check if text is too long (OpenAI has token limits)
    if (text.length > 10000) {
      return res.status(400).json({
        error: 'Text is too long. Please limit to 10,000 characters.'
      });
    }

    // Validate environment variables
    if (!process.env.OPENAI_API_KEY) {
      console.error('Missing OPENAI_API_KEY environment variable');
      return res.status(500).json({
        error: 'Server configuration error. Please contact administrator.'
      });
    }

    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
      console.error('Missing Supabase environment variables');
      return res.status(500).json({
        error: 'Database configuration error. Please contact administrator.'
      });
    }

    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Call OpenAI API for assessment
    console.log('Calling OpenAI API...');
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are a helpful and detailed assessment assistant. Provide constructive, specific, and actionable feedback on the text provided.

Your assessment should include:
1. Overall impression and strengths
2. Areas for improvement with specific examples
3. Suggestions for enhancement
4. A brief summary

Be encouraging but honest. Aim for 3-5 paragraphs of feedback.`
        },
        {
          role: 'user',
          content: text
        }
      ],
      temperature: 0.7,
      max_tokens: 800,
    });

    // Extract the AI's response
    const assessment = completion.choices[0]?.message?.content;

    if (!assessment) {
      throw new Error('No response received from OpenAI');
    }

    console.log('OpenAI assessment received successfully');

    // Initialize Supabase client
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY
    );

    // Store the assessment in database
    console.log('Storing assessment in Supabase...');
    const { data, error: dbError } = await supabase
      .from('assessments')
      .insert([
        {
          user_input: text,
          ai_response: assessment,
        }
      ])
      .select();

    if (dbError) {
      console.error('Supabase error:', dbError);
      // Don't fail the request if database storage fails
      // The user still gets their assessment
      console.warn('Failed to store assessment in database, but proceeding with response');
    } else {
      console.log('Assessment stored successfully:', data);
    }

    // Return the assessment to the frontend
    return res.status(200).json({
      success: true,
      assessment: assessment,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Error in assess endpoint:', error);

    // Handle specific OpenAI errors
    if (error.status === 401) {
      return res.status(500).json({
        error: 'OpenAI API authentication failed. Please check API key configuration.'
      });
    }

    if (error.status === 429) {
      return res.status(429).json({
        error: 'Rate limit exceeded. Please try again in a moment.'
      });
    }

    if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      return res.status(503).json({
        error: 'Service temporarily unavailable. Please try again later.'
      });
    }

    // Generic error response
    return res.status(500).json({
      error: 'An unexpected error occurred while processing your request.',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
