// 🚀 Simple Schema Check
// Let's try different column names that might exist

const supabaseUrl = 'https://yvpafwyfcgzdtiaenylu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2cGFmd3lmY2d6ZHRpYWVueWx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU0MTkyMTMsImV4cCI6MjA4MDk5NTIxM30.z0rVDKEP-Ae47hbT0tZ6Fi_b793y6GcyZ8bSO9M-V3I';

async function testColumnNames() {
  console.log('🔍 Testing different column names that might exist...\n');

  const possibleColumns = [
    'id', 'project_id', 'parent_draft_id', 'version_number', 'title',
    'content', 'status', 'is_locked', 'locked_at', 'metadata', 'created_at',
    // Alternative names
    'projectid', 'parentdraftid', 'versionnumber', 'islocked', 'lockedat'
  ];

  for (const column of possibleColumns) {
    try {
      const response = await fetch(`${supabaseUrl}/rest/v1/drafts?select=${column}&limit=1`, {
        headers: {
          'Authorization': `Bearer ${supabaseKey}`,
          'apikey': supabaseKey,
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log(`✅ Column '${column}' exists`);
        if (data.length > 0) {
          console.log(`   Sample value:`, data[0][column]);
        }
      } else {
        console.log(`❌ Column '${column}' does not exist or access denied`);
      }
    } catch (error) {
      console.log(`💥 Error testing '${column}': ${error.message}`);
    }
  }
}

async function testInsertWithDifferentColumns() {
  console.log('\n🔍 Testing insert with minimal required columns...\n');

  const testData = {
    id: 'test-' + Date.now(),
    project_id: 'd9910c29-e6c5-4cd8-afb5-32cd3a8dcc24',
    version_number: 999,
    title: 'Test Draft',
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
      body: JSON.stringify(testData)
    });

    console.log(`Status: ${response.status}`);
    const data = await response.text();
    console.log('Response:', data);

  } catch (error) {
    console.log(`💥 Error: ${error.message}`);
  }
}

async function runChecks() {
  await testColumnNames();
  await testInsertWithDifferentColumns();
}

runChecks();