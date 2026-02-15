# Generate Content Edge Function

This Supabase Edge Function handles Gemini AI API calls server-side to avoid CORS and security issues with client-side API calls.

## Setup

1. **Set your Gemini API key as a secret:**
   ```bash
   supabase secrets set GEMINI_API_KEY=your_actual_gemini_api_key_here
   ```

2. **Deploy the function:**
   ```bash
   supabase functions deploy generate-content
   ```

## Usage

The function accepts POST requests with:
```json
{
  "prompt": "Your content prompt",
  "type": "generate|improve|summarize|expand|rewrite",
  "context": "Optional additional context",
  "parameters": {}
}
```

## Response

Returns:
```json
{
  "content": "Generated content here",
  "metadata": {
    "model": "gemini-1.5-flash",
    "provider": "gemini",
    "tokens": 150,
    "processingTime": 0
  }
}
```

## Testing

Test the function:
```bash
supabase functions invoke generate-content --data '{"prompt":"Hello world","type":"generate"}'
```

## Why Server-Side?

- ✅ No CORS issues
- ✅ API keys stay secure
- ✅ Better error handling
- ✅ Rate limiting possible
- ✅ Caching possible