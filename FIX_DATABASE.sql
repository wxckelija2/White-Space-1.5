-- Run this in Supabase SQL Editor to fix the tier constraint

-- First, drop the old constraint
ALTER TABLE subscriptions DROP CONSTRAINT IF EXISTS subscriptions_tier_check;

-- Add new constraint that allows 'basic' and 'plus'
ALTER TABLE subscriptions ADD CONSTRAINT subscriptions_tier_check 
CHECK (tier IN ('basic', 'plus'));

-- Update any existing rows with invalid tiers
UPDATE subscriptions SET tier = 'basic' WHERE tier NOT IN ('basic', 'plus');

-- Reset all usage stats
UPDATE usage_stats SET
  messages_today = 0,
  total_messages = 0,
  image_generations_today = 0,
  total_image_generations = 0,
  voice_minutes_this_month = 0,
  total_voice_minutes = 0,
  file_uploads_today = 0,
  total_file_uploads = 0,
  last_reset_date = NOW();
