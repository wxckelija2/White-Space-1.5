// Quick verification that your AI setup is working
console.log('🔍 White-Space AI Setup Verification');
console.log('=====================================');

// Check environment variables
console.log('\n📋 Environment Variables:');
console.log('   EXPO_PUBLIC_AI_PROVIDER:', process.env.EXPO_PUBLIC_AI_PROVIDER || '❌ NOT SET (should be "gemini")');
console.log('   EXPO_PUBLIC_SUPABASE_URL:', process.env.EXPO_PUBLIC_SUPABASE_URL ? '✅ SET' : '❌ NOT SET');
console.log('   EXPO_PUBLIC_SUPABASE_ANON_KEY:', process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ? '✅ SET' : '❌ NOT SET');

// Check AI service
console.log('\n🤖 AI Service Status:');
try {
  const { aiService } = require('./lib/ai');
  console.log('   Current provider:', aiService.provider);
  console.log('   Available providers:', aiService.getAvailableProviders().join(', '));

  if (aiService.provider === 'gemini') {
    console.log('   ✅ SUCCESS: Using real Edge Function!');
  } else {
    console.log('   ❌ ISSUE: Still using mock mode. Check EXPO_PUBLIC_AI_PROVIDER=gemini in .env');
  }
} catch (error) {
  console.log('   ❌ ERROR loading AI service:', error.message);
}

console.log('\n📝 Next Steps:');
if (process.env.EXPO_PUBLIC_AI_PROVIDER === 'gemini') {
  console.log('   ✅ Your setup looks good! Test AI generation in your app.');
} else {
  console.log('   1. Create .env file with EXPO_PUBLIC_AI_PROVIDER=gemini');
  console.log('   2. Stop Expo server: Ctrl+C');
  console.log('   3. Clear cache: npx expo start -c');
  console.log('   4. Test again!');
}
