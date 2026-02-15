// 🚀 Temporary Switch to Mock Mode for Fast Testing
// Run this to switch to mock mode while you set up Gemini

const fs = require('fs');

try {
  let envContent = fs.readFileSync('.env', 'utf8');

  // Replace gemini with mock
  envContent = envContent.replace(
    'EXPO_PUBLIC_AI_PROVIDER=gemini',
    'EXPO_PUBLIC_AI_PROVIDER=mock'
  );

  fs.writeFileSync('.env', envContent);

  console.log('✅ Switched to mock mode for fast testing');
  console.log('🔄 Restart your Expo server to apply changes');
  console.log('⚡ Expected generation time: 1.5-2.5 seconds');

} catch (error) {
  console.log('❌ Error switching to mock mode:', error.message);
  console.log('Manually change EXPO_PUBLIC_AI_PROVIDER=mock in your .env file');
}