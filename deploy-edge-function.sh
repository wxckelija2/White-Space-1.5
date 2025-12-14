#!/bin/bash

# Deploy the Gemini Edge Function

echo "🚀 Deploying Gemini Edge Function..."

# Set your Gemini API key as a secret
echo "Setting up environment secrets..."
supabase secrets set GEMINI_API_KEY=your_actual_gemini_api_key_here

# Deploy the function
echo "Deploying function..."
supabase functions deploy generate-content

echo "✅ Edge Function deployed!"
echo ""
echo "📝 Next steps:"
echo "1. Update your .env file: EXPO_PUBLIC_AI_PROVIDER=gemini"
echo "2. Restart your Expo app"
echo "3. Test project creation - it should work now!"
echo ""
echo "🔧 To test the function directly:"
echo "supabase functions invoke generate-content --data '{\"prompt\":\"Hello world\",\"type\":\"generate\"}'"