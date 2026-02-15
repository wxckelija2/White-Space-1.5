// Context memory system for WhiteSpace Plus
// Remembers user preferences, language, tone, and conversation context

interface ContextMemory {
  userId: string;
  language: string;
  tone: 'casual' | 'professional' | 'technical' | 'friendly';
  contentType: 'code' | 'text' | 'json' | 'auto';
  programmingLanguage?: string;
  imageStyle?: 'realistic' | 'artistic' | 'cartoon' | 'abstract';
  lastTopics: string[];
  preferences: Record<string, any>;
  updatedAt: Date;
}

class ContextManager {
  private static instance: ContextManager;
  private memory: Map<string, ContextMemory> = new Map();

  static getInstance(): ContextManager {
    if (!ContextManager.instance) {
      ContextManager.instance = new ContextManager();
    }
    return ContextManager.instance;
  }

  // Load context for a user
  async loadContext(userId: string): Promise<ContextMemory | null> {
    try {
      // Try to load from database first
      const { data, error } = await import('@/lib/supabase').then(m => m.supabase)
        .from('user_settings')
        .select('preferences')
        .eq('user_id', userId)
        .maybeSingle();

      if (data?.preferences?.contextMemory) {
        const context = data.preferences.contextMemory;
        this.memory.set(userId, {
          ...context,
          updatedAt: new Date(context.updatedAt),
        });
        return this.memory.get(userId)!;
      }

      // Create default context
      const defaultContext: ContextMemory = {
        userId,
        language: 'en',
        tone: 'friendly',
        contentType: 'auto',
        lastTopics: [],
        preferences: {},
        updatedAt: new Date(),
      };

      this.memory.set(userId, defaultContext);
      return defaultContext;
    } catch (error) {
      console.warn('Failed to load context memory:', error);
      return null;
    }
  }

  // Save context for a user
  async saveContext(userId: string, updates: Partial<ContextMemory>): Promise<void> {
    const existing = this.memory.get(userId);
    if (!existing) return;

    const updated: ContextMemory = {
      ...existing,
      ...updates,
      updatedAt: new Date(),
    };

    this.memory.set(userId, updated);

    try {
      // Save to database
      const { supabase } = await import('@/lib/supabase');
      await supabase
        .from('user_settings')
        .upsert({
          user_id: userId,
          preferences: {
            contextMemory: updated,
          },
          updated_at: new Date().toISOString(),
        });
    } catch (error) {
      console.warn('Failed to save context memory:', error);
    }
  }

  // Update context based on user input
  async updateFromInput(userId: string, input: string): Promise<void> {
    const context = await this.loadContext(userId);
    if (!context) return;

    // Detect programming language
    if (input.includes('function') || input.includes('const') || input.includes('let')) {
      if (input.includes('console.log') || input.includes('require(')) {
        context.programmingLanguage = 'javascript';
      } else if (input.includes('def ') || input.includes('import ')) {
        context.programmingLanguage = 'python';
      }
    }

    // Detect content type
    if (input.includes('function') || input.includes('class') || input.includes('const')) {
      context.contentType = 'code';
    } else if (input.startsWith('{') || input.startsWith('[')) {
      context.contentType = 'json';
    } else {
      context.contentType = 'text';
    }

    // Extract topics (simple keyword extraction)
    const words = input.toLowerCase().split(/\s+/);
    const topics = words.filter(word =>
      word.length > 4 &&
      !['that', 'this', 'with', 'from', 'have', 'what', 'when', 'where', 'how'].includes(word)
    ).slice(0, 5);

    context.lastTopics = [...new Set([...context.lastTopics, ...topics])].slice(-10); // Keep last 10

    await this.saveContext(userId, context);
  }

  // Get context-aware prompt enhancement
  async enhancePrompt(userId: string, prompt: string): Promise<string> {
    const context = await this.loadContext(userId);
    if (!context) return prompt;

    let enhancedPrompt = prompt;

    // Add language context
    if (context.programmingLanguage) {
      enhancedPrompt += `\n\nProgramming language context: ${context.programmingLanguage}`;
    }

    // Add tone context
    if (context.tone !== 'friendly') {
      enhancedPrompt += `\n\nResponse tone: ${context.tone}`;
    }

    // Add topic context
    if (context.lastTopics.length > 0) {
      enhancedPrompt += `\n\nRecent topics discussed: ${context.lastTopics.join(', ')}`;
    }

    return enhancedPrompt;
  }

  // Get memory stats for UI
  async getMemoryStats(userId: string): Promise<{ topics: number; language?: string; tone: string }> {
    const context = await this.loadContext(userId);
    if (!context) return { topics: 0, tone: 'friendly' };

    return {
      topics: context.lastTopics.length,
      language: context.programmingLanguage,
      tone: context.tone,
    };
  }
}

export const contextManager = ContextManager.getInstance();