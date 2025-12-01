<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# FamPlan AI - Family Budget & Meal Planner

FamPlan AI is an intelligent family budget planning and meal planner application powered by Google's Gemini AI. It helps families manage their finances and plan meals efficiently.

View your app in AI Studio: https://ai.studio/apps/drive/1YtfUQmfJ8NcxYe1Wa0WttJFt-f7J7G66

## Features

- 🔐 **Authentication System** - Secure user login and registration
- 📊 **Dashboard** - Overview of family finances and meal plans
- 💰 **Budget Planning** - AI-powered budget recommendations based on family size
- 🍽️ **Meal Planner** - Intelligent meal planning with Vietnamese recipes
- 📈 **Reports** - Detailed financial reports and analysis
- 👨‍👩‍👧‍👦 **Onboarding** - Easy setup for family members and preferences

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **AI**: Google Gemini API
- **Storage**: LocalStorage for data persistence

## Run Locally

**Prerequisites**: 
- Node.js (v16 or higher)
- npm or yarn

### Installation Steps:

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   - Copy `.env.example` to `.env.local`
   - Add your Google Gemini API key:
   ```
   VITE_GEMINI_API_KEY=your_google_gemini_api_key_here
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`

4. **Build for production**:
   ```bash
   npm run build
   ```

## Deploy to Vercel

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### Step 2: Deploy to Vercel
1. Go to [Vercel](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Select the project and click "Continue"
5. In the "Environment Variables" section, add:
   - **Key**: `VITE_GEMINI_API_KEY`
   - **Value**: Your Google Gemini API key
6. Click "Deploy"

### Step 3: Configure Custom Domain (Optional)
1. After deployment succeeds, go to Project Settings
2. Navigate to "Domains"
3. Add your custom domain

### Troubleshooting

If you see a blank page after deployment:
1. Check the browser console for errors (F12)
2. Verify all environment variables are set correctly
3. Check the Vercel deployment logs for build errors
4. Ensure the build command is set to `npm run build`
5. Verify the output directory is set to `dist`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GEMINI_API_KEY` | Google Gemini API Key for AI features | Yes |

## Getting Your Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com)
2. Click "Get API Key"
3. Create a new API key or use an existing one
4. Copy the key and add it to your `.env.local` file

## License

This project is private and owned by FamPlan.

