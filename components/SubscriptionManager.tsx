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
  Dimensions,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Check, X, Zap, MessageSquare, Image, Mic, Sparkles, Brain, Infinity, ChevronLeft, Crown } from 'lucide-react-native';
import { createCheckoutSession, createPortalSession, getSubscription, upgradeSubscription } from '@/lib/stripe';
import { SUBSCRIPTION_LIMITS, SUBSCRIPTION_PRICES, SubscriptionTier } from '@/lib/subscription';
import { getUsageStats, getUsagePercentage } from '@/lib/usage-tracking';
import { supabase } from '@/lib/supabase';

const { width } = Dimensions.get('window');

interface SubscriptionManagerProps {
  onClose: () => void;
  initialTab?: 'upgrade' | 'manage';
  onSubscriptionUpdate?: () => void;
}

export default function SubscriptionManager({ onClose, initialTab = 'upgrade', onSubscriptionUpdate }: SubscriptionManagerProps) {
  const [activeTab, setActiveTab] = useState<'upgrade' | 'manage'>(initialTab);
  const [currentSubscription, setCurrentSubscription] = useState<any>(null);
  const [usageStats, setUsageStats] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        try {
          const subscription = await getSubscription(user.id);
          setCurrentSubscription(subscription);
        } catch (error) {
          console.warn('Failed to load subscription:', error);
          setCurrentSubscription(null);
        }

        try {
          const usage = await getUsageStats(user.id);
          setUsageStats(usage);
        } catch (error) {
          console.warn('Failed to load usage stats:', error);
          setUsageStats(null);
        }
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const handleUpgrade = async (tier: 'plus', billing: 'monthly' | 'yearly') => {
    if (!user) {
      Alert.alert('Error', 'Please log in to upgrade');
      return;
    }

    setLoading(true);
    try {
      // For demo purposes, we'll use the upgrade function instead of Stripe
      // In production, you'd use the Stripe checkout for actual payments

      Alert.alert(
        'Upgrade Subscription',
        `Upgrade to ${tier.toUpperCase()} tier? This will activate premium features immediately.`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Upgrade Now',
            onPress: async () => {
              try {
                const subscription = await upgradeSubscription(user.id, tier);
                Alert.alert(
                  'Upgrade Successful!',
                  `Welcome to White Space Pro! 🎉\n\nYou now have access to premium features.`,
                  [{ text: 'Continue', onPress: () => onClose() }]
                );
                // Refresh the subscription data
                if (onSubscriptionUpdate) {
                  onSubscriptionUpdate();
                }
              } catch (upgradeError: any) {
                Alert.alert('Upgrade Failed', upgradeError.message);
              }
            }
          }
        ]
      );

      // Note: In production, you'd use Stripe checkout like this:
      /*
      const priceIds = {
        'pro_monthly': 'price_1SvmpDF4r8jbpyODabcdefgh',      // Replace with actual ID
        'pro_yearly': 'price_1SvmpDF4r8jbpyODijklmnop',       // Replace with actual ID
        'enterprise_monthly': 'price_1SvmpDF4r8jbpyODqrstuvwx', // Replace with actual ID
        'enterprise_yearly': 'price_1SvmpDF4r8jbpyODyzabcdef',   // Replace with actual ID
      };

      const priceId = priceIds[`${tier}_${billing}` as keyof typeof priceIds];
      const session = await createCheckoutSession({
        priceId,
        userId: user.id,
        successUrl: 'whitespace://subscription/success',
        cancelUrl: 'whitespace://subscription/cancel',
      });

      if (typeof window !== 'undefined') {
        window.location.href = session.url;
      }
      */

    } catch (error: any) {
      Alert.alert('Error', `Failed to start upgrade: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleManageSubscription = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const portalUrl = await createPortalSession(user.id, 'whitespace://subscription/manage');
      if (typeof window !== 'undefined') {
        window.location.href = portalUrl;
      }
    } catch (error: any) {
      Alert.alert('Error', `Failed to open billing portal: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const renderUpgradeTab = () => (
    <ScrollView 
      style={styles.content} 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {/* Logo/Icon */}
      <View style={styles.logoContainer}>
        <View style={styles.logoCircle}>
          <Sparkles size={40} color="#000" />
        </View>
      </View>

      {/* Title */}
      <Text style={styles.mainTitle}>White Space Pro</Text>
      <Text style={styles.mainSubtitle}>
        Unlock the full power of AI assistance
      </Text>

      {/* Price */}
      <View style={styles.priceSection}>
        <Text style={styles.priceMain}>$9.99</Text>
        <Text style={styles.priceLabel}>per month</Text>
      </View>

      {/* Features List */}
      <View style={styles.featuresSection}>
        <FeatureRow 
          icon={<Zap size={22} color="#000" />} 
          title="Unlimited Messages"
          subtitle="No daily limits on conversations"
        />
        <FeatureRow 
          icon={<Brain size={22} color="#000" />} 
          title="Context Memory"
          subtitle="AI remembers your preferences"
        />
        <FeatureRow 
          icon={<Image size={22} color="#000" />} 
          title="AI Image Generation"
          subtitle="Create up to 50 images per day"
        />
        <FeatureRow 
          icon={<Mic size={22} color="#000" />} 
          title="Voice Features"
          subtitle="Unlimited voice input and output"
        />
        <FeatureRow 
          icon={<MessageSquare size={22} color="#000" />} 
          title="Extended Context"
          subtitle="16K tokens for longer conversations"
        />
      </View>

      {/* Subscribe Button */}
      <TouchableOpacity
        style={styles.subscribeButton}
        onPress={() => handleUpgrade('plus', 'monthly')}
        disabled={loading}
        activeOpacity={0.8}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.subscribeButtonText}>Subscribe</Text>
        )}
      </TouchableOpacity>

      {/* Terms */}
      <Text style={styles.termsText}>
        Payment will be charged to your account. Subscription automatically renews unless canceled at least 24 hours before the end of the current period.
      </Text>

      {/* Restore */}
      <TouchableOpacity style={styles.restoreButton}>
        <Text style={styles.restoreButtonText}>Restore Purchase</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderManageTab = () => (
    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
      {currentSubscription ? (
        <View style={styles.manageCard}>
          <Text style={styles.manageTitle}>Manage Subscription</Text>

          <View style={styles.subscriptionDetails}>
            <Text style={styles.detailLabel}>Current Plan:</Text>
            <Text style={styles.detailValue}>{currentSubscription.tier.toUpperCase()}</Text>

            <Text style={styles.detailLabel}>Status:</Text>
            <Text style={styles.detailValue}>{currentSubscription.status}</Text>

            <Text style={styles.detailLabel}>Next Billing:</Text>
            <Text style={styles.detailValue}>
              {new Date(currentSubscription.currentPeriodEnd).toLocaleDateString()}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.manageButton}
            onPress={handleManageSubscription}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.manageButtonText}>Manage Billing</Text>
            )}
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.noSubscriptionCard}>
          <Text style={styles.noSubscriptionText}>No active subscription</Text>
          <TouchableOpacity
            style={styles.upgradeButton}
            onPress={() => setActiveTab('upgrade')}
          >
            <Crown size={20} color="#fff" />
            <Text style={styles.upgradeButtonText}>View Plans</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>White Space Pro</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <X size={24} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'upgrade' && styles.activeTab]}
          onPress={() => setActiveTab('upgrade')}
        >
          <Text style={[styles.tabText, activeTab === 'upgrade' && styles.activeTabText]}>
            Upgrade
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'manage' && styles.activeTab]}
          onPress={() => setActiveTab('manage')}
        >
          <Text style={[styles.tabText, activeTab === 'manage' && styles.activeTabText]}>
            Manage
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {activeTab === 'upgrade' ? renderUpgradeTab() : renderManageTab()}
    </SafeAreaView>
  );
}

