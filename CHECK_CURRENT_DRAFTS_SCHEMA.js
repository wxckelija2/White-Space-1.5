// 🚀 Check what the actual drafts table schema looks like now

const supabaseUrl = 'https://yvpafwyfcgzdtiaenylu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2cGFmd3lmY2d6ZHRpYWVueWx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU0MTkyMTMsImV4cCI6MjA4MDk5NTIxM30.z0rVDKEP-Ae47hbT0tZ6Fi_b793y6GcyZ8bSO9M-V3I';

async function checkCurrentSchema() {
  console.log('🔍 Checking current drafts table schema...\n');

  // Try to get a sample row to see the actual structure
  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/drafts?select=*&limit=1`, {
      headers: {
        'Authorization': `Bearer ${supabaseKey}`,
        'apikey': supabaseKey,
      }
    });

    if (response.ok) {
      const data = await response.json();
      console.log('📊 Sample row from drafts table:');
      if (data.length > 0) {
        console.log(JSON.stringify(data[0], null, 2));
        console.log('\n📋 Columns present:', Object.keys(data[0]));
      } else {
        console.log('No rows in drafts table');
      }
    } else {
      console.log(`❌ Error getting data: ${response.status}`);
      const error = await response.text();
      console.log(error);
    }
  } catch (error) {
    console.log(`💥 Error: ${error.message}`);
  }

  // Test inserting with minimal data to see what fails
  console.log('\n🔍 Testing insert with just required fields...\n');

  const minimalDraft = {
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
      body: JSON.stringify(minimalDraft)
    });

    console.log(`📊 Minimal insert response: ${response.status}`);
    const data = await response.text();
    console.log('Response:', data);

  } catch (error) {
    console.log(`💥 Error: ${error.message}`);
  }
}

checkCurrentSchema();