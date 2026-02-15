/**
 * Stripe API Key Test Script
 * Run with: node test-stripe-key.js
 * 
 * Make sure your .env file has STRIPE_SECRET_KEY set
 */

require('dotenv').config();

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

async function testStripeKey() {
  console.log('\n🔑 Testing Stripe API Key...\n');

  if (!STRIPE_SECRET_KEY) {
    console.error('❌ STRIPE_SECRET_KEY not found in environment variables');
    console.log('\nMake sure your .env file contains:');
    console.log('STRIPE_SECRET_KEY=sk_test_...');
    return false;
  }

  // Check key format
  if (STRIPE_SECRET_KEY.startsWith('sk_test_')) {
    console.log('✅ Using TEST mode key (safe for development)');
  } else if (STRIPE_SECRET_KEY.startsWith('sk_live_')) {
    console.log('⚠️  Using LIVE mode key (be careful!)');
  } else {
    console.error('❌ Invalid key format. Should start with sk_test_ or sk_live_');
    return false;
  }

  try {
    // Test the key by fetching account info
    const response = await fetch('https://api.stripe.com/v1/account', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${STRIPE_SECRET_KEY}`,
      },
    });

    if (response.ok) {
      const account = await response.json();
      console.log('\n✅ Stripe API Key is VALID!\n');
      console.log('Account Details:');
      console.log(`  • Account ID: ${account.id}`);
      console.log(`  • Business Name: ${account.business_profile?.name || 'Not set'}`);
      console.log(`  • Country: ${account.country}`);
      console.log(`  • Default Currency: ${account.default_currency?.toUpperCase()}`);
      console.log(`  • Charges Enabled: ${account.charges_enabled ? '✅ Yes' : '❌ No'}`);
      console.log(`  • Payouts Enabled: ${account.payouts_enabled ? '✅ Yes' : '❌ No'}`);
      return true;
    } else {
      const error = await response.json();
      console.error('\n❌ Stripe API Key is INVALID\n');
      console.error(`Error: ${error.error?.message || 'Unknown error'}`);
      console.error(`Type: ${error.error?.type || 'Unknown'}`);
      return false;
    }
  } catch (error) {
    console.error('\n❌ Failed to connect to Stripe API\n');
    console.error(`Error: ${error.message}`);
    return false;
  }
}

async function testPublishableKey() {
  const STRIPE_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  
  console.log('\n🔑 Checking Publishable Key...\n');

  if (!STRIPE_PUBLISHABLE_KEY) {
    console.error('❌ EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY not found');
    return false;
  }

  if (STRIPE_PUBLISHABLE_KEY.startsWith('pk_test_')) {
    console.log('✅ Publishable key format is valid (TEST mode)');
    return true;
  } else if (STRIPE_PUBLISHABLE_KEY.startsWith('pk_live_')) {
    console.log('✅ Publishable key format is valid (LIVE mode)');
    return true;
  } else {
    console.error('❌ Invalid publishable key format');
    return false;
  }
}

async function main() {
  console.log('═══════════════════════════════════════════');
  console.log('       White Space - Stripe Key Tester      ');
  console.log('═══════════════════════════════════════════');

  const secretKeyValid = await testStripeKey();
  const publishableKeyValid = await testPublishableKey();

  console.log('\n═══════════════════════════════════════════');
  console.log('                  Summary                   ');
  console.log('═══════════════════════════════════════════');
  console.log(`Secret Key:      ${secretKeyValid ? '✅ Valid' : '❌ Invalid'}`);
  console.log(`Publishable Key: ${publishableKeyValid ? '✅ Valid' : '❌ Invalid'}`);
  console.log('═══════════════════════════════════════════\n');

  if (secretKeyValid && publishableKeyValid) {
    console.log('🎉 Your Stripe integration is ready to go!\n');
  } else {
    console.log('⚠️  Please fix the issues above before using Stripe.\n');
  }
}

main();
