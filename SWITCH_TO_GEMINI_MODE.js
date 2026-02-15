// 🚀 Switch Back to Gemini Mode After Edge Function Deployment
// Run this AFTER you've deployed the Edge Function and set the secret

const fs = require('fs');

try {
  let envContent = fs.readFileSync('.env', 'utf8');

  // Replace mock with gemini
  envContent = envContent.replace(
    'EXPO_PUBLIC_AI_PROVIDER=mock',
    'EXPO_PUBLIC_AI_PROVIDER=gemini'
  );

  fs.writeFileSync('.env', envContent);

  console.log('✅ Switched back to Gemini mode');
  console.log('🔄 Restart your Expo server to apply changes');
  console.log('⚡ Expected generation time: 5-15 seconds (real AI)');
  console.log('');
  console.log('📋 Next steps:');
  console.log('1. Deploy Edge Function (see DEPLOY_EDGE_FUNCTION_GUIDE.md)');
  console.log('2. Set GEMINI_API_KEY secret in Supabase dashboard');
  console.log('3. Test the function in Supabase dashboard');
  console.log('4. Run this script to switch to Gemini mode');
  console.log('5. Restart Expo server');
  console.log('6. Test generation in your app');

} catch (error) {
  console.log('❌ Error switching to Gemini mode:', error.message);
  console.log('Manually change EXPO_PUBLIC_AI_PROVIDER=gemini in your .env file');
}