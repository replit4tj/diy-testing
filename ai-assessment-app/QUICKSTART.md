# ⚡ Quick Start Guide

Get your AI Assessment App running in 15 minutes!

## 🎯 Quick Setup Steps

### 1️⃣ Install Dependencies (2 min)

```bash
cd ai-assessment-app
npm install
cd frontend
npm install
cd ..
```

### 2️⃣ Set Up Supabase (5 min)

1. Go to [supabase.com](https://supabase.com) → Sign up
2. Create new project (wait 2 min)
3. Go to Settings → API → Copy:
   - **Project URL**
   - **anon public key**
4. Go to SQL Editor → New Query → Paste contents of `database/schema.sql` → Run

### 3️⃣ Set Up OpenAI (3 min)

1. Go to [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Create new secret key → Copy it
3. Add payment method in Billing (required for API access)

### 4️⃣ Configure Environment (1 min)

Create `.env` file in root:

```bash
cp .env.example .env
```

Edit `.env`:

```bash
OPENAI_API_KEY=sk-proj-YOUR-KEY-HERE
SUPABASE_URL=https://YOUR-PROJECT.supabase.co
SUPABASE_ANON_KEY=YOUR-ANON-KEY-HERE
NODE_ENV=development
```

### 5️⃣ Run Locally (1 min)

```bash
# Install Vercel CLI
npm install -g vercel

# Run dev server
vercel dev
```

Open: `http://localhost:3000`

### 6️⃣ Deploy to Vercel (3 min)

```bash
# Push to GitHub
git init
git add .
git commit -m "Initial commit"
gh repo create ai-assessment-app --public --source=. --push

# Or manually:
# 1. Create repo on GitHub
# 2. git remote add origin <your-repo-url>
# 3. git push -u origin main
```

Then:
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repo
3. Add environment variables (same as `.env`)
4. Deploy!

---

## ✅ Verify It Works

1. Enter text: "Write an essay about AI"
2. Click "Submit Assessment"
3. Wait 5-10 seconds
4. See AI feedback appear!

---

## 🆘 Common Issues

**"Failed to get assessment"**
→ Check OpenAI API key and billing

**"Database configuration error"**
→ Verify Supabase URL and anon key

**Local dev not working**
→ Use `vercel dev`, not `npm run dev`

---

## 📚 Need More Help?

See the full [README.md](./README.md) for detailed instructions and troubleshooting.

---

**That's it! You're ready to go! 🚀**
