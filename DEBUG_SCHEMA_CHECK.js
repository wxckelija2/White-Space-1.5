// 🚀 Debug Script to Check Actual Database Schema
// Run this with: node DEBUG_SCHEMA_CHECK.js

const supabaseUrl = 'https://yvpafwyfcgzdtiaenylu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2cGFmd3lmY2d6ZHRpYWVueWx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU0MTkyMTMsImV4cCI6MjA4MDk5NTIxM30.z0rVDKEP-Ae47hbT0tZ6Fi_b793y6GcyZ8bSO9M-V3I';

async function checkTableSchema() {
  console.log('🔍 Checking actual database schema for drafts table...\n');

  const queries = [
    {
      name: 'Table exists check',
      query: 'SELECT table_name FROM information_schema.tables WHERE table_schema = \'public\' AND table_name = \'drafts\''
    },
    {
      name: 'Column information',
      query: 'SELECT column_name, data_type, is_nullable, column_default FROM information_schema.columns WHERE table_schema = \'public\' AND table_name = \'drafts\' ORDER BY ordinal_position'
    },
    {
      name: 'Constraints check',
      query: 'SELECT conname as constraint_name, pg_get_constraintdef(oid) as definition FROM pg_constraint WHERE conrelid = \'drafts\'::regclass'
    }
  ];

  for (const { name, query } of queries) {
    console.log(`📊 ${name}:`);

    try {
      const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseKey}`,
          'apikey': supabaseKey,
        },
        body: JSON.stringify({ query })
      });

      if (response.ok) {
        const data = await response.json();
        console.log(JSON.stringify(data, null, 2));
      } else {
        console.log(`❌ Query failed: ${response.status}`);
        const error = await response.text();
        console.log(error);
      }
    } catch (error) {
      console.log(`💥 Error: ${error.message}`);
    }

    console.log('\n' + '='.repeat(50) + '\n');
  }
}

async function testBasicQuery() {
  console.log('🔍 Testing basic drafts table query...\n');

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/drafts?select=*&limit=1`, {
      headers: {
        'Authorization': `Bearer ${supabaseKey}`,
        'apikey': supabaseKey,
      }
    });

    console.log(`Status: ${response.status}`);
    const data = await response.json();
    console.log('Response:', JSON.stringify(data, null, 2));

  } catch (error) {
    console.log(`💥 Error: ${error.message}`);
  }
}

async function runAllChecks() {
  await checkTableSchema();
  await testBasicQuery();
}

runAllChecks();