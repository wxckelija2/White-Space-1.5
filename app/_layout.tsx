import { useState } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { AuthProvider } from '@/lib';
import SplashAnimation from '@/components/SplashAnimation';

export default function RootLayout() {
  useFrameworkReady();
  const [showSplash, setShowSplash] = useState(true);

  return (
    <AuthProvider>
      {showSplash && (
        <SplashAnimation onAnimationComplete={() => setShowSplash(false)} />
      )}
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="draft-workspace/[projectId]" options={{ headerShown: false }} />
        <Stack.Screen name="draft-compare/[projectId]" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </AuthProvider>
  );
}
