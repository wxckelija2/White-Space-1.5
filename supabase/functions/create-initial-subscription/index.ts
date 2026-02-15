// Supabase Edge Function for creating initial subscriptions
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

interface RequestBody {
  userId: string
  tier?: 'free' | 'pro' | 'enterprise'
  upgrade?: boolean
  action?: 'get' | 'create' | 'upgrade'
}

Deno.serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  try {
    const { userId, tier, upgrade = false, action = 'create' }: RequestBody = await req.json()

    if (!userId) {
      return new Response(
        JSON.stringify({ error: 'Missing userId' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Handle get action
    if (action === 'get') {
      const { data: subscription, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', userId)
        .single()

      if (error && error.code !== 'PGRST116') {
        throw error
      }

      return new Response(
        JSON.stringify({
          subscription: subscription || null,
          message: 'Subscription retrieved successfully'
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // For create/upgrade actions, tier is required
    if (!tier) {
      return new Response(
        JSON.stringify({ error: 'Missing tier for create/upgrade action' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Check if user already has a subscription
    const { data: existingSubscription } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (existingSubscription && !upgrade) {
      return new Response(
        JSON.stringify({
          subscription: existingSubscription,
          message: 'User already has a subscription'
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const now = new Date()
    let periodEnd: Date

    // Set subscription period based on tier
    switch (tier) {
      case 'free':
        // Free tier never expires
        periodEnd = new Date('2099-12-31')
        break
      case 'pro':
        // Pro is monthly, but this is just initial setup
        // Real billing will be handled by Stripe
        periodEnd = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000) // 30 days
        break
      case 'enterprise':
        // Enterprise is monthly
        periodEnd = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000) // 30 days
        break
      default:
        return new Response(
          JSON.stringify({ error: 'Invalid tier' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    }

    // Create or update subscription
    const subscriptionData = {
      user_id: userId,
      tier,
      status: tier === 'basic' ? 'active' : 'incomplete', // Basic is active, paid tiers need payment
      current_period_start: now.toISOString(),
      current_period_end: periodEnd.toISOString(),
      cancel_at_period_end: false,
      updated_at: now.toISOString(),
    }

    let subscription
    if (existingSubscription && upgrade) {
      // Update existing subscription
      const { data, error } = await supabase
        .from('subscriptions')
        .update(subscriptionData)
        .eq('user_id', userId)
        .select()
        .single()

      if (error) throw error
      subscription = data
    } else {
      // Create new subscription
      const { data, error } = await supabase
        .from('subscriptions')
        .insert(subscriptionData)
        .select()
        .single()

      if (error) throw error
      subscription = data
    }

    // Create initial usage stats if they don't exist
    const { data: existingUsage } = await supabase
      .from('usage_stats')
      .select('user_id')
      .eq('user_id', userId)
      .maybeSingle()

    if (!existingUsage) {
      await supabase
        .from('usage_stats')
        .insert({
          user_id: userId,
          messages_today: 0,
          total_messages: 0,
          image_generations_today: 0,
          total_image_generations: 0,
          voice_minutes_this_month: 0,
          total_voice_minutes: 0,
          file_uploads_today: 0,
          total_file_uploads: 0,
          last_reset_date: now.toISOString().split('T')[0],
        })
    }

    // Create initial user settings if they don't exist
    const { data: existingSettings } = await supabase
      .from('user_settings')
      .select('user_id')
      .eq('user_id', userId)
      .maybeSingle()

    if (!existingSettings) {
      await supabase
        .from('user_settings')
        .insert({
          user_id: userId,
          preferences: { language: 'en' },
        })
    }

    return new Response(
      JSON.stringify({
        subscription,
        message: upgrade ? 'Subscription upgraded successfully' : 'Initial subscription created successfully'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error creating initial subscription:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})