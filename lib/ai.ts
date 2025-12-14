import { supabase } from './supabase';

export type AITaskType = 'generate' | 'improve' | 'summarize' | 'expand' | 'rewrite';
export type AIProvider = 'huggingface' | 'openai' | 'anthropic' | 'gemini' | 'mock';

export interface AITask {
  type: AITaskType;
  prompt: string;
  context?: string;
  parameters?: Record<string, any>;
}

export interface AIResponse {
  content: string;
  metadata?: {
    model: string;
    tokens: number;
    processingTime: number;
    provider: AIProvider;
  };
}

class AIService {
  private provider: AIProvider = 'mock'; // Default to mock for development

  constructor() {
    // Initialize with environment variables
    const provider = process.env.EXPO_PUBLIC_AI_PROVIDER as AIProvider;
    if (provider && ['huggingface', 'openai', 'anthropic', 'gemini', 'mock'].includes(provider)) {
      this.provider = provider;
    }
  }

  async generate(task: AITask): Promise<AIResponse> {
    const startTime = Date.now();

    try {
      switch (this.provider) {
        case 'huggingface':
          return await this.generateWithHuggingFace(task);
        case 'openai':
          return await this.generateWithOpenAI(task);
        case 'anthropic':
          return await this.generateWithAnthropic(task);
        case 'gemini':
          return await this.generateWithGemini(task);
        case 'mock':
        default:
          return await this.generateMock(task);
      }
    } catch (error) {
      console.error('AI generation failed:', error);
      // Fallback to mock generation
      return await this.generateMock(task);
    } finally {
      const processingTime = Date.now() - startTime;
      console.log(`AI generation took ${processingTime}ms`);
    }
  }

