// 🚀 Check RLS policies and actual table structure

const supabaseUrl = 'https://yvpafwyfcgzdtiaenylu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2cGFmd3lmY2d6ZHRpYWVueWx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU0MTkyMTMsImV4cCI6MjA4MDk5NTIxM30.z0rVDKEP-Ae47hbT0tZ6Fi_b793y6GcyZ8bSO9M-V3I';

async function checkRLS() {
  console.log('🔍 Checking RLS policies on drafts table...\n');

  // Try to get RLS policies
  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/get_rls_policies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseKey}`,
        'apikey': supabaseKey,
      },
      body: JSON.stringify({ table_name: 'drafts' })
    });

    console.log(`📊 RLS check response: ${response.status}`);
    const data = await response.text();
    console.log('RLS data:', data);

  } catch (error) {
    console.log(`💥 RLS check error: ${error.message}`);
  }
}

async function checkInsertWithUserId() {
  console.log('\n🔍 Testing insert with user_id (from auth context)...\n');

  const draftWithUserId = {
    user_id: '4c4f1593-b4a8-4a2c-a471-f4c83e828b19', // From your logs
    status: 'generating',
    is_locked: false
  };

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/drafts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseKey}`,
        'apikey': supabaseKey,
      },
      body: JSON.stringify(draftWithUserId)
    });

    console.log(`📊 Insert with user_id response: ${response.status}`);
    const data = await response.text();
    console.log('Response:', data);

  } catch (error) {
    console.log(`💥 Error: ${error.message}`);
  }
}

async function checkTableInfo() {
  console.log('\n🔍 Checking table information...\n');

  // Try to get table description
  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/drafts?select=*&limit=0`, {
      headers: {
        'Authorization': `Bearer ${supabaseKey}`,
        'apikey': supabaseKey,
      }
    });

    console.log(`📊 Table info response: ${response.status}`);
    console.log('Headers:', Object.fromEntries(response.headers.entries()));

  } catch (error) {
    console.log(`💥 Error: ${error.message}`);
  }
}

async function runChecks() {
  await checkRLS();
  await checkInsertWithUserId();
  await checkTableInfo();
}

runChecks();