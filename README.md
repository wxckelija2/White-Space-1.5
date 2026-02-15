# White Space Pro 🚀

A premium AI assistant platform with subscription management, advanced features, and enterprise capabilities.

## ✨ Features

### 🤖 AI Capabilities
- **Multiple AI Models**: GPT-4, Claude-3, Gemini, and more
- **Code Generation**: Intelligent code completion and debugging
- **Image Generation**: AI-powered art creation (Pro feature)
- **Document Analysis**: Advanced file processing
- **Voice Integration**: Speech-to-text and text-to-speech

### 💰 Subscription System
- **Free Tier**: 50 messages/day, basic features
- **Pro Tier**: $19.99/month - 1,000 messages/day, premium features
- **Enterprise Tier**: $99.99/month - Unlimited usage, dedicated support
- **Stripe Integration**: Secure payment processing
- **Usage Tracking**: Real-time monitoring and limits

### 🌍 Internationalization
- **50+ Languages**: Comprehensive language support
- **Auto-Detection**: Smart language recognition
- **Personalized Responses**: AI adapts to user language preferences

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Supabase account
- Stripe account
- Expo CLI

### Installation

1. **Clone and setup**:
   ```bash
   git clone <your-repo>
   cd white-space-pro
   npm install
   ```

2. **Environment setup**:
   ```bash
   cp .env.example .env
   # Edit .env with your API keys
   ```

3. **Supabase setup**:
   ```bash
   # Run the migration
   supabase db push
   ```

4. **Stripe setup**:
   - Follow `STRIPE_SETUP.md`
   - Create products and prices
   - Set up webhooks

5. **Deploy functions**:
   ```bash
   supabase functions deploy
   ```

6. **Start development**:
   ```bash
   npm run dev
   ```

## 🏗️ Architecture

### Core Components
- **AI Service**: Multi-provider AI integration with subscription gating
- **Subscription Manager**: Stripe-powered billing system
- **Usage Tracking**: Real-time limits and analytics
- **Admin Panel**: User management and insights
- **Image Generator**: Pro-tier AI art creation

### Database Schema
- `subscriptions`: User subscription data
- `usage_stats`: Daily/monthly usage tracking
- `generated_images`: AI-generated content storage
- `user_settings`: Preferences and configurations

### Supabase Edge Functions
- `create-checkout-session`: Payment processing
- `stripe-webhook`: Subscription lifecycle management
- `generate-images`: AI image creation

## 🔧 Configuration

### Environment Variables
```env
# Supabase
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key

# Stripe
EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# AI Providers
EXPO_PUBLIC_OPENAI_API_KEY=sk-...
EXPO_PUBLIC_ANTHROPIC_API_KEY=sk-ant-...
```

### Stripe Products
Create these products in your Stripe Dashboard:

1. **White Space Pro**
   - Monthly: $19.99
   - Yearly: $199.99

2. **White Space Enterprise**
   - Monthly: $99.99
   - Yearly: $999.99

## 🧪 Testing

### Test Cards
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **3D Secure**: `4000 0025 0000 3155`

### Admin Access
- Triple-tap the header in the main chat to access admin panel
- View analytics, test Stripe connection, manage users

## 🚀 Deployment

### Production Checklist
- [ ] Update Stripe keys to live mode
- [ ] Configure production Supabase instance
- [ ] Set up production webhook endpoints
- [ ] Test complete payment flow
- [ ] Configure monitoring and alerts
- [ ] Set up backup and recovery

### Build Commands
```bash
# Build for production
npx expo build --platform ios
npx expo build --platform android

# Deploy Supabase functions
supabase functions deploy --project-ref your-project-ref
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

- **Documentation**: See individual component READMEs
- **Issues**: GitHub Issues
- **Admin Panel**: Triple-tap header for system diagnostics

---

**White Space Pro** - Where AI meets enterprise. 🌟