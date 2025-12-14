const fetch = require('node-fetch');

// Mock the fetch for Node.js environment
global.fetch = fetch;

// Load environment variables
require('dotenv').config();

// Simple Gemini test
async function testGeminiDirect() {
  try {
    const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
    console.log('🧪 Testing Gemini API directly...');
    console.log('API Key present:', !!apiKey);

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: 'Write a one-sentence summary about artificial intelligence.'
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 100,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    console.log('✅ Gemini API working!');
    console.log('Response:', result.candidates?.[0]?.content?.parts?.[0]?.text?.substring(0, 100) + '...');

  } catch (error) {
    console.error('❌ Gemini test failed:', error.message);
  }
}

testGeminiDirect();
