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