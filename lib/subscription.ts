// Note: RevenueCat native module not available in Expo Go
// This is a mock implementation for development
import { Alert } from 'react-native';
import { supabase } from './supabase';
import { SubscriptionTier } from '@/types/database';

export interface SubscriptionInfo {
  tier: SubscriptionTier;
  isActive: boolean;
  willRenew: boolean;
  expirationDate?: Date;
  managementURL?: string;
}

export interface SubscriptionOffering {
  id: string;
  title: string;
  description: string;
  price: string;
  period: string;
}

class SubscriptionService {
  private initialized = false;

  async initialize() {
    if (this.initialized) return;

    console.log('RevenueCat not available in Expo Go - using mock subscription service');
    this.initialized = true;
  }

  async getSubscriptionInfo(): Promise<SubscriptionInfo> {
    // Mock subscription info for Expo Go
    console.log('Using mock subscription service - RevenueCat not available in Expo Go');
    return {
      tier: 'free',
      isActive: true, // Allow basic functionality
      willRenew: false,
    };
  }

  private getDefaultSubscriptionInfo(): SubscriptionInfo {
    return {
      tier: 'free',
      isActive: true, // Allow basic functionality
      willRenew: false,
    };
  }

  async getOfferings(): Promise<SubscriptionOffering[]> {
    // Mock offerings for Expo Go
    return [
      {
        id: 'pro_monthly',
        title: 'Pro Monthly',
        description: 'Unlimited drafts, comparison, and export features',
        price: '$9.99',
        period: 'month',
      },
      {
        id: 'enterprise_yearly',
        title: 'Enterprise Yearly',
        description: 'Everything included with team collaboration',
        price: '$99.99',
        period: 'year',
      },
    ];
  }

  async purchasePackage(packageId: string): Promise<boolean> {
    // Mock purchase for Expo Go
    console.log(`Mock purchase of package: ${packageId}`);
    Alert.alert(
      'Mock Purchase',
      `This would purchase ${packageId} in a real app. RevenueCat is not available in Expo Go.`,
      [{ text: 'OK' }]
    );
    return false;
  }

  async restorePurchases(): Promise<boolean> {
    // Mock restore for Expo Go
    console.log('Mock restore purchases');
    Alert.alert(
      'Mock Restore',
      'This would restore purchases in a real app. RevenueCat is not available in Expo Go.',
      [{ text: 'OK' }]
    );
    return false;
  }

  // Note: Additional RevenueCat methods would be implemented here for production

  // Feature access control based on subscription tier
  canAccessFeature(feature: string, subscriptionInfo?: SubscriptionInfo): boolean {
    if (!subscriptionInfo) return false;

    const featureLimits = {
      // Free tier limitations
      free: {
        maxDrafts: 3,
        maxProjects: 5,
        canCompare: false,
        canBranch: false,
        canExport: false,
        aiProviders: ['mock'],
      },
      // Pro tier features
      pro: {
        maxDrafts: 50,
        maxProjects: 100,
        canCompare: true,
        canBranch: true,
        canExport: true,
        aiProviders: ['mock', 'huggingface', 'openai'],
      },
      // Enterprise tier features
      enterprise: {
        maxDrafts: -1, // unlimited
        maxProjects: -1, // unlimited
        canCompare: true,
        canBranch: true,
        canExport: true,
        aiProviders: ['mock', 'huggingface', 'openai', 'anthropic'],
      },
    };

    const limits = featureLimits[subscriptionInfo.tier];

    switch (feature) {
      case 'compare':
        return limits.canCompare;
      case 'branch':
        return limits.canBranch;
      case 'export':
        return limits.canExport;
      case 'advanced_ai':
        return subscriptionInfo.tier !== 'free';
      default:
        return true;
    }
  }

  // Check if user has reached limits
  hasReachedLimit(feature: string, currentCount: number, subscriptionInfo?: SubscriptionInfo): boolean {
    if (!subscriptionInfo) return true;

    const featureLimits = {
      free: { maxDrafts: 3, maxProjects: 5 },
      pro: { maxDrafts: 50, maxProjects: 100 },
      enterprise: { maxDrafts: -1, maxProjects: -1 },
    };

    const limits = featureLimits[subscriptionInfo.tier];
    const limit = limits[feature as keyof typeof limits] as number;

    return limit !== -1 && currentCount >= limit;
  }
}

// Export singleton instance
export const subscriptionService = new SubscriptionService();
