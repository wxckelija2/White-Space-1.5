import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { supabase } from '@/lib/supabase';
import { testDatabaseAccess } from '@/lib/stripe';
import { Crown, Users, BarChart3, DollarSign, RefreshCw, X, Database } from 'lucide-react-native';

interface AdminPanelProps {
  onClose: () => void;
}

interface AdminStats {
  totalUsers: number;
  activeSubscriptions: number;
  totalRevenue: number;
  monthlyRevenue: number;
  recentSubscriptions: any[];
  usageStats: any[];
}

export default function AdminPanel({ onClose }: AdminPanelProps) {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAdminStats();
  }, []);

  const loadAdminStats = async () => {
    try {
      // Get total users
      const { count: totalUsers } = await supabase
        .from('user_settings')
        .select('*', { count: 'exact', head: true });

      // Get active subscriptions
      const { count: activeSubscriptions } = await supabase
        .from('subscriptions')
        .select('*', { count: 'exact', head: true })
        .in('status', ['active', 'trialing']);

      // Get subscription data for revenue calculation
      const { data: subscriptions } = await supabase
        .from('subscriptions')
        .select('*');

      // Calculate revenue (simplified - in reality you'd use Stripe data)
      const totalRevenue = subscriptions?.length ? subscriptions.length * 19.99 : 0;
      const monthlyRevenue = activeSubscriptions * 19.99;

      // Get recent subscriptions
      const { data: recentSubscriptions } = await supabase
        .from('subscriptions')
        .select(`
          *,
          user_settings!inner(*)
        `)
        .order('created_at', { ascending: false })
        .limit(5);

      // Get usage stats
      const { data: usageStats } = await supabase
        .from('usage_stats')
        .select('*')
        .order('total_messages', { ascending: false })
        .limit(10);

      setStats({
        totalUsers: totalUsers || 0,
        activeSubscriptions: activeSubscriptions || 0,
        totalRevenue,
        monthlyRevenue,
        recentSubscriptions: recentSubscriptions || [],
        usageStats: usageStats || [],
      });
    } catch (error) {
      console.error('Error loading admin stats:', error);
      Alert.alert('Error', 'Failed to load admin statistics');
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ icon, title, value, subtitle }: {
    icon: React.ReactNode;
    title: string;
    value: string | number;
    subtitle?: string;
  }) => (
    <View style={styles.statCard}>
      <View style={styles.statIcon}>
        {icon}
      </View>
      <View style={styles.statContent}>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statTitle}>{title}</Text>
        {subtitle && <Text style={styles.statSubtitle}>{subtitle}</Text>}
      </View>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading admin stats...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Crown size={24} color="#FFD700" />
          <Text style={styles.title}>Admin Panel</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.refreshButton}
            onPress={loadAdminStats}
            disabled={loading}
          >
            <RefreshCw size={20} color="#007AFF" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={24} color="#666" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats Overview */}
        <View style={styles.statsGrid}>
          <StatCard
            icon={<Users size={24} color="#007AFF" />}
            title="Total Users"
            value={stats?.totalUsers || 0}
          />
          <StatCard
            icon={<Crown size={24} color="#FFD700" />}
            title="Active Subscriptions"
            value={stats?.activeSubscriptions || 0}
          />
          <StatCard
            icon={<DollarSign size={24} color="#28a745" />}
            title="Monthly Revenue"
            value={`$${stats?.monthlyRevenue?.toFixed(2) || '0.00'}`}
          />
          <StatCard
            icon={<BarChart3 size={24} color="#6f42c1" />}
            title="Total Revenue"
            value={`$${stats?.totalRevenue?.toFixed(2) || '0.00'}`}
          />
        </View>

        {/* Recent Subscriptions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Subscriptions</Text>
          {stats?.recentSubscriptions?.length ? (
            stats.recentSubscriptions.map((sub: any) => (
              <View key={sub.id} style={styles.subscriptionItem}>
                <View style={styles.subscriptionInfo}>
                  <Text style={styles.subscriptionTier}>
                    {sub.tier.toUpperCase()}
                  </Text>
                  <Text style={styles.subscriptionDate}>
                    {new Date(sub.created_at).toLocaleDateString()}
                  </Text>
                </View>
                <View style={styles.subscriptionStatus}>
                  <Text style={[
                    styles.statusText,
                    { color: sub.status === 'active' ? '#28a745' : '#ffc107' }
                  ]}>
                    {sub.status}
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>No subscriptions yet</Text>
          )}
        </View>

        {/* Top Users by Usage */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Users by Messages</Text>
          {stats?.usageStats?.length ? (
            stats.usageStats.map((user: any, index: number) => (
              <View key={user.user_id} style={styles.usageItem}>
                <Text style={styles.rank}>#{index + 1}</Text>
                <View style={styles.usageInfo}>
                  <Text style={styles.usageMessages}>
                    {user.total_messages} messages
                  </Text>
                  <Text style={styles.usageImages}>
                    {user.total_image_generations} images
                  </Text>
                </View>
                <Text style={styles.usageToday}>
                  {user.messages_today} today
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>No usage data yet</Text>
          )}
        </View>

        {/* Database Test */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Database Testing</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={async () => {
                const result = await testDatabaseAccess();
                if (result.success) {
                  Alert.alert('Database Test', `✅ Database accessible!\nTables found.`);
                } else {
                  Alert.alert('Database Test', `❌ Database error: ${result.error}`);
                }
              }}
            >
              <Text style={styles.actionButtonText}>Test Database</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={async () => {
                try {
                  const { data, error } = await supabase
                    .from('subscriptions')
                    .select('*', { count: 'exact' })
                    .limit(1);

                  if (error) {
                    Alert.alert('Subscriptions Query', `❌ Query failed: ${error.message}`);
                  } else {
                    Alert.alert('Subscriptions Query', `✅ Query successful!\nFound ${data?.length || 0} records`);
                  }
                } catch (error: any) {
                  Alert.alert('Subscriptions Query', `❌ Error: ${error.message}`);
                }
              }}
            >
              <Text style={styles.actionButtonText}>Test Subscriptions</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stripe Test */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Stripe Testing</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={async () => {
                try {
                  // Test Stripe connection
                  const response = await fetch('https://api.stripe.com/v1/customers', {
                    method: 'POST',
                    headers: {
                      'Authorization': `Bearer ${process.env.STRIPE_SECRET_KEY}`,
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      email: 'test@example.com',
                      name: 'Test Customer',
                    }),
                  });

                  if (response.ok) {
                    const customer = await response.json();
                    Alert.alert('Stripe Test', `✅ Connection successful!\nCustomer ID: ${customer.id}`);
                  } else {
                    Alert.alert('Stripe Test', `❌ Connection failed: ${response.status}`);
                  }
                } catch (error: any) {
                  Alert.alert('Stripe Test', `❌ Error: ${error.message}`);
                }
              }}
            >
              <Text style={styles.actionButtonText}>Test Stripe API</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => {
                Alert.alert(
                  'Test Cards',
                  'Use these test cards in Stripe Checkout:\n\n' +
                  '✅ Success: 4242 4242 4242 4242\n' +
                  '❌ Decline: 4000 0000 0000 0002\n' +
                  '🔒 3D Secure: 4000 0025 0000 3155\n\n' +
                  'Any future expiry date and CVC works.'
                );
              }}
            >
              <Text style={styles.actionButtonText}>Test Card Numbers</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => Alert.alert('Export', 'Data export feature coming soon!')}
            >
              <Text style={styles.actionButtonText}>Export Data</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => Alert.alert('Analytics', 'Advanced analytics coming soon!')}
            >
              <Text style={styles.actionButtonText}>View Analytics</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    backgroundColor: '#fff',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  refreshButton: {
    padding: 8,
  },
  closeButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  statContent: {
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  statSubtitle: {
    fontSize: 12,
    color: '#999',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  subscriptionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
  },
  subscriptionInfo: {
    flex: 1,
  },
  subscriptionTier: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  subscriptionDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  subscriptionStatus: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#f8f9fa',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  usageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
  },
  rank: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
    width: 40,
  },
  usageInfo: {
    flex: 1,
  },
  usageMessages: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  usageImages: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  usageToday: {
    fontSize: 14,
    color: '#28a745',
    fontWeight: '500',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    padding: 32,
  },
  actionsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});