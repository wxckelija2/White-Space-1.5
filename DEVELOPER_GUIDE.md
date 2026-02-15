# White Space Developer Guide

## Quick Start

### Environment Setup

1. Copy environment variables:
```bash
cp .env.example .env
```

2. Add your Supabase credentials to `.env`:
```
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

3. Install dependencies:
```bash
npm install
```

4. Start development server:
```bash
npm run dev
```

## Project Architecture

### File Structure

```
white-space/
├── app/                          # Expo Router app directory
│   ├── (tabs)/                   # Tab navigation group
│   │   ├── _layout.tsx          # Tab bar configuration
│   │   ├── index.tsx            # Create screen (main input)
│   │   ├── projects.tsx         # Projects history
│   │   └── settings.tsx         # Settings & preferences
│   ├── _layout.tsx              # Root layout
│   └── +not-found.tsx           # 404 page
├── components/                   # Reusable components
│   ├── Button.tsx               # Button component
│   ├── EmptyState.tsx           # Empty state UI
│   ├── ProcessingModal.tsx      # Generation progress modal
│   └── ResultsModal.tsx         # Results display modal
├── constants/                    # App constants
│   └── app.ts                   # App configuration
├── hooks/                        # Custom React hooks
│   ├── useFrameworkReady.ts     # Framework initialization (required)
│   └── useProjects.ts           # Projects data management
├── lib/                          # Utilities and config
│   ├── supabase.ts              # Supabase client
│   └── utils.ts                 # Helper functions
└── types/                        # TypeScript types
    ├── database.ts              # Database schema types
    └── env.d.ts                 # Environment variable types
```

### Navigation Flow

1. Root Layout (`app/_layout.tsx`)
   - Initializes framework
   - Contains Stack navigator
   - Points to tabs group

2. Tabs Layout (`app/(tabs)/_layout.tsx`)
   - Tab bar configuration
   - Three tabs: Create, Projects, Settings

3. Screens
   - **Create** (`index.tsx`): Universal input for creating projects
   - **Projects** (`projects.tsx`): View project history
   - **Settings** (`settings.tsx`): App preferences and integrations

### State Management

Currently using React hooks for state management:
- `useState` for local component state
- `useEffect` for side effects
- Custom `useProjects` hook for project data

For future scaling, consider:
- Context API for global state
- Zustand for lightweight state management
- React Query for server state

### Database Schema

#### Projects Table
```typescript
interface Project {
  id: string;                    // UUID
  user_id: string;               // Owner ID
  title: string;                 // Project name
  input_type: InputType;         // text | image | video | audio
  input_content?: string;        // Text input or description
  input_url?: string;            // Media URL
  intent: string;                // What user wants to generate
  tags: string[];               // For categorization
  status: ProjectStatus;         // processing | completed | failed
  created_at: string;           // ISO timestamp
  updated_at: string;           // ISO timestamp
}
```

#### Outputs Table
```typescript
interface Output {
  id: string;                    // UUID
  project_id: string;            // Foreign key to projects
  output_type: OutputType;       // deck | image | video | summary | mockup | copy
  output_url?: string;           // Generated asset URL
  output_data: object;           // Additional metadata
  status: OutputStatus;          // generating | completed | failed
  created_at: string;           // ISO timestamp
}
```

#### User Settings Table
```typescript
interface UserSettings {
  user_id: string;                      // Primary key
  connected_integrations: object;       // Connected services
  preferences: object;                  // User preferences
  memory_enabled: boolean;              // Pattern learning
  local_mode: boolean;                  // Privacy mode
  created_at: string;                  // ISO timestamp
  updated_at: string;                  // ISO timestamp
}
```

### Security

All database tables have Row Level Security (RLS) enabled:
- Users can only access their own data
- Authentication required for all operations
- Policies enforce data ownership

### Adding New Features

#### 1. Adding a New Screen

Create file in `app/` directory:
```typescript
// app/new-screen.tsx
import { View, Text } from 'react-native';

export default function NewScreen() {
  return (
    <View>
      <Text>New Screen</Text>
    </View>
  );
}
```

Add to navigation in `app/_layout.tsx`:
```typescript
<Stack.Screen name="new-screen" options={{ title: 'New Screen' }} />
```

#### 2. Adding a New Component

Create file in `components/` directory:
```typescript
// components/NewComponent.tsx
import { View, Text, StyleSheet } from 'react-native';

interface NewComponentProps {
  title: string;
}

export default function NewComponent({ title }: NewComponentProps) {
  return (
    <View style={styles.container}>
      <Text>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
```

#### 3. Adding a New Database Table

Create migration:
```sql
-- Create new table
CREATE TABLE table_name (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;

-- Create policy
CREATE POLICY "Users can access own data"
  ON table_name
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
```

### Styling Guidelines

- Use `StyleSheet.create` for all styles
- Follow mobile-first approach
- Use consistent spacing (8px grid system)
- Colors defined in `constants/app.ts`
- Prefer neutral colors (black, white, grays)

Example:
```typescript
const styles = StyleSheet.create({
  container: {
    padding: 16,           // 2 * 8px
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,       // 1 * 8px
  },
});
```

### Common Tasks

#### Fetching Projects
```typescript
import { useProjects } from '@/hooks/useProjects';

function MyComponent() {
  const { projects, loading, error } = useProjects();

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return <ProjectsList projects={projects} />;
}
```

#### Creating a Project
```typescript
const { createProject } = useProjects();

const handleCreate = async () => {
  try {
    await createProject({
      title: 'My Project',
      input_type: 'text',
      input_content: 'Project description',
      intent: 'generate_deck',
      status: 'processing',
    });
  } catch (error) {
    console.error('Failed to create project:', error);
  }
};
```

#### Using Supabase Client
```typescript
import { supabase } from '@/lib/supabase';

// Query data
const { data, error } = await supabase
  .from('projects')
  .select('*')
  .eq('status', 'completed');

// Insert data
const { error } = await supabase
  .from('projects')
  .insert([{ title: 'New Project' }]);
```

### Testing

Currently manual testing. For future:
- Unit tests: Jest + React Native Testing Library
- E2E tests: Detox or Maestro
- Type checking: `npm run typecheck`

### Deployment

#### Web
```bash
npm run build:web
```

#### Mobile (Expo)
```bash
eas build --platform ios
eas build --platform android
```

### Troubleshooting

#### Issue: Environment variables not loading
- Ensure `.env` file exists in project root
- Restart development server after changing `.env`
- Use `EXPO_PUBLIC_` prefix for all variables

#### Issue: Supabase connection fails
- Verify credentials in `.env`
- Check Supabase project is active
- Ensure RLS policies are correct

#### Issue: TypeScript errors
- Run `npm run typecheck` to see all errors
- Ensure types are properly imported
- Check type definitions in `types/` directory

### Best Practices

1. **Components**: Keep components small and focused
2. **Hooks**: Extract reusable logic into custom hooks
3. **Types**: Always use TypeScript types
4. **Styles**: Use StyleSheet, not inline styles
5. **State**: Keep state as local as possible
6. **Database**: Always use RLS for security
7. **Errors**: Handle errors gracefully in UI

### Resources

- [Expo Documentation](https://docs.expo.dev)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [React Native](https://reactnative.dev)
- [Supabase](https://supabase.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs)

### Getting Help

- Check existing issues on GitHub
- Review Expo documentation
- Ask in project Discord/Slack
- Create detailed issue with reproduction steps
