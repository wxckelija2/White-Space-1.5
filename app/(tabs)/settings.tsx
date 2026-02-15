import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { SafeAreaView as SafeAreaViewContext } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import {
  Cloud,
  Lock,
  Bell,
  Sparkles,
  Info,
  ChevronRight,
  LogOut,
  Crown,
} from 'lucide-react-native';
import { useAuth } from '@/lib';

export default function SettingsScreen() {
  const router = useRouter();
  const { signOut, user } = useAuth();
  const [memoryEnabled, setMemoryEnabled] = useState(true);
  const [localMode, setLocalMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <SafeAreaViewContext style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>
            Manage your preferences
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Integrations</Text>
          <TouchableOpacity style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <View style={styles.iconContainer}>
                <Cloud size={20} color="#666" />
              </View>
              <View>
                <Text style={styles.settingTitle}>Cloud Storage</Text>
                <Text style={styles.settingDescription}>
                  Connect Drive, iCloud, or OneDrive
                </Text>
              </View>
            </View>
            <ChevronRight size={20} color="#999" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy & Data</Text>

          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <View style={styles.iconContainer}>
                <Sparkles size={20} color="#666" />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>Memory & Predictions</Text>
                <Text style={styles.settingDescription}>
                  Learn patterns to suggest actions
                </Text>
              </View>
            </View>
            <Switch
              value={memoryEnabled}
              onValueChange={setMemoryEnabled}
              trackColor={{ false: '#e5e5e5', true: '#000' }}
              thumbColor="#fff"
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <View style={styles.iconContainer}>
                <Lock size={20} color="#666" />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>Local Mode</Text>
                <Text style={styles.settingDescription}>
                  Process data on-device only
                </Text>
              </View>
            </View>
            <Switch
              value={localMode}
              onValueChange={setLocalMode}
              trackColor={{ false: '#e5e5e5', true: '#000' }}
              thumbColor="#fff"
            />
          </View>

          <TouchableOpacity style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <View style={styles.iconContainer}>
                <Info size={20} color="#666" />
              </View>
              <View>
                <Text style={styles.settingTitle}>Data & Privacy</Text>
                <Text style={styles.settingDescription}>
                  View privacy policy
                </Text>
              </View>
            </View>
            <ChevronRight size={20} color="#999" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Subscription</Text>
          <TouchableOpacity
            style={styles.settingRow}
            onPress={() => router.push('/subscription' as any)}
          >
            <View style={styles.settingLeft}>
              <View style={styles.iconContainer}>
                <Crown size={20} color="#f59e0b" />
              </View>
              <View>
                <Text style={styles.settingTitle}>Manage Subscription</Text>
                <Text style={styles.settingDescription}>
                  Upgrade to unlock premium features
                </Text>
              </View>
            </View>
            <ChevronRight size={20} color="#999" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>

          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <View style={styles.iconContainer}>
                <Bell size={20} color="#666" />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>Push Notifications</Text>
                <Text style={styles.settingDescription}>
                  Get notified when outputs are ready
                </Text>
              </View>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#e5e5e5', true: '#000' }}
              thumbColor="#fff"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>

          <TouchableOpacity
            style={styles.settingRow}
            onPress={async () => {
              try {
                await signOut();
                router.replace('/login' as any);
              } catch (error) {
                console.error('Sign out error:', error);
              }
            }}
          >
            <View style={styles.settingLeft}>
              <View style={styles.iconContainer}>
                <LogOut size={20} color="#ef4444" />
              </View>
              <View>
                <Text style={[styles.settingTitle, styles.dangerText]}>
                  Sign Out
                </Text>
                {user?.email && (
                  <Text style={styles.settingDescription}>
                    {user.email}
                  </Text>
                )}
              </View>
            </View>
            <ChevronRight size={20} color="#999" />
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>White Space v1.0.0</Text>
          <Text style={styles.footerText}>Made with care</Text>
        </View>
      </ScrollView>
    </SafeAreaViewContext>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    padding: 20,
    paddingBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  section: {
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 13,
    color: '#999',
  },
  dangerText: {
    color: '#ef4444',
  },
  footer: {
    alignItems: 'center',
    paddingTop: 20,
    gap: 4,
  },
  footerText: {
    fontSize: 12,
    color: '#999',
  },
});
