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

// Get a valid token, refresh if expired
export async function getValidToken(): Promise<string> {
  // Try to get current session
  const { data: { session } } = await supabase.auth.getSession();

  if (session?.access_token) {
    return session.access_token; // still valid
  }

  // Try to refresh automatically (uses stored refresh token)
r  const { data, error } = await supabase.auth.refreshSession();
  if (error || !data.session?.access_token) {
    throw new Error('User not logged in or session expired');
  }

  return data.session.access_token;
}

// Call your private function
export async function callPrivateFunction(prompt: string): Promise<any> {
  const token = await getValidToken(); // always a valid JWT

  const res = await fetch(`https://yvpafwyfcgzdtiaenylu.supabase.co/functions/v1/generate-content`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // MUST include JWT
    },
    body: JSON.stringify({ prompt }),
  });

  if (!res.ok) {
    throw new Error(`Error ${res.status}: ${await res.text()}`);
  }

  return res.json(); // or res.text() depending on your function
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
