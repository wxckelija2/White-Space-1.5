// Usage tracking system for White Space Pro
import { supabase } from './supabase';
import { UsageStats, SubscriptionTier, SUBSCRIPTION_LIMITS } from './subscription';

export interface UsageIncrement {
  messages?: number;
  imageGenerations?: number;
  voiceMinutes?: number;
  fileUploads?: number;
}

// Get current usage stats for user
export async function getUsageStats(userId: string): Promise<UsageStats> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { data, error } = await supabase
    .from('usage_stats')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  // If no data exists, create initial record
  if (!data) {
    const initialStats: UsageStats = {
      messagesToday: 0,
      totalMessages: 0,
      imageGenerationsToday: 0,
      totalImageGenerations: 0,
      voiceMinutesThisMonth: 0,
      totalVoiceMinutes: 0,
      fileUploadsToday: 0,
      totalFileUploads: 0,
      lastResetDate: today,
    };

    await supabase
      .from('usage_stats')
      .insert({
        user_id: userId,
        ...initialStats,
      });

    return initialStats;
  }

  // Check if we need to reset daily/monthly counters
  const lastReset = new Date(data.last_reset_date);
  const needsDailyReset = today > lastReset;
  const needsMonthlyReset = today.getMonth() !== lastReset.getMonth() || today.getFullYear() !== lastReset.getFullYear();

  if (needsDailyReset || needsMonthlyReset) {
    const updates: any = {
      last_reset_date: today.toISOString(),
    };

    if (needsDailyReset) {
      updates.messages_today = 0;
      updates.image_generations_today = 0;
      updates.file_uploads_today = 0;
    }

    if (needsMonthlyReset) {
      updates.voice_minutes_this_month = 0;
    }

    await supabase
      .from('usage_stats')
      .update(updates)
      .eq('user_id', userId);

    return {
      messagesToday: updates.messages_today || 0,
      totalMessages: data.total_messages,
      imageGenerationsToday: updates.image_generations_today || 0,
      totalImageGenerations: data.total_image_generations,
      voiceMinutesThisMonth: updates.voice_minutes_this_month || 0,
      totalVoiceMinutes: data.total_voice_minutes,
      fileUploadsToday: updates.file_uploads_today || 0,
      totalFileUploads: data.total_file_uploads,
      lastResetDate: today,
    };
  }

  return {
    messagesToday: data.messages_today,
    totalMessages: data.total_messages,
    imageGenerationsToday: data.image_generations_today,
    totalImageGenerations: data.total_image_generations,
    voiceMinutesThisMonth: data.voice_minutes_this_month,
    totalVoiceMinutes: data.total_voice_minutes,
    fileUploadsToday: data.file_uploads_today,
    totalFileUploads: data.total_file_uploads,
    lastResetDate: new Date(data.last_reset_date),
  };
}

// Increment usage counters
export async function incrementUsage(userId: string, usage: UsageIncrement): Promise<void> {
  try {
    // First, get current stats
    const { data: currentStats, error: fetchError } = await supabase
      .from('usage_stats')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (fetchError) {
      console.warn('Failed to fetch usage stats:', fetchError.message);
      return; // Don't throw, just skip tracking
    }

    // If no stats exist, create initial record
    if (!currentStats) {
      const { error: insertError } = await supabase
        .from('usage_stats')
        .insert({
          user_id: userId,
          messages_today: usage.messages || 0,
          total_messages: usage.messages || 0,
          image_generations_today: usage.imageGenerations || 0,
          total_image_generations: usage.imageGenerations || 0,
          voice_minutes_this_month: usage.voiceMinutes || 0,
          total_voice_minutes: usage.voiceMinutes || 0,
          file_uploads_today: usage.fileUploads || 0,
          total_file_uploads: usage.fileUploads || 0,
          last_reset_date: new Date().toISOString(),
        });

      if (insertError) {
        console.warn('Failed to create usage stats:', insertError.message);
      }
      return;
    }

    // Build update object with incremented values
    const updates: any = {};

    if (usage.messages) {
      updates.messages_today = (currentStats.messages_today || 0) + usage.messages;
      updates.total_messages = (currentStats.total_messages || 0) + usage.messages;
    }

    if (usage.imageGenerations) {
      updates.image_generations_today = (currentStats.image_generations_today || 0) + usage.imageGenerations;
      updates.total_image_generations = (currentStats.total_image_generations || 0) + usage.imageGenerations;
    }

    if (usage.voiceMinutes) {
      updates.voice_minutes_this_month = (currentStats.voice_minutes_this_month || 0) + usage.voiceMinutes;
      updates.total_voice_minutes = (currentStats.total_voice_minutes || 0) + usage.voiceMinutes;
    }

    if (usage.fileUploads) {
      updates.file_uploads_today = (currentStats.file_uploads_today || 0) + usage.fileUploads;
      updates.total_file_uploads = (currentStats.total_file_uploads || 0) + usage.fileUploads;
    }

    if (Object.keys(updates).length === 0) {
      return; // Nothing to update
    }

    const { error: updateError } = await supabase
      .from('usage_stats')
      .update(updates)
      .eq('user_id', userId);

    if (updateError) {
      console.warn('Failed to update usage stats:', updateError.message);
    }
  } catch (error: any) {
    console.warn('Usage tracking error:', error.message);
    // Don't throw - usage tracking should not break the app
  }
}

// Check if user has exceeded limits
export async function checkUsageLimits(userId: string, tier: SubscriptionTier): Promise<{
  canUse: boolean;
  limits: {
    messagesRemaining: number;
    imageGenerationsRemaining: number;
    voiceMinutesRemaining: number;
    fileUploadsRemaining: number;
  };
}> {
  // Default to 'basic' if tier is invalid or undefined
  const validTier: SubscriptionTier = (tier === 'plus') ? 'plus' : 'basic';
  const limits = SUBSCRIPTION_LIMITS[validTier];
  const usage = await getUsageStats(userId);

  const messagesRemaining = limits.messagesPerDay === -1 ? Infinity : Math.max(0, limits.messagesPerDay - usage.messagesToday);
  const imageGenerationsRemaining = limits.imageGenerationsPerDay === -1 ? Infinity : Math.max(0, limits.imageGenerationsPerDay - usage.imageGenerationsToday);
  const voiceMinutesRemaining = limits.voiceMinutesPerMonth === -1 ? Infinity : Math.max(0, limits.voiceMinutesPerMonth - usage.voiceMinutesThisMonth);
  const fileUploadsRemaining = limits.fileUploadsPerDay === -1 ? Infinity : Math.max(0, limits.fileUploadsPerDay - usage.fileUploadsToday);

  const canUse = messagesRemaining > 0 && imageGenerationsRemaining > 0 && voiceMinutesRemaining > 0 && fileUploadsRemaining > 0;

  return {
    canUse,
    limits: {
      messagesRemaining,
      imageGenerationsRemaining,
      voiceMinutesRemaining,
      fileUploadsRemaining,
    },
  };
}

// Get usage percentage for UI display
export function getUsagePercentage(used: number, limit: number): number {
  if (limit === -1) return 0; // Unlimited
  return Math.min(100, (used / limit) * 100);
}