-- White Space Pro Database Setup
-- Run this SQL in your Supabase SQL Editor

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  tier text NOT NULL DEFAULT 'free' CHECK (tier IN ('free', 'pro', 'enterprise')),
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'canceled', 'past_due', 'incomplete')),
  stripe_subscription_id text UNIQUE,
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create usage_stats table
CREATE TABLE IF NOT EXISTS usage_stats (
  user_id uuid PRIMARY KEY,
  messages_today integer DEFAULT 0,
  total_messages integer DEFAULT 0,
  image_generations_today integer DEFAULT 0,
  total_image_generations integer DEFAULT 0,
  voice_minutes_this_month integer DEFAULT 0,
  total_voice_minutes integer DEFAULT 0,
  file_uploads_today integer DEFAULT 0,
  total_file_uploads integer DEFAULT 0,
  last_reset_date date DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create generated_images table
CREATE TABLE IF NOT EXISTS generated_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  prompt text NOT NULL,
  image_url text NOT NULL,
  style text DEFAULT 'realistic',
  size text DEFAULT 'medium',
  created_at timestamptz DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_id ON subscriptions(stripe_subscription_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_generated_images_user_id ON generated_images(user_id);
CREATE INDEX IF NOT EXISTS idx_generated_images_created_at ON generated_images(created_at DESC);

-- Enable Row Level Security
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE generated_images ENABLE ROW LEVEL SECURITY;

-- RLS Policies for subscriptions table
DROP POLICY IF EXISTS "Users can view own subscriptions" ON subscriptions;
CREATE POLICY "Users can view own subscriptions" ON subscriptions
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own subscriptions" ON subscriptions;
CREATE POLICY "Users can insert own subscriptions" ON subscriptions
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own subscriptions" ON subscriptions;
CREATE POLICY "Users can update own subscriptions" ON subscriptions
  FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- RLS Policies for usage_stats table
DROP POLICY IF EXISTS "Users can view own usage stats" ON usage_stats;
CREATE POLICY "Users can view own usage stats" ON usage_stats
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own usage stats" ON usage_stats;
CREATE POLICY "Users can insert own usage stats" ON usage_stats
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own usage stats" ON usage_stats;
CREATE POLICY "Users can update own usage stats" ON usage_stats
  FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- RLS Policies for generated_images table
DROP POLICY IF EXISTS "Users can view own generated images" ON generated_images;
CREATE POLICY "Users can view own generated images" ON generated_images
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own generated images" ON generated_images;
CREATE POLICY "Users can insert own generated images" ON generated_images
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Test the setup
SELECT 'White Space Pro tables created successfully!' as status;