const FeatureItem = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <View style={styles.featureItem}>
    {icon}
    <Text style={styles.featureText}>{text}</Text>
  </View>
);

const FeatureRow = ({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) => (
  <View style={styles.featureRow}>
    {icon}
    <View style={styles.featureRowContent}>
      <Text style={styles.featureRowTitle}>{title}</Text>
      <Text style={styles.featureRowSubtitle}>{subtitle}</Text>
    </View>
  </View>
);

const UsageStat = ({ icon, label, used, limit, color }: {
  icon: React.ReactNode;
  label: string;
  used: number;
  limit: number;
  color: string;
}) => (
  <View style={styles.usageStat}>
    <View style={styles.usageStatHeader}>
      {icon}
      <Text style={styles.usageStatLabel}>{label}</Text>
    </View>
    <Text style={styles.usageStatValue}>
      {limit === -1 ? `${used} used` : `${used}/${limit === -1 ? '∞' : limit}`}
    </Text>
    {limit !== -1 && (
      <View style={styles.usageProgressBar}>
        <View
          style={[
            styles.usageProgressFill,
            {
              width: `${getUsagePercentage(used, limit)}%`,
              backgroundColor: color
            }
          ]}
        />
      </View>
    )}
  </View>
);

const PlanFeature = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <View style={styles.planFeature}>
    <View style={styles.planFeatureIcon}>
      {icon}
    </View>
    <Text style={styles.planFeatureText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
  },
  closeButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#3b82f6',
  },
  tabText: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#3b82f6',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },

  // Hero Section
  heroSection: {
    marginBottom: 24,
  },
  heroGradient: {
    borderRadius: 16,
    marginHorizontal: 20,
    overflow: 'hidden',
    backgroundColor: '#6366f1',
  },
  heroContent: {
    padding: 32,
    alignItems: 'center',
  },
  heroIcon: {
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    lineHeight: 24,
  },

  // Usage Card
  usageCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  usageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  usageTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  tierBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  tierBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  usageStats: {
    gap: 16,
  },
  usageStat: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
  },
  usageStatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  usageStatLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  usageStatValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  usageProgressBar: {
    height: 6,
    backgroundColor: '#e5e7eb',
    borderRadius: 3,
    overflow: 'hidden',
  },
  usageProgressFill: {
    height: '100%',
    borderRadius: 3,
  },

  // Plans Grid
  plansGrid: {
    paddingHorizontal: 20,
    marginBottom: 32,
    gap: 20,
  },
  planCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
    position: 'relative',
    overflow: 'hidden',
  },
  plusPlan: {
    borderWidth: 2,
    borderColor: '#8B5CF6',
  },
  planBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3b82f6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  planBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  plusBadgeText: {
    color: '#fff',
  },
  planIcon: {
    alignItems: 'center',
    marginBottom: 16,
  },
  planName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    marginBottom: 24,
  },
  priceAmount: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1f2937',
  },
  pricePeriod: {
    fontSize: 16,
    color: '#6b7280',
    marginLeft: 4,
  },
  featuresContainer: {
    marginBottom: 24,
  },
  planFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  planFeatureIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#f0f9ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  planFeatureText: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },
  planButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 8,
  },
  plusButton: {
    backgroundColor: '#8B5CF6',
  },
  planButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  // Comparison Section
  comparisonSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  comparisonTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 20,
  },
  comparisonTable: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
  },
  comparisonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  comparisonFeature: {
    flex: 2,
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  comparisonValue: {
    flex: 1,
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    fontWeight: '500',
  },
  highlightedValue: {
    color: '#3b82f6',
    fontWeight: '600',
  },

  // Legacy styles (keeping for manage tab)
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  featureText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  upgradeButton: {
    flexDirection: 'row',
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 8,
  },
  enterpriseButton: {
    backgroundColor: '#FF6B6B',
  },
  disabledButton: {
    opacity: 0.6,
  },
  upgradeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  manageCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    margin: 20,
  },
  manageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  // Missing styles for upgrade tab
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
    marginBottom: 8,
  },
  mainSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
  },
  priceSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  priceMain: {
    fontSize: 48,
    fontWeight: '700',
    color: '#000',
  },
  priceLabel: {
    fontSize: 16,
    color: '#666',
  },
  featuresSection: {
    marginBottom: 32,
    gap: 16,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  featureRowContent: {
    flex: 1,
  },
  featureRowTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  featureRowSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  subscribeButton: {
    backgroundColor: '#000',
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 16,
  },
  subscribeButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  termsText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 16,
  },
  restoreButton: {
    alignItems: 'center',
    padding: 12,
  },
  restoreButtonText: {
    fontSize: 14,
    color: '#666',
  },
  subscriptionDetails: {
    marginBottom: 20,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 16,
  },
  manageButton: {
    backgroundColor: '#000',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  manageButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  noSubscriptionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    margin: 20,
    alignItems: 'center',
  },
  noSubscriptionText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
});