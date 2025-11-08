# 🤖 AI Assessment App

A fully functional, single-page web application that allows users to submit text for AI-powered assessment using OpenAI's GPT-3.5 Turbo. Built with React, Node.js, and deployed on Vercel with Supabase for data persistence.

![Tech Stack](https://img.shields.io/badge/React-18.2-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--3.5-purple)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-black)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-teal)

---

## 📋 Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Prerequisites](#prerequisites)
5. [Initial Setup](#initial-setup)
6. [Supabase Setup](#supabase-setup)
7. [OpenAI Setup](#openai-setup)
8. [Local Development](#local-development)
9. [Vercel Deployment](#vercel-deployment)
10. [Environment Variables](#environment-variables)
11. [Testing](#testing)
12. [Security & Best Practices](#security--best-practices)
13. [Troubleshooting](#troubleshooting)

---

## ✨ Features

- **Single-Page Application**: Fast, responsive React UI built with Vite
- **AI-Powered Assessments**: Leverages OpenAI's GPT-3.5 Turbo for detailed feedback
- **Real-time Processing**: Loading states and error handling for smooth UX
- **Data Persistence**: All assessments stored in Supabase PostgreSQL database
- **Serverless Architecture**: Backend runs as Vercel Serverless Functions
- **Clean, Modern UI**: Beautiful gradient design with responsive layout
- **Error Handling**: Comprehensive error handling and user feedback
- **Security**: API keys secured on backend, HTTPS by default on Vercel

---

## 🛠️ Tech Stack

### Frontend
- **React** 18.2 - UI library
- **Vite** 5.0 - Build tool and dev server
- **CSS3** - Styling with gradients and animations

### Backend
- **Node.js** with **Express.js** - Serverless API functions
- **OpenAI API** - GPT-3.5 Turbo for text assessment
- **Supabase JS Client** - PostgreSQL database interaction

### Infrastructure
- **Vercel** - Hosting and serverless functions
- **Supabase** - Managed PostgreSQL database
- **Git** - Version control

---

## 📁 Project Structure

```
ai-assessment-app/
├── frontend/                    # React frontend application
│   ├── src/
│   │   ├── App.jsx             # Main React component
│   │   ├── App.css             # Styling
│   │   └── main.jsx            # React entry point
│   ├── index.html              # HTML template
│   ├── vite.config.js          # Vite configuration
│   ├── package.json            # Frontend dependencies
│   └── .gitignore              # Frontend gitignore
│
├── api/                        # Backend serverless functions
│   └── assess.js               # POST /api/assess endpoint
│
├── database/                   # Database schema
│   └── schema.sql              # PostgreSQL table definition
│
├── package.json                # Root package.json with API dependencies
├── vercel.json                 # Vercel deployment configuration
├── .env.example                # Environment variables template
├── .gitignore                  # Root gitignore
└── README.md                   # This file
```

---

## ✅ Prerequisites

Before you begin, ensure you have:

- **Node.js** 18+ and **npm** installed ([Download](https://nodejs.org/))
- **Git** installed ([Download](https://git-scm.com/))
- A **GitHub account** (for Vercel deployment)
- An **OpenAI account** with API access ([Sign up](https://platform.openai.com/))
- A **Supabase account** ([Sign up](https://supabase.com/) - Free tier available)
- A **Vercel account** ([Sign up](https://vercel.com/) - Free tier available)

---

## 🚀 Initial Setup

### Step 1: Clone or Create the Project

If you haven't already, create the project directory:

```bash
# The files are already created in: ai-assessment-app/
cd ai-assessment-app
```

### Step 2: Install Dependencies

Install all necessary npm packages for both root and frontend:

```bash
# Install root dependencies (API packages)
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

This will install:
- **Root**: `openai`, `@supabase/supabase-js`, `vercel`
- **Frontend**: `react`, `react-dom`, `vite`, `@vitejs/plugin-react`

---

## 🗄️ Supabase Setup

### Step 1: Create a Supabase Project

1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Click **"New Project"**
3. Fill in:
   - **Name**: `ai-assessment-app` (or your preferred name)
   - **Database Password**: Choose a strong password (save it!)
   - **Region**: Select closest to your users
   - **Pricing Plan**: Free tier is sufficient
4. Click **"Create new project"** (takes ~2 minutes)

### Step 2: Get Your Supabase Credentials

1. In your Supabase project dashboard, go to **Settings** (gear icon)
2. Click **API** in the left sidebar
3. Copy these values (you'll need them later):
   - **Project URL** → This is your `SUPABASE_URL`
   - **anon public** key → This is your `SUPABASE_ANON_KEY`

### Step 3: Create the Database Table

1. In Supabase dashboard, click **SQL Editor** (left sidebar)
2. Click **"New Query"**
3. Copy the entire contents of `database/schema.sql` from this project
4. Paste it into the SQL editor
5. Click **"Run"** or press `Ctrl+Enter`
6. You should see: `Success. No rows returned`

### Step 4: Verify the Table

1. Click **Table Editor** in the left sidebar
2. You should see the `assessments` table with columns:
   - `id` (uuid)
   - `user_input` (text)
   - `ai_response` (text)
   - `created_at` (timestamp)
   - `updated_at` (timestamp)

---

## 🔑 OpenAI Setup

### Step 1: Get Your API Key

1. Go to [OpenAI API Keys](https://platform.openai.com/api-keys)
2. Log in or create an account
3. Click **"Create new secret key"**
4. Give it a name: `ai-assessment-app`
5. **Copy the key immediately** (you won't see it again!)
6. Store it safely - this is your `OPENAI_API_KEY`

### Step 2: Add Credits (If Needed)

- OpenAI requires a payment method for API access
- GPT-3.5 Turbo is very affordable (~$0.002 per assessment)
- Go to **Billing** → **Payment methods** to add a card
- Set usage limits in **Billing** → **Usage limits** for safety

### Important Notes:
- **Never commit your API key to Git**
- API keys start with `sk-`
- Keep your keys secure and rotate them periodically

---

## 💻 Local Development

### Step 1: Set Up Environment Variables

Create a `.env` file in the **root** directory:

```bash
# Copy the example file
cp .env.example .env
```

Edit `.env` and add your actual credentials:

```bash
OPENAI_API_KEY=sk-proj-your-actual-openai-key-here
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_ANON_KEY=your-actual-supabase-anon-key-here
NODE_ENV=development
```

### Step 2: Run the Application Locally

You have two options:

#### Option A: Using Vercel CLI (Recommended)

This method closely mirrors production:

```bash
# Install Vercel CLI globally (if not already installed)
npm install -g vercel

# Run the dev server
vercel dev
```

- Frontend: `http://localhost:3000`
- API: `http://localhost:3000/api/assess`

#### Option B: Run Frontend Separately

If you just want to test the frontend:

```bash
cd frontend
npm run dev
```

- Frontend: `http://localhost:5173`
- Note: API calls won't work without backend running

### Step 3: Test the Application

1. Open `http://localhost:3000` in your browser
2. Enter some text in the textarea (e.g., "This is a test essay about climate change")
3. Click **"Submit Assessment"**
4. Wait for the AI to process (5-10 seconds)
5. View the assessment results

### Step 4: Verify Database Storage

1. Go to Supabase **Table Editor** → `assessments`
2. You should see your test entry with:
   - Your input text
   - AI's response
   - Timestamp

---

## 🚢 Vercel Deployment

### Step 1: Push Code to GitHub

```bash
# Initialize git repository (if not already done)
git init
git add .
git commit -m "Initial commit: AI Assessment App"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/ai-assessment-app.git
git branch -M main
git push -u origin main
```

### Step 2: Connect to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New Project"**
3. Click **"Import Git Repository"**
4. Select your `ai-assessment-app` repository
5. Vercel will auto-detect the configuration

### Step 3: Configure Project Settings

**Framework Preset**: Vite
**Root Directory**: `./` (leave as is)
**Build Command**: Vercel uses `vercel.json` configuration
**Output Directory**: `frontend/dist`

### Step 4: Add Environment Variables

In the Vercel project settings:

1. Go to **Settings** → **Environment Variables**
2. Add the following variables:

| Name | Value | Environment |
|------|-------|-------------|
| `OPENAI_API_KEY` | `sk-proj-your-key...` | Production, Preview, Development |
| `SUPABASE_URL` | `https://xxx.supabase.co` | Production, Preview, Development |
| `SUPABASE_ANON_KEY` | `your-anon-key` | Production, Preview, Development |

3. Click **"Add"** for each variable

### Step 5: Deploy

1. Click **"Deploy"**
2. Vercel will:
   - Install dependencies
   - Build the frontend
   - Deploy serverless functions
   - Generate a production URL

3. Wait 2-3 minutes for deployment to complete

### Step 6: Access Your Live App

1. Once deployed, you'll see: **"Congratulations! Your project has been deployed."**
2. Click **"Visit"** to open your live application
3. Your app will be at: `https://your-app-name.vercel.app`

---

## 🔐 Environment Variables

### Required Variables

| Variable | Description | Where to Get It |
|----------|-------------|-----------------|
| `OPENAI_API_KEY` | OpenAI API authentication key | [OpenAI API Keys](https://platform.openai.com/api-keys) |
| `SUPABASE_URL` | Supabase project URL | Supabase Dashboard → Settings → API |
| `SUPABASE_ANON_KEY` | Supabase anonymous/public key | Supabase Dashboard → Settings → API |
| `NODE_ENV` | Environment mode (optional) | Set to `development` or `production` |

### Security Notes

- ✅ **DO**: Keep API keys in `.env` files (never commit to Git)
- ✅ **DO**: Use Vercel's environment variables for production
- ✅ **DO**: Use different API keys for development and production
- ❌ **DON'T**: Expose API keys in frontend code
- ❌ **DON'T**: Commit `.env` files to version control
- ❌ **DON'T**: Share API keys in public forums or screenshots

---

## 🧪 Testing

### Manual Testing Checklist

After deployment, test these scenarios:

#### ✅ Happy Path
1. Enter valid text (100-500 words)
2. Click "Submit Assessment"
3. Verify loading state appears
4. Verify assessment is displayed
5. Check Supabase table for new entry

#### ✅ Edge Cases
1. **Empty Input**: Submit with no text → Should show error
2. **Very Long Text**: Submit 10,000+ characters → Should show error
3. **Special Characters**: Submit text with emoji, quotes, etc. → Should work
4. **Multiple Submissions**: Submit 3-5 assessments in a row → All should work

#### ✅ Error Handling
1. **Invalid API Key**: Temporarily break `OPENAI_API_KEY` → Should show error
2. **Network Issues**: Test on slow connection → Should show loading state
3. **Database Down**: Temporarily break `SUPABASE_URL` → API should still return assessment (with warning in logs)

### Testing API Endpoint Directly

Using `curl` or Postman:

```bash
curl -X POST https://your-app.vercel.app/api/assess \
  -H "Content-Type: application/json" \
  -d '{"text": "This is a test essay about artificial intelligence."}'
```

Expected response:

```json
{
  "success": true,
  "assessment": "Your essay demonstrates...",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

## 🔒 Security & Best Practices

### Why API Keys Must Be on Backend

- **Frontend code is public**: Anyone can view your React code in the browser
- **API keys in frontend** = Anyone can steal them and use your credits
- **Backend is secure**: Vercel serverless functions keep keys private

### Input Validation

The app includes:
- **Client-side validation**: Checks for empty input before submission
- **Server-side validation**: Verifies text length and type
- **Character limits**: Max 10,000 characters to prevent token overuse

### Rate Limiting (Production Enhancement)

For production, consider adding:
- **Vercel Edge Config** for rate limiting
- **OpenAI organization limits** in your OpenAI dashboard
- **Supabase row-level security** for multi-user scenarios

### HTTPS

- Vercel automatically provides HTTPS for all deployments
- All API communication is encrypted
- No additional SSL configuration needed

### Database Security

The current schema uses:
- **Row Level Security (RLS)** enabled
- **Public insert/read policies** (suitable for MVP)
- For production with auth, update policies in `schema.sql`

---

## 🐛 Troubleshooting

### Common Issues and Solutions

#### 1. "Failed to get assessment" Error

**Possible Causes:**
- Invalid `OPENAI_API_KEY`
- OpenAI account has no credits
- API key doesn't have correct permissions

**Solution:**
- Verify API key in Vercel environment variables
- Check OpenAI billing: [platform.openai.com/account/billing](https://platform.openai.com/account/billing)
- Regenerate API key if needed

---

#### 2. "Database configuration error"

**Possible Causes:**
- Missing `SUPABASE_URL` or `SUPABASE_ANON_KEY`
- Incorrect Supabase credentials
- Supabase project paused (free tier)

**Solution:**
- Verify environment variables in Vercel
- Check Supabase project is active
- Confirm anon key, not service role key

---

#### 3. Frontend Shows "Loading..." Forever

**Possible Causes:**
- API endpoint not responding
- CORS issues
- Network timeout

**Solution:**
- Check browser console for errors (F12 → Console)
- Verify API endpoint: `https://your-app.vercel.app/api/assess`
- Check Vercel function logs in dashboard

---

#### 4. Local Development: "Cannot GET /api/assess"

**Possible Causes:**
- Not using `vercel dev` (using `npm run dev` instead)
- API folder not recognized

**Solution:**
- Use `vercel dev` instead of `npm run dev`
- Verify `api/` folder exists at root level
- Check `vercel.json` configuration

---

#### 5. Build Fails on Vercel

**Possible Causes:**
- Missing dependencies in `package.json`
- Build command errors
- Incorrect directory structure

**Solution:**
- Check Vercel build logs for specific error
- Ensure `frontend/package.json` has all dependencies
- Verify `vercel.json` has correct `buildCommand`

---

#### 6. "Rate limit exceeded" Error

**Possible Causes:**
- Too many OpenAI API requests
- Reached OpenAI rate limit

**Solution:**
- Wait a few minutes and try again
- Check OpenAI usage: [platform.openai.com/usage](https://platform.openai.com/usage)
- Implement request caching or rate limiting

---

### Debugging Tips

#### View Vercel Logs
1. Go to Vercel Dashboard → Your Project
2. Click **"Deployments"**
3. Click on latest deployment → **"Functions"**
4. Click `/api/assess` → View logs

#### View Browser Console
1. Open your app in browser
2. Press `F12` or right-click → "Inspect"
3. Go to **Console** tab
4. Submit an assessment and watch for errors

#### Test API Independently
```bash
# Test if API is reachable
curl https://your-app.vercel.app/api/assess

# Should return: {"error": "Method not allowed. Use POST."}
```

---

## 📦 Package Versions

For reference, here are the main dependencies:

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "openai": "^4.26.0",
    "@supabase/supabase-js": "^2.39.3"
  }
}
```

---

## 🎯 Next Steps & Enhancements

Once your app is working, consider these improvements:

### Features
- [ ] User authentication (Supabase Auth)
- [ ] Assessment history page
- [ ] Export assessments to PDF
- [ ] Support for multiple AI models
- [ ] Character/word count display
- [ ] Assessment type selector (essay, code, etc.)

### Technical
- [ ] Add TypeScript
- [ ] Implement React Query for data fetching
- [ ] Add unit tests (Vitest)
- [ ] Add E2E tests (Playwright)
- [ ] Implement rate limiting
- [ ] Add analytics (Vercel Analytics)

### UI/UX
- [ ] Dark mode toggle
- [ ] Markdown rendering for AI responses
- [ ] Copy assessment to clipboard
- [ ] Share assessment via link
- [ ] Mobile app version

---

## 📄 License

MIT License - Feel free to use this project for learning or commercial purposes.

---

## 🤝 Support

If you encounter issues:

1. Check the [Troubleshooting](#troubleshooting) section
2. Review Vercel deployment logs
3. Verify all environment variables are set correctly
4. Check OpenAI and Supabase service status

---

## 🎉 Congratulations!

You now have a fully functional AI assessment application deployed to the web!

**Your app can:**
- ✅ Accept user text input
- ✅ Process it with OpenAI GPT-3.5 Turbo
- ✅ Store results in Supabase PostgreSQL
- ✅ Display beautiful, formatted assessments
- ✅ Handle errors gracefully
- ✅ Scale automatically with Vercel

**Happy assessing! 🚀**
