// @ts-ignore: Deno global is available in Supabase Edge Functions
declare const Deno: {
  env: {
    get(key: string): string | undefined;
  };
};

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Convert base64 to Uint8Array
function base64ToUint8Array(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Parse JSON body (client sends base64 audio)
    const { audio, format = 'm4a' } = await req.json();
    
    if (!audio) {
      return new Response(
        JSON.stringify({ error: 'No audio data provided' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Try OpenAI Whisper API first
    const openaiKey = Deno.env.get('OPENAI_API_KEY');
    
    // Try Google Cloud Speech-to-Text as fallback
    const googleKey = Deno.env.get('GOOGLE_CLOUD_API_KEY');
    
    if (openaiKey) {
      // Use OpenAI Whisper
      const audioBytes = base64ToUint8Array(audio);
      const blob = new Blob([audioBytes], { type: `audio/${format}` });
      
      const whisperFormData = new FormData();
      whisperFormData.append('file', blob, `audio.${format}`);
      whisperFormData.append('model', 'whisper-1');

      const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openaiKey}`,
        },
        body: whisperFormData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Whisper API error:', errorText);
        throw new Error('Whisper API failed');
      }

      const result = await response.json();
      
      return new Response(
        JSON.stringify({ 
          text: result.text || '',
          success: true,
          provider: 'whisper'
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } else if (googleKey) {
      // Use Google Cloud Speech-to-Text
      const response = await fetch(
        `https://speech.googleapis.com/v1/speech:recognize?key=${googleKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            config: {
              encoding: format === 'webm' ? 'WEBM_OPUS' : 'MP3',
              sampleRateHertz: 16000,
              languageCode: 'en-US',
              enableAutomaticPunctuation: true,
            },
            audio: {
              content: audio,
            },
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Google Speech API error:', errorText);
        throw new Error('Google Speech API failed');
      }

      const result = await response.json();
      const transcript = result.results?.[0]?.alternatives?.[0]?.transcript || '';
      
      return new Response(
        JSON.stringify({ 
          text: transcript,
          success: true,
          provider: 'google'
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } else {
      // No API keys configured - return helpful error
      return new Response(
        JSON.stringify({ 
          error: 'Speech-to-text service not configured. Please add OPENAI_API_KEY or GOOGLE_CLOUD_API_KEY to Supabase secrets.',
          text: '',
          success: false
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

  } catch (error: unknown) {
    console.error('Speech-to-text error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage, text: '', success: false }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
