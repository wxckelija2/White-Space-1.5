# 🚀 Deploy Gemini Edge Function - Step by Step

## Current Status
✅ Client-side environment variables configured
❌ Edge Function not deployed
❌ GEMINI_API_KEY secret not set

## Step 1: Access Supabase Dashboard
1. Go to [supabase.com](https://supabase.com)
2. Sign in to your account
3. Select your project: `yvpafwyfcgzdtiaenylu`

## Step 2: Deploy the Edge Function
1. In your Supabase dashboard, go to **"Edge Functions"** in the left sidebar
2. Click **"Create a new function"**
3. Function name: `generate-content`
4. Copy and paste this code into the function editor:

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { GoogleGenerativeAI } from 'https://esm.sh/@google/generative-ai@0.2.2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { prompt, type = 'generate', context } = await req.json()

    // Validate input
    if (!prompt) {
      return new Response(
        JSON.stringify({ error: 'Prompt is required' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Get Gemini API key from environment
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY')
    if (!geminiApiKey) {
      return new Response(
        JSON.stringify({ error: 'Gemini API key not configured' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(geminiApiKey)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    // Build prompt based on type
    let fullPrompt = prompt
    switch (type) {
      case 'generate':
        fullPrompt = `You are a creative writing assistant. Generate high-quality, engaging content based on the user's request.\n\nRequest: ${prompt}`
        break
      case 'improve':
        fullPrompt = `You are an editor. Improve the provided content by enhancing clarity, structure, and impact while preserving the original intent.\n\nContent to improve: ${prompt}`
        break
      case 'summarize':
        fullPrompt = `You are a summarization expert. Create concise, comprehensive summaries that capture the key points and main ideas.\n\nContent to summarize: ${prompt}`
        break
      case 'expand':
        fullPrompt = `You are a content expansion specialist. Add relevant details, examples, and context to make the content more comprehensive.\n\nContent to expand: ${prompt}`
        break
      case 'rewrite':
        fullPrompt = `You are a professional writer. Rewrite the content to improve flow, clarity, and engagement.\n\nContent to rewrite: ${prompt}`
        break
    }

    if (context) {
      fullPrompt = `Context: ${context}\n\n${fullPrompt}`
    }

    // Generate content
    const result = await model.generateContent(fullPrompt)
    const response = await result.response
    const text = response.text()

    if (!text) {
      return new Response(
        JSON.stringify({ error: 'No content generated' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    return new Response(
      JSON.stringify({
        content: text,
        metadata: {
          model: 'gemini-1.5-flash',
          provider: 'gemini',
          tokens: text.length, // Approximate
          processingTime: 0
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Edge function error:', error)
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
```

5. Click **"Deploy function"**

## Step 3: Set the Gemini API Key Secret
1. In your Supabase dashboard, go to **"Settings"** → **"Edge Functions"**
2. In the **"Environment variables"** section, add:
   - **Name**: `GEMINI_API_KEY`
   - **Value**: `AIzaSyC1VCj9e4t0RLdHl_yHaIdTaCowNlcGwss` (your existing key)
3. Click **"Save"**

## Step 4: Test the Function
1. Go back to **"Edge Functions"** in the sidebar
2. Find your `generate-content` function
3. Click the **"Invoke"** button
4. Use this test payload:
```json
{
  "prompt": "Write a short paragraph about artificial intelligence",
  "type": "generate"
}
```

## Step 5: Switch Back to Gemini Mode
1. Edit your `.env` file:
```
EXPO_PUBLIC_AI_PROVIDER=gemini
```
2. Restart your Expo server:
```bash
# Kill current server (Ctrl+C) then:
npx expo start
```

## Step 6: Test in Your App
1. Open your app
2. Try creating a project and generating content
3. It should now use Gemini and take 5-15 seconds instead of mock mode's 1.5-2.5 seconds

## Troubleshooting
- If you get "Function not found": The function didn't deploy properly
- If you get "API key not configured": The secret wasn't set correctly
- If generation still takes too long: Check the function logs in Supabase dashboard

## Expected Performance
- **Mock Mode**: 1.5-2.5 seconds (what you had before)
- **Gemini Mode**: 5-15 seconds (normal AI generation time)
- **Too slow**: Something is misconfigured