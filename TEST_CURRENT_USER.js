// 🚀 Test with current user from logs

const supabaseUrl = 'https://yvpafwyfcgzdtiaenylu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2cGFmd3lmY2d6ZHRpYWVueWx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU0MTkyMTMsImV4cCI6MjA4MDk5NTIxM30.z0rVDKEP-Ae47hbT0tZ6Fi_b793y6GcyZ8bSO9M-V3I';

// From your logs - current user and project
const currentUserId = 'da0fa46e-aed8-48e8-b63b-23506cbfe448';
const currentProjectId = 'e3fc69fb-691f-4e63-abf3-c8f5b306e082';

async function checkCurrentUserProjects() {
  console.log('🔍 Checking projects for current user...\n');

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/projects?user_id=eq.${currentUserId}&select=*`, {
      headers: {
        'Authorization': `Bearer ${supabaseKey}`,
        'apikey': supabaseKey,
      }
    });

    console.log(`📊 Projects query status: ${response.status}`);
    const data = await response.json();
    console.log('📊 User projects:', JSON.stringify(data, null, 2));

  } catch (error) {
    console.log(`💥 Error: ${error.message}`);
  }
}

async function testDraftCreation() {
  console.log('\n🔍 Testing draft creation with current user...\n');

  const testDraft = {
    project_id: currentProjectId,
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
        'Authorization': `Bearer ${supabaseKey}`,
        'apikey': supabaseKey,
      },
      body: JSON.stringify(testDraft)
    });

    console.log(`📊 Draft creation status: ${response.status}`);
    const data = await response.text();
    console.log('📊 Response:', data);

    if (response.status === 401) {
      console.log('\n❌ RLS policy violation - this confirms the issue is with authentication');
      console.log('The app should work because it uses the user\'s JWT token');
    }

  } catch (error) {
    console.log(`💥 Error: ${error.message}`);
  }
}

async function checkDraftTableStructure() {
  console.log('\n🔍 Checking drafts table structure...\n');

  // Try to get column info
  const columns = ['id', 'project_id', 'version_number', 'title', 'content', 'status', 'is_locked', 'metadata'];

  for (const column of columns) {
    try {
      const response = await fetch(`${supabaseUrl}/rest/v1/drafts?select=${column}&limit=1`, {
        headers: {
          'Authorization': `Bearer ${supabaseKey}`,
          'apikey': supabaseKey,
        }
      });

      if (response.ok) {
        console.log(`✅ Column '${column}' exists and accessible`);
      } else {
        console.log(`❌ Column '${column}' issue: ${response.status}`);
      }
    } catch (error) {
      console.log(`💥 Error checking '${column}': ${error.message}`);
    }
  }
}

async function runTests() {
  await checkCurrentUserProjects();
  await checkDraftTableStructure();
  await testDraftCreation();
}

runTests();