// Supabase Edge Function for handling Stripe webhooks
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@12.0.0'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!)
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

// Verify webhook signature
async function verifyWebhook(rawBody: Uint8Array, signature: string): Promise<boolean> {
  try {
    const endpointSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')
    if (!endpointSecret) return false

    // In production, you'd verify the signature
    // const event = stripe.webhooks.constructEvent(rawBody, signature, endpointSecret)
    return true
  } catch (error) {
    console.error('Webhook verification failed:', error)
    return false
  }
}

Deno.serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  try {
    const body = await req.text()
    const signature = req.headers.get('stripe-signature') || ''

    // Verify webhook (commented out for demo)
    // if (!await verifyWebhook(new TextEncoder().encode(body), signature)) {
    //   return new Response('Invalid signature', { status: 400 })
    // }

    const event = JSON.parse(body)

    console.log('Received Stripe webhook:', event.type)

    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await handleSubscriptionChange(event.data.object)
        break

      case 'customer.subscription.deleted':
        await handleSubscriptionCancellation(event.data.object)
        break

      case 'invoice.payment_succeeded':
        await handlePaymentSuccess(event.data.object)
        break

      case 'invoice.payment_failed':
        await handlePaymentFailure(event.data.object)
        break

      default:
        console.log('Unhandled event type:', event.type)
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Webhook error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }
})

async function handleSubscriptionChange(subscription: any) {
  console.log('Handling subscription change:', subscription.id)

  try {
    // Get user ID from customer metadata
    const customer = await stripe.customers.retrieve(subscription.customer)
    const userId = customer.metadata?.userId

    if (!userId) {
      console.error('No userId in customer metadata')
      return
    }

    // Determine tier from price
    const priceId = subscription.items.data[0].price.id
    const tier = getTierFromPriceId(priceId)

    // Update subscription in database
    const { error } = await supabase
      .from('subscriptions')
      .upsert({
        user_id: userId,
        stripe_subscription_id: subscription.id,
        tier,
        status: subscription.status === 'active' ? 'active' : 'past_due',
        current_period_start: new Date(subscription.current_period_start * 1000),
        current_period_end: new Date(subscription.current_period_end * 1000),
        cancel_at_period_end: subscription.cancel_at_period_end,
        updated_at: new Date(),
      })

    if (error) {
      console.error('Error updating subscription:', error)
    } else {
      console.log('Subscription updated successfully')
    }
  } catch (error) {
    console.error('Error handling subscription change:', error)
  }
}

async function handleSubscriptionCancellation(subscription: any) {
  console.log('Handling subscription cancellation:', subscription.id)

  try {
    const { error } = await supabase
      .from('subscriptions')
      .update({
        status: 'canceled',
        cancel_at_period_end: true,
        updated_at: new Date(),
      })
      .eq('stripe_subscription_id', subscription.id)

    if (error) {
      console.error('Error canceling subscription:', error)
    }
  } catch (error) {
    console.error('Error handling subscription cancellation:', error)
  }
}

async function handlePaymentSuccess(invoice: any) {
  console.log('Payment succeeded for invoice:', invoice.id)
  // Handle successful payment - could send notifications, update analytics, etc.
}

async function handlePaymentFailure(invoice: any) {
  console.log('Payment failed for invoice:', invoice.id)
  // Handle failed payment - could send notifications, downgrade user, etc.
}

function getTierFromPriceId(priceId: string): string {
  // Map your Stripe price IDs to subscription tiers
  const priceTierMap: Record<string, string> = {
    'price_pro_monthly': 'pro',
    'price_pro_yearly': 'pro',
    'price_enterprise_monthly': 'enterprise',
    'price_enterprise_yearly': 'enterprise',
  }

  return priceTierMap[priceId] || 'free'
}