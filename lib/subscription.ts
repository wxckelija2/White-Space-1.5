// WhiteSpace Plus subscription system
export type SubscriptionTier = 'basic' | 'plus';
export type SubscriptionStatus = 'active' | 'canceled' | 'past_due' | 'incomplete';

export interface SubscriptionLimits {
  messagesPerDay: number;
  contextLength: number; // in tokens
  imageGenerationsPerDay: number;
  voiceMinutesPerMonth: number;
  fileUploadsPerDay: number;
  maxFileSize: number; // in MB
  advancedCleanup: boolean;
  contextMemory: boolean;
  oneClickActions: boolean;
  deepAnalysis: boolean;
}

export interface Subscription {
  id: string;
  userId: string;
  tier: SubscriptionTier;
  status: SubscriptionStatus;
  stripeSubscriptionId?: string;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UsageStats {
  messagesToday: number;
  totalMessages: number;
  imageGenerationsToday: number;
  totalImageGenerations: number;
  voiceMinutesThisMonth: number;
  totalVoiceMinutes: number;
  fileUploadsToday: number;
  totalFileUploads: number;
  lastResetDate: Date;
}

// Subscription limits by tier
// Free tier: unlimited text chat, limited image generation
// Plus tier: unlimited everything
export const SUBSCRIPTION_LIMITS: Record<SubscriptionTier, SubscriptionLimits> = {
  basic: {
    messagesPerDay: -1, // unlimited text chat for free users
    contextLength: 4000,
    imageGenerationsPerDay: 3, // Free users get 3 image generations per day
    voiceMinutesPerMonth: 5, // 5 minutes of voice per month
    fileUploadsPerDay: 5,
    maxFileSize: 10,
    advancedCleanup: false,
    contextMemory: false,
    oneClickActions: false,
    deepAnalysis: false,
  },
  plus: {
    messagesPerDay: -1, // unlimited
    contextLength: 16000,
    imageGenerationsPerDay: -1, // unlimited
    voiceMinutesPerMonth: -1, // unlimited
    fileUploadsPerDay: -1, // unlimited
    maxFileSize: 100,
    advancedCleanup: true,
    contextMemory: true,
    oneClickActions: true,
    deepAnalysis: true,
  },
};

// Pricing (in cents)
export const SUBSCRIPTION_PRICES = {
  plus: {
    monthly: 2000, // $20.00
    yearly: 19900, // $199.00 (save ~17%)
  },
};