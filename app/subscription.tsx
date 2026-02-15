import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView as SafeAreaViewContext } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Check, Crown, Zap, Star } from 'lucide-react-native';
import { subscriptionService, SubscriptionOffering, SubscriptionInfo } from '@/lib/subscription';

export default function SubscriptionScreen() {
  const router = useRouter();
  const [subscriptionInfo, setSubscriptionInfo] = useState<SubscriptionInfo | null>(null);
  const [offerings, setOfferings] = useState<SubscriptionOffering[]>([]);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState<string | null>(null);

  useEffect(() => {
    loadSubscriptionData();
  }, []);

  const loadSubscriptionData = async () => {
    try {
      setLoading(true);
      await subscriptionService.initialize();

      const [info, availableOfferings] = await Promise.all([
        subscriptionService.getSubscriptionInfo(),
        subscriptionService.getOfferings(),
      ]);

      setSubscriptionInfo(info);
      setOfferings(availableOfferings);
    } catch (error) {
      console.error('Failed to load subscription data:', error);
      Alert.alert('Error', 'Failed to load subscription information');
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (offering: SubscriptionOffering) => {
    if (!subscriptionInfo) return;

    setPurchasing(offering.id);

    try {
      const success = await subscriptionService.purchasePackage(offering.id);

      if (success) {
        Alert.alert(
          'Purchase Successful!',
          'Thank you for upgrading. Your new features are now available.',
          [
            {
              text: 'Continue',
              onPress: () => {
                loadSubscriptionData(); // Refresh subscription info
              }
            }
          ]
        );
      }
    } catch (error) {
      Alert.alert(
        'Purchase Failed',
        error instanceof Error ? error.message : 'Purchase could not be completed'
      );
    } finally {
      setPurchasing(null);
    }
  };

  const handleRestorePurchases = async () => {
    try {
      setLoading(true);
      const success = await subscriptionService.restorePurchases();

      if (success) {
        Alert.alert('Success', 'Your purchases have been restored!');
        await loadSubscriptionData();
      } else {
        Alert.alert('No Purchases Found', 'No previous purchases were found to restore.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to restore purchases');
    } finally {
      setLoading(false);
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'pro':
        return <Zap size={24} color="#3b82f6" />;
      case 'enterprise':
        return <Crown size={24} color="#f59e0b" />;
      default:
        return <Star size={24} color="#6b7280" />;
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'pro':
        return '#3b82f6';
      case 'enterprise':
        return '#f59e0b';
      default:
        return '#6b7280';
    }
  };

  const getFeatureList = (tier: string) => {
    const features = {
      free: [
        '3 drafts per project',
        '5 projects total',
        'Basic AI generation',
        'Text export only',
      ],
      pro: [
        '50 drafts per project',
        '100 projects total',
        'Advanced AI providers',
        'Side-by-side comparison',
        'Branching & versioning',
        'PDF, DOCX, PPT export',
        'Priority support',
      ],
      enterprise: [
        'Unlimited drafts & projects',
        'All AI providers',
        'Advanced comparison tools',
        'Team collaboration',
        'Custom integrations',
        'White-label exports',
        'Dedicated support',
      ],
    };

    return features[tier as keyof typeof features] || features.free;
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#000" />
          <Text style={styles.loadingText}>Loading subscription...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaViewContext style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            } else {
              // If no screen to go back to, go to settings tab
              router.replace('/(tabs)/settings' as any);
            }
          }}
          style={styles.backButton}
        >
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Subscription</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        {/* Current Plan */}
        {subscriptionInfo && (
          <View style={styles.currentPlanCard}>
            <View style={styles.currentPlanHeader}>
              {getTierIcon(subscriptionInfo.tier)}
              <View style={styles.currentPlanInfo}>
                <Text style={styles.currentPlanTitle}>
                  {subscriptionInfo.tier.charAt(0).toUpperCase() + subscriptionInfo.tier.slice(1)} Plan
                </Text>
                <Text style={styles.currentPlanStatus}>
                  {subscriptionInfo.isActive ? 'Active' : 'Inactive'}
                  {subscriptionInfo.expirationDate &&
                    ` • Expires ${subscriptionInfo.expirationDate.toLocaleDateString()}`
                  }
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Feature Comparison */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Plan Features</Text>

          {['free', 'pro', 'enterprise'].map((tier) => (
            <View key={tier} style={styles.tierCard}>
              <View style={styles.tierHeader}>
                {getTierIcon(tier)}
                <Text style={[styles.tierTitle, { color: getTierColor(tier) }]}>
                  {tier.charAt(0).toUpperCase() + tier.slice(1)}
                </Text>
                {subscriptionInfo?.tier === tier && (
                  <View style={styles.currentBadge}>
                    <Text style={styles.currentBadgeText}>Current</Text>
                  </View>
                )}
              </View>

              <View style={styles.featuresList}>
                {getFeatureList(tier).map((feature, index) => (
                  <View key={index} style={styles.featureItem}>
                    <Check size={16} color="#22c55e" />
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>

        {/* Available Offerings */}
        {offerings.length > 0 && (
          <View style={styles.offeringsSection}>
            <Text style={styles.sectionTitle}>Upgrade Options</Text>

            {offerings.map((offering) => (
              <TouchableOpacity
                key={offering.id}
                style={styles.offeringCard}
                onPress={() => handlePurchase(offering)}
                disabled={purchasing === offering.id}
              >
                <View style={styles.offeringHeader}>
                  <Text style={styles.offeringTitle}>{offering.title}</Text>
                  <Text style={styles.offeringPrice}>{offering.price}</Text>
                </View>

                <Text style={styles.offeringDescription}>{offering.description}</Text>
                <Text style={styles.offeringPeriod}>per {offering.period}</Text>

                {purchasing === offering.id ? (
                  <ActivityIndicator size="small" color="#000" style={styles.purchaseSpinner} />
                ) : (
                  <Text style={styles.purchaseButtonText}>Subscribe</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Restore Purchases */}
        <TouchableOpacity
          style={styles.restoreButton}
          onPress={handleRestorePurchases}
        >
          <Text style={styles.restoreButtonText}>Restore Purchases</Text>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Subscriptions automatically renew unless cancelled. Manage your subscription in your account settings.
          </Text>
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
  loadingContainer: {
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
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  currentPlanCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  currentPlanHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentPlanInfo: {
    marginLeft: 12,
  },
  currentPlanTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  currentPlanStatus: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  featuresSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: 16,
  },
  tierCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  tierHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tierTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
    flex: 1,
  },
  currentBadge: {
    backgroundColor: '#22c55e',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  currentBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  featuresList: {
    gap: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featureText: {
    fontSize: 14,
    color: '#333',
  },
  offeringsSection: {
    marginBottom: 24,
  },
  offeringCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  offeringHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  offeringTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  offeringPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  offeringDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  offeringPeriod: {
    fontSize: 12,
    color: '#999',
  },
  purchaseSpinner: {
    alignSelf: 'center',
    marginTop: 12,
  },
  purchaseButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
    marginTop: 12,
  },
  restoreButton: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  restoreButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  footer: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  footerText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 18,
  },
});
