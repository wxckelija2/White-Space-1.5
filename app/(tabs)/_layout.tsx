import { useEffect } from 'react';
import { Tabs, useRouter } from 'expo-router';
import { Home, FolderOpen, Settings } from 'lucide-react-native';
import { useAuth } from '@/lib';

export default function TabLayout() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
        router.replace('/login' as any);
    }
  }, [user, loading, router]);

  // Show loading or redirect to login if not authenticated
  if (loading) {
    return null;
  }

  if (!user) {
    return null;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          display: 'none', // Hide bottom tabs completely
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'White Space',
        }}
      />
    </Tabs>
  );
}
