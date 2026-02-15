// 🚀 Debug Script for Draft Creation 400 Error
// Run this with: node DEBUG_DRAFT_CREATION.js

const https = require('https');

// Test data from your error
const testProjectId = 'd9910c29-e6c5-4cd8-afb5-32cd3a8dcc24'; // From your logs
const supabaseUrl = 'https://yvpafwyfcgzdtiaenylu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2cGFmd3lmY2d6ZHRpYWVueWx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU0MTkyMTMsImV4cCI6MjA4MDk5NTIxM30.z0rVDKEP-Ae47hbT0tZ6Fi_b793y6GcyZ8bSO9M-V3I';

const testDraft = {
  project_id: testProjectId,
  version_number: 1,
  title: 'Draft v1',
  content: '',
  status: 'generating',
  is_locked: false,
  metadata: {
    prompt: 'test prompt',
    intent: 'generate'
  }
};

async function testDraftCreation() {
  console.log('🔍 Testing Draft Creation...\n');

  const postData = JSON.stringify(testDraft);
  const url = `${supabaseUrl}/rest/v1/drafts?columns=%22project_id%22%2C%22version_number%22%2C%22title%22%2C%22content%22%2C%22status%22%2C%22is_locked%22%2C%22metadata%22&select=*`;

  console.log('📡 Making request to:', url);
  console.log('📦 Sending data:', JSON.stringify(testDraft, null, 2));

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${supabaseKey}`,
      'apikey': supabaseKey,
      'Prefer': 'return=representation'
    },
    body: postData
  };

  try {
    const response = await fetch(url, options);
    console.log(`📊 Response Status: ${response.status}`);
    console.log(`📊 Response Headers:`, Object.fromEntries(response.headers.entries()));

    const responseText = await response.text();
    console.log(`📄 Response Body:`, responseText);

    if (!response.ok) {
      console.log('\n❌ Draft creation failed!');
      console.log('Possible causes:');
      console.log('1. Invalid project_id (project doesn\'t exist)');
      console.log('2. RLS policy blocking insert');
      console.log('3. Foreign key constraint violation');
      console.log('4. Invalid data type or constraint violation');
    } else {
      console.log('\n✅ Draft creation successful!');
    }

  } catch (error) {
    console.log('\n💥 Network error:', error.message);
  }
}

// Test if the project exists
async function testProjectExists() {
  console.log('\n🔍 Checking if project exists...\n');

  const url = `${supabaseUrl}/rest/v1/projects?id=eq.${testProjectId}&select=id,user_id,title`;

  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${supabaseKey}`,
        'apikey': supabaseKey,
      }
    });

    const data = await response.json();
    console.log('📊 Project check response:', data);

    if (data.length === 0) {
      console.log('❌ Project does not exist! This would cause the foreign key constraint error.');
    } else {
      console.log('✅ Project exists, so foreign key is not the issue.');
    }

  } catch (error) {
    console.log('💥 Error checking project:', error.message);
  }
}

// Test RLS policies
async function testRLSPolicies() {
  console.log('\n🔍 Testing RLS policies...\n');

  // Try to get existing drafts for this project
  const url = `${supabaseUrl}/rest/v1/drafts?project_id=eq.${testProjectId}&select=id`;

  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${supabaseKey}`,
        'apikey': supabaseKey,
      }
    });

    console.log(`📊 RLS test response status: ${response.status}`);
    const data = await response.json();
    console.log('📊 Existing drafts:', data);

  } catch (error) {
    console.log('💥 Error testing RLS:', error.message);
  }
}

async function runDiagnostics() {
  await testProjectExists();
  await testRLSPolicies();
  await testDraftCreation();
}

runDiagnostics();