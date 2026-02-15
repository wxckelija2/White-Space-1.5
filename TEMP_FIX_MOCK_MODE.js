// 🚀 Temporary Fix: Switch to Mock Mode for Fast Testing
// This temporarily changes the AI service to use mock generation

const fs = require('fs');
const path = require('path');

// Path to the AI service file
const aiServicePath = path.join(__dirname, 'lib', 'ai.ts');

// Read the current file
let content = fs.readFileSync(aiServicePath, 'utf8');

// Change the default provider from 'mock' to ensure it's using mock
// Actually, looking at the code, it already defaults to 'mock' unless EXPO_PUBLIC_AI_PROVIDER is set
// So the issue is likely that EXPO_PUBLIC_AI_PROVIDER is set to 'gemini' but not working

console.log('🔍 Current AI Service Configuration:');

// Check if provider is hardcoded
const providerMatch = content.match(/private provider: AIProvider = ['"]([^'"]+)['"]/);
if (providerMatch) {
  console.log(`- Default provider: ${providerMatch[1]}`);
} else {
  console.log('- Default provider: Not found');
}

// Check constructor logic
const constructorMatch = content.match(/const provider = process\.env\.EXPO_PUBLIC_AI_PROVIDER as AIProvider;/);
if (constructorMatch) {
  console.log('- Constructor uses environment variable: EXPO_PUBLIC_AI_PROVIDER');
}

console.log('\n🔧 Quick Fix Options:');
console.log('1. Temporarily set EXPO_PUBLIC_AI_PROVIDER=mock in your .env file');
console.log('2. Or comment out the environment check to force mock mode');
console.log('3. Or check if your Gemini API key and Supabase Edge Function are working');

console.log('\n📝 To force mock mode temporarily, you can:');
console.log('- Set EXPO_PUBLIC_AI_PROVIDER=mock in your .env file');
console.log('- Or restart your app after clearing any cached environment variables');

console.log('\n🚀 Expected Results:');
console.log('- Mock mode: 1.5-2.5 seconds (fast)');
console.log('- Gemini mode: 5-15 seconds (normal for AI generation)');
console.log('- If much slower: There\'s likely a configuration or network issue');