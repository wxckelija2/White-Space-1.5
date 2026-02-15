// 🚀 Check Projects Table Schema

const supabaseUrl = 'https://yvpafwyfcgzdtiaenylu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2cGFmd3lmY2d6ZHRpYWVueWx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU0MTkyMTMsImV4cCI6MjA4MDk5NTIxM30.z0rVDKEP-Ae47hbT0tZ6Fi_b793y6GcyZ8bSO9M-V3I';

async function checkProjectsColumns() {
  console.log('🔍 Checking projects table columns...\n');

  const possibleColumns = [
    'id', 'user_id', 'title', 'input_type', 'input_content', 'input_url',
    'intent', 'tags', 'status', 'created_at', 'updated_at'
  ];

  for (const column of possibleColumns) {
    try {
      const response = await fetch(`${supabaseUrl}/rest/v1/projects?select=${column}&limit=1`, {
        headers: {
          'Authorization': `Bearer ${supabaseKey}`,
          'apikey': supabaseKey,
        }
      });

      if (response.ok) {
        console.log(`✅ Projects column '${column}' exists`);
      } else {
        console.log(`❌ Projects column '${column}' does not exist`);
      }
    } catch (error) {
      console.log(`💥 Error testing '${column}': ${error.message}`);
    }
  }
}

async function checkAllTables() {
  console.log('\n🔍 Checking what tables exist...\n');

  const tables = ['projects', 'drafts', 'draft_outputs', 'user_settings'];

  for (const table of tables) {
    try {
      const response = await fetch(`${supabaseUrl}/rest/v1/${table}?select=id&limit=1`, {
        headers: {
          'Authorization': `Bearer ${supabaseKey}`,
          'apikey': supabaseKey,
        }
      });

      if (response.ok) {
        console.log(`✅ Table '${table}' exists`);
      } else {
        console.log(`❌ Table '${table}' does not exist or access denied`);
      }
    } catch (error) {
      console.log(`💥 Error checking '${table}': ${error.message}`);
    }
  }
}

async function runChecks() {
  await checkAllTables();
  await checkProjectsColumns();
}

runChecks();