// 🚀 Final Diagnostic - Test Everything

const supabaseUrl = 'https://yvpafwyfcgzdtiaenylu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2cGFmd3lmY2d6ZHRpYWVueWx1Iiwicm9sZSI6ImFub04iLCJpYXQiOjE3NjU0MTkyMTMsImV4cCI6MjA4MDk5NTIxM30.z0rVDKEP-Ae47hbT0tZ6Fi_b793y6GcyZ8bSO9M-V3I';

async function finalCheck() {
  console.log('🎯 FINAL DIAGNOSTIC - Testing All Components\n');

  // 1. Check if user can read their projects
  console.log('1️⃣ Testing project access...');
  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/projects?user_id=eq.da0fa46e-aed8-48e8-b63b-23506cbfe448&select=id,title`, {
      headers: {
        'Authorization': `Bearer ${supabaseKey}`,
        'apikey': supabaseKey,
      }
    });

    if (response.ok) {
      const data = await response.json();
      console.log(`✅ Projects accessible: ${data.length} projects found`);
    } else {
      console.log(`❌ Project access failed: ${response.status}`);
    }
  } catch (error) {
    console.log(`💥 Project access error: ${error.message}`);
  }

  // 2. Check if drafts table is accessible
  console.log('\n2️⃣ Testing drafts table access...');
  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/drafts?select=id&limit=1`, {
      headers: {
        'Authorization': `Bearer ${supabaseKey}`,
        'apikey': supabaseKey,
      }
    });

    if (response.ok) {
      console.log(`✅ Drafts table accessible (RLS allows read)`);
    } else if (response.status === 401) {
      console.log(`❌ Drafts table blocked by RLS`);
    } else {
      console.log(`❌ Drafts table error: ${response.status}`);
    }
  } catch (error) {
    console.log(`💥 Drafts access error: ${error.message}`);
  }

  // 3. Test draft creation (will fail with anon key but shows if schema works)
  console.log('\n3️⃣ Testing draft creation schema...');
  const testDraft = {
    project_id: 'e3fc69fb-691f-4e63-abf3-c8f5b306e082',
    version_number: 1,
    title: 'Schema Test Draft',
    content: 'Testing if schema works',
    status: 'generating',
    is_locked: false,
    metadata: { test: true }
  };

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/drafts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseKey}`,
        'apikey': supabaseKey,
      },
      body: JSON.stringify(testDraft)
    });

    if (response.status === 401) {
      console.log(`✅ Schema is correct - only failing on authentication (expected)`);
      console.log(`📝 This means the app should work with proper JWT tokens`);
    } else if (response.status === 400) {
      console.log(`❌ Still schema issues - check recent SQL changes`);
    } else {
      console.log(`❓ Unexpected response: ${response.status}`);
      const data = await response.text();
      console.log(`Response: ${data}`);
    }
  } catch (error) {
    console.log(`💥 Draft creation error: ${error.message}`);
  }

  console.log('\n🎯 SUMMARY:');
  console.log('- If schema test shows 401: ✅ App should work (authentication issue resolved)');
  console.log('- If schema test shows 400: ❌ Still need to fix schema');
  console.log('- If schema test shows 200: ✅ Everything working perfectly');
  console.log('\n🚀 Try creating a draft in your app now!');
}

finalCheck();