# AI Integration Setup

White Space supports multiple AI providers for content generation. By default, it uses a mock provider for development.

## Supported Providers

### 1. Mock (Default)
- No API key required
- Generates placeholder content for testing
- Set `EXPO_PUBLIC_AI_PROVIDER=mock`

### 2. Hugging Face
- Free tier available
- Good for text generation and summarization
- Sign up at: https://huggingface.co/join
- Get API key from: https://huggingface.co/settings/tokens
- Set `EXPO_PUBLIC_AI_PROVIDER=huggingface`
- Set `EXPO_PUBLIC_HUGGINGFACE_API_KEY=your_api_key`

### 3. OpenAI
- Paid service
- High-quality GPT models
- Sign up at: https://platform.openai.com/
- Get API key from dashboard
- Set `EXPO_PUBLIC_AI_PROVIDER=openai`
- Set `EXPO_PUBLIC_OPENAI_API_KEY=your_api_key`

### 4. Anthropic
- Paid service
- Claude models
- Sign up at: https://console.anthropic.com/
- Get API key from dashboard
- Set `EXPO_PUBLIC_AI_PROVIDER=anthropic`
- Set `EXPO_PUBLIC_ANTHROPIC_API_KEY=your_api_key`

## Environment Variables

Create a `.env` file in the project root with your chosen configuration:

```env
# Choose your provider
EXPO_PUBLIC_AI_PROVIDER=huggingface

# Add your API key
EXPO_PUBLIC_HUGGINGFACE_API_KEY=your_actual_api_key_here

# Other required variables
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Testing AI Integration

1. Set up your environment variables
2. Restart the development server
3. Try creating a new draft in the app
4. Check the console for AI generation logs

## Troubleshooting

- **API Key Issues**: Ensure your API key is valid and has the necessary permissions
- **Rate Limits**: Free tiers have usage limits; consider upgrading for heavy use
- **Network Issues**: Ensure your development environment can reach the API endpoints
- **Fallback**: If AI generation fails, the app will automatically fall back to mock responses
