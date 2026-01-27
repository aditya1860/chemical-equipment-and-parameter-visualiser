# Gemini API Setup Guide

## Problem Analysis

The app was not showing AI insights due to several configuration issues:

### Issues Found & Fixed:

1. **Incorrect Environment Variable Name** ❌ → ✅
   - Old: `process.env.GOOGLE_API_KEY` / `process.env.API_KEY`
   - New: `import.meta.env.VITE_GEMINI_API_KEY`
   - Reason: Vite requires environment variables to be prefixed with `VITE_` and accessed via `import.meta.env`

2. **Invalid Model Name** ❌ → ✅
   - Old: `'gemini-3-flash-preview'`
   - New: `'gemini-1.5-flash'`
   - Reason: The preview model doesn't exist. Current valid models are `gemini-1.5-flash` and `gemini-1.5-pro`

3. **Vite Configuration** ❌ → ✅
   - Removed explicit `define` entries (no longer needed)
   - Updated `loadEnv` to use `VITE_` prefix
   - Vite now automatically exposes `VITE_*` variables via `import.meta.env`

4. **Missing API Key** ❌ → ✅
   - Added validation to check if API key is set
   - Added console warnings and error messages for debugging

5. **Environment Variable Naming** ❌ → ✅
   - Old: `.env.local` had `GEMINI_API_KEY=...`
   - New: `.env.local` has `VITE_GEMINI_API_KEY=...`

## How to Enable AI Insights

### Step 1: Get a Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Click "Create API Key"
3. Copy your API key

### Step 2: Update .env.local

Edit `.env.local` and replace `PLACEHOLDER_API_KEY` with your actual API key:

```env
VITE_GEMINI_API_KEY=your_actual_api_key_here
```

⚠️ **Important**: Never commit `.env.local` to version control! It contains sensitive information.

### Step 3: Restart the Development Server

```bash
npm run dev
```

The development server must be restarted for environment variables to be loaded.

### Step 4: Upload Data and Verify

1. Upload a CSV file with equipment data, or use the sample dataset
2. The app will fetch AI insights from Gemini
3. Check your browser console for debug messages:
   - ✅ `"Successfully fetched AI insights: [...]"` - Success
   - ❌ `"Gemini API key is not configured"` - API key not set
   - ❌ Error messages from the API - Check your API key or internet connection

## Troubleshooting

### Issue: "No insights available for this dataset"
- **Cause**: API key not set, invalid key, or API request failed
- **Solution**: 
  1. Verify `VITE_GEMINI_API_KEY` is set in `.env.local`
  2. Check browser console for error messages
  3. Verify your API key is valid at [Google AI Studio](https://aistudio.google.com/app/apikey)

### Issue: "Cannot find property 'VITE_GEMINI_API_KEY'"
- **Cause**: Dev server not restarted after editing `.env.local`
- **Solution**: Stop the dev server and run `npm run dev` again

### Issue: "The model 'gemini-3-flash-preview' does not exist"
- **Cause**: Invalid model name (should only happen if code was reverted)
- **Solution**: Use `'gemini-1.5-flash'` or `'gemini-1.5-pro'`

### Issue: "401 Unauthenticated" error in console
- **Cause**: Invalid API key
- **Solution**: Check your API key at [Google AI Studio](https://aistudio.google.com/app/apikey)

## Code Changes Summary

### services/geminiService.ts
- Changed from `process.env.API_KEY` to `import.meta.env.VITE_GEMINI_API_KEY`
- Updated model from `'gemini-3-flash-preview'` to `'gemini-1.5-flash'`
- Added API key validation
- Improved error logging with emoji indicators and detailed messages

### vite.config.ts
- Removed manual `define` configuration for process.env
- Updated `loadEnv` to use `VITE_` prefix
- Vite now automatically exposes VITE_* variables

### .env.local
- Changed variable name from `GEMINI_API_KEY` to `VITE_GEMINI_API_KEY`

## Testing the Setup

```typescript
// Check in browser console that these messages appear:
console.log('✅ Successfully fetched AI insights: [...]'); // Success
console.error('❌ Gemini API key is not configured...'); // API key issue
```

## More Information

- [Vite Environment Variables Documentation](https://vitejs.dev/guide/env-and-modes.html)
- [Google Gemini API Documentation](https://ai.google.dev/docs)
- [Supported Gemini Models](https://ai.google.dev/models)
