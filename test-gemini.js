// Test if Gemini AI service is properly initialized
console.log('🔍 Testing Gemini AI Service Initialization...\n');

// Import the Gemini service
const { geminiChatService } = require('./lib/ai.ts');

console.log('Gemini service available:', geminiChatService.isAvailable());

if (geminiChatService.isAvailable()) {
  console.log('✅ Gemini is ready to use!');
} else {
  console.log('❌ Gemini is not available - will use mock mode');

  // Check environment variables
  console.log('API Key exists:', !!process.env.EXPO_PUBLIC_GEMINI_API_KEY);
  console.log('Provider setting:', process.env.EXPO_PUBLIC_AI_PROVIDER);
}

// Test the AI service provider
const { aiService } = require('./lib/ai.ts');
console.log('AI Service provider:', aiService.getProvider());