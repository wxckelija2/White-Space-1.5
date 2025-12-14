# White Space

White Space is an AI-powered workspace where users generate, iterate, compare, and lock drafts to turn blank ideas into finished outputs. It's Photoshop for ideas - a draft-first creative tool that combines AI generation with professional iteration workflows.

## What Makes White Space Unique

### Draft-First Workflow
Unlike chat-based AI tools, White Space treats every generation as an iterative draft:
- **Create**: Start with any input (text, voice, image, file)
- **Iterate**: Generate multiple versions and improvements
- **Compare**: Side-by-side draft comparison to pick the best
- **Branch**: Fork drafts into alternative directions
- **Lock**: Finalize drafts when they're perfect

### Professional Iteration Tools
Built for creators who need precision:
- **Timeline View**: Visual draft history with version control
- **Undo/Redo**: Revert to any previous state
- **Branching**: Create alternative versions without losing work
- **Comparison Mode**: Side-by-side diff view of drafts
- **Locking**: Mark drafts as final to prevent accidental changes

### AI-Powered Refinement
Smart iteration features:
- **Improve**: Generate better versions of existing drafts
- **Rewrite**: Create alternative approaches
- **Expand**: Add depth and detail
- **Summarize**: Condense for clarity

## Example Use Cases

**Social Media Creator**
1. Upload video + "Create Instagram clip with engaging hook"
2. AI generates first draft with trim points and caption
3. Compare 3 alternative versions side-by-side
4. Iterate on the best one with "Make it more energetic"
5. Branch into TikTok and Instagram variants
6. Lock final versions and export

**Interior Designer**
1. Snap room photo + "Modern minimalist redesign"
2. Generate initial mood board and layout concepts
3. Improve color palette in separate draft branch
4. Compare shopping lists from different styles
5. Lock final design and export presentation deck

**Entrepreneur**
1. Voice note: "App idea for connecting local artists"
2. AI creates initial pitch deck and app mockups
3. Iterate through 5 versions refining the value prop
4. Branch into different monetization strategies
5. Compare final options and lock the winner

## Tech Stack

- **Framework**: Expo + React Native
- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL)
- **Navigation**: Expo Router (Tab-based + Stack)
- **Icons**: Lucide React Native
- **Styling**: React Native StyleSheet
- **AI Integration**: Hugging Face, OpenAI, Anthropic (configurable)
- **Monetization**: RevenueCat
- **Export**: PDF generation, file sharing
- **Animations**: React Native Animated API

## Project Structure

```
white-space/
├── app/
│   ├── (tabs)/
│   │   ├── _layout.tsx           # Tab navigation
│   │   ├── index.tsx              # Create/Input screen
│   │   ├── projects.tsx           # Projects history
│   │   └── settings.tsx           # Settings & integrations
│   ├── draft-workspace/
│   │   └── [projectId].tsx        # Draft iteration workspace
│   ├── draft-compare/
│   │   └── [projectId].tsx        # Side-by-side comparison
│   ├── subscription.tsx           # Subscription management
│   ├── _layout.tsx                # Root layout
│   └── +not-found.tsx            # 404 screen
├── components/
│   ├── ProcessingModal.tsx        # Generation progress
│   ├── ResultsModal.tsx           # Output results
│   └── AnimatedLoading.tsx        # Custom loading animation
├── lib/
│   ├── supabase.ts                # Supabase client
│   ├── ai.ts                      # AI service integration
│   ├── export.ts                  # Export functionality
│   └── subscription.ts            # RevenueCat integration
├── hooks/
│   ├── useFrameworkReady.ts       # Framework initialization
│   ├── useProjects.ts             # Project management
│   └── useDrafts.ts               # Draft management
├── types/
│   ├── database.ts                # Database types
│   └── env.d.ts                  # Environment types
└── AI_SETUP.md                    # AI integration guide
```

## Getting Started

