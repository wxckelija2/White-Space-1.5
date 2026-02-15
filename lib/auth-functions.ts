import { supabase } from './supabase';

// Log in a user
export async function loginUser(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  console.log("Logged in:", data.user.email);
  return data.session.access_token; // valid JWT
}

// Log out a user
export async function logoutUser() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
  console.log("Logged out");
}

// Get a valid token - simplified approach
export async function getValidToken(): Promise<string> {
  // getSession() automatically refreshes expired tokens
  const { data: { session }, error } = await supabase.auth.getSession();

  if (error) {
    console.error('Session error:', error);
    throw new Error('Session error: ' + error.message);
  }

  if (!session?.access_token) {
    console.log('No active session found');
    throw new Error('No active session. User must log in.');
  }

  console.log('Using access token:', session.access_token ? 'present' : 'missing');
  return session.access_token;
}

// Call your private function
export async function callPrivateFunction(prompt: string): Promise<any> {
  console.log('🔗 callPrivateFunction called with prompt:', prompt);

  const token = await getValidToken(); // always a valid JWT
  console.log('🔑 Got token, making API call...');

  const url = `https://yvpafwyfcgzdtiaenylu.supabase.co/functions/v1/generate-content`;
  console.log('🌐 Calling URL:', url);

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // MUST include JWT
    },
    body: JSON.stringify({ prompt }),
  });

  console.log('📡 Response status:', res.status);
  console.log('📡 Response headers:', Object.fromEntries(res.headers.entries()));

  if (!res.ok) {
    const errorText = await res.text();
    console.error('❌ API Error:', res.status, errorText);
    throw new Error(`Error ${res.status}: ${errorText}`);
  }

  const result = await res.json();
  console.log('✅ API Success:', result);
  return result;
}

// Check if user is currently authenticated
export async function isAuthenticated(): Promise<boolean> {
  try {
    const token = await getValidToken();
    return !!token;
  } catch {
    return false;
  }
}

// Get current user info
export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

// Get user's language preference
export async function getUserLanguage(): Promise<string> {
  try {
    const user = await getCurrentUser();
    if (!user) return 'en';

    const { data: settings } = await supabase
      .from('user_settings')
      .select('preferences')
      .eq('user_id', user.id)
      .maybeSingle();

    return settings?.preferences?.language || 'en';
  } catch (error) {
    console.error('Error getting user language:', error);
    return 'en';
  }
}

// Set user's language preference
export async function setUserLanguage(languageCode: string): Promise<void> {
  try {
    const user = await getCurrentUser();
    if (!user) throw new Error('No authenticated user');

    await supabase
      .from('user_settings')
      .upsert({
        user_id: user.id,
        preferences: { language: languageCode },
        updated_at: new Date().toISOString(),
      });
  } catch (error) {
    console.error('Error setting user language:', error);
    throw error;
  }
}
