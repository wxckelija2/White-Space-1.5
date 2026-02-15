// Comprehensive 401 error debugging for Supabase Edge Functions

import { supabase } from './lib/supabase';

async function debug401Error() {
  console.log('🔍 Debugging 401 Authorization Error\n');

  // 1. Check Supabase client configuration
  console.log('1. Supabase Client Configuration:');
  console.log('   - URL configured:', !!process.env.EXPO_PUBLIC_SUPABASE_URL);
  console.log('   - Anon key configured:', !!process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY);

  // 2. Check auth session
  console.log('\n2. Authentication Status:');
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    console.log('   - Has session:', !!session);
    console.log('   - Session error:', error?.message || 'None');
    if (session) {
      console.log('   - Access token exists:', !!session.access_token);
    }
  } catch (err) {
    console.log('   - Session check failed:', err.message);
  }

  // 3. Test direct Edge Function call (this should work)
  console.log('\n3. Direct Edge Function Test:');
  try {
    const { data, error } = await supabase.functions.invoke('generate-content', {
      body: { prompt: 'Test poem', type: 'generate' }
    });

    if (error) {
      console.log('   ❌ Edge Function error:', error);
      console.log('   - Error code:', error.code);
      console.log('   - Error message:', error.message);
    } else {
      console.log('   ✅ Edge Function success!');
      console.log('   - Response:', data);
    }
  } catch (err) {
    console.log('   ❌ Network error:', err.message);
  }

  // 4. Check AI service configuration
  console.log('\n4. AI Service Configuration:');
  console.log('   - EXPO_PUBLIC_AI_PROVIDER:', process.env.EXPO_PUBLIC_AI_PROVIDER || 'undefined (defaults to mock)');
  console.log('   - Should be set to "gemini" for Edge Function calls');

  // 5. Manual fetch test (bypasses Supabase client)
  console.log('\n5. Manual Fetch Test (bypassing Supabase client):');
  const url = `${process.env.EXPO_PUBLIC_SUPABASE_URL}/functions/v1/generate-content`;
  const anonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${anonKey}`,
        'Content-Type': 'application/json',
        'apikey': anonKey,
      },
      body: JSON.stringify({ prompt: 'Manual test', type: 'generate' }),
    });

    console.log('   - Status:', response.status);
    const responseData = await response.json();
    console.log('   - Response:', responseData);
  } catch (err) {
    console.log('   ❌ Manual fetch failed:', err.message);
  }

  console.log('\n📋 Solutions:');
  console.log('1. Set EXPO_PUBLIC_AI_PROVIDER=gemini in your .env file');
  console.log('2. Ensure your .env has correct SUPABASE_URL and SUPABASE_ANON_KEY');
  console.log('3. Restart your Expo app after changing environment variables');
  console.log('4. If using authenticated calls, ensure user has active session');
}

// Run the debug
debug401Error().catch(console.error);
