-- Reset all user usage stats
-- Run this in your Supabase SQL Editor

-- Reset all usage counters to zero
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

-- Verify the reset
SELECT * FROM usage_stats;