  private async generateWithHuggingFace(task: AITask): Promise<AIResponse> {
    const apiKey = process.env.EXPO_PUBLIC_HUGGINGFACE_API_KEY;
    if (!apiKey) {
      throw new Error('Hugging Face API key not configured');
    }

    // Determine model based on task type
    const model = this.getHuggingFaceModel(task.type);

    const response = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: this.buildPrompt(task),
        parameters: {
          max_new_tokens: 500,
          temperature: 0.7,
          do_sample: true,
          ...task.parameters,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Hugging Face API error: ${response.status}`);
    }

    const result = await response.json();

    return {
      content: this.parseHuggingFaceResponse(result),
      metadata: {
        model,
        tokens: result[0]?.generated_text?.length || 0,
        processingTime: 0,
        provider: 'huggingface',
      },
    };
  }

  private async generateWithOpenAI(task: AITask): Promise<AIResponse> {
    const apiKey = process.env.EXPO_PUBLIC_OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: this.getSystemPrompt(task.type),
          },
          {
            role: 'user',
            content: this.buildPrompt(task),
          },
        ],
        max_tokens: 1000,
        temperature: 0.7,
        ...task.parameters,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const result = await response.json();

    return {
      content: result.choices[0]?.message?.content || '',
      metadata: {
        model: 'gpt-4',
        tokens: result.usage?.total_tokens || 0,
        processingTime: 0,
        provider: 'openai',
      },
    };
  }

  private async generateWithAnthropic(task: AITask): Promise<AIResponse> {
    const apiKey = process.env.EXPO_PUBLIC_ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error('Anthropic API key not configured');
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 1000,
        system: this.getSystemPrompt(task.type),
        messages: [
          {
            role: 'user',
            content: this.buildPrompt(task),
          },
        ],
        temperature: 0.7,
        ...task.parameters,
      }),
    });

    if (!response.ok) {
      throw new Error(`Anthropic API error: ${response.status}`);
    }

    const result = await response.json();

    return {
      content: result.content[0]?.text || '',
      metadata: {
        model: 'claude-3-sonnet-20240229',
        tokens: result.usage?.input_tokens + result.usage?.output_tokens || 0,
        processingTime: 0,
        provider: 'anthropic',
      },
    };
  }

  private async generateWithGemini(task: AITask): Promise<AIResponse> {
    // Call Supabase Edge Function instead of Gemini directly
    const { data, error } = await supabase.functions.invoke('generate-content', {
      body: {
        prompt: task.prompt,
        type: task.type,
        context: task.context,
        parameters: task.parameters,
      },
    });

    if (error) {
      throw new Error(`Gemini API error: ${error.message}`);
    }

    if (data.error) {
      throw new Error(`Gemini generation failed: ${data.error}`);
    }

    return {
      content: data.content || 'Generated content not available',
      metadata: {
        model: data.metadata?.model || 'gemini-1.5-flash',
        tokens: data.metadata?.tokens || 0,
        processingTime: data.metadata?.processingTime || 0,
        provider: 'gemini',
      },
    };
  }

  private async generateMock(task: AITask): Promise<AIResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

    const mockResponses: Record<AITaskType, string[]> = {
      generate: [
        "Here's a comprehensive draft based on your request. This content explores the main ideas and provides a solid foundation for further refinement.\n\nKey points to consider:\n• Structure and organization\n• Clear messaging\n• Engaging tone\n• Actionable insights\n\nThe draft can be improved through iteration and feedback.",
        "Based on your input, I've created an initial draft that captures the essence of your vision. This version focuses on clarity and impact.\n\nAreas for potential enhancement:\n• Specific examples and data\n• Visual elements\n• Call-to-action elements\n• Target audience considerations",
      ],
      improve: [
        "I've refined the draft to enhance clarity, impact, and flow. The improved version maintains your original intent while strengthening the key messages.\n\nEnhancements made:\n• Improved structure and readability\n• Stronger opening and closing\n• More compelling language\n• Better organization of ideas",
        "The enhanced version builds on the original draft with improvements in tone, structure, and persuasiveness. Each section has been optimized for maximum impact.",
      ],
      summarize: [
        "Key takeaways from the content:\n• Main objective and purpose\n• Core arguments and evidence\n• Important conclusions\n• Action items and recommendations",
      ],
      expand: [
        "I've expanded the draft with additional context, examples, and supporting details. The enhanced version provides more comprehensive coverage while maintaining focus and clarity.",
      ],
      rewrite: [
        "Here's a rewritten version with improved flow, clarity, and engagement. The content has been restructured for better readability and impact.",
      ],
    };

    const responses = mockResponses[task.type] || mockResponses.generate;
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];

    return {
      content: randomResponse,
      metadata: {
        model: 'mock-gpt',
        tokens: randomResponse.length,
        processingTime: 2000,
        provider: 'mock',
      },
    };
  }

  private getHuggingFaceModel(taskType: AITaskType): string {
    // Use appropriate models based on task type
    const models = {
      generate: 'microsoft/DialoGPT-medium',
      improve: 'facebook/bart-large-cnn',
      summarize: 'facebook/bart-large-cnn',
      expand: 'gpt2',
      rewrite: 'facebook/bart-large-cnn',
    };

    return models[taskType] || models.generate;
  }

  private parseHuggingFaceResponse(result: any): string {
    if (Array.isArray(result) && result[0]?.generated_text) {
      return result[0].generated_text;
    }
    return 'Generated content not available';
  }

  private parseGeminiResponse(result: any): string {
    try {
      if (result.candidates && result.candidates[0]?.content?.parts?.[0]?.text) {
        return result.candidates[0].content.parts[0].text;
      }
      return 'Generated content not available';
    } catch (error) {
      console.error('Error parsing Gemini response:', error);
      return 'Generated content not available';
    }
  }

  private buildGeminiPrompt(task: AITask): string {
    let prompt = '';

    // Add system instruction based on task type
    switch (task.type) {
      case 'generate':
        prompt = 'You are a creative writing assistant. Generate high-quality, engaging content based on the user\'s request.\n\n';
        break;
      case 'improve':
        prompt = 'You are an editor. Improve the provided content by enhancing clarity, structure, and impact while preserving the original intent.\n\n';
        break;
      case 'summarize':
        prompt = 'You are a summarization expert. Create concise, comprehensive summaries that capture the key points and main ideas.\n\n';
        break;
      case 'expand':
        prompt = 'You are a content expansion specialist. Add relevant details, examples, and context to make the content more comprehensive.\n\n';
        break;
      case 'rewrite':
        prompt = 'You are a professional writer. Rewrite the content to improve flow, clarity, and engagement.\n\n';
        break;
    }

    // Add context if provided
    if (task.context) {
      prompt += `Context: ${task.context}\n\n`;
    }

    // Add the main prompt
    prompt += `Request: ${task.prompt}`;

    return prompt;
  }

  private getSystemPrompt(taskType: AITaskType): string {
    const prompts = {
      generate: 'You are a creative writing assistant. Generate high-quality, engaging content based on the user\'s request.',
      improve: 'You are an editor. Improve the provided content by enhancing clarity, structure, and impact while preserving the original intent.',
      summarize: 'You are a summarization expert. Create concise, comprehensive summaries that capture the key points and main ideas.',
      expand: 'You are a content expansion specialist. Add relevant details, examples, and context to make the content more comprehensive.',
      rewrite: 'You are a professional writer. Rewrite the content to improve flow, clarity, and engagement.',
    };

    return prompts[taskType] || prompts.generate;
  }

  private buildPrompt(task: AITask): string {
    let prompt = task.prompt;

    if (task.context) {
      prompt = `Context: ${task.context}\n\nRequest: ${task.prompt}`;
    }

    // Add task-specific instructions
    switch (task.type) {
      case 'improve':
        prompt = `Please improve this content:\n\n${task.prompt}`;
        break;
      case 'summarize':
        prompt = `Please summarize this content:\n\n${task.prompt}`;
        break;
      case 'expand':
        prompt = `Please expand on this content with more details and examples:\n\n${task.prompt}`;
        break;
      case 'rewrite':
        prompt = `Please rewrite this content:\n\n${task.prompt}`;
        break;
    }

    return prompt;
  }

  // Utility method to check if AI service is available
  async isAvailable(): Promise<boolean> {
    try {
      if (this.provider === 'mock') return true;

      // Quick test call to check API availability
      const testTask: AITask = {
        type: 'generate',
        prompt: 'Hello',
      };

      await this.generate(testTask);
      return true;
    } catch {
      return false;
    }
  }

  // Method to get available providers based on configured API keys
  getAvailableProviders(): AIProvider[] {
    const providers: AIProvider[] = ['mock'];

    if (process.env.EXPO_PUBLIC_HUGGINGFACE_API_KEY) {
      providers.push('huggingface');
    }
    if (process.env.EXPO_PUBLIC_OPENAI_API_KEY) {
      providers.push('openai');
    }
    if (process.env.EXPO_PUBLIC_ANTHROPIC_API_KEY) {
      providers.push('anthropic');
    }
    if (process.env.EXPO_PUBLIC_GEMINI_API_KEY) {
      providers.push('gemini');
    }

    return providers;
  }

  // Method to switch providers
  setProvider(provider: AIProvider) {
    if (this.getAvailableProviders().includes(provider)) {
      this.provider = provider;
    } else {
      throw new Error(`Provider ${provider} is not available`);
    }
  }
}

// Export singleton instance
export const aiService = new AIService();
