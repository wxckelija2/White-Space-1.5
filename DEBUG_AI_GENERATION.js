// 🚀 Debug Script for AI Generation Performance Issues
// Run this with: node DEBUG_AI_GENERATION.js

const https = require('https');
const { performance } = require('perf_hooks');

// Test Supabase Edge Function directly
async function testEdgeFunction() {
  console.log('🔍 Testing Supabase Edge Function...');

  const startTime = performance.now();

  const postData = JSON.stringify({
    prompt: "Write a short paragraph about artificial intelligence",
    type: "generate"
  });

  // Use the actual Supabase URL from environment
  const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://yvpafwyfcgzdtiaenylu.supabase.co';
  const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2cGFmd3lmY2d6ZHRpYWVueWx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU0MTkyMTMsImV4cCI6MjA4MDk5NTIxM30.z0rVDKEP-Ae47hbT0tZ6Fi_b793y6GcyZ8bSO9M-V3I';

  const url = `${supabaseUrl.replace(/\/$/, '')}/functions/v1/generate-content`;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${supabaseKey}`,
      'apikey': supabaseKey,
    },
    body: postData
  };

  try {
    const response = await fetch(url, options);
    const endTime = performance.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);

    console.log(`Status: ${response.status}`);
    console.log(`Headers:`, Object.fromEntries(response.headers.entries()));

    const responseText = await response.text();

    try {
      const responseData = JSON.parse(responseText);
      if (response.ok) {
        console.log(`✅ Edge Function Response (${duration}s):`, responseData);
        return { success: true, duration, response: responseData };
      } else {
        console.log(`❌ Edge Function Error (${duration}s):`, responseData);
        return { success: false, duration, error: responseData };
      }
    } catch (e) {
      console.log(`❌ Edge Function Parse Error (${duration}s):`, responseText);
      return { success: false, duration, error: responseText };
    }
  } catch (e) {
    const endTime = performance.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);
    console.log(`❌ Edge Function Network Error (${duration}s):`, e.message);
    return { success: false, duration, error: e.message };
  }
}

// Test Mock Generation Speed
async function testMockGeneration() {
  console.log('\n🔍 Testing Mock Generation Speed...');

  const startTime = performance.now();

  // Simulate the mock delay from ai.ts
  await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

  const endTime = performance.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);

  console.log(`✅ Mock Generation took ${duration}s`);
  return { duration };
}

// Load .env file manually
function loadEnvFile() {
  const fs = require('fs');
  const path = require('path');

  try {
    const envPath = path.join(__dirname, '.env');
    const envContent = fs.readFileSync(envPath, 'utf8');
    const envVars = {};

    envContent.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split('=');
      if (key && valueParts.length > 0) {
        const value = valueParts.join('=').trim();
        if (value) {
          envVars[key.trim()] = value;
          process.env[key.trim()] = value;
        }
      }
    });

    return envVars;
  } catch (error) {
    console.log('⚠️  Could not load .env file:', error.message);
    return {};
  }
}

// Main diagnostic function
async function runDiagnostics() {
  console.log('🚀 AI Generation Performance Diagnostics\n');

  // Load environment variables from .env file
  const loadedVars = loadEnvFile();
  console.log('📋 Environment Check (loaded from .env):');
  Object.keys(loadedVars).forEach(key => {
    if (key.startsWith('EXPO_PUBLIC_')) {
      const displayKey = key.replace('EXPO_PUBLIC_', '');
      const value = loadedVars[key];
      const masked = key.includes('KEY') || key.includes('SECRET') ?
        `${value.substring(0, 10)}...${value.substring(value.length - 4)}` : value;
      console.log(`- ${displayKey}: ${masked}`);
    }
  });
  console.log();

  // Test mock generation
  await testMockGeneration();

  // Test edge function if environment is configured
  if (process.env.EXPO_PUBLIC_SUPABASE_URL && process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY) {
    console.log('\n🔍 Testing Supabase Edge Function (Gemini)...');
    const edgeResult = await testEdgeFunction();

    if (edgeResult.success) {
      console.log('✅ Gemini integration is working!');
    } else {
      console.log('❌ Gemini integration failed. Check:');
      console.log('  - Supabase secrets (GEMINI_API_KEY)');
      console.log('  - Edge function deployment');
      console.log('  - Gemini API key validity');
    }
  } else {
    console.log('\n⚠️  Supabase environment variables not configured - skipping Edge Function test');
  }

  console.log('\n📊 Recommendations:');
  if (process.env.EXPO_PUBLIC_AI_PROVIDER === 'gemini') {
    console.log('1. Gemini mode selected - ensure Edge Function works');
    console.log('2. If Edge Function fails, check Supabase secrets and deployment');
    console.log('3. Expected time: 5-15 seconds for real AI generation');
  } else {
    console.log('1. Currently using mock mode (1.5-2.5s delay)');
    console.log('2. Set EXPO_PUBLIC_AI_PROVIDER=gemini for real AI');
    console.log('3. Ensure Supabase secrets are configured');
  }
}

runDiagnostics().catch(console.error);