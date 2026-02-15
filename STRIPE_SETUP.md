# Stripe Setup Guide for White Space Pro

## 🔑 Get Your Stripe Keys

1. **Login to Stripe Dashboard**: https://dashboard.stripe.com/
2. **Get Publishable Key**:
   - Go to Developers → API Keys
   - Copy the **Publishable key** (starts with `pk_test_` for test mode)
   - Add it to `.env` as `EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY`

3. **Secret Key**: You already have it (starts with `sk_test_`)
   - This should stay server-side only (Supabase Edge Functions)

## 💳 Create Products and Prices

### Create Pro Subscription Product

1. **Go to Products** in Stripe Dashboard
2. **Create Product**:
   - Name: "White Space Pro"
   - Description: "Advanced AI features and higher limits"

3. **Add Pricing**:
   - Monthly: $19.99
   - Yearly: $199.99 (save 17%)

### Create Enterprise Subscription Product

1. **Create Product**:
   - Name: "White Space Enterprise"
   - Description: "Unlimited usage and premium support"

2. **Add Pricing**:
   - Monthly: $99.99
   - Yearly: $999.99

## 🔗 Get Price IDs

After creating products, get the **Price IDs** from the pricing section:

```
price_pro_monthly = price_xxxxxxxxxxxxxxxxxx
price_pro_yearly = price_xxxxxxxxxxxxxxxxxx
price_enterprise_monthly = price_xxxxxxxxxxxxxxxxxx
price_enterprise_yearly = price_xxxxxxxxxxxxxxxxxx
```

Update these in your code where you see price mappings.

## 🪝 Webhook Setup

### 1. Create Webhook Endpoint
- Go to **Developers → Webhooks**
- **Add endpoint**: `https://your-project.supabase.co/functions/v1/stripe-webhook`
- **Events to listen for**:
  - `customer.subscription.created`
  - `customer.subscription.updated`
  - `customer.subscription.deleted`
  - `invoice.payment_succeeded`
  - `invoice.payment_failed`

### 2. Get Webhook Secret
- After creating webhook, copy the **Signing secret**
- Add to `.env` as `STRIPE_WEBHOOK_SECRET`

## 🚀 Deploy Supabase Functions

```bash
# Deploy your edge functions
supabase functions deploy create-checkout-session
supabase functions deploy stripe-webhook
supabase functions deploy generate-images
```

## 🧪 Test the Integration

### Test Cards (Stripe Test Mode)
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **Requires Authentication**: `4000 0025 0000 3155`

### Test Flow
1. **Sign up** new user
2. **Click Upgrade** → Should redirect to Stripe Checkout
3. **Complete payment** → Should redirect back to app
4. **Check subscription status** in database

## 🔒 Security Notes

- ✅ **Never commit** `.env` file to git
- ✅ **Use test keys** for development
- ✅ **Server-side only** for secret keys
- ✅ **HTTPS required** for webhooks
- ✅ **Verify signatures** in production

## 📊 Monitor Subscriptions

Use the **Admin Panel** (triple-tap header) to:
- View total revenue
- Monitor active subscriptions
- Track user usage
- Manage billing issues

## 🎯 Next Steps

1. **Set up products** in Stripe Dashboard
2. **Configure webhook** endpoint
3. **Update price IDs** in your code
4. **Test checkout flow**
5. **Deploy to production** with live keys

Your White Space Pro subscription system is ready! 🚀