### Prerequisites
- Node.js 18+
- Expo CLI
- Supabase account

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd white-space
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```

Edit `.env` and configure your services:
```env
# Required
EXPO_PUBLIC_SUPABASE_URL=your-supabase-url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# AI Provider (choose one or use 'mock' for development)
EXPO_PUBLIC_AI_PROVIDER=mock
EXPO_PUBLIC_HUGGINGFACE_API_KEY=your-huggingface-key
# EXPO_PUBLIC_OPENAI_API_KEY=your-openai-key
# EXPO_PUBLIC_ANTHROPIC_API_KEY=your-anthropic-key

# Monetization (optional)
EXPO_PUBLIC_REVENUECAT_API_KEY=your-revenuecat-key
```

See `AI_SETUP.md` for detailed AI configuration instructions.

4. Start the development server
```bash
npm run dev
```

5. Run on your device
- Scan the QR code with Expo Go app (iOS/Android)
- Press `w` to open in web browser

## Database Schema

### Tables

**projects**
- Container for draft workflows
- Fields: id, user_id, title, input_type, input_content, input_url, intent, tags, status

**drafts**
- Individual draft versions within projects
- Fields: id, project_id, parent_draft_id, version_number, title, content, status, is_locked, metadata

**draft_outputs**
- Generated assets for each draft
- Fields: id, draft_id, output_type, output_url, output_data, status

**user_settings**
- User preferences, integrations, and subscription tier
- Fields: user_id, connected_integrations, preferences, memory_enabled, local_mode, subscription_tier

All tables have Row Level Security (RLS) enabled for data protection.

## Features

### Core Draft Workflow ✅
- ✅ **Draft Versioning**: Every generation is a versioned draft
- ✅ **Iteration Tools**: Improve, rewrite, and expand existing drafts
- ✅ **Side-by-Side Comparison**: Compare drafts with difference highlighting
- ✅ **Branching System**: Fork drafts into alternative versions
- ✅ **Timeline View**: Visual draft history with version control
- ✅ **Undo/Redo**: Revert to any previous draft state
- ✅ **Locking**: Mark drafts as final to prevent changes

### AI Integration ✅
- ✅ **Multi-Provider Support**: Hugging Face, OpenAI, Anthropic
- ✅ **Task-Specific Generation**: Generate, improve, rewrite, expand
- ✅ **Fallback System**: Automatic fallback to mock responses
- ✅ **Configurable Providers**: Easy switching between AI services

### Export & Sharing ✅
- ✅ **Multiple Formats**: PDF, HTML, Text export
- ✅ **Professional Layout**: Styled exports with metadata
- ✅ **Native Sharing**: Share via system share sheet
- ✅ **File Management**: Proper file handling and cleanup

### User Experience ✅
- ✅ **Subtle Animations**: Smooth transitions and micro-interactions
- ✅ **Premium Feel**: Carefully crafted animations and feedback
- ✅ **Responsive Design**: Optimized for mobile and tablet
- ✅ **Intuitive Navigation**: Clear information hierarchy

### Monetization ✅
- ✅ **Tier System**: Free, Pro, Enterprise subscription tiers
- ✅ **RevenueCat Integration**: Full subscription management
- ✅ **Feature Gates**: Progressive feature unlocking
- ✅ **Paywall Management**: Smooth upgrade flows

### Input Methods ✅
- ✅ **Universal Input**: Text, voice, camera, file upload UI
- ✅ **Tab Navigation**: Create, Projects, Settings
- ✅ **Processing States**: Loading animations and progress feedback
- ✅ **Results Display**: Multi-output presentation

### Data Management ✅
- ✅ **Supabase Integration**: Real-time database with RLS
- ✅ **Offline Support**: Local draft storage architecture
- ✅ **User Settings**: Preferences and integration management
- ✅ **Privacy Controls**: Local mode and data deletion options

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build:web` - Build for web
- `npm run lint` - Lint code
- `npm run typecheck` - Type check TypeScript

### Code Style

This project uses:
- TypeScript for type safety
- Prettier for code formatting
- ESLint for code quality

## Privacy & Security

- End-to-end encryption for data in transit
- Encryption at rest for stored data
- Optional local-only processing mode
- User data deletion on request
- Row Level Security on all database tables

## Contributing

Contributions are welcome! Please follow these guidelines:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - See LICENSE file for details

## Support

For questions or issues, please open an issue on GitHub or contact the team.

---

Made with care by the White Space team
