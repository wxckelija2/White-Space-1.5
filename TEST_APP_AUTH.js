// 🚀 Test what happens when app tries to create draft
// This simulates the exact call the app makes

const supabaseUrl = 'https://yvpafwyfcgzdtiaenylu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2cGFmd3lmY2d6ZHRpYWVueWx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU0MTkyMTMsImV4cCI6MjA4MDk5NTIxM30.z0rVDKEP-Ae47hbT0tZ6Fi_b793y6GcyZ8bSO9M-V3I';

async function testAppDraftCreation() {
  console.log('🔍 Testing the exact draft creation call from the app...\n');

  const draftData = {
    project_id: 'e3fc69fb-691f-4e63-abf3-c8f5b306e082',
    version_number: 1,
    title: 'Draft v1',
    content: '',
    status: 'generating',
    is_locked: false,
    metadata: {
      prompt: 'Create a 3-slide pitch deck for my app idea',
      intent: 'generate'
    }
  };

  // This is the exact URL pattern the app uses
  const url = `${supabaseUrl}/rest/v1/drafts?columns=%22project_id%22%2C%22version_number%22%2C%22title%22%2C%22content%22%2C%22status%22%2C%22is_locked%22%2C%22metadata%22&select=*`;

  console.log('📡 App uses URL:', url);
  console.log('📦 App sends data:', JSON.stringify(draftData, null, 2));

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseKey}`,
        'apikey': supabaseKey,
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(draftData)
    });

    console.log(`📊 Response Status: ${response.status}`);
    console.log(`📊 Response Headers:`, Object.fromEntries(response.headers.entries()));

    const responseText = await response.text();
    console.log(`📄 Response Body:`, responseText);

    if (response.status === 400) {
      console.log('\n❌ This matches the app error!');
      console.log('Possible causes:');
      console.log('1. RLS policy blocking (expected with anon key)');
      console.log('2. Schema issue still exists');
      console.log('3. App should work with user JWT token');
    }

  } catch (error) {
    console.log(`💥 Network error: ${error.message}`);
  }
}

async function testWithMockJWT() {
  console.log('\n🔍 Testing with a mock JWT token (simulating user auth)...\n');

  // Create a mock JWT (this won't work but shows the structure)
  const mockJWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkYTBmYTQ2ZS1hZWQ4LTQ4ZTgtYjYzYi0yMzUwNmNiZmU0NDgiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJpYXQiOjE3NjU2OTA3MzEsImV4cCI6MTc2NTc3NzEzMX0.mock_signature';

  const draftData = {
    project_id: 'e3fc69fb-691f-4e63-abf3-c8f5b306e082',
    version_number: 1,
    title: 'Draft v1',
    content: '',
    status: 'generating',
    is_locked: false,
    metadata: {
      prompt: 'Create a 3-slide pitch deck for my app idea',
      intent: 'generate'
    }
  };

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/drafts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${mockJWT}`,
        'apikey': supabaseKey,
      },
      body: JSON.stringify(draftData)
    });

    console.log(`📊 Mock JWT Response Status: ${response.status}`);
    const data = await response.text();
    console.log('Response:', data);

  } catch (error) {
    console.log(`💥 Error: ${error.message}`);
  }
}

async function runTests() {
  await testAppDraftCreation();
  await testWithMockJWT();
}

runTests();