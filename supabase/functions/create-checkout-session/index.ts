// Supabase Edge Function for creating Stripe checkout sessions
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@12.0.0'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!)
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

interface RequestBody {
  priceId: string
  userId: string
  successUrl: string
  cancelUrl: string
}

Deno.serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  try {
    const { priceId, userId, successUrl, cancelUrl }: RequestBody = await req.json()

    // Create or retrieve customer
    let customer
    const { data: existingCustomer } = await supabase
      .from('user_settings')
      .select('stripe_customer_id')
      .eq('user_id', userId)
      .single()

    if (existingCustomer?.stripe_customer_id) {
      customer = await stripe.customers.retrieve(existingCustomer.stripe_customer_id)
    } else {
      // Get user email
      const { data: { user } } = await supabase.auth.admin.getUserById(userId)

      customer = await stripe.customers.create({
        email: user.email,
        metadata: { userId }
      })

      // Save customer ID
      await supabase
        .from('user_settings')
        .upsert({
          user_id: userId,
          stripe_customer_id: customer.id,
          updated_at: new Date().toISOString()
        })
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ['card'],
      line_items: [{
        price: priceId,
        quantity: 1,
      }],
      mode: 'subscription',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        userId
      }
    })

    return new Response(
      JSON.stringify({ id: session.id, url: session.url }),
      { headers: { 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error creating checkout session:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }
})