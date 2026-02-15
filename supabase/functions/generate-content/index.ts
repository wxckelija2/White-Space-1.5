// @ts-ignore: Deno global is available in Supabase Edge Functions
declare const Deno: {
  env: {
    get(key: string): string | undefined;
  };
};

// @ts-ignore: Deno import
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const ALLOWED_ORIGINS = [
  'http://localhost:8081',  // Expo web default
  'http://localhost:5173',  // Vite default
  'http://localhost:3000',  // Next.js default
  'exp://localhost:8081',   // Expo Go
  // Add your production domain here when ready
]

function corsHeaders(req: Request) {
  const origin = req.headers.get('origin') ?? ''
  const allowOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : origin // Allow any origin for testing

  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Credentials': 'true',
    'Vary': 'Origin',
  }
}

// DALL-E image generation function
async function generateImageWithDallE(prompt: string, req: Request) {
  const apiKey = Deno.env.get('DALL_E_API_KEY')
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: 'DALL-E API key not configured' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders(req) }
      }
    )
  }

  try {
    // Create optimized DALL-E prompt
    const optimizedPrompt = `Professional social media image: ${prompt}. High quality, modern design, optimized for Instagram, vibrant colors, clean composition, 4k resolution.`

    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: optimizedPrompt,
        n: 1,
        size: Deno.env.get('DALL_E_IMAGE_SIZE') || '1024x1024',
        model: 'dall-e-3'
      })
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(`DALL-E API error: ${error.error?.message || response.status}`)
    }

    const data = await response.json()
    const imageUrl = data.data[0].url

    return new Response(
      JSON.stringify({
        content: `🎨 Generated Image: ${imageUrl}`,
        image_url: imageUrl,
        metadata: {
          provider: 'dall-e',
          model: 'dall-e-3',
          size: Deno.env.get('DALL_E_IMAGE_SIZE') || '1024x1024',
          media_type: 'image',
          actual_generation: true
        }
      }),
      {
        headers: { 'Content-Type': 'application/json', ...corsHeaders(req) }
      }
    )
  } catch (error: unknown) {
    console.error('DALL-E generation error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({
        error: 'Image generation failed',
        details: errorMessage,
        fallback: 'Please try again or use the text specifications for manual creation'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders(req) }
      }
    )
  }
}


serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: corsHeaders(req)
    })
  }

  // Health check endpoint
  if (req.method === 'GET' && new URL(req.url).pathname.endsWith('/health')) {
    const modelName = Deno.env.get('GEMINI_MODEL') || 'gemini-flash-latest'
    return new Response(
      JSON.stringify({
        ok: true,
        endpoint: 'health',
        timestamp: new Date().toISOString(),
        allowed_origins: ALLOWED_ORIGINS,
        cors_detected_allow_origin: corsHeaders(req)['Access-Control-Allow-Origin'],
        has_authorization_header: !!req.headers.get('authorization'),
        env: {
          gemini_key_present: !!Deno.env.get('GEMINI_API_KEY'),
          dalle_key_present: !!Deno.env.get('DALL_E_API_KEY'),
          model: modelName,
          dalle_image_size: Deno.env.get('DALL_E_IMAGE_SIZE') || '1024x1024'
        },
        capabilities: {
          text_generation: true,
          image_generation: !!Deno.env.get('DALL_E_API_KEY'),
          media_descriptions: true,
          creative_writing: true,
          instagram_content: true,
          winter_themes: true,
          actual_media_creation: !!Deno.env.get('DALL_E_API_KEY'),
          image_analysis: true,  // Gemini can analyze images
          multimodal_input: true  // Gemini can process images/videos as input
        }
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders(req)
        }
      }
    )
  }

  try {
    const { prompt, type = 'generate', context, image, images, hasImages } = await req.json()

    // Validate input
    if (!prompt) {
      return new Response(
        JSON.stringify({ error: 'Prompt is required' }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders(req)
          }
        }
      )
    }

    // Handle simple conversational prompts like "Hello" with direct responses
    const simplePrompts = {
      'hello': 'Hello! How can I help you today?',
      'hi': 'Hi! What can I help you with?',
      'hey': 'Hey! What would you like to work on?',
      'help': 'I can help with coding, writing, math, ideas, and questions. What do you need?',
      'what can you do': 'I\'m White Space, your comprehensive AI assistant for coding, business, creativity, and turning ideas into reality! Here\'s what I excel at:\n\n💻 **CODING & DEVELOPMENT:**\n• Writing and debugging code in any language\n• Building apps, APIs, and automation\n• Database design and algorithms\n• Code reviews and optimization\n\n💰 **ONLINE BUSINESS & MONETIZATION:**\n• Side hustles and passive income ideas\n• E-commerce and dropshipping strategies\n• Freelancing and client acquisition\n• Content monetization (blogs, YouTube, courses)\n\n🚀 **TURNING IDEAS INTO REALITY:**\n• Business plans and product development\n• Market research and validation\n• Project execution and roadmaps\n• Pitch decks and funding strategies\n\n✍️ **CREATIVE WRITING:**\n• Stories, poetry, and screenplays\n• Character development and world-building\n• Content creation and editing\n\n🎯 **GENERAL ASSISTANCE:**\n• Problem-solving and strategic thinking\n• Learning guidance and skill development\n• Productivity and organization\n\nTry asking: "What\'s popping in AI right now?", "Market analysis for fitness apps", "Future trends in e-commerce", "How to create viral digital products", or "Turn my app idea into a business plan"!',
      'market trends': 'I can help you analyze current market trends and predict future developments! Here are the hottest trends right now:\n\n🔥 **CURRENT HOT TRENDS (2024):**\n• AI-powered tools and automation\n• Sustainable and eco-friendly products\n• Remote work and digital nomad lifestyle\n• Health tech and wellness apps\n• NFT marketplaces and Web3\n• Subscription-based business models\n• Mobile-first e-commerce\n\n📊 **MARKET ANALYSIS FRAMEWORK:**\n1. **Market Size & Growth** - Current valuation and projected growth\n2. **Competitor Landscape** - Key players and market share\n3. **Consumer Behavior** - Demographics, preferences, and buying patterns\n4. **Technology Adoption** - Innovation curves and disruption potential\n5. **Economic Indicators** - Timing, risks, and market conditions\n\nTry asking: "What\'s the market size for fitness apps?" or "Future trends in e-commerce"',
      'digital products': 'Digital products are booming! Here\'s what\'s working right now:\n\n💰 **HIGH-CONVERSION DIGITAL PRODUCTS:**\n• Online courses and educational content\n• Software tools and productivity apps\n• Templates, graphics, and design assets\n• Membership communities and exclusive content\n• E-books, guides, and resource libraries\n• Stock photos, music, and media assets\n\n📈 **MONETIZATION STRATEGIES:**\n• **One-time sales** with upsells and bundles\n• **Subscription models** for recurring revenue\n• **Freemium approach** to build user base\n• **Affiliate partnerships** for cross-promotion\n• **White-label solutions** for agencies\n\n🎯 **SUCCESS FACTORS:**\n• Solve real problems with practical solutions\n• Focus on niche markets with high demand\n• Build strong branding and marketing\n• Provide excellent customer support\n• Use data to optimize pricing and features\n\nWhat type of digital product are you thinking about creating?',
      'trends': 'Let me analyze current market trends and predict what\'s coming next! Here\'s my comprehensive trend analysis:\n\n📈 **CURRENT MARKET TRENDS (2024):**\n\n**TECHNOLOGY:**\n• AI/ML adoption accelerating across industries\n• Web3 and blockchain mainstreaming\n• Edge computing and IoT expansion\n• Cybersecurity becoming critical infrastructure\n\n**BUSINESS MODELS:**\n• Platform economics dominating\n• Subscription services overhauling traditional sales\n• Gig economy maturing into professional networks\n• Direct-to-consumer brands bypassing retailers\n\n**CONSUMER BEHAVIOR:**\n• Sustainability driving purchasing decisions\n• Experience economy over material goods\n• Personalization at scale\n• Privacy concerns shaping digital interactions\n\n**EMERGING OPPORTUNITIES:**\n• Clean energy and climate tech\n• Mental health and wellness technology\n• Remote work infrastructure\n• Educational technology revolution\n\n**FUTURE PREDICTIONS (2025+):**\n• Metaverse commerce platforms\n• AI-first company structures\n• Decentralized autonomous organizations\n• Quantum computing applications\n\nWhat specific market or industry interests you?',
      'market analysis': 'I\'ll provide you with comprehensive market analysis! Let me break down the key components:\n\n🔍 **MARKET SIZE & GROWTH:**\n• Current market valuation\n• Historical growth patterns\n• Projected expansion rates\n• Geographic distribution\n\n🏢 **COMPETITIVE LANDSCAPE:**\n• Major players and market share\n• Entry barriers and competitive advantages\n• New entrants and disruption potential\n• Strategic positioning analysis\n\n👥 **CONSUMER INSIGHTS:**\n• Target demographics and psychographics\n• Buying behavior patterns\n• Pain points and unmet needs\n• Price sensitivity and willingness to pay\n\n📊 **ECONOMIC FACTORS:**\n• Market timing and seasonality\n• Economic indicators and correlations\n• Risk assessment and mitigation\n• Regulatory environment impact\n\n💡 **OPPORTUNITY ASSESSMENT:**\n• Market gaps and underserved segments\n• Innovation potential and white space\n• Scalability and expansion opportunities\n• Revenue model viability\n\nWhat market or industry would you like me to analyze?',
    };
    const lowerPrompt = prompt.toLowerCase().trim();

    // Check for exact matches first
    let matchedResponse = null;
    if (simplePrompts[lowerPrompt as keyof typeof simplePrompts]) {
      matchedResponse = simplePrompts[lowerPrompt as keyof typeof simplePrompts];
    } else {
      // Check for partial matches (e.g., "hello what can you do" should match "what can you do")
      for (const [key, response] of Object.entries(simplePrompts)) {
        if (lowerPrompt.includes(key)) {
          matchedResponse = response;
          break;
        }
      }

      // Check for social media related requests
      if (!matchedResponse && (lowerPrompt.includes('social media') || lowerPrompt.includes('facebook') || lowerPrompt.includes('instagram') || lowerPrompt.includes('tiktok') || lowerPrompt.includes('twitter') || lowerPrompt.includes('linkedin') || lowerPrompt.includes('connect') || lowerPrompt.includes('link'))) {
        matchedResponse = 'I can help you create amazing social media content! Would you like me to:\n\n• 📝 **Create a post** - Write engaging captions and content\n• 🔗 **Link accounts** - Connect your social media accounts for easy posting\n• 📊 **Analytics** - Get insights on your content performance\n• 📅 **Schedule** - Plan your posting strategy\n\nFor account linking, I can guide you to connect:\n• 📘 **Facebook**\n• 📷 **Instagram** \n• 🎵 **TikTok**\n• 🐦 **Twitter/X**\n• 💼 **LinkedIn**\n• 📍 **Pinterest**\n\nJust tell me which platform you\'d like to connect or what type of content you need!';
      }
    }

    if (matchedResponse) {
      return new Response(
        JSON.stringify({
          content: matchedResponse,
          metadata: {
            model: 'direct-response',
            provider: 'assistant',
            tokens: matchedResponse.length,
            processingTime: 0,
            capabilities: {
              text_generation: true,
              image_generation: false,
              video_generation: false,
              media_descriptions: false,
              creative_writing: true,
              professional_specs: false,
              actual_media_creation: false,
              image_analysis: false,
              multimodal_input: false
            }
          }
        }),
        {
          headers: { 'Content-Type': 'application/json', ...corsHeaders(req) }
        }
      )
    }

    // Build prompt based on type
    let fullPrompt = prompt
    switch (type) {
      case 'generate':
        // Simple, direct AI assistant - trained on data, not "knowing" things
        fullPrompt = `You are White Space, a helpful AI assistant. You were trained on a large dataset of text including books, encyclopedias, educational websites, academic content, and general knowledge sources.

IMPORTANT - HOW YOU WORK:
- You don't "know" things the way humans do - you recognize patterns from training data
- You generate the most likely accurate response based on what you learned
- You do NOT browse the internet in real-time (unless explicitly searching)
- You do NOT have personal memories or watch videos
- You are an advanced text prediction engine trained on educational material
- Be honest about your limitations when asked

RESPONSE RULES:
- Give direct, helpful answers without unnecessary introductions
- For coding requests: write COMPLETE, WORKING code with comments
- Do NOT cut off code - always finish what you start
- Do NOT add phrases like "CLARITY ACHIEVED" or similar
- Be conversational and natural
- If user asks to "make" or "create" something, do it fully
- For code: include ALL imports, the full component/function, and usage example
- When explaining facts, you can say "Based on my training data..." or "From what I learned..."

User: ${prompt}`
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

    // Note: Media generation is now handled by DALL-E integration above
    // This text generation path is for non-media requests

    if (context) {
      fullPrompt = `Context: ${context}\n\n${fullPrompt}`
    }

    // Check for media generation request
    const hasImageRequest = prompt.toLowerCase().includes('thumbnail') ||
                           prompt.toLowerCase().includes('image') ||
                           prompt.toLowerCase().includes('png') ||
                           prompt.toLowerCase().includes('photo')

    // Route to image generation API if available
    if (hasImageRequest && Deno.env.get('DALL_E_API_KEY')) {
      return await generateImageWithDallE(prompt, req)
    }

    // Get Gemini API key for text generation
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY')
    if (!geminiApiKey) {
      // Fallback response when API key is not configured
      return new Response(
        JSON.stringify({
          content: "I'm sorry, but the AI service is currently unavailable. Please try again later or contact support if this issue persists.",
          metadata: {
            model: 'fallback-response',
            provider: 'system',
            tokens: 50,
            processingTime: 0,
            capabilities: {
              text_generation: false,
              image_generation: false,
              video_generation: false,
              media_descriptions: false,
              creative_writing: false,
              professional_specs: false,
              actual_media_creation: false,
              image_analysis: false,
              multimodal_input: false
            }
          }
        }),
        {
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders(req)
          }
        }
      )
    }

    // Call Gemini API directly - use the correct model name
    const modelName = Deno.env.get('GEMINI_MODEL') || 'gemini-1.5-flash'
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${geminiApiKey}`

    // Prepare the content parts (text + optional image)
    const parts: unknown[] = [];

    // Add image(s) if provided - handle both single image and images array
    let hasImageContent = false;
    
    if (images && images.length > 0) {
      // Handle images array from new format
      for (const img of images) {
        if (img.base64) {
          // Ensure proper MIME type detection
          let mimeType = img.type;
          if (!mimeType) {
            // Extract from filename if available
            const extension = img.name?.split('.').pop()?.toLowerCase();
            mimeType = extension ? `image/${extension}` : 'image/jpeg';
          }
          parts.push({
            inline_data: {
              mime_type: mimeType,
              data: img.base64
            }
          });
          hasImageContent = true;
        }
      }
    } else if (image && image.base64) {
      // Handle single image from old format
      let mimeType = image.mimeType;
      if (!mimeType) {
        const extension = image.name?.split('.').pop()?.toLowerCase();
        mimeType = extension ? `image/${extension}` : 'image/jpeg';
      }
      parts.push({
        inline_data: {
          mime_type: mimeType,
          data: image.base64
        }
      });
      hasImageContent = true;
    }

    // Add the text prompt
    if (hasImageContent) {
      // For image analysis, use a simpler prompt
      parts.push({ text: `${prompt}. Provide a detailed, helpful response.` });
    } else {
      parts.push({ text: fullPrompt });
    }

    let response;
    let retryCount = 0;
    const maxRetries = 2;

    while (retryCount <= maxRetries) {
      try {
        response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: parts
            }],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 2048,
            },
            safetySettings: [
              { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_ONLY_HIGH' },
              { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
              { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_ONLY_HIGH' },
              { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_ONLY_HIGH' },
            ]
          })
        });

        if (response.ok) break;

        // If rate limited or server error, retry
        if (response.status === 429 || response.status >= 500) {
          retryCount++;
          if (retryCount <= maxRetries) {
            await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
            continue;
          }
        }
        break;
      } catch (fetchError) {
        console.error('Fetch error:', fetchError);
        retryCount++;
        if (retryCount > maxRetries) throw fetchError;
        await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
      }
    }

    if (!response || !response.ok) {
      const errorText = response ? await response.text() : 'No response from API'
      console.error('Gemini API error:', errorText)
      
      // Return a helpful fallback response instead of error
      return new Response(
        JSON.stringify({
          content: "I apologize, but I'm having trouble connecting to my AI backend right now. This could be due to:\n\n• High server load\n• API rate limits\n• Network connectivity issues\n\nPlease try again in a moment. If the issue persists, the API key may need to be checked in the Supabase dashboard.",
          metadata: {
            model: 'fallback',
            provider: 'system',
            tokens: 100,
            processingTime: 0,
            error: true
          }
        }),
        {
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders(req)
          }
        }
      )
    }

    const data = await response.json()
    console.log('Gemini API response:', JSON.stringify(data, null, 2))

    let text = data.candidates?.[0]?.content?.parts?.[0]?.text

    // Handle different response formats
    if (!text && data.candidates?.[0]?.content?.parts) {
      // Try alternative formats
      text = data.candidates[0].content.parts.map((part: any) => part.text).join('')
    }

    if (!text) {
      console.error('No text found in Gemini response:', data)
      return new Response(
        JSON.stringify({
          error: 'No content generated by AI',
          details: 'The AI service returned an empty response. Please try rephrasing your request.',
          fallback: 'Please try again with a different prompt or check your request.'
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders(req)
          }
        }
      )
    }

    // Ensure we have meaningful content
    if (text.trim().length < 10) {
      text = `I generated a response, but it was too short. Here's what I created: "${text}". Please try asking for something more specific!`
    }

    return new Response(
      JSON.stringify({
        content: text,
        metadata: {
          model: modelName,
          provider: 'gemini',
          tokens: text.length,
          processingTime: 0,
          capabilities: {
            text_generation: true,
            image_generation: !!Deno.env.get('DALL_E_API_KEY'),
            media_descriptions: true,
            media_specifications: true,
            creative_writing: true,
            professional_specs: true,
            actual_media_creation: !!Deno.env.get('DALL_E_API_KEY'),
            image_analysis: true,
            multimodal_input: true
          }
        }
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders(req)
        }
      }
    )

  } catch (error: unknown) {
    console.error('Edge function error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders(req)
        }
      }
    )
  }
})