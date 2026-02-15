// Debug environment variables and AI provider setup
console.log('🔍 Environment & AI Debug Report');
console.log('================================');

// 1. Check all relevant environment variables
console.log('\n1. Environment Variables:');
console.log('   EXPO_PUBLIC_AI_PROVIDER:', process.env.EXPO_PUBLIC_AI_PROVIDER || '❌ NOT SET');
console.log('   EXPO_PUBLIC_SUPABASE_URL:', process.env.EXPO_PUBLIC_SUPABASE_URL ? '✅ SET' : '❌ NOT SET');
console.log('   EXPO_PUBLIC_SUPABASE_ANON_KEY:', process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ? '✅ SET' : '❌ NOT SET');

// 2. Test AI service initialization
console.log('\n2. AI Service Status:');
import { aiService } from './lib/ai';
console.log('   Current provider:', aiService.provider);
console.log('   Available providers:', aiService.getAvailableProviders());

// 3. Test a simple AI call
console.log('\n3. AI Function Test:');
const testTask = {
  type: 'generate',
  prompt: 'Say hello'
};

aiService.generate(testTask)
  .then(result => {
    console.log('   ✅ AI call successful');
    console.log('   Provider used:', result.metadata?.provider);
    console.log('   Content preview:', result.content.substring(0, 50) + '...');
  })
  .catch(error => {
    console.log('   ❌ AI call failed:', error.message);
  });

// 4. Instructions
console.log('\n📋 If EXPO_PUBLIC_AI_PROVIDER is not set:');
console.log('   1. Add to your .env file: EXPO_PUBLIC_AI_PROVIDER=gemini');
console.log('   2. Stop Expo dev server');
console.log('   3. Clear cache: npx expo start -c');
console.log('   4. Restart the app');
console.log('\n   Expected result: Current provider should be "gemini"');
