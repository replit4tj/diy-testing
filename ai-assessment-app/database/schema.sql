-- ============================================
-- AI Assessment App - Supabase Database Schema
-- ============================================
--
-- This schema creates the assessments table to store
-- all user submissions and AI-generated assessments
--
-- Created for: ai-assessment-app
-- Database: PostgreSQL (via Supabase)
-- ============================================

-- Create the assessments table
CREATE TABLE IF NOT EXISTS assessments (
  -- Primary key: Auto-generated UUID
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

  -- User's submitted text for assessment
  user_input TEXT NOT NULL,

  -- AI-generated assessment response from OpenAI
  ai_response TEXT NOT NULL,

  -- Timestamp when the assessment was created
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Optional: Track when records are updated
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on created_at for faster sorting and querying
CREATE INDEX IF NOT EXISTS idx_assessments_created_at
ON assessments(created_at DESC);

-- Add a comment to the table
COMMENT ON TABLE assessments IS 'Stores user text submissions and AI-generated assessments';

-- Add comments to columns for documentation
COMMENT ON COLUMN assessments.id IS 'Unique identifier for each assessment';
COMMENT ON COLUMN assessments.user_input IS 'Original text submitted by the user';
COMMENT ON COLUMN assessments.ai_response IS 'AI-generated feedback from OpenAI';
COMMENT ON COLUMN assessments.created_at IS 'Timestamp when the assessment was created';
COMMENT ON COLUMN assessments.updated_at IS 'Timestamp when the record was last updated';

-- Optional: Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Optional: Create a trigger to automatically update updated_at
CREATE TRIGGER update_assessments_updated_at
BEFORE UPDATE ON assessments
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- Row Level Security (RLS) Policies
-- ============================================
-- Note: For this MVP, we're allowing anonymous inserts
-- In production, you should implement proper authentication

-- Enable Row Level Security
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to insert assessments (for MVP/demo purposes)
CREATE POLICY "Allow public insert" ON assessments
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Allow anyone to read their own assessments
-- (In production, you'd filter by user_id or similar)
CREATE POLICY "Allow public read" ON assessments
  FOR SELECT
  TO anon
  USING (true);

-- ============================================
-- Optional: Sample query to verify the table
-- ============================================
-- Run this after creating the table to ensure it works:
-- SELECT * FROM assessments ORDER BY created_at DESC LIMIT 10;

-- ============================================
-- Table Statistics (for monitoring)
-- ============================================
-- You can run this to see table info:
-- SELECT
--   schemaname,
--   tablename,
--   pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
-- FROM pg_tables
-- WHERE tablename = 'assessments';
