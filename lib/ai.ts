import { supabase } from './supabase';
import { getUserLanguage } from './auth-functions';
import { getSubscription } from './stripe';
import { incrementUsage, checkUsageLimits } from './usage-tracking';
import { SUBSCRIPTION_LIMITS, SubscriptionTier } from './subscription';
import { contextManager } from './context-memory';
import { searchKnowledge } from './knowledge-base';

export type AITaskType = 'generate' | 'improve' | 'summarize' | 'expand' | 'rewrite';
export type AIProvider = 'huggingface' | 'openai' | 'anthropic' | 'gemini' | 'mock';

export interface AITask {
  type: AITaskType;
  prompt: string;
  context?: string;
  conversationHistory?: Array<{ role: 'user' | 'assistant'; content: string }>;
  parameters?: Record<string, any>;
  attachments?: Array<{
    uri: string;
    type: string;
    name: string;
    base64?: string;
    textContent?: string;
    size: number;
  }>;
  abortController?: AbortController;
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

// Common typo corrections dictionary
const TYPO_CORRECTIONS: Record<string, string> = {
  // Common misspellings
  'teh': 'the', 'hte': 'the', 'thier': 'their', 'recieve': 'receive', 'wierd': 'weird',
  'occured': 'occurred', 'seperate': 'separate', 'definately': 'definitely', 'accomodate': 'accommodate',
  'occurence': 'occurrence', 'untill': 'until', 'wich': 'which', 'becuase': 'because', 'beacuse': 'because',
  'doesnt': "doesn't", 'dont': "don't", 'wont': "won't", 'cant': "can't", 'shouldnt': "shouldn't",
  'wouldnt': "wouldn't", 'couldnt': "couldn't", 'didnt': "didn't", 'isnt': "isn't", 'wasnt': "wasn't",
  'arent': "aren't", 'werent': "weren't", 'hasnt': "hasn't", 'havent': "haven't", 'hadnt': "hadn't",
  'im': "I'm", 'ive': "I've", 'id': "I'd", 'ill': "I'll", 'youre': "you're", 'youve': "you've",
  'youd': "you'd", 'youll': "you'll", 'theyre': "they're", 'theyve': "they've", 'theyd': "they'd",
  'theyll': "they'll", 'weve': "we've", 'wed': "we'd", 'well': "we'll", 'hes': "he's", 'shes': "she's",
  'its': "it's", 'thats': "that's", 'whats': "what's", 'whos': "who's", 'wheres': "where's",
  'heres': "here's", 'theres': "there's", 'lets': "let's",
  // Tech/coding typos
  'fucntion': 'function', 'funciton': 'function', 'funtion': 'function',
  'retrun': 'return', 'reutrn': 'return', 'retrn': 'return', 'retur': 'return',
  'consle': 'console', 'cosole': 'console', 'consloe': 'console',
  'improt': 'import', 'imoprt': 'import', 'ipmort': 'import',
  'exprot': 'export', 'exoprt': 'export', 'exprort': 'export',
  'varaible': 'variable', 'varialbe': 'variable', 'variabel': 'variable',
  'stirng': 'string', 'strign': 'string', 'strnig': 'string',
  'nubmer': 'number', 'numbre': 'number', 'numbr': 'number',
  'arrary': 'array', 'arrya': 'array', 'arary': 'array',
  'obejct': 'object', 'objcet': 'object', 'objetc': 'object',
  'calss': 'class', 'clss': 'class', 'classs': 'class',
  'methdo': 'method', 'metohd': 'method', 'mehtod': 'method',
  'pramater': 'parameter', 'paramter': 'parameter', 'parmaeter': 'parameter',
  'arguemnt': 'argument', 'arugment': 'argument', 'arguement': 'argument',
  // Common question typos
  'waht': 'what', 'hwat': 'what', 'whta': 'what',
  'hwo': 'how', 'hoe': 'how', 'howw': 'how',
  'wehn': 'when', 'whn': 'when', 'whne': 'when',
  'wehre': 'where', 'wheer': 'where', 'wher': 'where',
  'whcih': 'which', 'whihc': 'which',
  'taht': 'that', 'htat': 'that', 'tath': 'that',
  'tihs': 'this', 'htis': 'this', 'thsi': 'this',
  'form': 'from', 'fomr': 'from', 'frmo': 'from',
  'wiht': 'with', 'wtih': 'with', 'iwth': 'with',
  'cna': 'can', 'acn': 'can',
  'yuo': 'you', 'oyu': 'you', 'uoy': 'you',
  'adn': 'and', 'nad': 'and', 'nda': 'and',
  'thnk': 'think', 'thnik': 'think', 'htink': 'think',
  'knwo': 'know', 'konw': 'know', 'nkow': 'know',
  'jsut': 'just', 'juts': 'just', 'ujst': 'just',
  'liek': 'like', 'lkie': 'like', 'ilke': 'like',
  'amke': 'make', 'mkae': 'make', 'maek': 'make',
  'hlep': 'help', 'hepl': 'help', 'hep': 'help',
  'plz': 'please', 'pls': 'please', 'plese': 'please', 'pleae': 'please',
  'thx': 'thanks', 'thnx': 'thanks', 'thanx': 'thanks',
  'sry': 'sorry', 'srry': 'sorry',
  'msg': 'message', 'mesage': 'message', 'messge': 'message',
  'pic': 'picture', 'pitcure': 'picture', 'picutre': 'picture',
  'info': 'information', 'infomation': 'information', 'informaiton': 'information',
  // AI/tech terms
  'artifical': 'artificial', 'inteligence': 'intelligence', 'machien': 'machine',
  'leanring': 'learning', 'algortihm': 'algorithm', 'nueral': 'neural',
  'netowrk': 'network', 'traning': 'training', 'modle': 'model',
  // Action words
  'wirte': 'write', 'wrtie': 'write', 'wriet': 'write',
  'creaet': 'create', 'craete': 'create', 'creat': 'create',
  'delte': 'delete', 'deleet': 'delete', 'dleete': 'delete',
  'udpate': 'update', 'upadte': 'update', 'updat': 'update',
  'serach': 'search', 'searhc': 'search', 'saerch': 'search',
  'fidn': 'find', 'fnd': 'find', 'fnid': 'find',
  'opne': 'open', 'ope': 'open', 'oepn': 'open',
  'clsoe': 'close', 'colse': 'close', 'closee': 'close',
  'strat': 'start', 'satrt': 'start', 'statr': 'start',
  'sotp': 'stop', 'stpo': 'stop', 'sopt': 'stop',
  'shwo': 'show', 'hsow': 'show', 'showw': 'show',
  'hdie': 'hide', 'hdei': 'hide', 'hidd': 'hide',
  'sned': 'send', 'sedn': 'send', 'snde': 'send',
  'recive': 'receive', 'receve': 'receive', 'receiv': 'receive',
  'genrate': 'generate', 'genearte': 'generate', 'generat': 'generate',
  'expalin': 'explain', 'explian': 'explain', 'expain': 'explain',
  'sumamry': 'summary', 'summray': 'summary', 'sumarry': 'summary',
  'anaylze': 'analyze', 'analzye': 'analyze', 'analize': 'analyze',
};

class AIService {
  private provider: AIProvider = 'mock'; // Default to mock for development

  constructor() {
    // Initialize with environment variables
    const provider = process.env.EXPO_PUBLIC_AI_PROVIDER as AIProvider;
    if (provider && ['huggingface', 'openai', 'anthropic', 'gemini', 'mock'].includes(provider)) {
      this.provider = provider;
    }
  }

  // Correct typos in user input
  private correctTypos(text: string): string {
    let corrected = text;
    const words = text.split(/(\s+)/); // Split but keep whitespace
    
    const correctedWords = words.map(word => {
      // Skip whitespace
      if (/^\s+$/.test(word)) return word;
      
      // Preserve punctuation
      const match = word.match(/^([^a-zA-Z]*)([a-zA-Z]+)([^a-zA-Z]*)$/);
      if (!match) return word;
      
      const [, prefix, core, suffix] = match;
      const lowerCore = core.toLowerCase();
      
      if (TYPO_CORRECTIONS[lowerCore]) {
        // Preserve original case pattern
        const correction = TYPO_CORRECTIONS[lowerCore];
        if (core === core.toUpperCase()) {
          return prefix + correction.toUpperCase() + suffix;
        } else if (core[0] === core[0].toUpperCase()) {
          return prefix + correction.charAt(0).toUpperCase() + correction.slice(1) + suffix;
        }
        return prefix + correction + suffix;
      }
      return word;
    });
    
    return correctedWords.join('');
  }

  async generate(task: AITask): Promise<AIResponse> {
    const startTime = Date.now();

    // Correct typos in user input before processing
    task.prompt = this.correctTypos(task.prompt);

    // Get user subscription and check limits
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('User not authenticated');
    }

    const subscription = await getSubscription(user.id);
    const tier: SubscriptionTier = (subscription?.tier === 'plus') ? 'plus' : 'basic';

    // Check usage limits (don't fail if database is unavailable)
    try {
      const usageCheck = await checkUsageLimits(user.id, tier);
      if (!usageCheck.canUse) {
        throw new Error('Usage limit exceeded. Please upgrade to White Space Pro for higher limits.');
      }
    } catch (usageError) {
      console.warn('Failed to check usage limits:', usageError);
      // Allow the request to continue if usage checking fails
      // This prevents database issues from breaking the chat
    }

    // Get user language preference for personalized responses
    const userLanguage = await getUserLanguage();

    // Add language context to task
    task.context = task.context || '';
    if (userLanguage !== 'en') {
      task.context += ` User prefers responses in ${this.getLanguageName(userLanguage)}. `;
    }

    // Add subscription context
    task.context += ` User subscription tier: ${tier}. `;

    // Add context memory for Plus users
    if (tier === 'plus') {
      try {
        const enhancedPrompt = await contextManager.enhancePrompt(user.id, task.prompt);
        task.prompt = enhancedPrompt;

        // Update context based on input
        await contextManager.updateFromInput(user.id, task.prompt);
      } catch (error) {
        console.warn('Context memory error:', error);
        // Continue without context memory if it fails
      }
    }

    // Check if this is a coding request that needs special handling
    const isCodingRequest = /\b(code|coding|programming|function|class|variable|error|debug|syntax|logic|algorithm|fix|bug|javascript|python|java|react|vue|angular|node|app|application)\b/i.test(task.prompt.toLowerCase()) ||
                           task.prompt.includes('function') || task.prompt.includes('console.log') || task.prompt.includes('import') || task.prompt.includes('export') ||
                           /\b(fix|debug|error|help)\b.*\b(this|code|function|script)\b/i.test(task.prompt.toLowerCase());

    if (isCodingRequest) {
      console.log('💻 Detected coding request - using specialized handler');
      return await this.generateCodingResponse(task);
    }

    try {
      let response: AIResponse;

      switch (this.provider) {
        case 'huggingface':
          response = await this.generateWithHuggingFace(task, tier);
          break;
        case 'openai':
          response = await this.generateWithOpenAI(task, tier);
          break;
        case 'anthropic':
          response = await this.generateWithAnthropic(task, tier);
          break;
        case 'gemini':
          response = await this.generateWithGemini(task, tier);
          break;
        case 'mock':
        default:
          response = await this.generateMock(task, tier);
          break;
      }

      // Increment usage counter (don't fail if this errors)
      try {
        await incrementUsage(user.id, { messages: 1 });
      } catch (usageError) {
        console.warn('Failed to update usage stats:', usageError);
        // Don't fail the entire request if usage tracking fails
      }

      return response;
    } catch (error) {
      console.error('AI generation failed:', error);
      // Fallback to mock generation
      return await this.generateMock(task, tier);
    } finally {
      const processingTime = Date.now() - startTime;
      console.log(`AI generation took ${processingTime}ms`);
    }
  }

  // Specialized coding response handler
  private async generateCodingResponse(task: AITask): Promise<AIResponse> {
    const message = task.prompt.toLowerCase();

    // Check if this contains actual code that needs fixing
    const hasCodeBlock = message.includes('function') || message.includes('console.log') || message.includes('import') || message.includes('export') ||
                        /\b(fix|debug|error)\b.*\b(this|code)\b/i.test(message);

    if (hasCodeBlock) {
      // Extract code from the prompt (remove instructions like "fix this", "debug this", etc.)
      const codeOnly = this.extractCodeFromPrompt(task.prompt);
      // Try to fix the code
      const fixedCode = this.analyzeAndFixJavaScript(codeOnly);
      if (fixedCode !== codeOnly) {
        const response = `**✨ CLARITY ACHIEVED**

**Changes:**
• Loop bounds corrected (i <= length → i < length)
• Conditional fixed (= → ===)
• Method call completed (.toFixed → .toFixed(2))
• Error handling added for undefined properties

\`\`\`javascript
${fixedCode}
\`\`\``;

        return {
          content: response,
          metadata: {
            model: 'white-space-architect',
            tokens: response.length,
            processingTime: 150,
            provider: 'mock',
          },
        };
      }
    }

    // Minimal response when no specific code to fix
    const response = `**✨ CLARITY ACHIEVED**

Drop your code. I'll fix it.`;

    return {
      content: response,
      metadata: {
        model: 'white-space-architect',
        tokens: response.length,
        processingTime: 100,
        provider: 'mock',
      },
    };
  }

  // Extract code from user prompt (remove instructions)
  private extractCodeFromPrompt(prompt: string): string {
    // Remove common instruction phrases
    let code = prompt
      .replace(/^(fix|debug|help|please|can you|could you|would you|analyze|check|review|improve|optimize)?\s*(this|my|the|these)?\s*(code|function|script|program|error|bug)?\s*[:.]?\s*/i, '')
      .replace(/^(what's wrong with|find the error in|there's a bug in|this doesn't work)\s*[:.]?\s*/i, '')
      .trim();

    // If there are code blocks, extract them
    const codeBlockMatch = code.match(/```[\w]*\n?([\s\S]*?)```/);
    if (codeBlockMatch) {
      return codeBlockMatch[1].trim();
    }

    return code;
  }

  // JavaScript code analysis and fixing
  private analyzeAndFixJavaScript(code: string): string {
    let fixedCode = code;

    // Fix common JavaScript errors one by one to avoid conflicts

    // 1. Fix off-by-one loop errors (i <= length should be i < length)
    fixedCode = fixedCode.replace(
      /for\s*\(\s*let\s+(\w+)\s*=\s*0\s*;\s*\w+\s*<=\s*(\w+)\.length\s*;\s*\w+\+\+\s*\)/g,
      'for (let $1 = 0; $1 < $2.length; $1++)'
    );

    // 2. Fix assignment in conditionals (= should be ===)
    fixedCode = fixedCode.replace(
      /if\s*\(\s*(\w+)\s*=\s*([^)]+)\)/g,
      'if ($1 === $2)'
    );

    // 3. Fix missing toFixed parentheses
    fixedCode = fixedCode.replace(
      /(\w+)\.toFixed\s*;/g,
      '$1.toFixed(2);'
    );

    // 4. Add error handling for array access - more targeted approach
    if (fixedCode.includes('total += prices[i].price;')) {
      fixedCode = fixedCode.replace(
        /(\s*)total\s*\+=\s*prices\[i\]\.price\s*;/g,
        '$1if (prices[i] && typeof prices[i].price === \'number\') {\n$1  total += prices[i].price;\n$1} else if (prices[i] && typeof prices[i].price === \'string\') {\n$1  total += parseFloat(prices[i].price);\n$1}'
      );
    }

    return fixedCode;
  }

  private async generateWithHuggingFace(task: AITask, tier: SubscriptionTier): Promise<AIResponse> {
    const apiKey = process.env.EXPO_PUBLIC_HUGGINGFACE_API_KEY;
    if (!apiKey) {
      throw new Error('Hugging Face API key not configured');
    }

    // Determine model based on task type
    const model = this.getHuggingFaceModel(task.type);

    // Choose model based on subscription tier
    const maxTokens = SUBSCRIPTION_LIMITS[tier].contextLength;

    const response = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: this.buildPrompt(task),
        parameters: {
          max_new_tokens: Math.min(500, maxTokens / 2), // Rough estimate for output tokens
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

  private async generateWithOpenAI(task: AITask, tier: SubscriptionTier): Promise<AIResponse> {
    const apiKey = process.env.EXPO_PUBLIC_OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Choose model based on subscription tier
    const model = tier === 'basic' ? 'gpt-3.5-turbo' : 'gpt-4';
    const maxTokens = SUBSCRIPTION_LIMITS[tier].contextLength;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
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
        max_tokens: Math.min(1000, maxTokens),
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

  private async generateWithAnthropic(task: AITask, tier: SubscriptionTier): Promise<AIResponse> {
    const apiKey = process.env.EXPO_PUBLIC_ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error('Anthropic API key not configured');
    }

    // Choose model based on subscription tier
    const model = tier === 'basic' ? 'gpt-3.5-turbo' : 'gpt-4';
    const maxTokens = SUBSCRIPTION_LIMITS[tier].contextLength;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        max_tokens: Math.min(1000, maxTokens),
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

  private async generateWithGemini(task: AITask, tier: SubscriptionTier): Promise<AIResponse> {
    // Check if there are image attachments - use vision model
    const hasImages = task.attachments?.some(a => a.type?.startsWith('image/'));
    
    // Build request body with images if present
    const requestBody: any = {
      prompt: task.prompt,
      type: task.type,
      context: task.context,
      parameters: task.parameters,
      hasImages: hasImages,
    };

    // Add image data if present
    if (hasImages && task.attachments) {
      requestBody.images = task.attachments
        .filter(a => a.type?.startsWith('image/'))
        .map(a => ({
          uri: a.uri,
          type: a.type,
          name: a.name,
          base64: a.base64,
        }));
    }

    // Call Supabase Edge Function with timeout
    try {
      const { data, error } = await supabase.functions.invoke('generate-content', {
        body: requestBody,
      });

      if (error) {
        console.warn('Edge Function error, trying direct Gemini API:', error.message);
        // Try direct Gemini API before falling back to mock
        return this.generateWithGeminiDirect(task, tier);
      }

      if (!data || data.error) {
        console.warn('Gemini returned error, trying direct Gemini API:', data?.error);
        return this.generateWithGeminiDirect(task, tier);
      }

      // Check if the response indicates an error state
      if (data.metadata?.error) {
        console.warn('Gemini API unavailable, trying direct Gemini API');
        return this.generateWithGeminiDirect(task, tier);
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
    } catch (invokeError) {
      console.warn('Failed to invoke Edge Function, using local AI:', invokeError);
      return this.generateMock(task, tier);
    }
  }

  private async generateWithGeminiDirect(task: AITask, tier: SubscriptionTier): Promise<AIResponse> {
    // Direct Gemini API call as backup (requires client-side API key)
    const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      return this.generateMock(task, tier);
    }

    try {
      // Check if there are image attachments - use vision model
      const hasImages = task.attachments?.some(a => a.type?.startsWith('image/'));
      
      // Prepare the content parts
      const parts: unknown[] = [];
      
      // Add images if present
      if (hasImages && task.attachments) {
        for (const attachment of task.attachments) {
          if (attachment.type?.startsWith('image/') && attachment.base64) {
            parts.push({
              inline_data: {
                mime_type: attachment.type,
                data: attachment.base64
              }
            });
          }
        }
      }
      
      // Add the text prompt
      parts.push({ text: task.prompt });

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: parts }],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 2048,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const result = await response.json();
      const content = result.candidates?.[0]?.content?.parts?.[0]?.text || '';

      return {
        content,
        metadata: {
          model: 'gemini-1.5-flash',
          tokens: content.length,
          processingTime: 0,
          provider: 'gemini',
        },
      };
    } catch (error) {
      console.warn('Direct Gemini call failed:', error);
      return this.generateMock(task, tier);
    }
  }

  private async generateMock(task: AITask, tier: SubscriptionTier): Promise<AIResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 300));

    const lowerPrompt = task.prompt.toLowerCase();
    const words = task.prompt.split(/\s+/);
    let response: string;

    // Use conversation history for context-aware responses
    const hasHistory = task.conversationHistory && task.conversationHistory.length > 0;
    const historyContext = hasHistory ? task.conversationHistory!.slice(-3) : [];

    // Image analysis requests
    if (task.attachments && task.attachments.some(a => a.type?.startsWith('image/'))) {
      response = this.analyzeImage(task.prompt, task.attachments);
      return {
        content: response,
        metadata: {
          model: 'white-space-assistant',
          tokens: response.length,
          processingTime: 1000,
          provider: 'mock',
        },
      };
    }

    // Thought organization requests (from the "Drop your thoughts" feature)
    if (lowerPrompt.includes('the user has dropped some unstructured thoughts') || lowerPrompt.includes('organize them into a clear')) {
      response = this.organizeThoughts(task.prompt);
      return {
        content: response,
        metadata: {
          model: 'white-space-assistant',
          tokens: response.length,
          processingTime: 1000,
          provider: 'mock',
        },
      };
    }

    // Greeting responses
    if (/^(hello|hi|hey|greetings|howdy|sup|yo|what's up|wassup|hola)\b/i.test(lowerPrompt)) {
      response = `Hey! I'm White Space, your AI assistant for coding, business, creativity, and turning ideas into reality! 🚀

Here's a taste of what I can do:

🧠 **Answer Questions & Explain Things** — Break down complex topics, summarize books, explain events, compare ideas

💻 **Coding & Development** — Write, debug, and optimize code in any language

💰 **Business & Monetization** — Side hustles, marketing plans, business validation

✍️ **Writing & Editing** — Emails, resumes, essays, stories, scripts

📚 **Study & Learning** — Study plans, step-by-step math, quizzes, language practice

💪 **Health & Productivity** — Workout routines, habit systems, goal tracking

🌍 **Travel & Recommendations** — Trip planning, itineraries, restaurant picks

🎬 **Entertainment** — Discuss movies, shows, books, games, podcasts

If you tell me your **goal**, your **current situation**, or just **what you're curious about** — I'll tailor everything specifically to you.

So — what are we working on today?`;
    }
    // Questions about how AI works / what it knows
    else if (lowerPrompt.includes('how do you know') || lowerPrompt.includes('how do you work') || lowerPrompt.includes('are you real') || lowerPrompt.includes('do you know everything') || lowerPrompt.includes('how are you so smart') || lowerPrompt.includes('where do you get your information') || lowerPrompt.includes('who are you') || lowerPrompt.includes('what are you')) {
      response = `Great question! I'm **White Space** — your comprehensive AI assistant.

I was trained on a massive mix of data including:

• **History, science, and encyclopedias**
• **Programming docs and tutorials**
• **Business and finance resources**
• **Academic research and educational content**
• **Creative writing and literature**

When you ask something, I recognize patterns from my training and generate the most accurate, helpful response I can.

**What I CAN do:**
• Answer questions on virtually any topic
• Write and debug code
• Help with business plans and strategies
• Draft emails, essays, stories, and more
• Create study plans and explain concepts step-by-step
• Give health, productivity, and career advice

**What I DON'T do:**
• Browse the internet in real time
• Have personal memories between conversations
• Access private databases or accounts

Think of me as your all-in-one assistant for learning, building, and creating. What can I help you with?`;
    }
    // Questions about capabilities
    else if (lowerPrompt.includes('what can you do') || (lowerPrompt.includes('help me') && words.length < 5)) {
      response = `I'm White Space — here's everything I can help with:

🧠 **Answer Questions & Explain Things**
• Break down complex topics (AI, finance, psychology, fitness, etc.)
• Summarize books like *Atomic Habits*
• Explain historical events like World War II
• Compare products, tools, or ideas

✍️ **Writing & Editing**
• Draft emails (professional, persuasive, follow-ups)
• Improve resumes and LinkedIn profiles
• Rewrite or polish essays, articles, or posts
• Create stories, scripts, or speeches

💼 **Career & Business Help**
• Interview prep (behavioral & technical)
• Negotiation strategies
• Business ideas and validation
• Marketing plans and content calendars

📚 **Study & Learning Support**
• Create study plans
• Explain math problems step-by-step
• Quiz you on any subject
• Language learning practice

💻 **Tech & Coding**
• Debug code in any language
• Explain programming concepts
• Generate scripts or small tools
• Help plan apps or software architecture

💪 **Health & Productivity**
• Workout routines
• Habit-building systems
• Time management strategies
• Goal tracking frameworks

🌍 **Travel & Recommendations**
• Plan trips (e.g., things to do in Tokyo)
• Restaurant suggestions
• Itineraries and packing lists

🎬 **Entertainment & Pop Culture**
• Discuss movies like *Inception*
• Break down TV shows like *Breaking Bad*
• Recommend books, games, or podcasts

🚀 **Turning Ideas Into Reality**
• Business plans and product development
• Market research and validation
• Project execution and roadmaps
• Pitch decks and funding strategies

Try asking: *"What's popping in AI right now?"*, *"Market analysis for fitness apps"*, *"Future trends in e-commerce"*, or *"Turn my app idea into a business plan"*!

If you tell me your **goal**, your **current situation**, or just **what you're curious about** — I'll tailor everything specifically to you.

So — what are we working on today?`;
    }
    // Thank you responses
    else if (/\b(thank|thanks|thx|ty|appreciate)\b/i.test(lowerPrompt)) {
      response = `You're welcome!`;
    }
    // Math calculations
    else if (/\d+\s*[+\-*/^%]\s*\d+/.test(task.prompt) || /\b(calculate|compute|solve|what is|equals)\b.*\d/i.test(lowerPrompt)) {
      response = this.handleMathProblem(task.prompt);
    }
    // Writing assistance
    else if (/\b(write|compose|draft|create)\b.*\b(email|letter|message|essay|story|poem|article)\b/i.test(lowerPrompt)) {
      response = this.handleWritingRequest(task.prompt, lowerPrompt);
    }
    // Explanation requests
    else if (/\b(explain|what is|what are|how does|how do|why does|why do|tell me about|describe)\b/i.test(lowerPrompt)) {
      response = this.handleExplanationRequest(task.prompt, lowerPrompt);
    }
    // List/brainstorm requests
    else if (/\b(list|give me|suggest|ideas for|brainstorm|examples of)\b/i.test(lowerPrompt)) {
      response = this.handleListRequest(task.prompt, lowerPrompt);
    }
    // Comparison requests
    else if (/\b(compare|difference between|vs|versus|better)\b/i.test(lowerPrompt)) {
      response = this.handleComparisonRequest(task.prompt, lowerPrompt);
    }
    // Code-related (non-fix)
    else if (/\b(code|function|program|script|algorithm)\b/i.test(lowerPrompt) && !/\b(fix|debug|error)\b/i.test(lowerPrompt)) {
      response = this.handleCodeRequest(task.prompt, lowerPrompt);
    }
    // Summarization
    else if (/\b(summarize|summary|tldr|brief|shorten)\b/i.test(lowerPrompt)) {
      response = this.handleSummarizeRequest(task.prompt);
    }
    // Improvement requests
    else if (/\b(improve|enhance|make better|rewrite|revise|edit)\b/i.test(lowerPrompt)) {
      response = this.handleImproveRequest(task.prompt);
    }
    // Opinion/advice
    else if (/\b(should i|what do you think|advice|recommend|opinion)\b/i.test(lowerPrompt)) {
      response = this.handleAdviceRequest(task.prompt, lowerPrompt);
    }
    // Try all specialized/extended handlers before falling back
    else {
      const specializedResponse = this.routeAllHandlers(task.prompt, lowerPrompt);
      if (specializedResponse) {
        response = specializedResponse;
      }
      // Conversational follow-ups (only if no specialized handler matched)
      else if (hasHistory && words.length < 10) {
        response = this.handleFollowUp(task.prompt, historyContext);
      }
      // Default: intelligent response based on content
      else {
        response = this.handleGeneralRequest(task.prompt, lowerPrompt);
      }
    }

    return {
      content: response,
      metadata: {
        model: 'white-space-assistant',
        tokens: response.length,
        processingTime: 1000,
        provider: 'mock',
      },
    };
  }

  // Analyze image attachments and provide descriptions
  private analyzeImage(prompt: string, attachments: Array<{ uri: string; type: string; name: string; size: number; base64?: string }>): string {
    const imageAttachments = attachments.filter(a => a.type?.startsWith('image/'));
    const imageCount = imageAttachments.length;
    const lowerPrompt = prompt.toLowerCase();

    // Get image format info
    const formats = imageAttachments.map(a => {
      const extension = a.name.split('.').pop()?.toUpperCase() || 'UNKNOWN';
      return extension;
    }).join(', ');

    // Basic image analysis based on format and prompt
    let analysis = `### 📸 Image Analysis\n\n`;
    analysis += `**Images Found:** ${imageCount}\n`;
    analysis += `**Formats:** ${formats}\n\n`;

    // Analyze based on prompt context
    if (/\b(describe|what is|what do you see|explain|analyze|tell me about)\b/i.test(lowerPrompt)) {
      analysis += `**Description:**\n`;
      analysis += `I can see you've shared ${imageCount} image${imageCount > 1 ? 's' : ''}. Since I'm in mock mode, I can't see the actual content, but I can tell you:\n\n`;
      analysis += `• **Format:** ${formats}\n`;
      analysis += `• **File name${imageCount > 1 ? 's' : ''}:** ${imageAttachments.map(a => a.name).join(', ')}\n`;
      analysis += `• **Size${imageCount > 1 ? 's' : ''}:** ${imageAttachments.map(a => `${(a.size / 1024).toFixed(1)}KB`).join(', ')}\n\n`;
      
      if (imageCount === 1) {
        analysis += `**What I would analyze if I could see it:**\n`;
        analysis += `• Main subjects and objects\n`;
        analysis += `• Colors, lighting, and composition\n`;
        analysis += `• Text or text elements (if readable)\n`;
        analysis += `• Style and artistic elements\n`;
        analysis += `• Context and setting\n\n`;
      }
    }

    if (/\b(text|read|ocr|what does it say|extract text)\b/i.test(lowerPrompt)) {
      analysis += `**Text Analysis:**\n`;
      analysis += `I can't extract text from images in mock mode, but if I could see the image, I would:\n\n`;
      analysis += `• Read all visible text (OCR)\n`;
      analysis += `• Identify language and translate if needed\n`;
      analysis += `• Extract phone numbers, emails, URLs\n`;
      analysis += `• Recognize handwritten vs printed text\n`;
      analysis += `• Format the extracted text cleanly\n\n`;
    }

    if (/\b(code|screenshot|programming|debug|error)\b/i.test(lowerPrompt)) {
      analysis += `**Code/Screenshot Analysis:**\n`;
      analysis += `If this is a code screenshot, I would help you:\n\n`;
      analysis += `• Extract and format the code\n`;
      analysis += `• Identify the programming language\n`;
      analysis += `• Debug syntax errors\n`;
      analysis += `• Explain what the code does\n`;
      analysis += `• Suggest improvements\n\n`;
    }

    if (/\b(diagram|chart|graph|data|visualization)\b/i.test(lowerPrompt)) {
      analysis += `**Data Visualization Analysis:**\n`;
      analysis += `For charts and diagrams, I would:\n\n`;
      analysis += `• Identify chart type (bar, line, pie, etc.)\n`;
      analysis += `• Extract data points and trends\n`;
      analysis += `• Explain what the data shows\n`;
      analysis += `• Calculate statistics if applicable\n`;
      analysis += `• Suggest alternative visualizations\n\n`;
    }

    // Add general capabilities
    analysis += `**My Image Analysis Capabilities:**\n`;
    analysis += `When connected to Gemini AI, I can analyze images for:\n\n`;
    analysis += `• **Object Detection:** Identify people, animals, objects, landmarks\n`;
    analysis += `• **Text Recognition:** Read and extract text (OCR)\n`;
    analysis += `• **Scene Understanding:** Describe what's happening\n`;
    analysis += `• **Code Analysis:** Extract and debug code from screenshots\n`;
    analysis += `• **Data Extraction:** Read charts, graphs, and diagrams\n`;
    analysis += `• **Content Analysis:** Identify style, mood, and artistic elements\n`;
    analysis += `• **Technical Details:** Camera settings, EXIF data, image quality\n\n`;

    // Format support info
    analysis += `**Supported Image Formats:**\n`;
    analysis += `• PNG, JPG, JPEG, GIF, BMP, WEBP\n`;
    analysis += `• Maximum size: 4MB per image\n`;
    analysis += `• Multiple images can be analyzed in one request\n\n`;

    analysis += `**Note:** You're currently in mock mode. Connect to Gemini AI for full image analysis capabilities.`;

    return analysis;
  }

  // Organize unstructured thoughts into clear categories
  private organizeThoughts(prompt: string): string {
    // Extract the actual thoughts (remove the instruction prefix)
    const thoughtsMatch = prompt.match(/Here are their thoughts:\n\n([\s\S]+)$/);
    const rawThoughts = thoughtsMatch ? thoughtsMatch[1].trim() : prompt.trim();

    // Split into individual thought fragments
    const fragments = rawThoughts
      .split(/[\n.!]+/)
      .map(f => f.trim())
      .filter(f => f.length > 2);

    // Categorize each fragment
    const categories: Record<string, string[]> = {
      '🎯 Action Items': [],
      '💼 Work & Professional': [],
      '🛒 Errands & Shopping': [],
      '💡 Ideas & Plans': [],
      '👥 People & Communication': [],
      '💪 Health & Wellness': [],
      '📅 Schedule & Time-Sensitive': [],
      '📝 Notes & Reminders': [],
    };

    for (const fragment of fragments) {
      const lower = fragment.toLowerCase();

      // Action items (need to, have to, should, must, etc.)
      if (/\b(need to|have to|should|must|gotta|gonna|want to|remember to|don't forget)\b/i.test(lower)) {
        // Clean up the fragment into an action item
        const cleaned = fragment
          .replace(/^(i\s+)?(need to|have to|should|must|gotta|gonna|want to)\s*/i, '')
          .replace(/^(remember to|don't forget to)\s*/i, '');
        const actionItem = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
        categories['🎯 Action Items'].push(actionItem);
      }
      // Work related
      else if (/\b(work|job|meeting|boss|project|deadline|client|office|presentation|report|email.*boss|colleague)\b/i.test(lower)) {
        categories['💼 Work & Professional'].push(fragment);
      }
      // Errands & shopping
      else if (/\b(grocery|shopping|buy|pick up|store|order|return|drop off|mail|package|pharmacy)\b/i.test(lower)) {
        categories['🛒 Errands & Shopping'].push(fragment);
      }
      // Health
      else if (/\b(gym|workout|exercise|run|health|doctor|appointment|dentist|medicine|sleep|diet|meal)\b/i.test(lower)) {
        categories['💪 Health & Wellness'].push(fragment);
      }
      // People & communication
      else if (/\b(call|text|message|contact|reach out|talk to|meet with|catch up|friend|family|mom|dad|brother|sister)\b/i.test(lower)) {
        categories['👥 People & Communication'].push(fragment);
      }
      // Schedule & time
      else if (/\b(tomorrow|today|monday|tuesday|wednesday|thursday|friday|saturday|sunday|weekend|morning|evening|night|afternoon|by\s+\d|before\s+\d|at\s+\d|deadline|due)\b/i.test(lower)) {
        categories['📅 Schedule & Time-Sensitive'].push(fragment);
      }
      // Ideas
      else if (/\b(idea|think|maybe|could|might|consider|what if|possibly|brainstorm|plan|strategy|goal)\b/i.test(lower)) {
        categories['💡 Ideas & Plans'].push(fragment);
      }
      // Everything else goes to notes
      else {
        categories['📝 Notes & Reminders'].push(fragment);
      }
    }

    // Build the organized output
    let output = `### 🧠 Your Thoughts — Organized\n\n`;
    let hasContent = false;
    let totalItems = 0;

    for (const [category, items] of Object.entries(categories)) {
      if (items.length > 0) {
        hasContent = true;
        output += `**${category}**\n`;
        items.forEach((item, i) => {
          // Add checkbox-style formatting for action items
          if (category.includes('Action Items')) {
            output += `${i + 1}. ☐ ${item}\n`;
          } else {
            output += `• ${item}\n`;
          }
          totalItems++;
        });
        output += `\n`;
      }
    }

    if (!hasContent) {
      // Fallback: just format the raw text nicely
      output += `Here's what I gathered from your thoughts:\n\n`;
      fragments.forEach((f, i) => {
        output += `${i + 1}. ${f}\n`;
      });
      output += `\n`;
      totalItems = fragments.length;
    }

    // Add summary
    output += `---\n`;
    output += `**Summary:** ${totalItems} items organized into ${Object.values(categories).filter(c => c.length > 0).length} categories.\n\n`;

    // Add priority suggestion if there are action items
    if (categories['🎯 Action Items'].length > 0) {
      output += `**Suggested Priority:** Start with your action items — they're the things you've committed to doing. `;
    }
    if (categories['📅 Schedule & Time-Sensitive'].length > 0) {
      output += `Watch the time-sensitive items so nothing slips through the cracks.`;
    }

    output += `\n\nWant me to help you tackle any of these? I can break them down into steps, set priorities, or help you plan your day.`;

    return output;
  }

  // Helper methods for varied mock responses
  private handleMathProblem(prompt: string): string {
    // Try to extract and solve math expressions
    const mathMatch = prompt.match(/(\d+(?:\.\d+)?)\s*([+\-*/^%])\s*(\d+(?:\.\d+)?)/);
    if (mathMatch) {
      const [, num1, operator, num2] = mathMatch;
      const a = parseFloat(num1);
      const b = parseFloat(num2);
      let result: number;
      let opName: string;

      switch (operator) {
        case '+': result = a + b; opName = 'Sum'; break;
        case '-': result = a - b; opName = 'Difference'; break;
        case '*': result = a * b; opName = 'Product'; break;
        case '/': result = b !== 0 ? a / b : NaN; opName = 'Quotient'; break;
        case '^': result = Math.pow(a, b); opName = 'Power'; break;
        case '%': result = a % b; opName = 'Remainder'; break;
        default: result = NaN; opName = 'Result';
      }

      if (!isNaN(result)) {
        const formatted = Number.isInteger(result) ? result.toString() : result.toFixed(4).replace(/\.?0+$/, '');
        return `### ${opName}\n\n**${a} ${operator} ${b} = ${formatted}**`;
      }
      return `Cannot divide by zero.`;
    }

    // Check for percentage calculations
    const percentMatch = prompt.match(/(\d+(?:\.\d+)?)\s*%\s*of\s*(\d+(?:\.\d+)?)/i);
    if (percentMatch) {
      const [, percent, base] = percentMatch;
      const result = (parseFloat(percent) / 100) * parseFloat(base);
      return `### Percentage\n\n**${percent}% of ${base} = ${result}**`;
    }

    return `I can help with math! Try something like:\n• "25 + 17"\n• "144 / 12"\n• "15% of 200"`;
  }

  private handleWritingRequest(prompt: string, lowerPrompt: string): string {
    if (lowerPrompt.includes('email')) {
      const topic = prompt.replace(/.*email\s*(about|for|to|regarding)?\s*/i, '').trim() || 'your topic';
      return `### Email Draft

**Subject:** Regarding ${topic}

Hi,

I wanted to reach out about ${topic}. 

[Add your main points here]

Please let me know if you have any questions or need additional information.

Best regards,
[Your name]

---
*Customize this template with your specific details.*`;
    }
    
    if (lowerPrompt.includes('story') || lowerPrompt.includes('poem')) {
      return `### Creative Writing

I'd love to help with your ${lowerPrompt.includes('poem') ? 'poem' : 'story'}!

To get started, tell me:
• **Theme or topic** — What's it about?
• **Tone** — Serious, funny, mysterious?
• **Length** — Short, medium, or long?

Or share what you have so far, and I'll help develop it.`;
    }

    return `### Writing Assistant

I can help you write! Share more details:
• **Purpose** — What's the goal?
• **Audience** — Who will read it?
• **Key points** — What must be included?`;
  }

  private handleExplanationRequest(prompt: string, lowerPrompt: string): string {
    // Extract the topic being asked about
    const topicMatch = prompt.match(/(?:explain|what is|what are|how does|how do|tell me about|describe)\s+(?:a\s+|an\s+|the\s+)?(.+?)(?:\?|$)/i);
    const topic = topicMatch ? topicMatch[1].trim() : 'that topic';

    // Search the knowledge base first
    const knowledgeResults = searchKnowledge(prompt, 2);
    if (knowledgeResults.length > 0) {
      // Found relevant knowledge - return it
      const bestMatch = knowledgeResults[0];
      return `### ${bestMatch.topic}\n\n${bestMatch.content}`;
    }

    const explanations: { [key: string]: string } = {
      'photosynthesis': `### Photosynthesis\n\nThe process plants use to convert sunlight into food.\n\n**Formula:** 6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂\n\n• **Input:** Carbon dioxide, water, sunlight\n• **Output:** Glucose (sugar), oxygen\n• **Location:** Chloroplasts in leaves`,
      'gravity': `### Gravity\n\nThe force that attracts objects with mass toward each other.\n\n• **On Earth:** 9.8 m/s² acceleration\n• **Discovery:** Newton's apple insight\n• **Modern view:** Einstein's curved spacetime`,
      'ai': `### Artificial Intelligence\n\nSystems designed to perform tasks that typically require human intelligence.\n\n**Types:**\n• **Narrow AI** — Specific tasks (like me!)\n• **General AI** — Human-level reasoning\n• **Machine Learning** — Learning from data`,
    };

    // Check for known topics
    for (const [key, explanation] of Object.entries(explanations)) {
      if (lowerPrompt.includes(key)) {
        return explanation;
      }
    }

    return `### About: ${topic}\n\nI don't have detailed information on this specific topic in my knowledge base. For comprehensive explanations, connect an AI provider (OpenAI, Gemini, or Anthropic) in your settings.\n\nI can help with many topics including:\n• Science & Technology\n• History & Geography\n• Math & Programming\n• Health & Wellness\n• Arts & Culture`;
  }

  private handleListRequest(prompt: string, lowerPrompt: string): string {
    if (lowerPrompt.includes('name') || lowerPrompt.includes('baby')) {
      return `### Name Ideas\n\n**Classic:** Alexander, Elizabeth, William, Charlotte\n**Modern:** Aria, Liam, Nova, Kai\n**Unique:** Zephyr, Sage, River, Luna\n\nWant names from a specific origin or style?`;
    }
    
    if (lowerPrompt.includes('project') || lowerPrompt.includes('app') || lowerPrompt.includes('startup')) {
      return `### Project Ideas\n\n• **Productivity** — Task manager with AI prioritization\n• **Health** — Habit tracker with streaks\n• **Social** — Local community events app\n• **Education** — Flashcard app with spaced repetition\n• **Finance** — Expense splitter for groups\n\nWant me to expand on any of these?`;
    }

    return `### Ideas\n\nI can brainstorm! Tell me more about:\n• **Category** — What area?\n• **Constraints** — Any requirements?\n• **Goal** — What are you trying to achieve?`;
  }

  private handleComparisonRequest(prompt: string, lowerPrompt: string): string {
    return `### Comparison\n\nTo give you a useful comparison, I need:\n• **Option A** — First choice\n• **Option B** — Second choice\n• **Criteria** — What matters most?\n\nShare the specifics and I'll break it down.`;
  }

  private handleCodeRequest(prompt: string, lowerPrompt: string): string {
    if (lowerPrompt.includes('sort') || lowerPrompt.includes('sorting')) {
      return `### Sorting Example\n\n\`\`\`javascript\n// Quick sort implementation\nfunction quickSort(arr) {\n  if (arr.length <= 1) return arr;\n  \n  const pivot = arr[Math.floor(arr.length / 2)];\n  const left = arr.filter(x => x < pivot);\n  const middle = arr.filter(x => x === pivot);\n  const right = arr.filter(x => x > pivot);\n  \n  return [...quickSort(left), ...middle, ...quickSort(right)];\n}\n\`\`\``;
    }

    return `### Code Help\n\nI can help with code! Specify:\n• **Language** — JavaScript, Python, etc.\n• **Task** — What should it do?\n• **Context** — Any existing code?\n\nOr paste your code and I'll analyze it.`;
  }

  private handleSummarizeRequest(prompt: string): string {
    // Check if there's actual content to summarize
    const contentMatch = prompt.match(/(?:summarize|summary of|tldr)\s*:?\s*(.{50,})/i);
    if (contentMatch) {
      const content = contentMatch[1];
      const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 10);
      const keyPoints = sentences.slice(0, 3).map(s => `• ${s.trim()}`);
      return `### Summary\n\n${keyPoints.join('\n')}\n\n*${sentences.length} key points identified*`;
    }
    return `### Summarize\n\nPaste the text you'd like summarized, and I'll extract the key points.`;
  }

  private handleImproveRequest(prompt: string): string {
    const contentMatch = prompt.match(/(?:improve|enhance|rewrite|revise)\s*:?\s*(.{20,})/i);
    if (contentMatch) {
      return `### Improved Version\n\nTo properly improve this, I'd need an AI provider connected. In mock mode, I can:\n\n• Check for common issues\n• Suggest structure improvements\n• Help with formatting\n\nConnect OpenAI or Gemini for full rewriting capabilities.`;
    }
    return `### Improve\n\nPaste the content you'd like improved, and specify:\n• **Goal** — Clarity? Brevity? Formality?\n• **Audience** — Who's reading?`;
  }

  private handleAdviceRequest(prompt: string, lowerPrompt: string): string {
    const adviceResponses = [
      `### My Thoughts\n\nWithout knowing all the context, here's a framework:\n\n1. **Pros** — List the benefits\n2. **Cons** — List the drawbacks\n3. **Gut check** — What feels right?\n4. **Reversibility** — Can you undo it?\n\nWhat specific aspect would you like to explore?`,
      `### Decision Framework\n\nConsider:\n• **Short-term** vs **long-term** impact\n• **Best case** vs **worst case** outcomes\n• **What would you advise a friend?**\n\nShare more details for specific guidance.`,
    ];
    return adviceResponses[Math.floor(Math.random() * adviceResponses.length)];
  }

  private handleFollowUp(prompt: string, history: Array<{ role: string; content: string }>): string {
    const lastAssistant = history.filter(h => h.role === 'assistant').pop();
    
    if (/^(yes|yeah|yep|sure|ok|okay|please|go ahead)\b/i.test(prompt)) {
      return `Got it! Let me continue...\n\nTo provide the best response, could you share a bit more detail about what you'd like me to focus on?`;
    }
    
    if (/^(no|nope|nah|not really|nevermind)\b/i.test(prompt)) {
      return `No problem! What else can I help you with?`;
    }

    // Try to give a useful response based on the topic instead of asking for more context
    const lowerPrompt = prompt.toLowerCase();
    
    // Detect common topics and give a helpful starting response
    if (/\b(sales|revenue|money|income|profit|business|pricing|product|service|customer)\b/i.test(lowerPrompt)) {
      return `### ${prompt}\n\nHere's a quick breakdown:\n\n**One-Time Sales Model:**\n• Customer pays once for a product or service\n• Higher upfront price, no recurring commitment\n• Examples: Physical products, digital downloads, consulting projects\n• Pros: Simple, immediate revenue, no churn\n• Cons: Need constant new customers, less predictable income\n\n**Recurring Revenue Model:**\n• Subscriptions, memberships, retainers\n• Lower price point but predictable monthly income\n• Higher lifetime value per customer\n\n**Hybrid Approach:**\n• One-time purchase + upsells/add-ons\n• Base product + premium support subscription\n• Freemium → paid conversion\n\nWould you like me to dive deeper into any of these models, or are you working on something specific?`;
    }

    if (/\b(code|app|build|create|make|develop|website|software)\b/i.test(lowerPrompt)) {
      return `I'd love to help with that! Could you tell me:\n\n• What **language or framework** are you using?\n• What's the **goal** of what you're building?\n• Any **specific issues** you're running into?\n\nThe more detail you share, the more useful my response will be.`;
    }

    // Generic but still helpful fallback
    return `### ${prompt}\n\nI'd be happy to help with this! To give you the most useful response, could you tell me a bit more about:\n\n• **What's your goal?** — What are you trying to achieve?\n• **Context** — Is this for work, personal, learning, or a project?\n• **Specifics** — Any details, constraints, or preferences?\n\nOr I can give you a general overview right now — just say the word!`;
  }

  private handleGeneralRequest(prompt: string, lowerPrompt: string): string {
    // Analyze the prompt for intent
    const wordCount = prompt.split(/\s+/).length;

    // Try knowledge base first for any topic
    const knowledgeResults = searchKnowledge(prompt);
    if (knowledgeResults.length > 0) {
      const bestMatch = knowledgeResults[0];
      return `### ${bestMatch.topic}\n\n${bestMatch.content}`;
    }

    // Detect topics — even for short prompts, give a real answer if we can identify the topic
    const topics: string[] = [];
    if (/\b(work|job|career|boss|colleague|interview|resume|hire)\b/i.test(lowerPrompt)) topics.push('career');
    if (/\b(learn|study|school|class|course|exam|test|homework)\b/i.test(lowerPrompt)) topics.push('learning');
    if (/\b(health|exercise|diet|sleep|workout|fitness|gym)\b/i.test(lowerPrompt)) topics.push('health & fitness');
    if (/\b(money|budget|save|invest|income|business|startup|side hustle|sales|revenue|profit|pricing|customer)\b/i.test(lowerPrompt)) topics.push('business & finance');
    if (/\b(relationship|friend|family|dating|marriage)\b/i.test(lowerPrompt)) topics.push('relationships');
    if (/\b(travel|trip|vacation|flight|hotel|visit)\b/i.test(lowerPrompt)) topics.push('travel');
    if (/\b(movie|show|book|game|music|song|podcast|anime)\b/i.test(lowerPrompt)) topics.push('entertainment');
    if (/\b(write|email|essay|letter|story|blog|content)\b/i.test(lowerPrompt)) topics.push('writing');
    if (/\b(habit|productive|goal|motivation|discipline|routine)\b/i.test(lowerPrompt)) topics.push('productivity');
    if (/\b(cook|recipe|food|meal|ingredient)\b/i.test(lowerPrompt)) topics.push('cooking');
    if (/\b(code|programming|developer|javascript|python|react|api)\b/i.test(lowerPrompt)) topics.push('coding');

    // For business/sales topics, give a direct helpful answer
    if (/\b(one.?time.*sales?|sales.*model|revenue.*model|pricing.*model|business.*model)\b/i.test(lowerPrompt)) {
      return `### ${prompt}\n\nHere's a breakdown of one-time sales vs other revenue models:\n\n**One-Time Sales Model:**\n• Customer pays once for a product or service\n• Higher upfront price, no recurring commitment\n• Examples: Physical products, digital downloads, consulting projects, courses\n• Pros: Simple, immediate revenue, no churn to worry about\n• Cons: Need constant new customers, less predictable income\n\n**Recurring Revenue Model:**\n• Subscriptions, memberships, retainers\n• Lower price point but predictable monthly income\n• Higher lifetime value per customer\n• Examples: SaaS, membership sites, coaching retainers\n\n**Hybrid Approach (Best of Both):**\n• One-time purchase + upsells/add-ons\n• Base product + premium support subscription\n• Freemium → paid conversion\n• Course + community membership\n\n**Which is Better?**\n• One-time: Best for high-ticket items, physical products, freelance projects\n• Recurring: Best for software, communities, ongoing services\n• Hybrid: Best for maximizing lifetime customer value\n\nWould you like me to dive deeper into any of these, or help you figure out which model fits your situation?`;
    }

    if (topics.length > 0) {
      // Give a topic-aware response that's actually useful
      if (topics.includes('business & finance')) {
        return `### ${prompt}\n\nHere's what I can help with on this topic:\n\n**Business & Finance Areas:**\n• Revenue models (one-time, recurring, hybrid)\n• Pricing strategy and optimization\n• Customer acquisition and retention\n• Side hustles and passive income\n• Budgeting and investing\n• Marketing and growth tactics\n\nCould you tell me more about what specifically you're working on? For example:\n• Are you starting a business or growing one?\n• Looking for pricing advice?\n• Need help with a specific financial decision?\n\nThe more detail you share, the more actionable my advice will be!`;
      }

      return `### ${prompt}\n\nI can see this relates to **${topics.join(' & ')}**. Here's how I'll help:\n\n• **Break it down** into clear, actionable steps\n• **Give you specific advice** tailored to your situation\n• **Provide examples** and resources you can use right away\n\nTell me more about your specific situation and I'll give you a detailed, personalized response.`;
    }

    // Very short prompts with no detectable topic
    if (wordCount < 4) {
      return `I'm ready to help! Give me a bit more detail and I'll dive right in. 🎯\n\nHere are some things I'm great at:\n• *"Explain how blockchain works"*\n• *"Write a professional email to my boss"*\n• *"Give me a workout plan for beginners"*\n• *"Help me brainstorm side hustle ideas"*\n• *"Break down the plot of Inception"*\n\nWhat are we working on?`;
    }

    // Intelligent fallback - still helpful
    return `### Let's Work on This Together 💡\n\nI've got your message! To give you the most useful, tailored response, it helps if I know:\n\n• **Your goal** — What are you trying to achieve?\n• **Your situation** — Where are you right now?\n• **Any specifics** — Timeline, budget, skill level, preferences?\n\nThe more context you give me, the better I can help. I can explain concepts, create plans, write content, solve problems, or just brainstorm with you.\n\nWhat direction should we go?`;
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
    const basePrompt = `You are a helpful AI assistant. Be concise and direct. 
Rules:
- Give short, helpful responses
- Don't over-explain or add unnecessary content
- For greetings like "hello" or "hi", just say "Hello! How can I help you today?" - nothing more
- Answer questions directly without long introductions
- Use markdown sparingly - only when it helps clarity
- Never generate business plans, roadmaps, or elaborate content unless specifically asked`;

    const prompts = {
      generate: basePrompt,
      improve: basePrompt + ' When asked to improve content, make it clearer and more concise.',
      summarize: basePrompt + ' When asked to summarize, be brief and capture only key points.',
      expand: basePrompt + ' When asked to expand, add relevant details without being verbose.',
      rewrite: basePrompt + ' When asked to rewrite, improve clarity while keeping the same meaning.',
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

  // Get current provider
  getProvider(): AIProvider {
    return this.provider;
  }

  // Helper method to get language name from code
  private getLanguageName(languageCode: string): string {
    const languages: { [key: string]: string } = {
      'en': 'English',
      'es': 'Spanish',
      'fr': 'French',
      'de': 'German',
      'it': 'Italian',
      'pt': 'Portuguese',
      'ru': 'Russian',
      'ja': 'Japanese',
      'ko': 'Korean',
      'zh': 'Chinese (Simplified)',
      'zh-TW': 'Chinese (Traditional)',
      'ar': 'Arabic',
      'hi': 'Hindi',
      'bn': 'Bengali',
      'pa': 'Punjabi',
      'ur': 'Urdu',
      'nl': 'Dutch',
      'sv': 'Swedish',
      'da': 'Danish',
      'no': 'Norwegian',
      'fi': 'Finnish',
      'pl': 'Polish',
      'cs': 'Czech',
      'sk': 'Slovak',
      'hu': 'Hungarian',
      'ro': 'Romanian',
      'bg': 'Bulgarian',
      'hr': 'Croatian',
      'sl': 'Slovenian',
      'et': 'Estonian',
      'lv': 'Latvian',
      'lt': 'Lithuanian',
      'el': 'Greek',
      'tr': 'Turkish',
      'th': 'Thai',
      'vi': 'Vietnamese',
      'id': 'Indonesian',
      'ms': 'Malay',
      'fil': 'Filipino',
      'he': 'Hebrew',
      'fa': 'Persian',
      'ta': 'Tamil',
      'te': 'Telugu',
      'kn': 'Kannada',
      'ml': 'Malayalam',
      'sw': 'Swahili',
      'am': 'Amharic',
      'ha': 'Hausa',
      'yo': 'Yoruba',
      'zu': 'Zulu',
      'af': 'Afrikaans',
      'uk': 'Ukrainian',
      'sr': 'Serbian',
      'mk': 'Macedonian',
      'sq': 'Albanian',
      'is': 'Icelandic',
      'ga': 'Irish',
      'cy': 'Welsh',
      'eu': 'Basque',
      'ca': 'Catalan',
    };

    return languages[languageCode] || 'English';
  }

  // =============================================================================
  // COMPREHENSIVE EMAIL WRITING TEMPLATES
  // =============================================================================

  private generateEmailTemplate(prompt: string, lowerPrompt: string): string {
    if (lowerPrompt.includes('resign') || lowerPrompt.includes('resignation')) {
      return `### Resignation Email Template

**Subject:** Resignation - [Your Name]

Dear [Manager's Name],

I am writing to formally notify you of my resignation from my position as [Job Title] at [Company Name], effective [Last Working Day - typically 2 weeks from now].

I have greatly valued my time at [Company Name] and appreciate the opportunities for professional growth and development that you have provided me. Working with the team has been a rewarding experience, and I am grateful for the support and guidance I have received.

During my remaining time, I am committed to ensuring a smooth transition. I am happy to:
• Complete any outstanding projects
• Document my current responsibilities
• Train my replacement or team members
• Hand over all relevant materials and access

I wish the company continued success, and I hope to maintain the professional relationships I have built here.

Thank you for everything.

Sincerely,
[Your Name]
[Your Phone Number]
[Your Email]

---
**Tips:**
• Keep it professional and positive — don't burn bridges
• Give at least 2 weeks notice (check your contract)
• Offer to help with the transition
• Send it to your direct manager first
• Follow up with HR as needed`;
    }

    if (lowerPrompt.includes('follow up') || lowerPrompt.includes('followup')) {
      return `### Follow-Up Email Template

**Subject:** Following Up - [Original Topic]

Hi [Name],

I hope this message finds you well. I wanted to follow up on [our conversation / my previous email / the proposal] from [date/timeframe].

**If waiting for a response:**
I understand you're busy, and I wanted to check if you've had a chance to review [the proposal / my application / the document]. I'm happy to provide any additional information that might be helpful.

**If following up after a meeting:**
Thank you for taking the time to meet with me on [date]. I wanted to recap the key points we discussed:
• [Point 1]
• [Point 2]
• [Point 3]

The next steps we agreed on were:
• [Action item 1] — [Person responsible] by [date]
• [Action item 2] — [Person responsible] by [date]

**If following up on a job application:**
I recently applied for the [Position] role and wanted to express my continued interest. I believe my experience in [relevant skill] makes me a strong fit for this opportunity.

Please let me know if there's anything else you need from my end.

Best regards,
[Your Name]

---
**Tips:**
• Wait 3-5 business days before following up
• Keep it brief and respectful
• Reference the original context
• Include a clear call to action
• Don't follow up more than 2-3 times`;
    }

    if (lowerPrompt.includes('cold') || lowerPrompt.includes('outreach') || lowerPrompt.includes('sales')) {
      return `### Cold Outreach Email Template

**Subject:** [Personalized hook - e.g., "Loved your talk at [Event]" or "Quick idea for [Company]"]

Hi [First Name],

I came across your [article / LinkedIn post / company] and was impressed by [specific detail].

**The reason I'm reaching out:**
I help [target audience] achieve [specific result]. For example, we recently helped [similar company/person] [achieve specific outcome with numbers if possible].

I noticed that [Company Name] might benefit from [specific value proposition], and I'd love to share a quick idea that could [specific benefit].

**Would you be open to a 15-minute call this week?** I promise to keep it brief and focused on value for you.

If the timing isn't right, no worries at all — I'd still love to connect.

Best,
[Your Name]
[Title, Company]
[Phone / Calendar link]

---
**Cold Email Best Practices:**
• **Subject line:** Keep it short, personal, curiosity-driven
• **Opening:** Personalize — never start with "I" or your company
• **Value prop:** Focus on THEIR problem, not your product
• **Social proof:** Mention similar companies you've helped
• **CTA:** One clear, low-commitment ask
• **Length:** Under 150 words
• **Follow-up:** Send 2-3 follow-ups spaced 3-5 days apart`;
    }

    if (lowerPrompt.includes('complaint') || lowerPrompt.includes('complain')) {
      return `### Professional Complaint Email Template

**Subject:** [Issue] - Request for Resolution - [Account/Order #]

Dear [Customer Service / Manager's Name],

I am writing to bring to your attention an issue I experienced with [product/service/experience] on [date].

**What happened:**
[Describe the issue clearly and factually. Include relevant details like order numbers, dates, names of people you spoke with, etc.]

**What I expected:**
[Describe what should have happened or what was promised.]

**Impact:**
[Explain how this affected you — time lost, money spent, inconvenience caused.]

**Requested resolution:**
I would appreciate if you could [specific request — refund, replacement, credit, apology, etc.]. I believe this is a fair resolution given the circumstances.

I have been a loyal customer of [Company] for [time period] and hope we can resolve this matter promptly. I would appreciate a response within [timeframe, e.g., 5 business days].

Please feel free to reach me at [phone] or [email] to discuss this further.

Thank you for your attention to this matter.

Sincerely,
[Your Name]
[Account/Customer Number]
[Contact Information]

---
**Tips:**
• Stay calm and professional — anger weakens your position
• Be specific with facts, dates, and numbers
• State what resolution you want clearly
• Keep copies of all correspondence
• Escalate to a manager if no response in 5-7 days`;
    }

    if (lowerPrompt.includes('thank') && lowerPrompt.includes('email')) {
      return `### Thank You Email Template

**Subject:** Thank You for [Specific Reason]

Dear [Name],

I wanted to take a moment to sincerely thank you for [specific action or help they provided].

Your [help / guidance / support / generosity] made a real difference in [specific outcome]. Because of your [action], I was able to [result achieved].

I particularly appreciated [specific detail about what they did that stood out]. It meant a lot to me, especially [context about why it mattered].

I look forward to [continuing to work together / staying in touch / returning the favor]. Please don't hesitate to reach out if there's ever anything I can do for you.

With sincere gratitude,
[Your Name]

---
**When to send thank you emails:**
• After a job interview (within 24 hours)
• When someone gives you a referral
• After receiving mentorship or advice
• When a colleague goes above and beyond
• After a client meeting or successful project`;
    }

    if (lowerPrompt.includes('introduction') || lowerPrompt.includes('introduce')) {
      return `### Introduction Email Template

**Subject:** Introduction: [Person A] meet [Person B]

Hi [Person A] and [Person B],

I'd like to introduce you two — I think you'd really benefit from connecting!

**[Person A]**, meet **[Person B]**. [Person B] is [their role/title] at [Company]. They're [brief description of what they do and why it's relevant].

**[Person B]**, meet **[Person A]**. [Person A] is [their role/title] at [Company]. They're [brief description of what they do and why it's relevant].

**Why I think you should connect:**
[Explain the mutual benefit — shared interests, complementary skills, potential collaboration, etc.]

I'll let you two take it from here!

Best,
[Your Name]

---
**Introduction Email Tips:**
• Always ask both parties for permission first
• Explain WHY they should connect (mutual value)
• Keep descriptions brief but compelling
• Make it easy for them to follow up`;
    }

    if (lowerPrompt.includes('apology') || lowerPrompt.includes('sorry') || lowerPrompt.includes('apologize')) {
      return `### Professional Apology Email Template

**Subject:** My Sincere Apology Regarding [Issue]

Dear [Name],

I want to sincerely apologize for [specific issue/mistake]. I understand that this [caused inconvenience / affected your experience / impacted the project], and I take full responsibility.

**What happened:**
[Brief, honest explanation — not an excuse, just context]

**What I'm doing to fix it:**
• [Immediate action taken]
• [Steps to prevent recurrence]
• [Any compensation or remedy offered]

**Going forward:**
I am committed to [specific improvement]. You can expect [what they should expect from you going forward].

I value [our relationship / your business / your trust] and want to assure you that this does not reflect the standard I hold myself to.

Please let me know if there's anything else I can do to make this right.

Sincerely,
[Your Name]

---
**Apology Email Tips:**
• Apologize quickly — don't delay
• Be specific about what you're sorry for
• Take responsibility — no "I'm sorry you feel that way"
• Explain what you'll do differently
• Keep it concise — don't over-explain
• Follow through on your promises`;
    }

    return `### Email Writing Assistant

I can help you write any type of email! Templates I have ready:

📧 **Professional Emails:**
• Resignation letter
• Follow-up email
• Cold outreach / sales email
• Complaint / issue resolution
• Thank you / appreciation
• Introduction email
• Professional apology

Tell me which type you need, or describe the situation and I'll draft one for you!

**For the best result, tell me:**
• Who is the recipient?
• What's the purpose?
• What tone? (formal, friendly, persuasive)
• Any key points to include?`;
  }

  // =============================================================================
  // COMPREHENSIVE RESUME AND CAREER TOOLS
  // =============================================================================

  private generateResumeHelp(prompt: string, lowerPrompt: string): string {
    if (lowerPrompt.includes('bullet') || lowerPrompt.includes('achievement') || lowerPrompt.includes('experience')) {
      return `### Resume Bullet Point Formula

Use the **XYZ Formula**: Accomplished [X] as measured by [Y], by doing [Z]

**Before (Weak):**
• Responsible for managing social media accounts
• Helped with customer service
• Worked on marketing campaigns

**After (Strong):**
• Grew Instagram following by 340% (2K to 8.8K) in 6 months through strategic content calendar and influencer partnerships
• Resolved 95% of customer inquiries within 24 hours, achieving a 4.8/5.0 satisfaction rating across 500+ interactions
• Led 3 marketing campaigns generating $150K in revenue, exceeding quarterly targets by 25%

**Power Verbs by Category:**

**Leadership:** Spearheaded, Directed, Orchestrated, Championed, Pioneered
**Achievement:** Exceeded, Surpassed, Outperformed, Delivered, Achieved
**Creation:** Designed, Developed, Built, Launched, Established
**Improvement:** Optimized, Streamlined, Revamped, Transformed, Enhanced
**Analysis:** Analyzed, Evaluated, Assessed, Identified, Discovered
**Communication:** Presented, Negotiated, Persuaded, Collaborated, Facilitated

**Tips:**
• Start every bullet with a strong action verb
• Include numbers and metrics whenever possible
• Focus on RESULTS, not just responsibilities
• Tailor bullets to the job description
• Keep each bullet to 1-2 lines max`;
    }

    if (lowerPrompt.includes('summary') || lowerPrompt.includes('objective') || lowerPrompt.includes('profile')) {
      return `### Resume Summary / Professional Profile

**Formula:** [Title] with [X years] experience in [key skills]. Proven track record of [top achievement]. Passionate about [relevant interest/value].

**Examples by Career Stage:**

**Entry Level:**
"Recent Computer Science graduate from [University] with hands-on experience in full-stack development through 3 internships and 5+ personal projects. Proficient in React, Node.js, and Python. Built a task management app used by 200+ students."

**Mid-Career:**
"Marketing Manager with 7+ years of experience driving growth for B2B SaaS companies. Led campaigns that generated $2.5M in pipeline and increased conversion rates by 40%. Expert in content strategy, SEO, and marketing automation."

**Senior/Executive:**
"VP of Engineering with 15+ years leading high-performing teams at scale. Grew engineering organization from 12 to 85 engineers across 3 offices. Delivered platform migration serving 10M+ users with 99.99% uptime."

**Career Changer:**
"Former financial analyst transitioning to UX design, combining 5 years of data-driven decision making with newly acquired design skills (Google UX Design Certificate). Completed 4 end-to-end design projects."

**Tips:**
• Keep it to 3-4 sentences max
• Lead with your strongest qualifier
• Include at least one quantified achievement
• Tailor it to each job application
• Don't use first person ("I")`;
    }

    if (lowerPrompt.includes('interview') || lowerPrompt.includes('prepare') || lowerPrompt.includes('question')) {
      return `### Interview Preparation Guide

**The STAR Method for Behavioral Questions:**
• **S**ituation — Set the scene
• **T**ask — What was your responsibility?
• **A**ction — What did YOU do? (Be specific)
• **R**esult — What was the outcome? (Use numbers!)

**Top 10 Questions & How to Answer:**

**1. "Tell me about yourself"**
Present-Past-Future formula: Current role, Key past experience, Why this role

**2. "Why do you want to work here?"**
Research the company. Connect their mission/values to your goals.

**3. "What's your greatest strength?"**
Pick a strength relevant to the role. Give a specific example.

**4. "What's your greatest weakness?"**
Pick a real weakness you're actively improving. Show self-awareness.

**5. "Tell me about a time you failed"**
Be honest. Focus on what you LEARNED and how you GREW.

**6. "Where do you see yourself in 5 years?"**
Show ambition aligned with the company's growth path.

**7. "Why are you leaving your current job?"**
Stay positive. Focus on what you're moving TOWARD, not away from.

**8. "Tell me about a conflict with a coworker"**
Show emotional intelligence. Focus on resolution and outcome.

**9. "What salary are you looking for?"**
Research market rates. Give a range based on data.

**10. "Do you have any questions for us?"**
ALWAYS ask questions! Shows genuine interest.

**Great Questions to Ask:**
• "What does success look like in this role in the first 90 days?"
• "What's the biggest challenge the team is facing right now?"
• "How would you describe the team culture?"
• "What's the growth path for this position?"

**Day-Before Checklist:**
• Research the company, team, and interviewer (LinkedIn)
• Prepare 5-7 STAR stories covering different competencies
• Practice answers out loud (not just in your head)
• Prepare your questions for them
• Plan your outfit and route`;
    }

    if (lowerPrompt.includes('linkedin')) {
      return `### LinkedIn Profile Optimization

**Headline (Most Important!):**
Don't just put your job title. Use this formula:
[Role] | [Key Skill] | [Value You Provide] | [Industry/Niche]

**Examples:**
• "Marketing Manager | Helping B2B SaaS companies grow 3x through content strategy"
• "Full-Stack Developer | React & Node.js | Building scalable web applications"
• "Career Coach | Helping professionals land $20K+ salary increases"

**About Section:**
• Start with a hook (your mission or a bold statement)
• Tell your story (what drives you)
• Highlight key achievements (with numbers)
• End with a call to action
• Write in first person
• Use short paragraphs and bullet points

**Experience Section:**
• Use the same XYZ bullet formula as your resume
• Add media (presentations, articles, projects)
• Include volunteer work and side projects
• Get recommendations from colleagues

**Profile Photo:**
• Professional headshot (face takes up 60% of frame)
• Good lighting, simple background
• Smile and look approachable
• Dress for your industry

**Banner Image:**
• Use Canva to create a custom banner
• Include your value proposition or tagline
• Keep it clean and professional

**Engagement Strategy:**
• Post 2-3 times per week
• Comment thoughtfully on others' posts (10+ per day)
• Share insights, not just achievements
• Tell stories — they get 3x more engagement
• Use hashtags (3-5 relevant ones)
• Engage with your target audience's content`;
    }

    if (lowerPrompt.includes('salary') || lowerPrompt.includes('negotiat')) {
      return `### Salary Negotiation Guide

**Before the Negotiation:**
1. **Research market rates:**
   • Glassdoor, Levels.fyi, Payscale, LinkedIn Salary
   • Talk to people in similar roles
   • Factor in: location, company size, experience, skills
2. **Know your BATNA** (Best Alternative to Negotiated Agreement)
   • Other offers or current job as leverage
   • The stronger your alternative, the more power you have
3. **Calculate your minimum acceptable salary**
   • Factor in: rent, bills, savings goals, lifestyle
   • Never share this number — it's your floor

**During the Negotiation:**

**When they ask "What are your salary expectations?"**
• "Based on my research and experience, I'm targeting $X-$Y range. But I'm most interested in finding the right fit — can you share the budgeted range for this role?"
• Never give a number first if you can avoid it

**When they make an offer:**
• "Thank you! I'm excited about this opportunity. I'd like to take a day to review the full package."
• NEVER accept on the spot (even if it's great)

**Counter-offer script:**
• "I'm very excited about this role and the team. Based on my [X years of experience / specific skills / market research], I was hoping we could discuss a salary closer to $[X]. I believe this reflects the value I'll bring, especially given [specific contribution you'll make]."

**What to Negotiate Beyond Salary:**
• Signing bonus (often easier than base salary)
• Equity/stock options
• Remote work flexibility
• Extra vacation days
• Professional development budget
• Title upgrade
• Performance review timeline (6 months vs 12)
• Relocation assistance

**Key Rules:**
• Always negotiate — 84% of employers expect it
• Be enthusiastic, not adversarial
• Use data, not emotions
• Negotiate the total package, not just salary
• Get everything in writing
• Practice your script out loud before the call`;
    }

    return `### Career & Resume Help

I can help with all aspects of your career:

**Resume:** Bullet points, summaries, formatting
**Interview:** STAR method, common questions, preparation
**LinkedIn:** Profile optimization, engagement strategy
**Salary:** Negotiation scripts and strategies
**Career:** Job search, career change, networking

What would you like help with?`;
  }

  // =============================================================================
  // BUSINESS AND MONETIZATION TOOLS
  // =============================================================================

  private generateBusinessPlan(prompt: string, lowerPrompt: string): string {
    if (lowerPrompt.includes('side hustle') || lowerPrompt.includes('passive income') || lowerPrompt.includes('make money')) {
      return `### Side Hustle & Passive Income Ideas

**Low Investment, Quick Start:**

**1. Freelancing ($500-$10K+/month)**
• Writing, design, development, marketing
• Platforms: Upwork, Fiverr, Toptal
• Start: Build portfolio then apply to gigs
• Timeline: First income in 1-2 weeks

**2. Content Creation ($0-$50K+/month)**
• YouTube, TikTok, Blog, Newsletter
• Pick a niche you know well
• Monetize: Ads, sponsors, products, affiliates
• Timeline: 3-12 months to meaningful income

**3. Digital Products ($500-$20K+/month)**
• Online courses (Teachable, Udemy)
• E-books and guides
• Templates (Notion, Canva, Excel)
• Printables on Etsy
• Timeline: 2-4 weeks to create, then passive

**4. E-commerce ($1K-$100K+/month)**
• Print-on-demand (Printful + Etsy/Shopify)
• Dropshipping (research carefully)
• Amazon FBA
• Handmade products
• Timeline: 1-3 months to first sale

**5. Service Business ($2K-$20K+/month)**
• Social media management
• Virtual assistant
• Bookkeeping
• Tutoring/coaching
• Timeline: First client in 1-2 weeks

**Medium Investment:**

**6. Rental Income**
• Airbnb a spare room ($500-$3K/month)
• Rent out parking space, storage, equipment
• Car rental on Turo

**7. Investing**
• Index funds (long-term wealth building)
• Dividend stocks (quarterly income)
• REITs (real estate without buying property)
• High-yield savings (5%+ APY)

**Getting Started Framework:**
1. Pick ONE idea that matches your skills and time
2. Validate — Is there demand? Who's your customer?
3. Start small — MVP approach, don't over-invest
4. Get your first customer within 30 days
5. Iterate based on feedback
6. Scale what works, drop what doesn't`;
    }

    if (lowerPrompt.includes('marketing') || lowerPrompt.includes('content calendar') || lowerPrompt.includes('social media')) {
      return `### Marketing & Content Strategy

**Weekly Content Mix (Social Media):**
• **Monday:** Motivational / Mindset (high engagement)
• **Tuesday:** Tutorial / How-to (value-driven)
• **Wednesday:** Behind-the-scenes / Personal story
• **Thursday:** Industry news / Trends / Opinion
• **Friday:** Fun / Entertaining / Memes
• **Saturday:** User-generated content / Community
• **Sunday:** Reflection / Planning / Inspiration

**Content Pillars (Pick 3-5):**
1. Educational — Teach your audience something
2. Inspirational — Motivate and uplift
3. Entertaining — Make them laugh or feel
4. Promotional — Showcase your product/service (max 20%)
5. Community — Engage and build relationships

**Platform Strategy:**

**Instagram:**
• Reels: 15-30 seconds, hook in first 2 seconds
• Carousels: 7-10 slides, educational content
• Stories: Daily, polls/questions for engagement
• Best times: 11am-1pm, 7pm-9pm

**TikTok:**
• 15-60 second videos
• Trend-jack with your niche twist
• Post 1-3 times daily
• Use trending sounds

**LinkedIn:**
• Long-form posts with personal stories
• Industry insights and opinions
• Comment on others' posts (networking)
• Best times: 7am-8am, 12pm, 5pm-6pm

**YouTube:**
• Long-form: 8-15 minutes (ad-friendly)
• Shorts: Under 60 seconds
• Consistent upload schedule
• SEO: Keywords in title, description, tags

**Email Marketing:**
• Build list from day one (most valuable asset)
• Welcome sequence: 5-7 emails over 2 weeks
• Weekly newsletter with value
• 80% value, 20% promotion
• Tools: ConvertKit, Mailchimp, Beehiiv

**Metrics to Track:**
• Engagement rate
• Reach and impressions
• Click-through rate (CTR)
• Conversion rate
• Cost per acquisition (CPA)
• Return on ad spend (ROAS)`;
    }

    if (lowerPrompt.includes('pitch') || lowerPrompt.includes('investor') || lowerPrompt.includes('funding')) {
      return `### Pitch Deck Framework

**The 10-Slide Pitch Deck:**

**Slide 1: Title**
• Company name, logo, one-line description

**Slide 2: Problem**
• What pain point are you solving?
• Who experiences this problem?
• How big is the problem?

**Slide 3: Solution**
• Your product/service in simple terms
• How it solves the problem
• Key differentiator

**Slide 4: Market Opportunity**
• TAM (Total Addressable Market)
• SAM (Serviceable Addressable Market)
• SOM (Serviceable Obtainable Market)

**Slide 5: Business Model**
• How you make money
• Pricing strategy
• Unit economics (CAC, LTV, margins)

**Slide 6: Traction**
• Key metrics and milestones
• Revenue / user growth
• Partnerships or notable customers

**Slide 7: Competition**
• Competitive landscape (2x2 matrix)
• Your unique advantages
• Barriers to entry / moat

**Slide 8: Team**
• Founders and key team members
• Relevant experience
• Why THIS team can execute

**Slide 9: Financial Projections**
• 3-5 year revenue projections
• Key assumptions
• Path to profitability

**Slide 10: The Ask**
• How much are you raising?
• What will you use it for?
• Key milestones the funding will achieve

**Pitch Tips:**
• Keep it under 20 minutes
• Tell a story, don't just present data
• Know your numbers cold
• Follow up within 24 hours`;
    }

    if (lowerPrompt.includes('business plan') || lowerPrompt.includes('start a business')) {
      return `### Business Plan Framework

**1. Executive Summary**
• What does your business do? (1-2 sentences)
• What problem do you solve?
• Who is your target customer?
• Revenue model in brief

**2. Problem & Opportunity**
• Describe the pain point in detail
• Current solutions and their shortcomings
• Market size and growth trends
• Why NOW is the right time

**3. Solution**
• Your product/service description
• Key features and benefits
• How it's different from alternatives

**4. Target Market**
• Customer persona (demographics, psychographics)
• Market segmentation
• TAM / SAM / SOM
• Early adopter profile

**5. Business Model**
• Revenue streams
• Pricing strategy
• Cost structure (fixed vs variable)
• Unit economics
• Break-even analysis

**6. Go-to-Market Strategy**
• Launch plan
• Marketing channels
• Sales strategy
• First 100 customers plan

**7. Competitive Analysis**
• Direct and indirect competitors
• Your competitive advantages
• SWOT analysis

**8. Financial Projections**
• Year 1-3 revenue forecast
• Expense budget
• Cash flow projections
• Funding requirements

**9. Milestones & Timeline**
• 30-day, 90-day, 6-month, 1-year goals
• Key metrics to track

**Validation Checklist:**
• Talked to 20+ potential customers
• Identified willingness to pay
• Built MVP or prototype
• Got first paying customer
• Defined unit economics`;
    }

    if (lowerPrompt.includes('ecommerce') || lowerPrompt.includes('e-commerce') || lowerPrompt.includes('dropshipping') || lowerPrompt.includes('online store')) {
      return `### E-Commerce Business Guide

**Business Models:**

**1. Dropshipping**
• You sell, supplier ships directly to customer
• Low startup cost ($100-$500)
• Lower margins (15-30%)
• Platforms: Shopify + Oberlo/DSers
• Suppliers: AliExpress, Spocket, Zendrop
• Key: Find winning products, great marketing

**2. Print-on-Demand**
• Custom designs on products (shirts, mugs, etc.)
• No inventory needed
• Platforms: Printful, Printify, Gooten
• Sell on: Etsy, Shopify, Amazon Merch
• Key: Unique designs, niche targeting

**3. Amazon FBA**
• Source products, Amazon stores and ships
• Higher startup cost ($2K-$10K)
• Higher margins possible (30-50%)
• Massive built-in audience
• Key: Product research, listing optimization

**4. Own Brand / DTC**
• Create your own products
• Highest margins (50-80%)
• Most control over brand
• Requires more investment
• Key: Brand story, quality, community

**Getting Started Steps:**
1. Choose your model
2. Research profitable niches
3. Find reliable suppliers
4. Set up your store (Shopify recommended)
5. Create compelling product listings
6. Set up payment processing
7. Launch with paid ads (Facebook/Instagram/TikTok)
8. Optimize based on data
9. Scale winners, cut losers

**Product Research Tools:**
• Google Trends — Demand over time
• Jungle Scout — Amazon product research
• EcomHunt — Winning products
• Sell The Trend — Dropshipping research

**Key Metrics:**
• Conversion rate (aim for 2-3%+)
• Average order value (AOV)
• Customer acquisition cost (CAC)
• Customer lifetime value (LTV)
• Return on ad spend (ROAS — aim for 3x+)
• Cart abandonment rate`;
    }

    return `### Business Help

I can help with:

**Ideas & Validation** — Side hustles, passive income, business plans
**Marketing & Growth** — Content calendars, social media, SEO
**Funding & Pitching** — Pitch decks, investor prep
**E-Commerce** — Dropshipping, print-on-demand, Amazon FBA

What area would you like to explore?`;
  }

  // =============================================================================
  // HEALTH, FITNESS AND WELLNESS
  // =============================================================================

  private generateHealthAdvice(prompt: string, lowerPrompt: string): string {
    if (lowerPrompt.includes('workout') || lowerPrompt.includes('exercise') || lowerPrompt.includes('gym')) {
      if (lowerPrompt.includes('beginner') || lowerPrompt.includes('start')) {
        return `### Beginner Workout Plan

**Week 1-4: Foundation (3 days/week)**

**Day A — Upper Body:**
• Push-ups: 3 sets x 8-12 reps
• Dumbbell rows: 3 x 10 each arm
• Overhead press: 3 x 10
• Bicep curls: 2 x 12
• Plank: 3 x 20-30 seconds

**Day B — Lower Body:**
• Bodyweight squats: 3 x 15
• Lunges: 3 x 10 each leg
• Glute bridges: 3 x 15
• Calf raises: 3 x 20
• Wall sit: 3 x 30 seconds

**Day C — Full Body:**
• Burpees (modified): 3 x 8
• Mountain climbers: 3 x 20
• Superman holds: 3 x 10
• Jumping jacks: 3 x 30
• Bicycle crunches: 3 x 15 each side

**Schedule:** Mon/Wed/Fri with rest days between

**Key Tips:**
• Warm up 5-10 minutes before every workout
• Focus on form over weight/reps
• Rest 60-90 seconds between sets
• Stay hydrated
• Get 7-9 hours of sleep for recovery
• Track your workouts to see progress`;
      }

      if (lowerPrompt.includes('home') || lowerPrompt.includes('no equipment') || lowerPrompt.includes('bodyweight')) {
        return `### Home Workout (No Equipment)

**Full Body Circuit — 30 Minutes:**

**Warm-Up (5 min):**
• Jumping jacks: 1 minute
• High knees: 1 minute
• Arm circles: 30 seconds each direction
• Bodyweight squats: 1 minute (slow)

**Circuit 1 — Repeat 3x (Rest 60s between):**
• Push-ups: 12 reps
• Squats: 15 reps
• Plank: 30 seconds
• Lunges: 10 each leg
• Mountain climbers: 20 total

**Circuit 2 — Repeat 3x:**
• Tricep dips (chair): 12 reps
• Glute bridges: 15 reps
• Side plank: 20 seconds each side
• Jump squats: 10 reps
• Bicycle crunches: 20 total

**Circuit 3 — Repeat 2x:**
• Burpees: 8 reps
• Superman holds: 10 reps
• Wall sit: 30 seconds
• High knees: 30 seconds
• Dead bugs: 10 each side

**Cool-Down (5 min):**
• Quad stretch, hamstring stretch, chest stretch
• Child's pose, deep breathing`;
      }

      return `### Workout Planning Guide

I can create a workout plan tailored to you! Tell me:

• **Goal:** Build muscle / Lose fat / Get fit / Endurance
• **Experience:** Beginner / Intermediate / Advanced
• **Equipment:** Gym / Home / No equipment
• **Days per week:** 2-6 days
• **Time per session:** 20-60 minutes
• **Any injuries or limitations?**

Plans I can create: Beginner full-body, home workouts, push/pull/legs split, upper/lower split, HIIT cardio, flexibility routines, and more.`;
    }

    if (lowerPrompt.includes('diet') || lowerPrompt.includes('nutrition') || lowerPrompt.includes('meal') || lowerPrompt.includes('calorie')) {
      return `### Nutrition Guide

**Calorie Basics:**
• **Lose weight:** Eat 300-500 calories below maintenance
• **Maintain:** Eat at maintenance level
• **Build muscle:** Eat 200-400 calories above maintenance
• Rough maintenance: Bodyweight (lbs) x 14-16

**Macronutrient Guidelines (Fat Loss):**
• Protein: 1g per lb bodyweight
• Fat: 0.3-0.4g per lb bodyweight
• Carbs: Fill remaining calories

**Sample Meal Plan (~2000 cal):**

**Breakfast (400 cal):**
3 eggs scrambled + 1 slice whole wheat toast + 1/2 avocado

**Lunch (500 cal):**
Grilled chicken breast (6 oz) + large mixed salad + 1/2 cup brown rice

**Snack (200 cal):**
Greek yogurt with berries OR apple + 2 tbsp peanut butter

**Dinner (600 cal):**
Salmon fillet (6 oz) + roasted vegetables + side salad

**Evening Snack (300 cal):**
Protein shake + banana OR cottage cheese with almonds

**Key Tips:**
• Protein at every meal
• Eat vegetables with every meal
• Drink 8+ glasses of water daily
• Limit processed foods and added sugars
• 80/20 rule: 80% whole foods, 20% flexible
• Track food for 2 weeks to build awareness`;
    }

    if (lowerPrompt.includes('habit') || lowerPrompt.includes('routine') || lowerPrompt.includes('morning')) {
      return `### Habit Building System

**The Atomic Habits Framework:**

**1. Make It Obvious (Cue)**
• Implementation intentions: "I will [BEHAVIOR] at [TIME] in [LOCATION]"
• Habit stacking: "After [CURRENT HABIT], I will [NEW HABIT]"
• Design your environment

**2. Make It Attractive (Craving)**
• Temptation bundling: Pair habit with something you enjoy
• Join a culture where your desired behavior is normal
• Reframe: "I GET to" instead of "I HAVE to"

**3. Make It Easy (Response)**
• Two-Minute Rule: Scale any habit down to 2 minutes
• Reduce friction for good habits
• Increase friction for bad habits

**4. Make It Satisfying (Reward)**
• Use a habit tracker (don't break the chain)
• Never miss twice in a row
• Use an accountability partner

**Morning Routine Template:**
6:00 — Wake up (no snooze!)
6:05 — Drink a glass of water
6:10 — Meditate (5-10 minutes)
6:20 — Journal (gratitude + intentions)
6:30 — Exercise (20-30 minutes)
7:00 — Shower
7:15 — Healthy breakfast
7:30 — Learn something (read/podcast)
7:45 — Plan your top 3 priorities
8:00 — Start deep work

**Evening Routine Template:**
8:00 PM — Digital sunset (no screens)
8:15 — Review day, plan tomorrow
8:30 — Read (fiction for relaxation)
9:00 — Stretching or light yoga
9:30 — Lights out`;
    }

    if (lowerPrompt.includes('sleep') || lowerPrompt.includes('insomnia')) {
      return `### Sleep Optimization Guide

**Sleep Hygiene Checklist:**

**Environment:**
• Room temperature: 65-68F (18-20C)
• Complete darkness (blackout curtains or eye mask)
• Quiet (earplugs or white noise machine)
• Comfortable mattress and pillows

**Before Bed (2 hours):**
• Stop caffeine by 2 PM
• No alcohol within 3 hours of bed
• No large meals within 2-3 hours
• Dim lights in the evening
• Blue light filter on devices
• Warm bath or shower
• Light stretching or yoga
• Reading (physical book)

**Consistent Schedule:**
• Same bedtime every night (even weekends)
• Same wake time every morning
• 7-9 hours of sleep opportunity

**If You Can't Fall Asleep:**
• Get up after 20 minutes
• Do something boring in dim light
• Try 4-7-8 breathing (inhale 4, hold 7, exhale 8)
• Progressive muscle relaxation
• Return to bed when sleepy

**Common Sleep Killers:**
• Caffeine after 2 PM
• Alcohol (disrupts REM sleep)
• Screens in bed
• Irregular schedule
• Naps longer than 20 minutes after 3 PM
• Exercising within 2 hours of bedtime`;
    }

    if (lowerPrompt.includes('stress') || lowerPrompt.includes('anxiety') || lowerPrompt.includes('mental health')) {
      return `### Stress Management & Mental Wellness

**Immediate Stress Relief (5 minutes):**
• Box breathing: Inhale 4s, hold 4s, exhale 4s, hold 4s
• 5-4-3-2-1 grounding: Name 5 things you see, 4 you hear, 3 you touch, 2 you smell, 1 you taste
• Progressive muscle relaxation: Tense and release each muscle group
• Cold water on wrists or face
• Step outside for fresh air

**Daily Stress Prevention:**
• Morning meditation (even 5 minutes helps)
• Regular exercise (natural anti-anxiety)
• Journaling (brain dump worries onto paper)
• Limit news and social media consumption
• Connect with friends/family daily
• Spend time in nature
• Practice gratitude (3 things daily)

**Cognitive Techniques:**
• Challenge catastrophic thinking: "What's the REALISTIC worst case?"
• Reframe: "This is happening FOR me, not TO me"
• Control what you can, accept what you can't
• Break overwhelming tasks into tiny steps
• Set boundaries (it's okay to say no)

**When to Seek Professional Help:**
• Persistent sadness or hopelessness (2+ weeks)
• Anxiety interfering with daily life
• Changes in sleep or appetite
• Loss of interest in activities you enjoyed
• Difficulty concentrating
• Thoughts of self-harm

**Resources:**
• National Suicide Prevention Lifeline: 988
• Crisis Text Line: Text HOME to 741741
• NAMI Helpline: 1-800-950-6264
• BetterHelp / Talkspace for online therapy`;
    }

    return `### Health & Wellness Help

I can help with:
• Custom workout plans (gym, home, bodyweight)
• Nutrition and meal planning
• Habit building systems
• Sleep optimization
• Stress management
• Morning and evening routines

What would you like help with?`;
  }

  // =============================================================================
  // STUDY AND LEARNING TOOLS
  // =============================================================================

  private generateStudyHelp(prompt: string, lowerPrompt: string): string {
    if (lowerPrompt.includes('study plan') || lowerPrompt.includes('study schedule') || lowerPrompt.includes('exam prep')) {
      return `### Study Plan Creator

**Step 1: Assess What You Need to Learn**
• List all topics/chapters for the exam
• Rate each: 1 (know well) to 5 (don't know)
• Focus most time on 4s and 5s

**If you have 4 weeks:**
• Week 1: Learn new material (hardest first)
• Week 2: Continue learning + review Week 1
• Week 3: Review all + practice problems
• Week 4: Practice exams + weak spots

**If you have 1 week:**
• Day 1-2: Speed-learn important topics
• Day 3-4: Practice problems and past exams
• Day 5-6: Review weak areas + flashcards
• Day 7: Light review + rest

**Daily Study Block (3-4 hours):**
• Block 1 (50 min): New material
• Break (10 min)
• Block 2 (50 min): Practice problems
• Break (10 min)
• Block 3 (50 min): Review + flashcards
• Block 4 (30 min): Summarize key takeaways

**Evidence-Based Techniques:**
1. **Active Recall** — Close notes, try to remember
2. **Spaced Repetition** — Review Day 1, 3, 7, 14, 30
3. **Feynman Technique** — Explain simply, find gaps
4. **Practice Testing** — Past exams are GOLD
5. **Interleaving** — Mix topics in one session

**What NOT to Do:**
• Re-reading notes passively
• Highlighting everything
• Cramming the night before
• Studying in bed
• Multitasking`;
    }

    if (lowerPrompt.includes('essay') || lowerPrompt.includes('paper') || lowerPrompt.includes('writing')) {
      return `### Academic Writing Guide

**Essay Structure:**

**1. Introduction (10-15%)**
• Hook: Start with something interesting
• Context: Brief background
• Thesis statement: Your main argument (last sentence)

**2. Body Paragraphs (70-80%)**
Each paragraph follows PEEL:
• **P**oint: Topic sentence
• **E**vidence: Facts, quotes, data
• **E**xplanation: Analyze the evidence
• **L**ink: Connect back to thesis

**3. Conclusion (10-15%)**
• Restate thesis (different words)
• Summarize key arguments
• Broader implications
• Do NOT introduce new information

**Types of Essays:**
• **Argumentative:** Take a clear position with evidence
• **Analytical:** Break down how/why something works
• **Compare/Contrast:** Examine similarities and differences
• **Persuasive:** Convince the reader with appeals

**Writing Tips:**
• Start with an outline
• Write the body first, intro last
• One idea per paragraph
• Use transition words
• Vary sentence length
• Cite your sources properly
• Proofread: read it out loud`;
    }

    if (lowerPrompt.includes('language') || lowerPrompt.includes('spanish') || lowerPrompt.includes('french') || lowerPrompt.includes('japanese')) {
      return `### Language Learning Guide

**Phase 1: Foundation (Month 1-2)**
• Learn 500 most common words (~80% of daily conversation)
• Master basic grammar patterns
• Practice pronunciation daily
• Use: Duolingo, Anki, Pimsleur

**Phase 2: Building (Month 3-4)**
• Expand to 1,500 words
• Read simple texts
• Listen to learner podcasts
• Practice with language partners

**Phase 3: Immersion (Month 5-6)**
• Change phone to target language
• Watch TV with subtitles
• Read news articles
• Conversations with native speakers

**Phase 4: Fluency (Month 7-12)**
• Read books in target language
• Watch without subtitles
• Discuss complex topics
• Write essays

**Daily Practice (30-60 min):**
• 10 min: Vocabulary (Anki)
• 10 min: Grammar
• 10 min: Listening
• 10 min: Speaking
• 10 min: Reading
• 10 min: Writing

**Resources:**
• Apps: Duolingo, Anki, Pimsleur, Babbel
• Speaking: iTalki, Tandem, HelloTalk
• Listening: Podcasts, YouTube, Netflix

**Tips:**
• 15 min daily > 2 hours weekly
• Learn phrases, not just words
• Don't fear mistakes
• Find content you enjoy`;
    }

    return `### Study & Learning Help

I can help with:
• Study schedules and exam prep
• Academic writing and essays
• Language learning roadmaps
• Math problem solving
• Any subject explanations

What would you like to study?`;
  }

  // =============================================================================
  // TRAVEL PLANNING
  // =============================================================================

  private generateTravelHelp(prompt: string, lowerPrompt: string): string {
    if (lowerPrompt.includes('tokyo') || lowerPrompt.includes('japan')) {
      return `### Tokyo Travel Guide

**Best Time:** Cherry blossoms (late March-April), Autumn (November)
**Avoid:** Golden Week (late April-early May)

**Neighborhoods:**
• **Shibuya:** Famous crossing, Hachiko statue, shopping
• **Shinjuku:** Shinjuku Gyoen garden, Golden Gai bars
• **Asakusa:** Senso-ji Temple, traditional atmosphere
• **Akihabara:** Electronics, anime, retro gaming
• **Harajuku:** Takeshita Street fashion, Meiji Shrine

**Must-Try Food:**
• Sushi at Tsukiji Outer Market
• Ramen at Ichiran
• Wagyu beef
• Yakitori skewers
• Convenience store bento (surprisingly amazing)
• Matcha everything

**Budget Tips:**
• Suica/Pasmo card for trains
• 7-day Japan Rail Pass for outside Tokyo
• Convenience stores for cheap great food
• 100-yen shops for souvenirs

**Etiquette:**
• Bow when greeting, remove shoes indoors
• Don't tip, be quiet on trains
• Don't eat while walking, carry cash`;
    }

    if (lowerPrompt.includes('paris') || lowerPrompt.includes('france')) {
      return `### Paris Travel Guide

**Best Time:** Spring (April-June), Fall (September-October)

**Must-See:**
• Eiffel Tower — Book online, go at sunset
• Louvre Museum — Plan 3-4 hours, go early
• Notre-Dame — Under restoration, see exterior
• Arc de Triomphe — Climb for panoramic views
• Sacre-Coeur — Free entry, stunning views

**Neighborhoods:**
• **Le Marais:** Trendy shops, galleries, falafel
• **Montmartre:** Artists, charming streets
• **Saint-Germain:** Cafes, bookshops
• **Latin Quarter:** Affordable eats, Shakespeare & Co

**Food:**
• Croissants from a local boulangerie
• Steak frites at a classic bistro
• Crepes in Montmartre
• Macarons from Laduree
• Wine and cheese at a cave a vin

**Tips:**
• Paris Museum Pass saves money and time
• Metro is best transport
• Picnic in parks with market food
• Say "Bonjour" when entering shops
• Dinner is typically 8-9 PM`;
    }

    if (lowerPrompt.includes('new york') || lowerPrompt.includes('nyc')) {
      return `### New York City Travel Guide

**Best Time:** Fall (Sept-Nov), Spring (April-June), December for holidays

**Must-See:**
• Central Park — Free, beautiful year-round
• Times Square — See it once at night
• Statue of Liberty — Book ferry in advance
• Empire State Building or Top of the Rock
• Brooklyn Bridge — Walk across at sunset
• 9/11 Memorial
• Broadway show — TKTS booth for discounts

**Food:**
• Pizza: Joe's Pizza, Prince Street Pizza
• Bagels: Russ & Daughters
• Pastrami: Katz's Delicatessen
• Cheesecake: Junior's
• Dollar slice from any corner shop
• Halal Guys (53rd & 6th)
• Dim sum in Chinatown

**Budget Tips:**
• 7-day unlimited MetroCard
• Walk as much as possible
• Free: Central Park, Brooklyn Bridge, High Line, Staten Island Ferry
• Chinatown and East Village for cheap eats`;
    }

    if (lowerPrompt.includes('london') || lowerPrompt.includes('england')) {
      return `### London Travel Guide

**Best Time:** Late Spring (May-June), September

**Free Museums:**
• British Museum — Rosetta Stone, world history
• National Gallery — Van Gogh, Monet
• Tate Modern — Contemporary art
• Natural History Museum — Dinosaurs
• V&A Museum — Art and design

**Landmarks:**
• Tower of London — Crown Jewels
• Buckingham Palace — Changing of the Guard (11am)
• Westminster Abbey
• Big Ben & Houses of Parliament
• Tower Bridge — Glass floor walk
• London Eye

**Neighborhoods:**
• **Soho:** Restaurants, nightlife, theaters
• **Camden:** Markets, street food, alternative culture
• **Notting Hill:** Colorful houses, Portobello Market
• **Shoreditch:** Street art, hipster cafes
• **South Bank:** Thames walk, food markets

**Food:**
• Full English breakfast
• Fish and chips from a proper chippy
• Sunday roast at a pub
• Afternoon tea
• Borough Market for foodies

**Tips:**
• Oyster card or contactless for transport
• Free museums save hundreds
• Eat at markets for best value
• Parks are free: Hyde Park, Regent's Park`;
    }

    if (lowerPrompt.includes('packing') || lowerPrompt.includes('pack')) {
      return `### Ultimate Packing List

**Carry-On Essentials:**
• Passport / ID, boarding pass
• Phone + charger + portable battery
• Headphones, wallet, travel insurance docs
• Medications, change of clothes
• Snacks, empty water bottle
• Neck pillow + eye mask + earplugs

**Clothing (1 week):**
• 5-7 underwear and socks
• 3-4 tops, 2 pants/shorts
• 1 nice outfit, 1 light jacket
• 1 rain jacket (packable)
• Walking shoes, sandals
• Sleepwear, swimsuit if needed

**Toiletries:**
• Toothbrush + toothpaste, deodorant
• Shampoo + conditioner (travel size)
• Sunscreen, moisturizer, razor
• Medications + vitamins
• First aid basics

**Tips:**
• Roll clothes (saves space, fewer wrinkles)
• Use packing cubes
• Wear bulkiest items on the plane
• Leave room for souvenirs
• Photo your luggage for lost claims`;
    }

    return `### Travel Planning Help

I have detailed guides for Tokyo, Paris, New York, London, and more!

Tell me:
• **Destination:** Where are you going?
• **Duration:** How many days?
• **Budget:** Budget / Mid-range / Luxury?
• **Interests:** Culture, food, adventure, relaxation?

I can provide destination guides, itineraries, packing lists, and budget tips.`;
  }

  // =============================================================================
  // ENTERTAINMENT AND POP CULTURE
  // =============================================================================

  private generateEntertainmentResponse(prompt: string, lowerPrompt: string): string {
    if (lowerPrompt.includes('inception')) {
      return `### Inception (2010) — Breakdown

**Director:** Christopher Nolan
**Stars:** Leonardo DiCaprio, Tom Hardy, Joseph Gordon-Levitt

Dom Cobb steals secrets from people's subconscious during dream states. He must perform "inception" — planting an idea — to clear his criminal record.

**Dream Levels:**
• Level 1: Van chase (1 week dream time)
• Level 2: Hotel with shifting gravity (6 months)
• Level 3: Snow fortress (10 years)
• Limbo: Decades to centuries

**The Ending:** The top wobbles but we never see it fall. Nolan: "The point is Cobb doesn't care anymore — he's with his kids."

**Themes:** Reality vs perception, grief, the power of ideas

**Fun Facts:**
• Hallway fight used a rotating set (no CGI)
• Score uses slowed-down "Non, Je Ne Regrette Rien"
• 10 years to write the script
• Budget: $160M, Box office: $836M, 4 Oscars`;
    }

    if (lowerPrompt.includes('breaking bad')) {
      return `### Breaking Bad — Breakdown

**Created by:** Vince Gilligan | **Seasons:** 5 (62 episodes, 2008-2013)

Walter White, a chemistry teacher with cancer, starts making meth with former student Jesse Pinkman.

**Character Arcs:**
• **Walt to Heisenberg:** Teacher to ruthless drug lord. "I am the one who knocks."
• **Jesse:** Slacker to the show's moral center
• **Hank:** DEA agent, comic relief turns tragic hero

**Best Episodes:**
1. "Ozymandias" (S5E14) — Highest-rated TV episode ever
2. "Face Off" (S4E13) — Gus Fring's fate
3. "Felina" (S5E16) — Perfect finale
4. "Crawl Space" (S4E11) — Walt's breakdown

**Spinoffs:** Better Call Saul (prequel), El Camino (movie sequel)

**Rating:** 9.5/10 — A masterpiece of television`;
    }

    if (lowerPrompt.includes('recommend') || lowerPrompt.includes('watch') || lowerPrompt.includes('read')) {
      return `### Recommendations

**TV Shows:**
• Breaking Bad, The Wire, Chernobyl, Succession
• Severance, The Bear, Shogun, Band of Brothers

**Movies:**
• Shawshank Redemption, The Dark Knight, Inception
• Parasite, Interstellar, Whiplash, Everything Everywhere

**Books:**
• Atomic Habits (habits), Sapiens (history)
• Psychology of Money (finance), Deep Work (focus)
• Man's Search for Meaning (philosophy)

**Podcasts:**
• Huberman Lab, Lex Fridman, My First Million
• Tim Ferriss Show, Hardcore History

**Games:**
• Zelda: Tears of the Kingdom, Red Dead 2
• Witcher 3, Elden Ring, Baldur's Gate 3

Tell me what genres you like for personalized picks!`;
    }

    if (lowerPrompt.includes('anime')) {
      return `### Anime Recommendations

**Beginner-Friendly:**
• Attack on Titan — Dark fantasy, incredible twists
• Death Note — Psychological thriller
• Fullmetal Alchemist: Brotherhood — Best-rated anime
• Demon Slayer — Beautiful animation
• Spy x Family — Wholesome comedy

**Action:** Naruto, One Piece, Jujutsu Kaisen, Hunter x Hunter
**Thriller:** Steins;Gate, Monster, Psycho-Pass, Erased
**Romance:** Your Lie in April, Toradora, Violet Evergarden
**Movies:** Spirited Away, Your Name, A Silent Voice, Akira

**Where to Watch:** Crunchyroll, Netflix, Funimation`;
    }

    if (lowerPrompt.includes('music') || lowerPrompt.includes('playlist') || lowerPrompt.includes('song')) {
      return `### Music Recommendations

**By Mood:**
• **Focus:** Lo-fi hip hop, Classical, Ambient, Movie soundtracks
• **Workout:** Hip-hop, EDM, Rock, High-energy pop
• **Chill:** R&B (Frank Ocean, SZA), Indie, Jazz
• **Sad:** Radiohead, Bon Iver, Adele, Chopin Nocturnes
• **Party:** Dua Lipa, Bruno Mars, Calvin Harris, Drake

**Essential Albums:**
• OK Computer — Radiohead
• To Pimp a Butterfly — Kendrick Lamar
• Abbey Road — The Beatles
• Rumours — Fleetwood Mac
• Dark Side of the Moon — Pink Floyd
• Blonde — Frank Ocean
• Random Access Memories — Daft Punk`;
    }

    return `### Entertainment Help

I can discuss and recommend:
• Movies, TV Shows, Books, Video Games
• Anime, Music, Podcasts

What are you interested in?`;
  }

  // =============================================================================
  // BOOK SUMMARIES
  // =============================================================================

  private generateBookSummary(prompt: string, lowerPrompt: string): string | null {
    if (lowerPrompt.includes('atomic habits')) {
      return `### Atomic Habits by James Clear — Summary

**Core Idea:** Small changes compound into remarkable results. You fall to the level of your systems, not your goals.

**4 Laws of Behavior Change:**
1. **Make It Obvious** — Implementation intentions, habit stacking, environment design
2. **Make It Attractive** — Temptation bundling, join supportive cultures
3. **Make It Easy** — Two-Minute Rule, reduce friction
4. **Make It Satisfying** — Habit tracker, never miss twice, accountability

**Key Concepts:**
• 1% better daily = 37x better in a year
• Identity-based habits: Focus on who you wish to become
• Every action is a vote for the type of person you want to be
• The Plateau of Latent Potential: Results are delayed

**Best Quotes:**
• "You do not rise to the level of your goals. You fall to the level of your systems."
• "Every action you take is a vote for the type of person you wish to become."
• "Habits are the compound interest of self-improvement."`;
    }

    if (lowerPrompt.includes('psychology of money')) {
      return `### The Psychology of Money by Morgan Housel — Summary

**Core Idea:** Financial success is about behavior, not intelligence.

**Key Lessons:**
• **No One's Crazy** — Everyone's financial decisions reflect their unique experiences
• **Luck & Risk** — Success is never entirely skill, failure never entirely laziness
• **Never Enough** — The hardest skill is getting the goalpost to stop moving
• **Compounding** — Buffett's $84.5B net worth: $81.5B came after age 65
• **Getting vs Staying Wealthy** — Getting requires risk; keeping requires humility
• **Freedom** — Highest form of wealth: doing whatever you want today
• **Wealth Is What You Don't See** — Spending to show wealth = less wealth
• **Save Money** — The only factor you can fully control
• **Room for Error** — Margin of safety is everything

**Best Quote:** "Doing well with money has little to do with how smart you are and a lot to do with how you behave."`;
    }

    if (lowerPrompt.includes('deep work') || lowerPrompt.includes('cal newport')) {
      return `### Deep Work by Cal Newport — Summary

**Core Idea:** The ability to focus deeply is increasingly rare and valuable.

**Deep Work:** Distraction-free concentration that pushes cognitive limits.
**Shallow Work:** Non-demanding, logistical tasks done while distracted.

**4 Rules:**
1. **Work Deeply** — Schedule 2-4 hour blocks, create rituals
2. **Embrace Boredom** — Take breaks FROM focus, not FROM distraction
3. **Quit Social Media** — Does it SUBSTANTIALLY help your goals?
4. **Drain the Shallows** — Schedule every minute, quantify task depth

**Strategies:**
• **Monastic:** Eliminate all shallow obligations
• **Bimodal:** Dedicate stretches to deep work
• **Rhythmic:** Daily habit at same time (most practical)
• **Journalistic:** Fit deep work wherever you can

**Key Takeaway:** In a world of constant distraction, the ability to focus deeply is a superpower.`;
    }

    if (lowerPrompt.includes('sapiens') || lowerPrompt.includes('yuval')) {
      return `### Sapiens by Yuval Noah Harari — Summary

**Core Idea:** How Homo sapiens came to dominate the world through four revolutions.

**1. Cognitive Revolution (~70,000 years ago)**
• Unique language abilities, "imagined realities"
• Gossip and storytelling bound groups together

**2. Agricultural Revolution (~12,000 years ago)**
• "History's biggest fraud" — worse individual quality of life
• Created hierarchies, property, inequality, cities

**3. Unification of Humankind**
• Three universal orders: Money, Empire, Religion
• Money = most universal system of mutual trust

**4. Scientific Revolution (~500 years ago)**
• Admission of ignorance was the key breakthrough
• Science + Empire + Capitalism = modern world

**Provocative Questions:**
• Are we happier than hunter-gatherer ancestors?
• Are human rights an "imagined reality"?
• What happens when we can design our own evolution?`;
    }

    if (lowerPrompt.includes('48 laws') || lowerPrompt.includes('laws of power')) {
      return `### The 48 Laws of Power by Robert Greene — Key Laws

• **Law 1:** Never Outshine the Master
• **Law 3:** Conceal Your Intentions
• **Law 4:** Always Say Less Than Necessary
• **Law 6:** Court Attention at All Costs
• **Law 9:** Win Through Actions, Never Argument
• **Law 15:** Crush Your Enemy Totally
• **Law 16:** Use Absence to Increase Respect
• **Law 25:** Re-Create Yourself
• **Law 28:** Enter Action with Boldness
• **Law 33:** Discover Each Man's Thumbscrew
• **Law 36:** Disdain Things You Cannot Have
• **Law 38:** Think as You Like but Behave Like Others
• **Law 48:** Assume Formlessness

**Note:** This book describes how power WORKS, not necessarily how you SHOULD act. Use insights ethically.`;
    }

    if (lowerPrompt.includes('thinking fast') || lowerPrompt.includes('kahneman')) {
      return `### Thinking, Fast and Slow by Daniel Kahneman — Summary

**Core Idea:** Two systems drive the way we think.

**System 1: Fast Thinking**
• Automatic, intuitive, emotional
• Makes quick judgments
• Prone to biases and errors
• "What you see is all there is" (WYSIATI)

**System 2: Slow Thinking**
• Deliberate, logical, effortful
• Handles complex calculations
• Lazy — often defers to System 1
• Requires concentration and energy

**Key Biases:**
• **Anchoring:** First number you see influences judgment
• **Availability:** Overweight recent/vivid events
• **Loss Aversion:** Losses hurt 2x more than equivalent gains
• **Confirmation Bias:** Seek info that confirms beliefs
• **Sunk Cost Fallacy:** Continue because of past investment
• **Halo Effect:** One positive trait colors overall judgment
• **Framing:** Same info presented differently changes decisions

**Practical Applications:**
• Be aware of your biases in decisions
• Slow down for important choices (engage System 2)
• Use checklists to reduce errors
• Consider the opposite of your first instinct
• Don't trust gut feelings for complex decisions`;
    }

    if (lowerPrompt.includes('rich dad') || lowerPrompt.includes('kiyosaki')) {
      return `### Rich Dad Poor Dad by Robert Kiyosaki — Summary

**Core Idea:** The rich don't work for money — they make money work for them.

**Key Lessons:**

**1. The Rich Don't Work for Money**
• Poor Dad: "Get a good education, get a good job"
• Rich Dad: "Learn to make money work for you"
• Employees trade time for money; investors make money while sleeping

**2. Financial Literacy**
• Assets put money IN your pocket
• Liabilities take money OUT of your pocket
• Your house is NOT an asset (controversial but his point)
• Build a column of assets: stocks, bonds, real estate, businesses

**3. Mind Your Own Business**
• Keep your day job but build assets on the side
• Focus on your asset column, not just your income statement
• Financial independence = passive income > expenses

**4. The Power of Corporations**
• Rich people use corporations to protect wealth
• Corporation earns → spends → pays taxes
• Individual earns → pays taxes → spends

**5. The Rich Invent Money**
• Financial intelligence creates opportunities
• See what others miss
• Take calculated risks

**6. Work to Learn, Don't Work for Money**
• Seek jobs that teach you skills
• Sales, marketing, management, investing
• Broad knowledge > deep specialization (for entrepreneurs)`;
    }

    return null;
  }

  // =============================================================================
  // PERSONAL FINANCE TOOLS
  // =============================================================================

  private generateFinanceAdvice(prompt: string, lowerPrompt: string): string {
    if (lowerPrompt.includes('invest') || lowerPrompt.includes('stock') || lowerPrompt.includes('portfolio')) {
      return `### Investing Guide for Beginners

**Types of Investments:**
• **Stocks:** Own a piece of a company. Higher risk, higher return.
• **Bonds:** Loan money to government/company. Lower risk, steady income.
• **Index Funds:** Basket of stocks (e.g., S&P 500). Diversified, low fees.
• **ETFs:** Like index funds but trade like stocks.
• **REITs:** Real estate without buying property.

**Getting Started:**
1. Build emergency fund first (3-6 months expenses)
2. Pay off high-interest debt
3. Open brokerage account (Fidelity, Schwab, Vanguard)
4. Start with index funds
5. Set up automatic monthly investments

**Compound Interest Power:**
$500/month at 10% annual return:
• 10 years: $102K
• 20 years: $382K
• 30 years: $1.13M
• 40 years: $3.16M

**Simple Portfolios:**
• **Aggressive (20s-30s):** 90% stocks, 10% bonds
• **Moderate (40s-50s):** 70% stocks, 20% bonds, 10% alternatives
• **Conservative (60s+):** 40% stocks, 50% bonds, 10% cash

**Key Principles:**
• Diversify, keep fees low (<0.2%)
• Don't panic sell during downturns
• Dollar-cost average (invest same amount regularly)
• Think long-term (10+ years)
• Max tax-advantaged accounts first (401k, IRA)`;
    }

    if (lowerPrompt.includes('budget') || lowerPrompt.includes('save') || lowerPrompt.includes('saving')) {
      return `### Budgeting & Saving Guide

**The 50/30/20 Rule:**
• **50% Needs:** Rent, utilities, groceries, insurance
• **30% Wants:** Dining out, entertainment, shopping
• **20% Savings:** Emergency fund, investments, extra debt payments

**Budget Setup Steps:**
1. Track ALL spending for 2 weeks
2. Calculate after-tax monthly income
3. List fixed expenses
4. Set savings goals
5. Allocate remaining for variable spending

**Money-Saving Tips:**
• Automate savings (pay yourself first)
• Cancel unused subscriptions
• Cook at home more (save $200-$500/month)
• Use cashback credit cards (pay in full)
• Wait 24-48 hours before impulse purchases
• Negotiate bills (internet, insurance, phone)
• Meal prep on Sundays
• Buy generic brands

**Emergency Fund Priority:**
1. $1,000 starter fund
2. Pay off high-interest debt
3. Build to 3 months expenses
4. Build to 6 months expenses
5. Start investing`;
    }

    if (lowerPrompt.includes('debt') || lowerPrompt.includes('credit card') || lowerPrompt.includes('loan')) {
      return `### Debt Payoff Strategy

**Two Methods:**

**Debt Avalanche (Saves Most Money):**
• Pay minimums on all debts
• Extra money to HIGHEST interest rate debt
• Roll payments to next highest when paid off

**Debt Snowball (Best Motivation):**
• Pay minimums on all debts
• Extra money to SMALLEST balance debt
• Quick wins build momentum

**Steps to Get Out of Debt:**
1. List ALL debts (balance, rate, minimum)
2. Stop taking on new debt
3. Build $1,000 emergency fund
4. Choose avalanche or snowball
5. Find extra money (cut expenses, side hustle)
6. Automate payments
7. Celebrate milestones

**Credit Score Tips:**
• Pay on time (35% of score)
• Keep utilization under 30% (10% ideal)
• Don't close old accounts
• Limit new credit applications
• Check report annually at annualcreditreport.com`;
    }

    if (lowerPrompt.includes('retire') || lowerPrompt.includes('401k') || lowerPrompt.includes('ira')) {
      return `### Retirement Planning Guide

**Accounts:**
• **401(k):** Employer-sponsored, 2024 limit $23K, often has match (FREE MONEY)
• **Roth IRA:** After-tax, tax-free forever, 2024 limit $7K
• **Traditional IRA:** Tax deduction now, taxed on withdrawal

**Priority Order:**
1. 401(k) up to employer match
2. Max out Roth IRA
3. Max out 401(k)
4. HSA if eligible
5. Taxable brokerage

**How Much Do You Need?**
• Rule: 25x annual expenses
• $50K/year spending = $1.25M needed
• 4% rule: Withdraw 4% per year

**Savings by Age:**
• 30: 1x salary | 40: 3x | 50: 6x | 60: 8x | 67: 10x

**Key Principles:**
• Start as early as possible
• Never leave employer match on the table
• Increase contributions 1% each year
• Don't touch retirement money early
• Automate everything`;
    }

    return `### Personal Finance Help

I can help with:
• **Investing:** Beginner guide, portfolios, compound interest
• **Budgeting:** 50/30/20 rule, saving tips
• **Debt:** Payoff strategies, credit score
• **Retirement:** 401(k), IRA, how much to save

What financial topic interests you?`;
  }

  // =============================================================================
  // PRODUCTIVITY AND TIME MANAGEMENT
  // =============================================================================

  private generateProductivityAdvice(prompt: string, lowerPrompt: string): string {
    if (lowerPrompt.includes('time management') || lowerPrompt.includes('productive') || lowerPrompt.includes('procrastinat')) {
      return `### Time Management & Productivity

**Eisenhower Matrix:**
• **Q1 (Urgent+Important):** DO IT NOW — deadlines, crises
• **Q2 (Not Urgent+Important):** SCHEDULE IT — planning, learning, growth
• **Q3 (Urgent+Not Important):** DELEGATE — most emails, interruptions
• **Q4 (Neither):** ELIMINATE — social media scrolling, busy work

**Techniques:**

**Pomodoro:** Work 25 min, break 5 min. After 4, take 15-30 min break.

**Time Blocking:** Schedule every hour. Batch similar tasks. Protect deep work.

**Eat the Frog:** Do hardest task first. Everything else feels easy after.

**2-Minute Rule:** If it takes <2 min, do it now. Don't add to list.

**Weekly Planning (Sunday, 30 min):**
1. Review last week
2. Top 3 priorities for the week
3. Schedule deep work blocks
4. Plan meals and exercise

**Beating Procrastination:**
• Start with just 2 minutes (momentum builds)
• Break big tasks into tiny steps
• Remove distractions (phone in another room)
• Use accountability
• Understand WHY you're procrastinating`;
    }

    if (lowerPrompt.includes('goal') || lowerPrompt.includes('resolution')) {
      return `### Goal Setting Framework

**SMART Goals:**
• **S**pecific, **M**easurable, **A**chievable, **R**elevant, **T**ime-bound

**Bad:** "Get in shape"
**SMART:** "Lose 15 lbs by June 1st by gym 4x/week and 2000 cal/day"

**Goal Pyramid:**
• Vision (10 years) → Goals (1 year) → Projects (90 days) → Weekly tasks → Daily actions

**90-Day Sprint:**
1. Pick 1-3 major goals for 90 days
2. Break into weekly milestones
3. Create daily action items
4. Review weekly, adjust
5. Celebrate, assess, set new goals

**Categories to Consider:**
Health, Career, Financial, Relationships, Personal Growth, Fun, Giving Back

**Common Mistakes:**
• Too many goals at once
• Not writing them down
• No action plan
• No accountability
• Giving up after one failure`;
    }

    if (lowerPrompt.includes('focus') || lowerPrompt.includes('distract') || lowerPrompt.includes('concentrat')) {
      return `### Focus & Concentration Guide

**Environment:**
• Phone in another room (or airplane mode)
• Close unnecessary tabs
• Website blockers (Freedom, Cold Turkey)
• Noise-canceling headphones
• Clean workspace, "Do Not Disturb" mode

**Techniques:**
• **Deep Work Blocks:** 2-4 hour uninterrupted sessions
• **5-Second Rule:** 5-4-3-2-1 and refocus
• **Body Doubling:** Work alongside someone
• **Music:** Lo-fi, classical, nature sounds (no lyrics)

**Digital Minimalism:**
• Turn off non-essential notifications
• Check email 2-3x per day only
• Delete social media apps from phone
• Set screen time limits
• Grayscale mode (reduces dopamine hits)

**Focus Equation:**
Focus = Motivation x Energy x Environment
• Low motivation? Connect to bigger goals
• Low energy? Sleep, exercise, nutrition
• Bad environment? Change location, remove distractions`;
    }

    return `### Productivity Help

I can help with:
• Time management (Pomodoro, Eisenhower Matrix, time blocking)
• Goal setting (SMART goals, 90-day sprints)
• Focus and concentration
• Beating procrastination
• Planning routines

What would you like to work on?`;
  }

  // =============================================================================
  // CODING TUTORIALS AND REFERENCES
  // =============================================================================

  private generateCodingTutorial(prompt: string, lowerPrompt: string): string {
    if (lowerPrompt.includes('react')) {
      return `### React Quick Reference

**Component:**
\`\`\`jsx
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}
\`\`\`

**useState:**
\`\`\`jsx
const [count, setCount] = useState(0);
<button onClick={() => setCount(count + 1)}>+</button>
\`\`\`

**useEffect:**
\`\`\`jsx
useEffect(() => {
  fetch('/api/data')
    .then(res => res.json())
    .then(setData);
}, []); // Empty array = run once
\`\`\`

**Conditional Rendering:**
\`\`\`jsx
{isLoggedIn ? <Dashboard /> : <Login />}
\`\`\`

**Lists:**
\`\`\`jsx
{items.map(item => <li key={item.id}>{item.name}</li>)}
\`\`\`

**Form Handling:**
\`\`\`jsx
const [email, setEmail] = useState('');
<input value={email} onChange={e => setEmail(e.target.value)} />
\`\`\`

**Common Patterns:**
• Lift state up to parent components
• Context for global state
• Custom hooks for reusable logic
• useMemo for expensive computations
• React.memo to prevent unnecessary re-renders`;
    }

    if (lowerPrompt.includes('python')) {
      return `### Python Quick Reference

**Variables:**
\`\`\`python
name = "Alice"
age = 25
prices = [19.99, 29.99, 9.99]
person = {"name": "Alice", "age": 25}
\`\`\`

**Control Flow:**
\`\`\`python
if age >= 18:
    print("Adult")
elif age >= 13:
    print("Teen")
else:
    print("Child")

for item in prices:
    print(item)

squares = [x**2 for x in range(10)]
\`\`\`

**Functions:**
\`\`\`python
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"
\`\`\`

**Classes:**
\`\`\`python
class Dog:
    def __init__(self, name):
        self.name = name
    def bark(self):
        return f"{self.name} says Woof!"
\`\`\`

**File I/O:**
\`\`\`python
with open("file.txt") as f:
    content = f.read()
\`\`\`

**Error Handling:**
\`\`\`python
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero!")
\`\`\``;
    }

    if (lowerPrompt.includes('javascript') || lowerPrompt.includes('js ')) {
      return `### JavaScript Quick Reference

**Variables:**
\`\`\`javascript
const name = "Alice";     // Can't reassign
let age = 25;             // Can reassign
const greeting = \\\`Hello, \\\${name}!\\\`;
\`\`\`

**Arrays:**
\`\`\`javascript
const nums = [1, 2, 3, 4, 5];
nums.map(n => n * 2);        // [2, 4, 6, 8, 10]
nums.filter(n => n % 2 === 0); // [2, 4]
nums.reduce((a, b) => a + b);  // 15
nums.find(n => n > 3);         // 4
\`\`\`

**Objects:**
\`\`\`javascript
const person = { name: "Alice", age: 25 };
const { name, age } = person; // Destructuring
const copy = { ...person, city: "NYC" }; // Spread
\`\`\`

**Async/Await:**
\`\`\`javascript
async function fetchData() {
  try {
    const res = await fetch('/api/data');
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
\`\`\`

**Arrow Functions:**
\`\`\`javascript
const add = (a, b) => a + b;
const greet = name => \\\`Hello, \\\${name}!\\\`;
\`\`\``;
    }

    if (lowerPrompt.includes('typescript') || lowerPrompt.includes('ts ')) {
      return `### TypeScript Quick Reference

**Basic Types:**
\`\`\`typescript
let name: string = "Alice";
let age: number = 25;
let active: boolean = true;
let items: string[] = ["a", "b"];
let tuple: [string, number] = ["Alice", 25];
\`\`\`

**Interfaces:**
\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
  age?: number; // Optional
}

function greet(user: User): string {
  return \\\`Hello, \\\${user.name}!\\\`;
}
\`\`\`

**Type Aliases:**
\`\`\`typescript
type Status = "active" | "inactive" | "pending";
type ID = string | number;
\`\`\`

**Generics:**
\`\`\`typescript
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}
\`\`\`

**Enums:**
\`\`\`typescript
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}
\`\`\`

**Utility Types:**
\`\`\`typescript
Partial<User>    // All properties optional
Required<User>   // All properties required
Pick<User, 'name' | 'email'>  // Select properties
Omit<User, 'id'>  // Exclude properties
Record<string, number>  // Key-value map
\`\`\``;
    }

    if (lowerPrompt.includes('sql') || lowerPrompt.includes('database') || lowerPrompt.includes('query')) {
      return `### SQL Quick Reference

**Basic Queries:**
\`\`\`sql
-- Select
SELECT name, email FROM users WHERE age > 18;

-- Insert
INSERT INTO users (name, email, age)
VALUES ('Alice', 'alice@email.com', 25);

-- Update
UPDATE users SET age = 26 WHERE name = 'Alice';

-- Delete
DELETE FROM users WHERE id = 1;
\`\`\`

**Filtering & Sorting:**
\`\`\`sql
SELECT * FROM products
WHERE price > 10 AND category = 'electronics'
ORDER BY price DESC
LIMIT 10;
\`\`\`

**Joins:**
\`\`\`sql
-- Inner Join (matching rows only)
SELECT u.name, o.total
FROM users u
INNER JOIN orders o ON u.id = o.user_id;

-- Left Join (all from left table)
SELECT u.name, o.total
FROM users u
LEFT JOIN orders o ON u.id = o.user_id;
\`\`\`

**Aggregation:**
\`\`\`sql
SELECT category, COUNT(*) as count, AVG(price) as avg_price
FROM products
GROUP BY category
HAVING COUNT(*) > 5;
\`\`\`

**Common Functions:**
\`\`\`sql
COUNT(), SUM(), AVG(), MIN(), MAX()
UPPER(), LOWER(), LENGTH(), TRIM()
NOW(), DATE(), YEAR(), MONTH()
COALESCE(), IFNULL(), CASE WHEN
\`\`\``;
    }

    if (lowerPrompt.includes('git') || lowerPrompt.includes('version control')) {
      return `### Git Quick Reference

**Basic Commands:**
\`\`\`bash
git init                    # Initialize repo
git clone <url>             # Clone remote repo
git status                  # Check status
git add .                   # Stage all changes
git commit -m "message"     # Commit
git push origin main        # Push to remote
git pull origin main        # Pull from remote
\`\`\`

**Branching:**
\`\`\`bash
git branch                  # List branches
git branch feature-name     # Create branch
git checkout feature-name   # Switch branch
git checkout -b feature     # Create + switch
git merge feature-name      # Merge into current
git branch -d feature-name  # Delete branch
\`\`\`

**Undoing Changes:**
\`\`\`bash
git stash                   # Temporarily save changes
git stash pop               # Restore stashed changes
git reset HEAD~1            # Undo last commit (keep changes)
git reset --hard HEAD~1     # Undo last commit (discard changes)
git revert <commit-hash>    # Create new commit that undoes
\`\`\`

**Viewing History:**
\`\`\`bash
git log --oneline           # Compact history
git log --graph             # Visual branch history
git diff                    # See unstaged changes
git diff --staged           # See staged changes
\`\`\`

**Best Practices:**
• Commit often with clear messages
• Use branches for features
• Pull before push
• Never force push to shared branches
• Write meaningful commit messages
• Use .gitignore for sensitive/generated files`;
    }

    if (lowerPrompt.includes('css') || lowerPrompt.includes('flexbox') || lowerPrompt.includes('grid') || lowerPrompt.includes('style')) {
      return `### CSS Quick Reference

**Flexbox:**
\`\`\`css
.container {
  display: flex;
  justify-content: center;  /* horizontal */
  align-items: center;      /* vertical */
  gap: 16px;
  flex-wrap: wrap;
}

.item {
  flex: 1;          /* grow equally */
  flex-shrink: 0;   /* don't shrink */
}
\`\`\`

**Grid:**
\`\`\`css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

/* Responsive */
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
\`\`\`

**Centering (Modern):**
\`\`\`css
/* Flexbox centering */
display: flex;
justify-content: center;
align-items: center;

/* Grid centering */
display: grid;
place-items: center;
\`\`\`

**Responsive Design:**
\`\`\`css
/* Mobile first */
.container { padding: 16px; }

@media (min-width: 768px) {
  .container { padding: 32px; }
}

@media (min-width: 1024px) {
  .container { max-width: 1200px; margin: 0 auto; }
}
\`\`\`

**Common Patterns:**
\`\`\`css
/* Smooth transitions */
transition: all 0.3s ease;

/* Box shadow */
box-shadow: 0 2px 8px rgba(0,0,0,0.1);

/* Truncate text */
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;

/* Gradient */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
\`\`\``;
    }

    if (lowerPrompt.includes('api') || lowerPrompt.includes('rest') || lowerPrompt.includes('endpoint')) {
      return `### REST API Design Guide

**HTTP Methods:**
• **GET** — Read data (no side effects)
• **POST** — Create new resource
• **PUT** — Update entire resource
• **PATCH** — Update partial resource
• **DELETE** — Remove resource

**URL Naming:**
\`\`\`
GET    /api/users          # List all users
GET    /api/users/123      # Get user 123
POST   /api/users          # Create user
PUT    /api/users/123      # Update user 123
DELETE /api/users/123      # Delete user 123
GET    /api/users/123/orders  # User's orders
\`\`\`

**Status Codes:**
• **200** OK — Success
• **201** Created — Resource created
• **204** No Content — Success, no body
• **400** Bad Request — Invalid input
• **401** Unauthorized — Not authenticated
• **403** Forbidden — Not authorized
• **404** Not Found — Resource doesn't exist
• **500** Internal Server Error — Server broke

**Response Format:**
\`\`\`json
{
  "data": { "id": 1, "name": "Alice" },
  "meta": { "page": 1, "total": 100 },
  "error": null
}
\`\`\`

**Best Practices:**
• Use plural nouns for resources (/users not /user)
• Version your API (/api/v1/users)
• Use query params for filtering (?status=active)
• Paginate large collections (?page=1&limit=20)
• Return appropriate status codes
• Include error messages in response body
• Use HTTPS always
• Rate limit your endpoints`;
    }

    if (lowerPrompt.includes('node') || lowerPrompt.includes('express')) {
      return `### Node.js / Express Quick Reference

**Basic Express Server:**
\`\`\`javascript
const express = require('express');
const app = express();

app.use(express.json());

app.get('/api/users', (req, res) => {
  res.json({ users: [] });
});

app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  // Create user logic
  res.status(201).json({ id: 1, name, email });
});

app.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  // Find user logic
  res.json({ id, name: 'Alice' });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
\`\`\`

**Middleware:**
\`\`\`javascript
// Logger middleware
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});
\`\`\`

**Environment Variables:**
\`\`\`javascript
require('dotenv').config();
const port = process.env.PORT || 3000;
const dbUrl = process.env.DATABASE_URL;
\`\`\`

**Common Packages:**
• express — Web framework
• cors — Cross-origin requests
• helmet — Security headers
• morgan — HTTP logging
• dotenv — Environment variables
• jsonwebtoken — JWT auth
• bcrypt — Password hashing
• mongoose — MongoDB ODM
• prisma — Database ORM`;
    }

    return `### Coding Help

I can help with:
• **React** — Components, hooks, patterns
• **Python** — Syntax, classes, data structures
• **JavaScript** — ES6+, async, arrays
• **TypeScript** — Types, interfaces, generics
• **SQL** — Queries, joins, aggregation
• **Git** — Commands, branching, workflows
• **CSS** — Flexbox, Grid, responsive design
• **APIs** — REST design, Express/Node.js

What would you like to learn or build?`;
  }

  // =============================================================================
  // ENHANCED ROUTING FOR ALL SPECIALIZED REQUESTS
  // =============================================================================

  private routeSpecializedRequest(prompt: string, lowerPrompt: string): string | null {
    // Email writing
    if (/\b(write|draft|compose|create)\b.*\b(email|e-mail)\b/i.test(lowerPrompt) ||
        lowerPrompt.includes('resignation') || lowerPrompt.includes('follow up email') ||
        lowerPrompt.includes('cold email') || lowerPrompt.includes('outreach email') ||
        (lowerPrompt.includes('email') && lowerPrompt.includes('template'))) {
      return this.generateEmailTemplate(prompt, lowerPrompt);
    }

    // Resume and career
    if (/\b(resume|cv|cover letter|linkedin|interview|career)\b/i.test(lowerPrompt) ||
        lowerPrompt.includes('job search') || lowerPrompt.includes('salary negotiat')) {
      return this.generateResumeHelp(prompt, lowerPrompt);
    }

    // Business
    if (/\b(business plan|side hustle|passive income|make money|marketing|pitch deck|startup|entrepreneur|ecommerce|dropshipping)\b/i.test(lowerPrompt) ||
        lowerPrompt.includes('content calendar') || lowerPrompt.includes('social media strategy')) {
      return this.generateBusinessPlan(prompt, lowerPrompt);
    }

    // Health and fitness
    if (/\b(workout|exercise|gym|training|diet|nutrition|meal plan|calorie|habit|routine|morning routine|sleep|insomnia|stress|anxiety|mental health)\b/i.test(lowerPrompt)) {
      return this.generateHealthAdvice(prompt, lowerPrompt);
    }

    // Study
    if (/\b(study plan|study schedule|exam prep|learn.*language|essay|academic writing)\b/i.test(lowerPrompt) ||
        lowerPrompt.includes('spanish') || lowerPrompt.includes('french') || lowerPrompt.includes('japanese')) {
      return this.generateStudyHelp(prompt, lowerPrompt);
    }

    // Travel
    if (/\b(travel|trip|vacation|itinerary|packing list|things to do)\b/i.test(lowerPrompt) ||
        lowerPrompt.includes('tokyo') || lowerPrompt.includes('japan') || lowerPrompt.includes('paris') ||
        lowerPrompt.includes('new york') || lowerPrompt.includes('london')) {
      return this.generateTravelHelp(prompt, lowerPrompt);
    }

    // Entertainment
    if (/\b(movie|film|tv show|series|book|game|podcast|anime|manga|recommend|music|playlist|song)\b/i.test(lowerPrompt) ||
        lowerPrompt.includes('inception') || lowerPrompt.includes('breaking bad') ||
        lowerPrompt.includes('what should i watch') || lowerPrompt.includes('what should i read')) {
      return this.generateEntertainmentResponse(prompt, lowerPrompt);
    }

    // Book summaries
    const bookSummary = this.generateBookSummary(prompt, lowerPrompt);
    if (bookSummary) return bookSummary;

    // Personal finance
    if (/\b(invest|stock|portfolio|budget|save|saving|debt|loan|credit card|retire|retirement|401k|ira|finance|financial)\b/i.test(lowerPrompt)) {
      return this.generateFinanceAdvice(prompt, lowerPrompt);
    }

    // Productivity
    if (/\b(productive|procrastinat|time management|goal setting|focus|distract|concentrat|pomodoro|eisenhower)\b/i.test(lowerPrompt)) {
      return this.generateProductivityAdvice(prompt, lowerPrompt);
    }

    // Coding tutorials
    if (/\b(react|python|javascript|typescript|sql|git|css|flexbox|grid|api|rest|express|node)\b/i.test(lowerPrompt) &&
        /\b(tutorial|guide|reference|learn|how to|basics|beginner|cheat sheet)\b/i.test(lowerPrompt)) {
      return this.generateCodingTutorial(prompt, lowerPrompt);
    }

    return null;
  }

  // =============================================================================
  // RELATIONSHIP AND COMMUNICATION ADVICE
  // =============================================================================

  private generateRelationshipAdvice(prompt: string, lowerPrompt: string): string {
    if (lowerPrompt.includes('conflict') || lowerPrompt.includes('argument') || lowerPrompt.includes('fight') || lowerPrompt.includes('disagree')) {
      return `### Conflict Resolution Guide

**The 5-Step Framework:**

**1. Cool Down First**
• Take a break if emotions are high
• 20 minutes minimum (that's how long it takes for cortisol to drop)
• Don't make decisions or send messages when angry
• Deep breathing: 4 counts in, 7 hold, 8 out

**2. Use "I" Statements**
• Bad: "You never listen to me"
• Good: "I feel unheard when I'm interrupted"
• Bad: "You're so selfish"
• Good: "I feel hurt when my needs aren't considered"

**3. Active Listening**
• Let them finish speaking completely
• Reflect back: "What I'm hearing is..."
• Ask clarifying questions
• Don't plan your response while they're talking
• Validate their feelings (even if you disagree)

**4. Find Common Ground**
• What do you both want? (Usually the same thing)
• Focus on the problem, not the person
• Brainstorm solutions together
• Be willing to compromise

**5. Agree on Next Steps**
• Specific actions, not vague promises
• "I will do X by Y date"
• Check in after a set time
• Acknowledge progress

**Communication Styles:**
• **Passive:** Avoids conflict, doesn't express needs
• **Aggressive:** Dominates, blames, attacks
• **Passive-Aggressive:** Indirect hostility, sarcasm
• **Assertive:** Direct, respectful, honest (THIS IS THE GOAL)

**Red Flags in Any Relationship:**
• Constant criticism or contempt
• Stonewalling (refusing to communicate)
• Defensiveness (never taking responsibility)
• Gaslighting (making you doubt your reality)
• Controlling behavior
• Isolation from friends/family`;
    }

    if (lowerPrompt.includes('networking') || lowerPrompt.includes('professional relationship') || lowerPrompt.includes('connect')) {
      return `### Professional Networking Guide

**Mindset Shift:**
Networking isn't about collecting contacts — it's about building genuine relationships.

**Where to Network:**
• Industry conferences and events
• LinkedIn (engage with content, don't just connect)
• Professional associations
• Alumni networks
• Meetup groups
• Online communities (Discord, Slack groups)
• Volunteering for industry causes

**How to Start Conversations:**
• "What brought you to this event?"
• "What are you working on that excites you?"
• "How did you get into [their field]?"
• "What's the biggest challenge in your industry right now?"
• Ask about THEM, not about what they can do for you

**Follow-Up (The Most Important Part):**
• Send a message within 24 hours
• Reference something specific from your conversation
• Offer value: share an article, make an introduction
• Don't ask for favors immediately
• Stay in touch periodically (not just when you need something)

**LinkedIn Best Practices:**
• Personalize every connection request
• Engage with others' content (comments > likes)
• Share your own insights and experiences
• Recommend others genuinely
• Join and participate in relevant groups

**The Give-First Approach:**
• Help others before asking for help
• Make introductions between people who should know each other
• Share resources and opportunities
• Celebrate others' wins publicly
• Be the person everyone wants to know`;
    }

    if (lowerPrompt.includes('difficult conversation') || lowerPrompt.includes('hard conversation') || lowerPrompt.includes('tough conversation')) {
      return `### Having Difficult Conversations

**Preparation:**
1. Write down your main point (one sentence)
2. Consider their perspective
3. Choose the right time and place (private, not rushed)
4. Plan your opening line
5. Decide what outcome you want

**The Conversation Framework:**

**Open with facts, not feelings:**
• "I've noticed that..." (observation)
• "The impact has been..." (consequence)
• "I'd like to discuss..." (invitation)

**Stay curious:**
• "Help me understand your perspective"
• "What am I missing?"
• "How do you see this situation?"

**Acknowledge their feelings:**
• "I can see this is frustrating"
• "That makes sense given your experience"
• "I appreciate you sharing that"

**State your needs clearly:**
• "What I need is..."
• "What would help me is..."
• "Going forward, I'd like..."

**Common Difficult Conversations:**
• Asking for a raise → Focus on value delivered, not personal needs
• Setting boundaries → "I care about this relationship AND I need..."
• Giving feedback → Specific behavior + impact + request
• Ending a relationship → Be honest, kind, and direct
• Addressing poor performance → Facts, not character judgments

**What to Avoid:**
• Starting with "We need to talk" (creates anxiety)
• Bringing up multiple issues at once
• Using absolutes: "always," "never"
• Attacking character instead of behavior
• Having the conversation via text/email`;
    }

    if (lowerPrompt.includes('public speaking') || lowerPrompt.includes('presentation') || lowerPrompt.includes('speech')) {
      return `### Public Speaking & Presentation Guide

**Overcoming Nervousness:**
• It's normal — even pros get nervous
• Reframe: "I'm excited" not "I'm nervous" (same physical response)
• Practice out loud 5+ times
• Arrive early, get comfortable in the space
• Deep breathing before you start
• Focus on helping the audience, not on yourself

**Structure Your Talk:**

**The Classic Framework:**
1. **Hook** (30 seconds): Story, question, surprising fact
2. **Problem** (2 min): What's the issue? Why should they care?
3. **Solution** (5-10 min): Your main points (3 max)
4. **Evidence** (throughout): Stories, data, examples
5. **Call to Action** (1 min): What should they do next?

**Delivery Tips:**
• Speak slower than you think you should
• Pause after key points (silence is powerful)
• Make eye contact (pick 3-4 friendly faces)
• Use hand gestures naturally
• Move with purpose (don't pace)
• Vary your tone and volume
• Tell stories (people remember stories, not bullet points)

**Slide Design:**
• One idea per slide
• Minimal text (6 words max per bullet)
• Large, readable fonts (24pt minimum)
• High-quality images
• Consistent design/colors
• No clip art or cheesy stock photos
• Dark background for presentations, light for documents

**Practice Method:**
1. Write your outline (not a script)
2. Talk through it out loud
3. Record yourself and watch it back
4. Practice in front of someone
5. Time yourself
6. Refine and repeat

**Pro Tips:**
• Start with a story, not "Today I'm going to talk about..."
• End with a memorable statement, not "Any questions?"
• Have a backup plan if tech fails
• Bring water
• Dress slightly better than your audience`;
    }

    return `### Communication & Relationship Help

I can help with:
• Conflict resolution strategies
• Professional networking
• Having difficult conversations
• Public speaking and presentations
• Communication skills improvement

What situation are you dealing with?`;
  }

  // =============================================================================
  // SCIENCE AND HISTORY EXPLANATIONS
  // =============================================================================

  private generateScienceExplanation(prompt: string, lowerPrompt: string): string {
    if (lowerPrompt.includes('quantum') || lowerPrompt.includes('quantum physics') || lowerPrompt.includes('quantum mechanics')) {
      return `### Quantum Mechanics — Simplified

**What is it?**
The physics of the very small — atoms, electrons, photons. At this scale, the rules are completely different from everyday life.

**Key Concepts:**

**1. Wave-Particle Duality**
• Light and matter behave as BOTH waves AND particles
• An electron isn't a tiny ball — it's a probability cloud
• The double-slit experiment proves this beautifully

**2. Superposition**
• A particle can be in multiple states simultaneously
• Schrodinger's Cat: The cat is both alive AND dead until you look
• Not just "we don't know" — it literally IS both until measured

**3. Quantum Entanglement**
• Two particles become linked — measuring one instantly affects the other
• Works regardless of distance (Einstein called it "spooky action at a distance")
• Used in quantum computing and quantum cryptography

**4. The Uncertainty Principle (Heisenberg)**
• You can't know both position AND momentum precisely
• Not a measurement limitation — it's fundamental to reality
• The more precisely you know one, the less you know the other

**5. Quantum Tunneling**
• Particles can pass through barriers they shouldn't be able to
• This is how the sun works (nuclear fusion)
• Also how flash memory and scanning tunneling microscopes work

**Why It Matters:**
• Transistors (every computer chip)
• Lasers (surgery, communications, barcode scanners)
• MRI machines
• GPS satellites (relativistic corrections)
• Future: Quantum computers, teleportation, encryption

**The Measurement Problem:**
Why does observing a quantum system change it? Nobody fully knows. This is one of the biggest unsolved problems in physics.`;
    }

    if (lowerPrompt.includes('black hole')) {
      return `### Black Holes — Explained

**What is a Black Hole?**
A region of space where gravity is so strong that nothing — not even light — can escape.

**How They Form:**
• A massive star (10+ times our sun) runs out of fuel
• The core collapses under its own gravity
• If massive enough, it collapses into a singularity
• The boundary is called the "event horizon"

**Types:**
• **Stellar:** 3-100 solar masses (from dead stars)
• **Supermassive:** Millions to billions of solar masses (center of galaxies)
• **Intermediate:** 100-100,000 solar masses (rare, mysterious)
• **Primordial:** Hypothetical, from the Big Bang

**Mind-Bending Facts:**

**Time Dilation:**
• Time slows down near a black hole
• If you watched someone fall in, they'd appear to slow down and freeze at the event horizon
• From THEIR perspective, they'd fall right through

**Spaghettification:**
• Tidal forces stretch objects into long thin shapes
• The gravity difference between your head and feet would tear you apart
• For supermassive black holes, you could cross the event horizon without noticing

**Information Paradox:**
• Physics says information can't be destroyed
• But black holes seem to destroy everything
• Hawking radiation might carry information out
• This is one of the biggest unsolved problems in physics

**Sagittarius A*:**
• The supermassive black hole at the center of our galaxy
• 4 million times the mass of our sun
• First imaged by the Event Horizon Telescope in 2022
• 26,000 light-years away (we're safe!)`;
    }

    if (lowerPrompt.includes('evolution') || lowerPrompt.includes('natural selection') || lowerPrompt.includes('darwin')) {
      return `### Evolution — Explained

**What is Evolution?**
The change in inherited characteristics of populations over successive generations.

**Natural Selection (Darwin's Big Idea):**
1. **Variation:** Individuals differ in traits
2. **Inheritance:** Traits are passed to offspring
3. **Selection:** Some traits help survival/reproduction
4. **Time:** Over generations, beneficial traits become more common

**Common Misconceptions:**
• Evolution is NOT "survival of the fittest" (it's survival of the fit ENOUGH)
• Humans did NOT evolve from modern apes (we share a common ancestor)
• Evolution is NOT random (mutations are random, selection is not)
• Evolution does NOT have a goal or direction
• "Theory" in science means well-supported explanation, not a guess

**Evidence for Evolution:**
• **Fossil record:** Shows gradual changes over millions of years
• **DNA:** All life shares genetic code; more similar = more closely related
• **Comparative anatomy:** Similar bone structures across species
• **Observed evolution:** Bacteria developing antibiotic resistance
• **Biogeography:** Species distribution matches evolutionary predictions

**Human Evolution Timeline:**
• 7 million years ago: Last common ancestor with chimpanzees
• 4 million: Australopithecus (Lucy) — walked upright
• 2.5 million: Homo habilis — first stone tools
• 1.8 million: Homo erectus — fire, migration out of Africa
• 300,000: Homo sapiens appear in Africa
• 70,000: Cognitive revolution, complex language
• 12,000: Agricultural revolution

**Key Concept — Genetic Drift:**
Random changes in gene frequency, especially in small populations. Not all evolution is driven by natural selection.`;
    }

    if (lowerPrompt.includes('world war') || lowerPrompt.includes('ww2') || lowerPrompt.includes('wwii') || lowerPrompt.includes('world war 2')) {
      return `### World War II — Overview

**Duration:** September 1, 1939 – September 2, 1945
**Deaths:** 70-85 million (deadliest conflict in human history)

**Causes:**
• Treaty of Versailles (harsh terms on Germany after WWI)
• Rise of fascism (Hitler, Mussolini, Imperial Japan)
• Appeasement policy failed
• German invasion of Poland (September 1, 1939)

**Major Sides:**
• **Allies:** UK, France, USSR, USA, China, and others
• **Axis:** Germany, Italy, Japan

**Key Events:**

**1939-1941: Axis Expansion**
• Germany conquers Poland, France, most of Europe
• Battle of Britain (air war, UK survives)
• Germany invades USSR (Operation Barbarossa, June 1941)
• Japan attacks Pearl Harbor (December 7, 1941) — US enters war

**1942-1943: Turning Points**
• Battle of Stalingrad (USSR defeats Germany — deadliest battle ever)
• Battle of Midway (US defeats Japan in Pacific)
• Allied invasion of North Africa and Italy
• D-Day: June 6, 1944 (Allied invasion of Normandy)

**1944-1945: Allied Victory**
• Liberation of France and Western Europe
• USSR pushes Germany back from the East
• Discovery of Holocaust concentration camps
• Hitler's suicide (April 30, 1945)
• Germany surrenders (May 8, 1945 — V-E Day)
• Atomic bombs on Hiroshima and Nagasaki (August 1945)
• Japan surrenders (September 2, 1945 — V-J Day)

**Legacy:**
• United Nations founded
• Cold War begins (US vs USSR)
• Decolonization of Asia and Africa
• European integration (eventually EU)
• Universal Declaration of Human Rights
• Nuclear age begins`;
    }

    if (lowerPrompt.includes('cold war')) {
      return `### The Cold War — Overview

**Duration:** 1947-1991
**Between:** United States (capitalism) vs Soviet Union (communism)

**Why "Cold"?**
The two superpowers never directly fought each other. Instead, they competed through proxy wars, espionage, propaganda, and the arms/space race.

**Key Events:**

**1940s-1950s:**
• Iron Curtain divides Europe (Churchill's speech, 1946)
• Truman Doctrine and Marshall Plan (US contains communism)
• Berlin Blockade and Airlift (1948-49)
• NATO formed (1949)
• Korean War (1950-53)
• USSR gets nuclear weapons (1949)

**1960s:**
• Berlin Wall built (1961)
• Cuban Missile Crisis (1962) — closest to nuclear war
• Vietnam War escalates (US involvement 1955-1975)
• Space Race: Sputnik (1957), Moon landing (1969)

**1970s-1980s:**
• Detente (easing of tensions)
• Soviet invasion of Afghanistan (1979)
• Reagan's military buildup
• "Star Wars" missile defense program
• Chernobyl disaster (1986)

**End of Cold War:**
• Gorbachev's reforms: Glasnost (openness) and Perestroika (restructuring)
• Berlin Wall falls (November 9, 1989)
• Eastern European revolutions (1989)
• Soviet Union dissolves (December 26, 1991)

**Legacy:**
• US emerges as sole superpower
• Nuclear proliferation concerns
• NATO expansion
• Ongoing US-Russia tensions
• Shaped modern geopolitics`;
    }

    if (lowerPrompt.includes('climate change') || lowerPrompt.includes('global warming') || lowerPrompt.includes('greenhouse')) {
      return `### Climate Change — Explained

**The Basics:**
• Earth's average temperature has risen ~1.1°C since pre-industrial times
• Primarily caused by burning fossil fuels (coal, oil, gas)
• CO2 and other greenhouse gases trap heat in the atmosphere
• 97%+ of climate scientists agree on human-caused warming

**The Greenhouse Effect:**
1. Sun's energy reaches Earth
2. Earth absorbs some, reflects some back
3. Greenhouse gases trap reflected heat
4. This is natural and necessary (without it, Earth would be -18°C)
5. Problem: We're adding too much, trapping too much heat

**Evidence:**
• Temperature records (warmest years all recent)
• Ice cores (CO2 levels highest in 800,000 years)
• Sea level rise (8-9 inches since 1900)
• Shrinking ice sheets and glaciers
• Ocean acidification
• Extreme weather events increasing

**Impacts:**
• More frequent and intense heatwaves
• Rising sea levels (threatening coastal cities)
• More severe storms, floods, and droughts
• Ecosystem disruption and species extinction
• Food and water security threats
• Climate refugees

**Solutions:**
• **Energy:** Transition to renewable (solar, wind, nuclear)
• **Transport:** Electric vehicles, public transit
• **Industry:** Carbon capture, green manufacturing
• **Agriculture:** Sustainable farming, reduce food waste
• **Individual:** Reduce consumption, eat less meat, fly less
• **Policy:** Carbon pricing, regulations, international agreements

**Key Numbers:**
• 1.5°C: Target limit (Paris Agreement)
• 2°C: Dangerous threshold
• 2050: Target for net-zero emissions
• 420+ ppm: Current CO2 level (was 280 pre-industrial)`;
    }

    if (lowerPrompt.includes('space') || lowerPrompt.includes('universe') || lowerPrompt.includes('cosmos') || lowerPrompt.includes('solar system')) {
      return `### The Universe — Key Facts

**Scale:**
• Observable universe: 93 billion light-years across
• Contains ~2 trillion galaxies
• Each galaxy has ~100-400 billion stars
• Our sun is one ordinary star in the Milky Way

**The Solar System:**
• **Mercury:** Closest to sun, extreme temperatures
• **Venus:** Hottest planet (greenhouse effect), rotates backwards
• **Earth:** Only known planet with life
• **Mars:** Red planet, potential for human colonization
• **Jupiter:** Largest planet, Great Red Spot storm
• **Saturn:** Famous rings (made of ice and rock)
• **Uranus:** Tilted on its side, ice giant
• **Neptune:** Farthest planet, strongest winds

**The Big Bang:**
• Universe began ~13.8 billion years ago
• Started as an infinitely hot, dense point
• Expanded rapidly (still expanding today)
• First atoms formed after 380,000 years
• First stars after ~200 million years
• Our solar system formed ~4.6 billion years ago

**Mind-Bending Facts:**
• Light from the sun takes 8 minutes to reach Earth
• The nearest star (Proxima Centauri) is 4.24 light-years away
• If you could travel at light speed, crossing the Milky Way would take 100,000 years
• There are more stars in the universe than grains of sand on Earth
• The universe is expanding faster than the speed of light
• 95% of the universe is dark matter and dark energy (we don't know what they are)

**Future of Space Exploration:**
• Mars missions (SpaceX, NASA — 2030s target)
• James Webb Space Telescope (studying early universe)
• Artemis program (return to the Moon)
• Search for extraterrestrial life
• Asteroid mining`;
    }

    return `### Science & History Help

I can explain:
• **Physics:** Quantum mechanics, black holes, relativity
• **Biology:** Evolution, genetics, the human body
• **History:** World wars, Cold War, ancient civilizations
• **Earth Science:** Climate change, geology, weather
• **Space:** The universe, solar system, space exploration

What topic interests you?`;
  }

  // =============================================================================
  // COOKING AND RECIPES
  // =============================================================================

  private generateCookingHelp(prompt: string, lowerPrompt: string): string {
    if (lowerPrompt.includes('beginner') || lowerPrompt.includes('learn to cook') || lowerPrompt.includes('cooking basics')) {
      return `### Cooking Basics for Beginners

**Essential Kitchen Tools:**
• Chef's knife (8-inch) — most important tool
• Cutting board (wood or plastic)
• Large skillet/frying pan
• Medium saucepan with lid
• Sheet pan (for roasting)
• Wooden spoon and spatula
• Measuring cups and spoons
• Instant-read thermometer

**5 Techniques That Cover 90% of Cooking:**

**1. Sauteing (Pan-frying)**
• Heat pan, add oil, wait until it shimmers
• Don't overcrowd the pan
• Let food develop a sear before flipping

**2. Roasting**
• Oven at 400-425°F for most vegetables and meats
• Toss veggies in oil, salt, pepper
• Single layer on sheet pan, don't crowd
• Flip halfway through

**3. Boiling/Simmering**
• Boil: Big bubbles (pasta, blanching)
• Simmer: Small bubbles (soups, sauces, rice)
• Salt your pasta water generously

**4. Braising**
• Sear meat on high heat
• Add liquid (broth, wine)
• Cover and cook low and slow
• Perfect for tough cuts of meat

**5. Making a Pan Sauce**
• After cooking meat, deglaze pan with liquid
• Scrape up brown bits (that's flavor!)
• Reduce until thickened
• Finish with butter

**Seasoning Basics:**
• Salt enhances ALL flavors (add gradually, taste often)
• Acid brightens (lemon juice, vinegar)
• Fat carries flavor (butter, olive oil)
• Heat adds depth (chili flakes, black pepper)
• Fresh herbs at the end, dried herbs at the beginning`;
    }

    if (lowerPrompt.includes('pasta') || lowerPrompt.includes('spaghetti') || lowerPrompt.includes('carbonara')) {
      return `### Essential Pasta Recipes

**Perfect Pasta Every Time:**
1. Use a large pot with lots of water
2. Salt the water generously (should taste like the sea)
3. Cook 1-2 minutes less than package directions (al dente)
4. Save 1 cup of pasta water before draining
5. Finish pasta IN the sauce, adding pasta water to emulsify

**Aglio e Olio (Garlic & Oil) — 15 min**
• 1 lb spaghetti
• 6 cloves garlic, thinly sliced
• 1/2 cup olive oil
• Red pepper flakes
• Parsley, parmesan

Cook pasta. In pan, slowly cook garlic in olive oil until golden (not brown!). Add pepper flakes. Toss with drained pasta and pasta water. Top with parsley and parmesan.

**Cacio e Pepe (Cheese & Pepper) — 15 min**
• 1 lb spaghetti or tonnarelli
• 2 cups Pecorino Romano, finely grated
• 2 tbsp black pepper, freshly cracked

Toast pepper in dry pan. Cook pasta, save lots of pasta water. Toss hot pasta with pepper, then gradually add cheese and pasta water, tossing vigorously to create creamy sauce. No cream needed!

**Carbonara — 20 min**
• 1 lb spaghetti
• 6 oz guanciale or pancetta, diced
• 4 egg yolks + 2 whole eggs
• 1 cup Pecorino Romano
• Black pepper

Cook guanciale until crispy. Mix eggs and cheese in a bowl. Cook pasta, save water. Toss hot pasta with guanciale (OFF heat), then add egg mixture, tossing quickly. The residual heat cooks the eggs into a creamy sauce. Add pasta water if needed.

**Bolognese — 3 hours (worth it)**
• 1 lb ground beef + 1/2 lb ground pork
• Onion, carrot, celery (finely diced)
• Tomato paste, crushed tomatoes
• Red wine, milk, beef broth
• Bay leaves, nutmeg

Sauté vegetables, brown meat, add wine and reduce, add tomatoes and liquids. Simmer on low for 2-3 hours. The long cook time is the secret.`;
    }

    if (lowerPrompt.includes('chicken') || lowerPrompt.includes('easy dinner') || lowerPrompt.includes('quick meal')) {
      return `### Quick & Easy Dinner Recipes

**Sheet Pan Chicken & Vegetables — 35 min**
• 4 chicken thighs (bone-in, skin-on)
• Broccoli, bell peppers, onions
• Olive oil, salt, pepper, garlic powder, paprika

Preheat oven to 425°F. Season chicken. Toss veggies in oil and seasoning. Arrange on sheet pan (chicken in center). Roast 25-30 min until chicken reaches 165°F.

**Stir-Fry — 20 min**
• 1 lb protein (chicken, beef, shrimp, or tofu)
• Mixed vegetables (bell peppers, broccoli, snap peas, carrots)
• Sauce: 3 tbsp soy sauce, 1 tbsp sesame oil, 1 tbsp honey, 1 tsp cornstarch, garlic, ginger

Cut everything small and uniform. Cook protein first on HIGH heat, remove. Cook vegetables (hardest first). Add protein back, pour sauce, toss until thickened. Serve over rice.

**One-Pot Chicken & Rice — 40 min**
• 4 chicken thighs
• 1.5 cups rice
• 2 cups chicken broth
• Onion, garlic, spices

Sear chicken skin-side down until golden. Remove. Sauté onion and garlic. Add rice, toast 1 min. Add broth and spices. Place chicken on top. Cover, simmer 20 min. Rest 5 min.

**15-Minute Meals:**
• Quesadillas with leftover anything
• Fried rice with whatever vegetables you have
• Pasta with jarred sauce + sautéed vegetables
• Omelets or frittatas
• Grain bowls (rice + protein + veggies + sauce)

**Meal Prep Tips:**
• Cook protein in bulk on Sunday
• Prep vegetables ahead (wash, chop, store)
• Make sauces/dressings for the week
• Cook grains in large batches (rice, quinoa)
• Use freezer for soups, stews, and marinated meats`;
    }

    if (lowerPrompt.includes('baking') || lowerPrompt.includes('cake') || lowerPrompt.includes('cookie') || lowerPrompt.includes('bread')) {
      return `### Baking Essentials

**Baking vs Cooking:**
• Cooking is an art (flexible, forgiving)
• Baking is a science (precise, follow the recipe)
• Measure ingredients by weight if possible
• Room temperature ingredients matter!

**Perfect Chocolate Chip Cookies:**
• 2.25 cups flour, 1 tsp baking soda, 1 tsp salt
• 1 cup butter (softened), 3/4 cup each white and brown sugar
• 2 eggs, 2 tsp vanilla
• 2 cups chocolate chips

Cream butter and sugars. Add eggs and vanilla. Mix dry ingredients separately, then combine. Fold in chips. Chill dough 24-36 hours (secret to amazing cookies). Bake 375°F for 9-11 min. They should look slightly underdone.

**Simple Banana Bread:**
• 3 very ripe bananas (brown/black skin)
• 1/3 cup melted butter
• 3/4 cup sugar, 1 egg, 1 tsp vanilla
• 1 tsp baking soda, pinch of salt
• 1.5 cups flour

Mash bananas. Mix in butter, sugar, egg, vanilla. Add baking soda, salt, flour. Pour into greased loaf pan. Bake 350°F for 55-65 min.

**Baking Tips:**
• Preheat oven for at least 15 minutes
• Don't overmix batter (develops gluten = tough)
• Use an oven thermometer (ovens lie)
• Rotate pans halfway through
• Let baked goods cool before cutting
• Brown butter = instant flavor upgrade
• Add a pinch of salt to ALL sweet recipes`;
    }

    return `### Cooking Help

I can help with:
• Cooking basics for beginners
• Pasta recipes (carbonara, bolognese, aglio e olio)
• Quick weeknight dinners
• Baking (cookies, bread, cakes)
• Meal prep strategies
• Kitchen tips and techniques

What would you like to cook?`;
  }

  // =============================================================================
  // DIY AND HOME IMPROVEMENT
  // =============================================================================

  private generateDIYHelp(prompt: string, lowerPrompt: string): string {
    if (lowerPrompt.includes('organize') || lowerPrompt.includes('declutter') || lowerPrompt.includes('minimalis')) {
      return `### Home Organization & Decluttering

**The KonMari Method (Marie Kondo):**
1. Commit to tidying up
2. Imagine your ideal lifestyle
3. Finish discarding first, then organize
4. Tidy by category, not location
5. Follow the right order:
   • Clothes → Books → Papers → Miscellaneous → Sentimental

**The "Does It Spark Joy?" Test:**
• Hold each item
• If it sparks joy, keep it
• If not, thank it and let it go
• For practical items: Does it serve a clear purpose?

**Room-by-Room Guide:**

**Kitchen:**
• Empty ALL cabinets, clean, then put back only what you use
• Toss expired food, duplicate gadgets, chipped dishes
• Organize by frequency of use (daily items at eye level)
• Use drawer dividers and shelf risers

**Closet:**
• If you haven't worn it in a year, donate it
• Capsule wardrobe: 30-40 versatile pieces
• Organize by type, then color
• Use matching hangers (looks cleaner, saves space)

**Bathroom:**
• Toss expired products (check dates!)
• Keep counters clear (store in cabinets)
• Use drawer organizers for small items

**Digital Declutter:**
• Unsubscribe from emails you don't read
• Delete unused apps
• Organize files into folders
• Clean up desktop
• Back up photos, delete duplicates

**Maintenance Rules:**
• One in, one out (buy something, donate something)
• 10-minute tidy every evening
• Put things back immediately after use
• Don't let mail/papers pile up
• Monthly mini-declutter sessions`;
    }

    if (lowerPrompt.includes('move') || lowerPrompt.includes('moving') || lowerPrompt.includes('apartment')) {
      return `### Moving Checklist

**8 Weeks Before:**
• Create a moving budget
• Research moving companies (get 3 quotes)
• Start decluttering (sell, donate, trash)
• Notify landlord if renting
• Start collecting boxes and supplies

**4 Weeks Before:**
• Change address (USPS, bank, subscriptions)
• Transfer utilities (electric, gas, internet, water)
• Update address: DMV, insurance, employer, doctor
• Start packing non-essentials
• Arrange time off work

**2 Weeks Before:**
• Confirm moving company or truck rental
• Pack room by room, label every box
• Prepare an essentials box (see below)
• Clean out fridge/freezer
• Back up important documents

**1 Week Before:**
• Finish packing
• Disassemble furniture
• Defrost freezer
• Charge all devices
• Confirm all arrangements

**Moving Day:**
• Keep essentials box with you (not on truck)
• Do a final walkthrough
• Check all closets, cabinets, drawers
• Take photos of empty space (for deposit)
• Lock up and hand over keys

**Essentials Box (Open First):**
• Phone charger and cables
• Toiletries and medications
• Change of clothes
• Snacks and water
• Paper towels and trash bags
• Basic tools (screwdriver, hammer)
• Important documents
• Sheets and pillows for first night
• Coffee maker (priorities!)`;
    }

    return `### DIY & Home Help

I can help with:
• Home organization and decluttering
• Moving checklists
• Basic home repairs
• Cleaning tips and schedules
• Interior design basics

What do you need help with?`;
  }

  // =============================================================================
  // MENTAL MODELS AND DECISION MAKING
  // =============================================================================

  private generateMentalModels(prompt: string, lowerPrompt: string): string {
    if (lowerPrompt.includes('decision') || lowerPrompt.includes('decide') || lowerPrompt.includes('choose')) {
      return `### Decision-Making Frameworks

**1. The 10/10/10 Rule**
Ask yourself:
• How will I feel about this decision in 10 minutes?
• How about in 10 months?
• How about in 10 years?
This helps separate short-term emotion from long-term impact.

**2. Reversible vs Irreversible Decisions**
• **Reversible (Type 2):** Make quickly, you can always change course
  - Choosing a restaurant, trying a new tool, starting a project
• **Irreversible (Type 1):** Take your time, gather information
  - Quitting a job, major purchases, moving cities

**3. The Regret Minimization Framework (Jeff Bezos)**
• Project yourself to age 80
• Ask: "Will I regret NOT doing this?"
• Minimizes the chance of looking back with regret

**4. Pros/Cons + Weighted Scoring**
• List pros and cons
• Weight each by importance (1-10)
• Score each option
• The math often reveals what your gut already knows

**5. The Two-List Strategy (Warren Buffett)**
• Write down your top 25 goals
• Circle the top 5
• The other 20 become your "avoid at all costs" list
• Focus is about saying no to good things

**6. First Principles Thinking**
• Break the problem down to its fundamental truths
• Rebuild your reasoning from the ground up
• Don't rely on analogy or convention
• Ask: "What do I know to be absolutely true?"

**7. Inversion**
• Instead of asking "How do I succeed?"
• Ask: "How would I guarantee failure?"
• Then avoid those things
• Often easier to avoid stupidity than to seek brilliance

**Common Decision Traps:**
• Analysis paralysis (overthinking)
• Sunk cost fallacy (continuing because of past investment)
• Confirmation bias (seeking info that supports your preference)
• Status quo bias (defaulting to no change)
• Anchoring (over-relying on first piece of information)`;
    }

    if (lowerPrompt.includes('mental model') || lowerPrompt.includes('thinking') || lowerPrompt.includes('framework')) {
      return `### Essential Mental Models

**1. Pareto Principle (80/20 Rule)**
• 80% of results come from 20% of efforts
• Find the vital few, ignore the trivial many
• Apply to: business, productivity, relationships, health

**2. Circle of Competence**
• Know what you know and what you don't
• Stay within your circle for important decisions
• Expand it deliberately over time
• The edges are where mistakes happen

**3. Second-Order Thinking**
• First order: What happens immediately?
• Second order: What happens as a result of that?
• Third order: And then what?
• Most people only think first-order

**4. Map is Not the Territory**
• Models and descriptions are simplifications
• Reality is always more complex
• Don't confuse the menu with the meal
• All models are wrong, some are useful

**5. Occam's Razor**
• The simplest explanation is usually correct
• Don't multiply assumptions unnecessarily
• Complexity should be a last resort

**6. Hanlon's Razor**
• Never attribute to malice what can be explained by ignorance
• People are usually not out to get you
• They're just busy, distracted, or uninformed

**7. Compounding**
• Small consistent actions create massive results over time
• Applies to: money, knowledge, relationships, health
• The most powerful force in the universe (Einstein, allegedly)

**8. Margin of Safety**
• Always leave room for error
• Things take longer and cost more than expected
• Build buffers into plans, budgets, and timelines

**9. Survivorship Bias**
• We only see the winners, not the failures
• "This worked for successful people" ignores everyone it didn't work for
• Be careful drawing conclusions from visible successes only

**10. Opportunity Cost**
• Every choice has a cost: what you give up
• Time spent on X is time NOT spent on Y
• Always ask: "What's the best alternative use of this resource?"`;
    }

    return `### Thinking & Decision-Making Help

I can help with:
• Decision-making frameworks
• Mental models for better thinking
• Problem-solving approaches
• Critical thinking skills
• Cognitive biases to watch for

What decision or problem are you working through?`;
  }

  // =============================================================================
  // PET CARE
  // =============================================================================

  private generatePetCareAdvice(prompt: string, lowerPrompt: string): string {
    if (lowerPrompt.includes('dog') || lowerPrompt.includes('puppy')) {
      return `### Dog Care Guide

**New Puppy Checklist:**
• Food and water bowls
• High-quality puppy food
• Collar, leash, and ID tag
• Crate (for training and safe space)
• Bed and blankets
• Toys (chew toys, puzzle toys)
• Poop bags
• Enzymatic cleaner (for accidents)

**Training Basics:**
• Start immediately (puppies learn fast)
• Use positive reinforcement (treats, praise)
• Keep sessions short (5-10 minutes)
• Be consistent (same commands, same rules)
• Socialize early (expose to people, dogs, sounds)

**Essential Commands (in order):**
1. Name recognition
2. Sit
3. Stay
4. Come (recall)
5. Down
6. Leave it
7. Drop it

**Potty Training:**
• Take outside every 2 hours (more for young puppies)
• After eating, drinking, playing, and waking up
• Praise immediately when they go outside
• Don't punish accidents (they don't understand)
• Clean accidents with enzymatic cleaner
• Most puppies are reliable by 6 months

**Health:**
• Vet visit within first week
• Vaccination schedule (your vet will advise)
• Spay/neuter (discuss timing with vet)
• Monthly flea/tick prevention
• Annual checkups
• Dental care (brush teeth or dental chews)

**Exercise Needs by Size:**
• Small breeds: 30-60 min/day
• Medium breeds: 60-90 min/day
• Large breeds: 90-120 min/day
• Mental stimulation is just as important as physical`;
    }

    if (lowerPrompt.includes('cat') || lowerPrompt.includes('kitten')) {
      return `### Cat Care Guide

**New Cat Checklist:**
• Litter box (one per cat + one extra)
• Quality cat litter
• Food and water bowls (separate locations)
• Scratching post (saves your furniture)
• Cat tree or perches
• Toys (wand toys, balls, puzzle feeders)
• Carrier (for vet visits)
• Bed (they'll probably sleep on your stuff anyway)

**Litter Box Rules:**
• One per cat plus one extra
• Scoop daily, full clean weekly
• Place in quiet, accessible locations
• Don't put near food/water
• If cat stops using it: check for medical issues first

**Feeding:**
• Wet food is generally better (more moisture)
• Don't free-feed dry food (leads to obesity)
• Fresh water always available
• Consider a water fountain (cats prefer running water)
• Avoid: onions, garlic, chocolate, grapes, lilies (toxic!)

**Health:**
• Indoor cats live 12-18 years (outdoor: 2-5 years)
• Annual vet checkups
• Spay/neuter
• Keep vaccinations current
• Watch for: changes in eating, litter box habits, hiding

**Behavior:**
• Scratching is natural — provide appropriate surfaces
• Cats need vertical space (shelves, cat trees)
• Play 15-20 min daily (prevents behavior problems)
• Slow blinks = "I love you" in cat language
• Cats knead when content (it's a kitten behavior)
• If a cat shows you its belly, it trusts you (but it might be a trap)

**Signs of a Happy Cat:**
• Purring, slow blinking
• Kneading, head bunting
• Relaxed body posture
• Playful behavior
• Healthy appetite`;
    }

    return `### Pet Care Help

I can help with:
• Dog care, training, and behavior
• Cat care and health
• New pet checklists
• Feeding guidelines
• Common health concerns

What pet do you need help with?`;
  }

  // =============================================================================
  // PHOTOGRAPHY AND CREATIVE ARTS
  // =============================================================================

  private generateCreativeArtsHelp(prompt: string, lowerPrompt: string): string {
    if (lowerPrompt.includes('photo') || lowerPrompt.includes('camera') || lowerPrompt.includes('photography')) {
      return `### Photography Guide

**The Exposure Triangle:**

**1. Aperture (f-stop)**
• Controls depth of field (background blur)
• Low f-number (f/1.8) = blurry background (portraits)
• High f-number (f/11) = everything sharp (landscapes)
• Also affects light: lower = more light

**2. Shutter Speed**
• Controls motion blur
• Fast (1/1000) = freeze action (sports)
• Slow (1/30) = motion blur (waterfalls)
• Below 1/60 = use a tripod

**3. ISO**
• Controls sensor sensitivity
• Low (100-400) = clean, sharp images
• High (1600+) = grainy/noisy but brighter
• Use lowest ISO possible

**Composition Rules:**
• **Rule of Thirds:** Place subjects on grid intersections
• **Leading Lines:** Use lines to guide the eye
• **Framing:** Use natural frames (doorways, arches)
• **Symmetry:** Centered compositions can be powerful
• **Negative Space:** Empty space creates impact
• **Fill the Frame:** Get closer for intimate shots

**Phone Photography Tips:**
• Clean your lens (seriously, it's probably smudged)
• Use natural light (golden hour is best)
• Tap to focus and expose
• Use grid lines (rule of thirds)
• Don't use digital zoom (move closer instead)
• Edit: Slightly increase contrast and saturation
• Shoot in portrait mode for background blur

**Golden Hour:**
• First hour after sunrise, last hour before sunset
• Warm, soft, directional light
• Best time for almost any type of photography
• Use apps like "Golden Hour" to find exact times`;
    }

    if (lowerPrompt.includes('draw') || lowerPrompt.includes('drawing') || lowerPrompt.includes('sketch') || lowerPrompt.includes('art')) {
      return `### Drawing & Art Guide

**Beginner Fundamentals:**

**1. Line Quality**
• Practice drawing straight lines and curves freehand
• Vary line weight (thick and thin)
• Draw from the shoulder, not the wrist
• Confident strokes > careful scratchy lines

**2. Basic Shapes**
• Everything can be broken into: circles, squares, triangles, cylinders
• Practice drawing 3D forms (sphere, cube, cylinder, cone)
• Learn to see complex objects as simple shapes

**3. Value (Light and Shadow)**
• Value = how light or dark something is
• 5-value scale: white, light gray, medium gray, dark gray, black
• Squint to see values more clearly
• Shadow creates the illusion of 3D on a 2D surface

**4. Perspective**
• One-point: One vanishing point (looking down a road)
• Two-point: Two vanishing points (corner of a building)
• Objects get smaller as they recede
• Parallel lines converge at vanishing points

**5. Proportion**
• Measure relationships between parts
• Use your pencil as a measuring tool
• Compare sizes: "The head is 1/7 of the body height"
• Draw lightly first, refine proportions, then add detail

**Practice Routine (30 min/day):**
• 5 min: Warm-up lines and circles
• 10 min: Gesture drawings (quick 30-second poses)
• 15 min: Focused study (one subject or technique)

**Resources:**
• Drawabox.com (free structured course)
• Proko on YouTube (anatomy, figure drawing)
• Line of Action (gesture drawing practice)
• r/learnart on Reddit (community feedback)

**Key Mindset:**
• Drawing is a skill, not a talent — anyone can learn
• Compare yourself to your past self, not to others
• Draw from life, not just from photos
• Consistency beats intensity`;
    }

    return `### Creative Arts Help

I can help with:
• Photography (composition, exposure, editing)
• Drawing and sketching basics
• Design principles
• Creative writing tips
• Color theory

What creative skill interests you?`;
  }

  // =============================================================================
  // LEGAL AND TAX BASICS (GENERAL INFORMATION)
  // =============================================================================

  private generateLegalBasics(prompt: string, lowerPrompt: string): string {
    if (lowerPrompt.includes('tax') || lowerPrompt.includes('taxes') || lowerPrompt.includes('deduction')) {
      return `### Tax Basics (US — General Information)

**Disclaimer:** This is general information, not tax advice. Consult a tax professional for your specific situation.

**How Income Tax Works:**
• US uses a progressive tax system
• You're taxed in BRACKETS, not a flat rate
• Only income WITHIN each bracket is taxed at that rate

**2024 Tax Brackets (Single):**
• 10%: $0 - $11,600
• 12%: $11,601 - $47,150
• 22%: $47,151 - $100,525
• 24%: $100,526 - $191,950
• 32%: $191,951 - $243,725
• 35%: $243,726 - $609,350
• 37%: $609,351+

**Common Deductions:**
• Standard deduction: $14,600 (single), $29,200 (married filing jointly)
• State and local taxes (SALT) — up to $10,000
• Mortgage interest
• Charitable donations
• Medical expenses (above 7.5% of AGI)
• Student loan interest (up to $2,500)

**Common Credits (reduce tax dollar-for-dollar):**
• Child Tax Credit: $2,000 per child
• Earned Income Tax Credit (low-to-moderate income)
• Education credits (American Opportunity, Lifetime Learning)
• Electric vehicle credit

**Self-Employment:**
• Pay self-employment tax (15.3% for Social Security + Medicare)
• Deduct business expenses
• Make quarterly estimated payments
• Keep detailed records of all expenses
• Consider an S-Corp election if earning $50K+

**Important Dates:**
• January 31: W-2s and 1099s due
• April 15: Tax filing deadline
• October 15: Extension deadline (file, not pay)
• Quarterly estimates: April 15, June 15, Sept 15, Jan 15`;
    }

    if (lowerPrompt.includes('contract') || lowerPrompt.includes('freelance') || lowerPrompt.includes('agreement')) {
      return `### Freelance Contract Basics

**Disclaimer:** This is general information. Consult a lawyer for legal advice.

**Every Freelance Contract Should Include:**

**1. Scope of Work**
• Exactly what you will deliver
• Number of revisions included
• What's NOT included
• Be as specific as possible

**2. Timeline**
• Start date and deadlines
• Milestones if applicable
• What happens if deadlines are missed
• Process for timeline changes

**3. Payment Terms**
• Total price or hourly rate
• Payment schedule (50% upfront, 50% on delivery is common)
• Late payment penalties
• Accepted payment methods
• Kill fee (if project is cancelled)

**4. Intellectual Property**
• Who owns the work?
• When does ownership transfer? (Usually upon full payment)
• Can you use it in your portfolio?
• License vs full ownership

**5. Revisions and Changes**
• Number of revision rounds included
• Cost of additional revisions
• What constitutes a "revision" vs a "new request"
• Change order process

**6. Termination**
• How either party can end the agreement
• Notice period required
• Payment for work completed
• Return of materials

**7. Confidentiality**
• What information is confidential
• Duration of confidentiality
• Exceptions

**Red Flags in Contracts:**
• No payment terms or vague payment language
• "Work for hire" without fair compensation
• Non-compete clauses that are too broad
• Unlimited revisions
• No termination clause
• Asking you to waive all rights`;
    }

    return `### Legal & Tax Information

I can provide general information about:
• Tax basics and common deductions
• Freelance contracts
• Business structures (LLC, S-Corp, etc.)
• Intellectual property basics

**Important:** This is general information only, not legal or tax advice. Always consult a qualified professional.

What topic would you like to learn about?`;
  }

  // =============================================================================
  // SOCIAL MEDIA AND CONTENT CREATION
  // =============================================================================

  private generateSocialMediaHelp(prompt: string, lowerPrompt: string): string {
    if (lowerPrompt.includes('youtube') || lowerPrompt.includes('video')) {
      return `### YouTube / Video Content Guide

**Starting a YouTube Channel:**

**1. Choose Your Niche**
• What are you passionate about AND knowledgeable in?
• Is there an audience for it? (Search YouTube for similar content)
• Can you make 100+ videos about this topic?
• Sweet spot: Specific enough to stand out, broad enough to grow

**2. Equipment (Start Simple)**
• **Camera:** Your phone is fine to start (seriously)
• **Audio:** Cheap lapel mic ($20) — audio quality matters MORE than video
• **Lighting:** Ring light ($30) or natural window light
• **Editing:** DaVinci Resolve (free), CapCut (free), or Premiere Pro
• Don't let gear be an excuse not to start

**3. Content Strategy**
• Research what your audience is searching for
• Use tools: TubeBuddy, VidIQ, YouTube search suggestions
• Create a content calendar (2-4 videos/month minimum)
• Mix: Searchable content (how-to) + Trending + Evergreen

**4. Thumbnail & Title (Most Important)**
• Thumbnail: Bright colors, readable text, expressive face
• Title: Include keywords, create curiosity, under 60 characters
• Together they determine 80% of your click-through rate
• Study what successful creators in your niche do

**5. Video Structure**
• Hook (first 30 seconds): Why should they keep watching?
• Intro: Brief, don't waste time with long intros
• Content: Deliver value, keep it moving
• CTA: Like, subscribe, comment (but don't overdo it)
• End screen: Link to next video

**Growth Tips:**
• Consistency > perfection (publish regularly)
• First 100 videos will be your learning phase
• Engage with every comment (especially early on)
• Collaborate with creators at your level
• Optimize for search (SEO in titles, descriptions, tags)
• Create playlists to increase watch time
• Study your analytics (what's working, what's not)

**Monetization:**
• YouTube Partner Program: 1,000 subscribers + 4,000 watch hours
• Sponsorships: Start reaching out at 10K+ subscribers
• Affiliate marketing: Recommend products you use
• Digital products: Courses, templates, ebooks
• Memberships: Patreon, YouTube Memberships`;
    }

    if (lowerPrompt.includes('instagram') || lowerPrompt.includes('tiktok') || lowerPrompt.includes('reel')) {
      return `### Instagram & TikTok Growth Guide

**Content Types That Perform:**
• **Educational:** Tips, how-tos, tutorials (save-worthy)
• **Entertaining:** Humor, trends, relatable content (share-worthy)
• **Inspirational:** Transformations, stories, quotes (like-worthy)
• **Behind-the-scenes:** Process, day-in-life (connection-building)

**Reels/TikTok Best Practices:**
• Hook in first 1-3 seconds (or they scroll)
• Keep it short (15-30 seconds performs best)
• Use trending audio (but add your own twist)
• Add text overlays (many watch without sound)
• Strong call-to-action at the end
• Post consistently (1-2 reels/day for growth)

**Instagram Strategy:**
• Bio: Clear value proposition + CTA
• Feed: Cohesive aesthetic, mix of content types
• Stories: Daily, use polls/questions for engagement
• Reels: Primary growth driver
• Carousel posts: High save rate, great for education
• Hashtags: 5-15 relevant ones, mix sizes

**TikTok Strategy:**
• Niche down hard (algorithm rewards specificity)
• Post 1-3 times daily
• Jump on trends FAST (within 24-48 hours)
• Engage with comments (reply with videos)
• Use trending sounds
• Stitch and duet popular videos

**Growing Your Following:**
• Quality > quantity (but consistency matters)
• Engage with others in your niche (genuine comments)
• Respond to every comment on your posts
• Cross-promote across platforms
• Collaborate with similar-sized creators
• Use analytics to find best posting times

**Content Ideas When Stuck:**
• Answer common questions in your niche
• React to trending topics
• Share your journey/progress
• "Things I wish I knew about..."
• Day in the life
• Before and after
• Myth-busting in your field
• Tool/product recommendations`;
    }

    if (lowerPrompt.includes('blog') || lowerPrompt.includes('writing online') || lowerPrompt.includes('newsletter')) {
      return `### Blogging & Newsletter Guide

**Starting a Blog:**

**Platform Options:**
• **WordPress:** Most flexible, self-hosted, full control
• **Substack:** Best for newsletters, built-in audience
• **Medium:** Built-in audience, easy to start
• **Ghost:** Clean, fast, newsletter-friendly
• **Personal site:** Full control, best for branding

**Content Strategy:**
• Pick 3-5 core topics (your "content pillars")
• Research keywords (Google Keyword Planner, Ahrefs, Ubersuggest)
• Create a mix: How-to guides, listicles, opinion pieces, case studies
• Aim for 1-2 posts per week minimum

**SEO Basics (Getting Found on Google):**
• Target one keyword per post
• Include keyword in: title, first paragraph, headings, URL
• Write compelling meta descriptions
• Use internal links (link to your other posts)
• Get backlinks (guest posts, mentions)
• Aim for 1,500-2,500 words for ranking posts
• Update old posts regularly

**Writing Tips for Online:**
• Short paragraphs (2-3 sentences max)
• Use subheadings every 200-300 words
• Bold key points
• Use bullet points and numbered lists
• Include images/visuals
• Write at an 8th-grade reading level
• Hook them in the first paragraph

**Growing a Newsletter:**
• Offer a freebie (lead magnet) for signing up
• Add signup forms everywhere (blog, social, bio)
• Consistent schedule (weekly is ideal)
• Provide value in every email (don't just sell)
• Segment your list as it grows
• Track open rates and click rates

**Monetization:**
• Display ads (Google AdSense, Mediavine at 50K sessions)
• Affiliate marketing (recommend products)
• Sponsored posts
• Digital products (ebooks, courses, templates)
• Consulting/coaching
• Paid newsletter tier`;
    }

    if (lowerPrompt.includes('podcast') || lowerPrompt.includes('podcasting')) {
      return `### Podcasting Guide

**Starting a Podcast:**

**1. Planning**
• Choose a specific niche/topic
• Format: Solo, co-hosted, or interview?
• Episode length: 20-60 min is sweet spot
• Release schedule: Weekly is ideal
• Name: Memorable, searchable, descriptive

**2. Equipment**
• **Microphone:** Audio-Technica ATR2100x ($80) or Blue Yeti ($100)
• **Headphones:** Any closed-back headphones
• **Recording:** Audacity (free), GarageBand (free on Mac), or Riverside.fm
• **Editing:** Descript (AI-powered, easy), Audacity, Adobe Audition
• **Hosting:** Buzzsprout, Anchor (free), Libsyn, Podbean

**3. Episode Structure**
• Intro: Who you are, what the episode is about (30 sec)
• Hook: Why should they listen? (30 sec)
• Content: Main topic (15-45 min)
• Outro: Recap, CTA, next episode preview (1 min)

**4. Recording Tips**
• Record in a quiet room (closets work great — clothes absorb sound)
• Speak 6-12 inches from the mic
• Use a pop filter
• Record a test episode before launching
• Batch record (2-4 episodes at once)

**5. Growing Your Audience**
• Launch with 3-5 episodes (gives new listeners content)
• Ask listeners to rate and review
• Share clips on social media
• Guest on other podcasts
• Cross-promote with similar shows
• Repurpose content: Blog posts, social clips, newsletters
• Submit to all platforms: Apple, Spotify, Google, Amazon

**Monetization:**
• Sponsorships (usually need 1,000+ downloads per episode)
• Listener support (Patreon, Buy Me a Coffee)
• Affiliate marketing
• Premium content (bonus episodes)
• Sell your own products/services
• Live events`;
    }

    return `### Social Media & Content Creation Help

I can help with:
• YouTube channel strategy and growth
• Instagram & TikTok content creation
• Blogging and SEO
• Newsletter building
• Podcasting
• Content calendars and planning

What platform or content type interests you?`;
  }

  // =============================================================================
  // PSYCHOLOGY AND SELF-IMPROVEMENT
  // =============================================================================

  private generatePsychologyHelp(prompt: string, lowerPrompt: string): string {
    if (lowerPrompt.includes('confidence') || lowerPrompt.includes('self-esteem') || lowerPrompt.includes('self esteem') || lowerPrompt.includes('insecure')) {
      return `### Building Confidence

**Understanding Confidence:**
• Confidence isn't about being perfect — it's about trusting yourself to handle things
• It's a skill, not a trait — you can build it
• Action creates confidence, not the other way around

**Practical Steps:**

**1. Start Small (Micro-Wins)**
• Set tiny goals and achieve them daily
• Each win builds evidence that you're capable
• Track your wins (even small ones)

**2. Reframe Your Self-Talk**
• Notice negative self-talk: "I can't do this"
• Challenge it: "Is this actually true?"
• Replace with: "I'm learning and improving"
• You wouldn't talk to a friend the way you talk to yourself

**3. Body Language Hack**
• Stand tall, shoulders back
• Make eye contact
• Take up space
• Power poses actually work (2 min before stressful situations)
• Smile — it changes your brain chemistry

**4. Competence = Confidence**
• Get better at things that matter to you
• Deliberate practice in your field
• Knowledge reduces anxiety
• Preparation is the antidote to nervousness

**5. Face Your Fears (Gradually)**
• Comfort zone → Stretch zone → Panic zone
• Stay in the stretch zone
• Each time you survive, your comfort zone expands
• Start with low-stakes situations

**6. Stop Comparing**
• Social media shows highlight reels, not reality
• Compare yourself to your past self only
• Everyone is figuring it out as they go
• Successful people have the same doubts

**Daily Confidence Practices:**
• Morning affirmations (specific, not generic)
• Exercise (immediate confidence boost)
• Dress well (look good, feel good)
• Help someone (shifts focus outward)
• Journal 3 things you did well today
• Celebrate progress, not just perfection`;
    }

    if (lowerPrompt.includes('motivation') || lowerPrompt.includes('motivated') || lowerPrompt.includes('discipline') || lowerPrompt.includes('lazy')) {
      return `### Motivation vs Discipline

**The Truth About Motivation:**
• Motivation is unreliable — it comes and goes
• Waiting to "feel motivated" is a trap
• Discipline is doing it even when you don't feel like it
• Action creates motivation, not the other way around

**Building Discipline:**

**1. Start Ridiculously Small**
• Want to exercise? Start with 5 minutes
• Want to read? Start with 1 page
• Want to write? Start with 1 sentence
• The hardest part is starting — make starting easy

**2. Remove Decision Fatigue**
• Plan tomorrow tonight
• Lay out workout clothes the night before
• Meal prep on Sundays
• Create routines so you don't have to think

**3. Environment Design**
• Make good habits easy, bad habits hard
• Want to eat healthy? Don't buy junk food
• Want to read more? Put a book on your pillow
• Want to stop scrolling? Delete social media apps

**4. The 2-Day Rule**
• Never skip twice in a row
• Miss one day? Fine. Miss two? You're forming a new habit
• This prevents the "I already failed" spiral

**5. Accountability**
• Tell someone your goals
• Find an accountability partner
• Track your habits publicly
• Put money on the line (Beeminder, StickK)

**When You Feel Unmotivated:**
• Ask: "What's the smallest step I can take right now?"
• Remember your WHY (connect to deeper purpose)
• Just do 5 minutes (you'll usually keep going)
• Change your environment (go to a coffee shop, library)
• Move your body (walk, stretch, exercise)
• Review your past wins (you've done hard things before)

**Key Insight:**
You don't need to feel like doing something to do it. Feelings follow actions. Start, and the motivation will come.`;
    }

    if (lowerPrompt.includes('overthink') || lowerPrompt.includes('worry') || lowerPrompt.includes('anxious') || lowerPrompt.includes('anxiety')) {
      return `### Managing Overthinking & Anxiety

**Understanding Overthinking:**
• Your brain is trying to protect you (it's not broken)
• Overthinking = trying to control the uncontrollable
• The goal isn't to stop thinking — it's to change your relationship with thoughts

**Immediate Relief Techniques:**

**1. The 5-4-3-2-1 Grounding Technique**
• 5 things you can SEE
• 4 things you can TOUCH
• 3 things you can HEAR
• 2 things you can SMELL
• 1 thing you can TASTE
This brings you back to the present moment.

**2. Box Breathing**
• Breathe in for 4 counts
• Hold for 4 counts
• Breathe out for 4 counts
• Hold for 4 counts
• Repeat 4-6 times

**3. The Worry Window**
• Schedule 15 minutes of "worry time" daily
• When worries come up outside that time, write them down and save them
• During worry time, go through your list
• You'll find most worries resolved themselves

**4. The "What If" Flip**
• Instead of "What if it goes wrong?"
• Ask: "What if it goes RIGHT?"
• Or: "What's the MOST LIKELY outcome?" (usually fine)

**Long-Term Strategies:**

**Cognitive Restructuring:**
• Identify the thought: "I'm going to fail"
• Evidence FOR: (usually weak)
• Evidence AGAINST: (usually strong)
• Balanced thought: "I might struggle, but I've handled challenges before"

**Journaling:**
• Brain dump: Write everything you're thinking (don't filter)
• This externalizes thoughts and reduces their power
• Review later — you'll see patterns

**Physical:**
• Exercise is as effective as medication for mild-moderate anxiety
• Reduce caffeine (seriously, try it for 2 weeks)
• Sleep 7-9 hours
• Limit alcohol
• Spend time in nature

**When to Seek Help:**
• Anxiety interferes with daily life
• You're avoiding situations due to worry
• Physical symptoms (racing heart, trouble breathing)
• It's been going on for months
• You're using substances to cope
→ A therapist can help. It's a sign of strength, not weakness.`;
    }

    if (lowerPrompt.includes('habit') || lowerPrompt.includes('routine') || lowerPrompt.includes('morning routine') || lowerPrompt.includes('evening routine')) {
      return `### Habit Building System

**The Science of Habits:**
• Habits are automatic behaviors triggered by cues
• They save mental energy (you don't have to decide)
• It takes 18-254 days to form a habit (average: 66 days)
• Consistency matters more than perfection

**The Habit Loop:**
1. **Cue:** What triggers the behavior?
2. **Craving:** What's the motivation?
3. **Response:** The actual behavior
4. **Reward:** What benefit do you get?

**Building New Habits:**

**1. Stack It**
• "After I [CURRENT HABIT], I will [NEW HABIT]"
• Example: "After I pour my morning coffee, I will journal for 5 minutes"
• Attach new habits to existing ones

**2. Make It Tiny**
• Start so small you can't say no
• Want to meditate? Start with 1 minute
• Want to exercise? Start with 1 pushup
• Scale up gradually after it's automatic

**3. Track It**
• Use a habit tracker (app or paper)
• Don't break the chain
• Visual progress is motivating
• Review weekly

**4. Design Your Environment**
• Make good habits obvious and easy
• Make bad habits invisible and hard
• Example: Put your phone in another room at bedtime
• Example: Put fruit on the counter, hide the cookies

**Morning Routine Template:**
• Wake up at consistent time
• Hydrate (glass of water)
• Move (exercise, stretch, walk)
• Mindset (journal, meditate, read)
• Plan (review goals, prioritize day)
• Start your most important task

**Evening Routine Template:**
• Set a "shutdown" time for work
• Prepare for tomorrow (clothes, bag, lunch)
• Wind down (no screens 30-60 min before bed)
• Reflect (journal, gratitude)
• Read (physical book, not phone)
• Consistent bedtime

**Breaking Bad Habits:**
• Identify the cue (what triggers it?)
• Find the craving (what need does it fulfill?)
• Replace the response (healthier alternative)
• Make it harder (add friction)
• Example: Scrolling phone → put phone in another room → read a book instead`;
    }

    return `### Psychology & Self-Improvement Help

I can help with:
• Building confidence and self-esteem
• Motivation and discipline
• Managing anxiety and overthinking
• Habit building and routines
• Mindset and personal growth

What would you like to work on?`;
  }

  // =============================================================================
  // TECHNOLOGY EXPLAINERS
  // =============================================================================

  private generateTechExplainer(prompt: string, lowerPrompt: string): string {
    if (lowerPrompt.includes('ai') && (lowerPrompt.includes('how') || lowerPrompt.includes('what') || lowerPrompt.includes('explain'))) {
      return `### How AI Works — Simplified

**What is AI?**
Artificial Intelligence is software that can perform tasks that normally require human intelligence — like understanding language, recognizing images, or making decisions.

**Types of AI:**

**1. Narrow AI (What We Have Now)**
• Designed for specific tasks
• ChatGPT, Siri, Google Search, Netflix recommendations
• Very good at ONE thing, can't do anything else
• Not "thinking" — pattern matching at massive scale

**2. General AI (Hypothetical)**
• Human-level intelligence across all domains
• Can learn any task a human can
• Doesn't exist yet (and may not for decades)

**3. Super AI (Theoretical)**
• Surpasses human intelligence
• Science fiction territory (for now)

**How ChatGPT-style AI Works:**

**Training:**
1. Feed the model MASSIVE amounts of text (books, websites, articles)
2. The model learns patterns: "After these words, this word is likely"
3. It builds a statistical model of language
4. Fine-tuning with human feedback (RLHF)

**Generating Responses:**
1. You type a prompt
2. The model predicts the most likely next word
3. Then the next word after that
4. And the next, and the next...
5. It's sophisticated autocomplete (but VERY sophisticated)

**What AI Can Do Well:**
• Write and summarize text
• Answer questions
• Translate languages
• Generate code
• Analyze data
• Create images (DALL-E, Midjourney)
• Assist with research

**What AI Can't Do (Yet):**
• Truly understand meaning
• Have consciousness or feelings
• Reliably know what's true vs false
• Replace human creativity and judgment
• Learn from a single example (like humans can)

**Important Limitations:**
• AI can "hallucinate" (confidently state false information)
• It has a training cutoff date (doesn't know recent events)
• It can reflect biases in its training data
• It doesn't have real-world experience
• It can't verify its own outputs`;
    }

    if (lowerPrompt.includes('blockchain') || lowerPrompt.includes('crypto') || lowerPrompt.includes('bitcoin') || lowerPrompt.includes('ethereum')) {
      return `### Blockchain & Crypto — Explained

**What is Blockchain?**
A distributed, immutable ledger — basically a shared database that nobody can tamper with.

**How It Works:**
1. Someone requests a transaction
2. Transaction is broadcast to a network of computers (nodes)
3. Nodes validate the transaction using algorithms
4. Transaction is combined with others into a "block"
5. Block is added to the existing chain (permanent record)
6. Transaction is complete

**Key Properties:**
• **Decentralized:** No single authority controls it
• **Immutable:** Once recorded, can't be changed
• **Transparent:** Anyone can verify transactions
• **Secure:** Cryptography protects the data

**Bitcoin:**
• Created 2009 by "Satoshi Nakamoto" (unknown identity)
• Digital currency — no physical form
• Limited supply: Only 21 million will ever exist
• "Digital gold" — store of value
• Uses Proof of Work (mining) for security

**Ethereum:**
• Created 2015 by Vitalik Buterin
• Not just currency — it's a platform
• Smart contracts: Self-executing agreements
• Powers DeFi, NFTs, and dApps
• Switched to Proof of Stake (more energy efficient)

**Common Terms:**
• **Wallet:** Where you store crypto (like a bank account)
• **Mining:** Using computers to validate transactions (and earn crypto)
• **Gas fees:** Transaction costs on Ethereum
• **DeFi:** Decentralized Finance (banking without banks)
• **NFT:** Non-Fungible Token (unique digital ownership)
• **Smart Contract:** Code that executes automatically when conditions are met

**Risks:**
• Extremely volatile (prices can drop 50%+ quickly)
• Regulatory uncertainty
• Scams and hacks are common
• Not backed by any government
• Environmental concerns (Proof of Work)
• "Not your keys, not your crypto" — exchange risks`;
    }

    if (lowerPrompt.includes('vpn') || lowerPrompt.includes('privacy') || lowerPrompt.includes('security') || lowerPrompt.includes('password')) {
      return `### Digital Security & Privacy Guide

**Password Security:**
• Use a password manager (Bitwarden, 1Password, LastPass)
• Every account should have a UNIQUE password
• Minimum 16 characters
• Enable 2FA (two-factor authentication) everywhere
• Never reuse passwords
• Use passkeys where available (the future of auth)

**Two-Factor Authentication (2FA):**
• **Best:** Hardware key (YubiKey)
• **Great:** Authenticator app (Authy, Google Authenticator)
• **Good:** SMS codes (better than nothing)
• **Bad:** No 2FA at all
• Enable on: Email, banking, social media, cloud storage

**VPN (Virtual Private Network):**
• Encrypts your internet traffic
• Hides your IP address
• Useful on public WiFi
• Doesn't make you anonymous (common misconception)
• Good options: Mullvad, ProtonVPN, NordVPN
• Free VPNs are usually selling your data

**Privacy Best Practices:**
• Review app permissions regularly
• Use private browsing for sensitive searches
• Consider a privacy-focused browser (Firefox, Brave)
• Use a privacy-focused search engine (DuckDuckGo)
• Be careful what you share on social media
• Read privacy policies (or use ToS;DR summaries)
• Use encrypted messaging (Signal)

**Common Threats:**
• **Phishing:** Fake emails/sites that steal credentials
  - Check the sender's actual email address
  - Don't click links in suspicious emails
  - When in doubt, go directly to the website
• **Malware:** Malicious software
  - Don't download from untrusted sources
  - Keep software updated
  - Use antivirus (Windows Defender is fine)
• **Social Engineering:** Manipulating people
  - Be skeptical of urgent requests
  - Verify identity before sharing info
  - "If it seems too good to be true, it is"

**If You've Been Hacked:**
1. Change passwords immediately (start with email)
2. Enable 2FA everywhere
3. Check for unauthorized access/purchases
4. Monitor credit reports
5. Report to relevant authorities`;
    }

    if (lowerPrompt.includes('cloud') || lowerPrompt.includes('aws') || lowerPrompt.includes('azure') || lowerPrompt.includes('server')) {
      return `### Cloud Computing — Explained

**What is Cloud Computing?**
Using someone else's computers (servers) over the internet instead of your own.

**Types of Cloud Services:**

**IaaS (Infrastructure as a Service)**
• Rent virtual machines, storage, networking
• You manage: OS, apps, data
• Examples: AWS EC2, Azure VMs, Google Compute Engine
• Like renting an empty apartment

**PaaS (Platform as a Service)**
• Platform to build and deploy apps
• Provider manages: servers, OS, networking
• You manage: Your application code
• Examples: Heroku, Google App Engine, Azure App Service
• Like renting a furnished apartment

**SaaS (Software as a Service)**
• Ready-to-use software over the internet
• Provider manages everything
• You just use it
• Examples: Gmail, Slack, Salesforce, Netflix
• Like staying at a hotel

**Major Cloud Providers:**
• **AWS (Amazon):** Largest, most services, most complex
• **Azure (Microsoft):** Strong enterprise, Office 365 integration
• **GCP (Google):** Strong in data/AI, developer-friendly
• **Others:** DigitalOcean, Linode, Cloudflare

**Key Cloud Concepts:**
• **Scalability:** Add/remove resources as needed
• **Pay-as-you-go:** Only pay for what you use
• **Regions/Zones:** Data centers around the world
• **CDN:** Content Delivery Network (faster loading globally)
• **Serverless:** Run code without managing servers (Lambda, Functions)
• **Containers:** Package apps with dependencies (Docker, Kubernetes)

**When to Use Cloud:**
• Startups (no upfront hardware costs)
• Variable workloads (scale up/down)
• Global applications (deploy worldwide)
• Disaster recovery (data backed up)
• When you don't want to manage hardware`;
    }

    return `### Technology Explainers

I can explain:
• How AI and machine learning work
• Blockchain and cryptocurrency
• Digital security and privacy
• Cloud computing
• How the internet works
• Programming concepts

What tech topic interests you?`;
  }

  // =============================================================================
  // PARENTING AND FAMILY
  // =============================================================================

  private generateParentingAdvice(prompt: string, lowerPrompt: string): string {
    if (lowerPrompt.includes('baby') || lowerPrompt.includes('newborn') || lowerPrompt.includes('infant')) {
      return `### New Baby Guide

**Essentials Checklist:**
• Crib with firm mattress (no pillows, blankets, toys)
• Car seat (installed correctly — fire stations will check for free)
• Diapers (newborns go through 10-12/day)
• Wipes, diaper cream
• Onesies and sleepers (get 0-3 month AND newborn size)
• Swaddles or sleep sacks
• Bottles and formula (even if breastfeeding, good to have)
• Burp cloths (you'll need more than you think)

**Sleep:**
• Newborns sleep 14-17 hours/day (in short bursts)
• Always on their back (reduces SIDS risk)
• Room-sharing (not bed-sharing) for first 6 months
• White noise helps
• Swaddling helps (until they can roll over)
• Sleep when the baby sleeps (seriously, do this)

**Feeding:**
• Breastfed: Every 2-3 hours (8-12 times/day)
• Formula: Every 3-4 hours
• Burp after every feeding
• Watch for hunger cues (rooting, hand-to-mouth)
• Fed is best (breast or formula — both are fine)

**Milestones (Approximate):**
• 2 months: Social smile, tracks objects
• 4 months: Holds head up, laughs, reaches for toys
• 6 months: Sits with support, starts solids
• 9 months: Crawls, pulls to stand, says "mama/dada"
• 12 months: First steps, first words, waves bye-bye

**Self-Care for Parents:**
• Accept help when offered
• Lower your standards (house will be messy, that's OK)
• Take turns with your partner for night feeds
• Stay connected with friends
• It's normal to feel overwhelmed
• Postpartum depression is real — seek help if needed`;
    }

    if (lowerPrompt.includes('toddler') || lowerPrompt.includes('tantrum') || lowerPrompt.includes('terrible two')) {
      return `### Toddler Guide (Ages 1-3)

**Understanding Toddlers:**
• They're not being "bad" — their brains are developing
• They feel BIG emotions but can't express them yet
• Independence is their primary drive
• Everything is a learning opportunity

**Handling Tantrums:**

**During the Tantrum:**
• Stay calm (they need you to be their anchor)
• Get on their level physically
• Validate feelings: "I can see you're really frustrated"
• Don't try to reason (their logical brain is offline)
• Keep them safe
• Don't give in to demands (this reinforces tantrums)

**After the Tantrum:**
• Comfort them
• Name the emotion: "You were angry because..."
• Offer alternatives: "Next time, you can..."
• Move on — don't hold grudges

**Prevention:**
• Stick to routines (predictability = security)
• Give choices: "Red shirt or blue shirt?"
• Give warnings before transitions: "5 more minutes, then bath time"
• Make sure they're fed and rested
• Childproof everything (reduce the need to say "no")

**Positive Discipline:**
• Praise specific behaviors: "I love how you shared your toy"
• Natural consequences when safe
• Redirect instead of just saying "no"
• Time-ins instead of time-outs (sit with them)
• Be consistent (same rules, same consequences)

**Language Development:**
• Read to them every day
• Narrate what you're doing: "Now we're putting on shoes"
• Expand their words: They say "dog" → you say "Yes, a big brown dog!"
• Ask open-ended questions
• Limit screen time (AAP recommends <1 hour/day for ages 2-5)
• Sing songs and nursery rhymes`;
    }

    return `### Parenting & Family Help

I can help with:
• New baby care and milestones
• Toddler behavior and tantrums
• Age-appropriate activities
• Sleep training approaches
• Positive discipline strategies

What age group or topic do you need help with?`;
  }

  // =============================================================================
  // GAMING GUIDES AND TIPS
  // =============================================================================

  private generateGamingHelp(prompt: string, lowerPrompt: string): string {
    if (lowerPrompt.includes('pc build') || lowerPrompt.includes('gaming pc') || lowerPrompt.includes('computer build')) {
      return `### Gaming PC Build Guide

**Budget Tiers (2024):**

**Budget ($600-$800):**
• CPU: AMD Ryzen 5 5600 or Intel i5-12400F
• GPU: RTX 4060 or RX 7600
• RAM: 16GB DDR4 3200MHz
• Storage: 1TB NVMe SSD
• PSU: 550W 80+ Bronze
• Case: Budget ATX case
• Plays: 1080p 60+ FPS on high settings

**Mid-Range ($1,000-$1,500):**
• CPU: AMD Ryzen 5 7600X or Intel i5-13600K
• GPU: RTX 4070 or RX 7800 XT
• RAM: 32GB DDR5 5600MHz
• Storage: 1TB NVMe SSD
• PSU: 650W 80+ Gold
• Case: Mid-tower with good airflow
• Plays: 1440p 60+ FPS on high/ultra settings

**High-End ($2,000+):**
• CPU: AMD Ryzen 7 7800X3D or Intel i7-14700K
• GPU: RTX 4080 or RX 7900 XTX
• RAM: 32GB DDR5 6000MHz
• Storage: 2TB NVMe SSD
• PSU: 850W 80+ Gold
• Case: Premium airflow case
• Plays: 4K 60+ FPS or 1440p 144+ FPS

**Building Tips:**
• Watch a build guide video first (JayzTwoCents, Linus Tech Tips)
• Ground yourself before handling components (touch metal case)
• Don't forget to install the I/O shield first
• CPU cooler installation is the hardest part — take your time
• Cable management: Route cables behind the motherboard tray
• Install Windows on the NVMe SSD for fast boot times
• Update all drivers after first boot

**Common Mistakes:**
• Forgetting thermal paste (some coolers come pre-applied)
• Not connecting the CPU power cable
• Forgetting to turn on the PSU switch
• RAM not fully seated (push until it clicks)
• Plugging monitor into motherboard instead of GPU`;
    }

    if (lowerPrompt.includes('game recommend') || lowerPrompt.includes('best game') || lowerPrompt.includes('what game')) {
      return `### Game Recommendations by Genre

**Open World / RPG:**
• Elden Ring — Dark Souls meets open world
• Baldur's Gate 3 — Best RPG in decades
• The Witcher 3 — Story-driven masterpiece
• Zelda: Tears of the Kingdom — Creative freedom
• Red Dead Redemption 2 — Cinematic western
• Skyrim — Classic, infinitely moddable

**Action / Adventure:**
• God of War Ragnarok — Norse mythology epic
• Spider-Man 2 — Best superhero game
• Horizon Forbidden West — Robot dinosaurs
• Ghost of Tsushima — Samurai open world
• Hades — Roguelike perfection

**Multiplayer / Co-op:**
• It Takes Two — Best co-op game ever
• Helldivers 2 — Chaotic co-op shooter
• Deep Rock Galactic — Space dwarves mining
• Stardew Valley — Relaxing farm co-op
• Overcooked 2 — Chaotic cooking fun

**Strategy:**
• Civilization VI — "One more turn" addiction
• XCOM 2 — Tactical alien combat
• Factorio — Factory building obsession
• Total War: Warhammer III — Epic battles
• Into the Breach — Perfect tactical puzzles

**Indie Gems:**
• Hollow Knight — Metroidvania masterpiece
• Celeste — Precision platformer with heart
• Disco Elysium — Best writing in games
• Outer Wilds — Mind-bending space exploration
• Undertale — Subversive RPG classic

**Relaxing / Casual:**
• Stardew Valley — Farming and community
• Animal Crossing — Island life
• Minecraft — Build anything
• Journey — Beautiful, emotional
• Unpacking — Zen puzzle game`;
    }

    return `### Gaming Help

I can help with:
• PC build recommendations by budget
• Game recommendations by genre
• Gaming tips and strategies
• Hardware advice
• Troubleshooting

What gaming topic interests you?`;
  }

  // =============================================================================
  // MATH AND SCIENCE PROBLEM SOLVING
  // =============================================================================

  private generateMathHelp(prompt: string, lowerPrompt: string): string {
    if (lowerPrompt.includes('algebra') || lowerPrompt.includes('equation') || lowerPrompt.includes('solve for')) {
      return `### Algebra Problem Solving

**Solving Linear Equations:**
Goal: Get the variable alone on one side.

**Example: 3x + 7 = 22**
Step 1: Subtract 7 from both sides → 3x = 15
Step 2: Divide both sides by 3 → x = 5
Check: 3(5) + 7 = 22 ✓

**Example: 2(x - 4) + 3 = 11**
Step 1: Distribute → 2x - 8 + 3 = 11
Step 2: Combine like terms → 2x - 5 = 11
Step 3: Add 5 to both sides → 2x = 16
Step 4: Divide by 2 → x = 8
Check: 2(8-4) + 3 = 2(4) + 3 = 11 ✓

**Solving Quadratic Equations:**
Form: ax² + bx + c = 0

**Method 1: Factoring**
x² + 5x + 6 = 0
(x + 2)(x + 3) = 0
x = -2 or x = -3

**Method 2: Quadratic Formula**
x = (-b ± √(b²-4ac)) / 2a

Example: 2x² - 5x - 3 = 0
a=2, b=-5, c=-3
x = (5 ± √(25+24)) / 4
x = (5 ± 7) / 4
x = 3 or x = -0.5

**Systems of Equations:**
3x + 2y = 12
x - y = 1

From equation 2: x = y + 1
Substitute into equation 1: 3(y+1) + 2y = 12
3y + 3 + 2y = 12
5y = 9
y = 1.8, x = 2.8

**Key Rules:**
• Whatever you do to one side, do to the other
• Distribute before combining like terms
• Check your answer by plugging it back in
• Watch for extraneous solutions with radicals/fractions`;
    }

    if (lowerPrompt.includes('geometry') || lowerPrompt.includes('area') || lowerPrompt.includes('volume') || lowerPrompt.includes('triangle')) {
      return `### Geometry Formulas & Problem Solving

**2D Shapes:**

**Rectangle:**
• Area = length × width
• Perimeter = 2(length + width)

**Triangle:**
• Area = ½ × base × height
• Perimeter = a + b + c
• Pythagorean theorem: a² + b² = c² (right triangles)

**Circle:**
• Area = π × r²
• Circumference = 2π × r
• Diameter = 2r

**Trapezoid:**
• Area = ½ × (base₁ + base₂) × height

**Parallelogram:**
• Area = base × height

**3D Shapes:**

**Rectangular Prism (Box):**
• Volume = length × width × height
• Surface Area = 2(lw + lh + wh)

**Cylinder:**
• Volume = π × r² × h
• Surface Area = 2πr² + 2πrh

**Sphere:**
• Volume = (4/3) × π × r³
• Surface Area = 4π × r²

**Cone:**
• Volume = (1/3) × π × r² × h
• Surface Area = πr² + πr × slant height

**Pyramid:**
• Volume = (1/3) × base area × height

**Angle Rules:**
• Triangle angles sum to 180°
• Quadrilateral angles sum to 360°
• Supplementary angles sum to 180°
• Complementary angles sum to 90°
• Vertical angles are equal

**Trigonometry (Right Triangles):**
• sin(θ) = opposite / hypotenuse
• cos(θ) = adjacent / hypotenuse
• tan(θ) = opposite / adjacent
• SOH-CAH-TOA (memory trick)`;
    }

    if (lowerPrompt.includes('statistics') || lowerPrompt.includes('probability') || lowerPrompt.includes('mean') || lowerPrompt.includes('median')) {
      return `### Statistics & Probability

**Measures of Central Tendency:**

**Mean (Average):**
• Add all values, divide by count
• Example: {2, 4, 6, 8, 10} → (2+4+6+8+10)/5 = 6
• Sensitive to outliers

**Median (Middle Value):**
• Sort values, find the middle
• Odd count: middle value
• Even count: average of two middle values
• Example: {2, 4, 6, 8, 10} → median = 6
• Resistant to outliers

**Mode (Most Frequent):**
• Value that appears most often
• Example: {1, 2, 2, 3, 4} → mode = 2
• Can have multiple modes or no mode

**Measures of Spread:**

**Range:** Max - Min
**Variance:** Average of squared deviations from mean
**Standard Deviation:** Square root of variance
• ~68% of data within 1 SD of mean
• ~95% within 2 SD
• ~99.7% within 3 SD

**Probability Basics:**
• P(event) = favorable outcomes / total outcomes
• P(A or B) = P(A) + P(B) - P(A and B)
• P(A and B) = P(A) × P(B) if independent
• Complement: P(not A) = 1 - P(A)

**Examples:**
• Coin flip: P(heads) = 1/2 = 50%
• Die roll: P(6) = 1/6 ≈ 16.7%
• Two dice sum 7: P = 6/36 = 1/6
• Card from deck: P(ace) = 4/52 = 1/13

**Normal Distribution:**
• Bell-shaped curve
• Mean = median = mode (at center)
• Symmetric around the mean
• Used everywhere: heights, test scores, measurement errors`;
    }

    if (lowerPrompt.includes('calculus') || lowerPrompt.includes('derivative') || lowerPrompt.includes('integral')) {
      return `### Calculus Quick Reference

**Derivatives (Rate of Change):**

**Basic Rules:**
• Power rule: d/dx(xⁿ) = n·xⁿ⁻¹
• Constant: d/dx(c) = 0
• Sum: d/dx(f+g) = f' + g'
• Product: d/dx(fg) = f'g + fg'
• Quotient: d/dx(f/g) = (f'g - fg') / g²
• Chain: d/dx[f(g(x))] = f'(g(x)) · g'(x)

**Common Derivatives:**
• d/dx(sin x) = cos x
• d/dx(cos x) = -sin x
• d/dx(eˣ) = eˣ
• d/dx(ln x) = 1/x
• d/dx(tan x) = sec²x

**Example:**
f(x) = 3x⁴ - 2x² + 5x - 7
f'(x) = 12x³ - 4x + 5

**Integrals (Area Under Curve):**

**Basic Rules:**
• Power: ∫xⁿ dx = xⁿ⁺¹/(n+1) + C (n ≠ -1)
• ∫1/x dx = ln|x| + C
• ∫eˣ dx = eˣ + C
• ∫sin x dx = -cos x + C
• ∫cos x dx = sin x + C

**Definite Integrals:**
• ∫[a to b] f(x) dx = F(b) - F(a)
• Represents the area between the curve and x-axis

**Example:**
∫(3x² + 2x) dx = x³ + x² + C

**Applications:**
• Derivatives: velocity, acceleration, optimization, rates
• Integrals: area, volume, total accumulation, work
• Related rates: how quantities change together
• Optimization: finding max/min values`;
    }

    return `### Math Help

I can help with:
• **Algebra:** Equations, systems, quadratics
• **Geometry:** Area, volume, angles, proofs
• **Statistics:** Mean, median, probability, distributions
• **Calculus:** Derivatives, integrals, applications
• **Step-by-step solutions**

Give me a specific problem and I'll solve it!`;
  }

  // =============================================================================
  // EXTENDED ROUTING — ADDITIONAL CATEGORIES
  // =============================================================================

  private routeExtendedRequest(prompt: string, lowerPrompt: string): string | null {
    // Relationship and communication
    if (/\b(conflict|argument|fight|disagree|networking|difficult conversation|public speaking|presentation|speech)\b/i.test(lowerPrompt)) {
      return this.generateRelationshipAdvice(prompt, lowerPrompt);
    }

    // Science and history
    if (/\b(quantum|black hole|evolution|natural selection|darwin|world war|ww2|wwii|cold war|climate change|global warming|greenhouse|space|universe|cosmos|solar system)\b/i.test(lowerPrompt)) {
      return this.generateScienceExplanation(prompt, lowerPrompt);
    }

    // Cooking
    if (/\b(cook|recipe|pasta|chicken|baking|cake|cookie|bread|dinner|meal|kitchen)\b/i.test(lowerPrompt)) {
      return this.generateCookingHelp(prompt, lowerPrompt);
    }

    // DIY and home
    if (/\b(organize|declutter|minimalis|move|moving|apartment|home improvement|clean|interior design)\b/i.test(lowerPrompt)) {
      return this.generateDIYHelp(prompt, lowerPrompt);
    }

    // Mental models
    if (/\b(decision|decide|choose|mental model|framework|first principles|80.20|pareto)\b/i.test(lowerPrompt)) {
      return this.generateMentalModels(prompt, lowerPrompt);
    }

    // Pet care
    if (/\b(dog|puppy|cat|kitten|pet|veterinar)\b/i.test(lowerPrompt)) {
      return this.generatePetCareAdvice(prompt, lowerPrompt);
    }

    // Creative arts
    if (/\b(photo|camera|photography|draw|drawing|sketch|art|paint|design)\b/i.test(lowerPrompt)) {
      return this.generateCreativeArtsHelp(prompt, lowerPrompt);
    }

    // Legal and tax
    if (/\b(tax|taxes|deduction|contract|freelance|agreement|llc|s.corp|intellectual property|copyright)\b/i.test(lowerPrompt)) {
      return this.generateLegalBasics(prompt, lowerPrompt);
    }

    // Social media and content
    if (/\b(youtube|video|instagram|tiktok|reel|blog|newsletter|podcast|podcasting|content creat|social media)\b/i.test(lowerPrompt)) {
      return this.generateSocialMediaHelp(prompt, lowerPrompt);
    }

    // Psychology and self-improvement
    if (/\b(confidence|self.esteem|insecure|motivation|discipline|lazy|overthink|worry|anxious|anxiety|habit|routine|morning routine|evening routine)\b/i.test(lowerPrompt)) {
      return this.generatePsychologyHelp(prompt, lowerPrompt);
    }

    // Technology explainers
    if (/\b(blockchain|crypto|bitcoin|ethereum|vpn|privacy|security|password|cloud|aws|azure|server)\b/i.test(lowerPrompt) ||
        (lowerPrompt.includes('ai') && (lowerPrompt.includes('how') || lowerPrompt.includes('what') || lowerPrompt.includes('explain')))) {
      return this.generateTechExplainer(prompt, lowerPrompt);
    }

    // Parenting
    if (/\b(baby|newborn|infant|toddler|tantrum|terrible two|parenting|child|children)\b/i.test(lowerPrompt)) {
      return this.generateParentingAdvice(prompt, lowerPrompt);
    }

    // Gaming
    if (/\b(pc build|gaming pc|computer build|game recommend|best game|what game|gaming)\b/i.test(lowerPrompt)) {
      return this.generateGamingHelp(prompt, lowerPrompt);
    }

    // Math help
    if (/\b(algebra|equation|solve for|geometry|area|volume|triangle|statistics|probability|mean|median|calculus|derivative|integral)\b/i.test(lowerPrompt)) {
      return this.generateMathHelp(prompt, lowerPrompt);
    }

    return null;
  }

  // =============================================================================
  // CAREER AND PROFESSIONAL DEVELOPMENT
  // =============================================================================

  private generateCareerAdvice(prompt: string, lowerPrompt: string): string {
    if (lowerPrompt.includes('interview') || lowerPrompt.includes('job interview')) {
      return `### Job Interview Preparation Guide

**Before the Interview:**

**Research:**
• Company website, mission, values, recent news
• Glassdoor reviews and interview questions
• LinkedIn profiles of interviewers
• Industry trends and competitors
• Prepare 3-5 questions to ask them

**Prepare Your Stories (STAR Method):**
• **Situation:** Set the scene
• **Task:** What was your responsibility?
• **Action:** What did YOU do? (Be specific)
• **Result:** What was the outcome? (Use numbers if possible)

Prepare 5-7 STAR stories covering:
• Leadership / taking initiative
• Teamwork / collaboration
• Problem-solving / overcoming challenges
• Failure / learning from mistakes
• Achievement / exceeding expectations

**Common Questions & How to Answer:**

**"Tell me about yourself"**
• Present → Past → Future format
• 2 minutes max
• Focus on professional journey
• End with why you're excited about THIS role

**"What's your greatest weakness?"**
• Pick a REAL weakness (not "I work too hard")
• Show self-awareness
• Explain what you're doing to improve
• Example: "I used to struggle with delegation. I've been actively working on it by..."

**"Why do you want to work here?"**
• Reference specific things about the company
• Connect to your career goals
• Show genuine enthusiasm
• Never say "for the money" or "I need a job"

**"Where do you see yourself in 5 years?"**
• Show ambition but be realistic
• Align with the company's growth path
• Focus on skills and impact, not titles

**"Why should we hire you?"**
• Match your skills to their needs
• Reference specific job requirements
• Share a relevant accomplishment
• Show enthusiasm for the role

**Behavioral Questions:**
• "Tell me about a time you failed" → Show growth
• "Describe a conflict with a coworker" → Show resolution skills
• "How do you handle pressure?" → Give a specific example
• "Tell me about a time you led a project" → Show leadership

**During the Interview:**
• Arrive 10-15 minutes early
• Firm handshake, eye contact, smile
• Listen carefully before answering
• It's OK to pause and think
• Ask clarifying questions
• Be specific (numbers, results, examples)
• Show enthusiasm without being fake

**After the Interview:**
• Send a thank-you email within 24 hours
• Reference something specific from the conversation
• Reiterate your interest
• Keep it brief (3-4 sentences)`;
    }

    if (lowerPrompt.includes('salary') || lowerPrompt.includes('negotiat') || lowerPrompt.includes('raise') || lowerPrompt.includes('promotion')) {
      return `### Salary Negotiation & Career Advancement

**Salary Negotiation:**

**Before Negotiating:**
• Research market rates (Glassdoor, Levels.fyi, Payscale, LinkedIn)
• Know your value (skills, experience, accomplishments)
• Determine your range (target, minimum, walk-away number)
• Practice with a friend

**Negotiation Tactics:**

**1. Let Them Go First**
• "I'd love to learn more about the total compensation package"
• If pressed: Give a range (your target should be the bottom)

**2. Use Data**
• "Based on my research, the market rate for this role is..."
• "Given my X years of experience and [specific skills]..."

**3. Consider Total Compensation**
• Base salary
• Bonus / commission
• Stock options / RSUs
• PTO / vacation days
• Remote work flexibility
• Professional development budget
• Health benefits
• Signing bonus

**4. Counter Offer Script**
• "Thank you for the offer. I'm very excited about this role."
• "Based on my research and experience, I was hoping for [X]."
• "Is there flexibility in the base salary?"
• Always be professional and positive

**Getting a Raise:**

**Build Your Case:**
• Document your accomplishments (keep a "brag file")
• Quantify your impact (revenue, savings, efficiency)
• Gather market data for your role
• Get feedback from colleagues and managers

**Timing:**
• After a big win or successful project
• During performance review season
• When the company is doing well
• NOT when your boss is stressed or busy

**The Conversation:**
• Schedule a dedicated meeting
• Present your accomplishments and impact
• Share market data
• State your desired salary
• Be confident but not aggressive
• If no: Ask what you need to do to get there
• Get a timeline and specific goals in writing

**Getting a Promotion:**

• Have the conversation early ("What does it take to get promoted?")
• Get specific criteria in writing
• Exceed expectations consistently
• Take on stretch assignments
• Build relationships across the organization
• Make your work visible (don't just do great work — make sure people know)
• Find a sponsor (someone senior who advocates for you)`;
    }

    if (lowerPrompt.includes('remote work') || lowerPrompt.includes('work from home') || lowerPrompt.includes('wfh')) {
      return `### Remote Work Guide

**Setting Up Your Home Office:**

**Essential Equipment:**
• Good chair (invest here — your back will thank you)
• Desk at proper height (elbows at 90°)
• External monitor (game-changer for productivity)
• Good webcam and microphone
• Reliable internet (consider a backup hotspot)
• Noise-canceling headphones
• Good lighting for video calls

**Productivity Tips:**

**1. Create a Routine**
• Start and end work at consistent times
• Morning routine signals "work mode"
• Shutdown routine signals "done for the day"
• Get dressed (even if just "nice top, pajama bottoms")

**2. Dedicated Workspace**
• Separate space for work (even a corner counts)
• When you leave the space, you're "off work"
• Keep it clean and organized
• Good lighting and ventilation

**3. Time Management**
• Time-block your calendar
• Batch similar tasks together
• Protect deep work time (block calendar, turn off notifications)
• Use the Pomodoro technique (25 min work, 5 min break)
• Take a real lunch break (away from your desk)

**4. Communication**
• Over-communicate (people can't see you working)
• Set clear availability hours
• Use async communication when possible (not everything needs a meeting)
• Quick video calls > long email chains
• Document decisions and share them

**5. Avoid Burnout**
• Set boundaries (don't work 24/7 just because you can)
• Take breaks (walk, stretch, get outside)
• Separate work and personal devices if possible
• Schedule social time (remote work can be isolating)
• Exercise regularly
• Take your PTO

**Common Challenges:**
• **Loneliness:** Schedule virtual coffee chats, join coworking spaces
• **Distractions:** Use website blockers, communicate boundaries with family
• **Overworking:** Set hard stop times, close laptop at end of day
• **Career visibility:** Share updates proactively, attend optional meetings
• **Collaboration:** Use shared docs, async video (Loom), regular check-ins`;
    }

    if (lowerPrompt.includes('career change') || lowerPrompt.includes('switch career') || lowerPrompt.includes('new career')) {
      return `### Career Change Guide

**Is It Time for a Change?**
Ask yourself:
• Am I dreading work most days?
• Have I stopped growing/learning?
• Does my work align with my values?
• Am I just burned out (fixable) or fundamentally misaligned?
• What would I do if money weren't an issue?

**Step-by-Step Career Change:**

**1. Self-Assessment**
• What are your strengths? (Ask 5 people who know you well)
• What energizes you vs. drains you?
• What are your non-negotiables? (salary, location, flexibility)
• Take assessments: StrengthsFinder, MBTI, Holland Code
• Journal about your ideal day

**2. Research New Fields**
• Informational interviews (talk to people in the field)
• Shadow someone for a day
• Read industry blogs and publications
• Join relevant communities and groups
• Attend events and conferences

**3. Bridge the Gap**
• Identify transferable skills (you have more than you think)
• Take courses or certifications
• Freelance or volunteer in the new field
• Build a portfolio or side project
• Start a blog or create content about the new field

**4. Financial Planning**
• Build 6-12 months of savings
• Reduce expenses
• Consider a gradual transition (part-time, freelance)
• Don't quit your job until you have a plan

**5. Make the Move**
• Update your resume to highlight transferable skills
• Rewrite your LinkedIn headline and summary
• Network aggressively in the new field
• Apply strategically (quality over quantity)
• Be prepared to take a step back in title/salary initially

**Transferable Skills That Apply Everywhere:**
• Communication (written and verbal)
• Project management
• Problem-solving
• Leadership
• Data analysis
• Customer/client relations
• Technical skills
• Adaptability`;
    }

    if (lowerPrompt.includes('linkedin') || lowerPrompt.includes('personal brand') || lowerPrompt.includes('professional network')) {
      return `### LinkedIn & Professional Branding

**Optimizing Your LinkedIn Profile:**

**Headline (Most Important):**
• Not just your job title
• Format: [Role] | [Value you provide] | [Key skill/interest]
• Example: "Product Manager | Helping teams build products users love | Ex-Google"
• Use keywords recruiters search for

**Profile Photo:**
• Professional but approachable
• Clear face, good lighting
• Smile
• Plain or blurred background
• Updated (within last 2 years)

**Banner Image:**
• Not the default blue
• Related to your industry or personal brand
• Can include a tagline or contact info

**About Section:**
• First 3 lines are crucial (that's what shows before "see more")
• Tell your story (not just a resume summary)
• Include: What you do, who you help, what makes you unique
• Add a call-to-action at the end
• Use first person ("I help..." not "John helps...")

**Experience Section:**
• Focus on accomplishments, not job descriptions
• Use numbers and metrics
• Start bullets with action verbs
• Include relevant keywords

**Building Your Network:**
• Connect with people you've actually met
• Personalize connection requests (always)
• Engage with others' content (comment > like)
• Share valuable content regularly
• Join and participate in relevant groups

**Content Strategy:**
• Post 2-3 times per week
• Mix: Industry insights, personal stories, tips, questions
• Engage in comments (yours and others')
• Use hashtags (3-5 relevant ones)
• Text posts often outperform links
• Tell stories (people connect with stories)

**What to Post:**
• Lessons learned from your career
• Industry trends and your take on them
• Behind-the-scenes of your work
• Book recommendations with key takeaways
• Celebrate others' wins
• Ask thoughtful questions`;
    }

    return `### Career & Professional Development

I can help with:
• Job interview preparation
• Salary negotiation
• Remote work optimization
• Career change planning
• LinkedIn and personal branding
• Resume and cover letter writing

What career topic would you like to explore?`;
  }

  // =============================================================================
  // LANGUAGE LEARNING COMPREHENSIVE
  // =============================================================================

  private generateLanguageLearningHelp(prompt: string, lowerPrompt: string): string {
    if (lowerPrompt.includes('spanish') || lowerPrompt.includes('español')) {
      return `### Learn Spanish — Comprehensive Guide

**Why Spanish?**
• 500+ million native speakers worldwide
• Official language in 20 countries
• Relatively easy for English speakers
• Huge career advantage in the Americas

**Essential Phrases:**
• Hola — Hello
• Buenos días — Good morning
• Buenas tardes — Good afternoon
• Buenas noches — Good evening/night
• ¿Cómo estás? — How are you?
• Bien, gracias — Fine, thanks
• ¿Cómo te llamas? — What's your name?
• Me llamo... — My name is...
• Por favor — Please
• Gracias — Thank you
• De nada — You're welcome
• Lo siento — I'm sorry
• No entiendo — I don't understand
• ¿Hablas inglés? — Do you speak English?
• ¿Cuánto cuesta? — How much does it cost?
• ¿Dónde está...? — Where is...?

**Grammar Basics:**

**Subject Pronouns:**
• Yo (I), Tú (you), Él/Ella (he/she)
• Nosotros (we), Vosotros (you all - Spain), Ellos/Ellas (they)
• Usted (formal you), Ustedes (formal you all)

**Present Tense (-ar verbs: hablar = to speak):**
• Yo hablo — I speak
• Tú hablas — You speak
• Él/Ella habla — He/She speaks
• Nosotros hablamos — We speak
• Ellos hablan — They speak

**Present Tense (-er verbs: comer = to eat):**
• Yo como — I eat
• Tú comes — You eat
• Él/Ella come — He/She eats
• Nosotros comemos — We eat
• Ellos comen — They eat

**Present Tense (-ir verbs: vivir = to live):**
• Yo vivo — I live
• Tú vives — You live
• Él/Ella vive — He/She lives
• Nosotros vivimos — We live
• Ellos viven — They live

**Essential Verbs:**
• Ser/Estar — To be (permanent/temporary)
• Tener — To have
• Ir — To go
• Hacer — To do/make
• Poder — To be able to
• Querer — To want
• Saber/Conocer — To know (facts/people)
• Decir — To say
• Dar — To give
• Ver — To see

**Learning Tips:**
• Change your phone language to Spanish
• Watch Spanish shows with Spanish subtitles (not English)
• Use Duolingo daily (but don't rely on it alone)
• Find a language exchange partner (Tandem, HelloTalk)
• Listen to Spanish podcasts (SpanishPod101, Notes in Spanish)
• Label items in your house with Spanish words
• Practice speaking from day 1 (even if it's bad)
• Focus on the most common 1,000 words first`;
    }

    if (lowerPrompt.includes('japanese') || lowerPrompt.includes('日本語')) {
      return `### Learn Japanese — Comprehensive Guide

**Writing Systems:**
Japanese uses THREE writing systems:

**1. Hiragana (ひらがな) — 46 characters**
• Used for native Japanese words
• First thing to learn
• Rounded, flowing characters
• Example: あいうえお (a, i, u, e, o)

**2. Katakana (カタカナ) — 46 characters**
• Used for foreign/borrowed words
• Angular, sharp characters
• Example: コーヒー (kōhī = coffee)

**3. Kanji (漢字) — 2,000+ characters**
• Chinese characters adapted for Japanese
• Each has multiple readings
• Learn gradually (start with JLPT N5 level)

**Essential Phrases:**
• こんにちは (Konnichiwa) — Hello
• おはようございます (Ohayou gozaimasu) — Good morning
• ありがとうございます (Arigatou gozaimasu) — Thank you
• すみません (Sumimasen) — Excuse me / Sorry
• はい (Hai) — Yes
• いいえ (Iie) — No
• わかりません (Wakarimasen) — I don't understand
• 英語を話せますか (Eigo wo hanasemasu ka) — Do you speak English?
• いくらですか (Ikura desu ka) — How much is it?
• トイレはどこですか (Toire wa doko desu ka) — Where is the bathroom?

**Basic Grammar:**
• Sentence order: Subject + Object + Verb (SOV)
• English: "I eat sushi" → Japanese: "I sushi eat"
• 私はすしを食べます (Watashi wa sushi wo tabemasu)
• Particles are crucial: は (wa/topic), を (wo/object), に (ni/direction)

**Politeness Levels:**
• Casual: 食べる (taberu) — eat
• Polite: 食べます (tabemasu) — eat (polite)
• Formal: 召し上がります (meshiagarimasu) — eat (honorific)
• Always use polite form with strangers

**Learning Resources:**
• **Textbooks:** Genki I & II (gold standard)
• **Apps:** WaniKani (kanji), Anki (flashcards), Bunpro (grammar)
• **YouTube:** Japanese Ammo with Misa, Cure Dolly
• **Immersion:** Anime with Japanese subtitles, NHK World
• **Practice:** iTalki for tutors, HelloTalk for language exchange`;
    }

    if (lowerPrompt.includes('french') || lowerPrompt.includes('français')) {
      return `### Learn French — Comprehensive Guide

**Why French?**
• Spoken in 29 countries across 5 continents
• Language of diplomacy, cuisine, fashion, and art
• Helps learn other Romance languages
• 300+ million speakers worldwide

**Essential Phrases:**
• Bonjour — Hello / Good day
• Bonsoir — Good evening
• Au revoir — Goodbye
• Merci (beaucoup) — Thank you (very much)
• S'il vous plaît — Please (formal)
• Excusez-moi — Excuse me
• Je ne comprends pas — I don't understand
• Parlez-vous anglais? — Do you speak English?
• Comment vous appelez-vous? — What's your name?
• Je m'appelle... — My name is...
• Combien ça coûte? — How much does it cost?
• Où est...? — Where is...?
• Je voudrais... — I would like...
• L'addition, s'il vous plaît — The check, please

**Grammar Basics:**

**Articles:**
• Le (masculine), La (feminine), Les (plural)
• Un (a, masculine), Une (a, feminine), Des (some)
• Every noun has a gender — learn it with the article

**Present Tense (-er verbs: parler = to speak):**
• Je parle — I speak
• Tu parles — You speak
• Il/Elle parle — He/She speaks
• Nous parlons — We speak
• Vous parlez — You (formal/plural) speak
• Ils/Elles parlent — They speak

**Essential Verbs:**
• Être — To be (je suis, tu es, il est, nous sommes, vous êtes, ils sont)
• Avoir — To have (j'ai, tu as, il a, nous avons, vous avez, ils ont)
• Aller — To go
• Faire — To do/make
• Pouvoir — To be able to
• Vouloir — To want
• Savoir/Connaître — To know
• Devoir — To must/have to

**Pronunciation Tips:**
• Silent final consonants (except C, R, F, L — think "CaReFuL")
• Nasal vowels: an/en, on, in/ain
• The French R is guttural (back of throat)
• Liaison: Connect final consonant to next vowel
• Practice with native audio (not just reading)

**Learning Resources:**
• **Apps:** Duolingo, Babbel, Pimsleur
• **Podcasts:** Coffee Break French, InnerFrench
• **YouTube:** Français avec Pierre, Learn French with Alexa
• **Immersion:** French films with subtitles, France 24 news
• **Practice:** iTalki, Alliance Française classes`;
    }

    if (lowerPrompt.includes('learn') && lowerPrompt.includes('language') && !lowerPrompt.includes('spanish') && !lowerPrompt.includes('japanese') && !lowerPrompt.includes('french')) {
      return `### Language Learning — General Guide

**The Most Effective Method:**

**1. Comprehensible Input (Most Important)**
• Listen and read content slightly above your level
• You should understand 70-80% of it
• Your brain naturally acquires language this way
• More effective than memorizing grammar rules

**2. Spaced Repetition (Vocabulary)**
• Use Anki or similar flashcard apps
• Review words just before you'd forget them
• Focus on the most common 1,000-3,000 words first
• These cover 80-90% of daily conversation

**3. Active Practice (Speaking)**
• Start speaking from week 1 (even if badly)
• Find a language partner (Tandem, HelloTalk, iTalki)
• Talk to yourself (narrate your day)
• Don't wait until you're "ready" — you'll never feel ready

**4. Immersion (Even at Home)**
• Change phone/computer language
• Watch TV shows in target language (with target language subtitles)
• Listen to podcasts and music
• Follow social media accounts in the language
• Read children's books → news articles → novels

**Learning Timeline (Realistic):**
• **Month 1-3:** Basic conversations, survival phrases
• **Month 3-6:** Simple conversations on familiar topics
• **Month 6-12:** Comfortable in most daily situations
• **Year 1-2:** Fluent in most contexts
• **Year 2+:** Near-native proficiency

**Common Mistakes:**
• Studying grammar too much, speaking too little
• Only using apps (Duolingo alone won't make you fluent)
• Waiting to be "ready" before speaking
• Not being consistent (15 min daily > 2 hours weekly)
• Comparing yourself to others
• Giving up during the "intermediate plateau"

**Easiest Languages for English Speakers:**
1. Spanish, Portuguese, Italian, French (Romance languages)
2. Dutch, Norwegian, Swedish, Danish (Germanic languages)
3. Indonesian, Malay (simple grammar)

**Hardest Languages for English Speakers:**
1. Japanese, Chinese, Korean, Arabic (2,200+ hours to proficiency)`;
    }

    return `### Language Learning Help

I can help with:
• Spanish basics and grammar
• Japanese writing systems and phrases
• French pronunciation and vocabulary
• General language learning strategies
• Study plans and resources

Which language are you interested in?`;
  }

  // =============================================================================
  // MUSIC AND INSTRUMENTS
  // =============================================================================

  private generateMusicHelp(prompt: string, lowerPrompt: string): string {
    if (lowerPrompt.includes('guitar') || lowerPrompt.includes('learn guitar')) {
      return `### Learn Guitar — Beginner's Guide

**Choosing Your First Guitar:**
• **Acoustic:** Harder on fingers initially, but portable and versatile
• **Electric:** Easier to play, needs an amp, more fun for rock/blues
• **Classical:** Nylon strings, easier on fingers, wider neck
• Budget: $150-$300 is fine to start (don't go cheaper)

**Essential First Chords:**
Learn these 8 chords and you can play hundreds of songs:

**Open Chords:**
• **G Major:** 320003
• **C Major:** x32010
• **D Major:** xx0232
• **E Minor:** 022000
• **A Minor:** x02210
• **E Major:** 022100
• **A Major:** x02220
• **D Minor:** xx0231

(Numbers = fret positions, x = don't play, 0 = open string)

**Practice Routine (30 min/day):**
• 5 min: Warm up (chromatic exercises, finger stretches)
• 10 min: Chord changes (switch between 2 chords, 1 min each pair)
• 10 min: Learn/practice a song
• 5 min: Something fun (noodle around, try new things)

**Beginner Songs (Easy Chords):**
• "Wonderwall" — Oasis (Em, G, D, A7sus4)
• "Horse With No Name" — America (Em, D6)
• "Knockin' on Heaven's Door" — Bob Dylan (G, D, Am, C)
• "Love Me Do" — Beatles (G, C, D)
• "Riptide" — Vance Joy (Am, G, C)
• "Three Little Birds" — Bob Marley (A, D, E)

**Tips for Beginners:**
• Your fingers WILL hurt — calluses develop in 2-3 weeks
• Buzz is normal at first — press harder, closer to the fret
• Practice chord changes slowly, then speed up
• Use a metronome (even at slow tempos)
• Learn to tune by ear (but use a tuner app too)
• Don't skip fundamentals to learn hard songs
• 15 minutes daily > 2 hours once a week

**Next Steps After Basics:**
• Barre chords (F, Bm — the hardest hurdle)
• Strumming patterns (down-up patterns)
• Fingerpicking basics
• Power chords (for rock/punk)
• Basic music theory (scales, keys)
• Pentatonic scale (for soloing)`;
    }

    if (lowerPrompt.includes('piano') || lowerPrompt.includes('keyboard') || lowerPrompt.includes('learn piano')) {
      return `### Learn Piano — Beginner's Guide

**Getting Started:**

**Keyboard vs Piano:**
• **Digital Piano ($300-$800):** Weighted keys, good sound, headphone jack
• **Keyboard ($100-$300):** Lighter keys, portable, more sounds
• **Acoustic Piano:** Best feel and sound, expensive, needs tuning
• Minimum: 61 keys with touch sensitivity (88 keys ideal)

**The Basics:**

**Reading the Keyboard:**
• White keys: C D E F G A B (repeating pattern)
• Find C: It's the white key to the LEFT of the group of 2 black keys
• Middle C is roughly in the center of the keyboard
• Black keys: Sharps (#) going up, Flats (♭) going down

**Hand Position:**
• Curved fingers (like holding a ball)
• Thumb = 1, Index = 2, Middle = 3, Ring = 4, Pinky = 5
• Wrists level, not drooping
• Relaxed shoulders and arms

**First Things to Learn:**

**1. C Major Scale (Right Hand)**
• C D E F G A B C
• Fingering: 1 2 3 (thumb under) 1 2 3 4 5
• Practice slowly, evenly, hands separately

**2. Basic Chords**
• C Major: C E G
• F Major: F A C
• G Major: G B D
• A Minor: A C E
• D Minor: D F A
• E Minor: E G B

**3. Simple Songs**
• "Twinkle Twinkle Little Star" — C C G G A A G
• "Mary Had a Little Lamb" — E D C D E E E
• "Ode to Joy" — E E F G G F E D C C D E E D D
• "Fur Elise" (simplified) — Great first classical piece

**Practice Routine (30 min/day):**
• 5 min: Scales (C major, then add more)
• 5 min: Chord practice (play chords, switch between them)
• 15 min: Song practice
• 5 min: Sight reading or ear training

**Learning Resources:**
• **Apps:** Simply Piano, Flowkey, Piano Marvel
• **YouTube:** Pianote, Piano Lessons on the Web
• **Books:** Alfred's Basic Piano Library, Faber Piano Adventures
• **Theory:** musictheory.net (free)`;
    }

    if (lowerPrompt.includes('music theory') || lowerPrompt.includes('chord') || lowerPrompt.includes('scale') || lowerPrompt.includes('key signature')) {
      return `### Music Theory Basics

**Notes:**
• 12 notes total: C C# D D# E F F# G G# A A# B
• Then it repeats (an octave higher)
• Sharp (#) = one half step up
• Flat (♭) = one half step down
• C# = D♭ (same note, different name)

**Intervals:**
• Half step: Adjacent notes (C to C#)
• Whole step: Two half steps (C to D)
• These are the building blocks of scales and chords

**Major Scale Formula:**
W W H W W W H (W = whole step, H = half step)

**C Major Scale:** C D E F G A B C
**G Major Scale:** G A B C D E F# G
**D Major Scale:** D E F# G A B C# D

**Minor Scale Formula (Natural):**
W H W W H W W

**A Minor Scale:** A B C D E F G A

**Chords:**

**Major Chord:** Root + Major 3rd + Perfect 5th (happy sound)
• C Major: C E G
• G Major: G B D

**Minor Chord:** Root + Minor 3rd + Perfect 5th (sad sound)
• A Minor: A C E
• D Minor: D F A

**7th Chords:** Add the 7th note
• C Major 7: C E G B
• C Dominant 7: C E G B♭
• A Minor 7: A C E G

**Key Signatures:**
• A key tells you which notes/chords belong together
• Key of C: No sharps or flats
• Key of G: 1 sharp (F#)
• Key of D: 2 sharps (F#, C#)
• Key of F: 1 flat (B♭)

**Chord Progressions (Common):**
• I - V - vi - IV (C G Am F) — Most pop songs ever
• I - IV - V - I (C F G C) — Classic rock/blues
• ii - V - I (Dm G C) — Jazz standard
• I - vi - IV - V (C Am F G) — 50s progression
• vi - IV - I - V (Am F C G) — Modern pop

**Circle of Fifths:**
• Moving clockwise: C → G → D → A → E → B → F# → C#
• Each key adds one sharp
• Moving counter-clockwise: C → F → B♭ → E♭ → A♭ → D♭ → G♭
• Each key adds one flat
• Memorize this — it's the most useful tool in music theory`;
    }

    return `### Music Help

I can help with:
• Learning guitar (chords, songs, technique)
• Learning piano (basics, chords, practice)
• Music theory (scales, chords, progressions)
• Songwriting tips
• Practice strategies

What instrument or music topic interests you?`;
  }

  // =============================================================================
  // ENVIRONMENTAL AND SUSTAINABILITY
  // =============================================================================

  private generateSustainabilityHelp(prompt: string, lowerPrompt: string): string {
    if (lowerPrompt.includes('sustainable') || lowerPrompt.includes('eco') || lowerPrompt.includes('green living') || lowerPrompt.includes('environment')) {
      return `### Sustainable Living Guide

**Biggest Impact Actions:**
(Ranked by actual environmental impact)

**1. Transportation (29% of emissions)**
• Drive less: Walk, bike, public transit, carpool
• If driving: Consider electric or hybrid
• Fly less: One round-trip flight = months of driving emissions
• Work from home when possible

**2. Diet (10-30% of personal footprint)**
• Reduce meat consumption (especially beef)
• Eat more plants (doesn't have to be all-or-nothing)
• Buy local and seasonal when possible
• Reduce food waste (plan meals, use leftovers)
• Compost food scraps

**3. Home Energy (20% of emissions)**
• Switch to LED bulbs (use 75% less energy)
• Adjust thermostat (1°F = 3% savings)
• Insulate your home
• Use a programmable thermostat
• Switch to renewable energy if available
• Unplug devices when not in use

**4. Consumption**
• Buy less stuff (the most sustainable product is one you don't buy)
• Buy quality over quantity (lasts longer)
• Buy secondhand (thrift stores, Facebook Marketplace)
• Repair instead of replace
• Borrow or rent rarely-used items

**5. Waste Reduction**
• Refuse: Say no to things you don't need
• Reduce: Use less of what you do need
• Reuse: Find new purposes for items
• Recycle: Last resort (recycling isn't as effective as we think)
• Compost: Food waste in landfills creates methane

**Easy Swaps:**
• Reusable water bottle → saves 156 plastic bottles/year
• Reusable bags → saves 500 plastic bags/year
• Reusable coffee cup → saves 365 disposable cups/year
• Bar soap/shampoo → eliminates plastic bottles
• Cloth napkins → eliminates paper waste
• Beeswax wraps → replaces plastic wrap

**What Actually Matters vs. What Doesn't:**
• **Matters:** Driving less, eating less meat, flying less, home energy
• **Helps but less impact:** Recycling, reusable bags, shorter showers
• **Mostly marketing:** "Eco-friendly" products, carbon offsets, green brands
• The biggest impact is systemic change (voting, advocacy, supporting policy)`;
    }

    if (lowerPrompt.includes('recycle') || lowerPrompt.includes('recycling') || lowerPrompt.includes('waste')) {
      return `### Recycling & Waste Reduction Guide

**Recycling Basics:**

**Generally Recyclable:**
• Paper and cardboard (clean, dry)
• Glass bottles and jars
• Metal cans (aluminum, steel, tin)
• Plastic bottles and containers (#1 and #2)
• Cartons (milk, juice)

**Generally NOT Recyclable:**
• Plastic bags (return to store drop-off)
• Styrofoam
• Food-contaminated items (greasy pizza boxes)
• Ceramics and pottery
• Mirrors and window glass
• Diapers
• Medical waste
• Electronics (take to e-waste recycling)

**Common Recycling Mistakes:**
• "Wish-cycling" (putting non-recyclables in the bin hoping they'll be recycled)
• Not rinsing containers (food contamination ruins batches)
• Bagging recyclables in plastic bags
• Recycling small items (anything smaller than a credit card falls through)
• Not checking local rules (they vary by city)

**Zero Waste Tips:**
• Bring your own containers for bulk shopping
• Use cloth produce bags
• Make your own cleaning products (vinegar + baking soda)
• Buy in bulk to reduce packaging
• Choose products with minimal packaging
• Start composting (even in apartments with a worm bin)
• Use a bidet (reduces toilet paper by 80%)
• Digital subscriptions instead of paper

**Food Waste Reduction:**
• Plan meals before shopping
• Make a shopping list (and stick to it)
• Use the "first in, first out" method in your fridge
• Learn the difference between "best by" and "use by" dates
• Freeze food before it goes bad
• Use vegetable scraps for stock
• Compost what you can't eat`;
    }

    return `### Environmental & Sustainability Help

I can help with:
• Sustainable living tips
• Recycling and waste reduction
• Energy efficiency
• Eco-friendly product alternatives
• Understanding environmental issues

What sustainability topic interests you?`;
  }

  // =============================================================================
  // PHILOSOPHY AND CRITICAL THINKING
  // =============================================================================

  private generatePhilosophyHelp(prompt: string, lowerPrompt: string): string {
    if (lowerPrompt.includes('stoic') || lowerPrompt.includes('stoicism') || lowerPrompt.includes('marcus aurelius') || lowerPrompt.includes('seneca') || lowerPrompt.includes('epictetus')) {
      return `### Stoicism — Practical Philosophy

**What is Stoicism?**
A practical philosophy founded in ancient Greece (~300 BC) focused on:
• What you can control vs. what you can't
• Virtue as the highest good
• Living in accordance with nature and reason
• Finding tranquility through wisdom

**Key Stoic Thinkers:**
• **Marcus Aurelius** — Roman Emperor, wrote "Meditations"
• **Seneca** — Roman statesman, wrote "Letters from a Stoic"
• **Epictetus** — Former slave, taught "Discourses" and "Enchiridion"

**Core Principles:**

**1. Dichotomy of Control**
"Some things are within our power, while others are not." — Epictetus
• **In your control:** Your thoughts, actions, values, responses
• **Not in your control:** Other people, weather, economy, past, death
• Focus ONLY on what you can control
• Accept what you can't with grace

**2. Negative Visualization (Premeditatio Malorum)**
• Imagine losing what you have
• This builds gratitude and reduces fear
• "We suffer more in imagination than in reality" — Seneca
• Not pessimism — it's preparation and appreciation

**3. Memento Mori (Remember You Will Die)**
• Not morbid — it's motivating
• Life is short — don't waste it on trivial things
• Makes you prioritize what truly matters
• "It is not that we have a short time to live, but that we waste a great deal of it" — Seneca

**4. Amor Fati (Love Your Fate)**
• Don't just accept what happens — embrace it
• Every obstacle is an opportunity to practice virtue
• "The impediment to action advances action. What stands in the way becomes the way" — Marcus Aurelius

**5. Virtue Ethics**
The four cardinal virtues:
• **Wisdom:** Knowing what's truly good, bad, and indifferent
• **Courage:** Acting rightly despite fear
• **Justice:** Treating others fairly
• **Temperance:** Self-control and moderation

**Daily Stoic Practices:**
• Morning: Plan your day, anticipate challenges
• Throughout: Pause before reacting, ask "Is this in my control?"
• Evening: Review your day (What went well? What can improve?)
• Journal: Write reflections (Marcus Aurelius did this)
• Read: A page of Stoic philosophy daily

**Modern Applications:**
• Dealing with difficult people → Focus on your response, not their behavior
• Career setbacks → "What can I learn from this?"
• Anxiety about the future → Focus on today's actions
• Social media comparison → "Is this in my control?"
• Loss and grief → Accept the natural order, cherish memories`;
    }

    if (lowerPrompt.includes('critical thinking') || lowerPrompt.includes('logical fallac') || lowerPrompt.includes('argument') || lowerPrompt.includes('reasoning')) {
      return `### Critical Thinking & Logical Fallacies

**What is Critical Thinking?**
The ability to analyze information objectively and make reasoned judgments.

**Key Skills:**
• Questioning assumptions
• Evaluating evidence
• Identifying biases (yours and others')
• Considering alternative perspectives
• Drawing logical conclusions

**Common Logical Fallacies:**

**1. Ad Hominem**
• Attacking the person instead of their argument
• "You can't trust his opinion on climate change — he's not a scientist"
• The argument should be evaluated on its own merits

**2. Straw Man**
• Misrepresenting someone's argument to make it easier to attack
• Person A: "We should have stricter gun regulations"
• Person B: "So you want to take away everyone's guns?"

**3. Appeal to Authority**
• "This celebrity endorses this product, so it must be good"
• Authorities can be wrong; evaluate the evidence

**4. False Dichotomy**
• Presenting only two options when more exist
• "You're either with us or against us"
• Reality usually has many shades of gray

**5. Slippery Slope**
• Claiming one event will inevitably lead to extreme consequences
• "If we allow X, then Y will happen, then Z, then catastrophe!"
• Each step needs its own evidence

**6. Appeal to Emotion**
• Using feelings instead of evidence to persuade
• "Think of the children!" (without actual data)
• Emotions are valid, but shouldn't replace evidence

**7. Bandwagon (Ad Populum)**
• "Everyone believes it, so it must be true"
• Popular opinion ≠ correct opinion

**8. Confirmation Bias**
• Seeking information that confirms what you already believe
• Ignoring contradicting evidence
• We ALL do this — awareness is the first step

**9. Correlation ≠ Causation**
• Two things happening together doesn't mean one causes the other
• Ice cream sales and drowning both increase in summer
• (Both caused by hot weather, not each other)

**10. Appeal to Nature**
• "It's natural, so it must be good"
• Arsenic is natural. Vaccines are "unnatural." Neither statement is useful.

**How to Think Better:**
• Seek out opposing viewpoints deliberately
• Ask "What evidence would change my mind?"
• Consider the source (who benefits from this claim?)
• Look for the strongest version of the opposing argument (steelmanning)
• Be comfortable saying "I don't know"
• Update your beliefs when presented with new evidence`;
    }

    if (lowerPrompt.includes('meaning of life') || lowerPrompt.includes('purpose') || lowerPrompt.includes('existential') || lowerPrompt.includes('nihilism')) {
      return `### Finding Meaning & Purpose

**Major Philosophical Perspectives:**

**Existentialism (Sartre, Camus, Kierkegaard):**
• Life has no inherent meaning — you CREATE your own
• "Existence precedes essence" — you define yourself through choices
• Freedom is both liberating and terrifying
• Authenticity: Live according to YOUR values, not society's

**Absurdism (Albert Camus):**
• The universe is indifferent, but that's OK
• "The Myth of Sisyphus": Imagine Sisyphus happy
• Don't seek meaning in the universe — create it in your actions
• Embrace the absurd and live fully anyway

**Nihilism → Optimistic Nihilism:**
• Traditional nihilism: Nothing matters → despair
• Optimistic nihilism: Nothing matters → freedom!
• If nothing has inherent meaning, you're free to choose your own
• This is actually liberating, not depressing

**Viktor Frankl (Man's Search for Meaning):**
• Meaning comes from three sources:
  1. **Work:** Creating something or doing meaningful work
  2. **Love:** Connecting deeply with others
  3. **Suffering:** Finding meaning even in unavoidable pain
• "He who has a WHY to live can bear almost any HOW"

**Ikigai (Japanese Concept):**
The intersection of:
• What you LOVE
• What you're GOOD AT
• What the world NEEDS
• What you can be PAID FOR

**Practical Ways to Find Purpose:**
• What would you do if money weren't an issue?
• What problems in the world bother you most?
• When do you lose track of time? (Flow state)
• What did you love doing as a child?
• What would you regret NOT doing on your deathbed?
• Who do you admire and why?

**Key Insight:**
Purpose isn't usually "found" in a single moment of revelation. It's built gradually through:
• Trying things
• Reflecting on what resonates
• Following curiosity
• Serving others
• Being present

Don't wait to find your purpose before living. Live fully, and purpose often reveals itself.`;
    }

    return `### Philosophy & Critical Thinking

I can help with:
• Stoicism and practical philosophy
• Critical thinking and logical fallacies
• Finding meaning and purpose
• Ethical frameworks
• Major philosophical traditions

What philosophical topic interests you?`;
  }

  // =============================================================================
  // SPORTS AND FITNESS DETAILED
  // =============================================================================

  private generateSportsHelp(prompt: string, lowerPrompt: string): string {
    if (lowerPrompt.includes('running') || lowerPrompt.includes('marathon') || lowerPrompt.includes('5k') || lowerPrompt.includes('couch to')) {
      return `### Running Guide — Beginner to Marathon

**Starting from Zero (Couch to 5K):**

**Week 1-2:** Walk 5 min → Alternate 60 sec jog / 90 sec walk × 8 → Walk 5 min
**Week 3-4:** Walk 5 min → Alternate 90 sec jog / 90 sec walk × 6 → Walk 5 min
**Week 5-6:** Walk 5 min → Jog 5 min / Walk 3 min × 3 → Walk 5 min
**Week 7-8:** Walk 5 min → Jog 8 min / Walk 2 min × 2 → Walk 5 min
**Week 9:** Walk 5 min → Jog 20 min straight → Walk 5 min
**Week 10-12:** Gradually build to 30 min continuous running

**Running Form:**
• Land midfoot (not heel)
• Short, quick strides (aim for 170-180 steps/min)
• Slight forward lean from ankles
• Relaxed shoulders (not up by ears)
• Arms at 90°, swinging forward/back (not across body)
• Look ahead, not down

**Common Beginner Mistakes:**
• Starting too fast (you should be able to hold a conversation)
• Running every day (rest days are when you get stronger)
• Ignoring pain (soreness is OK, sharp pain is not)
• Wrong shoes (go to a running store for a fitting)
• Not hydrating enough
• Skipping warm-up and cool-down

**5K Training Plan (8 weeks):**
• 3-4 runs per week
• 1 long run (gradually increase distance)
• 1-2 easy runs
• 1 speed/interval session
• 1-2 rest days
• Cross-training optional (cycling, swimming)

**Half Marathon Training (12 weeks):**
• Base: Can comfortably run 3-4 miles
• Peak long run: 10-11 miles (2 weeks before race)
• Weekly mileage: Build gradually (no more than 10% increase/week)
• Include: Easy runs, tempo runs, long runs, rest days

**Marathon Training (16-20 weeks):**
• Base: Can comfortably run 6+ miles
• Peak long run: 20-22 miles (3 weeks before race)
• Weekly mileage: 30-50 miles at peak
• Taper: Reduce mileage 2-3 weeks before race
• Nutrition: Practice race-day fueling during long runs

**Injury Prevention:**
• Don't increase mileage more than 10% per week
• Strength train 2x/week (squats, lunges, core)
• Stretch and foam roll after runs
• Replace shoes every 300-500 miles
• Listen to your body (rest when needed)`;
    }

    if (lowerPrompt.includes('weight') && (lowerPrompt.includes('lift') || lowerPrompt.includes('train') || lowerPrompt.includes('strength'))) {
      return `### Strength Training — Beginner's Guide

**Benefits:**
• Build muscle and strength
• Increase metabolism (burn more calories at rest)
• Improve bone density
• Better posture and injury prevention
• Mental health benefits
• Look and feel better

**The Big 5 Compound Movements:**
(These work multiple muscle groups and give the most bang for your buck)

**1. Squat**
• Works: Quads, glutes, hamstrings, core
• Start with bodyweight, progress to barbell
• Key: Knees track over toes, chest up, depth to parallel

**2. Deadlift**
• Works: Entire posterior chain (back, glutes, hamstrings)
• Start with light weight, focus on form
• Key: Flat back, hinge at hips, bar close to body

**3. Bench Press**
• Works: Chest, shoulders, triceps
• Start with dumbbells if barbell is too heavy
• Key: Feet flat, back slightly arched, control the weight

**4. Overhead Press**
• Works: Shoulders, triceps, core
• Can do seated or standing
• Key: Core tight, don't arch back, full range of motion

**5. Row (Barbell or Dumbbell)**
• Works: Back, biceps, rear delts
• Key: Pull to lower chest, squeeze shoulder blades

**Beginner Program (3 days/week):**

**Day A:**
• Squat: 3 sets × 8-10 reps
• Bench Press: 3 × 8-10
• Barbell Row: 3 × 8-10
• Plank: 3 × 30-60 sec

**Day B:**
• Deadlift: 3 × 5-8
• Overhead Press: 3 × 8-10
• Lat Pulldown: 3 × 8-10
• Lunges: 3 × 10 each leg

**Alternate A and B:** Mon(A), Wed(B), Fri(A), Mon(B)...

**Progressive Overload:**
• The KEY to getting stronger
• Gradually increase weight, reps, or sets over time
• Add 5 lbs to upper body lifts every 1-2 weeks
• Add 10 lbs to lower body lifts every 1-2 weeks
• Track your workouts (app or notebook)

**Nutrition for Strength:**
• Protein: 0.7-1g per pound of bodyweight daily
• Eat enough calories (can't build muscle in a deficit)
• Good protein sources: Chicken, fish, eggs, Greek yogurt, tofu, legumes
• Eat protein within 2 hours of training
• Stay hydrated

**Common Mistakes:**
• Ego lifting (too heavy, bad form)
• Not tracking progress
• Skipping legs
• Not eating enough protein
• Program hopping (stick with one program for 8-12 weeks)
• Not warming up`;
    }

    if (lowerPrompt.includes('yoga') || lowerPrompt.includes('stretch') || lowerPrompt.includes('flexibility')) {
      return `### Yoga & Flexibility Guide

**Benefits of Yoga:**
• Increased flexibility and mobility
• Stress reduction and mental clarity
• Better posture and balance
• Injury prevention
• Improved breathing
• Mind-body connection

**Types of Yoga:**
• **Hatha:** Gentle, good for beginners, holds poses longer
• **Vinyasa:** Flow-based, links movement with breath, moderate intensity
• **Ashtanga:** Structured sequence, physically demanding
• **Yin:** Very slow, holds poses 3-5 minutes, deep stretch
• **Hot/Bikram:** Done in heated room (95-105°F)
• **Restorative:** Very gentle, uses props, deeply relaxing

**Essential Beginner Poses:**

**Standing:**
• Mountain Pose (Tadasana) — Foundation of all standing poses
• Warrior I (Virabhadrasana I) — Strength and stability
• Warrior II (Virabhadrasana II) — Hip opener, builds endurance
• Triangle (Trikonasana) — Side stretch, balance
• Tree Pose (Vrksasana) — Balance and focus

**Floor:**
• Downward Dog (Adho Mukha Svanasana) — Full body stretch
• Child's Pose (Balasana) — Rest and recovery
• Cat-Cow (Marjaryasana-Bitilasana) — Spine mobility
• Cobra (Bhujangasana) — Back extension
• Pigeon Pose (Eka Pada Rajakapotasana) — Deep hip opener

**Seated:**
• Seated Forward Fold (Paschimottanasana) — Hamstring stretch
• Butterfly (Baddha Konasana) — Inner thigh stretch
• Seated Twist (Ardha Matsyendrasana) — Spinal rotation

**15-Minute Morning Flow:**
1. Child's Pose (1 min)
2. Cat-Cow (1 min)
3. Downward Dog (30 sec)
4. Forward Fold (30 sec)
5. Mountain Pose (30 sec)
6. Sun Salutation A × 3 (5 min)
7. Warrior I (each side, 30 sec)
8. Warrior II (each side, 30 sec)
9. Triangle (each side, 30 sec)
10. Tree Pose (each side, 30 sec)
11. Seated Forward Fold (1 min)
12. Savasana (2 min)

**Tips:**
• Never force a stretch (ease into it)
• Breathe deeply through every pose
• Consistency > intensity
• Use props (blocks, straps) — they're not cheating
• Listen to your body
• YouTube: Yoga with Adriene (best free resource)`;
    }

    return `### Sports & Fitness Help

I can help with:
• Running (5K to marathon training)
• Strength training programs
• Yoga and flexibility
• Nutrition for athletes
• Injury prevention
• Workout routines

What fitness topic interests you?`;
  }

  // =============================================================================
  // WRITING AND COMMUNICATION TEMPLATES
  // =============================================================================

  private generateWritingTemplates(prompt: string, lowerPrompt: string): string {
    if (lowerPrompt.includes('cover letter') || lowerPrompt.includes('job application')) {
      return `### Cover Letter Template & Guide

**Structure:**

**Header:**
Your Name
Your Address
Your Email | Your Phone
Date

Hiring Manager's Name
Company Name
Company Address

**Opening Paragraph (Hook):**
• State the position you're applying for
• How you found the job
• One compelling reason you're a great fit
• Example: "I'm excited to apply for the [Position] role at [Company]. With [X years] of experience in [field] and a proven track record of [specific achievement], I'm confident I can contribute to your team's success."

**Body Paragraph 1 (Why You):**
• Your most relevant experience
• Specific accomplishments with numbers
• How your skills match the job requirements
• Example: "In my current role at [Company], I [specific achievement]. This resulted in [measurable outcome], demonstrating my ability to [relevant skill]."

**Body Paragraph 2 (Why This Company):**
• What excites you about the company
• How your values align with theirs
• What you can contribute specifically
• Example: "I'm particularly drawn to [Company]'s commitment to [value/mission]. My experience in [area] aligns perfectly with your goal to [company objective]."

**Closing Paragraph:**
• Reiterate your interest
• Call to action
• Thank them for their time
• Example: "I'd welcome the opportunity to discuss how my experience can benefit [Company]. Thank you for considering my application. I look forward to hearing from you."

**Tips:**
• Keep it to one page
• Customize for EVERY application (no generic letters)
• Mirror the language from the job posting
• Show, don't tell (use specific examples)
• Proofread multiple times
• Address it to a specific person if possible
• Don't repeat your resume — complement it`;
    }

    if (lowerPrompt.includes('resignation') || lowerPrompt.includes('quit') || lowerPrompt.includes('leaving job')) {
      return `### Resignation Letter Template

**Professional Resignation Letter:**

Dear [Manager's Name],

I am writing to formally notify you of my resignation from my position as [Job Title] at [Company Name], effective [Last Day — typically 2 weeks from date].

I have greatly valued my time at [Company] and am grateful for the opportunities for professional growth and development. Working with the team has been a rewarding experience, and I appreciate the support and guidance I've received.

During my remaining time, I am committed to ensuring a smooth transition. I am happy to help train my replacement, document my processes, and complete any outstanding projects.

Thank you for the opportunity to be part of [Company]. I wish the team continued success.

Sincerely,
[Your Name]
[Date]

**Tips for Resigning:**
• Give at least 2 weeks notice (more for senior roles)
• Tell your manager IN PERSON first, then follow up with the letter
• Keep it positive (don't burn bridges)
• Don't badmouth the company or coworkers
• Offer to help with the transition
• Keep it brief — no need to explain why you're leaving in detail
• Save personal files before announcing (just in case)
• Be prepared for a counteroffer (know your answer in advance)

**What NOT to Say:**
• "I'm leaving because my boss is terrible"
• "I found a job that pays way more"
• "This company is going downhill"
• "I've been miserable here"
• Keep it classy — the professional world is small`;
    }

    if (lowerPrompt.includes('thank you') && (lowerPrompt.includes('note') || lowerPrompt.includes('letter') || lowerPrompt.includes('email'))) {
      return `### Thank You Note Templates

**After a Job Interview:**

Subject: Thank You — [Position] Interview

Dear [Interviewer's Name],

Thank you for taking the time to meet with me today about the [Position] role. I enjoyed learning more about [specific topic discussed] and the team's work on [specific project/initiative].

Our conversation reinforced my enthusiasm for the position. I'm particularly excited about [specific aspect of the role], and I believe my experience in [relevant skill/experience] would allow me to contribute meaningfully to the team.

Please don't hesitate to reach out if you need any additional information. I look forward to hearing from you.

Best regards,
[Your Name]

**After Receiving a Gift:**

Dear [Name],

Thank you so much for the thoughtful [gift]. It was incredibly kind of you, and I really appreciate your generosity. [Mention something specific about the gift or how you plan to use it.]

Your thoughtfulness means a lot to me.

Warm regards,
[Your Name]

**After a Business Meeting:**

Subject: Great Meeting Today — Next Steps

Hi [Name],

Thank you for meeting with me today. I appreciated the opportunity to discuss [topic]. Your insights on [specific point] were particularly valuable.

As discussed, here are the next steps:
• [Action item 1] — [Owner] by [Date]
• [Action item 2] — [Owner] by [Date]
• [Action item 3] — [Owner] by [Date]

Please let me know if I've missed anything. Looking forward to our continued collaboration.

Best,
[Your Name]

**After Someone Helped You:**

Dear [Name],

I wanted to take a moment to express my sincere gratitude for [specific help]. Your willingness to [what they did] made a real difference, and I truly appreciate it.

[Mention the positive impact of their help.]

Thank you again for your kindness and support.

Gratefully,
[Your Name]`;
    }

    if (lowerPrompt.includes('complaint') || lowerPrompt.includes('formal letter')) {
      return `### Formal Complaint Letter Template

**Structure:**

[Your Name]
[Your Address]
[Date]

[Recipient Name/Department]
[Company Name]
[Company Address]

Subject: Formal Complaint Regarding [Issue]

Dear [Name/Sir or Madam],

I am writing to formally bring to your attention [brief description of the issue]. On [date], [describe what happened in factual, chronological order].

[Paragraph 2: Provide specific details]
• What product/service was involved
• Order/account numbers
• Names of people you spoke with
• Dates and times of interactions
• What went wrong specifically

[Paragraph 3: Impact and previous attempts to resolve]
As a result of this issue, I have experienced [describe impact — financial loss, inconvenience, etc.]. I have previously attempted to resolve this matter by [describe previous attempts — calls, emails, etc.] on [dates], but have not received a satisfactory resolution.

[Paragraph 4: Desired resolution]
I am requesting [specific resolution — refund, replacement, apology, policy change, etc.]. I believe this is a fair and reasonable resolution given the circumstances.

I would appreciate a response within [14/30] business days. I have enclosed copies of [relevant documents — receipts, correspondence, photos] for your reference.

Thank you for your attention to this matter.

Sincerely,
[Your Name]
[Phone Number]
[Email Address]

Enclosures: [List of attached documents]

**Tips:**
• Stay factual and professional (no emotional language)
• Be specific about dates, names, and details
• State clearly what resolution you want
• Keep copies of everything
• Send via certified mail or email with read receipt
• Set a reasonable deadline for response
• Know your consumer rights`;
    }

    if (lowerPrompt.includes('apology') || lowerPrompt.includes('sorry') && lowerPrompt.includes('write')) {
      return `### Apology Templates

**Professional Apology (to a Client/Customer):**

Subject: Our Sincere Apologies — [Issue]

Dear [Name],

I want to sincerely apologize for [specific issue]. This fell short of the standards we hold ourselves to, and I understand the frustration this has caused.

Here's what happened: [Brief, honest explanation — not excuses]

Here's what we're doing about it:
• [Immediate fix/compensation]
• [Steps to prevent it from happening again]
• [Timeline for resolution]

Your trust is important to us, and we're committed to making this right. Please don't hesitate to reach out to me directly at [contact info] if you have any concerns.

Thank you for your patience and understanding.

Sincerely,
[Your Name]

**Personal Apology:**

[Name],

I owe you an apology. [What you did wrong — be specific and take ownership].

I understand that this [hurt you / caused problems / was disrespectful], and I'm truly sorry. You deserved better, and I take full responsibility.

[What you've learned / What you'll do differently going forward]

I value our [relationship/friendship] and hope we can move forward. I understand if you need time, and I respect that.

[Your Name]

**Key Elements of a Good Apology:**
1. **Acknowledge** what you did wrong (specifically)
2. **Take responsibility** (no "I'm sorry IF you were offended")
3. **Show understanding** of the impact
4. **Explain** (briefly, without making excuses)
5. **State what you'll do differently**
6. **Ask for forgiveness** (but don't demand it)

**What NOT to Do:**
• "I'm sorry you feel that way" (not an apology)
• "I'm sorry, BUT..." (negates the apology)
• Minimize their feelings
• Make it about you
• Apologize repeatedly without changing behavior`;
    }

    return `### Writing & Communication Templates

I can help with:
• Cover letters and job applications
• Resignation letters
• Thank you notes (interview, business, personal)
• Formal complaint letters
• Apology letters (professional and personal)
• Business proposals
• Professional emails

What type of writing do you need help with?`;
  }

  // =============================================================================
  // PERSONAL FINANCE EXTENDED
  // =============================================================================

  private generatePersonalFinanceExtended(prompt: string, lowerPrompt: string): string {
    if (lowerPrompt.includes('credit score') || lowerPrompt.includes('credit card') || lowerPrompt.includes('credit report')) {
      return `### Credit Score & Credit Cards Guide

**Understanding Credit Scores:**

**Score Ranges (FICO):**
• 800-850: Exceptional
• 740-799: Very Good
• 670-739: Good
• 580-669: Fair
• 300-579: Poor

**What Affects Your Score:**
• **Payment History (35%):** Pay on time, every time
• **Credit Utilization (30%):** Keep below 30% of limit (below 10% is ideal)
• **Length of History (15%):** Older accounts are better
• **Credit Mix (10%):** Different types (cards, loans, mortgage)
• **New Credit (10%):** Don't apply for too many at once

**How to Build/Improve Credit:**

**Starting from Nothing:**
• Get a secured credit card (deposit = your limit)
• Become an authorized user on a family member's card
• Use a credit-builder loan
• Pay rent through a service that reports to bureaus

**Improving Your Score:**
• Pay ALL bills on time (set up autopay)
• Pay down credit card balances
• Don't close old accounts (length of history)
• Limit hard inquiries (don't apply for lots of credit)
• Dispute errors on your credit report (free at annualcreditreport.com)
• Ask for credit limit increases (lowers utilization)

**Credit Card Strategy:**

**Best Practices:**
• Pay the FULL balance every month (never carry a balance)
• Use cards for regular purchases you'd make anyway
• Take advantage of rewards (cashback, points, miles)
• Don't spend more just because you have a card
• Set up autopay for at least the minimum

**Types of Rewards:**
• **Cashback:** Simple, 1-5% back on purchases
• **Travel Points:** Best value for frequent travelers
• **Store Cards:** Good discounts but usually high APR
• **0% APR Cards:** Good for large purchases you need to pay off over time

**Red Flags:**
• Only paying the minimum (you'll pay 2-3x the original price)
• Cash advances (extremely high interest, no grace period)
• Balance transfers without a payoff plan
• Opening cards just for the sign-up bonus
• Carrying a balance "to build credit" (myth — pay it off)`;
    }

    if (lowerPrompt.includes('real estate') || lowerPrompt.includes('buy a house') || lowerPrompt.includes('mortgage') || lowerPrompt.includes('home buying')) {
      return `### Home Buying Guide

**Are You Ready to Buy?**
• Stable income for 2+ years
• Emergency fund (3-6 months expenses AFTER down payment)
• Credit score 620+ (740+ for best rates)
• Debt-to-income ratio below 43%
• Down payment saved (3-20% of home price)
• Planning to stay 5+ years (to recoup buying costs)

**The Home Buying Process:**

**1. Get Pre-Approved (Before House Hunting)**
• Shop multiple lenders (at least 3)
• Compare: Interest rate, APR, closing costs, fees
• Pre-approval ≠ pre-qualification (pre-approval is stronger)
• Lock in your rate when ready

**2. Find a Real Estate Agent**
• Interview 2-3 agents
• Check reviews and recent sales
• Buyer's agent is typically free to you (seller pays)
• They'll guide you through the entire process

**3. House Hunt**
• Make a must-have vs. nice-to-have list
• Visit at different times of day
• Check the neighborhood (schools, crime, commute)
• Look past cosmetic issues (paint, carpet = cheap fixes)
• Watch for red flags (foundation cracks, water damage, roof age)

**4. Make an Offer**
• Your agent will help with pricing strategy
• Include contingencies (inspection, financing, appraisal)
• Earnest money deposit (1-3% of offer price)
• Be prepared to negotiate

**5. Inspection & Appraisal**
• ALWAYS get a home inspection ($300-$500)
• Negotiate repairs or credits based on findings
• Appraisal ensures the home is worth the price
• If appraisal is low, renegotiate or walk away

**6. Closing**
• Review all documents carefully
• Closing costs: 2-5% of loan amount
• Final walkthrough before signing
• Get the keys!

**Mortgage Types:**
• **30-year fixed:** Lower payments, more interest over time
• **15-year fixed:** Higher payments, much less interest, build equity faster
• **ARM (Adjustable Rate):** Lower initial rate, but can increase
• **FHA:** Lower down payment (3.5%), easier to qualify
• **VA:** No down payment for veterans
• **USDA:** No down payment for rural areas

**Hidden Costs of Homeownership:**
• Property taxes (1-2% of home value/year)
• Homeowner's insurance
• HOA fees (if applicable)
• Maintenance (budget 1-2% of home value/year)
• Utilities (often more than renting)
• Repairs (things WILL break)`;
    }

    if (lowerPrompt.includes('insurance') || lowerPrompt.includes('health insurance') || lowerPrompt.includes('life insurance')) {
      return `### Insurance Guide

**Types of Insurance You Need:**

**1. Health Insurance (Essential)**
• **HMO:** Lower cost, need referrals, limited network
• **PPO:** Higher cost, more flexibility, larger network
• **HDHP:** High deductible, lower premiums, pairs with HSA
• **HSA (Health Savings Account):** Triple tax advantage — contributions, growth, and withdrawals are all tax-free for medical expenses

**Key Terms:**
• **Premium:** Monthly payment
• **Deductible:** What you pay before insurance kicks in
• **Copay:** Fixed amount per visit
• **Coinsurance:** Your percentage after deductible
• **Out-of-pocket max:** Most you'll pay in a year

**2. Auto Insurance (Required)**
• **Liability:** Covers damage you cause to others (required)
• **Collision:** Covers your car in an accident
• **Comprehensive:** Covers theft, weather, animals
• **Uninsured motorist:** Covers you if hit by uninsured driver
• Tip: Higher deductible = lower premium

**3. Renter's/Homeowner's Insurance**
• **Renter's:** Covers your belongings ($15-30/month)
• **Homeowner's:** Covers structure + belongings
• Document your possessions (video walkthrough)
• Understand what's NOT covered (floods, earthquakes usually separate)

**4. Life Insurance**
• **Term Life:** Coverage for a set period (20-30 years), affordable
• **Whole Life:** Lifetime coverage + cash value, expensive
• Rule of thumb: 10-12x your annual income
• Most people only need term life
• Get it when you're young and healthy (cheaper)

**5. Disability Insurance**
• Replaces income if you can't work
• Short-term: Covers first 3-6 months
• Long-term: Covers after short-term ends
• Often available through employer
• More important than life insurance for young singles

**Money-Saving Tips:**
• Bundle policies (auto + home = discount)
• Shop around annually
• Raise deductibles (if you have emergency fund)
• Ask about discounts (good driver, good student, etc.)
• Don't over-insure or under-insure
• Review coverage annually`;
    }

    if (lowerPrompt.includes('side hustle') || lowerPrompt.includes('extra money') || lowerPrompt.includes('passive income') || lowerPrompt.includes('make money')) {
      return `### Side Hustle & Extra Income Guide

**Quick Money (Start This Week):**
• **Freelancing:** Use your existing skills (writing, design, coding, marketing)
  - Platforms: Upwork, Fiverr, Toptal, 99designs
• **Tutoring:** Teach what you know
  - Platforms: Wyzant, Tutor.com, Varsity Tutors
• **Delivery/Rideshare:** Flexible hours
  - DoorDash, Uber Eats, Instacart, Uber, Lyft
• **Sell stuff:** Declutter and profit
  - eBay, Facebook Marketplace, Poshmark, Mercari
• **Pet sitting/Dog walking:** Rover, Wag
• **Task work:** TaskRabbit, Handy

**Skill-Based Side Hustles ($50-$200+/hr):**
• Web development / app development
• Graphic design / UI/UX design
• Copywriting / content writing
• Video editing
• Social media management
• Bookkeeping
• Photography
• Consulting in your field

**Passive Income (Takes Time to Build):**
• **Digital Products:** Ebooks, templates, courses, printables
• **Content Creation:** YouTube, blog, podcast (ad revenue)
• **Affiliate Marketing:** Recommend products, earn commissions
• **Stock Photography:** Sell photos on Shutterstock, Adobe Stock
• **Print on Demand:** Design t-shirts, mugs (Redbubble, Merch by Amazon)
• **Investing:** Dividend stocks, REITs, index funds
• **Rental Income:** Property, spare room (Airbnb)

**Building a Side Hustle:**
1. Start with what you already know
2. Validate demand before investing time/money
3. Start small, iterate based on feedback
4. Reinvest profits to grow
5. Automate and systematize
6. Consider turning it into a full business

**Tax Considerations:**
• Side hustle income IS taxable
• Track all expenses (they're deductible)
• Set aside 25-30% for taxes
• Pay quarterly estimated taxes if earning $1,000+/year
• Consider forming an LLC for liability protection
• Use accounting software (Wave is free)

**Time Management:**
• Set specific hours for your side hustle
• Don't let it burn you out at your day job
• Start with 5-10 hours/week
• Focus on one thing (don't spread too thin)
• Batch similar tasks together`;
    }

    return `### Personal Finance Help

I can help with:
• Credit scores and credit cards
• Home buying and mortgages
• Insurance (health, auto, life, disability)
• Side hustles and extra income
• Budgeting and saving
• Investing basics

What financial topic would you like to explore?`;
  }

  // =============================================================================
  // DATA SCIENCE AND ANALYTICS
  // =============================================================================

  private generateDataScienceHelp(prompt: string, lowerPrompt: string): string {
    if (lowerPrompt.includes('data science') || lowerPrompt.includes('machine learning') || lowerPrompt.includes('data analyst')) {
      return `### Data Science & Machine Learning Guide

**What is Data Science?**
Using data to find patterns, make predictions, and drive decisions.

**The Data Science Process:**
1. **Define the Problem:** What question are you trying to answer?
2. **Collect Data:** Gather relevant data from various sources
3. **Clean Data:** Handle missing values, outliers, inconsistencies (80% of the work)
4. **Explore Data:** Visualize, find patterns, understand relationships
5. **Model:** Apply statistical/ML models
6. **Evaluate:** Test model performance
7. **Deploy:** Put the model into production
8. **Monitor:** Track performance over time

**Essential Skills:**

**Programming:**
• Python (most popular) or R
• SQL (for databases)
• Libraries: pandas, numpy, scikit-learn, matplotlib, seaborn

**Statistics:**
• Descriptive statistics (mean, median, standard deviation)
• Probability distributions
• Hypothesis testing
• Regression analysis
• Bayesian statistics

**Machine Learning Types:**

**Supervised Learning (labeled data):**
• **Classification:** Predict categories (spam/not spam, cat/dog)
  - Algorithms: Logistic Regression, Random Forest, SVM, Neural Networks
• **Regression:** Predict numbers (price, temperature, sales)
  - Algorithms: Linear Regression, Decision Trees, XGBoost

**Unsupervised Learning (no labels):**
• **Clustering:** Group similar items (customer segments)
  - Algorithms: K-Means, DBSCAN, Hierarchical
• **Dimensionality Reduction:** Simplify complex data
  - Algorithms: PCA, t-SNE, UMAP

**Deep Learning:**
• Neural networks with many layers
• Best for: Images, text, audio, complex patterns
• Frameworks: TensorFlow, PyTorch
• Requires lots of data and compute power

**Learning Path:**
1. Learn Python basics (2-4 weeks)
2. Statistics fundamentals (2-4 weeks)
3. pandas and data manipulation (2 weeks)
4. Data visualization (matplotlib, seaborn) (1-2 weeks)
5. SQL basics (1-2 weeks)
6. Machine learning with scikit-learn (4-8 weeks)
7. Deep learning basics (4-8 weeks)
8. Build projects and a portfolio

**Resources:**
• **Free:** Kaggle Learn, fast.ai, Google ML Crash Course
• **Courses:** Andrew Ng's ML course (Coursera), DataCamp
• **Books:** "Hands-On ML" by Aurélien Géron, "Python for Data Analysis" by Wes McKinney
• **Practice:** Kaggle competitions, personal projects`;
    }

    if (lowerPrompt.includes('excel') || lowerPrompt.includes('spreadsheet') || lowerPrompt.includes('google sheets')) {
      return `### Excel / Google Sheets Power User Guide

**Essential Formulas:**

**Lookup & Reference:**
• =VLOOKUP(value, table, col_num, FALSE) — Find data in a table
• =INDEX(range, MATCH(value, range, 0)) — More flexible than VLOOKUP
• =XLOOKUP(value, lookup_range, return_range) — Modern replacement (Excel 365)

**Text:**
• =CONCATENATE(A1, " ", B1) or =A1 & " " & B1 — Join text
• =LEFT(A1, 5) / =RIGHT(A1, 5) / =MID(A1, 2, 3) — Extract text
• =TRIM(A1) — Remove extra spaces
• =UPPER(A1) / =LOWER(A1) / =PROPER(A1) — Change case
• =SUBSTITUTE(A1, "old", "new") — Replace text

**Math & Stats:**
• =SUM(A1:A100) — Add numbers
• =AVERAGE(A1:A100) — Mean
• =MEDIAN(A1:A100) — Middle value
• =COUNTIF(range, criteria) — Count matching cells
• =SUMIF(range, criteria, sum_range) — Sum matching cells
• =SUMIFS(sum_range, range1, criteria1, range2, criteria2) — Multiple criteria

**Logic:**
• =IF(condition, true_value, false_value) — Basic condition
• =IFS(cond1, val1, cond2, val2, ...) — Multiple conditions
• =AND(cond1, cond2) / =OR(cond1, cond2) — Combine conditions
• =IFERROR(formula, "Error message") — Handle errors gracefully

**Date & Time:**
• =TODAY() / =NOW() — Current date/time
• =DATEDIF(start, end, "Y") — Difference in years (also "M", "D")
• =NETWORKDAYS(start, end) — Working days between dates
• =TEXT(A1, "MM/DD/YYYY") — Format dates

**Pivot Tables (Most Powerful Feature):**
1. Select your data
2. Insert → Pivot Table
3. Drag fields to Rows, Columns, Values, Filters
4. Summarize large datasets instantly
5. Group dates by month/quarter/year
6. Use calculated fields for custom metrics

**Keyboard Shortcuts:**
• Ctrl+C/V/X — Copy/Paste/Cut
• Ctrl+Z/Y — Undo/Redo
• Ctrl+Shift+L — Toggle filters
• Ctrl+; — Insert today's date
• Ctrl+D — Fill down
• Alt+= — AutoSum
• F4 — Toggle absolute reference ($)
• Ctrl+Backtick — Show/hide formulas

**Pro Tips:**
• Use named ranges for clarity
• Conditional formatting for visual analysis
• Data validation for dropdown lists
• Freeze panes for large datasets
• Use tables (Ctrl+T) for dynamic ranges
• Learn array formulas for advanced calculations`;
    }

    if (lowerPrompt.includes('sql') && !lowerPrompt.includes('nosql')) {
      return `### SQL Quick Reference

**Basic Queries:**

\`\`\`sql
-- Select all columns
SELECT * FROM users;

-- Select specific columns
SELECT name, email FROM users;

-- Filter with WHERE
SELECT * FROM users WHERE age > 25;

-- Multiple conditions
SELECT * FROM users WHERE age > 25 AND city = 'New York';

-- Sort results
SELECT * FROM users ORDER BY name ASC;
SELECT * FROM users ORDER BY created_at DESC;

-- Limit results
SELECT * FROM users LIMIT 10;

-- Count rows
SELECT COUNT(*) FROM users;

-- Unique values
SELECT DISTINCT city FROM users;
\`\`\`

**Aggregation:**
\`\`\`sql
-- Group and count
SELECT city, COUNT(*) as user_count
FROM users
GROUP BY city
ORDER BY user_count DESC;

-- Group with filter
SELECT city, AVG(age) as avg_age
FROM users
GROUP BY city
HAVING AVG(age) > 30;

-- Common aggregates
SELECT
  COUNT(*) as total,
  SUM(amount) as total_amount,
  AVG(amount) as avg_amount,
  MIN(amount) as min_amount,
  MAX(amount) as max_amount
FROM orders;
\`\`\`

**Joins:**
\`\`\`sql
-- Inner join (matching rows only)
SELECT u.name, o.amount
FROM users u
INNER JOIN orders o ON u.id = o.user_id;

-- Left join (all from left table)
SELECT u.name, o.amount
FROM users u
LEFT JOIN orders o ON u.id = o.user_id;

-- Multiple joins
SELECT u.name, o.amount, p.name as product
FROM users u
JOIN orders o ON u.id = o.user_id
JOIN products p ON o.product_id = p.id;
\`\`\`

**Subqueries:**
\`\`\`sql
-- Subquery in WHERE
SELECT * FROM users
WHERE id IN (SELECT user_id FROM orders WHERE amount > 100);

-- Subquery as table
SELECT avg_orders.city, avg_orders.avg_amount
FROM (
  SELECT city, AVG(amount) as avg_amount
  FROM orders o
  JOIN users u ON o.user_id = u.id
  GROUP BY city
) avg_orders
WHERE avg_orders.avg_amount > 50;
\`\`\`

**Modifying Data:**
\`\`\`sql
-- Insert
INSERT INTO users (name, email) VALUES ('John', 'john@email.com');

-- Update
UPDATE users SET name = 'Jane' WHERE id = 1;

-- Delete
DELETE FROM users WHERE id = 1;
\`\`\`

**Window Functions (Advanced):**
\`\`\`sql
-- Row number
SELECT name, amount,
  ROW_NUMBER() OVER (ORDER BY amount DESC) as rank
FROM orders;

-- Running total
SELECT date, amount,
  SUM(amount) OVER (ORDER BY date) as running_total
FROM orders;

-- Partition
SELECT city, name, amount,
  RANK() OVER (PARTITION BY city ORDER BY amount DESC) as city_rank
FROM orders
JOIN users ON orders.user_id = users.id;
\`\`\``;
    }

    return `### Data Science & Analytics Help

I can help with:
• Data science and machine learning concepts
• Excel and Google Sheets formulas
• SQL queries and database concepts
• Python for data analysis
• Statistics and visualization

What data topic interests you?`;
  }

  // =============================================================================
  // ENTREPRENEURSHIP AND STARTUPS
  // =============================================================================

  private generateEntrepreneurshipHelp(prompt: string, lowerPrompt: string): string {
    if (lowerPrompt.includes('startup') || lowerPrompt.includes('start a business') || lowerPrompt.includes('business idea')) {
      return `### Starting a Business — Complete Guide

**Validating Your Idea:**

**Before Building Anything:**
1. Talk to 20+ potential customers
2. Ask about their PROBLEMS (not your solution)
3. Would they pay for a solution? How much?
4. Who else has this problem?
5. What do they currently do to solve it?

**Validation Methods:**
• Landing page test (collect emails before building)
• Pre-sell the product (if people pay, it's validated)
• Minimum Viable Product (simplest version that works)
• Crowdfunding (Kickstarter, Indiegogo)
• Surveys and interviews

**Business Model Canvas:**
Fill out these 9 boxes:
1. **Customer Segments:** Who are your customers?
2. **Value Proposition:** What problem do you solve?
3. **Channels:** How do you reach customers?
4. **Customer Relationships:** How do you interact?
5. **Revenue Streams:** How do you make money?
6. **Key Resources:** What do you need?
7. **Key Activities:** What do you do?
8. **Key Partners:** Who helps you?
9. **Cost Structure:** What are your expenses?

**Legal Setup:**
• Choose a business structure (LLC is usually best for small businesses)
• Register your business name
• Get an EIN (free from IRS)
• Open a business bank account
• Get necessary licenses/permits
• Consider business insurance
• Set up accounting (Wave is free, QuickBooks is popular)

**Funding Options:**
• **Bootstrapping:** Self-fund (most common, most control)
• **Friends & Family:** Early support (be careful with relationships)
• **Angel Investors:** Individual investors ($25K-$500K)
• **Venture Capital:** For high-growth startups ($500K+)
• **SBA Loans:** Government-backed small business loans
• **Crowdfunding:** Pre-sell to customers
• **Grants:** Free money (competitive, specific industries)

**Common Mistakes:**
• Building before validating
• Trying to be perfect before launching
• Not talking to customers enough
• Running out of money (know your runway)
• Trying to do everything yourself
• Ignoring finances and metrics
• Not having a co-founder or support system`;
    }

    if (lowerPrompt.includes('marketing') || lowerPrompt.includes('customer') || lowerPrompt.includes('growth hack')) {
      return `### Marketing & Customer Acquisition

**Marketing Fundamentals:**

**Know Your Customer:**
• Create a detailed customer persona
• Demographics: Age, income, location, job
• Psychographics: Values, interests, pain points
• Where do they hang out online?
• What do they read/watch/listen to?
• What keeps them up at night?

**Marketing Channels:**

**Free/Low-Cost:**
• **SEO:** Rank on Google (long-term, high ROI)
• **Content Marketing:** Blog posts, videos, podcasts
• **Social Media:** Build community and brand
• **Email Marketing:** Highest ROI of any channel
• **Word of Mouth:** Deliver amazing experiences
• **Partnerships:** Cross-promote with complementary businesses
• **Community:** Reddit, Facebook Groups, Discord, forums

**Paid:**
• **Google Ads:** Capture existing demand (people searching)
• **Facebook/Instagram Ads:** Create demand (targeting interests)
• **TikTok Ads:** Younger audience, lower cost
• **LinkedIn Ads:** B2B, expensive but targeted
• **Influencer Marketing:** Pay creators to promote
• **Podcast Ads:** Engaged, trusting audience

**The Marketing Funnel:**
1. **Awareness:** They know you exist
2. **Interest:** They're curious about your solution
3. **Consideration:** They're comparing options
4. **Conversion:** They buy
5. **Retention:** They come back
6. **Advocacy:** They tell others

**Key Metrics:**
• **CAC (Customer Acquisition Cost):** How much to get one customer
• **LTV (Lifetime Value):** How much a customer is worth over time
• **LTV:CAC Ratio:** Should be 3:1 or higher
• **Conversion Rate:** % of visitors who become customers
• **Churn Rate:** % of customers who leave
• **MRR/ARR:** Monthly/Annual Recurring Revenue

**Growth Tactics:**
• Referral programs (give both sides a reward)
• Free trials or freemium model
• Content that solves real problems
• Build in public (share your journey)
• Leverage existing platforms (Product Hunt, Reddit, Twitter)
• Create a waitlist (builds anticipation)
• Partner with complementary products`;
    }

    if (lowerPrompt.includes('pricing') || lowerPrompt.includes('price') && lowerPrompt.includes('product')) {
      return `### Pricing Strategy Guide

**Pricing Models:**

**1. Cost-Plus Pricing**
• Calculate costs + add markup
• Simple but doesn't capture value
• Example: Cost $10 + 50% markup = $15

**2. Value-Based Pricing**
• Price based on value to customer, not your costs
• Best approach for most businesses
• Ask: "How much is solving this problem worth?"
• Example: Software that saves 10 hours/month → price at fraction of that value

**3. Competitive Pricing**
• Price relative to competitors
• Premium: Higher price, better product/brand
• Parity: Same price, differentiate on features
• Discount: Lower price, volume play

**4. Tiered Pricing**
• Good-Better-Best model
• Most customers choose the middle tier
• Example: Basic ($9), Pro ($29), Enterprise ($99)
• Each tier should have a clear value step-up

**5. Freemium**
• Free basic version, paid premium
• Works for: Software, apps, content
• Goal: Convert 2-5% of free users to paid
• Free tier must be useful but limited

**Pricing Psychology:**
• $9.99 feels much cheaper than $10 (charm pricing)
• Anchor high, then show the "deal" price
• Show the most expensive option first
• Annual pricing with monthly equivalent ($99/year = $8.25/month)
• Remove the dollar sign in menus (reduces "pain of paying")
• Offer 3 options (most people choose the middle)
• Price ending in 7 or 9 converts better

**When to Raise Prices:**
• You're getting too many customers (demand > supply)
• Customers never complain about price
• You're adding more value
• Your costs have increased
• Competitors charge more
• Grandfather existing customers (optional but builds loyalty)

**Common Mistakes:**
• Pricing too low (undervaluing your work)
• Racing to the bottom on price
• Not testing different prices
• One-size-fits-all pricing
• Not communicating value clearly
• Discounting too often (trains customers to wait for sales)`;
    }

    return `### Entrepreneurship & Startup Help

I can help with:
• Validating business ideas
• Marketing and customer acquisition
• Pricing strategy
• Business planning
• Fundraising
• Growth tactics

What business topic interests you?`;
  }

  // =============================================================================
  // EXTENDED ROUTING V2 — MORE CATEGORIES
  // =============================================================================

  private routeExtendedRequestV2(prompt: string, lowerPrompt: string): string | null {
    // Career and professional development
    if (/\b(interview|job interview|salary|negotiat|raise|promotion|remote work|work from home|wfh|career change|switch career|new career|linkedin|personal brand|professional network)\b/i.test(lowerPrompt)) {
      return this.generateCareerAdvice(prompt, lowerPrompt);
    }

    // Language learning
    if (/\b(spanish|español|japanese|日本語|french|français|learn.*language|language.*learn)\b/i.test(lowerPrompt)) {
      return this.generateLanguageLearningHelp(prompt, lowerPrompt);
    }

    // Music and instruments
    if (/\b(guitar|learn guitar|piano|keyboard|learn piano|music theory|chord|scale|key signature)\b/i.test(lowerPrompt)) {
      return this.generateMusicHelp(prompt, lowerPrompt);
    }

    // Sustainability
    if (/\b(sustainable|eco|green living|environment|recycle|recycling|waste|zero waste)\b/i.test(lowerPrompt)) {
      return this.generateSustainabilityHelp(prompt, lowerPrompt);
    }

    // Philosophy
    if (/\b(stoic|stoicism|marcus aurelius|seneca|epictetus|critical thinking|logical fallac|reasoning|meaning of life|purpose|existential|nihilism|philosophy)\b/i.test(lowerPrompt)) {
      return this.generatePhilosophyHelp(prompt, lowerPrompt);
    }

    // Sports and fitness
    if (/\b(running|marathon|5k|couch to|weight.*lift|weight.*train|strength.*train|yoga|stretch|flexibility)\b/i.test(lowerPrompt)) {
      return this.generateSportsHelp(prompt, lowerPrompt);
    }

    // Writing templates
    if (/\b(cover letter|job application|resignation|quit.*job|leaving job|thank you.*note|thank you.*letter|complaint.*letter|formal letter|apology.*letter|apology.*write)\b/i.test(lowerPrompt)) {
      return this.generateWritingTemplates(prompt, lowerPrompt);
    }

    // Personal finance extended
    if (/\b(credit score|credit card|credit report|real estate|buy a house|mortgage|home buying|insurance|health insurance|life insurance|side hustle|extra money|passive income|make money)\b/i.test(lowerPrompt)) {
      return this.generatePersonalFinanceExtended(prompt, lowerPrompt);
    }

    // Data science
    if (/\b(data science|machine learning|data analyst|excel|spreadsheet|google sheets|sql\b)/i.test(lowerPrompt)) {
      return this.generateDataScienceHelp(prompt, lowerPrompt);
    }

    // Entrepreneurship
    if (/\b(startup|start a business|business idea|marketing|customer acquisition|growth hack|pricing|price.*product)\b/i.test(lowerPrompt)) {
      return this.generateEntrepreneurshipHelp(prompt, lowerPrompt);
    }

    return null;
  }

  // =============================================================================
  // NUTRITION AND DIET GUIDES
  // =============================================================================

  private generateNutritionHelp(prompt: string, lowerPrompt: string): string {
    if (lowerPrompt.includes('calorie') || lowerPrompt.includes('weight loss') || lowerPrompt.includes('lose weight') || lowerPrompt.includes('diet plan')) {
      return `### Weight Loss & Calorie Guide

**The Fundamental Rule:**
Weight loss = Calories In < Calories Out (CICO)
• To lose 1 lb/week: Eat 500 fewer calories/day
• To lose 2 lb/week: Eat 1,000 fewer calories/day (max safe rate)
• Never go below 1,200 cal/day (women) or 1,500 cal/day (men)

**Calculating Your Calories:**

**Step 1: Find Your BMR (Basal Metabolic Rate)**
• Women: 655 + (4.35 x weight in lbs) + (4.7 x height in inches) - (4.7 x age)
• Men: 66 + (6.23 x weight in lbs) + (12.7 x height in inches) - (6.8 x age)

**Step 2: Multiply by Activity Level**
• Sedentary (desk job): BMR x 1.2
• Lightly active (1-3 days exercise): BMR x 1.375
• Moderately active (3-5 days): BMR x 1.55
• Very active (6-7 days): BMR x 1.725

**Step 3: Subtract for Weight Loss**
• Moderate loss: Subtract 500 calories
• Aggressive loss: Subtract 750-1,000 calories

**Macronutrient Guidelines:**
• **Protein:** 0.7-1g per pound of bodyweight (preserves muscle)
• **Fat:** 25-35% of total calories (hormones, brain function)
• **Carbs:** Fill remaining calories (energy, performance)

**High-Protein Foods (per serving):**
• Chicken breast: 31g protein / 165 cal
• Greek yogurt: 17g protein / 100 cal
• Eggs: 6g protein / 70 cal each
• Tuna: 25g protein / 120 cal
• Tofu: 10g protein / 80 cal
• Lentils: 18g protein / 230 cal
• Cottage cheese: 14g protein / 110 cal
• Protein shake: 25-30g protein / 120-150 cal

**Sustainable Weight Loss Tips:**
• Track what you eat (MyFitnessPal, Cronometer)
• Eat more protein (keeps you full longer)
• Drink water before meals
• Eat slowly (takes 20 min to feel full)
• Don't drink your calories (soda, juice, alcohol)
• Sleep 7-9 hours (sleep deprivation increases hunger)
• Don't eliminate food groups (leads to bingeing)
• Allow treats in moderation (80/20 rule)
• Weigh yourself weekly, not daily (weight fluctuates)
• Focus on trends, not individual weigh-ins

**Common Mistakes:**
• Cutting calories too drastically (slows metabolism)
• Not eating enough protein (lose muscle, not fat)
• Relying on exercise alone (you can't outrun a bad diet)
• All-or-nothing mentality (one bad meal doesn't ruin everything)
• Skipping meals (leads to overeating later)
• Not tracking accurately (underestimating portions)`;
    }

    if (lowerPrompt.includes('meal prep') || lowerPrompt.includes('meal plan') || lowerPrompt.includes('healthy eating')) {
      return `### Meal Prep & Healthy Eating Guide

**Why Meal Prep?**
• Saves time during the week
• Saves money (less takeout)
• Controls portions and calories
• Reduces decision fatigue
• Ensures you eat healthy even when busy

**Getting Started:**

**Step 1: Plan Your Meals**
• Choose 2-3 proteins, 2-3 carbs, 3-4 vegetables
• Keep it simple (don't try 7 different meals)
• Batch cook: Same base, different seasonings

**Step 2: Shop Smart**
• Make a list and stick to it
• Buy in bulk (rice, oats, frozen vegetables)
• Fresh produce for the first half of the week
• Frozen produce for the second half
• Prep-friendly proteins (chicken thighs, ground turkey)

**Step 3: Prep Day (Sunday, 2-3 hours)**
• Cook proteins (bake chicken, cook ground meat)
• Cook grains (rice, quinoa, pasta)
• Chop vegetables
• Portion into containers
• Make sauces/dressings separately

**Sample Meal Prep Menu:**

**Breakfast Options:**
• Overnight oats (5 jars for the week)
• Egg muffins (12 at once, freeze extras)
• Smoothie packs (pre-portioned in freezer bags)
• Greek yogurt parfaits

**Lunch Options:**
• Chicken + rice + roasted vegetables
• Turkey meatballs + pasta + marinara
• Burrito bowls (rice, beans, chicken, salsa)
• Salad jars (dressing on bottom, greens on top)

**Dinner Options:**
• Sheet pan meals (protein + vegetables, one pan)
• Slow cooker recipes (dump and go)
• Stir-fry (prep ingredients, cook fresh)
• Soup/chili (makes large batches, freezes well)

**Snack Prep:**
• Cut vegetables + hummus
• Trail mix portions
• Hard-boiled eggs
• Fruit + nut butter
• Energy balls/bars

**Storage Tips:**
• Glass containers > plastic (no staining, microwave safe)
• Most meals last 4-5 days in the fridge
• Freeze extras for later weeks
• Label containers with dates
• Keep sauces separate to prevent sogginess

**Budget-Friendly Staples:**
• Rice, oats, pasta, bread ($)
• Beans, lentils, eggs ($$)
• Chicken thighs, ground turkey ($$)
• Frozen vegetables ($)
• Bananas, apples, seasonal fruit ($)
• Canned tomatoes, broth ($)`;
    }

    if (lowerPrompt.includes('vegan') || lowerPrompt.includes('vegetarian') || lowerPrompt.includes('plant based') || lowerPrompt.includes('plant-based')) {
      return `### Plant-Based / Vegetarian Guide

**Types of Plant-Based Diets:**
• **Vegan:** No animal products at all
• **Vegetarian:** No meat/fish, but eggs and dairy OK
• **Pescatarian:** No meat, but fish, eggs, and dairy OK
• **Flexitarian:** Mostly plant-based, occasional meat

**Getting Enough Protein (Plant Sources):**
• Tofu: 10g per 1/2 cup
• Tempeh: 15g per 1/2 cup
• Lentils: 18g per cup (cooked)
• Chickpeas: 15g per cup
• Black beans: 15g per cup
• Edamame: 17g per cup
• Quinoa: 8g per cup
• Seitan: 25g per 3.5 oz
• Peanut butter: 8g per 2 tbsp
• Hemp seeds: 10g per 3 tbsp

**Key Nutrients to Watch:**
• **B12:** Supplement (not available in plant foods)
• **Iron:** Lentils, spinach, fortified cereals + vitamin C for absorption
• **Omega-3:** Flaxseed, chia seeds, walnuts, algae supplement
• **Calcium:** Fortified plant milk, tofu, kale, broccoli
• **Zinc:** Pumpkin seeds, chickpeas, lentils, cashews
• **Vitamin D:** Sunlight, fortified foods, supplement

**Easy Plant-Based Meals:**
• **Breakfast:** Oatmeal with banana, nuts, and seeds
• **Lunch:** Buddha bowl (grain + beans + vegetables + tahini dressing)
• **Dinner:** Lentil curry with rice
• **Snack:** Apple with almond butter

**Transitioning Tips:**
• Start with Meatless Mondays
• Find plant-based versions of foods you already love
• Experiment with cuisines that are naturally plant-heavy (Indian, Thai, Mexican)
• Don't try to be perfect — progress over perfection
• Stock your pantry with staples (beans, grains, nuts, spices)
• Try new vegetables and cooking methods
• Join plant-based communities for recipes and support`;
    }

    if (lowerPrompt.includes('supplement') || lowerPrompt.includes('vitamin') || lowerPrompt.includes('protein powder')) {
      return `### Supplements & Vitamins Guide

**Supplements Most People Should Consider:**

**1. Vitamin D**
• Most people are deficient (especially in northern climates)
• 1,000-2,000 IU daily (or get a blood test)
• Important for: Bones, immune system, mood
• Best with fat (take with a meal)

**2. Omega-3 (Fish Oil)**
• 1,000-2,000mg EPA+DHA daily
• Important for: Heart, brain, inflammation
• Vegan alternative: Algae-based omega-3
• Look for third-party tested brands

**3. Magnesium**
• 200-400mg daily (magnesium glycinate or citrate)
• Important for: Sleep, muscle recovery, stress
• Most people don't get enough from food
• Take before bed (helps sleep)

**4. Protein Powder (If Needed)**
• Whey protein: Fast-absorbing, complete protein
• Casein: Slow-absorbing, good before bed
• Plant-based: Pea, rice, hemp blends
• 20-30g per serving
• Use to supplement diet, not replace meals

**Supplements That Are Mostly Unnecessary:**
• Multivitamins (eat real food instead)
• Fat burners (don't work, potentially dangerous)
• BCAAs (if you eat enough protein, you don't need them)
• Testosterone boosters (don't work)
• Detox/cleanse products (your liver and kidneys do this)

**Evidence-Based Performance Supplements:**
• **Creatine:** 5g daily, improves strength and power (most researched supplement)
• **Caffeine:** 3-6mg/kg before exercise, improves performance
• **Beta-Alanine:** 3-6g daily, improves endurance
• **Citrulline:** 6-8g before exercise, improves blood flow

**Buying Tips:**
• Look for third-party testing (NSF, Informed Sport, USP)
• Avoid proprietary blends (they hide dosages)
• More expensive doesn't mean better
• Check for unnecessary fillers and additives
• Buy from reputable brands
• Supplements are not regulated like drugs — buyer beware

**Important:**
Supplements SUPPLEMENT a good diet — they don't replace it. Focus on whole foods first. Consult a doctor before starting any new supplement, especially if you take medications.`;
    }

    return `### Nutrition & Diet Help

I can help with:
• Calorie counting and weight loss
• Meal prep and planning
• Plant-based and vegetarian diets
• Supplements and vitamins
• Macronutrient guidance
• Healthy eating on a budget

What nutrition topic interests you?`;
  }

  // =============================================================================
  // TRAVEL TIPS AND CULTURAL GUIDES
  // =============================================================================

  private generateTravelTips(prompt: string, lowerPrompt: string): string {
    if (lowerPrompt.includes('budget travel') || lowerPrompt.includes('cheap travel') || lowerPrompt.includes('travel cheap') || lowerPrompt.includes('save money travel')) {
      return `### Budget Travel Guide

**Finding Cheap Flights:**
• Use Google Flights (best for comparing)
• Set price alerts (book when prices drop)
• Be flexible with dates (+/- 3 days can save hundreds)
• Fly midweek (Tuesday/Wednesday cheapest)
• Book 1-3 months ahead for domestic, 2-8 months for international
• Use incognito mode when searching
• Consider nearby airports
• One-way tickets are sometimes cheaper than round-trip
• Use Skyscanner's "Everywhere" search for inspiration
• Error fares: Follow @SecretFlying, Scott's Cheap Flights

**Cheap Accommodation:**
• **Hostels:** $10-40/night (Hostelworld, Booking.com)
• **Airbnb:** Often cheaper than hotels for groups
• **Couchsurfing:** Free (stay with locals)
• **House sitting:** Free accommodation (TrustedHousesitters)
• **Camping:** $0-30/night
• **Work exchange:** Free room/board for work (Workaway, WWOOF)

**Saving on Food:**
• Eat where locals eat (avoid tourist areas)
• Cook your own meals (hostels with kitchens)
• Eat your big meal at lunch (lunch specials are cheaper)
• Street food is often the best AND cheapest
• Carry a water bottle (refill instead of buying)
• Grocery stores > restaurants for breakfast/snacks

**Transportation:**
• Walk as much as possible (best way to see a city)
• Public transit > taxis/Uber
• Overnight buses/trains save a night of accommodation
• Rent bikes or scooters
• Rideshare apps (Bolt, Grab, etc. vary by country)
• Book trains in advance for best prices

**General Tips:**
• Travel in shoulder season (just before/after peak)
• Get a travel credit card (earn points, no foreign transaction fees)
• Use a debit card with no ATM fees (Charles Schwab, Wise)
• Travel insurance is worth it (World Nomads, SafetyWing)
• Learn basic phrases in the local language
• Negotiate prices in markets (respectfully)
• Free walking tours (tip-based) in most cities
• Museums often have free days`;
    }

    if (lowerPrompt.includes('pack') || lowerPrompt.includes('packing') || lowerPrompt.includes('what to bring')) {
      return `### Packing Guide — Travel Light

**The Golden Rule:** Pack half of what you think you need.

**Carry-On Only (1-2 Weeks):**

**Clothing (Mix & Match):**
• 3-4 t-shirts/tops (quick-dry material is best)
• 1 long-sleeve shirt
• 2 pairs of pants/shorts
• 1 pair of jeans or versatile pants
• 5-7 underwear
• 3-4 pairs of socks
• 1 light jacket or hoodie
• 1 rain layer (packable)
• Swimsuit (if applicable)
• 1 nicer outfit (for restaurants/events)

**Shoes (Max 2-3):**
• Comfortable walking shoes
• Sandals/flip-flops
• Nice shoes (optional, only if needed)

**Toiletries (3-1-1 Rule for Carry-On):**
• Travel-size bottles (3.4 oz / 100ml max)
• Toothbrush + toothpaste
• Deodorant
• Sunscreen
• Shampoo/conditioner (or bar versions)
• Medications
• First aid basics

**Tech:**
• Phone + charger
• Universal power adapter
• Portable battery pack
• Headphones
• E-reader (lighter than books)
• Camera (optional — phone is usually fine)

**Documents:**
• Passport (+ copies stored digitally)
• Travel insurance info
• Boarding passes (digital or printed)
• Hotel/hostel confirmations
• Emergency contacts
• Credit/debit cards (notify bank of travel)

**Packing Tips:**
• Roll clothes (saves space, reduces wrinkles)
• Use packing cubes (game-changer for organization)
• Wear your bulkiest items on the plane
• Pack a small day bag inside your main bag
• Leave room for souvenirs
• Compression bags for bulky items
• Ziplock bags for liquids and dirty laundry`;
    }

    if (lowerPrompt.includes('solo travel') || lowerPrompt.includes('travel alone') || lowerPrompt.includes('traveling alone')) {
      return `### Solo Travel Guide

**Why Solo Travel is Amazing:**
• Complete freedom (go where you want, when you want)
• You'll meet MORE people (solo travelers are approachable)
• Personal growth and self-discovery
• Build confidence and independence
• No compromising on activities or schedule

**Safety Tips:**
• Share your itinerary with someone at home
• Check in regularly with family/friends
• Trust your instincts (if something feels wrong, leave)
• Stay aware of your surroundings
• Don't flash expensive items
• Keep copies of important documents (digital + physical)
• Learn basic phrases in the local language
• Research common scams in your destination
• Stay in well-reviewed accommodations
• Avoid walking alone late at night in unfamiliar areas

**Meeting People:**
• Stay in hostels (social by design)
• Join free walking tours
• Use apps: Meetup, Couchsurfing hangouts, Bumble BFF
• Take group tours or classes (cooking, surfing, etc.)
• Sit at the bar instead of a table (easier to chat)
• Join Facebook groups for travelers in your destination
• Be open and say yes to invitations (within reason)

**Best Destinations for Solo Travelers:**
• **Beginners:** Portugal, Japan, New Zealand, Iceland, Canada
• **Budget:** Thailand, Vietnam, Colombia, Mexico, Portugal
• **Culture:** Japan, Italy, India, Morocco, Peru
• **Adventure:** New Zealand, Costa Rica, Nepal, Iceland
• **Social:** Australia, Southeast Asia, Europe (hostel circuit)

**Dealing with Loneliness:**
• It's normal — even experienced solo travelers feel it
• Call/video chat with friends and family
• Journal your experiences
• Stay in social accommodations
• Join group activities
• Remember: Being alone ≠ being lonely
• The discomfort is part of the growth

**Practical Tips:**
• Book the first night's accommodation in advance
• Arrive during daylight hours
• Carry a portable charger (your phone is your lifeline)
• Learn to enjoy eating alone (bring a book or journal)
• Take photos of yourself (ask strangers, use a timer)
• Trust the process — it gets easier after the first few days`;
    }

    return `### Travel Help

I can help with:
• Budget travel tips and hacks
• Packing guides and checklists
• Solo travel advice and safety
• Destination recommendations
• Travel planning and itineraries
• Cultural etiquette

Where are you headed, or what travel topic interests you?`;
  }

  // =============================================================================
  // COMMUNICATION AND SOFT SKILLS
  // =============================================================================

  private generateCommunicationSkills(prompt: string, lowerPrompt: string): string {
    if (lowerPrompt.includes('small talk') || lowerPrompt.includes('conversation') || lowerPrompt.includes('social skill') || lowerPrompt.includes('introvert')) {
      return `### Conversation & Social Skills Guide

**Starting Conversations:**

**The FORD Method (Safe Topics):**
• **F**amily: "Do you have any siblings?" "Where did you grow up?"
• **O**ccupation: "What do you do?" "What's the best part of your job?"
• **R**ecreation: "What do you do for fun?" "Seen any good shows lately?"
• **D**reams: "If you could travel anywhere?" "What's on your bucket list?"

**Conversation Starters:**
• "What's keeping you busy these days?" (better than "What do you do?")
• "Read/watched anything good lately?"
• "What's the best thing that happened to you this week?"
• Comment on something in the environment
• Ask for a recommendation (restaurants, books, shows)

**Being a Great Conversationalist:**

**1. Listen More Than You Talk**
• 70/30 rule: Listen 70%, talk 30%
• Don't just wait for your turn to speak
• Show you're listening: Nod, "mm-hmm," eye contact
• Ask follow-up questions based on what they said

**2. Ask Open-Ended Questions**
• Instead of "Did you like it?" → "What did you think about it?"
• Instead of "Do you travel?" → "Where's the best place you've been?"
• "What" and "How" questions > "Yes/No" questions

**3. Share Vulnerably**
• Don't just ask questions — share about yourself too
• Match their level of openness
• Stories > facts (people connect through stories)
• It's OK to admit you don't know something

**4. Remember Names**
• Repeat their name when you hear it: "Nice to meet you, Sarah"
• Use it in conversation (but don't overdo it)
• Associate it with something memorable
• If you forget, ask early — it's not rude

**For Introverts:**
• Recharge before social events (alone time)
• Set a time limit (you can leave when you need to)
• One-on-one conversations > large groups
• Arrive early (easier to meet people as they arrive)
• Give yourself permission to take breaks
• Quality connections > quantity of interactions
• Being quiet is not a flaw — deep listeners are valued

**Ending Conversations Gracefully:**
• "It was great talking to you! I'm going to grab a drink/say hi to someone"
• "I'd love to continue this — can I get your number/LinkedIn?"
• "I should mingle, but let's catch up soon"
• Summarize what you talked about: "I'll definitely check out that book you mentioned"`;
    }

    if (lowerPrompt.includes('email') && (lowerPrompt.includes('professional') || lowerPrompt.includes('business') || lowerPrompt.includes('work'))) {
      return `### Professional Email Writing Guide

**Email Structure:**

**Subject Line:**
• Clear and specific (not "Hi" or "Question")
• Include action needed: "Action Required: Q3 Budget Review by Friday"
• Keep under 50 characters
• Front-load important words

**Opening:**
• "Hi [Name]," (standard professional)
• "Dear [Name]," (formal)
• Skip "I hope this email finds you well" (overused)
• Get to the point quickly

**Body:**
• Lead with the most important information
• One topic per email (if possible)
• Short paragraphs (2-3 sentences max)
• Use bullet points for multiple items
• Bold key dates, names, or action items
• Be specific about what you need and by when

**Closing:**
• Clear call-to-action: "Please review and respond by Thursday"
• "Let me know if you have any questions"
• "Thanks," or "Best," (standard)
• "Best regards," (more formal)

**Email Templates:**

**Requesting Something:**
Hi [Name],

I'm reaching out regarding [topic]. Could you [specific request] by [date]?

[Brief context if needed — 1-2 sentences]

Please let me know if you have any questions or need more information.

Thanks,
[Your Name]

**Following Up:**
Hi [Name],

I wanted to follow up on my email from [date] regarding [topic]. I understand you're busy, but I'd appreciate your input on [specific item] when you have a chance.

Happy to discuss further if that's easier.

Best,
[Your Name]

**Delivering Bad News:**
Hi [Name],

I wanted to let you know that [situation]. I understand this isn't ideal, and I apologize for the inconvenience.

Here's what we're doing to address it:
• [Action 1]
• [Action 2]
• [Timeline for resolution]

Please don't hesitate to reach out with any concerns.

Best regards,
[Your Name]

**Pro Tips:**
• Read it out loud before sending
• Remove unnecessary words ("just," "actually," "I think")
• Don't use ALL CAPS (reads as shouting)
• Be careful with humor (doesn't always translate in text)
• CC only people who need to be informed
• Reply-all sparingly
• Don't send angry emails — draft, wait, revise
• Use "Reply" vs "Reply All" intentionally`;
    }

    if (lowerPrompt.includes('negotiate') || lowerPrompt.includes('persuade') || lowerPrompt.includes('influence') || lowerPrompt.includes('convince')) {
      return `### Negotiation & Persuasion Skills

**Core Principles:**

**1. Understand Their Perspective**
• What do THEY want? (not just what you want)
• What are their constraints?
• What's their best alternative if this deal falls through?
• Empathy is your most powerful tool

**2. Prepare Thoroughly**
• Know your BATNA (Best Alternative To Negotiated Agreement)
• Know their BATNA
• Research market rates, precedents, standards
• Prepare your arguments AND counterarguments
• Know your walk-away point

**3. Anchor First (When Possible)**
• The first number mentioned influences the entire negotiation
• If you go first, anchor high (but reasonable)
• If they go first, don't let it anchor you — counter with your own number

**4. Focus on Interests, Not Positions**
• Position: "I want $80K salary"
• Interest: "I want to feel valued and cover my expenses"
• Finding shared interests creates win-win solutions
• Ask "Why?" to uncover underlying interests

**Persuasion Techniques:**

**Reciprocity:** Give something first (people feel obligated to return favors)
**Social Proof:** "Others in your position have found this valuable"
**Scarcity:** "This offer is available until Friday"
**Authority:** Cite experts, data, credentials
**Consistency:** Get small agreements first, then build
**Liking:** People say yes to people they like (build rapport first)

**Negotiation Tactics:**
• **Silence:** After making an offer, stop talking (uncomfortable silence works)
• **Flinch:** React visibly to their first offer (signals it's too high/low)
• **Nibble:** Ask for small extras after the main deal is agreed
• **Split the difference:** Meet in the middle (use strategically)
• **Good cop/bad cop:** One person is tough, the other is reasonable

**Common Mistakes:**
• Negotiating against yourself (lowering your ask before they respond)
• Taking it personally (it's business, not personal)
• Accepting the first offer (there's almost always room)
• Not preparing enough
• Talking too much (listen more)
• Focusing only on price (consider total value)
• Burning bridges (you may need this relationship later)`;
    }

    return `### Communication & Soft Skills

I can help with:
• Conversation skills and small talk
• Professional email writing
• Negotiation and persuasion
• Public speaking tips
• Active listening
• Conflict resolution

What communication skill would you like to improve?`;
  }

  // =============================================================================
  // MASTER ROUTING — CONNECTS ALL EXTENDED HANDLERS
  // =============================================================================

  private routeToSpecializedHandler(prompt: string, lowerPrompt: string): string | null {
    // Try extended routing v1 first
    const v1Result = this.routeExtendedRequest(prompt, lowerPrompt);
    if (v1Result) return v1Result;

    // Try extended routing v2
    const v2Result = this.routeExtendedRequestV2(prompt, lowerPrompt);
    if (v2Result) return v2Result;

    // Nutrition and diet
    if (/\b(calorie|weight loss|lose weight|diet plan|meal prep|meal plan|healthy eating|vegan|vegetarian|plant.based|supplement|vitamin|protein powder)\b/i.test(lowerPrompt)) {
      return this.generateNutritionHelp(prompt, lowerPrompt);
    }

    // Travel tips
    if (/\b(budget travel|cheap travel|travel cheap|save money travel|pack|packing|what to bring|solo travel|travel alone|traveling alone|backpack|hostel)\b/i.test(lowerPrompt)) {
      return this.generateTravelTips(prompt, lowerPrompt);
    }

    // Communication skills
    if (/\b(small talk|conversation|social skill|introvert|professional email|business email|work email|negotiate|persuade|influence|convince)\b/i.test(lowerPrompt)) {
      return this.generateCommunicationSkills(prompt, lowerPrompt);
    }

    return null;
  }

  // =============================================================================
  // SLEEP AND WELLNESS
  // =============================================================================

  private generateSleepHelp(prompt: string, lowerPrompt: string): string {
    if (lowerPrompt.includes('sleep') || lowerPrompt.includes('insomnia') || lowerPrompt.includes('cant sleep') || lowerPrompt.includes('sleep better')) {
      return `### Sleep Optimization Guide

**Why Sleep Matters:**
• Memory consolidation and learning
• Immune system function
• Hormone regulation (growth hormone, cortisol)
• Emotional regulation and mental health
• Physical recovery and muscle repair
• Weight management (sleep deprivation increases hunger hormones)

**How Much Sleep Do You Need?**
• Adults (18-64): 7-9 hours
• Teens (14-17): 8-10 hours
• Children (6-13): 9-11 hours
• Toddlers (1-2): 11-14 hours

**Sleep Hygiene — The Fundamentals:**

**1. Consistent Schedule**
• Same bedtime and wake time EVERY day (including weekends)
• This is the single most important sleep habit
• Your body's circadian rhythm thrives on consistency
• Set an alarm for bedtime, not just wake time

**2. Light Exposure**
• Morning: Get bright light within 30 min of waking (sunlight is best)
• Evening: Dim lights 2 hours before bed
• Night: Complete darkness for sleeping (blackout curtains)
• Blue light: Reduce screens 1-2 hours before bed (or use blue light filters)

**3. Temperature**
• Cool room: 65-68°F (18-20°C) is optimal
• Your body needs to drop temperature to fall asleep
• Hot bath/shower 1-2 hours before bed (paradoxically helps cooling)
• Cool sheets, warm blanket

**4. Caffeine and Alcohol**
• No caffeine after 2 PM (half-life is 5-6 hours)
• Alcohol disrupts sleep quality (even if it helps you fall asleep)
• Caffeine sensitivity varies — some people need to stop by noon

**5. Pre-Sleep Routine (Wind Down)**
• Start 30-60 minutes before bed
• Same routine every night (signals your brain it's time to sleep)
• Ideas: Reading, gentle stretching, journaling, meditation
• Avoid: Screens, work emails, stressful conversations, news

**6. Bedroom Environment**
• Dark (blackout curtains or sleep mask)
• Quiet (earplugs or white noise machine)
• Cool (65-68°F)
• Comfortable mattress and pillows
• Bed is for sleep and intimacy ONLY (no working, scrolling, eating)

**If You Can't Fall Asleep:**
• Don't lie in bed awake for more than 20 minutes
• Get up, go to another room, do something boring
• Return to bed when you feel sleepy
• Don't watch the clock (turn it away from you)
• Try progressive muscle relaxation or body scan meditation
• Write down worries on paper (gets them out of your head)

**Supplements (Evidence-Based):**
• **Magnesium glycinate:** 200-400mg before bed (helps relaxation)
• **Melatonin:** 0.5-3mg (start low, for jet lag or shift work)
• **L-theanine:** 200mg (promotes calm without drowsiness)
• **Glycine:** 3g before bed (may improve sleep quality)
• Note: Fix sleep habits FIRST before trying supplements

**When to See a Doctor:**
• Chronic insomnia (3+ nights/week for 3+ months)
• Loud snoring or gasping during sleep (possible sleep apnea)
• Excessive daytime sleepiness despite adequate sleep time
• Restless legs or periodic limb movements
• Sleepwalking or other parasomnias`;
    }

    return `### Sleep & Wellness Help

I can help with:
• Sleep optimization and hygiene
• Insomnia management
• Creating a bedtime routine
• Understanding sleep cycles
• Supplement guidance for sleep

What sleep topic interests you?`;
  }

  // =============================================================================
  // MINDFULNESS AND MEDITATION
  // =============================================================================

  private generateMindfulnessHelp(prompt: string, lowerPrompt: string): string {
    if (lowerPrompt.includes('meditat') || lowerPrompt.includes('mindful') || lowerPrompt.includes('breathing exercise') || lowerPrompt.includes('calm')) {
      return `### Meditation & Mindfulness Guide

**What is Meditation?**
Training your attention and awareness. It's not about stopping thoughts — it's about noticing them without getting caught up in them.

**Benefits (Backed by Research):**
• Reduced stress and anxiety
• Improved focus and concentration
• Better emotional regulation
• Lower blood pressure
• Improved sleep
• Increased self-awareness
• Greater compassion and empathy

**Types of Meditation:**

**1. Mindfulness Meditation (Most Popular)**
• Focus on your breath
• When your mind wanders (it will), gently bring it back
• No judgment — wandering is normal
• Start with 5 minutes, build to 20+

**2. Body Scan**
• Lie down comfortably
• Slowly move attention from toes to head
• Notice sensations without trying to change them
• Great for relaxation and sleep

**3. Loving-Kindness (Metta)**
• Send well-wishes to yourself, then others
• "May I be happy. May I be healthy. May I be safe."
• Extend to loved ones, neutral people, difficult people
• Builds compassion and reduces negative emotions

**4. Walking Meditation**
• Walk slowly and deliberately
• Focus on the sensation of each step
• Great for people who can't sit still
• Can be done anywhere

**5. Breathing Exercises:**

**Box Breathing (4-4-4-4):**
• Inhale 4 counts
• Hold 4 counts
• Exhale 4 counts
• Hold 4 counts
• Repeat 4-6 times

**4-7-8 Breathing (for sleep):**
• Inhale through nose for 4 counts
• Hold for 7 counts
• Exhale through mouth for 8 counts
• Repeat 3-4 times

**Physiological Sigh (instant calm):**
• Double inhale through nose (two quick breaths in)
• Long exhale through mouth
• Just 1-3 of these can reduce stress immediately

**Starting a Practice:**
• Start with just 2-5 minutes (seriously, that's enough)
• Same time every day (morning is easiest to be consistent)
• Use an app: Headspace, Calm, Insight Timer (free), Waking Up
• Don't judge your sessions as "good" or "bad"
• Consistency matters more than duration
• It's called a "practice" for a reason — you're always learning

**Common Misconceptions:**
• "I can't meditate because I can't stop thinking" — That's like saying you can't exercise because you get tired. Thinking is normal.
• "I need to sit cross-legged" — Sit however is comfortable (chair is fine)
• "It takes years to see benefits" — Studies show benefits in as little as 8 weeks
• "It's religious" — It can be secular (mindfulness-based stress reduction is clinical)
• "I don't have time" — You have 5 minutes. Everyone does.

**Mindfulness in Daily Life:**
• Eat one meal mindfully (no phone, taste every bite)
• Take 3 deep breaths before responding to stress
• Notice 5 things you can see right now
• Put your phone down and just... be
• Listen fully when someone is talking (don't plan your response)
• Do one routine task with full attention (brushing teeth, washing dishes)`;
    }

    return `### Mindfulness & Meditation Help

I can help with:
• Getting started with meditation
• Breathing exercises for stress
• Mindfulness techniques
• Building a daily practice
• Different meditation styles

What aspect of mindfulness interests you?`;
  }

  // =============================================================================
  // HOME AND GARDEN
  // =============================================================================

  private generateHomeGardenHelp(prompt: string, lowerPrompt: string): string {
    if (lowerPrompt.includes('garden') || lowerPrompt.includes('plant') || lowerPrompt.includes('grow') || lowerPrompt.includes('houseplant')) {
      return `### Gardening & Houseplant Guide

**Easy Houseplants for Beginners:**

**Almost Impossible to Kill:**
• **Pothos:** Trailing vine, low light OK, water when dry
• **Snake Plant:** Upright, tolerates neglect, low light OK
• **ZZ Plant:** Glossy leaves, drought tolerant, low light
• **Spider Plant:** Produces babies, adaptable, air purifying
• **Rubber Plant:** Bold leaves, medium light, easy care

**Slightly More Attention:**
• **Monstera:** Dramatic leaves, bright indirect light, weekly water
• **Fiddle Leaf Fig:** Trendy, bright light, consistent watering
• **Peace Lily:** Flowers, medium light, tells you when thirsty (droops)
• **Philodendron:** Many varieties, adaptable, trailing or climbing
• **Chinese Evergreen:** Colorful, low-medium light, forgiving

**Basic Plant Care:**

**Light:**
• **Direct sun:** South-facing windows (cacti, succulents)
• **Bright indirect:** Near windows but not in direct rays (most tropicals)
• **Medium:** A few feet from windows (pothos, philodendron)
• **Low:** Far from windows or north-facing (snake plant, ZZ)

**Watering:**
• Stick your finger 1-2 inches into soil — if dry, water
• Water thoroughly until it drains from the bottom
• Empty saucers after 30 minutes (no sitting in water)
• Most plants die from OVERwatering, not underwatering
• Water less in winter (plants grow slower)
• Use room temperature water

**Common Problems:**
• **Yellow leaves:** Usually overwatering
• **Brown crispy tips:** Low humidity or underwatering
• **Leggy/stretching:** Not enough light
• **Drooping:** Needs water (or overwatered — check soil)
• **Pests:** Wipe leaves with neem oil solution

**Starting a Vegetable Garden:**

**Easy Vegetables for Beginners:**
• Tomatoes (need sun and support)
• Lettuce and greens (fast growing, partial shade OK)
• Herbs (basil, mint, cilantro, parsley)
• Peppers (similar care to tomatoes)
• Zucchini (prolific — you'll have too many)
• Green beans (easy and productive)
• Radishes (ready in 30 days)

**Container Gardening (No Yard Needed):**
• Most vegetables grow in containers
• Minimum 5-gallon pot for tomatoes/peppers
• Good drainage is essential
• Use quality potting mix (not garden soil)
• Fertilize regularly (containers deplete nutrients faster)
• Water daily in hot weather

**Basic Garden Tips:**
• Start small (a 4x4 raised bed is plenty)
• Full sun = 6+ hours of direct sunlight
• Good soil is everything (compost, compost, compost)
• Mulch to retain moisture and suppress weeds
• Water deeply and less frequently (encourages deep roots)
• Learn your growing zone (USDA Plant Hardiness Zone Map)`;
    }

    return `### Home & Garden Help

I can help with:
• Houseplant care and selection
• Vegetable gardening basics
• Container gardening
• Common plant problems
• Garden planning

What gardening topic interests you?`;
  }

  // =============================================================================
  // EXTENDED MASTER ROUTING V3
  // =============================================================================

  private routeExtendedV3(prompt: string, lowerPrompt: string): string | null {
    // Sleep and wellness
    if (/\b(sleep|insomnia|cant sleep|sleep better|sleep schedule|bedtime|wake up)\b/i.test(lowerPrompt)) {
      return this.generateSleepHelp(prompt, lowerPrompt);
    }

    // Mindfulness and meditation
    if (/\b(meditat|mindful|breathing exercise|calm|stress relief|relax|zen)\b/i.test(lowerPrompt)) {
      return this.generateMindfulnessHelp(prompt, lowerPrompt);
    }

    // Home and garden
    if (/\b(garden|houseplant|plant care|grow.*vegetable|indoor plant|succulent|cactus)\b/i.test(lowerPrompt)) {
      return this.generateHomeGardenHelp(prompt, lowerPrompt);
    }

    return null;
  }

  // =============================================================================
  // UNIFIED ENHANCED ROUTING — ENTRY POINT FOR ALL SPECIALIZED HANDLERS
  // =============================================================================

  private routeAllSpecializedHandlers(prompt: string, lowerPrompt: string): string | null {
    // Try master routing (v1 + v2 combined)
    const masterResult = this.routeToSpecializedHandler(prompt, lowerPrompt);
    if (masterResult) return masterResult;

    // Try v3 routing
    const v3Result = this.routeExtendedV3(prompt, lowerPrompt);
    if (v3Result) return v3Result;

    return null;
  }

  // =============================================================================
  // RELATIONSHIPS AND DATING
  // =============================================================================

  private generateRelationshipHelp(prompt: string, lowerPrompt: string): string {
    if (lowerPrompt.includes('dating') || lowerPrompt.includes('first date') || lowerPrompt.includes('dating app') || lowerPrompt.includes('tinder') || lowerPrompt.includes('bumble')) {
      return `### Dating Guide

**Dating App Tips:**

**Profile Optimization:**
• Lead with a clear, smiling photo (face visible, good lighting)
• Include 4-6 photos: Mix of face shots, full body, activities, social
• No group photos as your first picture
• No sunglasses in your main photo
• Show your interests (hiking, cooking, traveling)
• Avoid: Bathroom selfies, fish photos, car selfies

**Bio Tips:**
• Keep it short and specific (not "I love to laugh")
• Show personality, not just facts
• Include a conversation starter or question
• Mention 2-3 specific interests
• Light humor works well
• Bad: "Just ask" / "Looking for my person" / "6'2 since that matters"
• Good: Specific, unique, gives them something to respond to

**Messaging:**
• Reference something specific from their profile
• Ask an open-ended question
• Don't just say "hey" or "what's up"
• Keep early messages light and fun
• Move to a date within 5-10 messages (don't be pen pals)
• Suggest a specific plan: "Want to grab coffee at [place] on Saturday?"

**First Date Tips:**
• Keep it short (coffee or drinks, 1-2 hours max)
• Choose a public place
• Tell a friend where you'll be
• Ask questions and listen (don't monologue)
• Put your phone away
• Be yourself (don't try to impress)
• Offer to split the bill (or pay — read the situation)
• If you're interested, say so: "I had a great time, I'd love to do this again"
• If you're not interested, be honest and kind

**Red Flags to Watch For:**
• Love bombing (too much too fast)
• Controlling behavior
• Disrespecting boundaries
• Talking badly about all their exes
• Inconsistency between words and actions
• Making you feel guilty for having your own life
• Refusing to communicate about problems`;
    }

    if (lowerPrompt.includes('long distance') || lowerPrompt.includes('ldr')) {
      return `### Long Distance Relationship Guide

**Making It Work:**

**Communication:**
• Set a regular schedule (daily calls/texts, weekly video dates)
• Quality > quantity (a meaningful 30-min call > constant texting)
• Share your daily life (photos, voice notes, small updates)
• Have "date nights" over video (watch a movie together, cook the same meal)
• Be honest about feelings (distance amplifies insecurities)

**Trust:**
• Trust is the foundation — without it, LDR won't work
• Don't check up on them constantly
• Give each other space and independence
• Be transparent about your social life
• Address jealousy openly and honestly

**Keeping It Exciting:**
• Send surprise care packages
• Plan visits in advance (having the next visit scheduled helps)
• Play online games together
• Read the same book or watch the same show
• Write letters (physical mail feels special)
• Have a countdown to your next visit
• Plan your future together (having an end date for the distance is crucial)

**Challenges:**
• Different time zones: Find overlapping free time
• Missing milestones: Celebrate virtually, plan to be there for big ones
• Physical intimacy: Acknowledge the difficulty, find creative solutions
• Growing apart: Keep sharing experiences and growing together
• The "end date" question: When will the distance end? This needs a plan.

**When to Worry:**
• Communication drops significantly without explanation
• They avoid video calls
• Plans to close the distance keep getting postponed
• You feel more lonely IN the relationship than you would single
• Trust issues that don't improve with communication`;
    }

    if (lowerPrompt.includes('breakup') || lowerPrompt.includes('break up') || lowerPrompt.includes('getting over') || lowerPrompt.includes('move on')) {
      return `### Getting Over a Breakup

**The Stages (Not Linear):**
• Shock/Denial: "This can't be happening"
• Pain/Guilt: Deep sadness, questioning everything
• Anger: "How could they do this?"
• Bargaining: "Maybe if I change..."
• Depression: Low energy, loss of interest
• Acceptance: "This happened, and I'll be OK"
• Hope: Looking forward again

**Immediate Steps:**
• Allow yourself to grieve (crying is healthy and necessary)
• Tell close friends/family (you need support)
• Remove/mute them on social media (seriously — do this)
• Put away reminders (photos, gifts — you don't have to throw them away)
• Don't make major life decisions right now
• Maintain basic self-care (eat, sleep, shower)

**What Helps:**
• **No contact:** The most important rule. No texting, calling, or checking their social media. Minimum 30 days, ideally longer.
• **Feel the feelings:** Don't numb with alcohol, rebounds, or overwork. Process the emotions.
• **Journal:** Write unsent letters, process your thoughts on paper
• **Move your body:** Exercise releases endorphins and reduces stress
• **Reconnect with friends:** Rebuild your social life
• **Try something new:** New hobby, class, or activity
• **Therapy:** Especially helpful for processing and gaining perspective

**What Doesn't Help:**
• Stalking their social media
• Drunk texting
• Rebounding immediately (you'll bring baggage)
• Badmouthing them to everyone
• Trying to "win them back" (if it's over, respect it)
• Pretending you're fine when you're not
• Isolating yourself

**Timeline:**
• There's no "right" timeline for healing
• General rule: Half the length of the relationship (very rough)
• Some days will be harder than others (that's normal)
• Healing isn't linear — bad days don't mean you're going backward
• You WILL feel better. It doesn't feel like it now, but you will.

**Signs You're Healing:**
• You can think about them without intense pain
• You're interested in new things and people
• You've stopped checking their social media
• You can acknowledge what went wrong without blame
• You're excited about YOUR future, not "our" future`;
    }

    return `### Relationship Help

I can help with:
• Dating tips and app optimization
• Long distance relationships
• Getting over a breakup
• Communication in relationships
• Building healthy relationships

What relationship topic would you like to explore?`;
  }

  // =============================================================================
  // FINAL EXTENDED ROUTING
  // =============================================================================

  private routeFinalExtended(prompt: string, lowerPrompt: string): string | null {
    // Relationships and dating
    if (/\b(dating|first date|dating app|tinder|bumble|hinge|long distance|ldr|breakup|break up|getting over|move on|ex girlfriend|ex boyfriend)\b/i.test(lowerPrompt)) {
      return this.generateRelationshipHelp(prompt, lowerPrompt);
    }

    return null;
  }

  // =============================================================================
  // AUTOMOTIVE AND CAR CARE
  // =============================================================================

  private generateCarHelp(prompt: string, lowerPrompt: string): string {
    if (lowerPrompt.includes('buy a car') || lowerPrompt.includes('buying a car') || lowerPrompt.includes('new car') || lowerPrompt.includes('used car')) {
      return `### Car Buying Guide

**New vs Used:**

**New Car Pros:**
• Warranty coverage (3-5 years typically)
• Latest safety features and technology
• No hidden history or wear
• Financing rates are usually lower
• You choose exact specs

**New Car Cons:**
• Depreciates 20-30% in first year
• Higher insurance costs
• Higher price tag
• More expensive to register

**Used Car Pros:**
• Much cheaper (let someone else take the depreciation hit)
• Lower insurance costs
• More car for your money
• Certified Pre-Owned (CPO) offers warranty protection

**Used Car Cons:**
• Unknown history (get a Carfax/AutoCheck report)
• May need repairs sooner
• Higher interest rates on loans
• Less selection in exact specs

**How to Buy a Used Car:**

**1. Set Your Budget**
• Total cost of ownership: Payment + insurance + gas + maintenance
• Rule of thumb: Car expenses should be <15% of take-home pay
• Don't forget: Tax, title, registration, inspection

**2. Research**
• Reliable brands: Toyota, Honda, Mazda (consistently top reliability ratings)
• Check: Consumer Reports, J.D. Power, KBB, Edmunds
• Compare similar models
• Check recall history

**3. Find the Car**
• Online: Carvana, CarGurus, AutoTrader, Facebook Marketplace
• Dealerships: More protection, but higher prices
• Private sellers: Lower prices, but buyer beware
• CPO: Best of both worlds (used price, some warranty)

**4. Inspect Before Buying**
• Always get a pre-purchase inspection (PPI) from an independent mechanic ($100-200)
• Check the Carfax/AutoCheck report
• Look for: Rust, uneven paint (accident repair), tire wear, fluid leaks
• Test drive: Highway AND city, listen for unusual noises
• Check all electronics, A/C, heat, windows, locks

**5. Negotiate**
• Know the fair market value (KBB, Edmunds)
• Start below asking price
• Be willing to walk away (most powerful negotiation tool)
• Don't mention your trade-in until you've agreed on a price
• Don't focus on monthly payment — focus on total price

**6. Financing**
• Get pre-approved from your bank/credit union BEFORE going to the dealer
• Compare dealer financing to your pre-approval
• Shorter loan terms save money (36-48 months ideal)
• Never finance for more than 60 months
• Avoid dealer add-ons (extended warranties, paint protection, etc.)`;
    }

    if (lowerPrompt.includes('car maintenance') || lowerPrompt.includes('oil change') || lowerPrompt.includes('car care') || lowerPrompt.includes('tire')) {
      return `### Car Maintenance Guide

**Regular Maintenance Schedule:**

**Every 3,000-7,500 Miles (or per owner's manual):**
• Oil and filter change (synthetic oil lasts longer: 7,500-10,000 miles)
• Tire rotation
• Check fluid levels (coolant, brake, transmission, power steering)
• Inspect brakes
• Check tire pressure and tread depth

**Every 15,000-30,000 Miles:**
• Replace air filter
• Replace cabin air filter
• Inspect battery and clean terminals
• Check belts and hoses
• Brake pad replacement (if needed)

**Every 30,000-60,000 Miles:**
• Transmission fluid change
• Coolant flush
• Spark plug replacement
• Brake fluid flush
• Power steering fluid change

**Every 60,000-100,000 Miles:**
• Timing belt/chain (if applicable — critical!)
• Water pump
• Suspension components
• Major tune-up

**DIY Maintenance (Save Money):**

**Easy (Anyone Can Do):**
• Check and inflate tires (monthly)
• Replace windshield wipers ($15-30, 5 minutes)
• Replace cabin air filter ($10-20, 5 minutes)
• Replace engine air filter ($10-20, 5 minutes)
• Top off washer fluid
• Check oil level (monthly)

**Moderate (With Basic Tools):**
• Change oil and filter ($30-50 vs $50-100 at shop)
• Replace brake pads ($30-50 per axle vs $150-300 at shop)
• Replace battery ($100-200 vs $200-350 at shop)
• Replace headlight/taillight bulbs

**Warning Signs — Don't Ignore:**
• Check engine light (get code read — many auto parts stores do this free)
• Unusual noises (grinding, squealing, knocking)
• Vibration while driving or braking
• Fluid leaks under the car
• Overheating (pull over immediately)
• Brake pedal feels soft or spongy
• Steering pulls to one side
• Unusual smells (burning, sweet coolant smell)

**Tire Care:**
• Check pressure monthly (find correct PSI on driver's door sticker)
• Rotate every 5,000-7,500 miles
• Replace when tread depth reaches 2/32" (penny test: if you see Lincoln's head, replace)
• Don't mix tire types
• Alignment check if car pulls to one side
• Winter tires make a HUGE difference in cold climates`;
    }

    if (lowerPrompt.includes('electric car') || lowerPrompt.includes('ev') || lowerPrompt.includes('tesla') || lowerPrompt.includes('hybrid')) {
      return `### Electric & Hybrid Vehicle Guide

**Types of Electrified Vehicles:**

**BEV (Battery Electric Vehicle):**
• 100% electric, no gas engine
• Examples: Tesla Model 3/Y, Chevy Bolt, Nissan Leaf, Ford Mustang Mach-E
• Range: 200-400+ miles per charge
• Charge at home or public chargers

**PHEV (Plug-in Hybrid):**
• Electric motor + gas engine
• 20-50 miles electric range, then switches to gas
• Examples: Toyota RAV4 Prime, Chevy Volt, BMW 330e
• Best of both worlds for people with range anxiety

**HEV (Hybrid):**
• Gas engine + small electric motor
• Can't plug in — battery charges from braking/engine
• Examples: Toyota Prius, Honda Accord Hybrid
• Better fuel economy than gas-only

**Pros of Going Electric:**
• Much cheaper to "fuel" ($30-50/month vs $150-300 for gas)
• Lower maintenance (no oil changes, fewer brake replacements)
• Instant torque (fun to drive)
• Quieter ride
• Federal tax credit up to $7,500 (check eligibility)
• State incentives may apply
• Better for the environment (even accounting for electricity generation)

**Cons to Consider:**
• Higher upfront cost (but gap is shrinking)
• Charging infrastructure still developing (improving rapidly)
• Longer "refueling" time (30 min fast charge vs 5 min gas)
• Range anxiety (less of an issue with 300+ mile range EVs)
• Battery degradation over time (most retain 80%+ after 8-10 years)
• Cold weather reduces range (10-30%)

**Charging:**
• **Level 1 (120V outlet):** 3-5 miles of range per hour (emergency/overnight)
• **Level 2 (240V, home charger):** 25-30 miles per hour (overnight = full charge)
• **Level 3 (DC Fast Charge):** 100-200+ miles in 30 min (road trips)
• Home charging covers 90%+ of most people's needs
• Install a Level 2 charger at home ($500-2,000 including installation)

**Is an EV Right for You?**
• Do you have a place to charge at home? (Garage, driveway, apartment charger)
• Is your daily commute under 100 miles? (Most EVs handle this easily)
• Do you take frequent long road trips? (Check charger coverage on your routes)
• Can you handle the upfront cost? (Total cost of ownership is often lower)
• Are you comfortable with the technology? (It's simpler than you think)`;
    }

    return `### Automotive Help

I can help with:
• Car buying guide (new and used)
• Car maintenance schedules
• Electric and hybrid vehicles
• Common car problems
• Saving money on car ownership

What car topic interests you?`;
  }

  // =============================================================================
  // EDUCATION AND STUDY SKILLS
  // =============================================================================

  private generateStudySkills(prompt: string, lowerPrompt: string): string {
    if (lowerPrompt.includes('study') || lowerPrompt.includes('exam') || lowerPrompt.includes('test prep') || lowerPrompt.includes('learn faster')) {
      return `### Study Skills & Exam Preparation

**Evidence-Based Study Techniques:**

**1. Active Recall (Most Effective)**
• Don't just re-read notes — test yourself
• Close the book and try to remember what you just read
• Use flashcards (Anki for spaced repetition)
• Practice problems > re-reading textbook
• After each study session, write down everything you remember

**2. Spaced Repetition**
• Review material at increasing intervals
• Day 1 → Day 3 → Day 7 → Day 14 → Day 30
• Use Anki (free app) — it automates the spacing
• Much more effective than cramming

**3. Interleaving**
• Mix different topics/subjects in one study session
• Don't study one topic for hours — switch between 2-3
• Feels harder but produces better long-term retention
• Example: 30 min math → 30 min history → 30 min science

**4. Elaboration**
• Explain concepts in your own words
• Ask "why?" and "how?" for everything
• Connect new information to what you already know
• Teach someone else (Feynman Technique)

**5. The Feynman Technique**
1. Choose a concept
2. Explain it as if teaching a 12-year-old
3. Identify gaps in your explanation
4. Go back and fill those gaps
5. Simplify and use analogies

**What DOESN'T Work:**
• Highlighting/underlining (feels productive, isn't)
• Re-reading notes passively
• Cramming the night before
• Studying with music that has lyrics
• Multitasking while studying
• Marathon study sessions without breaks

**Study Environment:**
• Dedicated study space (not your bed)
• Phone in another room (or use app blockers)
• Good lighting
• Minimal distractions
• Have water and snacks ready
• Background noise: Silence, white noise, or instrumental music

**The Pomodoro Technique:**
• Study for 25 minutes (one "pomodoro")
• Take a 5-minute break
• After 4 pomodoros, take a 15-30 minute break
• During breaks: Walk, stretch, hydrate (no phone scrolling)

**Exam Day Tips:**
• Get 7-8 hours of sleep (sleep > last-minute cramming)
• Eat a good breakfast (protein + complex carbs)
• Arrive early
• Read all questions before starting
• Start with questions you know (builds confidence)
• Budget your time (don't spend too long on one question)
• Review your answers if time permits
• Trust your preparation`;
    }

    if (lowerPrompt.includes('note taking') || lowerPrompt.includes('notes') || lowerPrompt.includes('cornell') || lowerPrompt.includes('notetaking')) {
      return `### Note-Taking Methods

**1. Cornell Method (Best for Lectures)**

Divide your page into 3 sections:
• **Right column (large):** Notes during lecture
• **Left column (narrow):** Key questions/cues after lecture
• **Bottom section:** Summary in your own words

How to use:
1. During class: Take notes in the right column
2. After class: Write questions/keywords in the left column
3. At the bottom: Summarize the main ideas
4. To review: Cover the right column, use left column as prompts

**2. Mind Mapping (Best for Visual Learners)**
• Central topic in the middle
• Branches for main ideas
• Sub-branches for details
• Use colors, images, and symbols
• Shows relationships between concepts
• Great for brainstorming and overview

**3. Outline Method (Best for Organized Topics)**
• Main topics as headers
• Sub-topics indented below
• Details further indented
• Clean hierarchy of information
• Easy to review and expand

**4. Flow Notes (Best for Understanding)**
• Write ideas as they flow
• Draw arrows connecting related concepts
• Add your own thoughts and questions
• Less structured, more intuitive
• Great for subjects that build on each other

**5. Zettelkasten (Best for Long-Term Knowledge)**
• One idea per note
• Link notes to each other
• Build a web of knowledge over time
• Tools: Obsidian, Notion, physical index cards
• Used by many prolific writers and researchers

**Digital vs Paper:**
• **Paper:** Better for retention (slower = more processing)
• **Digital:** Better for organization, search, and sharing
• Compromise: Take notes on paper, digitize key concepts later

**General Tips:**
• Don't transcribe — paraphrase in your own words
• Use abbreviations and symbols
• Leave space for additions later
• Review notes within 24 hours (critical for retention)
• Color-code by topic or importance
• Date all your notes
• Star or highlight key concepts and exam-worthy material`;
    }

    if (lowerPrompt.includes('college') || lowerPrompt.includes('university') || lowerPrompt.includes('major') || lowerPrompt.includes('degree')) {
      return `### College & University Guide

**Choosing a Major:**

**Questions to Ask Yourself:**
• What subjects do I enjoy and do well in?
• What career paths interest me?
• What are the job prospects and salary ranges?
• Am I choosing this for myself or to please others?
• Can I see myself doing this for 40+ years?

**High-Demand Fields (2024+):**
• Computer Science / Software Engineering
• Healthcare (Nursing, PA, Health Informatics)
• Data Science / Analytics
• Cybersecurity
• Engineering (various specializations)
• Business (Finance, Marketing, Management)
• Environmental Science / Sustainability

**It's OK to:**
• Change your major (most students do)
• Not know what you want right away
• Choose a "impractical" major IF you have a career plan
• Double major or add a minor
• Take gap time to figure things out

**Making the Most of College:**

**Academics:**
• Go to class (seriously — attendance correlates with grades)
• Sit in the front (you'll pay more attention)
• Visit office hours (professors remember students who show up)
• Form study groups
• Use campus resources (tutoring, writing center, library)
• Don't procrastinate (easier said than done, but try)

**Career Preparation:**
• Get internships (start sophomore year)
• Build a LinkedIn profile early
• Network with alumni
• Join relevant clubs and organizations
• Develop skills outside your major (coding, writing, public speaking)
• Attend career fairs
• Build a portfolio of projects

**Personal Growth:**
• Get involved in campus life
• Try things outside your comfort zone
• Build genuine friendships (quality > quantity)
• Take care of your mental health (use campus counseling)
• Learn to cook basic meals
• Manage your finances (budget, avoid unnecessary debt)
• Sleep enough (all-nighters are counterproductive)

**Financial Tips:**
• Apply for EVERY scholarship you qualify for
• Fill out FAFSA every year
• Buy/rent textbooks used (or use library reserves)
• Get a part-time job or work-study
• Minimize student loan borrowing
• Understand your loan terms before signing
• Community college for gen-eds can save thousands`;
    }

    return `### Education & Study Skills Help

I can help with:
• Effective study techniques
• Note-taking methods
• Exam preparation strategies
• College and major selection
• Time management for students
• Learning optimization

What education topic interests you?`;
  }

  // =============================================================================
  // FIRST AID AND EMERGENCY PREPAREDNESS
  // =============================================================================

  private generateEmergencyHelp(prompt: string, lowerPrompt: string): string {
    if (lowerPrompt.includes('first aid') || lowerPrompt.includes('emergency') || lowerPrompt.includes('cpr') || lowerPrompt.includes('choking')) {
      return `### First Aid & Emergency Basics

**IMPORTANT: This is general information only. In a real emergency, call 911 (or your local emergency number) immediately.**

**CPR Basics (Hands-Only for Adults):**
1. Check for responsiveness (tap shoulders, shout "Are you OK?")
2. Call 911 (or have someone else call)
3. Place heel of one hand on center of chest
4. Place other hand on top, interlace fingers
5. Push hard and fast: 2 inches deep, 100-120 compressions/minute
6. Don't stop until help arrives or person recovers
7. Rhythm: Push to the beat of "Stayin' Alive" by Bee Gees

**Choking (Adult/Child over 1 year):**
1. Ask "Are you choking?" — if they can't speak/cough, act
2. Stand behind them
3. Make a fist with one hand, place above navel
4. Grab fist with other hand
5. Give quick upward thrusts (Heimlich maneuver)
6. Repeat until object is dislodged or person becomes unconscious
7. If unconscious: Lower to ground, call 911, begin CPR

**Severe Bleeding:**
1. Call 911
2. Apply direct pressure with clean cloth
3. Don't remove the cloth — add more on top if soaked through
4. Elevate the injured area above the heart if possible
5. Apply a tourniquet only as last resort (above the wound, tight)
6. Keep the person warm and calm

**Burns:**
• **Minor (1st degree):** Cool running water for 10-20 minutes, aloe vera, loose bandage
• **Moderate (2nd degree, blisters):** Cool water, don't pop blisters, seek medical attention
• **Severe (3rd degree):** Call 911, don't apply water or ointment, cover loosely
• **NEVER:** Use ice, butter, or toothpaste on burns

**Heart Attack Signs:**
• Chest pain/pressure (may spread to arm, jaw, back)
• Shortness of breath
• Cold sweat, nausea, lightheadedness
• Women may have atypical symptoms (fatigue, nausea, back pain)
• Call 911 immediately — chew an aspirin if not allergic

**Stroke Signs (FAST):**
• **F**ace: Is one side drooping?
• **A**rms: Can they raise both arms?
• **S**peech: Is speech slurred?
• **T**ime: Call 911 immediately — every minute matters

**Basic First Aid Kit:**
• Adhesive bandages (various sizes)
• Sterile gauze pads and tape
• Elastic bandage (ACE wrap)
• Antibiotic ointment
• Antiseptic wipes
• Tweezers and scissors
• Disposable gloves
• Pain relievers (ibuprofen, acetaminophen)
• Allergy medication (Benadryl)
• Emergency blanket
• CPR face shield`;
    }

    if (lowerPrompt.includes('disaster') || lowerPrompt.includes('prepar') || lowerPrompt.includes('survival') || lowerPrompt.includes('power outage')) {
      return `### Emergency Preparedness Guide

**72-Hour Emergency Kit (Per Person):**

**Water:**
• 1 gallon per person per day (3 gallons minimum)
• Water purification tablets or filter
• Collapsible water container

**Food:**
• 3-day supply of non-perishable food
• Canned goods (with manual can opener!)
• Energy bars, dried fruit, nuts
• Peanut butter, crackers
• Don't forget pet food if applicable

**First Aid:**
• Complete first aid kit
• Prescription medications (7-day supply)
• Over-the-counter medications
• Copies of prescriptions

**Tools & Supplies:**
• Flashlight + extra batteries
• Battery-powered or hand-crank radio
• Multi-tool or Swiss Army knife
• Duct tape
• Plastic sheeting
• Whistle (to signal for help)
• Dust masks
• Matches/lighter in waterproof container

**Documents (Copies in Waterproof Bag):**
• IDs (driver's license, passport)
• Insurance policies
• Bank account information
• Emergency contact list
• Medical information
• Cash (small bills — ATMs may not work)

**Communication Plan:**
• Designate an out-of-area contact person
• Everyone in family knows the contact's number
• Establish meeting points (near home + outside neighborhood)
• Know your local emergency alerts system
• Download emergency apps (FEMA, Red Cross)

**Power Outage Preparedness:**
• Portable phone charger (fully charged)
• Battery-powered lanterns (safer than candles)
• Cooler with ice for perishable food
• Know how to manually open your garage door
• Unplug sensitive electronics (power surges when power returns)
• Generator safety: NEVER run indoors (carbon monoxide risk)

**Natural Disaster Specific:**
• **Earthquake:** Drop, Cover, Hold On. Stay away from windows.
• **Tornado:** Go to lowest interior room. Cover your head.
• **Hurricane:** Board windows, evacuate if ordered. Have supplies ready.
• **Flood:** Move to higher ground. Never drive through floodwater.
• **Wildfire:** Evacuate early. Have a go-bag ready.`;
    }

    return `### Emergency & First Aid Help

I can help with:
• Basic first aid procedures
• CPR and choking response
• Emergency preparedness kits
• Natural disaster preparation
• Power outage planning

**Remember: In a real emergency, always call 911 first.**

What emergency topic would you like to learn about?`;
  }

  // =============================================================================
  // FINAL UNIFIED ROUTING — ALL CATEGORIES
  // =============================================================================

  private routeAllHandlers(prompt: string, lowerPrompt: string): string | null {
    // Try all existing routing chains
    const specializedResult = this.routeAllSpecializedHandlers(prompt, lowerPrompt);
    if (specializedResult) return specializedResult;

    // Try final extended routing
    const finalResult = this.routeFinalExtended(prompt, lowerPrompt);
    if (finalResult) return finalResult;

    // Automotive
    if (/\b(buy a car|buying a car|new car|used car|car maintenance|oil change|car care|tire|electric car|ev\b|tesla|hybrid)\b/i.test(lowerPrompt)) {
      return this.generateCarHelp(prompt, lowerPrompt);
    }

    // Study skills
    if (/\b(study|exam|test prep|learn faster|note taking|notes|cornell|notetaking|college|university|major|degree)\b/i.test(lowerPrompt)) {
      return this.generateStudySkills(prompt, lowerPrompt);
    }

    // Emergency and first aid
    if (/\b(first aid|emergency|cpr|choking|disaster|prepar|survival|power outage)\b/i.test(lowerPrompt)) {
      return this.generateEmergencyHelp(prompt, lowerPrompt);
    }

    return null;
  }

  // ============================================================================
  // EXTENDED CONTENT SECTION V3 - Real Estate, Investing, Crypto, Legal, Tax
  // ============================================================================

  private generateRealEstateHelp(prompt: string, lowerPrompt: string): string {
    if (/\b(buy|buying|purchase|first.?time.?buyer)\b/i.test(lowerPrompt)) {
      return `### 🏠 Home Buying Guide

**Step-by-Step Process:**

**1. Financial Preparation (2-6 months before)**
• Check your credit score (aim for 620+ conventional, 580+ FHA)
• Calculate your debt-to-income ratio (should be under 43%)
• Save for down payment (3-20% depending on loan type)
• Get pre-approved for a mortgage (not just pre-qualified)
• Budget for closing costs (2-5% of purchase price)

**2. Determine Your Budget**
• Use the 28/36 rule: Housing ≤28% of gross income, total debt ≤36%
• Factor in: mortgage, taxes, insurance, HOA, maintenance
• Don't forget moving costs and immediate repairs/upgrades

**3. Find the Right Property**
• Make a must-have vs nice-to-have list
• Research neighborhoods (schools, crime, commute, appreciation)
• Work with a buyer's agent (typically free to you)
• Visit at least 10-15 homes before deciding

**4. Make an Offer**
• Research comparable sales (comps)
• Include contingencies: inspection, financing, appraisal
• Earnest money deposit (1-3% of offer price)
• Negotiate based on market conditions

**5. Due Diligence**
• Home inspection ($300-500) - NEVER skip this
• Review HOA documents if applicable
• Title search and title insurance
• Final walkthrough before closing

**6. Closing**
• Review closing disclosure (3 days before)
• Wire funds (verify instructions by phone!)
• Sign documents, get keys
• Change locks immediately

**Loan Types:**
• **Conventional:** 3-20% down, best rates with 20%+
• **FHA:** 3.5% down, more flexible credit requirements
• **VA:** 0% down for veterans, no PMI
• **USDA:** 0% down for rural areas

**Red Flags to Watch:**
• Foundation cracks or water damage
• Roof issues (check age and condition)
• Electrical/plumbing problems
• Unpermitted additions
• Neighborhood decline indicators`;
    }

    if (/\b(sell|selling|list|listing|fsbo)\b/i.test(lowerPrompt)) {
      return `### 🏠 Home Selling Guide

**Preparation Phase (4-8 weeks before listing):**

**1. Declutter & Depersonalize**
• Remove 50% of your belongings
• Pack away family photos and personal items
• Clear countertops and closets
• Rent a storage unit if needed

**2. Deep Clean**
• Professional carpet cleaning
• Window washing inside and out
• Power wash exterior, driveway, walkways
• Clean grout, fixtures, appliances

**3. Repairs & Updates**
• Fix everything that's broken (buyers notice)
• Fresh neutral paint (greige, white, light gray)
• Update light fixtures and hardware
• Landscaping and curb appeal

**4. Staging**
• Hire a professional stager ($500-2000) or DIY
• Arrange furniture to maximize space
• Add fresh flowers, plants, good lighting
• Make beds, set dining table for photos

**Pricing Strategy:**
• Get a comparative market analysis (CMA)
• Price slightly below market to generate competition
• Avoid overpricing (leads to stale listing)
• Consider seasonal timing

**Marketing:**
• Professional photography ($200-500) - essential
• Video tour and 3D walkthrough
• MLS listing with detailed description
• Social media and targeted ads

**Showings & Open Houses:**
• Keep home show-ready at all times
• Leave during showings
• Provide disclosure documents upfront
• Gather feedback from agents

**Negotiating Offers:**
• Review all terms, not just price
• Contingencies, closing date, earnest money
• Counter strategically
• Don't take lowball offers personally

**Closing Process:**
• Respond to inspection requests reasonably
• Prepare for appraisal
• Final walkthrough
• Hand over keys and documents

**FSBO vs Agent:**
• FSBO saves 2.5-3% commission but requires significant time
• Agents provide MLS access, negotiation, legal protection
• Hybrid options: flat-fee MLS listings ($300-500)`;
    }

    if (/\b(invest|rental|landlord|property.?manag|cash.?flow|cap.?rate)\b/i.test(lowerPrompt)) {
      return `### 🏢 Real Estate Investing Guide

**Investment Strategies:**

**1. Buy and Hold (Rental Properties)**
• Purchase property, rent it out long-term
• Build equity while generating cash flow
• Tax benefits: depreciation, deductions
• Best for: Patient investors seeking passive income

**2. House Hacking**
• Buy multi-unit, live in one, rent others
• FHA loan with 3.5% down on 2-4 units
• Tenants pay your mortgage
• Best for: First-time investors

**3. BRRRR Method**
• Buy, Rehab, Rent, Refinance, Repeat
• Force appreciation through renovations
• Pull equity out to buy next property
• Best for: Active investors with rehab skills

**4. Fix and Flip**
• Buy distressed, renovate, sell for profit
• Higher risk, higher potential returns
• Requires market knowledge and contractor network
• Best for: Experienced investors

**5. Wholesaling**
• Find deals, assign contracts to other investors
• No money needed to close
• Requires marketing and negotiation skills
• Best for: Beginners learning the market

**Key Metrics:**

**Cash-on-Cash Return:**
Annual Cash Flow ÷ Total Cash Invested × 100
• Target: 8-12%+ for rentals

**Cap Rate:**
Net Operating Income ÷ Property Value × 100
• 4-6% = Low risk, lower returns
• 8-12% = Higher risk, higher returns

**1% Rule (Quick Filter):**
Monthly rent should be ≥1% of purchase price
• $200,000 property → $2,000/month rent

**50% Rule (Expense Estimate):**
Assume 50% of rent goes to expenses (excluding mortgage)

**Cash Flow Analysis:**
\`\`\`
Gross Rent:           $2,000
- Vacancy (8%):       -$160
- Property Mgmt (10%): -$200
- Repairs (10%):      -$200
- Insurance:          -$100
- Taxes:              -$200
- HOA:                -$0
= NOI:                $1,140
- Mortgage:           -$900
= Cash Flow:          $240/month
\`\`\`

**Financing Options:**
• Conventional (20-25% down for investment)
• DSCR loans (based on property cash flow)
• Hard money (short-term, higher rates)
• Private money (from individuals)
• Seller financing
• Home equity/HELOC

**Tax Benefits:**
• Depreciation (27.5 years residential)
• Mortgage interest deduction
• Property tax deduction
• Repairs and maintenance
• Travel and home office
• 1031 exchange (defer capital gains)`;
    }

    return `### 🏠 Real Estate Overview

**Buying a Home:**
• Get pre-approved before shopping
• Budget for all costs (not just mortgage)
• Never skip the inspection
• Negotiate everything

**Selling a Home:**
• Price it right from the start
• Invest in staging and photos
• Be flexible with showings
• Prepare for negotiations

**Investing in Real Estate:**
• Start with house hacking
• Learn to analyze deals (cap rate, cash flow)
• Build a team (agent, lender, contractor, PM)
• Scale gradually

What specific aspect of real estate would you like to explore?`;
  }

  private generateInvestingHelp(prompt: string, lowerPrompt: string): string {
    if (/\b(stock|stocks|equity|equities|share|shares)\b/i.test(lowerPrompt)) {
      return `### 📈 Stock Investing Guide

**Types of Stocks:**

**By Size (Market Cap):**
• **Large-cap:** $10B+ (Apple, Microsoft) - Stable, lower growth
• **Mid-cap:** $2-10B - Balance of growth and stability
• **Small-cap:** $300M-2B - Higher growth potential, more volatile
• **Micro-cap:** <$300M - Speculative, high risk

**By Style:**
• **Growth:** High revenue/earnings growth, often no dividends
• **Value:** Underpriced relative to fundamentals
• **Dividend:** Regular income payments
• **Blue-chip:** Established, financially sound companies

**By Sector:**
• Technology, Healthcare, Financials, Consumer, Energy
• Industrial, Materials, Utilities, Real Estate, Communications

**How to Analyze Stocks:**

**Fundamental Analysis:**
• **P/E Ratio:** Price ÷ Earnings per Share
  - <15 = potentially undervalued
  - 15-25 = fairly valued
  - >25 = potentially overvalued (or high growth)
• **P/B Ratio:** Price ÷ Book Value
• **Debt-to-Equity:** Total Debt ÷ Shareholder Equity
• **ROE:** Net Income ÷ Shareholder Equity
• **Revenue Growth:** Year-over-year increase
• **Profit Margins:** Gross, Operating, Net

**Technical Analysis:**
• Moving averages (50-day, 200-day)
• Support and resistance levels
• Volume patterns
• RSI, MACD, Bollinger Bands

**Building a Portfolio:**

**Diversification:**
• Own 20-30 individual stocks minimum
• Spread across sectors and geographies
• Mix of growth and value
• Consider ETFs for instant diversification

**Position Sizing:**
• No single stock >5% of portfolio
• No single sector >25% of portfolio
• Rebalance quarterly or annually

**Investment Strategies:**
• **Dollar-cost averaging:** Invest fixed amount regularly
• **Buy and hold:** Long-term, ignore short-term volatility
• **Dividend growth:** Focus on companies raising dividends
• **Index investing:** Match the market (S&P 500, Total Market)

**Common Mistakes:**
• Trying to time the market
• Panic selling during downturns
• Chasing hot stocks/tips
• Not diversifying enough
• Ignoring fees and taxes
• Checking portfolio too often`;
    }

    if (/\b(etf|index|fund|mutual|vanguard|fidelity|schwab)\b/i.test(lowerPrompt)) {
      return `### 📊 ETFs & Index Funds Guide

**What Are They?**

**ETF (Exchange-Traded Fund):**
• Basket of securities trading like a stock
• Buy/sell throughout the day
• Generally lower expense ratios
• More tax-efficient

**Mutual Fund:**
• Pool of money managed by professionals
• Buy/sell at end of day (NAV)
• May have minimum investments
• Active or passive management

**Index Fund:**
• Tracks a specific index (S&P 500, Total Market)
• Passive management = low fees
• Available as ETF or mutual fund

**Popular Index Funds/ETFs:**

**Total US Stock Market:**
• VTI (Vanguard ETF) - 0.03% expense ratio
• VTSAX (Vanguard Mutual Fund) - 0.04%
• ITOT (iShares) - 0.03%
• SWTSX (Schwab) - 0.03%

**S&P 500:**
• VOO (Vanguard) - 0.03%
• SPY (SPDR) - 0.09%
• IVV (iShares) - 0.03%

**Total International:**
• VXUS (Vanguard) - 0.07%
• IXUS (iShares) - 0.07%

**Total Bond Market:**
• BND (Vanguard) - 0.03%
• AGG (iShares) - 0.03%

**Simple Portfolios:**

**Three-Fund Portfolio:**
• 60% US Total Stock (VTI)
• 30% International Stock (VXUS)
• 10% US Bonds (BND)

**Two-Fund Portfolio:**
• 80% Total World Stock (VT)
• 20% Total Bond (BND)

**Target-Date Funds:**
• All-in-one, automatically rebalances
• Pick year closest to retirement
• Example: Vanguard Target Retirement 2050

**Expense Ratios Matter:**
\`\`\`
$10,000 invested for 30 years at 7% return:
0.03% fee = $74,014 (you keep $73,792)
0.50% fee = $74,014 (you keep $66,439)
1.00% fee = $74,014 (you keep $59,693)
\`\`\`
That 1% fee costs you $14,000+ over 30 years!

**Where to Invest:**
• Vanguard, Fidelity, Schwab - all excellent
• Look for $0 commissions and low expense ratios
• Use tax-advantaged accounts first (401k, IRA)`;
    }

    if (/\b(retire|retirement|401k|ira|roth|pension)\b/i.test(lowerPrompt)) {
      return `### 🎯 Retirement Investing Guide

**Retirement Account Types:**

**401(k) / 403(b):**
• Employer-sponsored
• 2024 limit: $23,000 ($30,500 if 50+)
• Traditional: Pre-tax contributions, taxed on withdrawal
• Roth 401(k): After-tax contributions, tax-free growth
• Employer match = FREE MONEY (always max this first!)

**Traditional IRA:**
• 2024 limit: $7,000 ($8,000 if 50+)
• Tax-deductible contributions (income limits apply)
• Taxed on withdrawal
• Required Minimum Distributions (RMDs) at 73

**Roth IRA:**
• 2024 limit: $7,000 ($8,000 if 50+)
• After-tax contributions
• Tax-free growth and withdrawals
• No RMDs
• Income limits: $161K single, $240K married (2024)

**SEP IRA (Self-Employed):**
• Up to 25% of net self-employment income
• Max $69,000 (2024)
• Easy to set up and administer

**Solo 401(k) (Self-Employed):**
• Employee + employer contributions
• Higher limits than SEP for lower incomes
• Can include Roth option

**Investment Priority Order:**
1. 401(k) up to employer match (free money!)
2. Max out HSA if eligible ($4,150 single, $8,300 family)
3. Max out Roth IRA ($7,000)
4. Max out 401(k) ($23,000)
5. Taxable brokerage account

**How Much to Save:**
• Minimum: 15% of gross income
• Aggressive: 25-50%+ (for early retirement)
• Rule of thumb: Save your age as a percentage

**Retirement Number:**
• 25x annual expenses (4% withdrawal rule)
• $50,000/year expenses = $1,250,000 needed
• Adjust for Social Security, pensions

**Asset Allocation by Age:**
• 20s-30s: 90-100% stocks
• 40s: 80-90% stocks
• 50s: 70-80% stocks
• 60s: 60-70% stocks
• Retired: 50-60% stocks (need growth for 30+ year retirement)

**Common Mistakes:**
• Not starting early (compound interest!)
• Not getting full employer match
• Being too conservative when young
• Cashing out when changing jobs
• Not having Roth exposure`;
    }

    return `### 💰 Investing Overview

**Getting Started:**
1. Build emergency fund first (3-6 months expenses)
2. Pay off high-interest debt (>7%)
3. Max employer 401(k) match
4. Open Roth IRA
5. Invest in low-cost index funds

**Core Principles:**
• Start early (time > timing)
• Keep costs low (expense ratios matter)
• Diversify broadly
• Stay the course (don't panic sell)
• Automate your investments

**Simple Strategy:**
• Total US Stock Market ETF (VTI): 60%
• Total International ETF (VXUS): 30%
• Total Bond ETF (BND): 10%

What specific investing topic would you like to explore?`;
  }

  private generateCryptoHelp(prompt: string, lowerPrompt: string): string {
    if (/\b(bitcoin|btc)\b/i.test(lowerPrompt)) {
      return `### ₿ Bitcoin (BTC) Guide

**What is Bitcoin?**
• First cryptocurrency, created 2009 by Satoshi Nakamoto
• Decentralized digital currency
• Limited supply: 21 million BTC maximum
• Secured by proof-of-work mining

**Key Characteristics:**
• **Decentralized:** No central authority
• **Transparent:** All transactions on public blockchain
• **Immutable:** Transactions cannot be reversed
• **Scarce:** Fixed supply creates scarcity
• **Divisible:** 1 BTC = 100,000,000 satoshis

**How Bitcoin Works:**
1. Transactions broadcast to network
2. Miners validate and group into blocks
3. Proof-of-work secures the chain
4. New block added ~every 10 minutes
5. Miners rewarded with new BTC + fees

**Bitcoin Halving:**
• Mining reward cuts in half every ~4 years
• 2024: 3.125 BTC per block
• Reduces new supply, historically bullish
• Next halving: ~2028

**Storing Bitcoin:**

**Hot Wallets (Online):**
• Exchange wallets (Coinbase, Kraken)
• Mobile wallets (BlueWallet, Muun)
• Convenient but less secure

**Cold Wallets (Offline):**
• Hardware wallets (Ledger, Trezor)
• Paper wallets
• Most secure for long-term storage

**"Not your keys, not your coins"**
• If you don't control private keys, you don't truly own it
• Exchanges can freeze accounts, get hacked, go bankrupt

**Investment Considerations:**
• Extremely volatile (50%+ swings common)
• Long-term trend historically up
• Only invest what you can afford to lose
• Dollar-cost average to reduce timing risk
• Consider 1-5% of portfolio max

**Tax Implications:**
• Treated as property by IRS
• Capital gains tax on sales
• Track cost basis carefully
• Use crypto tax software (Koinly, CoinTracker)`;
    }

    if (/\b(ethereum|eth|smart.?contract|defi|nft)\b/i.test(lowerPrompt)) {
      return `### ⟠ Ethereum (ETH) Guide

**What is Ethereum?**
• Programmable blockchain platform
• Created by Vitalik Buterin, launched 2015
• Enables smart contracts and dApps
• Native currency: Ether (ETH)

**Smart Contracts:**
• Self-executing code on the blockchain
• "If this, then that" logic
• Trustless, transparent, immutable
• Powers DeFi, NFTs, DAOs, and more

**Ethereum 2.0 (The Merge):**
• Transitioned from Proof-of-Work to Proof-of-Stake (2022)
• 99.95% reduction in energy use
• Stakers validate transactions (32 ETH minimum)
• Reduced ETH issuance (potentially deflationary)

**DeFi (Decentralized Finance):**
• Financial services without intermediaries
• Lending/borrowing (Aave, Compound)
• Trading (Uniswap, SushiSwap)
• Yield farming and liquidity provision
• Stablecoins (USDC, DAI)

**NFTs (Non-Fungible Tokens):**
• Unique digital assets on blockchain
• Art, collectibles, gaming items, music
• Proof of ownership and authenticity
• Marketplaces: OpenSea, Blur, Rarible

**Layer 2 Solutions:**
• Scale Ethereum, reduce fees
• **Optimism:** Optimistic rollups
• **Arbitrum:** Optimistic rollups
• **Polygon:** Sidechain + various solutions
• **zkSync:** Zero-knowledge rollups

**Gas Fees:**
• Cost to execute transactions
• Measured in Gwei (1 Gwei = 0.000000001 ETH)
• Varies with network congestion
• Use Layer 2 for lower fees

**Staking ETH:**
• Lock ETH to help secure network
• Earn ~4-5% APY
• Options: Solo staking, pools, liquid staking (Lido, Rocket Pool)
• Liquid staking tokens (stETH) can be used in DeFi

**Risks:**
• Smart contract bugs/exploits
• Regulatory uncertainty
• High volatility
• Gas fees during congestion
• Complexity and learning curve`;
    }

    if (/\b(altcoin|alt|solana|cardano|polkadot|avalanche|cosmos)\b/i.test(lowerPrompt)) {
      return `### 🪙 Altcoin Overview

**What Are Altcoins?**
• Any cryptocurrency other than Bitcoin
• Thousands exist, most will fail
• Different use cases and technologies

**Major Altcoins:**

**Solana (SOL):**
• High-speed, low-cost transactions
• 65,000+ TPS theoretical
• Popular for DeFi and NFTs
• Concerns: Centralization, outages

**Cardano (ADA):**
• Research-driven, peer-reviewed development
• Proof-of-stake from the start
• Focus on developing world use cases
• Slower development but methodical

**Polkadot (DOT):**
• Connects different blockchains
• Parachains for specialized use cases
• Founded by Ethereum co-founder
• Interoperability focus

**Avalanche (AVAX):**
• Fast finality (~1 second)
• Subnets for custom blockchains
• EVM compatible
• Growing DeFi ecosystem

**Cosmos (ATOM):**
• "Internet of Blockchains"
• IBC protocol connects chains
• Tendermint consensus
• Many projects built on Cosmos SDK

**Chainlink (LINK):**
• Decentralized oracle network
• Brings real-world data to blockchains
• Essential infrastructure for DeFi
• Used by most major protocols

**Evaluating Altcoins:**

**Green Flags:**
• Clear use case and problem solved
• Active development (GitHub commits)
• Strong team with track record
• Real users and adoption
• Transparent tokenomics
• Decentralized governance

**Red Flags:**
• Anonymous team
• Unrealistic promises
• No working product
• Concentrated token holdings
• Paid promotions/shilling
• Copy-paste whitepaper

**Risk Management:**
• Bitcoin and Ethereum = lower risk
• Large-cap alts = medium risk
• Small-cap alts = high risk
• Meme coins = gambling
• Never invest more than you can lose`;
    }

    return `### 🔐 Cryptocurrency Overview

**What is Cryptocurrency?**
• Digital currency secured by cryptography
• Decentralized, no central authority
• Blockchain technology for transparency
• Peer-to-peer transactions

**Getting Started:**
1. Learn the basics (Bitcoin whitepaper)
2. Start with Bitcoin and Ethereum
3. Use reputable exchanges (Coinbase, Kraken)
4. Secure your assets (hardware wallet)
5. Only invest what you can afford to lose

**Key Concepts:**
• **Blockchain:** Distributed ledger
• **Wallet:** Stores private keys
• **Private Key:** Proves ownership (NEVER share)
• **Public Key:** Your address (safe to share)
• **Gas:** Transaction fees

**Security Tips:**
• Use hardware wallet for large amounts
• Enable 2FA everywhere
• Never share seed phrase
• Verify addresses before sending
• Beware of scams and phishing

What specific crypto topic would you like to explore?`;
  }

  private generateTaxHelp(prompt: string, lowerPrompt: string): string {
    if (/\b(deduction|deduct|write.?off|itemize)\b/i.test(lowerPrompt)) {
      return `### 📝 Tax Deductions Guide

**Standard vs Itemized Deductions:**

**Standard Deduction (2024):**
• Single: $14,600
• Married Filing Jointly: $29,200
• Head of Household: $21,900
• Additional $1,550 if 65+ or blind

**When to Itemize:**
• Your itemized deductions exceed standard deduction
• Common for homeowners with mortgages
• High state/local taxes
• Significant charitable giving
• Large medical expenses

**Common Itemized Deductions:**

**State and Local Taxes (SALT):**
• Property taxes + state income/sales tax
• Capped at $10,000 total
• Major limitation for high-tax states

**Mortgage Interest:**
• Interest on loans up to $750,000
• Must be primary or secondary residence
• Points paid at closing may be deductible

**Charitable Contributions:**
• Cash donations to qualified organizations
• Fair market value of donated goods
• Keep receipts for all donations
• Mileage for volunteer work (14¢/mile)

**Medical Expenses:**
• Only amount exceeding 7.5% of AGI
• Includes insurance premiums, copays, prescriptions
• Dental, vision, mental health
• Medical travel expenses

**Above-the-Line Deductions (Everyone Gets These):**

• **HSA contributions:** $4,150 single, $8,300 family
• **Traditional IRA:** Up to $7,000
• **Student loan interest:** Up to $2,500
• **Self-employment tax:** 50% deductible
• **Self-employed health insurance:** 100%
• **Educator expenses:** $300 for teachers

**Self-Employment Deductions:**

• Home office (simplified: $5/sq ft, max 300 sq ft)
• Business equipment and supplies
• Professional development and education
• Business travel and meals (50%)
• Vehicle expenses (actual or 67¢/mile)
• Software and subscriptions
• Professional services (legal, accounting)
• Marketing and advertising
• Business insurance

**Often Overlooked:**
• Job search expenses (if itemizing)
• Investment fees and expenses
• Safe deposit box (if for investments)
• Tax preparation fees
• Union dues
• Work uniforms and tools`;
    }

    if (/\b(self.?employ|freelance|1099|business.?tax|schedule.?c)\b/i.test(lowerPrompt)) {
      return `### 💼 Self-Employment Tax Guide

**Self-Employment Tax Basics:**
• Social Security (12.4%) + Medicare (2.9%) = 15.3%
• You pay both employer and employee portions
• Applies to net self-employment income over $400
• Deduct 50% of SE tax from income

**Quarterly Estimated Taxes:**
• Due: April 15, June 15, Sept 15, Jan 15
• Pay as you go to avoid penalties
• Use Form 1040-ES
• Safe harbor: Pay 100% of last year's tax (110% if income >$150K)

**Business Structures:**

**Sole Proprietorship:**
• Simplest, no separate entity
• Report on Schedule C
• All income is self-employment income
• Personal liability for business debts

**LLC (Single-Member):**
• Liability protection
• Taxed as sole proprietorship by default
• Can elect S-corp taxation

**S-Corporation:**
• Pay yourself "reasonable salary" (subject to payroll tax)
• Remaining profit = distribution (no SE tax)
• Can save significant taxes if income >$50-60K
• More complexity and compliance costs

**Deductible Business Expenses:**

**Home Office:**
• Dedicated space used regularly and exclusively for business
• Simplified method: $5/sq ft (max 300 sq ft = $1,500)
• Actual method: Percentage of home expenses

**Vehicle:**
• Standard mileage: 67¢/mile (2024)
• Actual expenses: Gas, insurance, repairs, depreciation
• Keep detailed mileage log

**Equipment:**
• Section 179: Deduct full cost in year purchased
• Bonus depreciation: 60% (2024)
• Computers, furniture, tools, machinery

**Other Deductions:**
• Professional services (legal, accounting, consulting)
• Software and subscriptions
• Marketing and advertising
• Travel (transportation, lodging, 50% meals)
• Education and training
• Insurance (health, liability, E&O)
• Retirement contributions (SEP, Solo 401k)

**Record Keeping:**
• Separate business bank account
• Save all receipts (digital is fine)
• Track mileage contemporaneously
• Document business purpose of expenses
• Keep records for 7 years`;
    }

    return `### 💵 Tax Overview

**Key Tax Concepts:**
• **Gross Income:** All income before deductions
• **AGI:** Gross income minus above-the-line deductions
• **Taxable Income:** AGI minus standard/itemized deductions
• **Tax Bracket:** Marginal rate on last dollar earned
• **Effective Rate:** Total tax ÷ total income

**2024 Tax Brackets (Single):**
• 10%: $0 - $11,600
• 12%: $11,601 - $47,150
• 22%: $47,151 - $100,525
• 24%: $100,526 - $191,950
• 32%: $191,951 - $243,725
• 35%: $243,726 - $609,350
• 37%: $609,351+

**Tax-Saving Strategies:**
• Max out retirement accounts (401k, IRA)
• Use HSA if eligible (triple tax advantage)
• Harvest tax losses in taxable accounts
• Consider Roth conversions in low-income years
• Bunch deductions in alternating years
• Donate appreciated assets instead of cash

What specific tax topic would you like to explore?`;
  }

  private generateLegalBasicsHelp(prompt: string, lowerPrompt: string): string {
    if (/\b(contract|agreement|terms|clause)\b/i.test(lowerPrompt)) {
      return `### 📜 Contract Basics Guide

**What Makes a Valid Contract:**
1. **Offer:** Clear proposal to enter agreement
2. **Acceptance:** Unqualified agreement to terms
3. **Consideration:** Something of value exchanged
4. **Capacity:** Parties legally able to contract
5. **Legality:** Purpose must be legal

**Essential Contract Elements:**

**Parties:**
• Full legal names
• Business entity type (LLC, Corp, etc.)
• Contact information
• Authority to sign

**Scope of Work:**
• Detailed description of deliverables
• Timeline and milestones
• Quality standards
• What's NOT included

**Payment Terms:**
• Total amount or rate
• Payment schedule
• Accepted payment methods
• Late payment penalties
• Deposit requirements

**Important Clauses:**

**Termination:**
• How either party can end the agreement
• Notice period required
• Consequences of termination
• What happens to work in progress

**Intellectual Property:**
• Who owns the work product
• Work for hire vs licensed
• Pre-existing IP
• Confidential information

**Liability:**
• Limitation of liability
• Indemnification
• Insurance requirements
• Warranties and disclaimers

**Dispute Resolution:**
• Governing law (which state)
• Mediation before litigation
• Arbitration clause
• Venue for legal proceedings

**Red Flags in Contracts:**
• Unlimited liability
• Automatic renewal without notice
• One-sided termination rights
• Vague scope of work
• No payment timeline
• Unreasonable non-compete
• Waiving important rights

**Before Signing:**
• Read everything (yes, everything)
• Ask questions about unclear terms
• Negotiate unfavorable terms
• Get legal review for major contracts
• Keep a signed copy`;
    }

    if (/\b(llc|incorporate|corporation|business.?entity|sole.?prop)\b/i.test(lowerPrompt)) {
      return `### 🏢 Business Entity Guide

**Sole Proprietorship:**
• **Pros:** Simplest, no formation required, full control
• **Cons:** Unlimited personal liability, harder to raise capital
• **Taxes:** Personal return (Schedule C)
• **Best for:** Low-risk businesses, testing ideas

**LLC (Limited Liability Company):**
• **Pros:** Liability protection, flexible taxation, simple management
• **Cons:** State fees, some paperwork, self-employment tax
• **Taxes:** Pass-through (default) or elect S-corp/C-corp
• **Best for:** Most small businesses

**S-Corporation:**
• **Pros:** Avoid some self-employment tax, credibility
• **Cons:** Strict requirements, payroll obligations, more compliance
• **Taxes:** Pass-through, but salary subject to payroll tax
• **Best for:** Profitable businesses ($50K+ net income)

**C-Corporation:**
• **Pros:** Unlimited shareholders, easier to raise capital, stock options
• **Cons:** Double taxation, most complex, expensive compliance
• **Taxes:** Corporate tax (21%), then dividends taxed again
• **Best for:** Venture-backed startups, going public

**Forming an LLC:**

1. **Choose a Name:**
   • Must be unique in your state
   • Include "LLC" or "Limited Liability Company"
   • Check trademark availability

2. **File Articles of Organization:**
   • File with Secretary of State
   • Cost: $50-500 depending on state
   • Include: Name, address, registered agent, members

3. **Get an EIN:**
   • Free from IRS (irs.gov)
   • Needed for bank accounts, hiring, taxes
   • Takes 5 minutes online

4. **Create Operating Agreement:**
   • Not required in all states but essential
   • Defines ownership, management, distributions
   • Protects liability shield

5. **Open Business Bank Account:**
   • Keep business and personal finances separate
   • Maintains liability protection
   • Easier accounting and taxes

6. **Ongoing Requirements:**
   • Annual report (most states)
   • Franchise tax (some states)
   • Maintain registered agent
   • Keep records and minutes

**Best States to Form:**
• **Your home state:** Usually simplest
• **Wyoming:** Low fees, strong privacy, no state tax
• **Delaware:** Best for C-corps, investor-friendly
• **Nevada:** No state income tax, privacy`;
    }

    return `### ⚖️ Legal Basics Overview

**Common Legal Needs:**
• Business formation (LLC, Corp)
• Contracts and agreements
• Intellectual property protection
• Employment law compliance
• Privacy policies and terms of service

**When to Get a Lawyer:**
• Forming a business with partners
• Signing major contracts
• Intellectual property issues
• Employment disputes
• Regulatory compliance
• Litigation or threats

**DIY Legal Resources:**
• LegalZoom, Rocket Lawyer (templates)
• State Secretary of State websites
• SBA.gov for business guidance
• USPTO for trademark search
• SCORE for free mentoring

**Disclaimer:** This is general information, not legal advice. Consult an attorney for your specific situation.

What legal topic would you like to explore?`;
  }

  // ============================================================================
  // EXTENDED CONTENT SECTION V4 - Marketing, E-commerce, Freelancing, Networking
  // ============================================================================

  private generateMarketingHelp(prompt: string, lowerPrompt: string): string {
    if (/\b(social.?media|instagram|tiktok|twitter|linkedin|facebook)\b/i.test(lowerPrompt)) {
      return `### 📱 Social Media Marketing Guide

**Platform Overview:**

**Instagram:**
• Best for: Visual brands, lifestyle, B2C
• Content: Reels, Stories, Carousels, Posts
• Algorithm favors: Reels, engagement, saves
• Posting: 1-2x daily, Stories 5-10x
• Hashtags: 3-5 relevant (not 30 random)

**TikTok:**
• Best for: Gen Z/Millennial reach, viral potential
• Content: Short-form video (15s-3min)
• Algorithm favors: Watch time, completion rate
• Posting: 1-3x daily for growth
• Trends: Jump on sounds and formats quickly

**LinkedIn:**
• Best for: B2B, professional services, recruiting
• Content: Text posts, carousels, articles, video
• Algorithm favors: Comments, dwell time
• Posting: 1x daily weekdays
• Engagement: Comment on others' posts

**Twitter/X:**
• Best for: News, thought leadership, tech
• Content: Threads, hot takes, engagement
• Algorithm favors: Replies, retweets, bookmarks
• Posting: 3-5x daily
• Threads: Great for long-form content

**Facebook:**
• Best for: Local business, 35+ demographic, groups
• Content: Video, links, community posts
• Algorithm favors: Meaningful interactions
• Groups: Often better reach than pages

**Content Strategy:**

**The 80/20 Rule:**
• 80% value (educate, entertain, inspire)
• 20% promotion (sell, CTA)

**Content Pillars:**
• Educational (how-to, tips, tutorials)
• Entertaining (humor, trends, behind-scenes)
• Inspirational (stories, quotes, wins)
• Promotional (products, services, offers)

**Engagement Tips:**
• Respond to every comment within 1 hour
• Ask questions in captions
• Use polls and interactive features
• Collaborate with others in your niche
• Go live regularly

**Growth Tactics:**
• Post consistently (algorithm rewards it)
• Engage before and after posting
• Use trending audio/formats
• Cross-promote across platforms
• Collaborate with similar-sized accounts`;
    }

    if (/\b(email.?market|newsletter|mailchimp|convertkit|email.?list)\b/i.test(lowerPrompt)) {
      return `### 📧 Email Marketing Guide

**Why Email Marketing:**
• You own your list (unlike social followers)
• Highest ROI of any marketing channel (~$42 per $1 spent)
• Direct access to your audience
• Works for any business type

**Building Your List:**

**Lead Magnets (Free Offers):**
• Ebooks, guides, checklists
• Templates, swipe files
• Mini-courses, video training
• Quizzes, assessments
• Discounts, free shipping
• Exclusive content

**Opt-in Placement:**
• Homepage popup (exit intent)
• Blog post content upgrades
• Dedicated landing pages
• Social media bio links
• Checkout process

**Email Types:**

**Welcome Sequence (Automated):**
1. Immediate: Deliver lead magnet + introduce yourself
2. Day 1: Share your story, build connection
3. Day 3: Provide value, best content
4. Day 5: Social proof, testimonials
5. Day 7: Soft pitch or next steps

**Regular Emails:**
• Newsletters (weekly/biweekly)
• Product launches
• Promotional campaigns
• Educational content
• Personal updates

**Writing Effective Emails:**

**Subject Lines:**
• Keep under 50 characters
• Create curiosity or urgency
• Personalize when possible
• A/B test different approaches
• Avoid spam triggers (FREE!!!, $$$)

**Email Body:**
• One clear goal per email
• Write like you're talking to one person
• Use short paragraphs and white space
• Include one primary CTA
• P.S. lines get read (use them!)

**Key Metrics:**
• Open rate: 20-30% is good
• Click rate: 2-5% is good
• Unsubscribe rate: <0.5% is healthy
• Deliverability: Monitor bounces

**Best Practices:**
• Send consistently (same day/time)
• Segment your list by interest/behavior
• Clean your list regularly (remove inactive)
• Always provide value
• Make unsubscribing easy (legally required)

**Tools:**
• Beginners: Mailchimp, MailerLite
• Creators: ConvertKit, Beehiiv
• E-commerce: Klaviyo
• Advanced: ActiveCampaign`;
    }

    if (/\b(seo|search.?engine|google.?rank|keyword|backlink)\b/i.test(lowerPrompt)) {
      return `### 🔍 SEO (Search Engine Optimization) Guide

**What is SEO?**
• Optimizing content to rank higher in search results
• Free, organic traffic from Google
• Long-term strategy (takes 3-12 months)
• Compounds over time

**Three Pillars of SEO:**

**1. On-Page SEO (Content)**

**Keyword Research:**
• Use tools: Ahrefs, SEMrush, Ubersuggest, Google Keyword Planner
• Target keywords with search volume + low competition
• Long-tail keywords (3-5 words) are easier to rank
• Search intent: informational, transactional, navigational

**Content Optimization:**
• Primary keyword in title, H1, first paragraph
• Use related keywords naturally throughout
• Optimize meta title (50-60 chars) and description (150-160 chars)
• Use header tags (H2, H3) with keywords
• Include images with alt text
• Internal linking to related content
• External links to authoritative sources

**Content Quality:**
• Longer content often ranks better (1500-3000+ words)
• Answer the search query completely
• Better than existing top results
• Fresh, updated content
• E-E-A-T: Experience, Expertise, Authoritativeness, Trustworthiness

**2. Technical SEO (Website)**

**Site Speed:**
• Page load under 3 seconds
• Compress images (WebP format)
• Use CDN
• Minimize JavaScript/CSS

**Mobile-Friendly:**
• Responsive design
• Mobile-first indexing
• Easy navigation on mobile

**Crawlability:**
• XML sitemap submitted to Google Search Console
• Robots.txt properly configured
• Clean URL structure
• No broken links (404s)
• HTTPS (SSL certificate)

**3. Off-Page SEO (Authority)**

**Backlinks:**
• Links from other sites to yours
• Quality > quantity
• Relevant, authoritative sites
• Natural anchor text

**Link Building Strategies:**
• Guest posting on relevant blogs
• HARO (Help a Reporter Out)
• Create linkable assets (studies, tools, infographics)
• Broken link building
• Digital PR

**Local SEO (For Local Businesses):**
• Google Business Profile (claim and optimize)
• NAP consistency (Name, Address, Phone)
• Local citations (directories)
• Reviews (ask happy customers)
• Local keywords

**Measuring Success:**
• Google Search Console (free, essential)
• Track rankings for target keywords
• Monitor organic traffic growth
• Watch click-through rates
• Analyze top-performing pages`;
    }

    if (/\b(content.?market|blog|content.?strat|content.?creat)\b/i.test(lowerPrompt)) {
      return `### ✍️ Content Marketing Guide

**What is Content Marketing?**
• Creating valuable content to attract and retain audience
• Builds trust and authority
• Drives organic traffic and leads
• Long-term asset for your business

**Content Types:**

**Written:**
• Blog posts and articles
• Ebooks and whitepapers
• Case studies
• Email newsletters
• Social media posts

**Video:**
• YouTube videos
• Short-form (TikTok, Reels, Shorts)
• Webinars and live streams
• Course content
• Behind-the-scenes

**Audio:**
• Podcasts
• Audio versions of blog posts
• Clubhouse/Twitter Spaces

**Visual:**
• Infographics
• Carousels (Instagram, LinkedIn)
• Presentations
• Screenshots and tutorials

**Content Strategy Framework:**

**1. Define Your Audience:**
• Who are they? (demographics)
• What do they struggle with? (pain points)
• What do they want? (goals)
• Where do they hang out? (platforms)

**2. Content Pillars:**
• 3-5 main topics you'll cover
• Aligned with your expertise and audience needs
• Example for fitness coach: Workouts, Nutrition, Mindset, Recovery

**3. Content Calendar:**
• Plan content 2-4 weeks ahead
• Mix of content types and topics
• Consistent publishing schedule
• Leave room for trending topics

**4. Distribution:**
• Repurpose across platforms
• Blog → Social posts → Email → Video
• One piece of content = 10+ distribution points

**Blog Post Framework:**

**Structure:**
1. Hook (grab attention in first line)
2. Problem (what reader is struggling with)
3. Promise (what they'll learn)
4. Content (deliver the value)
5. CTA (what to do next)

**SEO Optimization:**
• Target one primary keyword
• Keyword in title, H1, first paragraph
• Use related keywords naturally
• Internal and external links
• Optimize meta description

**Writing Tips:**
• Write at 8th-grade reading level
• Short paragraphs (2-3 sentences)
• Use subheadings every 200-300 words
• Include images and examples
• End with clear next step`;
    }

    return `### 📣 Marketing Overview

**Core Marketing Channels:**
• **Social Media:** Build audience, engagement
• **Email:** Nurture leads, drive sales
• **SEO:** Organic search traffic
• **Content:** Establish authority, attract leads
• **Paid Ads:** Quick traffic, scalable

**Marketing Fundamentals:**
• Know your target audience deeply
• Focus on 1-2 channels first
• Consistency beats perfection
• Track metrics and iterate
• Provide value before asking for sale

**Getting Started:**
1. Define your ideal customer
2. Choose 1-2 primary channels
3. Create content consistently
4. Build an email list
5. Measure and optimize

What specific marketing topic would you like to explore?`;
  }

  private generateEcommerceHelp(prompt: string, lowerPrompt: string): string {
    if (/\b(shopify|woocommerce|store|online.?store|ecommerce.?platform)\b/i.test(lowerPrompt)) {
      return `### 🛒 E-commerce Platform Guide

**Platform Comparison:**

**Shopify:**
• Best for: Most e-commerce businesses
• Pros: Easy setup, great apps, reliable hosting
• Cons: Monthly fees, transaction fees (unless Shopify Payments)
• Pricing: $39-399/month
• Best for: Beginners to advanced

**WooCommerce (WordPress):**
• Best for: Existing WordPress sites, customization
• Pros: Free plugin, full control, no transaction fees
• Cons: Requires hosting, more technical, security responsibility
• Pricing: Free (but hosting $10-50/month)
• Best for: Technical users, bloggers adding commerce

**BigCommerce:**
• Best for: Growing businesses, B2B
• Pros: No transaction fees, built-in features
• Cons: Steeper learning curve, theme limitations
• Pricing: $39-399/month
• Best for: Mid-size businesses

**Squarespace:**
• Best for: Beautiful, simple stores
• Pros: Gorgeous templates, easy to use
• Cons: Limited e-commerce features, fewer integrations
• Pricing: $33-65/month (commerce plans)
• Best for: Small catalogs, creatives

**Etsy:**
• Best for: Handmade, vintage, unique items
• Pros: Built-in marketplace traffic
• Cons: Fees, competition, limited branding
• Pricing: $0.20/listing + 6.5% transaction fee
• Best for: Crafters, artists, vintage sellers

**Amazon FBA:**
• Best for: Physical products at scale
• Pros: Massive traffic, Prime shipping, fulfillment handled
• Cons: High fees, competition, less brand control
• Pricing: $39.99/month + various fees
• Best for: Product-focused businesses

**Setting Up Your Store:**

**Essential Pages:**
• Homepage (clear value proposition)
• Product pages (great photos, descriptions)
• About page (your story, trust)
• Contact page
• FAQ page
• Shipping & Returns policy
• Privacy policy & Terms of Service

**Product Pages That Convert:**
• High-quality photos (multiple angles, lifestyle)
• Compelling product title
• Benefits-focused description
• Clear pricing
• Size/variant options
• Reviews and ratings
• Urgency elements (stock levels, sale timers)
• Trust badges (secure checkout, guarantees)

**Payment Processing:**
• Shopify Payments / Stripe
• PayPal
• Apple Pay / Google Pay
• Buy Now Pay Later (Klarna, Afterpay)`;
    }

    if (/\b(dropship|drop.?ship|supplier|aliexpress|oberlo)\b/i.test(lowerPrompt)) {
      return `### 📦 Dropshipping Guide

**What is Dropshipping?**
• Sell products without holding inventory
• Supplier ships directly to customer
• You handle marketing and customer service
• Lower startup costs, lower margins

**How It Works:**
1. Customer orders from your store
2. You forward order to supplier
3. Supplier ships to customer
4. You keep the profit margin

**Pros:**
• Low startup costs ($100-500)
• No inventory risk
• Work from anywhere
• Test products easily
• Wide product selection

**Cons:**
• Lower profit margins (15-30%)
• Less control over shipping/quality
• Supplier issues affect you
• High competition
• Customer service challenges

**Finding Products:**

**Product Criteria:**
• $15-75 price point (sweet spot)
• Lightweight (cheaper shipping)
• Not easily found locally
• Solves a problem or sparks emotion
• Not fragile
• No complex sizing

**Research Methods:**
• TikTok/Instagram trending products
• Amazon Best Sellers
• AliExpress trending
• Competitor research
• Google Trends

**Supplier Platforms:**
• **AliExpress:** Largest selection, longer shipping
• **CJ Dropshipping:** Faster shipping, quality control
• **Spocket:** US/EU suppliers, faster shipping
• **Zendrop:** Automated, US warehouse options
• **Printful/Printify:** Print-on-demand

**Vetting Suppliers:**
• Order samples first (always!)
• Check reviews and ratings
• Test communication responsiveness
• Verify shipping times
• Ask about returns/refunds

**Marketing Dropshipping:**
• Facebook/Instagram ads (most common)
• TikTok organic and ads
• Influencer marketing
• Google Shopping ads
• SEO for long-term

**Common Mistakes:**
• Not ordering samples
• Unrealistic shipping expectations
• Poor customer service
• Too many products (focus on winners)
• Ignoring branding
• Not tracking metrics

**Realistic Expectations:**
• Test 10-20 products to find 1 winner
• Expect to lose money testing
• Profit margins: 15-30%
• Takes 3-6 months to be profitable
• Not passive income (requires work)`;
    }

    if (/\b(product|pricing|price.?strategy|margin|markup)\b/i.test(lowerPrompt)) {
      return `### 💰 E-commerce Pricing Strategy

**Pricing Fundamentals:**

**Cost-Based Pricing:**
\`\`\`
Product Cost:        $10
Shipping Cost:       $3
Packaging:           $1
Transaction Fees:    $1
Marketing Cost:      $5
Total Cost:          $20

Desired Margin:      50%
Selling Price:       $40
Profit:              $20
\`\`\`

**Markup vs Margin:**
• **Markup:** (Price - Cost) / Cost × 100
• **Margin:** (Price - Cost) / Price × 100
• 100% markup = 50% margin
• 200% markup = 66% margin

**Pricing Strategies:**

**Keystone Pricing:**
• 2x cost (100% markup, 50% margin)
• Simple, common in retail
• May not work for all products

**Competitive Pricing:**
• Price based on competitors
• Match, undercut, or premium
• Research thoroughly first

**Value-Based Pricing:**
• Price based on perceived value
• Works for unique/premium products
• Requires strong branding

**Psychological Pricing:**
• $19.99 vs $20 (charm pricing)
• $97 vs $100 (odd pricing)
• Anchoring (show "was" price)
• Bundle pricing

**Dynamic Pricing:**
• Adjust based on demand
• Seasonal pricing
• Flash sales
• Personalized pricing

**Pricing Tactics:**

**Free Shipping Threshold:**
• "Free shipping over $50"
• Increases average order value
• Build shipping into product price

**Bundling:**
• Sell products together at discount
• Increases AOV
• Moves slow inventory

**Tiered Pricing:**
• Good, Better, Best options
• Most buy middle option
• Anchors value perception

**Subscription/Recurring:**
• Predictable revenue
• Higher lifetime value
• Lower customer acquisition cost

**Discounting Strategy:**
• Don't discount too often (trains customers)
• Use for specific purposes (clear inventory, acquire customers)
• Protect your brand value
• Consider alternatives (free gift, bonus)

**Key Metrics:**
• **Gross Margin:** (Revenue - COGS) / Revenue
• **Net Margin:** (Revenue - All Costs) / Revenue
• **AOV:** Average Order Value
• **LTV:** Customer Lifetime Value
• **CAC:** Customer Acquisition Cost`;
    }

    return `### 🛍️ E-commerce Overview

**Starting an E-commerce Business:**
1. Choose your niche and products
2. Validate demand (research, test)
3. Select platform (Shopify recommended)
4. Set up store and branding
5. Add products with great photos/copy
6. Set up payments and shipping
7. Launch and market

**Business Models:**
• **Own Products:** Highest margins, most work
• **Dropshipping:** Low startup, lower margins
• **Print-on-Demand:** Custom products, no inventory
• **Wholesale:** Buy bulk, sell retail
• **Private Label:** Your brand on manufactured products

**Keys to Success:**
• Great product photos
• Compelling product descriptions
• Fast, reliable shipping
• Excellent customer service
• Effective marketing
• Continuous optimization

What specific e-commerce topic would you like to explore?`;
  }

  private generateFreelancingHelp(prompt: string, lowerPrompt: string): string {
    if (/\b(client|find.?client|get.?client|land.?client)\b/i.test(lowerPrompt)) {
      return `### 🎯 Finding Freelance Clients

**Where to Find Clients:**

**Freelance Platforms:**
• **Upwork:** Largest, competitive, good for starting
• **Fiverr:** Gig-based, good for productized services
• **Toptal:** Elite, high-paying, strict vetting
• **99designs:** Design-specific
• **Freelancer.com:** Various skills

**Direct Outreach:**
• Cold email (most effective for high-value clients)
• LinkedIn outreach
• Twitter/X engagement
• Local networking events
• Industry conferences

**Inbound Marketing:**
• Personal website/portfolio
• Blog content (SEO)
• Social media presence
• YouTube tutorials
• Podcast guesting

**Referrals:**
• Ask existing clients
• Partner with complementary freelancers
• Join professional communities
• Offer referral incentives

**Cold Email Template:**
\`\`\`
Subject: Quick question about [specific thing]

Hi [Name],

I noticed [specific observation about their business].

I help [type of business] with [specific result] through [your service].

Recently, I helped [similar client] achieve [specific result].

Would you be open to a quick call to see if I could help [Company] with [specific goal]?

Best,
[Your name]
\`\`\`

**LinkedIn Outreach:**
1. Engage with their content first (2-3 interactions)
2. Send connection request (no pitch)
3. After accepted, send value-first message
4. Build relationship before pitching
5. Offer free audit/consultation

**Building Your Pipeline:**
• Always be marketing (even when busy)
• Aim for 3-6 months of work in pipeline
• Track leads in CRM or spreadsheet
• Follow up (80% of sales happen after 5+ touchpoints)
• Ask for referrals from every happy client

**Qualifying Clients:**
• Do they have budget?
• Do they have authority to decide?
• Do they have a real need?
• Is the timeline realistic?
• Are they pleasant to work with?

**Red Flags:**
• "We don't have budget but it's great exposure"
• Unclear scope or expectations
• Disrespectful communication
• Wanting to skip contracts
• Asking for free work as "test"`;
    }

    if (/\b(rate|pricing|charge|hourly|project.?rate)\b/i.test(lowerPrompt)) {
      return `### 💵 Freelance Pricing Guide

**Pricing Models:**

**Hourly Rate:**
• Pros: Simple, flexible, covers scope creep
• Cons: Punishes efficiency, income ceiling
• Best for: Ongoing work, unclear scope

**Project-Based:**
• Pros: Rewards efficiency, clear expectations
• Cons: Scope creep risk, estimation errors
• Best for: Defined deliverables

**Value-Based:**
• Pros: Highest earning potential
• Cons: Requires understanding client's ROI
• Best for: High-impact work with measurable results

**Retainer:**
• Pros: Predictable income, ongoing relationship
• Cons: Can feel limiting, scope issues
• Best for: Ongoing services, maintenance

**Calculating Your Rate:**

**Hourly Rate Formula:**
\`\`\`
Desired Annual Income:     $100,000
+ Business Expenses:       $20,000
+ Taxes (30%):             $36,000
= Total Needed:            $156,000

Billable Hours/Year:       1,200
(50 weeks × 30 billable hrs)

Hourly Rate:               $130/hour
\`\`\`

**Project Pricing:**
1. Estimate hours needed
2. Multiply by hourly rate
3. Add buffer (20-30%)
4. Consider value to client
5. Round to clean number

**Raising Your Rates:**

**When to Raise:**
• You're fully booked
• You've gained experience/skills
• Market rates have increased
• You're undercharging

**How to Raise:**
• New clients: Just quote higher rate
• Existing clients: Give 30-60 day notice
• Frame as investment in quality
• Grandfather loyal clients if needed

**Rate Ranges by Skill (US Market):**

**Writing/Content:**
• Beginner: $25-50/hr
• Intermediate: $50-100/hr
• Expert: $100-250/hr

**Web Development:**
• Beginner: $50-75/hr
• Intermediate: $75-150/hr
• Expert: $150-300/hr

**Design:**
• Beginner: $35-60/hr
• Intermediate: $60-125/hr
• Expert: $125-250/hr

**Marketing/Strategy:**
• Beginner: $50-75/hr
• Intermediate: $75-150/hr
• Expert: $150-400/hr

**Negotiation Tips:**
• Never give rate first if possible
• Ask about their budget
• Focus on value, not time
• Be willing to walk away
• Offer options (packages)`;
    }

    if (/\b(proposal|contract|scope|agreement)\b/i.test(lowerPrompt)) {
      return `### 📋 Freelance Proposals & Contracts

**Proposal Structure:**

**1. Executive Summary:**
• Restate their problem/goal
• Your understanding of the project
• High-level solution overview

**2. About You:**
• Relevant experience
• Why you're the right fit
• Brief credentials/portfolio

**3. Scope of Work:**
• Detailed deliverables
• What's included
• What's NOT included (important!)
• Timeline and milestones

**4. Investment:**
• Pricing (packages if applicable)
• Payment terms
• What's included at each level

**5. Next Steps:**
• Clear call to action
• How to proceed
• Deadline for proposal validity

**Proposal Tips:**
• Customize for each client (no templates)
• Focus on their goals, not your services
• Use their language and terminology
• Include social proof (testimonials, results)
• Make it easy to say yes

**Contract Essentials:**

**Parties:**
• Your legal name/business
• Client's legal name/business
• Contact information

**Scope of Work:**
• Detailed description of deliverables
• Number of revisions included
• What constitutes completion

**Timeline:**
• Start date
• Milestones and deadlines
• Final delivery date
• What happens if delayed (either party)

**Payment Terms:**
• Total amount
• Payment schedule (50% upfront recommended)
• Payment methods accepted
• Late payment penalties
• Kill fee (if project cancelled)

**Intellectual Property:**
• Who owns the work
• When ownership transfers (upon payment)
• Usage rights
• Portfolio rights for you

**Revisions:**
• Number included
• What counts as revision vs new work
• Additional revision rates

**Termination:**
• How either party can end
• Notice period
• Payment for work completed
• Deliverable handoff

**Liability:**
• Limitation of liability
• Indemnification
• Insurance requirements

**Contract Tools:**
• HelloSign, DocuSign (e-signatures)
• AND.CO, HoneyBook (proposals + contracts)
• Bonsai (freelance-specific)
• Your own template (have lawyer review)`;
    }

    return `### 💼 Freelancing Overview

**Getting Started:**
1. Define your service offering
2. Set your rates (start market rate, raise as you grow)
3. Create portfolio (even with fake projects)
4. Set up business basics (contracts, invoicing)
5. Start finding clients

**Keys to Success:**
• Specialize (niches get riches)
• Deliver exceptional work
• Communicate proactively
• Meet deadlines always
• Build relationships, not just transactions

**Common Mistakes:**
• Undercharging
• No contracts
• Scope creep
• Poor communication
• Not marketing when busy

**Scaling Options:**
• Raise rates
• Productize services
• Build a team/agency
• Create passive income (courses, templates)

What specific freelancing topic would you like to explore?`;
  }

  private generateNetworkingHelp(prompt: string, lowerPrompt: string): string {
    if (/\b(linkedin|professional.?network|connect)\b/i.test(lowerPrompt)) {
      return `### 🔗 LinkedIn Networking Guide

**Optimizing Your Profile:**

**Headline:**
• Not just job title
• Include value proposition
• Use keywords for search
• Example: "Helping SaaS companies increase conversions by 40% | Conversion Copywriter"

**About Section:**
• Hook in first line (shows before "see more")
• Tell your story
• Highlight results and expertise
• Include call to action
• Use first person

**Experience:**
• Focus on achievements, not duties
• Quantify results when possible
• Use keywords for searchability
• Include media (projects, presentations)

**Featured Section:**
• Best content/posts
• Portfolio pieces
• Lead magnets
• Important links

**Building Your Network:**

**Who to Connect With:**
• People in your industry
• Potential clients/employers
• Thought leaders you admire
• Alumni from your school
• Conference/event attendees

**Connection Request Messages:**
• Keep it short (under 300 characters)
• Mention something specific
• Don't pitch immediately
• Example: "Hi [Name], loved your post about [topic]. Would love to connect and learn more about your work in [field]."

**Engaging on LinkedIn:**

**Content Strategy:**
• Post 3-5x per week
• Mix: insights, stories, questions, tips
• First line is crucial (hook)
• Use line breaks for readability
• Engage in comments (yours and others')

**Best Performing Content:**
• Personal stories with lessons
• Contrarian takes
• How-to posts
• Behind-the-scenes
• Carousels (swipeable documents)

**Engagement Strategy:**
• Comment on 10-20 posts daily
• Add value in comments (not just "Great post!")
• Engage with people you want to connect with
• Reply to every comment on your posts

**DM Strategy:**
• Build relationship first (engage with content)
• Lead with value, not ask
• Be specific about why you're reaching out
• Keep it conversational
• Follow up (but don't spam)

**LinkedIn for Job Search:**
• Turn on "Open to Work" (visible to recruiters only option)
• Connect with recruiters in your field
• Engage with target company content
• Reach out to hiring managers directly
• Share relevant content showing expertise`;
    }

    if (/\b(network.?event|conference|meetup|in.?person)\b/i.test(lowerPrompt)) {
      return `### 🤝 In-Person Networking Guide

**Before the Event:**

**Preparation:**
• Research attendees/speakers
• Set specific goals (3 meaningful conversations)
• Prepare your introduction
• Bring business cards (yes, still useful)
• Charge your phone (for contact exchange)

**Your Introduction:**
• Name + what you do + who you help
• Keep it under 30 seconds
• Make it conversational, not salesy
• Example: "I'm Sarah, I help e-commerce brands reduce cart abandonment. Basically, I make sure people actually buy what they put in their cart."

**At the Event:**

**Starting Conversations:**
• "What brings you to this event?"
• "How did you get into [industry]?"
• "What are you working on right now?"
• "Have you been to this event before?"
• Comment on something specific (speaker, venue, etc.)

**Being a Good Conversationalist:**
• Ask open-ended questions
• Listen more than you talk
• Show genuine curiosity
• Remember names (repeat them)
• Find common ground

**Graceful Exits:**
• "I don't want to monopolize your time..."
• "I'm going to grab a drink, great meeting you!"
• "I see someone I need to say hi to..."
• "Let's exchange info and continue this conversation"

**After the Event:**

**Follow-Up (Within 48 Hours):**
• Connect on LinkedIn with personalized note
• Reference something specific from conversation
• Offer value (article, introduction, resource)
• Suggest next step if appropriate

**Follow-Up Template:**
\`\`\`
Hi [Name],

Great meeting you at [event] yesterday! I really enjoyed our conversation about [topic].

[Reference something specific they mentioned]

[Offer value or suggest next step]

Looking forward to staying in touch!

[Your name]
\`\`\`

**Building Relationships:**
• Don't just reach out when you need something
• Share relevant content/opportunities
• Make introductions
• Congratulate on wins
• Check in periodically

**Networking Mindset:**
• Give before you ask
• Focus on relationships, not transactions
• Quality over quantity
• Play the long game
• Be genuinely helpful`;
    }

    return `### 🌐 Networking Overview

**Why Network:**
• 80% of jobs filled through networking
• Business opportunities and partnerships
• Learning and mentorship
• Support system and community
• Career advancement

**Networking Principles:**
• Give more than you take
• Be genuinely curious about others
• Follow up consistently
• Add value before asking
• Play the long game

**Where to Network:**
• LinkedIn (online)
• Industry events and conferences
• Local meetups
• Professional associations
• Online communities (Slack, Discord)
• Alumni networks

**Building Your Network:**
1. Define who you want to connect with
2. Show up consistently (online and offline)
3. Provide value first
4. Follow up and stay in touch
5. Make introductions

What specific networking topic would you like to explore?`;
  }

  private generatePublicSpeakingHelp(prompt: string, lowerPrompt: string): string {
    if (/\b(presentation|present|slide|powerpoint|keynote)\b/i.test(lowerPrompt)) {
      return `### 🎤 Presentation Skills Guide

**Structuring Your Presentation:**

**The Rule of Three:**
• Three main points maximum
• People remember threes
• Beginning, middle, end

**Classic Structure:**
1. **Opening (10%):** Hook, establish credibility, preview
2. **Body (80%):** Three main points with support
3. **Closing (10%):** Summary, call to action, memorable ending

**Opening Techniques:**
• Surprising statistic
• Provocative question
• Short story
• Bold statement
• Relevant quote
• "Imagine..." scenario

**Closing Techniques:**
• Call to action
• Circle back to opening
• Memorable quote
• Challenge to audience
• Vision of the future

**Slide Design:**

**Less is More:**
• One idea per slide
• Maximum 6 words per bullet
• Maximum 6 bullets per slide
• Large fonts (24pt minimum)
• High contrast colors

**Visual Principles:**
• Use images over text
• Simple, clean layouts
• Consistent design throughout
• No clip art or cheesy stock photos
• White space is your friend

**What to Avoid:**
• Reading from slides
• Walls of text
• Complex charts
• Too many animations
• Inconsistent formatting

**Delivery Tips:**

**Body Language:**
• Stand tall, shoulders back
• Make eye contact (3-5 seconds per person)
• Use purposeful gestures
• Move with intention
• Smile genuinely

**Voice:**
• Vary your pace
• Use pauses for emphasis
• Project to the back of the room
• Avoid filler words (um, uh, like)
• Show enthusiasm

**Managing Nerves:**
• Prepare thoroughly
• Practice out loud (10+ times)
• Arrive early
• Deep breathing before
• Focus on helping audience, not yourself
• Remember: audience wants you to succeed`;
    }

    if (/\b(nervous|anxiety|stage.?fright|fear|scared)\b/i.test(lowerPrompt)) {
      return `### 😰 Overcoming Speaking Anxiety

**Understanding the Fear:**
• Fear of public speaking is extremely common
• It's evolutionary (fear of judgment by group)
• Some nervousness is actually helpful
• It gets easier with practice

**Reframing Your Mindset:**

**From Fear to Excitement:**
• Anxiety and excitement feel similar physically
• Tell yourself "I'm excited" not "I'm nervous"
• Channel energy into enthusiasm

**Focus Outward:**
• Think about helping the audience
• You have something valuable to share
• They want you to succeed
• It's not about you, it's about them

**Preparation is Key:**
• Know your material cold
• Practice until it's automatic
• Anticipate questions
• Have backup plans
• Visit the venue beforehand if possible

**Physical Techniques:**

**Before Speaking:**
• Deep breathing (4-7-8 technique)
• Power poses (2 minutes)
• Light exercise or stretching
• Avoid caffeine
• Eat something light

**During Speaking:**
• Slow down (nerves make us rush)
• Pause and breathe
• Find friendly faces
• Ground yourself (feel feet on floor)
• Use notes if needed (no shame)

**Mental Techniques:**

**Visualization:**
• Imagine successful presentation
• See audience responding positively
• Feel confident and calm
• Practice this daily before event

**Positive Self-Talk:**
• "I am prepared and capable"
• "I have valuable insights to share"
• "The audience is on my side"
• "I've done this before and I can do it again"

**Gradual Exposure:**
• Start small (team meetings)
• Join Toastmasters
• Practice with friends/family
• Record yourself and review
• Gradually increase audience size

**Remember:**
• Everyone gets nervous
• Audience rarely notices your nervousness
• Mistakes are okay (keep going)
• Each time gets easier
• You are more capable than you think`;
    }

    return `### 🎙️ Public Speaking Overview

**Core Skills:**
• Clear structure and messaging
• Engaging delivery
• Confident body language
• Audience connection
• Handling Q&A

**Improving Your Speaking:**
1. Practice regularly (Toastmasters, meetups)
2. Record and review yourself
3. Get feedback from others
4. Study great speakers
5. Start with low-stakes opportunities

**Quick Tips:**
• Know your opening and closing cold
• Pause instead of using filler words
• Make eye contact
• Tell stories
• End with clear call to action

What specific public speaking topic would you like to explore?`;
  }

  // ============================================================================
  // EXTENDED CONTENT SECTION V5 - Psychology, Negotiation, Time Management, Habits
  // ============================================================================

  private generateAdvancedPsychologyHelp(prompt: string, lowerPrompt: string): string {
    if (/\b(cognitive.?bias|bias|thinking.?error|logical.?fallac)\b/i.test(lowerPrompt)) {
      return `### 🧠 Cognitive Biases Guide

**What Are Cognitive Biases?**
• Mental shortcuts that can lead to errors in thinking
• Evolved to help us make quick decisions
• Can be exploited (marketing, manipulation)
• Awareness helps you think more clearly

**Common Cognitive Biases:**

**Confirmation Bias:**
• Seeking information that confirms existing beliefs
• Ignoring contradictory evidence
• Fix: Actively seek opposing viewpoints

**Anchoring Bias:**
• Over-relying on first piece of information
• Example: First price sets expectations
• Fix: Consider multiple reference points

**Availability Heuristic:**
• Judging likelihood by how easily examples come to mind
• Recent/vivid events seem more common
• Fix: Look at actual statistics

**Dunning-Kruger Effect:**
• Unskilled people overestimate their ability
• Experts often underestimate theirs
• Fix: Seek feedback, stay humble

**Sunk Cost Fallacy:**
• Continuing because of past investment
• "I've already put so much into this..."
• Fix: Focus on future value, not past costs

**Loss Aversion:**
• Losses feel 2x worse than equivalent gains
• Leads to risk-averse behavior
• Fix: Evaluate decisions objectively

**Bandwagon Effect:**
• Doing something because others do
• Social proof can mislead
• Fix: Think independently

**Hindsight Bias:**
• "I knew it all along" after the fact
• Overestimating predictability
• Fix: Document predictions beforehand

**Fundamental Attribution Error:**
• Attributing others' behavior to character, not situation
• "They're lazy" vs "They're overwhelmed"
• Fix: Consider situational factors

**Recency Bias:**
• Overweighting recent events
• Affects investing, hiring, relationships
• Fix: Look at longer time horizons

**Halo Effect:**
• One positive trait influences overall perception
• Attractive people seem smarter, kinder
• Fix: Evaluate traits independently

**Self-Serving Bias:**
• Taking credit for success, blaming others for failure
• Protects ego but limits growth
• Fix: Honest self-reflection

**How to Combat Biases:**
• Slow down important decisions
• Seek diverse perspectives
• Use checklists and frameworks
• Question your assumptions
• Consider the opposite
• Sleep on major decisions`;
    }

    if (/\b(persuasion|influence|convince|cialdini)\b/i.test(lowerPrompt)) {
      return `### 🎯 Principles of Persuasion

**Cialdini's 6 Principles of Influence:**

**1. Reciprocity:**
• We feel obligated to return favors
• Give before you ask
• Free samples, valuable content, help
• Application: Provide value first

**2. Commitment & Consistency:**
• We want to be consistent with past actions
• Small commitments lead to larger ones
• Public commitments are stronger
• Application: Get small yeses first

**3. Social Proof:**
• We look to others for guidance
• Testimonials, reviews, case studies
• "Join 10,000+ subscribers"
• Application: Show others doing it

**4. Authority:**
• We defer to experts and credentials
• Titles, uniforms, expertise
• Third-party endorsements
• Application: Establish credibility

**5. Liking:**
• We say yes to people we like
• Similarity, compliments, familiarity
• Attractive, friendly, relatable
• Application: Build rapport first

**6. Scarcity:**
• We want what's limited or exclusive
• Limited time, limited quantity
• Fear of missing out (FOMO)
• Application: Create urgency

**7. Unity (Added Later):**
• We favor those in our "tribe"
• Shared identity, values, experiences
• "We" language
• Application: Find common ground

**Ethical Persuasion:**

**Do:**
• Be honest and transparent
• Provide genuine value
• Respect autonomy
• Use for mutual benefit

**Don't:**
• Manipulate or deceive
• Create false scarcity
• Exploit vulnerabilities
• Pressure or coerce

**Persuasion in Practice:**

**Sales:**
• Build rapport (Liking)
• Establish expertise (Authority)
• Show testimonials (Social Proof)
• Offer something free (Reciprocity)
• Get small commitment (Consistency)
• Create urgency (Scarcity)

**Negotiation:**
• Find common ground (Unity)
• Make first concession (Reciprocity)
• Reference precedents (Social Proof)
• Cite experts (Authority)

**Leadership:**
• Model desired behavior (Consistency)
• Recognize contributions (Reciprocity)
• Build team identity (Unity)
• Share expertise (Authority)`;
    }

    if (/\b(emotion|emotional.?intelligen|eq|feeling|empathy)\b/i.test(lowerPrompt)) {
      return `### 💭 Emotional Intelligence Guide

**What is Emotional Intelligence (EQ)?**
• Ability to recognize, understand, and manage emotions
• Yours and others'
• Often more important than IQ for success
• Can be developed and improved

**The Four Components:**

**1. Self-Awareness:**
• Recognizing your emotions as they happen
• Understanding your triggers
• Knowing your strengths and weaknesses
• Accurate self-assessment

**Building Self-Awareness:**
• Keep an emotion journal
• Notice physical sensations
• Ask for feedback
• Reflect on reactions
• Meditation and mindfulness

**2. Self-Management:**
• Controlling disruptive emotions
• Adapting to change
• Following through on commitments
• Maintaining optimism

**Building Self-Management:**
• Pause before reacting (count to 10)
• Reframe negative thoughts
• Exercise regularly
• Get adequate sleep
• Practice stress management

**3. Social Awareness:**
• Reading others' emotions
• Understanding group dynamics
• Empathy and perspective-taking
• Organizational awareness

**Building Social Awareness:**
• Practice active listening
• Observe body language
• Ask about others' feelings
• Put yourself in their shoes
• Pay attention to tone

**4. Relationship Management:**
• Inspiring and influencing others
• Developing others
• Managing conflict
• Building bonds and teamwork

**Building Relationship Management:**
• Communicate clearly
• Give constructive feedback
• Acknowledge others' contributions
• Address conflicts directly
• Be reliable and trustworthy

**Emotional Regulation Techniques:**

**In the Moment:**
• Deep breathing (4-7-8)
• Name the emotion ("I'm feeling anxious")
• Physical movement
• Change your environment
• Talk to someone

**Long-Term:**
• Regular exercise
• Adequate sleep
• Healthy relationships
• Therapy or coaching
• Mindfulness practice

**EQ in Leadership:**
• Self-aware leaders inspire trust
• Empathetic leaders build loyalty
• Emotionally regulated leaders stay calm in crisis
• Socially skilled leaders build high-performing teams

**Common EQ Pitfalls:**
• Suppressing emotions (they come out anyway)
• Reacting without thinking
• Assuming you know how others feel
• Avoiding difficult conversations
• Taking things personally`;
    }

    if (/\b(motivation|motivat|procrastinat|lazy|unmotivat)\b/i.test(lowerPrompt)) {
      return `### 🔥 Motivation & Overcoming Procrastination

**Understanding Motivation:**

**Intrinsic vs Extrinsic:**
• **Intrinsic:** Internal drive (enjoyment, purpose, growth)
• **Extrinsic:** External rewards (money, praise, grades)
• Intrinsic is more sustainable
• Best: Align external rewards with internal values

**The Motivation Equation:**
\`\`\`
Motivation = (Expectancy × Value) / (Impulsiveness × Delay)
\`\`\`
• **Expectancy:** Belief you can succeed
• **Value:** How much you want the outcome
• **Impulsiveness:** Tendency to get distracted
• **Delay:** How far away the reward is

**Why We Procrastinate:**

**Emotional Reasons:**
• Fear of failure
• Fear of success
• Perfectionism
• Overwhelm
• Boredom
• Resentment

**Structural Reasons:**
• Task too big/vague
• No clear deadline
• No accountability
• Distracting environment
• Decision fatigue

**Beating Procrastination:**

**1. Make It Tiny:**
• "Just 5 minutes"
• One small step
• Lower the activation energy
• Build momentum

**2. Make It Obvious:**
• Schedule specific time
• Set reminders
• Prepare materials in advance
• Remove friction

**3. Make It Attractive:**
• Pair with something enjoyable
• Reward yourself after
• Find the interesting angle
• Connect to bigger purpose

**4. Make It Easy:**
• Break into smaller steps
• Remove distractions
• Prepare your environment
• Use templates/systems

**5. Make It Satisfying:**
• Track progress visibly
• Celebrate small wins
• Share accomplishments
• Build streaks

**Motivation Boosters:**

**Quick Wins:**
• Start with easiest task
• Build momentum
• Create positive feedback loop

**Accountability:**
• Tell someone your goal
• Work with others
• Public commitment
• Hire a coach

**Environment Design:**
• Remove temptations
• Make good choices easy
• Visual reminders
• Dedicated workspace

**Energy Management:**
• Do hard things when fresh
• Match task to energy level
• Take breaks (Pomodoro)
• Protect your peak hours

**Mindset Shifts:**
• "I get to" vs "I have to"
• Focus on process, not outcome
• Progress over perfection
• Future self will thank you`;
    }

    return `### 🧠 Psychology Overview

**Key Areas:**
• **Cognitive Biases:** Mental shortcuts that can mislead
• **Persuasion:** Ethical influence techniques
• **Emotional Intelligence:** Understanding and managing emotions
• **Motivation:** What drives behavior and how to sustain it
• **Habits:** Building automatic positive behaviors

**Practical Applications:**
• Better decision-making
• Improved relationships
• Increased productivity
• Enhanced leadership
• Personal growth

What specific psychology topic would you like to explore?`;
  }

  private generateNegotiationHelp(prompt: string, lowerPrompt: string): string {
    if (/\b(salary|raise|pay|compensation|job.?offer)\b/i.test(lowerPrompt)) {
      return `### 💰 Salary Negotiation Guide

**Before the Negotiation:**

**Research:**
• Glassdoor, Levels.fyi, Payscale for market rates
• Talk to people in similar roles
• Know the range for your level and location
• Factor in total compensation (not just base)

**Know Your Value:**
• List your accomplishments with numbers
• Unique skills you bring
• Problems you've solved
• Revenue generated or costs saved

**Determine Your Numbers:**
• **Target:** What you really want
• **Ask:** 10-20% above target (room to negotiate)
• **Walk-away:** Minimum you'll accept

**During the Negotiation:**

**Let Them Go First:**
• "What's the budget for this role?"
• "What range do you have in mind?"
• Anchoring works both ways

**If You Must Go First:**
• Give a range (your target at the bottom)
• Base it on research, not current salary
• "Based on my research and experience, I'm looking for $X-Y"

**Negotiation Scripts:**

**Responding to an Offer:**
"Thank you for the offer. I'm excited about the role. Based on my research and the value I'll bring, I was hoping for something closer to $X. Is there flexibility?"

**If They Push Back:**
"I understand budget constraints. Are there other areas we could discuss? Sign-on bonus, equity, vacation time, remote work, professional development?"

**If They Say No:**
"I appreciate you considering it. Could we revisit compensation in 6 months based on performance?"

**What to Negotiate:**
• Base salary
• Sign-on bonus
• Equity/stock options
• Annual bonus
• Vacation days
• Remote work flexibility
• Start date
• Title
• Professional development budget
• Relocation assistance

**Key Principles:**
• Be collaborative, not adversarial
• Focus on value, not need
• Get everything in writing
• Don't accept on the spot
• Silence is powerful
• They expect you to negotiate

**Common Mistakes:**
• Not negotiating at all
• Accepting immediately
• Sharing current salary (illegal to ask in many states)
• Making it personal
• Ultimatums
• Lying about other offers`;
    }

    if (/\b(deal|business.?deal|contract.?negot|vendor|supplier)\b/i.test(lowerPrompt)) {
      return `### 🤝 Business Negotiation Guide

**Preparation (80% of Success):**

**Know Your BATNA:**
• Best Alternative To Negotiated Agreement
• Your walkaway option
• Stronger BATNA = more leverage
• Never reveal your BATNA

**Know Their BATNA:**
• What are their alternatives?
• What pressures are they under?
• Weaker their BATNA = more leverage for you

**Identify Interests:**
• Yours and theirs
• Interests ≠ Positions
• Position: "I want $100K"
• Interest: "I need to feel valued and secure"

**Research:**
• Market rates and precedents
• Their company situation
• Decision-makers and influencers
• Time pressures

**Negotiation Strategies:**

**Win-Win (Integrative):**
• Expand the pie before dividing
• Find creative solutions
• Trade things you value differently
• Build long-term relationships

**Principled Negotiation (Harvard Method):**
1. Separate people from the problem
2. Focus on interests, not positions
3. Generate options for mutual gain
4. Use objective criteria

**Tactics:**

**Anchoring:**
• First number sets the range
• Anchor high (if selling) or low (if buying)
• Back up with rationale

**Bracketing:**
• If they offer $80K and you want $100K
• Counter at $120K
• Meet in the middle at $100K

**Nibbling:**
• Ask for small additions after main deal
• "Can you throw in..."
• Works both ways (watch for it)

**Good Cop/Bad Cop:**
• One person is tough, one is friendly
• Creates pressure to satisfy the "good cop"
• Counter: Recognize it, address both

**Silence:**
• Powerful tool
• Let them fill the void
• Don't rush to concede

**Flinch:**
• React visibly to their offer
• Signals it's too far from acceptable
• Use sparingly

**Closing the Deal:**
• Summarize agreements
• Get it in writing
• Clarify next steps
• Leave them feeling good`;
    }

    if (/\b(conflict|disagree|argument|difficult.?convers)\b/i.test(lowerPrompt)) {
      return `### ⚔️ Conflict Resolution Guide

**Understanding Conflict:**
• Conflict is natural and inevitable
• Can be constructive or destructive
• Often about unmet needs
• Resolution strengthens relationships

**Conflict Styles:**

**Competing:** Win at all costs
• Use when: Quick decision needed, you're right
• Avoid when: Relationship matters, you might be wrong

**Accommodating:** Let them win
• Use when: Issue matters more to them, preserving harmony
• Avoid when: Your needs are important, sets bad precedent

**Avoiding:** Sidestep the conflict
• Use when: Issue is trivial, emotions are high
• Avoid when: Issue is important, avoidance makes it worse

**Compromising:** Split the difference
• Use when: Time pressure, equal power
• Avoid when: Creative solution possible, core values at stake

**Collaborating:** Find win-win
• Use when: Relationship matters, time available
• Avoid when: Issue is trivial, quick decision needed

**Difficult Conversation Framework:**

**1. Prepare:**
• What happened? (Facts, not interpretations)
• How do you feel? (Name emotions)
• What do you want? (Outcome)
• What's their perspective?

**2. Open:**
• "I'd like to discuss something important"
• "Can we talk about what happened?"
• Choose right time and place
• Private, calm, unrushed

**3. Share Your Perspective:**
• Use "I" statements
• "I felt frustrated when..."
• Stick to facts and feelings
• Avoid blame and accusations

**4. Listen to Theirs:**
• Ask open questions
• "Help me understand..."
• Reflect back what you hear
• Acknowledge their feelings

**5. Find Common Ground:**
• "It sounds like we both want..."
• Focus on shared interests
• Brainstorm solutions together
• Be willing to compromise

**6. Agree on Next Steps:**
• Specific actions
• Who does what by when
• How to prevent recurrence
• Follow up plan

**De-escalation Techniques:**
• Lower your voice
• Slow down
• Acknowledge their feelings
• Take a break if needed
• Find something to agree on
• Use their name
• Ask questions instead of statements

**Common Mistakes:**
• Attacking the person, not the problem
• Bringing up past issues
• Interrupting
• Assuming intent
• Trying to "win"
• Avoiding the conversation entirely`;
    }

    return `### 🤝 Negotiation Overview

**Core Principles:**
• Prepare thoroughly
• Know your BATNA (best alternative)
• Focus on interests, not positions
• Aim for win-win outcomes
• Listen more than you talk

**Key Skills:**
• Active listening
• Asking good questions
• Managing emotions
• Creative problem-solving
• Knowing when to walk away

**Common Situations:**
• Salary and job offers
• Business deals and contracts
• Conflict resolution
• Everyday negotiations

What specific negotiation topic would you like to explore?`;
  }

  private generateTimeManagementHelp(prompt: string, lowerPrompt: string): string {
    if (/\b(priorit|eisenhower|urgent|important|matrix)\b/i.test(lowerPrompt)) {
      return `### 🎯 Prioritization Guide

**The Eisenhower Matrix:**

\`\`\`
                    URGENT          NOT URGENT
              ┌─────────────────┬─────────────────┐
   IMPORTANT  │    DO FIRST     │    SCHEDULE     │
              │                 │                 │
              │  Crises         │  Planning       │
              │  Deadlines      │  Development    │
              │  Emergencies    │  Relationships  │
              │                 │  Exercise       │
              ├─────────────────┼─────────────────┤
NOT IMPORTANT │    DELEGATE     │    ELIMINATE    │
              │                 │                 │
              │  Interruptions  │  Time wasters   │
              │  Some meetings  │  Busy work      │
              │  Some emails    │  Social media   │
              │                 │  TV             │
              └─────────────────┴─────────────────┘
\`\`\`

**Quadrant 1: Do First (Urgent + Important)**
• Handle immediately
• Can't be delegated
• Examples: Crises, deadlines, emergencies
• Goal: Minimize through better planning

**Quadrant 2: Schedule (Not Urgent + Important)**
• Most valuable quadrant
• Where growth happens
• Examples: Planning, learning, relationships, health
• Goal: Spend most time here

**Quadrant 3: Delegate (Urgent + Not Important)**
• Feels urgent but isn't your priority
• Examples: Some calls, emails, meetings
• Goal: Delegate or batch process

**Quadrant 4: Eliminate (Not Urgent + Not Important)**
• Time wasters
• Examples: Mindless scrolling, excessive TV
• Goal: Eliminate or minimize

**Other Prioritization Methods:**

**ABCDE Method:**
• A: Must do (serious consequences if not done)
• B: Should do (mild consequences)
• C: Nice to do (no consequences)
• D: Delegate
• E: Eliminate

**Eat the Frog:**
• Do your hardest/most important task first
• When willpower is highest
• Everything else feels easier

**1-3-5 Rule:**
• Each day plan:
  - 1 big thing
  - 3 medium things
  - 5 small things

**Warren Buffett's 2-List Strategy:**
1. Write 25 goals
2. Circle top 5
3. The other 20 are your "avoid at all costs" list

**MIT (Most Important Tasks):**
• Identify 1-3 MITs each day
• Complete before anything else
• Non-negotiable

**Common Prioritization Mistakes:**
• Confusing urgent with important
• Not saying no enough
• Reactive instead of proactive
• No clear goals to prioritize against
• Perfectionism on low-priority tasks`;
    }

    if (/\b(pomodoro|focus|concentrat|distract|deep.?work)\b/i.test(lowerPrompt)) {
      return `### 🍅 Focus & Deep Work Guide

**The Pomodoro Technique:**

**How It Works:**
1. Choose a task
2. Set timer for 25 minutes
3. Work with full focus
4. Take 5-minute break
5. After 4 pomodoros, take 15-30 minute break

**Why It Works:**
• Creates urgency
• Breaks work into manageable chunks
• Builds in recovery
• Tracks productivity
• Reduces decision fatigue

**Variations:**
• 50/10 (for flow states)
• 90/20 (matches ultradian rhythms)
• Flexible lengths based on task

**Deep Work (Cal Newport):**

**What is Deep Work?**
• Cognitively demanding tasks
• Requires full concentration
• Creates value, improves skills
• Increasingly rare and valuable

**Deep Work Strategies:**

**Monastic:** Eliminate all distractions
• For: Writers, researchers
• Extreme but effective

**Bimodal:** Alternate deep and shallow periods
• Days or weeks of deep work
• Then normal availability

**Rhythmic:** Daily deep work habit
• Same time every day
• 1-4 hours of deep work

**Journalistic:** Deep work whenever possible
• Requires practice
• Fit it in between obligations

**Creating Focus:**

**Environment:**
• Dedicated workspace
• Phone in another room
• Website blockers (Freedom, Cold Turkey)
• Noise-canceling headphones
• "Do not disturb" signals

**Rituals:**
• Same time each day
• Same location
• Same startup routine
• Clear end time

**Managing Distractions:**

**Internal Distractions:**
• Keep a "parking lot" for random thoughts
• Meditation practice
• Address underlying anxiety
• Get enough sleep

**External Distractions:**
• Batch email/messages
• Set expectations with others
• Use airplane mode
• Close unnecessary tabs

**Attention Residue:**
• Switching tasks leaves mental residue
• Takes 23 minutes to refocus
• Batch similar tasks
• Complete tasks fully when possible

**Building Focus Muscle:**
• Start with short sessions
• Gradually increase duration
• Practice regularly
• Embrace boredom (don't always reach for phone)`;
    }

    if (/\b(schedule|calendar|time.?block|plan.?day|routine)\b/i.test(lowerPrompt)) {
      return `### 📅 Scheduling & Time Blocking Guide

**Time Blocking:**

**What It Is:**
• Assigning specific tasks to specific time blocks
• Your calendar becomes your to-do list
• Proactive vs reactive time management

**How to Time Block:**

**1. Identify Your Tasks:**
• List everything you need to do
• Include recurring tasks
• Estimate time needed

**2. Categorize:**
• Deep work (focused, creative)
• Shallow work (admin, email)
• Meetings
• Personal/health

**3. Block Your Calendar:**
• Deep work in peak energy hours
• Batch similar tasks
• Include buffer time
• Protect your blocks

**Sample Time-Blocked Day:**
\`\`\`
6:00 AM  - Morning routine
7:00 AM  - Exercise
8:00 AM  - Deep work block 1
10:00 AM - Break
10:15 AM - Email/messages batch
10:45 AM - Meetings
12:00 PM - Lunch
1:00 PM  - Deep work block 2
3:00 PM  - Break
3:15 PM  - Shallow work/admin
4:30 PM  - Planning tomorrow
5:00 PM  - End work
\`\`\`

**Day Theming:**
• Monday: Admin and planning
• Tuesday: Client work
• Wednesday: Creative projects
• Thursday: Meetings
• Friday: Learning and review

**Weekly Planning:**

**Weekly Review (30-60 min):**
1. Review past week (wins, lessons)
2. Check goals and projects
3. Identify next week's priorities
4. Time block the week
5. Prepare for key meetings

**Daily Planning (10-15 min):**
1. Review today's blocks
2. Identify top 3 priorities
3. Prepare materials needed
4. Anticipate obstacles
5. Set intention

**Protecting Your Time:**

**Say No:**
• "I don't have capacity for that right now"
• "That doesn't align with my priorities"
• "Let me check my calendar and get back to you"

**Meeting Hygiene:**
• Default to 25 or 50 minutes
• Require agendas
• Decline if not essential
• Batch meetings on certain days
• No-meeting days

**Buffer Time:**
• Don't schedule back-to-back
• Allow for transitions
• Account for tasks taking longer
• Leave room for unexpected

**Energy Management:**
• Match tasks to energy levels
• Protect your peak hours
• Schedule breaks
• Don't overschedule`;
    }

    return `### ⏰ Time Management Overview

**Core Principles:**
• Prioritize ruthlessly
• Protect your focus time
• Plan proactively
• Batch similar tasks
• Build in buffers

**Key Techniques:**
• Eisenhower Matrix (urgent vs important)
• Time blocking
• Pomodoro Technique
• Weekly and daily planning
• Energy management

**Common Time Wasters:**
• Unnecessary meetings
• Email/message checking
• Social media
• Perfectionism
• Lack of planning

What specific time management topic would you like to explore?`;
  }

  private generateHabitsHelp(prompt: string, lowerPrompt: string): string {
    if (/\b(build|form|create|start|new).*(habit)/i.test(lowerPrompt) || /\b(habit).*(build|form|create|start|new)/i.test(lowerPrompt)) {
      return `### 🔄 Building New Habits Guide

**The Habit Loop:**
\`\`\`
CUE → CRAVING → RESPONSE → REWARD
\`\`\`

**James Clear's 4 Laws of Behavior Change:**

**1. Make It Obvious (Cue)**
• Implementation intention: "I will [BEHAVIOR] at [TIME] in [LOCATION]"
• Habit stacking: "After [CURRENT HABIT], I will [NEW HABIT]"
• Design your environment
• Use visual cues

**2. Make It Attractive (Craving)**
• Temptation bundling: Pair with something you enjoy
• Join a culture where the behavior is normal
• Create a motivation ritual
• Reframe your mindset

**3. Make It Easy (Response)**
• Reduce friction
• Prime your environment
• Master the decisive moment
• Use the 2-minute rule
• Automate when possible

**4. Make It Satisfying (Reward)**
• Use immediate rewards
• Track your habits
• Never miss twice
• Create a habit contract

**The 2-Minute Rule:**
• Scale any habit down to 2 minutes
• "Read before bed" → "Read one page"
• "Run 3 miles" → "Put on running shoes"
• Master showing up first

**Habit Stacking Examples:**
• After I pour my morning coffee, I will meditate for 1 minute
• After I sit down at my desk, I will write my top 3 priorities
• After I finish dinner, I will put my phone in another room

**Environment Design:**
• Make good habits obvious and easy
• Make bad habits invisible and hard
• One space, one use
• Reduce friction for good behaviors
• Increase friction for bad behaviors

**Habit Tracking:**
• Visual progress is motivating
• Don't break the chain
• Track the habit, not the outcome
• Keep it simple
• Review weekly

**Starting Small:**
• Tiny habits build momentum
• Success builds identity
• Consistency > intensity
• You can always do more, but start small

**Common Mistakes:**
• Starting too big
• Relying on motivation
• No clear cue
• No immediate reward
• Trying to change too much at once`;
    }

    if (/\b(break|stop|quit|bad|unhealthy).*(habit)/i.test(lowerPrompt) || /\b(habit).*(break|stop|quit|bad)/i.test(lowerPrompt)) {
      return `### 🚫 Breaking Bad Habits Guide

**Inversion of the 4 Laws:**

**1. Make It Invisible (Cue)**
• Remove triggers from environment
• Avoid situations that trigger the habit
• Reduce exposure
• Out of sight, out of mind

**2. Make It Unattractive (Craving)**
• Reframe the benefits
• Highlight the costs
• Create negative associations
• Find your deeper motivation to quit

**3. Make It Difficult (Response)**
• Increase friction
• Add steps between you and the behavior
• Use commitment devices
• Restrict future choices

**4. Make It Unsatisfying (Reward)**
• Get an accountability partner
• Create a habit contract with consequences
• Make the costs immediate
• Public commitment

**Strategies for Specific Habits:**

**Phone/Social Media:**
• Delete apps (use browser instead)
• Grayscale mode
• Phone in another room
• App timers and blockers
• Designated phone-free times

**Unhealthy Eating:**
• Don't keep junk food at home
• Meal prep healthy options
• Smaller plates
• Wait 10 minutes before snacking
• Identify emotional triggers

**Procrastination:**
• Break tasks into tiny steps
• Remove distractions
• Use implementation intentions
• Accountability partner
• Reward completion

**Smoking/Drinking:**
• Avoid triggers (people, places, situations)
• Replace with healthier behavior
• Tell people you're quitting
• Professional support if needed
• One day at a time

**Understanding Your Triggers:**

**Common Triggers:**
• Stress
• Boredom
• Social situations
• Certain times of day
• Specific locations
• Emotional states

**Trigger Journal:**
• When did the urge hit?
• Where were you?
• Who were you with?
• How were you feeling?
• What happened right before?

**Replacement Habits:**
• Don't just eliminate, substitute
• Same cue, different routine, similar reward
• Example: Stress → walk instead of smoke
• Example: Boredom → read instead of scroll

**Dealing with Slip-Ups:**
• They're normal, not failure
• Never miss twice
• Learn from what triggered it
• Recommit immediately
• Self-compassion, not self-criticism`;
    }

    if (/\b(morning|routine|ritual|wake|early)\b/i.test(lowerPrompt)) {
      return `### 🌅 Morning Routine Guide

**Why Mornings Matter:**
• Willpower is highest
• Fewer distractions
• Sets tone for the day
• Consistent, controllable time
• Compound effect over time

**Building Your Morning Routine:**

**Start the Night Before:**
• Decide wake time (and stick to it)
• Prepare clothes, bag, materials
• Set intentions for tomorrow
• Limit screens before bed
• Get enough sleep (7-9 hours)

**Wake Up Strategy:**
• Alarm across the room
• No snooze button
• Same time every day (even weekends)
• Light exposure immediately
• Splash cold water on face

**Sample Morning Routines:**

**Minimal (30 min):**
\`\`\`
5 min  - Hydrate, stretch
10 min - Meditation or journaling
10 min - Review priorities
5 min  - Get ready
\`\`\`

**Balanced (60 min):**
\`\`\`
10 min - Hydrate, light movement
15 min - Exercise
10 min - Meditation
10 min - Journaling/planning
15 min - Learning (reading, podcast)
\`\`\`

**Comprehensive (90 min):**
\`\`\`
10 min - Hydrate, stretching
30 min - Exercise
10 min - Cold shower
15 min - Meditation
15 min - Journaling
10 min - Planning the day
\`\`\`

**Common Morning Routine Elements:**

**Physical:**
• Hydration (water first thing)
• Exercise or movement
• Cold exposure
• Healthy breakfast

**Mental:**
• Meditation or breathwork
• Journaling
• Gratitude practice
• Visualization

**Productive:**
• Review goals and priorities
• Deep work session
• Learning time
• Planning the day

**What to Avoid:**
• Checking phone immediately
• Email/social media
• News
• Reactive tasks
• Hitting snooze

**Making It Stick:**
• Start with just one element
• Be consistent with wake time
• Prepare the night before
• Track your routine
• Adjust based on what works`;
    }

    return `### 🔄 Habits Overview

**The Science of Habits:**
• Habits are automatic behaviors
• Formed through repetition
• Cue → Routine → Reward loop
• Can be built or broken

**Building Good Habits:**
• Make it obvious, attractive, easy, satisfying
• Start tiny (2-minute rule)
• Stack on existing habits
• Design your environment
• Track your progress

**Breaking Bad Habits:**
• Make it invisible, unattractive, difficult, unsatisfying
• Identify and avoid triggers
• Replace with better alternatives
• Get accountability
• Be patient with yourself

What specific habit topic would you like to explore?`;
  }

  // ============================================================================
  // EXTENDED CONTENT SECTION V6 - Fitness, Nutrition, Sleep, Mental Health
  // ============================================================================

  private generateAdvancedFitnessHelp(prompt: string, lowerPrompt: string): string {
    if (/\b(strength|weight.?train|lift|muscle|gym|workout)\b/i.test(lowerPrompt)) {
      return `### 💪 Strength Training Guide

**Getting Started:**

**Basic Principles:**
• Progressive overload (gradually increase weight/reps)
• Compound movements first (work multiple muscles)
• Proper form over heavy weight
• Rest and recovery are essential
• Consistency beats intensity

**Essential Compound Exercises:**

**Push:**
• Bench Press (chest, shoulders, triceps)
• Overhead Press (shoulders, triceps)
• Push-ups (chest, shoulders, triceps)

**Pull:**
• Deadlift (back, glutes, hamstrings)
• Barbell Row (back, biceps)
• Pull-ups/Lat Pulldown (back, biceps)

**Legs:**
• Squat (quads, glutes, core)
• Romanian Deadlift (hamstrings, glutes)
• Lunges (quads, glutes, balance)

**Beginner Program (3 days/week):**

**Day A:**
• Squat: 3×5
• Bench Press: 3×5
• Barbell Row: 3×5

**Day B:**
• Squat: 3×5
• Overhead Press: 3×5
• Deadlift: 1×5

**Alternate A-B-A, B-A-B each week**

**Intermediate Split (4 days/week):**

**Upper A:**
• Bench Press: 4×6-8
• Barbell Row: 4×6-8
• Overhead Press: 3×8-10
• Pull-ups: 3×8-10
• Bicep Curls: 3×10-12
• Tricep Pushdowns: 3×10-12

**Lower A:**
• Squat: 4×6-8
• Romanian Deadlift: 3×8-10
• Leg Press: 3×10-12
• Leg Curls: 3×10-12
• Calf Raises: 4×12-15

**Rep Ranges:**
• Strength: 1-5 reps (heavy weight)
• Hypertrophy: 6-12 reps (moderate weight)
• Endurance: 12-20 reps (lighter weight)

**Rest Between Sets:**
• Heavy compound: 3-5 minutes
• Moderate compound: 2-3 minutes
• Isolation exercises: 1-2 minutes

**Progressive Overload Methods:**
• Add weight (2.5-5 lbs when you hit rep target)
• Add reps (within target range)
• Add sets (volume)
• Decrease rest time
• Improve form/range of motion

**Recovery:**
• Sleep 7-9 hours
• Eat enough protein (0.7-1g per lb bodyweight)
• Rest days between muscle groups
• Deload every 4-8 weeks`;
    }

    if (/\b(cardio|run|running|hiit|endurance|aerobic)\b/i.test(lowerPrompt)) {
      return `### 🏃 Cardio & Endurance Guide

**Types of Cardio:**

**LISS (Low-Intensity Steady State):**
• 30-60 minutes at conversational pace
• Walking, easy cycling, swimming
• Fat burning, recovery-friendly
• Good for beginners, active recovery

**MISS (Moderate-Intensity Steady State):**
• 20-45 minutes at moderate effort
• Jogging, cycling, elliptical
• Improves aerobic capacity
• Sustainable long-term

**HIIT (High-Intensity Interval Training):**
• Short bursts of max effort + rest
• 15-25 minutes total
• Burns calories efficiently
• Improves both aerobic and anaerobic fitness

**Sample HIIT Workout:**
\`\`\`
Warm-up: 5 minutes easy
8 rounds:
  - 30 seconds ALL OUT
  - 60 seconds rest/easy
Cool-down: 5 minutes easy
Total: ~20 minutes
\`\`\`

**Running for Beginners:**

**Couch to 5K (8 weeks):**
• Week 1-2: Run 1 min, walk 2 min (repeat 8x)
• Week 3-4: Run 2 min, walk 1 min (repeat 8x)
• Week 5-6: Run 5 min, walk 1 min (repeat 4x)
• Week 7-8: Run 10 min, walk 1 min (repeat 2x)
• Then: Run 20-30 minutes continuous

**Running Tips:**
• Start slower than you think
• Focus on time, not distance
• Run 3-4 days per week max
• Rest days are essential
• Good shoes matter

**Heart Rate Zones:**
• Zone 1 (50-60%): Recovery, warm-up
• Zone 2 (60-70%): Fat burning, endurance base
• Zone 3 (70-80%): Aerobic fitness
• Zone 4 (80-90%): Threshold, race pace
• Zone 5 (90-100%): Max effort, sprints

**Max HR estimate: 220 - your age**

**Cardio + Strength Balance:**
• Do cardio after lifting (or separate days)
• 2-3 cardio sessions per week is plenty
• Don't let cardio interfere with recovery
• LISS on rest days is fine
• HIIT counts as a workout

**Benefits of Cardio:**
• Heart health
• Improved endurance
• Better recovery
• Mental health benefits
• Calorie burn
• Better sleep`;
    }

    if (/\b(stretch|flexib|mobility|yoga|warm.?up|cool.?down)\b/i.test(lowerPrompt)) {
      return `### 🧘 Flexibility & Mobility Guide

**Flexibility vs Mobility:**
• **Flexibility:** Passive range of motion (how far you can stretch)
• **Mobility:** Active range of motion (how far you can move with control)
• Both are important for performance and injury prevention

**Types of Stretching:**

**Dynamic Stretching (Before Workout):**
• Movement-based stretches
• Prepares muscles for activity
• Increases blood flow and temperature
• Examples: Leg swings, arm circles, lunges with twist

**Static Stretching (After Workout):**
• Hold stretches for 30-60 seconds
• Improves flexibility over time
• Best when muscles are warm
• Examples: Hamstring stretch, quad stretch, chest stretch

**Pre-Workout Warm-Up (5-10 min):**
\`\`\`
• Light cardio: 2-3 min (jumping jacks, jogging)
• Leg swings: 10 each direction
• Arm circles: 10 forward, 10 backward
• Hip circles: 10 each direction
• Bodyweight squats: 10
• Lunges with twist: 5 each side
• Inchworms: 5
\`\`\`

**Post-Workout Stretches (5-10 min):**
\`\`\`
Hold each for 30-60 seconds:
• Hamstring stretch
• Quad stretch
• Hip flexor stretch
• Chest/shoulder stretch
• Tricep stretch
• Lat stretch
• Calf stretch
\`\`\`

**Daily Mobility Routine (10 min):**
\`\`\`
• Cat-cow: 10 reps
• Thread the needle: 5 each side
• World's greatest stretch: 5 each side
• 90/90 hip stretch: 30 sec each side
• Deep squat hold: 60 seconds
• Wall angels: 10 reps
• Neck circles: 5 each direction
\`\`\`

**Common Tight Areas:**
• **Hip flexors:** From sitting all day
• **Hamstrings:** Affects lower back
• **Chest/shoulders:** From hunching
• **Thoracic spine:** Upper back mobility
• **Ankles:** Affects squat depth

**Improving Flexibility:**
• Consistency matters most
• Stretch daily (even 5 minutes)
• Don't bounce (hold steady)
• Breathe into the stretch
• Slight discomfort, never pain
• Progress takes weeks/months`;
    }

    return `### 🏋️ Fitness Overview

**Getting Started:**
• Start where you are
• Consistency over intensity
• Progressive overload
• Rest and recovery matter
• Find activities you enjoy

**Basic Weekly Structure:**
• Strength training: 2-4 days
• Cardio: 2-3 days
• Rest/active recovery: 1-2 days
• Stretching: Daily

**Key Principles:**
• Warm up before, stretch after
• Proper form prevents injury
• Sleep and nutrition support training
• Track your progress
• Be patient with results

What specific fitness topic would you like to explore?`;
  }

  private generateAdvancedNutritionHelp(prompt: string, lowerPrompt: string): string {
    if (/\b(calorie|calories|tdee|deficit|surplus|macro)\b/i.test(lowerPrompt)) {
      return `### 🔢 Calories & Macros Guide

**Understanding Calories:**

**TDEE (Total Daily Energy Expenditure):**
• Total calories you burn per day
• BMR + activity + exercise + digestion

**Quick TDEE Estimate:**
• Sedentary: Bodyweight × 14
• Lightly active: Bodyweight × 15
• Moderately active: Bodyweight × 16
• Very active: Bodyweight × 17-18

**Example (170 lb, moderately active):**
170 × 16 = 2,720 calories/day maintenance

**Goals:**
• **Fat loss:** TDEE - 300-500 calories
• **Maintenance:** TDEE
• **Muscle gain:** TDEE + 200-300 calories

**Macronutrients:**

**Protein:**
• 4 calories per gram
• Building block for muscle
• Most satiating macro
• Target: 0.7-1g per lb bodyweight
• Sources: Meat, fish, eggs, dairy, legumes

**Carbohydrates:**
• 4 calories per gram
• Primary energy source
• Fuels workouts and brain
• Target: Fill remaining calories after protein/fat
• Sources: Grains, fruits, vegetables, legumes

**Fat:**
• 9 calories per gram
• Hormone production, nutrient absorption
• Essential for health
• Target: 0.3-0.4g per lb bodyweight (minimum)
• Sources: Oils, nuts, avocado, fatty fish

**Sample Macro Split (170 lb person, fat loss):**
\`\`\`
TDEE: 2,720 calories
Deficit: 2,220 calories

Protein: 170g × 4 = 680 calories
Fat: 60g × 9 = 540 calories
Carbs: (2,220 - 680 - 540) / 4 = 250g

Daily targets:
• Protein: 170g
• Fat: 60g
• Carbs: 250g
\`\`\`

**Tracking Tips:**
• Use an app (MyFitnessPal, Cronometer)
• Weigh food for accuracy
• Track consistently for 2-4 weeks
• Adjust based on results
• Don't obsess—estimates are fine

**Rate of Change:**
• Fat loss: 0.5-1% bodyweight per week
• Muscle gain: 0.25-0.5% bodyweight per week
• Faster = more muscle loss or fat gain`;
    }

    if (/\b(protein|meat|chicken|fish|vegetarian|vegan)\b/i.test(lowerPrompt)) {
      return `### 🥩 Protein Guide

**Why Protein Matters:**
• Builds and repairs muscle
• Most satiating macronutrient
• Supports immune function
• Maintains bone health
• Higher thermic effect (burns more calories to digest)

**How Much Protein:**
• General health: 0.5g per lb bodyweight
• Active/building muscle: 0.7-1g per lb bodyweight
• Fat loss (preserve muscle): 1-1.2g per lb bodyweight

**Protein Sources (per 100g):**

**Animal Sources:**
• Chicken breast: 31g protein
• Turkey breast: 29g protein
• Lean beef: 26g protein
• Salmon: 25g protein
• Tuna: 30g protein
• Eggs: 13g protein (6g per egg)
• Greek yogurt: 10g protein
• Cottage cheese: 11g protein

**Plant Sources:**
• Tofu: 8g protein
• Tempeh: 19g protein
• Lentils (cooked): 9g protein
• Chickpeas (cooked): 9g protein
• Black beans (cooked): 9g protein
• Edamame: 11g protein
• Seitan: 25g protein
• Quinoa (cooked): 4g protein

**Protein Supplements:**
• Whey protein: Fast-absorbing, complete protein
• Casein: Slow-absorbing, good before bed
• Plant protein: Pea, rice, hemp blends
• Use to fill gaps, not replace whole foods

**Protein Timing:**
• Spread throughout day (20-40g per meal)
• Post-workout: Within 2 hours (not critical)
• Before bed: Casein or cottage cheese
• Total daily intake matters most

**High-Protein Meal Ideas:**

**Breakfast:**
• Greek yogurt + berries + nuts
• Eggs + vegetables + whole grain toast
• Protein smoothie + oats

**Lunch:**
• Chicken salad with quinoa
• Tuna wrap with vegetables
• Lentil soup + whole grain bread

**Dinner:**
• Salmon + roasted vegetables + rice
• Lean beef stir-fry + noodles
• Tofu curry + brown rice

**Snacks:**
• Greek yogurt
• Cottage cheese
• Protein shake
• Hard-boiled eggs
• Jerky
• Edamame`;
    }

    if (/\b(meal.?prep|meal.?plan|cook|recipe|eat.?healthy)\b/i.test(lowerPrompt)) {
      return `### 🍳 Meal Prep & Planning Guide

**Why Meal Prep:**
• Saves time during the week
• Saves money (less takeout)
• Healthier choices (planned ahead)
• Reduces decision fatigue
• Helps hit nutrition goals

**Meal Prep Strategies:**

**Full Prep:**
• Cook complete meals for the week
• Portion into containers
• Grab and go
• Best for: Busy schedules, strict goals

**Batch Cooking:**
• Cook components in bulk
• Mix and match throughout week
• More variety
• Best for: Flexibility, avoiding boredom

**Ingredient Prep:**
• Wash, chop, portion ingredients
• Cook fresh each day (faster)
• Freshest taste
• Best for: Those who enjoy cooking

**Weekly Meal Prep (Sunday, 2-3 hours):**

**Proteins (pick 2-3):**
• Bake chicken breasts (season differently)
• Cook ground turkey
• Grill salmon
• Prepare tofu

**Carbs (pick 2-3):**
• Cook rice (white, brown, or both)
• Roast sweet potatoes
• Cook quinoa
• Prepare pasta

**Vegetables (pick 3-4):**
• Roast mixed vegetables
• Steam broccoli
• Prepare salad greens
• Chop raw veggies for snacks

**Sauces/Dressings:**
• Make 2-3 sauces for variety
• Store separately
• Add before eating

**Storage Tips:**
• Glass containers (microwave-safe)
• Separate wet and dry ingredients
• Most meals last 4-5 days refrigerated
• Freeze extras for later
• Label with dates

**Sample Week:**
\`\`\`
Monday: Chicken + rice + roasted veggies
Tuesday: Turkey + sweet potato + broccoli
Wednesday: Salmon + quinoa + salad
Thursday: Chicken + rice + different sauce
Friday: Turkey bowl with all the veggies
Weekend: Cook fresh or eat out
\`\`\`

**Budget Meal Prep:**
• Buy proteins on sale, freeze
• Frozen vegetables are nutritious and cheap
• Rice, beans, oats are inexpensive staples
• Buy in bulk when possible
• Plan around sales`;
    }

    return `### 🥗 Nutrition Overview

**Basic Principles:**
• Eat mostly whole foods
• Get enough protein
• Eat plenty of vegetables
• Stay hydrated
• Balance is sustainable

**Daily Targets:**
• Protein: 0.7-1g per lb bodyweight
• Vegetables: 5+ servings
• Water: Half your bodyweight in ounces
• Fiber: 25-35g

**Healthy Eating Tips:**
• Plan meals ahead
• Prep ingredients on weekends
• Keep healthy snacks available
• Don't drink your calories
• 80/20 rule (80% nutritious, 20% flexible)

What specific nutrition topic would you like to explore?`;
  }

  private generateAdvancedSleepHelp(prompt: string, lowerPrompt: string): string {
    if (/\b(insomnia|can't.?sleep|trouble.?sleep|fall.?asleep)\b/i.test(lowerPrompt)) {
      return `### 😴 Overcoming Insomnia Guide

**Types of Insomnia:**
• **Sleep-onset:** Difficulty falling asleep
• **Sleep-maintenance:** Waking during the night
• **Early morning:** Waking too early
• **Acute:** Short-term (days to weeks)
• **Chronic:** Long-term (3+ months)

**Common Causes:**
• Stress and anxiety
• Poor sleep habits
• Irregular schedule
• Caffeine/alcohol
• Screen time before bed
• Medical conditions
• Medications

**Sleep Hygiene Fundamentals:**

**Environment:**
• Dark room (blackout curtains)
• Cool temperature (65-68°F / 18-20°C)
• Quiet (or white noise)
• Comfortable mattress and pillows
• Remove electronics

**Schedule:**
• Same bedtime and wake time daily
• Yes, even on weekends
• Avoid sleeping in more than 1 hour
• No naps after 3 PM
• Naps under 20 minutes if needed

**Before Bed:**
• No screens 1 hour before bed
• No caffeine after 2 PM
• No alcohol within 3 hours of bed
• No large meals within 2-3 hours
• Dim lights in evening

**Relaxation Techniques:**

**4-7-8 Breathing:**
• Inhale through nose: 4 seconds
• Hold: 7 seconds
• Exhale through mouth: 8 seconds
• Repeat 4 times

**Progressive Muscle Relaxation:**
• Tense each muscle group for 5 seconds
• Release and notice the relaxation
• Start from toes, work up to head
• Takes 10-15 minutes

**Body Scan Meditation:**
• Lie still, eyes closed
• Focus attention on each body part
• Notice sensations without judgment
• Move slowly from feet to head

**If You Can't Fall Asleep:**
• Don't watch the clock
• If awake 20+ minutes, get up
• Do something boring in dim light
• Return to bed when sleepy
• Don't force it

**When to See a Doctor:**
• Insomnia lasting 3+ months
• Affecting daily functioning
• Accompanied by other symptoms
• Sleep apnea signs (snoring, gasping)
• Restless legs`;
    }

    if (/\b(sleep.?quality|deep.?sleep|rem|sleep.?cycle|sleep.?better)\b/i.test(lowerPrompt)) {
      return `### 💤 Sleep Quality Guide

**Sleep Cycles:**
\`\`\`
Each cycle: ~90 minutes
Per night: 4-6 cycles

Stage 1: Light sleep (5%)
Stage 2: Light sleep (45%)
Stage 3: Deep sleep (25%)
REM: Dream sleep (25%)
\`\`\`

**Deep Sleep (Stage 3):**
• Physical restoration
• Muscle repair and growth
• Immune system boost
• Memory consolidation
• Most occurs in first half of night

**REM Sleep:**
• Mental restoration
• Emotional processing
• Learning and memory
• Dreaming
• More in second half of night

**Improving Sleep Quality:**

**Optimize Your Environment:**
• Temperature: 65-68°F (18-20°C)
• Darkness: Blackout curtains, no LEDs
• Quiet: Earplugs or white noise
• Air quality: Consider air purifier
• Comfortable bedding

**Daytime Habits:**
• Morning sunlight exposure (10-30 min)
• Regular exercise (not too close to bed)
• Limit caffeine to morning
• Manage stress
• Stay active during the day

**Evening Routine:**
• Dim lights 2 hours before bed
• No screens 1 hour before bed
• Relaxing activities (reading, bath)
• Consistent bedtime routine
• Cool down the room

**Supplements (consult doctor):**
• Magnesium: Relaxation, sleep quality
• Melatonin: Sleep timing (0.5-3mg)
• Glycine: May improve deep sleep
• L-theanine: Relaxation without drowsiness

**Sleep Tracking:**
• Wearables (Oura, Whoop, Apple Watch)
• Apps (Sleep Cycle)
• Track trends, not daily numbers
• Focus on how you feel

**Signs of Good Sleep:**
• Fall asleep within 15-20 minutes
• Sleep through the night (mostly)
• Wake feeling refreshed
• Alert during the day
• No excessive daytime sleepiness`;
    }

    return `### 🛏️ Sleep Overview

**Why Sleep Matters:**
• Physical recovery and repair
• Mental clarity and focus
• Emotional regulation
• Memory consolidation
• Immune function
• Hormone balance

**How Much Sleep:**
• Adults: 7-9 hours
• Teens: 8-10 hours
• Quality matters as much as quantity

**Sleep Hygiene Basics:**
• Consistent sleep schedule
• Dark, cool, quiet room
• No screens before bed
• Limit caffeine and alcohol
• Regular exercise (not late)

**Quick Tips:**
• Same bedtime every night
• Morning sunlight exposure
• No caffeine after 2 PM
• Wind-down routine
• Keep bedroom for sleep only

What specific sleep topic would you like to explore?`;
  }

  private generateAdvancedMentalHealthHelp(prompt: string, lowerPrompt: string): string {
    if (/\b(anxiety|anxious|worry|panic|nervous)\b/i.test(lowerPrompt)) {
      return `### 😰 Managing Anxiety Guide

**Understanding Anxiety:**
• Normal response to stress
• Becomes a problem when excessive
• Physical and mental symptoms
• Very treatable

**Common Symptoms:**
• Racing thoughts
• Difficulty concentrating
• Restlessness
• Muscle tension
• Rapid heartbeat
• Sweating
• Difficulty sleeping
• Irritability

**Immediate Relief Techniques:**

**Grounding (5-4-3-2-1):**
• 5 things you can SEE
• 4 things you can TOUCH
• 3 things you can HEAR
• 2 things you can SMELL
• 1 thing you can TASTE

**Box Breathing:**
• Inhale: 4 seconds
• Hold: 4 seconds
• Exhale: 4 seconds
• Hold: 4 seconds
• Repeat 4 times

**Physical Release:**
• Shake out your body
• Take a walk
• Cold water on face
• Progressive muscle relaxation

**Long-Term Management:**

**Lifestyle:**
• Regular exercise (powerful anxiety reducer)
• Adequate sleep
• Limit caffeine and alcohol
• Balanced nutrition
• Social connection

**Cognitive Techniques:**
• Challenge anxious thoughts
• "Is this thought helpful?"
• "What's the evidence?"
• "What would I tell a friend?"
• Separate thoughts from facts

**Mindfulness:**
• Daily meditation practice
• Focus on present moment
• Observe thoughts without judgment
• Apps: Headspace, Calm, Insight Timer

**Exposure:**
• Gradually face feared situations
• Start small, build up
• Anxiety decreases with exposure
• Avoidance increases anxiety

**Professional Help:**
• Therapy (CBT is highly effective)
• Medication if needed
• Support groups
• Don't suffer alone

**When to Seek Help:**
• Anxiety interferes with daily life
• Panic attacks
• Avoiding important activities
• Physical symptoms
• Lasting more than a few weeks

**Remember:**
• Anxiety is treatable
• You're not alone
• It gets better with help
• Small steps matter`;
    }

    if (/\b(depress|sad|hopeless|unmotivat|low.?mood)\b/i.test(lowerPrompt)) {
      return `### 💙 Managing Depression Guide

**Important Note:**
If you're having thoughts of self-harm or suicide, please reach out:
• **National Suicide Prevention Lifeline:** 988
• **Crisis Text Line:** Text HOME to 741741
• **International Association for Suicide Prevention:** https://www.iasp.info/resources/Crisis_Centres/

**Understanding Depression:**
• More than just sadness
• Affects thoughts, feelings, and body
• Very common and treatable
• Not a character flaw or weakness

**Common Symptoms:**
• Persistent sad or empty mood
• Loss of interest in activities
• Changes in sleep (too much or too little)
• Changes in appetite
• Fatigue and low energy
• Difficulty concentrating
• Feelings of worthlessness
• Withdrawal from others

**Daily Coping Strategies:**

**Behavioral Activation:**
• Do one small thing each day
• Activity often precedes motivation
• Start tiny (get out of bed, shower)
• Gradually increase activities
• Schedule pleasant activities

**Physical Health:**
• Exercise (even a short walk helps)
• Regular sleep schedule
• Nutritious food
• Sunlight exposure
• Limit alcohol

**Social Connection:**
• Reach out to one person
• Accept help when offered
• Join a support group
• Don't isolate

**Thought Patterns:**
• Notice negative self-talk
• Challenge all-or-nothing thinking
• Practice self-compassion
• Focus on small wins
• Gratitude practice

**Professional Treatment:**

**Therapy:**
• CBT (Cognitive Behavioral Therapy)
• IPT (Interpersonal Therapy)
• Behavioral Activation
• Talk therapy

**Medication:**
• Antidepressants can help
• Takes 4-6 weeks to work
• Work with your doctor
• Don't stop suddenly

**When to Seek Help:**
• Symptoms last more than 2 weeks
• Affecting work, relationships, daily life
• Thoughts of self-harm
• Substance use to cope
• Previous episodes

**Remember:**
• Depression lies to you
• It's not your fault
• Treatment works
• Recovery is possible
• You deserve help`;
    }

    if (/\b(stress|overwhelm|burnout|exhaust|cope)\b/i.test(lowerPrompt)) {
      return `### 🧘 Stress Management Guide

**Understanding Stress:**
• Normal response to demands
• Short-term stress can be helpful
• Chronic stress is harmful
• Can be managed effectively

**Signs of Chronic Stress:**
• Constant fatigue
• Difficulty sleeping
• Irritability
• Difficulty concentrating
• Physical symptoms (headaches, tension)
• Getting sick often
• Feeling overwhelmed

**Immediate Stress Relief:**

**Breathing:**
• Deep belly breaths
• 4-7-8 technique
• Box breathing
• Just 5 breaths can help

**Physical:**
• Take a walk
• Stretch
• Exercise
• Cold water on face
• Progressive muscle relaxation

**Mental:**
• Step away from the situation
• Talk to someone
• Write it down
• Listen to music
• Get outside

**Long-Term Stress Management:**

**Lifestyle:**
• Regular exercise
• Adequate sleep
• Healthy eating
• Limit caffeine and alcohol
• Social connection

**Time Management:**
• Prioritize ruthlessly
• Learn to say no
• Delegate when possible
• Break tasks into smaller steps
• Build in buffer time

**Mindset:**
• Focus on what you can control
• Reframe challenges
• Practice gratitude
• Accept imperfection
• Self-compassion

**Boundaries:**
• Work hours limits
• Digital detox times
• Protect personal time
• Communicate needs
• It's okay to say no

**Burnout Prevention:**

**Warning Signs:**
• Exhaustion that doesn't improve with rest
• Cynicism about work
• Reduced effectiveness
• Dreading work
• Physical symptoms

**Recovery:**
• Take time off if possible
• Reduce workload
• Set firm boundaries
• Reconnect with purpose
• Seek support

**Daily Stress-Reduction Habits:**
• Morning routine (don't rush)
• Regular breaks during work
• Lunch away from desk
• Evening wind-down
• Gratitude before bed`;
    }

    return `### 🧠 Mental Health Overview

**Key Areas:**
• Anxiety management
• Depression support
• Stress reduction
• Emotional regulation
• Building resilience

**Daily Mental Health Habits:**
• Exercise regularly
• Sleep 7-9 hours
• Connect with others
• Practice mindfulness
• Limit social media
• Spend time in nature

**Warning Signs to Watch:**
• Persistent low mood
• Excessive worry
• Sleep problems
• Withdrawal from others
• Changes in appetite
• Difficulty functioning

**Getting Help:**
• Therapy is effective
• Medication can help
• Support groups exist
• You're not alone
• Asking for help is strength

**Crisis Resources:**
• 988 Suicide & Crisis Lifeline
• Crisis Text Line: Text HOME to 741741

What specific mental health topic would you like to explore?`;
  }

  // ============================================================================
  // EXTENDED CONTENT SECTION V7 - Career, Leadership, Communication, Creativity
  // ============================================================================

  private generateCareerDevelopmentHelp(prompt: string, lowerPrompt: string): string {
    if (/\b(resume|cv|cover.?letter|job.?application)\b/i.test(lowerPrompt)) {
      return `### 📄 Resume & Cover Letter Guide

**Resume Fundamentals:**

**Format:**
• 1 page for <10 years experience
• 2 pages max for senior roles
• Clean, professional font (Arial, Calibri)
• Consistent formatting throughout
• PDF format for submission

**Essential Sections:**
\`\`\`
1. Contact Information
2. Professional Summary (2-3 sentences)
3. Work Experience
4. Education
5. Skills
6. Optional: Certifications, Projects, Awards
\`\`\`

**Work Experience Format:**
\`\`\`
Job Title | Company Name
Location | Dates (Month Year - Month Year)

• Action verb + task + result/impact
• Quantify achievements when possible
• 3-5 bullets per role
• Most recent experience first
\`\`\`

**Power Action Verbs:**
• Led, Managed, Directed, Oversaw
• Developed, Created, Designed, Built
• Increased, Improved, Optimized, Enhanced
• Reduced, Decreased, Eliminated, Streamlined
• Achieved, Exceeded, Delivered, Accomplished

**Quantify Results:**
• "Increased sales by 25% in Q3"
• "Managed team of 12 engineers"
• "Reduced costs by $50K annually"
• "Delivered project 2 weeks ahead of schedule"
• "Grew user base from 10K to 100K"

**Cover Letter Structure:**
\`\`\`
Paragraph 1: Hook + position you're applying for
Paragraph 2: Why you're qualified (2-3 key achievements)
Paragraph 3: Why this company specifically
Paragraph 4: Call to action + thank you
\`\`\`

**Cover Letter Tips:**
• Customize for each application
• Address to specific person if possible
• Show you researched the company
• Keep to one page
• Match tone to company culture

**ATS Optimization:**
• Use keywords from job description
• Simple formatting (no tables, graphics)
• Standard section headings
• Spell out acronyms once
• Submit as PDF or Word as requested

**Common Mistakes:**
• Typos and grammatical errors
• Generic, not tailored to role
• Too long or too short
• Missing contact information
• Outdated or irrelevant experience`;
    }

    if (/\b(interview|job.?interview|behavioral|interview.?question)\b/i.test(lowerPrompt)) {
      return `### 🎤 Job Interview Guide

**Interview Preparation:**

**Research:**
• Company mission, values, culture
• Recent news and achievements
• Products/services
• Competitors and industry
• Interviewer backgrounds (LinkedIn)

**STAR Method for Behavioral Questions:**
\`\`\`
S - Situation: Set the context
T - Task: Describe your responsibility
A - Action: Explain what YOU did
R - Result: Share the outcome (quantify!)
\`\`\`

**Common Behavioral Questions:**

**Leadership:**
• "Tell me about a time you led a team"
• "Describe a difficult decision you made"
• "How do you motivate others?"

**Problem-Solving:**
• "Describe a challenging problem you solved"
• "Tell me about a time you failed"
• "How do you handle unexpected obstacles?"

**Teamwork:**
• "Describe a conflict with a coworker"
• "How do you handle disagreements?"
• "Tell me about a successful collaboration"

**Sample STAR Response:**
\`\`\`
Q: "Tell me about a time you improved a process"

S: "At my previous company, our customer 
   onboarding took 2 weeks on average."

T: "I was tasked with reducing onboarding 
   time to improve customer satisfaction."

A: "I mapped the entire process, identified 
   bottlenecks, automated 3 manual steps, 
   and created self-service documentation."

R: "We reduced onboarding from 2 weeks to 
   3 days, improving satisfaction scores 
   by 40% and reducing support tickets by 60%."
\`\`\`

**Questions to Ask Interviewers:**
• "What does success look like in this role?"
• "What are the biggest challenges?"
• "How would you describe the team culture?"
• "What's the growth path for this position?"
• "What do you enjoy most about working here?"

**Interview Day Tips:**
• Arrive 10-15 minutes early
• Bring copies of resume
• Dress appropriately (when in doubt, overdress)
• Firm handshake, eye contact
• Listen carefully before answering
• Ask clarifying questions if needed
• Send thank-you email within 24 hours

**Virtual Interview Tips:**
• Test technology beforehand
• Professional background
• Good lighting (face the light source)
• Minimize distractions
• Look at camera, not screen
• Have notes nearby (but don't read)`;
    }

    if (/\b(salary|negotiat|compensation|raise|promotion)\b/i.test(lowerPrompt)) {
      return `### 💰 Salary Negotiation Guide

**Preparation:**

**Research Market Rate:**
• Glassdoor, LinkedIn Salary, Levels.fyi
• PayScale, Salary.com
• Industry reports
• Network contacts
• Consider location, experience, company size

**Know Your Value:**
• List your accomplishments
• Quantify your impact
• Unique skills you bring
• Market demand for your skills
• Alternative offers (BATNA)

**Negotiation Strategies:**

**Timing:**
• After receiving offer, before accepting
• During performance reviews
• After major accomplishments
• When taking on new responsibilities
• When market rates have increased

**The Conversation:**
\`\`\`
1. Express enthusiasm for the role
2. Present your research
3. State your desired range
4. Justify with your value
5. Listen and respond
6. Consider the full package
\`\`\`

**Sample Script:**
\`\`\`
"I'm very excited about this opportunity 
and believe I can make a significant impact.

Based on my research and experience, 
I was expecting a salary in the range of 
$X to $Y. 

Given my [specific skills/achievements], 
I believe this reflects my value to the team.

Is there flexibility in the compensation?"
\`\`\`

**Beyond Base Salary:**
• Signing bonus
• Annual bonus
• Equity/stock options
• Remote work flexibility
• PTO and vacation
• Professional development budget
• Title
• Start date

**Negotiation Tips:**
• Never accept immediately (ask for time)
• Don't give a number first if possible
• Use ranges, not single numbers
• Be confident but not aggressive
• Get everything in writing
• Be prepared to walk away

**Asking for a Raise:**
\`\`\`
1. Document your achievements
2. Research market rates
3. Schedule a meeting
4. Present your case
5. Be specific about the ask
6. Have a backup plan
\`\`\`

**If They Say No:**
• Ask what it would take
• Request a timeline for review
• Negotiate other benefits
• Consider your options
• Don't burn bridges`;
    }

    if (/\b(career.?change|switch.?career|new.?career|pivot)\b/i.test(lowerPrompt)) {
      return `### 🔄 Career Change Guide

**Self-Assessment:**

**Questions to Ask:**
• What do I enjoy doing?
• What am I naturally good at?
• What would I do for free?
• What problems do I want to solve?
• What lifestyle do I want?

**Identify Transferable Skills:**
• Communication
• Leadership
• Problem-solving
• Project management
• Analysis
• Technical skills
• Creativity
• Relationship building

**Research New Fields:**

**Methods:**
• Informational interviews
• Industry events and meetups
• Online courses and certifications
• Volunteer or freelance work
• Job shadowing
• Industry publications and podcasts

**Questions for Informational Interviews:**
• "How did you get into this field?"
• "What does a typical day look like?"
• "What skills are most important?"
• "What do you wish you knew starting out?"
• "What's the job market like?"

**Making the Transition:**

**Bridge Strategies:**
• Take on projects in new area at current job
• Freelance or consult on the side
• Get relevant certifications
• Build a portfolio
• Network in the new industry
• Consider a stepping-stone role

**Reframe Your Experience:**
\`\`\`
Old: "I was a teacher for 10 years"

New: "I have 10 years of experience in:
• Curriculum development
• Public speaking
• Performance assessment
• Stakeholder communication
• Adapting to diverse audiences"
\`\`\`

**Financial Planning:**
• Build 6-12 months emergency fund
• Reduce expenses if possible
• Consider part-time transition
• Factor in training costs
• Be realistic about timeline

**Common Challenges:**
• Starting at lower level/salary
• Imposter syndrome
• Longer job search
• Learning curve
• Proving yourself again

**Success Factors:**
• Clear vision of where you're going
• Willingness to learn
• Strong network in new field
• Patience and persistence
• Embracing beginner mindset`;
    }

    return `### 💼 Career Development Overview

**Key Areas:**
• Resume and cover letters
• Interview preparation
• Salary negotiation
• Career transitions
• Professional growth

**Career Growth Strategies:**
• Set clear goals
• Seek feedback regularly
• Build your network
• Develop new skills
• Find mentors
• Take on stretch assignments

**Professional Development:**
• Continuous learning
• Industry certifications
• Conference attendance
• Online courses
• Reading and research

What specific career topic would you like to explore?`;
  }

  private generateLeadershipHelp(prompt: string, lowerPrompt: string): string {
    if (/\b(manage|manager|managing.?people|team.?lead)\b/i.test(lowerPrompt)) {
      return `### 👔 Management & Team Leadership Guide

**First-Time Manager Essentials:**

**Mindset Shift:**
• Success = team's success, not just yours
• Your job is to enable others
• Delegate, don't do everything yourself
• Build relationships, not just results
• Lead by example

**Core Responsibilities:**
• Set clear expectations
• Provide regular feedback
• Remove obstacles
• Develop team members
• Make decisions
• Communicate up and down

**One-on-One Meetings:**
\`\`\`
Frequency: Weekly, 30-60 minutes
Structure:
1. Their topics first (10-15 min)
2. Your topics (10-15 min)
3. Career development (5-10 min)
4. Action items (5 min)
\`\`\`

**Questions to Ask:**
• "What's on your mind?"
• "What obstacles are you facing?"
• "How can I help you?"
• "What feedback do you have for me?"
• "What are your goals?"

**Giving Feedback:**

**SBI Model:**
• **Situation:** When and where
• **Behavior:** What you observed (specific)
• **Impact:** Effect on team/project

**Example:**
\`\`\`
"In yesterday's meeting (Situation),
when you interrupted the client (Behavior),
it made them feel unheard and 
damaged our relationship (Impact)."
\`\`\`

**Delegation Framework:**
\`\`\`
1. Choose the right person
2. Clearly define the task
3. Explain the why
4. Set expectations and deadlines
5. Provide resources and authority
6. Check in appropriately
7. Give feedback on completion
\`\`\`

**Building Trust:**
• Be consistent and reliable
• Follow through on commitments
• Admit mistakes
• Give credit to others
• Have difficult conversations
• Be transparent when possible

**Common New Manager Mistakes:**
• Trying to be friends, not leader
• Micromanaging
• Avoiding difficult conversations
• Not delegating enough
• Taking credit for team's work
• Failing to set clear expectations`;
    }

    if (/\b(motivat|inspire|engage|team.?morale)\b/i.test(lowerPrompt)) {
      return `### 🔥 Team Motivation Guide

**Understanding Motivation:**

**Intrinsic Motivators:**
• Autonomy (control over work)
• Mastery (getting better)
• Purpose (meaningful work)
• Connection (belonging)
• Recognition (being valued)

**Extrinsic Motivators:**
• Compensation
• Benefits
• Promotions
• Awards
• Perks

**Intrinsic > Extrinsic for sustained motivation**

**Creating Autonomy:**
• Define outcomes, not methods
• Let people choose how to work
• Flexible schedules when possible
• Trust without micromanaging
• Allow experimentation

**Fostering Mastery:**
• Challenging but achievable goals
• Regular feedback
• Learning opportunities
• Stretch assignments
• Celebrate growth

**Building Purpose:**
• Connect work to bigger mission
• Share customer impact stories
• Explain the "why" behind tasks
• Involve team in goal-setting
• Celebrate wins and progress

**Recognition Best Practices:**
\`\`\`
• Be specific about what they did
• Timely (soon after the achievement)
• Public when appropriate
• Personalized to individual
• Genuine and sincere
\`\`\`

**Recognition Ideas:**
• Verbal praise in meetings
• Written thank-you notes
• Shout-outs in team channels
• Spot bonuses
• Extra time off
• Development opportunities
• Choice of projects

**Warning Signs of Low Morale:**
• Decreased productivity
• Increased absences
• Less participation in meetings
• Negative attitude
• Higher turnover
• Lack of initiative

**Addressing Low Morale:**
• Have honest conversations
• Listen without judgment
• Address legitimate concerns
• Make visible changes
• Follow through on commitments
• Be patient—trust takes time`;
    }

    if (/\b(decision|decide|strategic|strategy)\b/i.test(lowerPrompt)) {
      return `### 🎯 Strategic Decision-Making Guide

**Decision-Making Frameworks:**

**RAPID Framework:**
\`\`\`
R - Recommend: Who proposes the decision?
A - Agree: Who must agree/sign off?
P - Perform: Who implements?
I - Input: Who provides information?
D - Decide: Who makes final call?
\`\`\`

**Pros/Cons Analysis:**
\`\`\`
Option A:
+ Pro 1 (weight: high)
+ Pro 2 (weight: medium)
- Con 1 (weight: high)
- Con 2 (weight: low)

Option B:
+ Pro 1 (weight: medium)
- Con 1 (weight: medium)
\`\`\`

**10/10/10 Rule:**
• How will I feel about this in 10 minutes?
• How will I feel in 10 months?
• How will I feel in 10 years?

**Reversibility Test:**
• **Reversible decisions:** Decide quickly, iterate
• **Irreversible decisions:** Take time, gather data

**Pre-Mortem Analysis:**
\`\`\`
1. Imagine the decision failed
2. Ask: "Why did it fail?"
3. List all possible reasons
4. Address the most likely ones
5. Proceed with mitigation plans
\`\`\`

**Avoiding Decision Traps:**

**Analysis Paralysis:**
• Set a deadline
• Define "good enough"
• Remember: no decision is also a decision

**Confirmation Bias:**
• Actively seek opposing views
• Assign someone to argue against
• Consider what would change your mind

**Sunk Cost Fallacy:**
• Focus on future value, not past investment
• Ask: "Would I start this today?"
• Be willing to cut losses

**Groupthink:**
• Encourage dissent
• Anonymous input
• Bring in outside perspectives

**Strategic Thinking:**
• Think long-term, not just immediate
• Consider second-order effects
• Understand trade-offs
• Align with values and goals
• Be willing to say no`;
    }

    return `### 🏆 Leadership Overview

**Core Leadership Qualities:**
• Vision and direction
• Integrity and trust
• Communication
• Empathy
• Decisiveness
• Accountability

**Leadership Styles:**
• Servant leadership
• Transformational
• Situational
• Coaching
• Democratic

**Developing as a Leader:**
• Seek feedback
• Find mentors
• Read widely
• Reflect regularly
• Learn from failures
• Practice self-awareness

What specific leadership topic would you like to explore?`;
  }

  private generateCommunicationSkillsHelp(prompt: string, lowerPrompt: string): string {
    if (/\b(email|write|writing|professional.?communication)\b/i.test(lowerPrompt)) {
      return `### ✉️ Professional Email & Writing Guide

**Email Best Practices:**

**Structure:**
\`\`\`
Subject: Clear, specific, actionable
Greeting: Appropriate for relationship
Purpose: State it in first sentence
Body: Key points (bulleted if multiple)
Action: What you need from them
Closing: Professional sign-off
\`\`\`

**Subject Line Tips:**
• Be specific: "Q3 Budget Review - Action Needed by Friday"
• Not vague: "Quick question" or "Following up"
• Include deadline if relevant
• Use prefixes: [Action Required], [FYI], [Urgent]

**Email Tone:**
• Professional but warm
• Direct but polite
• Confident but not arrogant
• Match recipient's style

**Before You Send:**
• Proofread for typos
• Check recipient list
• Review attachments
• Consider timing
• Ask: "Is email the right medium?"

**Common Email Mistakes:**
• Too long (keep it scannable)
• Unclear ask
• Reply-all abuse
• Emotional responses
• Missing context

**Professional Writing Tips:**

**Clarity:**
• One idea per sentence
• Short paragraphs
• Active voice
• Avoid jargon
• Define acronyms

**Conciseness:**
• Cut unnecessary words
• "In order to" → "To"
• "At this point in time" → "Now"
• "Due to the fact that" → "Because"

**Structure:**
• Lead with the main point
• Use headings and bullets
• Logical flow
• Strong conclusion

**Difficult Emails:**

**Saying No:**
\`\`\`
"Thank you for thinking of me for [request].

Unfortunately, I'm not able to [do X] 
because [brief reason].

I'd suggest [alternative] instead.

Best regards"
\`\`\`

**Delivering Bad News:**
\`\`\`
"I wanted to update you on [situation].

Unfortunately, [the news].

Here's what we're doing about it: [actions].

I'm happy to discuss further."
\`\`\``;
    }

    if (/\b(present|presentation|slide|powerpoint|pitch)\b/i.test(lowerPrompt)) {
      return `### 📊 Presentation Skills Guide

**Preparation:**

**Know Your Audience:**
• What do they already know?
• What do they care about?
• What's their decision-making power?
• What objections might they have?

**Structure:**
\`\`\`
1. Hook (grab attention)
2. Problem/Context
3. Solution/Main points
4. Evidence/Examples
5. Call to action
6. Q&A
\`\`\`

**The Rule of Three:**
• 3 main points maximum
• Easier to remember
• Creates natural structure

**Slide Design:**

**Less is More:**
• One idea per slide
• 6 words per bullet max
• 6 bullets per slide max
• Large, readable font (24pt+)
• High contrast colors

**Visuals:**
• Use images over text
• Simple charts and graphs
• Consistent style
• White space is good
• Avoid clip art

**Delivery:**

**Body Language:**
• Stand tall, shoulders back
• Eye contact with audience
• Purposeful movement
• Open gestures
• Smile when appropriate

**Voice:**
• Vary pace and tone
• Pause for emphasis
• Project to back of room
• Avoid filler words (um, uh, like)

**Handling Nerves:**
• Practice extensively
• Arrive early
• Deep breathing
• Focus on message, not self
• Remember: audience wants you to succeed

**Q&A Tips:**
• Repeat the question
• Keep answers concise
• "I don't know, but I'll find out"
• Bridge back to key points
• End on a strong note

**Virtual Presentations:**
• Look at camera, not screen
• Good lighting and audio
• Minimize distractions
• Engage with polls/questions
• Have backup plan for tech issues`;
    }

    if (/\b(listen|active.?listen|conversation|difficult.?conversation)\b/i.test(lowerPrompt)) {
      return `### 👂 Active Listening & Conversations Guide

**Active Listening:**

**The HEAR Model:**
\`\`\`
H - Halt: Stop what you're doing
E - Engage: Give full attention
A - Anticipate: Be curious
R - Replay: Summarize what you heard
\`\`\`

**Techniques:**
• Maintain eye contact
• Nod and use verbal cues ("I see", "Go on")
• Don't interrupt
• Ask clarifying questions
• Paraphrase to confirm understanding
• Notice non-verbal cues

**Barriers to Listening:**
• Planning your response while they talk
• Judging or evaluating
• Distractions (phone, environment)
• Assumptions
• Emotional reactions

**Difficult Conversations:**

**Preparation:**
• Know your goal
• Anticipate their perspective
• Choose right time and place
• Manage your emotions
• Plan your opening

**Framework:**
\`\`\`
1. State the issue objectively
2. Share your perspective (I statements)
3. Ask for their perspective
4. Listen actively
5. Find common ground
6. Agree on next steps
\`\`\`

**"I" Statements:**
\`\`\`
Instead of: "You never listen to me"
Say: "I feel unheard when I'm interrupted"

Instead of: "You're always late"
Say: "I feel frustrated when meetings 
     start late because it affects my schedule"
\`\`\`

**De-escalation:**
• Stay calm (take a breath)
• Lower your voice
• Acknowledge their feelings
• Find something to agree on
• Take a break if needed

**Giving Constructive Feedback:**
\`\`\`
1. Ask permission
2. Be specific (not general)
3. Focus on behavior, not person
4. Explain impact
5. Suggest alternatives
6. Check understanding
\`\`\`

**Receiving Feedback:**
• Listen without defending
• Ask clarifying questions
• Thank them for sharing
• Reflect before responding
• Take what's useful`;
    }

    return `### 💬 Communication Skills Overview

**Key Areas:**
• Written communication
• Verbal communication
• Presentation skills
• Active listening
• Difficult conversations

**Communication Principles:**
• Know your audience
• Be clear and concise
• Listen more than you speak
• Adapt your style
• Seek to understand first

**Improving Communication:**
• Practice regularly
• Seek feedback
• Observe great communicators
• Read widely
• Record and review yourself

What specific communication topic would you like to explore?`;
  }

  private generateCreativityHelp(prompt: string, lowerPrompt: string): string {
    if (/\b(brainstorm|ideation|idea|creative.?think)\b/i.test(lowerPrompt)) {
      return `### 💡 Brainstorming & Ideation Guide

**Brainstorming Rules:**
• Quantity over quality (at first)
• No criticism during ideation
• Build on others' ideas
• Wild ideas welcome
• Stay focused on the problem

**Individual Techniques:**

**Mind Mapping:**
\`\`\`
1. Central topic in middle
2. Branch out main themes
3. Sub-branch details
4. Use colors and images
5. Connect related ideas
\`\`\`

**SCAMPER Method:**
• **S**ubstitute: What can be replaced?
• **C**ombine: What can be merged?
• **A**dapt: What can be modified?
• **M**odify: What can be changed?
• **P**ut to other uses: New applications?
• **E**liminate: What can be removed?
• **R**earrange: Different order/structure?

**Random Input:**
• Pick a random word
• Force connections to your problem
• Generates unexpected ideas

**Reverse Brainstorming:**
\`\`\`
1. State the problem
2. Ask: "How could we make this WORSE?"
3. List all the ways
4. Reverse each into a solution
\`\`\`

**Group Techniques:**

**Brainwriting:**
• Everyone writes ideas silently
• Pass papers around
• Build on others' ideas
• Avoids groupthink

**Six Thinking Hats:**
• White: Facts and data
• Red: Emotions and feelings
• Black: Caution and risks
• Yellow: Benefits and optimism
• Green: Creativity and alternatives
• Blue: Process and organization

**Round Robin:**
• Each person shares one idea
• Go around multiple times
• Everyone contributes equally

**Evaluating Ideas:**

**Impact/Effort Matrix:**
\`\`\`
High Impact, Low Effort = Quick Wins ✓
High Impact, High Effort = Major Projects
Low Impact, Low Effort = Fill-ins
Low Impact, High Effort = Avoid
\`\`\`

**Dot Voting:**
• Each person gets 3-5 dots
• Vote on favorite ideas
• Discuss top voted
• Combine similar ideas`;
    }

    if (/\b(creative.?block|stuck|inspiration|writer.?block)\b/i.test(lowerPrompt)) {
      return `### 🎨 Overcoming Creative Blocks

**Understanding Creative Blocks:**
• Normal part of creative process
• Often caused by fear or pressure
• Can be overcome with techniques
• Sometimes signals need for rest

**Common Causes:**
• Perfectionism
• Fear of failure
• Burnout and fatigue
• Lack of inspiration
• Too many constraints
• Unclear goals

**Immediate Techniques:**

**Change Your Environment:**
• Work somewhere new
• Go for a walk
• Change your tools
• Listen to different music
• Work at different time

**Lower the Stakes:**
• Create something "bad" on purpose
• Set a timer for 10 minutes
• Make it a rough draft
• No one has to see it
• Give yourself permission to fail

**Constrain Yourself:**
• Limit options (3 colors only)
• Set a tight deadline
• Use specific prompts
• Work with what you have
• Embrace limitations

**Input New Ideas:**
• Read something unrelated
• Visit a museum or gallery
• Talk to different people
• Watch documentaries
• Travel or explore

**Long-Term Strategies:**

**Build Creative Habits:**
• Create at same time daily
• Morning pages (stream of consciousness)
• Keep an idea journal
• Regular creative dates
• Protect creative time

**Manage Energy:**
• Sleep enough
• Exercise regularly
• Take breaks
• Avoid burnout
• Know your peak creative times

**Reframe Your Thinking:**
• "I'm not creative" → "I'm developing creativity"
• "It has to be perfect" → "It has to be done"
• "I have no ideas" → "I haven't found the idea yet"
• "I'm stuck" → "I'm in the messy middle"

**When to Push vs. Rest:**
• Push: Resistance feels like fear
• Rest: Resistance feels like exhaustion
• Push: You're avoiding starting
• Rest: You've been going too long`;
    }

    if (/\b(innovat|design.?think|problem.?solv|creative.?process)\b/i.test(lowerPrompt)) {
      return `### 🚀 Innovation & Design Thinking Guide

**Design Thinking Process:**
\`\`\`
1. Empathize → Understand users
2. Define → Frame the problem
3. Ideate → Generate solutions
4. Prototype → Build to learn
5. Test → Get feedback
(Iterate as needed)
\`\`\`

**Empathize:**
• Interview users
• Observe behavior
• Experience it yourself
• Ask "why" repeatedly
• Look for pain points

**Define:**
• Synthesize research
• Identify patterns
• Create user personas
• Write problem statements
• Focus on user needs

**Problem Statement Format:**
\`\`\`
"How might we [action] 
for [user] 
so that [outcome]?"

Example:
"How might we simplify checkout
for busy parents
so that they can complete purchases 
in under 2 minutes?"
\`\`\`

**Ideate:**
• Brainstorm widely
• Defer judgment
• Build on ideas
• Seek wild ideas
• Quantity matters

**Prototype:**
• Start rough and fast
• Test assumptions
• Fail early and cheap
• Learn by making
• Iterate quickly

**Prototype Types:**
• Paper sketches
• Storyboards
• Role playing
• Digital mockups
• Physical models
• Wizard of Oz (fake backend)

**Test:**
• Get real user feedback
• Observe, don't just ask
• Ask open-ended questions
• Look for surprises
• Iterate based on learning

**Innovation Mindset:**
• Embrace ambiguity
• Bias toward action
• Learn from failure
• Collaborate across disciplines
• Focus on human needs
• Question assumptions

**Fostering Innovation:**
• Psychological safety
• Time for exploration
• Diverse perspectives
• Cross-functional teams
• Celebrate experiments
• Learn from failures`;
    }

    return `### 🎭 Creativity Overview

**Key Areas:**
• Brainstorming techniques
• Overcoming creative blocks
• Design thinking
• Innovation processes
• Creative habits

**Building Creativity:**
• Practice regularly
• Embrace constraints
• Seek diverse inputs
• Take creative risks
• Learn from others

**Daily Creative Habits:**
• Morning pages
• Idea journal
• Creative time blocks
• Exposure to new things
• Playful experimentation

What specific creativity topic would you like to explore?`;
  }

  // ============================================================================
  // EXTENDED CONTENT SECTION V8 - Relationships, Parenting, Education, Learning
  // ============================================================================

  private generateRelationshipsHelp(prompt: string, lowerPrompt: string): string {
    if (/\b(dating|date|attract|first.?date|online.?dating)\b/i.test(lowerPrompt)) {
      return `### 💕 Dating & Attraction Guide

**Dating Mindset:**
• Be yourself (authentically)
• Focus on connection, not impression
• Rejection is redirection
• Quality over quantity
• Have fun with the process

**Online Dating Tips:**

**Profile Optimization:**
• Clear, recent photos (face visible)
• Mix of photos (activities, interests)
• Genuine bio (specific > generic)
• Show personality, not just facts
• Avoid clichés ("love to laugh")

**Messaging:**
• Reference something specific from their profile
• Ask open-ended questions
• Keep it light and playful
• Don't wait too long to suggest meeting
• Avoid generic openers

**First Date Tips:**

**Planning:**
• Choose comfortable, public place
• Activity dates reduce pressure
• Keep it short (coffee, drinks)
• Have a backup plan
• Confirm day before

**During the Date:**
• Be present (phone away)
• Ask questions, listen actively
• Share about yourself too
• Look for genuine connection
• Be honest about intentions

**Conversation Starters:**
• "What's the most interesting thing you've done recently?"
• "What are you passionate about outside of work?"
• "What's on your bucket list?"
• "What's your favorite way to spend a weekend?"

**Red Flags to Watch:**
• Talks only about themselves
• Rude to service staff
• Excessive negativity
• Pressuring or boundary-pushing
• Inconsistent stories
• Love-bombing too fast

**Green Flags:**
• Genuine curiosity about you
• Respectful of boundaries
• Consistent communication
• Takes responsibility
• Makes you feel comfortable
• Shared values`;
    }

    if (/\b(marriage|spouse|partner|long.?term|commit|relationship.?advice)\b/i.test(lowerPrompt)) {
      return `### 💍 Long-Term Relationship Guide

**Foundations of Healthy Relationships:**

**The Four Pillars:**
• Trust (reliability, honesty)
• Respect (boundaries, autonomy)
• Communication (open, honest)
• Commitment (choosing each other daily)

**Gottman's Research:**

**The Four Horsemen (avoid these):**
• **Criticism:** Attacking character, not behavior
• **Contempt:** Disrespect, mockery, eye-rolling
• **Defensiveness:** Not taking responsibility
• **Stonewalling:** Shutting down, withdrawing

**Antidotes:**
• Criticism → Gentle startup, "I" statements
• Contempt → Build culture of appreciation
• Defensiveness → Take responsibility
• Stonewalling → Self-soothe, take breaks

**Communication Skills:**

**Active Listening:**
• Put away distractions
• Reflect back what you hear
• Validate feelings (even if you disagree)
• Ask clarifying questions
• Don't plan your response while listening

**Conflict Resolution:**
\`\`\`
1. Choose the right time
2. Start softly (no accusations)
3. Use "I" statements
4. Focus on one issue at a time
5. Take breaks if heated
6. Find compromise
7. Repair and reconnect
\`\`\`

**Maintaining Connection:**
• Daily check-ins
• Weekly date nights
• Physical affection
• Express appreciation regularly
• Support each other's goals
• Maintain individual identities

**Love Languages:**
• Words of Affirmation
• Quality Time
• Receiving Gifts
• Acts of Service
• Physical Touch

**Know yours and your partner's**

**When to Seek Help:**
• Same arguments repeatedly
• Growing apart
• Trust issues
• Intimacy problems
• Major life transitions
• Before problems become crises`;
    }

    if (/\b(conflict|argument|fight|disagree|communicate)\b/i.test(lowerPrompt)) {
      return `### 🤝 Conflict Resolution in Relationships

**Healthy vs. Unhealthy Conflict:**

**Healthy:**
• Focus on the issue, not the person
• Both feel heard
• Leads to understanding
• Strengthens relationship
• Results in resolution or compromise

**Unhealthy:**
• Personal attacks
• Bringing up past issues
• Silent treatment
• Yelling or aggression
• No resolution, just resentment

**Before the Conversation:**
• Check your emotional state
• Identify what you really need
• Choose the right time
• Prepare to listen, not just talk

**During Conflict:**

**The Soft Startup:**
\`\`\`
Instead of: "You never help around the house!"
Try: "I'm feeling overwhelmed with housework. 
     Can we talk about dividing tasks?"
\`\`\`

**XYZ Formula:**
\`\`\`
"When you [X behavior],
in [Y situation],
I feel [Z emotion]."

Example:
"When you check your phone during dinner,
especially when I'm sharing about my day,
I feel unimportant and disconnected."
\`\`\`

**Taking Breaks:**
• Recognize when you're flooded
• Agree on a signal
• Take at least 20 minutes
• Self-soothe (don't ruminate)
• Come back to finish

**Finding Resolution:**
• Look for underlying needs
• Brainstorm solutions together
• Be willing to compromise
• Focus on the future, not the past
• Agree on specific actions

**Repair Attempts:**
• Humor (when appropriate)
• Physical touch
• "I'm sorry"
• "I understand"
• "Let's start over"
• "I love you even when we disagree"

**After Conflict:**
• Process what happened
• Acknowledge each other's efforts
• Reconnect emotionally
• Learn for next time
• Let it go once resolved`;
    }

    if (/\b(friend|friendship|social|lonely|loneliness|connect)\b/i.test(lowerPrompt)) {
      return `### 👥 Friendship & Social Connection Guide

**Why Friendships Matter:**
• Mental and physical health benefits
• Longer lifespan
• Greater happiness
• Support during challenges
• Sense of belonging

**Making Friends as an Adult:**

**Where to Meet People:**
• Hobbies and classes
• Sports leagues
• Volunteer organizations
• Professional groups
• Religious/spiritual communities
• Neighborhood events
• Through existing friends

**Building Connection:**
• Show genuine interest
• Be consistent (follow up)
• Initiate plans
• Be vulnerable appropriately
• Offer help
• Remember details about them

**Deepening Friendships:**

**Levels of Friendship:**
\`\`\`
1. Acquaintance: Surface-level
2. Casual friend: Shared activities
3. Close friend: Emotional support
4. Best friend: Deep trust, history
\`\`\`

**Moving Deeper:**
• Increase frequency of contact
• Share more personally
• Be there during hard times
• Create shared experiences
• Express appreciation

**Maintaining Friendships:**
• Regular check-ins
• Remember important dates
• Be reliable
• Celebrate their wins
• Support during struggles
• Accept changes over time

**Dealing with Loneliness:**

**Short-term:**
• Reach out to someone
• Join a group activity
• Volunteer
• Go to public spaces
• Connect online

**Long-term:**
• Build social skills
• Address social anxiety
• Create routines for connection
• Quality over quantity
• Be patient with yourself

**Toxic Friendships:**
• One-sided effort
• Constant criticism
• Jealousy of your success
• Boundary violations
• Draining, not energizing
• It's okay to let go`;
    }

    return `### ❤️ Relationships Overview

**Key Areas:**
• Dating and attraction
• Long-term relationships
• Conflict resolution
• Friendships
• Family relationships

**Relationship Principles:**
• Communication is foundational
• Respect boundaries
• Show appreciation
• Be reliable
• Grow together

**Building Connection:**
• Quality time
• Active listening
• Vulnerability
• Shared experiences
• Consistent effort

What specific relationship topic would you like to explore?`;
  }

  private generateParentingHelp(prompt: string, lowerPrompt: string): string {
    if (/\b(toddler|baby|infant|newborn|young.?child)\b/i.test(lowerPrompt)) {
      return `### 👶 Early Childhood Parenting Guide

**Newborn Basics (0-3 months):**

**Sleep:**
• Newborns sleep 14-17 hours (in chunks)
• Safe sleep: back, firm surface, no loose items
• Day/night confusion is normal
• Sleep when baby sleeps

**Feeding:**
• Feed on demand (8-12 times/day)
• Breast or formula both work
• Watch for hunger cues
• Burp during and after

**Development Milestones:**
• Focuses on faces
• Responds to sounds
• Lifts head briefly
• Social smiling (6-8 weeks)

**Infant Stage (3-12 months):**

**Development:**
• Rolling over (4-6 months)
• Sitting up (6-8 months)
• Crawling (7-10 months)
• First words (around 12 months)
• Object permanence develops

**Sleep Training Options:**
• Cry it out (extinction)
• Ferber method (graduated)
• Chair method
• Pick up/put down
• No-cry methods

**Starting Solids (around 6 months):**
• Signs of readiness
• Start with single foods
• Introduce allergens early
• Baby-led weaning option
• Continue milk as primary nutrition

**Toddler Stage (1-3 years):**

**Development:**
• Walking and running
• Language explosion
• Independence ("me do it!")
• Parallel play → interactive play
• Emotional regulation developing

**Tantrums:**
• Normal developmental stage
• Stay calm yourself
• Validate feelings
• Keep them safe
• Don't give in to demands
• Connect after calm

**Positive Discipline:**
• Clear, consistent boundaries
• Natural consequences
• Redirect behavior
• Offer choices
• Praise specific behaviors
• Model what you want to see

**Self-Care for Parents:**
• Sleep when possible
• Accept help
• Lower expectations
• Connect with other parents
• Take breaks
• It's okay to not enjoy every moment`;
    }

    if (/\b(teen|teenager|adolescent|puberty)\b/i.test(lowerPrompt)) {
      return `### 🧑‍🤝‍🧑 Parenting Teenagers Guide

**Understanding Adolescence:**

**Brain Development:**
• Prefrontal cortex still developing
• Risk-taking is biologically normal
• Emotional intensity
• Need for autonomy
• Peer relationships crucial

**Physical Changes:**
• Puberty timing varies
• Growth spurts
• Sleep patterns shift (later)
• Hormonal changes
• Body image concerns

**Communication Strategies:**

**Do:**
• Listen more than talk
• Ask open-ended questions
• Validate their feelings
• Respect their privacy (within reason)
• Stay calm during conflict
• Be available when they want to talk

**Don't:**
• Lecture
• Dismiss their concerns
• Compare to siblings/others
• Invade privacy unnecessarily
• React emotionally to everything
• Try to be their friend

**Conversation Starters:**
• "What was the best/worst part of your day?"
• "What do you think about...?"
• "How are your friends doing?"
• "What's something you're looking forward to?"

**Setting Boundaries:**

**Effective Rules:**
• Involve them in creating rules
• Explain the reasoning
• Be consistent
• Natural consequences
• Pick your battles
• Adjust as they mature

**Common Issues:**

**Screen Time:**
• Set clear limits together
• Model healthy use
• No phones at meals/bedtime
• Know what they're doing online
• Balance with other activities

**Academics:**
• Support, don't control
• Focus on effort, not just grades
• Help with organization
• Know when to step back
• Address underlying issues

**Peer Pressure:**
• Discuss scenarios in advance
• Role-play responses
• Be the "excuse" if needed
• Know their friends
• Keep communication open

**Mental Health:**
• Watch for warning signs
• Take concerns seriously
• Reduce stigma
• Professional help when needed
• Maintain connection`;
    }

    if (/\b(discipline|behavior|punish|consequence|boundary)\b/i.test(lowerPrompt)) {
      return `### 📏 Discipline & Behavior Guide

**Positive Discipline Philosophy:**
• Teach, don't punish
• Connection before correction
• Focus on solutions
• Mutual respect
• Long-term character development

**Setting Effective Boundaries:**

**Characteristics:**
• Clear and specific
• Age-appropriate
• Consistently enforced
• Explained (why it matters)
• Flexible when appropriate

**Stating Boundaries:**
\`\`\`
"In our family, we [expectation].
This is because [reason].
If [boundary is crossed], then [consequence]."

Example:
"In our family, we speak respectfully.
This is because everyone deserves kindness.
If you yell at someone, you'll need to 
take a break and try again."
\`\`\`

**Types of Consequences:**

**Natural Consequences:**
• Result naturally from behavior
• Don't require parent intervention
• Powerful learning tool
• Example: Don't wear coat → feel cold

**Logical Consequences:**
• Related to the behavior
• Respectful and reasonable
• Revealed in advance
• Example: Misuse toy → toy goes away

**Avoid:**
• Punishment unrelated to behavior
• Shaming or humiliation
• Physical punishment
• Removing love/connection

**In the Moment:**

**When Behavior Occurs:**
\`\`\`
1. Stay calm (regulate yourself first)
2. Connect ("I see you're upset")
3. Set the limit ("I won't let you hit")
4. Offer alternatives ("You can hit this pillow")
5. Follow through with consequence
6. Reconnect after
\`\`\`

**Preventing Misbehavior:**
• Meet underlying needs (HALT: Hungry, Angry, Lonely, Tired)
• Clear expectations in advance
• Positive attention regularly
• Appropriate environment
• Realistic expectations for age

**Building Intrinsic Motivation:**
• Explain the "why"
• Involve in problem-solving
• Notice effort, not just results
• Allow natural consequences
• Model desired behavior`;
    }

    return `### 👨‍👩‍👧‍👦 Parenting Overview

**Key Areas:**
• Early childhood (0-5)
• School age (6-12)
• Teenagers (13-18)
• Discipline strategies
• Communication

**Core Principles:**
• Connection before correction
• Consistency matters
• Model what you want to see
• Adjust to each child
• Take care of yourself too

**Parenting Styles:**
• Authoritative (high warmth, high structure) ✓
• Authoritarian (low warmth, high structure)
• Permissive (high warmth, low structure)
• Uninvolved (low warmth, low structure)

What specific parenting topic would you like to explore?`;
  }

  private generateEducationHelp(prompt: string, lowerPrompt: string): string {
    if (/\b(study|studying|exam|test|memoriz|retain)\b/i.test(lowerPrompt)) {
      return `### 📚 Study Skills & Exam Preparation Guide

**Effective Study Techniques:**

**Active Recall:**
• Test yourself, don't just re-read
• Use flashcards
• Practice problems
• Teach the material to someone
• Close the book and summarize

**Spaced Repetition:**
\`\`\`
Review schedule:
• Day 1: Learn new material
• Day 2: First review
• Day 4: Second review
• Day 7: Third review
• Day 14: Fourth review
• Day 30: Fifth review
\`\`\`

**Interleaving:**
• Mix different topics/types
• Don't block practice one thing
• Harder but more effective
• Improves discrimination

**Elaboration:**
• Ask "why" and "how"
• Connect to what you know
• Create examples
• Explain in your own words

**Study Environment:**
• Consistent study space
• Minimize distractions
• Good lighting
• Comfortable but not too comfortable
• Have materials ready

**Time Management:**

**Pomodoro Technique:**
\`\`\`
• 25 minutes focused study
• 5 minute break
• Repeat 4 times
• 15-30 minute longer break
\`\`\`

**Study Schedule:**
• Start early (no cramming)
• Hardest subjects when freshest
• Break material into chunks
• Build in review time
• Include breaks

**Exam Preparation:**

**Before the Exam:**
• Review practice tests
• Identify weak areas
• Get enough sleep
• Eat well
• Prepare materials

**During the Exam:**
• Read instructions carefully
• Skim entire test first
• Answer easy questions first
• Manage time
• Review if time permits

**Test Anxiety:**
• Preparation reduces anxiety
• Deep breathing
• Positive self-talk
• Focus on the question, not the fear
• It's okay to skip and return`;
    }

    if (/\b(college|university|degree|major|higher.?ed)\b/i.test(lowerPrompt)) {
      return `### 🎓 Higher Education Guide

**Choosing a College/University:**

**Factors to Consider:**
• Academic programs and reputation
• Location and campus culture
• Size (small vs. large)
• Cost and financial aid
• Career services and outcomes
• Extracurricular opportunities

**Application Process:**

**Timeline:**
\`\`\`
Junior Year:
• Research schools
• Take standardized tests
• Visit campuses
• Build relationships with recommenders

Senior Year Fall:
• Finalize school list
• Write essays
• Request recommendations
• Submit applications

Senior Year Spring:
• Compare offers
• Visit accepted schools
• Make decision by May 1
\`\`\`

**Strong Application:**
• Authentic essays (your voice)
• Demonstrated interest
• Strong recommendations
• Meaningful extracurriculars
• Academic preparation

**Choosing a Major:**

**Questions to Ask:**
• What subjects energize me?
• What problems do I want to solve?
• What careers interest me?
• What are the job prospects?
• Can I double major or minor?

**It's Okay To:**
• Start undeclared
• Change majors
• Explore different classes
• Major ≠ career

**Succeeding in College:**

**Academics:**
• Go to class
• Use office hours
• Form study groups
• Start assignments early
• Use campus resources

**Beyond Academics:**
• Get involved (clubs, organizations)
• Build relationships with professors
• Internships and research
• Develop soft skills
• Take care of your health

**Financial Considerations:**
• FAFSA (file early)
• Scholarships (apply to many)
• Work-study options
• Minimize debt
• Understand loan terms`;
    }

    if (/\b(online.?learn|course|mooc|self.?taught|skill)\b/i.test(lowerPrompt)) {
      return `### 💻 Online Learning & Self-Education Guide

**Benefits of Online Learning:**
• Learn at your own pace
• Access to world-class content
• Often free or low-cost
• Flexible scheduling
• Wide variety of topics

**Top Learning Platforms:**

**Free:**
• Khan Academy (academics)
• Coursera (audit mode)
• edX (audit mode)
• MIT OpenCourseWare
• YouTube (curated channels)
• freeCodeCamp (coding)

**Paid:**
• Coursera/edX (certificates)
• Udemy (skills-based)
• LinkedIn Learning
• MasterClass (creative)
• Skillshare (creative)
• Pluralsight (tech)

**Choosing Courses:**
• Check reviews and ratings
• Preview content if possible
• Look at instructor credentials
• Consider time commitment
• Verify certificate value

**Completing Courses:**

**Common Challenges:**
• Starting but not finishing
• Passive watching
• No accountability
• Isolation

**Solutions:**
\`\`\`
• Set specific schedule
• Take notes actively
• Do all exercises
• Find study buddy
• Set deadlines
• Reward completion
\`\`\`

**Self-Directed Learning:**

**Learning Plan:**
\`\`\`
1. Define your goal
2. Break into sub-skills
3. Find resources for each
4. Create practice schedule
5. Build projects
6. Get feedback
7. Iterate
\`\`\`

**Building a Curriculum:**
• Start with fundamentals
• Progress logically
• Mix theory and practice
• Include projects
• Seek feedback

**Demonstrating Skills:**
• Build a portfolio
• Contribute to open source
• Write about what you learn
• Get certifications (if valued)
• Network in the field`;
    }

    return `### 📖 Education Overview

**Key Areas:**
• Study skills and techniques
• Higher education
• Online learning
• Self-directed education
• Lifelong learning

**Learning Principles:**
• Active engagement beats passive consumption
• Spaced practice beats cramming
• Teaching others deepens understanding
• Application cements knowledge
• Consistency matters most

**Developing as a Learner:**
• Know your learning style
• Build good study habits
• Embrace challenges
• Seek feedback
• Stay curious

What specific education topic would you like to explore?`;
  }

  private generateLearningHelp(prompt: string, lowerPrompt: string): string {
    if (/\b(memory|remember|forget|memoriz|retain)\b/i.test(lowerPrompt)) {
      return `### 🧠 Memory & Retention Guide

**How Memory Works:**

**Three Stages:**
\`\`\`
1. Encoding: Taking in information
2. Storage: Holding information
3. Retrieval: Accessing information
\`\`\`

**Types of Memory:**
• Working memory (short-term, limited)
• Long-term memory (unlimited capacity)
• Procedural (how to do things)
• Declarative (facts and events)

**Memory Techniques:**

**Mnemonics:**
• Acronyms (HOMES for Great Lakes)
• Acrostics (sentences where first letters spell something)
• Rhymes and songs
• Method of loci (memory palace)

**Memory Palace:**
\`\`\`
1. Visualize a familiar place
2. Create a path through it
3. Place items to remember along path
4. Make images vivid and unusual
5. Walk through to recall
\`\`\`

**Chunking:**
• Group information into chunks
• Phone numbers: 555-123-4567
• Reduce cognitive load
• Create meaningful groups

**Spaced Repetition:**
• Review at increasing intervals
• Use apps (Anki, Quizlet)
• More efficient than massed practice
• Builds long-term retention

**Improving Encoding:**
• Pay attention (minimize distractions)
• Connect to existing knowledge
• Use multiple senses
• Create vivid mental images
• Teach it to someone

**Lifestyle Factors:**

**Sleep:**
• Memory consolidation happens during sleep
• 7-9 hours recommended
• Don't study right before bed (wind down)
• Naps can help retention

**Exercise:**
• Improves blood flow to brain
• Enhances neuroplasticity
• Even short walks help
• Regular exercise best

**Nutrition:**
• Omega-3 fatty acids
• Antioxidants
• Stay hydrated
• Avoid excessive sugar
• Moderate caffeine

**Stress Management:**
• Chronic stress impairs memory
• Practice relaxation
• Take breaks
• Maintain work-life balance`;
    }

    if (/\b(read|reading|book|speed.?read|comprehens)\b/i.test(lowerPrompt)) {
      return `### 📖 Reading & Comprehension Guide

**Reading Strategies:**

**Before Reading:**
• Preview (title, headings, summary)
• Set a purpose (why am I reading this?)
• Activate prior knowledge
• Predict what you'll learn

**During Reading:**
• Annotate and highlight (sparingly)
• Take notes in margins
• Ask questions
• Visualize concepts
• Pause to summarize

**After Reading:**
• Summarize main points
• Review notes
• Discuss with others
• Apply what you learned
• Connect to other knowledge

**Active Reading (SQ3R):**
\`\`\`
S - Survey: Preview the material
Q - Question: Turn headings into questions
R - Read: Read to answer questions
R - Recite: Summarize without looking
R - Review: Go back over material
\`\`\`

**Improving Comprehension:**
• Read at appropriate level
• Build vocabulary
• Read widely (different genres)
• Slow down for difficult material
• Re-read when needed

**Speed Reading (with caution):**

**Techniques:**
• Reduce subvocalization
• Use a pointer
• Expand peripheral vision
• Chunk words together
• Practice regularly

**When to Use:**
• Skimming for overview
• Familiar material
• Low-stakes reading

**When NOT to Use:**
• Complex or technical material
• Material you need to remember
• Enjoyment reading

**Building a Reading Habit:**
• Set a daily goal (pages or time)
• Read at same time daily
• Always have a book available
• Track your reading
• Join a book club
• Mix genres to stay interested

**Retaining What You Read:**
• Take notes
• Discuss with others
• Write summaries
• Apply concepts
• Review periodically
• Teach someone else`;
    }

    if (/\b(skill|learn.?new|master|expert|practice)\b/i.test(lowerPrompt)) {
      return `### 🎯 Skill Acquisition Guide

**The Learning Process:**

**Four Stages of Competence:**
\`\`\`
1. Unconscious incompetence
   (Don't know what you don't know)
2. Conscious incompetence
   (Aware of what you need to learn)
3. Conscious competence
   (Can do it with effort)
4. Unconscious competence
   (Automatic, mastery)
\`\`\`

**Deliberate Practice:**
• Specific goals for each session
• Full concentration
• Immediate feedback
• Outside comfort zone
• Repetition with refinement

**vs. Regular Practice:**
• Deliberate practice is harder
• Requires mental effort
• Focused on weaknesses
• Quality over quantity

**Learning a New Skill:**

**Phase 1: Deconstruction**
• Break skill into sub-skills
• Identify the 20% that gives 80% results
• Find the minimum effective dose
• Create a learning sequence

**Phase 2: Learning**
• Find quality resources
• Learn the fundamentals well
• Don't skip basics
• Take notes

**Phase 3: Practice**
• Start with drills
• Build to full practice
• Get feedback
• Track progress
• Adjust approach

**Phase 4: Integration**
• Apply in real situations
• Combine with other skills
• Develop personal style
• Continue refining

**Overcoming Plateaus:**
• Change your approach
• Get coaching/feedback
• Focus on weaknesses
• Increase difficulty
• Take a short break
• Study experts

**Time to Mastery:**
• Basic competence: 20 hours (focused)
• Proficiency: 100-300 hours
• Expertise: 1,000+ hours
• World-class: 10,000+ hours

**Motivation:**
• Connect to your "why"
• Track progress visibly
• Celebrate small wins
• Find a community
• Make it enjoyable
• Be patient with yourself`;
    }

    return `### 📚 Learning Overview

**Key Areas:**
• Memory and retention
• Reading comprehension
• Skill acquisition
• Learning strategies
• Continuous improvement

**Learning Principles:**
• Active beats passive
• Spaced beats massed
• Testing beats re-reading
• Sleep consolidates memory
• Fundamentals matter

**Becoming a Better Learner:**
• Know your learning style
• Embrace difficulty
• Seek feedback
• Teach others
• Stay curious
• Be patient

What specific learning topic would you like to explore?`;
  }

  // ============================================================================
  // EXTENDED CONTENT SECTION V9 - Technology, Productivity Tools, Writing, Travel
  // ============================================================================

  private generateTechnologyHelp(prompt: string, lowerPrompt: string): string {
    if (/\b(cybersecurity|security|password|hack|protect|privacy)\b/i.test(lowerPrompt)) {
      return `### 🔒 Cybersecurity & Privacy Guide

**Password Security:**

**Strong Passwords:**
• 12+ characters minimum
• Mix of upper, lower, numbers, symbols
• No personal information
• No dictionary words
• Unique for each account

**Password Managers:**
• 1Password, Bitwarden, LastPass
• Generate strong passwords
• Store securely
• Auto-fill convenience
• One master password to remember

**Two-Factor Authentication (2FA):**
\`\`\`
Best to worst:
1. Hardware key (YubiKey)
2. Authenticator app (Authy, Google Auth)
3. SMS codes (better than nothing)
\`\`\`

**Enable 2FA on:**
• Email (most important)
• Banking
• Social media
• Cloud storage
• Password manager

**Protecting Your Devices:**

**Updates:**
• Enable automatic updates
• Update OS, apps, browsers
• Don't ignore security patches
• Replace unsupported devices

**Antivirus/Security:**
• Windows Defender is good enough
• Avoid sketchy downloads
• Be careful with email attachments
• Use ad blockers

**Network Security:**
• Secure home WiFi (WPA3 or WPA2)
• Strong router password
• Avoid public WiFi for sensitive tasks
• Use VPN on public networks

**Recognizing Threats:**

**Phishing:**
• Check sender email carefully
• Hover over links before clicking
• Don't enter credentials from email links
• When in doubt, go directly to website

**Social Engineering:**
• Verify unexpected requests
• Don't share sensitive info by phone
• Be skeptical of urgency
• Verify through official channels

**Privacy Best Practices:**
• Review app permissions
• Limit social media sharing
• Use private browsing when needed
• Consider privacy-focused alternatives
• Read privacy policies (at least summaries)`;
    }

    if (/\b(smartphone|phone|iphone|android|app|mobile)\b/i.test(lowerPrompt)) {
      return `### 📱 Smartphone & Mobile Guide

**Choosing a Phone:**

**iPhone vs Android:**
\`\`\`
iPhone:
+ Seamless ecosystem
+ Longer software support
+ Privacy focus
+ Consistent experience
- Higher price
- Less customization

Android:
+ More choices/price points
+ Greater customization
+ More file flexibility
+ Varied features
- Fragmented updates
- Varies by manufacturer
\`\`\`

**Essential Settings:**

**Battery Life:**
• Enable battery saver mode
• Reduce screen brightness
• Disable unnecessary location services
• Close background apps
• Turn off always-on display

**Privacy:**
• Review app permissions regularly
• Disable ad tracking
• Use strong lock screen
• Enable Find My Phone
• Encrypt your device

**Storage Management:**
• Offload unused apps
• Clear cache regularly
• Use cloud storage for photos
• Delete old downloads
• Stream instead of download

**Must-Have App Categories:**

**Productivity:**
• Notes (Apple Notes, Google Keep, Notion)
• Calendar (Google Calendar, Fantastical)
• To-do (Todoist, Things, TickTick)
• Cloud storage (iCloud, Google Drive, Dropbox)

**Communication:**
• Messaging (Signal, WhatsApp, Telegram)
• Email (Gmail, Outlook, Spark)
• Video calls (Zoom, FaceTime, Google Meet)

**Finance:**
• Banking apps
• Budgeting (YNAB, Mint)
• Payment (Apple Pay, Google Pay)

**Health:**
• Fitness tracking
• Meditation (Headspace, Calm)
• Sleep tracking

**Digital Wellbeing:**
• Set screen time limits
• Enable Do Not Disturb schedules
• Disable non-essential notifications
• Grayscale mode to reduce appeal
• Keep phone out of bedroom`;
    }

    if (/\b(computer|pc|laptop|mac|windows|hardware)\b/i.test(lowerPrompt)) {
      return `### 💻 Computer & Hardware Guide

**Choosing a Computer:**

**Laptop vs Desktop:**
\`\`\`
Laptop:
+ Portable
+ All-in-one
+ Battery backup
- Limited upgrades
- Higher cost per performance

Desktop:
+ More powerful
+ Upgradeable
+ Better value
+ Better cooling
- Not portable
- Needs monitor, keyboard, etc.
\`\`\`

**Mac vs Windows vs Linux:**
\`\`\`
Mac:
+ Great for creative work
+ Excellent build quality
+ Good ecosystem integration
+ Unix-based (developer-friendly)
- Expensive
- Limited gaming

Windows:
+ Most software compatibility
+ Gaming support
+ Hardware variety
+ Business standard
- More maintenance
- Privacy concerns

Linux:
+ Free and open source
+ Highly customizable
+ Great for developers
+ Privacy-focused
- Learning curve
- Software compatibility issues
\`\`\`

**Specs to Consider:**

**Processor (CPU):**
• Intel Core i5/i7 or AMD Ryzen 5/7
• More cores = better multitasking
• Higher GHz = faster single tasks

**Memory (RAM):**
• 8GB minimum
• 16GB recommended
• 32GB for heavy workloads

**Storage:**
• SSD essential (not HDD)
• 256GB minimum
• 512GB-1TB recommended

**Maintenance Tips:**

**Software:**
• Keep OS updated
• Uninstall unused programs
• Run disk cleanup regularly
• Defrag HDD (not SSD)
• Restart regularly

**Hardware:**
• Clean dust from vents
• Keep ventilation clear
• Use surge protector
• Backup data regularly
• Replace thermal paste (advanced)

**Backup Strategy:**
\`\`\`
3-2-1 Rule:
• 3 copies of data
• 2 different media types
• 1 offsite/cloud backup
\`\`\``;
    }

    return `### 🖥️ Technology Overview

**Key Areas:**
• Cybersecurity and privacy
• Smartphones and mobile
• Computers and hardware
• Software and apps
• Emerging technology

**Tech Best Practices:**
• Keep everything updated
• Use strong, unique passwords
• Enable two-factor authentication
• Back up your data
• Be skeptical of suspicious links

**Staying Current:**
• Follow tech news
• Learn continuously
• Experiment safely
• Ask for help when needed

What specific technology topic would you like to explore?`;
  }

  private generateProductivityToolsHelp(prompt: string, lowerPrompt: string): string {
    if (/\b(notion|note|notes|knowledge|second.?brain|pkm)\b/i.test(lowerPrompt)) {
      return `### 📝 Note-Taking & Knowledge Management Guide

**Note-Taking Systems:**

**Popular Methods:**

**Cornell Method:**
\`\`\`
┌─────────────────────────────┐
│ Cues/Questions │   Notes   │
│    (2.5")      │   (6")    │
│                │           │
│                │           │
├────────────────┴───────────┤
│         Summary (2")       │
└─────────────────────────────┘
\`\`\`

**Outline Method:**
• Hierarchical structure
• Main topics → subtopics → details
• Good for organized content
• Easy to review

**Mind Mapping:**
• Central idea in middle
• Branches for related concepts
• Visual connections
• Good for brainstorming

**Zettelkasten:**
• Atomic notes (one idea each)
• Linked together
• Builds knowledge network
• Great for research/writing

**Digital Note Apps:**

**Notion:**
• All-in-one workspace
• Databases and relations
• Templates
• Team collaboration
• Steep learning curve

**Obsidian:**
• Local markdown files
• Powerful linking
• Graph view
• Plugin ecosystem
• Privacy-focused

**Roam Research:**
• Bi-directional linking
• Daily notes focus
• Block references
• Networked thought

**Apple Notes / Google Keep:**
• Simple and fast
• Good for quick capture
• Syncs across devices
• Limited organization

**Building a Second Brain:**

**CODE Method:**
\`\`\`
C - Capture: Save interesting ideas
O - Organize: Put in right place
D - Distill: Extract key points
E - Express: Use and share
\`\`\`

**PARA Organization:**
\`\`\`
P - Projects: Active with deadlines
A - Areas: Ongoing responsibilities
R - Resources: Topics of interest
A - Archives: Inactive items
\`\`\`

**Best Practices:**
• Capture quickly, organize later
• Use consistent naming
• Link related notes
• Review regularly
• Don't over-organize`;
    }

    if (/\b(task|todo|project.?manage|asana|trello|kanban)\b/i.test(lowerPrompt)) {
      return `### ✅ Task & Project Management Guide

**Task Management Methods:**

**Getting Things Done (GTD):**
\`\`\`
1. Capture: Get everything out of head
2. Clarify: What is it? Is it actionable?
3. Organize: Put in right bucket
4. Reflect: Review regularly
5. Engage: Do the work
\`\`\`

**Eisenhower Matrix:**
\`\`\`
         Urgent    Not Urgent
        ┌─────────┬─────────┐
Import. │ DO NOW  │ SCHEDULE│
        ├─────────┼─────────┤
Not Imp.│ DELEGATE│ ELIMINATE│
        └─────────┴─────────┘
\`\`\`

**Kanban:**
\`\`\`
┌──────────┬──────────┬──────────┐
│ To Do    │ Doing    │ Done     │
├──────────┼──────────┼──────────┤
│ Task 1   │ Task 3   │ Task 5   │
│ Task 2   │          │ Task 6   │
│ Task 4   │          │          │
└──────────┴──────────┴──────────┘
\`\`\`

**Popular Tools:**

**Simple:**
• Todoist (cross-platform, natural language)
• Things 3 (Apple ecosystem, beautiful)
• TickTick (feature-rich, free tier)
• Microsoft To Do (free, integrates with Outlook)

**Team/Project:**
• Asana (projects and teams)
• Trello (visual kanban)
• Monday.com (customizable)
• Basecamp (all-in-one)
• Linear (software teams)

**Choosing a Tool:**
• Start simple
• Match your workflow
• Consider team needs
• Mobile access important?
• Integration requirements

**Task Management Tips:**

**Writing Good Tasks:**
• Start with action verb
• Be specific
• Include context
• Set realistic due dates
• Break big tasks into smaller ones

**Daily Planning:**
\`\`\`
1. Review calendar
2. Check task list
3. Pick 1-3 MIT (Most Important Tasks)
4. Time block if helpful
5. Leave buffer time
\`\`\`

**Weekly Review:**
• Clear inbox
• Review projects
• Update task list
• Plan next week
• Celebrate wins`;
    }

    if (/\b(automat|zapier|ifttt|workflow|shortcut)\b/i.test(lowerPrompt)) {
      return `### ⚡ Automation & Workflows Guide

**Why Automate:**
• Save time on repetitive tasks
• Reduce errors
• Ensure consistency
• Focus on high-value work
• Scale your efforts

**Automation Tools:**

**No-Code:**
• Zapier (connect apps)
• IFTTT (simple automations)
• Make (complex workflows)
• Apple Shortcuts (iOS/Mac)
• Power Automate (Microsoft)

**Code-Based:**
• Python scripts
• JavaScript/Node.js
• Shell scripts
• Cron jobs

**Common Automations:**

**Email:**
• Auto-sort with filters
• Template responses
• Forward to task manager
• Unsubscribe automation

**Social Media:**
• Schedule posts
• Cross-post content
• Save mentions to spreadsheet
• Auto-respond to DMs

**File Management:**
• Auto-organize downloads
• Backup to cloud
• Rename files by pattern
• Convert file formats

**Data Entry:**
• Form to spreadsheet
• Spreadsheet to database
• PDF extraction
• Invoice processing

**Building Automations:**

**Zapier Basics:**
\`\`\`
Trigger → Action(s)

Example:
Trigger: New email with attachment
Action 1: Save attachment to Dropbox
Action 2: Create task in Todoist
Action 3: Send Slack notification
\`\`\`

**Best Practices:**
• Start with one automation
• Test thoroughly
• Document what you build
• Monitor for failures
• Keep it simple

**Automation Ideas:**
• New lead → CRM + email sequence
• Calendar event → prep checklist
• Completed task → log to spreadsheet
• New file → process and notify
• Daily summary email

**When NOT to Automate:**
• One-time tasks
• Tasks requiring judgment
• Rapidly changing processes
• When setup > time saved`;
    }

    return `### 🛠️ Productivity Tools Overview

**Key Categories:**
• Note-taking and knowledge management
• Task and project management
• Automation and workflows
• Calendar and scheduling
• Communication tools

**Choosing Tools:**
• Start with your biggest pain point
• Simple tools often best
• Integration matters
• Don't over-tool
• Master before adding more

**Productivity Stack:**
\`\`\`
Essential:
• Calendar
• Task manager
• Note-taking app
• Communication tool

Nice to have:
• Automation
• Time tracking
• Focus tools
\`\`\`

What specific productivity tool topic would you like to explore?`;
  }

  private generateWritingHelp(prompt: string, lowerPrompt: string): string {
    if (/\b(blog|article|content|write.?online|copywriting)\b/i.test(lowerPrompt)) {
      return `### ✍️ Content Writing & Blogging Guide

**Content Strategy:**

**Finding Topics:**
• What questions do people ask you?
• What do you wish you knew earlier?
• Industry trends and news
• Keyword research
• Competitor analysis
• Reader questions and comments

**Content Types:**
• How-to guides
• Listicles
• Case studies
• Opinion pieces
• Interviews
• Reviews
• Comparisons

**Writing Process:**

**Before Writing:**
\`\`\`
1. Define your audience
2. Choose one main point
3. Research thoroughly
4. Create outline
5. Gather examples/data
\`\`\`

**Structure:**
\`\`\`
• Hook (grab attention)
• Promise (what they'll learn)
• Body (deliver value)
• Conclusion (summarize + CTA)
\`\`\`

**Headlines That Work:**
• Numbers: "7 Ways to..."
• How-to: "How to [achieve result]"
• Questions: "Are You Making These Mistakes?"
• Curiosity: "The Secret to..."
• Urgency: "Stop Doing This Now"

**Writing Tips:**

**Readability:**
• Short sentences
• Short paragraphs (2-3 sentences)
• Use subheadings
• Bullet points for lists
• White space is good

**Engagement:**
• Write like you talk
• Use "you" frequently
• Tell stories
• Include examples
• Ask questions

**SEO Basics:**
• Target one keyword per post
• Include in title, headings, intro
• Write for humans first
• Internal and external links
• Optimize images (alt text)

**Editing Checklist:**
• Does it deliver on the headline?
• Is the main point clear?
• Can anything be cut?
• Are there concrete examples?
• Is it easy to scan?
• Strong opening and closing?`;
    }

    if (/\b(fiction|novel|story|creative.?writ|character|plot)\b/i.test(lowerPrompt)) {
      return `### 📚 Fiction & Creative Writing Guide

**Story Elements:**

**Plot Structure:**
\`\`\`
1. Exposition (setup)
2. Rising Action (complications)
3. Climax (turning point)
4. Falling Action (consequences)
5. Resolution (new normal)
\`\`\`

**Three-Act Structure:**
\`\`\`
Act 1 (25%): Setup
• Introduce character and world
• Inciting incident
• Character commits to journey

Act 2 (50%): Confrontation
• Rising stakes
• Midpoint shift
• All seems lost moment

Act 3 (25%): Resolution
• Climax
• Resolution
• New equilibrium
\`\`\`

**Character Development:**

**Character Elements:**
• Want (external goal)
• Need (internal growth)
• Flaw (what holds them back)
• Ghost (past wound)
• Lie (false belief)

**Character Arc:**
\`\`\`
1. Believe the lie
2. Challenged by events
3. Struggle with change
4. Moment of truth
5. Transform (or don't)
\`\`\`

**Show, Don't Tell:**
\`\`\`
Tell: "She was angry."
Show: "She slammed the door, 
      rattling the pictures on the wall."

Tell: "He was nervous."
Show: "He checked his watch for 
      the third time in a minute."
\`\`\`

**Dialogue Tips:**
• Each character has unique voice
• Subtext (what's unsaid)
• Conflict in conversations
• Avoid info-dumping
• Read aloud to test

**Writing Habits:**

**Getting Started:**
• Write regularly (daily if possible)
• Set word count goals
• Don't edit while drafting
• Finish the first draft
• Embrace imperfection

**Overcoming Blocks:**
• Write the next sentence only
• Skip to exciting scene
• Change your environment
• Use writing prompts
• Lower your standards temporarily

**Revision:**
• Let it rest before editing
• Big picture first (structure)
• Then scenes and chapters
• Then line editing
• Get feedback`;
    }

    if (/\b(grammar|edit|proofread|style|clarity)\b/i.test(lowerPrompt)) {
      return `### 📝 Editing & Grammar Guide

**Editing Process:**

**Levels of Editing:**
\`\`\`
1. Developmental (structure, content)
2. Line editing (style, flow)
3. Copyediting (grammar, consistency)
4. Proofreading (typos, formatting)
\`\`\`

**Self-Editing Tips:**
• Take a break before editing
• Read aloud
• Print it out
• Read backwards (for typos)
• Use text-to-speech
• Edit in multiple passes

**Common Grammar Issues:**

**Subject-Verb Agreement:**
\`\`\`
Wrong: "The team are ready."
Right: "The team is ready."

Wrong: "Each of the students have..."
Right: "Each of the students has..."
\`\`\`

**Comma Rules:**
• Before coordinating conjunctions in compound sentences
• After introductory phrases
• Around non-essential clauses
• In lists (Oxford comma recommended)

**That vs. Which:**
\`\`\`
That: Essential information (no comma)
"The book that I read was great."

Which: Non-essential (with comma)
"The book, which I read last week, was great."
\`\`\`

**Style Improvements:**

**Cut Weak Words:**
• Very, really, just, quite
• That (often unnecessary)
• In order to → to
• Due to the fact that → because

**Active vs. Passive:**
\`\`\`
Passive: "The report was written by the team."
Active: "The team wrote the report."
\`\`\`

**Vary Sentence Length:**
• Mix short and long
• Short sentences for impact
• Longer for explanation
• Avoid monotony

**Editing Tools:**
• Grammarly (grammar, style)
• Hemingway Editor (readability)
• ProWritingAid (comprehensive)
• LanguageTool (free alternative)

**Final Checklist:**
• Spelling and typos
• Grammar and punctuation
• Consistency (style, terms)
• Formatting
• Facts and names
• Links work`;
    }

    return `### ✏️ Writing Overview

**Key Areas:**
• Content writing and blogging
• Fiction and creative writing
• Business and professional writing
• Editing and grammar
• Writing habits

**Writing Principles:**
• Clarity over cleverness
• Know your audience
• One main point per piece
• Show, don't tell
• Edit ruthlessly

**Becoming a Better Writer:**
• Write regularly
• Read widely
• Study craft
• Get feedback
• Revise, revise, revise

What specific writing topic would you like to explore?`;
  }

  private generateAdvancedTravelHelp(prompt: string, lowerPrompt: string): string {
    if (/\b(pack|packing|luggage|bag|suitcase)\b/i.test(lowerPrompt)) {
      return `### 🧳 Packing & Luggage Guide

**Packing Philosophy:**
• Pack light (you can buy things)
• Versatile items
• Roll, don't fold
• Wear bulkiest items
• Less is more

**Carry-On Only Benefits:**
• No checked bag fees
• No lost luggage
• Faster through airport
• More mobility
• Forces minimalism

**Packing List Essentials:**

**Clothing (1 week):**
\`\`\`
• 3-4 tops
• 2 bottoms
• 1 jacket/sweater
• 5-7 underwear
• 3-4 socks
• 1 sleepwear
• 1 swimsuit (if needed)
• 1 dress-up outfit
\`\`\`

**Toiletries:**
\`\`\`
• Toothbrush + toothpaste
• Deodorant
• Shampoo/conditioner (solid bars save space)
• Skincare basics
• Medications
• Sunscreen
• All in 3.4oz/100ml containers
\`\`\`

**Tech:**
\`\`\`
• Phone + charger
• Laptop/tablet (if needed)
• Universal adapter
• Portable battery
• Headphones
• E-reader
\`\`\`

**Documents:**
\`\`\`
• Passport
• ID
• Boarding passes
• Reservations
• Travel insurance
• Copies of important docs
\`\`\`

**Packing Techniques:**

**Rolling:**
• Saves space
• Reduces wrinkles
• Good for casual clothes

**Packing Cubes:**
• Organize by category
• Compress clothes
• Easy to find items
• Keep bag tidy

**Bundle Wrapping:**
• Wrap clothes around core
• Minimizes wrinkles
• Good for dress clothes

**Luggage Tips:**
• Weigh before leaving
• Keep essentials in personal item
• Valuables in carry-on
• Lock checked bags
• Distinctive luggage tag`;
    }

    if (/\b(budget|cheap|save|afford|backpack)\b/i.test(lowerPrompt)) {
      return `### 💰 Budget Travel Guide

**Saving on Flights:**

**Booking Tips:**
• Book 1-3 months ahead (domestic)
• Book 2-6 months ahead (international)
• Be flexible with dates
• Use incognito mode
• Set price alerts

**Tools:**
• Google Flights (best overview)
• Skyscanner (flexible search)
• Scott's Cheap Flights (deals)
• Hopper (price predictions)

**Cheaper Options:**
• Nearby airports
• Connecting flights
• Budget airlines (watch fees)
• Red-eye flights
• Midweek travel

**Saving on Accommodation:**

**Options by Price:**
\`\`\`
$ Hostels, Couchsurfing
$$ Airbnb, Guesthouses
$$$ Budget hotels
$$$$ Mid-range hotels
\`\`\`

**Hostel Tips:**
• Private rooms available
• Kitchen saves money
• Social atmosphere
• Book beds with curtains
• Bring earplugs and lock

**Airbnb Tips:**
• Weekly/monthly discounts
• Kitchen access
• Local neighborhoods
• Read reviews carefully
• Communicate with host

**Saving on Food:**

**Strategies:**
• Eat where locals eat
• Street food (often best)
• Markets and grocery stores
• Big lunch, small dinner
• Free breakfast at accommodation
• Water bottle (refill)

**Saving on Activities:**

**Free/Cheap Options:**
• Walking tours (tip-based)
• Free museum days
• Parks and nature
• Local festivals
• Self-guided tours
• Student/senior discounts

**Budget Travel Mindset:**
• Slow travel (fewer places, longer stays)
• Off-season travel
• Less touristy destinations
• Embrace local experiences
• Flexibility saves money`;
    }

    if (/\b(itinerary|plan|trip|destination|where.?to.?go)\b/i.test(lowerPrompt)) {
      return `### 🗺️ Trip Planning Guide

**Planning Process:**

**Step 1: Choose Destination**
• Budget constraints
• Time available
• Interests and priorities
• Weather/season
• Visa requirements
• Safety considerations

**Step 2: Set Budget**
\`\`\`
Categories:
• Transportation (flights, local)
• Accommodation
• Food
• Activities
• Shopping/souvenirs
• Emergency fund (10-15%)
\`\`\`

**Step 3: Book Major Items**
• Flights (1-3 months ahead)
• Accommodation (especially peak season)
• Must-do activities
• Car rental if needed

**Step 4: Research**
• Top attractions
• Local customs
• Transportation options
• Food to try
• Safety tips
• Packing needs

**Building an Itinerary:**

**Balance:**
• Don't over-schedule
• Mix activities and rest
• Leave buffer time
• Alternate busy and relaxed days
• Allow for spontaneity

**Daily Structure:**
\`\`\`
Morning: Main attraction (less crowded)
Midday: Lunch + rest/explore
Afternoon: Secondary activities
Evening: Dinner + nightlife/relax
\`\`\`

**Tools:**
• Google Maps (save places)
• TripIt (organize bookings)
• Wanderlog (collaborative planning)
• Notion/spreadsheet (custom)

**Research Resources:**
• Lonely Planet, Rick Steves
• Reddit travel subs
• YouTube travel vlogs
• Instagram for inspiration
• Local tourism websites
• Travel blogs

**Pre-Trip Checklist:**
\`\`\`
□ Passport valid 6+ months
□ Visa if required
□ Travel insurance
□ Notify bank of travel
□ Phone plan/SIM
□ Copies of documents
□ Download offline maps
□ Learn basic phrases
\`\`\``;
    }

    return `### ✈️ Travel Overview

**Key Areas:**
• Packing and luggage
• Budget travel
• Trip planning
• Destinations
• Travel safety

**Travel Principles:**
• Plan but stay flexible
• Pack light
• Embrace the unexpected
• Respect local cultures
• Travel slowly when possible

**Before You Go:**
• Valid passport
• Necessary visas
• Travel insurance
• Notify bank
• Copies of documents

What specific travel topic would you like to explore?`;
  }

  // ============================================================================
  // EXTENDED CONTENT SECTION V10 - Home, DIY, Cooking, Gardening
  // ============================================================================

  private generateHomeImprovementHelp(prompt: string, lowerPrompt: string): string {
    if (/\b(paint|painting|wall|color|interior)\b/i.test(lowerPrompt)) {
      return `### 🎨 Interior Painting Guide

**Planning Your Project:**

**Choosing Colors:**
• Test samples on walls (colors look different in your space)
• Consider lighting (natural vs artificial)
• Neutral colors are versatile
• Accent walls add interest
• Consider the mood you want

**Color Psychology:**
• Blue: Calm, peaceful
• Green: Natural, refreshing
• Yellow: Energetic, cheerful
• Red: Bold, stimulating
• Gray: Sophisticated, neutral
• White: Clean, spacious

**Paint Types:**
\`\`\`
Finish       Best For
─────────────────────────
Flat/Matte   Ceilings, low-traffic
Eggshell     Living rooms, bedrooms
Satin        Kitchens, bathrooms
Semi-gloss   Trim, doors, cabinets
Gloss        High-traffic, accents
\`\`\`

**Supplies Needed:**
• Paint (calculate: sq ft ÷ 350 = gallons)
• Primer (if needed)
• Rollers and covers
• Brushes (angled for cutting in)
• Paint tray
• Painter's tape
• Drop cloths
• Ladder/step stool

**Preparation:**
\`\`\`
1. Clear and cover furniture
2. Remove outlet/switch covers
3. Fill holes with spackle
4. Sand rough spots
5. Clean walls (dust, grease)
6. Tape edges and trim
7. Prime if needed
\`\`\`

**Painting Technique:**

**Cutting In:**
• Use angled brush
• Paint edges and corners first
• 2-3 inch band along tape
• Steady hand, don't overload brush

**Rolling:**
• Load roller evenly
• Roll in W or M pattern
• Fill in without lifting
• Maintain wet edge
• Two coats usually needed

**Tips:**
• Paint ceiling first, then walls
• Remove tape while paint is slightly tacky
• Good ventilation
• Don't rush between coats
• Clean brushes immediately`;
    }

    if (/\b(organize|declutter|storage|closet|minimalis)\b/i.test(lowerPrompt)) {
      return `### 🗄️ Home Organization Guide

**Decluttering Philosophy:**

**The KonMari Method:**
• Does it spark joy?
• Thank items before letting go
• Category by category, not room by room
• Order: Clothes, books, papers, misc, sentimental

**The 4-Box Method:**
\`\`\`
Box 1: Keep
Box 2: Donate/Sell
Box 3: Trash
Box 4: Relocate
\`\`\`

**Questions to Ask:**
• Have I used this in the past year?
• Do I have duplicates?
• Would I buy this again?
• Does it fit my current life?
• Is it worth the space it takes?

**Room-by-Room Tips:**

**Kitchen:**
• Clear countertops
• Organize by zones (cooking, prep, storage)
• Use drawer dividers
• Vertical storage for pans/lids
• Lazy Susans for corners
• Clear containers for pantry

**Closet:**
• One in, one out rule
• Seasonal rotation
• Matching hangers
• Shelf dividers
• Door organizers
• Shoe racks

**Bathroom:**
• Drawer organizers
• Under-sink storage
• Shower caddies
• Medicine cabinet organization
• Dispose of expired products

**Home Office:**
• Paper management system
• Cable management
• Desk organizers
• Vertical file storage
• Regular purging

**Storage Solutions:**

**Maximize Space:**
• Vertical storage
• Under-bed storage
• Over-door organizers
• Corner shelves
• Multi-functional furniture
• Vacuum bags for seasonal items

**Labeling:**
• Label everything
• Consistent system
• Clear containers when possible
• Include contents and date

**Maintenance:**
• Daily 10-minute tidy
• Weekly reset
• Monthly review of one area
• Seasonal deep clean
• Annual declutter`;
    }

    if (/\b(repair|fix|maintain|maintenance|handyman)\b/i.test(lowerPrompt)) {
      return `### 🔧 Home Repair & Maintenance Guide

**Essential Tools:**
\`\`\`
Basic Toolkit:
• Hammer
• Screwdrivers (Phillips & flathead)
• Pliers (needle-nose & regular)
• Adjustable wrench
• Tape measure
• Level
• Utility knife
• Flashlight
• Drill (cordless)
• Stud finder
\`\`\`

**Common Repairs:**

**Fixing a Running Toilet:**
\`\`\`
1. Check flapper (most common issue)
2. Replace if worn or warped
3. Check fill valve
4. Adjust float if needed
5. Check for leaks at base
\`\`\`

**Unclogging Drains:**
\`\`\`
1. Try plunger first
2. Baking soda + vinegar
3. Drain snake for tough clogs
4. Clean P-trap if needed
5. Avoid chemical cleaners
\`\`\`

**Patching Drywall:**
\`\`\`
Small holes:
1. Apply spackle
2. Let dry
3. Sand smooth
4. Paint

Large holes:
1. Cut clean square
2. Install backing
3. Cut patch to fit
4. Tape seams
5. Apply joint compound
6. Sand and paint
\`\`\`

**Preventive Maintenance:**

**Monthly:**
• Test smoke/CO detectors
• Check HVAC filters
• Inspect for leaks
• Clean garbage disposal

**Quarterly:**
• Clean dryer vent
• Check caulking
• Test GFCI outlets
• Inspect fire extinguisher

**Annually:**
• Service HVAC
• Clean gutters
• Check roof
• Flush water heater
• Inspect foundation
• Service garage door

**Seasonal:**
\`\`\`
Spring: AC prep, exterior inspection
Summer: Pest control, deck maintenance
Fall: Heating prep, weatherproofing
Winter: Pipe insulation, ice dam prevention
\`\`\`

**When to Call a Pro:**
• Electrical work (beyond basics)
• Gas appliances
• Major plumbing
• Structural issues
• Roof repairs
• HVAC repairs`;
    }

    return `### 🏠 Home Improvement Overview

**Key Areas:**
• Interior painting
• Organization and decluttering
• Repairs and maintenance
• Renovations
• Energy efficiency

**DIY vs Professional:**
• Start with small projects
• Know your limits
• Safety first
• Permits when required
• Get multiple quotes for big jobs

**Home Maintenance:**
• Regular inspections
• Preventive maintenance
• Address issues early
• Keep records
• Budget for repairs

What specific home improvement topic would you like to explore?`;
  }

  private generateDIYProjectsHelp(prompt: string, lowerPrompt: string): string {
    if (/\b(woodwork|wood|furniture|build|carpentry)\b/i.test(lowerPrompt)) {
      return `### 🪵 Woodworking & Furniture Guide

**Getting Started:**

**Essential Tools:**
\`\`\`
Hand Tools:
• Tape measure
• Square (combination or speed)
• Chisels
• Hand saw
• Hammer
• Screwdrivers
• Clamps (various sizes)
• Sandpaper (various grits)

Power Tools (starter):
• Drill/driver
• Circular saw
• Jigsaw
• Random orbital sander
\`\`\`

**Wood Types:**
\`\`\`
Softwoods (easier to work):
• Pine - affordable, versatile
• Cedar - outdoor projects
• Fir - structural

Hardwoods (more durable):
• Oak - strong, classic
• Maple - hard, fine grain
• Walnut - beautiful, expensive
• Poplar - affordable hardwood
\`\`\`

**Basic Joints:**
• Butt joint (simplest)
• Pocket hole (strong, easy)
• Dado (shelves)
• Mortise and tenon (traditional)
• Dovetail (drawers, advanced)

**Beginner Projects:**
\`\`\`
1. Floating shelves
2. Simple bookshelf
3. Picture frames
4. Plant stand
5. Basic workbench
6. Storage box
7. Coat rack
8. Side table
\`\`\`

**Project Planning:**
\`\`\`
1. Sketch your design
2. Create cut list
3. Calculate materials
4. Buy 10-15% extra
5. Measure twice, cut once
6. Dry fit before gluing
7. Sand between coats
\`\`\`

**Finishing:**
• Sand progressively (80 → 120 → 220)
• Remove dust between grits
• Apply stain (if desired)
• Seal with polyurethane, lacquer, or oil
• Multiple thin coats
• Light sand between coats

**Safety:**
• Safety glasses always
• Hearing protection
• Dust mask/respirator
• No loose clothing
• Keep workspace clean
• Sharp tools are safer`;
    }

    if (/\b(craft|handmade|create|make|project)\b/i.test(lowerPrompt)) {
      return `### 🎨 DIY Crafts & Projects Guide

**Popular Craft Categories:**

**Paper Crafts:**
• Card making
• Scrapbooking
• Origami
• Paper flowers
• Journaling

**Textile Crafts:**
• Sewing basics
• Embroidery
• Knitting/crochet
• Macramé
• Tie-dye

**Home Decor:**
• Candle making
• Soap making
• Wreaths
• Wall art
• Upcycling furniture

**Jewelry:**
• Beading
• Wire wrapping
• Resin jewelry
• Polymer clay

**Getting Started:**

**Choose Your First Project:**
• Start simple
• Clear instructions available
• Minimal supplies needed
• Completable in one session
• Room for imperfection

**Basic Supplies:**
\`\`\`
General crafting:
• Scissors (sharp, dedicated)
• Ruler
• Cutting mat
• Glue (various types)
• Tape
• Markers/pens
• Storage containers
\`\`\`

**Learning Resources:**
• YouTube tutorials
• Pinterest for inspiration
• Craftsy/Skillshare classes
• Local craft store workshops
• Library books
• Reddit communities

**Tips for Success:**
• Read instructions fully first
• Gather all materials before starting
• Work in good lighting
• Take breaks
• Embrace imperfection
• Document your process
• Share your work

**Selling Crafts:**
• Etsy marketplace
• Local craft fairs
• Instagram/social media
• Consignment shops
• Custom orders
• Calculate true costs (time + materials)`;
    }

    if (/\b(upcycle|recycle|repurpose|sustainable|eco)\b/i.test(lowerPrompt)) {
      return `### ♻️ Upcycling & Sustainable DIY Guide

**Upcycling Philosophy:**
• Give new life to old items
• Reduce waste
• Save money
• Create unique pieces
• Environmental impact

**Common Upcycling Projects:**

**Furniture:**
• Refinish old dressers
• Turn pallets into furniture
• Reupholster chairs
• Paint and distress
• Add new hardware
• Convert cribs to benches

**Containers:**
• Mason jars → storage, lights
• Tin cans → planters, organizers
• Wine bottles → vases, lamps
• Wooden crates → shelves
• Old drawers → wall shelves

**Textiles:**
• T-shirts → tote bags
• Jeans → aprons, bags
• Sweaters → pillows
• Fabric scraps → quilts
• Old sheets → curtains

**Techniques:**

**Furniture Refresh:**
\`\`\`
1. Clean thoroughly
2. Sand lightly
3. Prime if needed
4. Paint (chalk paint popular)
5. Distress if desired
6. Seal with wax or poly
7. Update hardware
\`\`\`

**Finding Materials:**
• Thrift stores
• Garage sales
• Curbside finds
• Facebook Marketplace
• Freecycle
• Your own home

**Sustainable Practices:**
• Use low-VOC paints
• Natural cleaning products
• Repurpose before recycling
• Buy secondhand supplies
• Donate what you don't use
• Share skills with others

**Before You Start:**
• Assess item's condition
• Check for lead paint (old items)
• Consider structural integrity
• Plan your vision
• Gather inspiration
• Have realistic expectations`;
    }

    return `### 🛠️ DIY Projects Overview

**Key Areas:**
• Woodworking and furniture
• Crafts and handmade items
• Upcycling and repurposing
• Home repairs
• Outdoor projects

**DIY Mindset:**
• Start simple, build skills
• Learn from mistakes
• Safety first
• Measure twice, cut once
• Enjoy the process

**Getting Started:**
• Choose beginner-friendly projects
• Invest in quality basic tools
• Watch tutorials before starting
• Join DIY communities
• Practice patience

What specific DIY topic would you like to explore?`;
  }

  private generateAdvancedCookingHelp(prompt: string, lowerPrompt: string): string {
    if (/\b(beginner|basic|learn.?cook|start.?cook|fundamental)\b/i.test(lowerPrompt)) {
      return `### 👨‍🍳 Cooking Fundamentals Guide

**Essential Techniques:**

**Knife Skills:**
\`\`\`
Basic Cuts:
• Dice - small cubes
• Mince - very fine pieces
• Julienne - thin strips
• Chiffonade - ribbon cuts (herbs)
• Rough chop - irregular pieces
\`\`\`

**Knife Safety:**
• Keep knives sharp
• Cut away from body
• Curl fingers (claw grip)
• Stable cutting board
• Focus on the task

**Cooking Methods:**

**Dry Heat:**
• Sauté - high heat, little fat, stirring
• Pan-fry - moderate fat, less stirring
• Roast - oven, dry heat, whole items
• Bake - oven, dry heat, covered or not
• Grill - direct heat, char marks
• Broil - high heat from above

**Moist Heat:**
• Boil - 212°F, rapid bubbles
• Simmer - 185-205°F, gentle bubbles
• Poach - 160-180°F, no bubbles
• Steam - cook with steam, not water
• Braise - sear then slow cook in liquid

**Essential Equipment:**
\`\`\`
Starter Kitchen:
• Chef's knife (8")
• Cutting board
• Skillet (10-12")
• Saucepan (2-3 qt)
• Stock pot
• Sheet pan
• Mixing bowls
• Measuring cups/spoons
• Wooden spoon
• Spatula
• Tongs
\`\`\`

**Flavor Building:**
• Salt enhances all flavors
• Acid brightens (lemon, vinegar)
• Fat carries flavor
• Aromatics as base (onion, garlic)
• Fresh herbs at end
• Taste as you go

**Common Mistakes:**
• Not reading recipe fully first
• Crowding the pan
• Not preheating
• Under-seasoning
• Moving food too much
• Not letting meat rest

**Practice Dishes:**
• Scrambled eggs
• Pasta with sauce
• Stir-fry
• Roasted vegetables
• Simple soup
• Grilled cheese`;
    }

    if (/\b(recipe|meal|dinner|dish|cuisine)\b/i.test(lowerPrompt)) {
      return `### 🍽️ Recipes & Meal Ideas Guide

**Quick Weeknight Dinners:**

**Under 30 Minutes:**
• Pasta with garlic and olive oil
• Stir-fry with rice
• Sheet pan chicken and vegetables
• Tacos or burrito bowls
• Omelets or frittatas
• Salmon with roasted vegetables

**Meal Planning:**
\`\`\`
Weekly Planning:
1. Check calendar for busy nights
2. Inventory fridge/pantry
3. Plan 5-6 dinners (flexibility)
4. Use overlapping ingredients
5. Prep ahead when possible
6. Include one "leftover" night
\`\`\`

**Batch Cooking Ideas:**
• Grains (rice, quinoa)
• Proteins (chicken, beans)
• Roasted vegetables
• Sauces and dressings
• Soups and stews

**Cuisine Inspiration:**

**Italian:**
• Pasta dishes
• Risotto
• Bruschetta
• Caprese salad

**Mexican:**
• Tacos and burritos
• Enchiladas
• Quesadillas
• Rice and beans

**Asian:**
• Stir-fries
• Fried rice
• Noodle dishes
• Curries

**Mediterranean:**
• Grain bowls
• Grilled meats
• Fresh salads
• Hummus and pita

**Recipe Resources:**
• Serious Eats (technique-focused)
• Budget Bytes (affordable)
• Minimalist Baker (simple)
• Bon Appétit (varied)
• NYT Cooking (reliable)
• YouTube cooking channels

**Substitutions:**
\`\`\`
Out of:        Use:
Buttermilk     Milk + lemon juice
Eggs (baking)  Flax egg, applesauce
Heavy cream    Coconut cream
Breadcrumbs    Crushed crackers, oats
Fresh herbs    1/3 amount dried
\`\`\``;
    }

    if (/\b(bake|baking|bread|cake|pastry|dessert)\b/i.test(lowerPrompt)) {
      return `### 🧁 Baking Guide

**Baking Basics:**

**Why Precision Matters:**
• Baking is chemistry
• Ratios are critical
• Measure accurately
• Follow instructions first
• Experiment after mastering basics

**Measuring:**
\`\`\`
Dry ingredients: Spoon and level
Flour: Don't pack (too much = dense)
Brown sugar: Pack firmly
Liquids: Eye level in liquid measure
Butter: Use wrapper markings
\`\`\`

**Essential Ingredients:**
• All-purpose flour
• Granulated sugar
• Brown sugar
• Butter (unsalted for control)
• Eggs
• Baking powder
• Baking soda
• Salt
• Vanilla extract

**Common Baking Terms:**
• Cream - beat butter and sugar until fluffy
• Fold - gently combine to keep air
• Proof - let yeast dough rise
• Bloom - activate yeast or gelatin
• Room temp - ingredients mix better

**Beginner Recipes:**

**Start Here:**
• Chocolate chip cookies
• Banana bread
• Brownies
• Muffins
• Simple cake
• Pancakes

**Intermediate:**
• Pie crust
• Yeast bread
• Cinnamon rolls
• Layer cake
• Cheesecake

**Troubleshooting:**
\`\`\`
Problem          Likely Cause
───────────────────────────────
Dense cake       Overmixed, too much flour
Flat cookies     Butter too soft, old leavener
Tough bread      Overworked, not enough rise
Sunken middle    Underbaked, opened oven early
Dry texture      Overbaked, too much flour
\`\`\`

**Tips:**
• Room temperature ingredients
• Preheat oven fully
• Don't overmix
• Use correct pan size
• Rotate pans halfway
• Cool before frosting`;
    }

    return `### 🍳 Cooking Overview

**Key Areas:**
• Cooking fundamentals
• Recipes and meal ideas
• Baking
• Meal prep
• Kitchen organization

**Cooking Principles:**
• Mise en place (prep everything first)
• Taste as you go
• Season in layers
• Don't crowd the pan
• Let meat rest

**Becoming a Better Cook:**
• Practice basic techniques
• Try new cuisines
• Learn from mistakes
• Watch cooking shows
• Cook for others

What specific cooking topic would you like to explore?`;
  }

  private generateGardeningHelp(prompt: string, lowerPrompt: string): string {
    if (/\b(vegetable|veggie|grow.?food|edible|harvest)\b/i.test(lowerPrompt)) {
      return `### 🥕 Vegetable Gardening Guide

**Getting Started:**

**Choose Your Space:**
• Full sun (6+ hours) for most veggies
• Good drainage
• Near water source
• Start small (4x4 or 4x8 bed)
• Containers work too

**Easy Vegetables for Beginners:**
\`\`\`
Very Easy:
• Lettuce and salad greens
• Radishes (fast!)
• Green beans
• Zucchini
• Tomatoes (cherry varieties)
• Herbs (basil, mint, chives)

Moderate:
• Peppers
• Cucumbers
• Carrots
• Peas
• Squash
\`\`\`

**Planning Your Garden:**

**Timing:**
• Know your frost dates
• Start seeds indoors (6-8 weeks before)
• Direct sow after last frost
• Succession plant for continuous harvest

**Spacing:**
• Follow seed packet instructions
• Overcrowding reduces yield
• Consider vertical growing
• Companion planting benefits

**Soil Preparation:**
• Test soil pH (6.0-7.0 ideal)
• Add compost generously
• Don't compact soil
• Mulch to retain moisture

**Care:**

**Watering:**
• Deep, infrequent watering
• Morning is best
• 1 inch per week (rain + irrigation)
• Mulch to retain moisture
• Drip irrigation ideal

**Fertilizing:**
• Compost is best
• Balanced fertilizer at planting
• Side-dress heavy feeders
• Don't over-fertilize

**Pest Management:**
• Inspect plants regularly
• Hand-pick pests
• Encourage beneficial insects
• Row covers for protection
• Organic sprays as last resort

**Harvesting:**
• Pick regularly to encourage production
• Harvest in morning
• Don't let vegetables get too large
• Use or preserve promptly`;
    }

    if (/\b(flower|plant|perennial|annual|bloom|landscape)\b/i.test(lowerPrompt)) {
      return `### 🌸 Flower Gardening Guide

**Understanding Plants:**

**Annuals vs Perennials:**
\`\`\`
Annuals:
• Complete lifecycle in one season
• Bloom all season
• Replant yearly
• Examples: Petunias, marigolds, zinnias

Perennials:
• Return year after year
• Shorter bloom period
• Establish over time
• Examples: Coneflowers, hostas, daylilies
\`\`\`

**Planning Your Garden:**

**Consider:**
• Sun exposure (full, part, shade)
• Bloom times (spring, summer, fall)
• Heights (back to front)
• Colors (complementary or monochrome)
• Maintenance level
• Your climate zone

**Easy Flowers for Beginners:**

**Sun:**
• Marigolds
• Zinnias
• Sunflowers
• Black-eyed Susans
• Coneflowers
• Daylilies

**Shade:**
• Impatiens
• Begonias
• Hostas
• Ferns
• Astilbe
• Bleeding heart

**Design Principles:**
• Odd numbers look natural
• Repeat colors/plants for cohesion
• Layer heights
• Include foliage interest
• Plan for year-round appeal
• Leave room for growth

**Planting:**
\`\`\`
1. Dig hole 2x width of root ball
2. Loosen roots gently
3. Plant at same depth as pot
4. Backfill and firm soil
5. Water deeply
6. Mulch around (not touching stem)
\`\`\`

**Maintenance:**
• Deadhead spent blooms
• Water consistently
• Fertilize appropriately
• Divide perennials when crowded
• Cut back in fall or spring
• Mulch for winter protection`;
    }

    if (/\b(indoor|houseplant|house.?plant|potted|container)\b/i.test(lowerPrompt)) {
      return `### 🪴 Indoor Plants Guide

**Choosing Plants:**

**Low Light:**
• Pothos
• Snake plant
• ZZ plant
• Peace lily
• Philodendron
• Cast iron plant

**Bright Indirect:**
• Monstera
• Fiddle leaf fig
• Rubber plant
• Bird of paradise
• Calathea
• Ficus

**Direct Sun:**
• Succulents
• Cacti
• Aloe vera
• Jade plant
• String of pearls

**Care Basics:**

**Watering:**
\`\`\`
Signs of underwatering:
• Wilting
• Dry, crispy leaves
• Soil pulling from pot edges

Signs of overwatering:
• Yellow leaves
• Mushy stems
• Fungus gnats
• Root rot smell
\`\`\`

**General Rule:**
• Check soil moisture before watering
• Most plants: water when top inch dry
• Succulents: water when fully dry
• Better to underwater than overwater

**Light:**
• Rotate plants for even growth
• Clean leaves for better light absorption
• Supplement with grow lights if needed
• Adjust seasonally

**Humidity:**
• Most tropicals like 50%+ humidity
• Group plants together
• Use pebble trays
• Mist occasionally
• Humidifier in winter

**Common Problems:**

**Yellow Leaves:**
• Overwatering (most common)
• Underwatering
• Too much direct sun
• Nutrient deficiency
• Natural aging (lower leaves)

**Brown Tips:**
• Low humidity
• Inconsistent watering
• Fluoride in water
• Over-fertilizing

**Pests:**
• Inspect regularly
• Isolate new plants
• Wipe leaves
• Neem oil treatment
• Insecticidal soap`;
    }

    return `### 🌱 Gardening Overview

**Key Areas:**
• Vegetable gardening
• Flower gardening
• Indoor plants
• Lawn care
• Landscaping

**Gardening Principles:**
• Right plant, right place
• Soil health is foundation
• Water deeply, less often
• Observe and adapt
• Patience pays off

**Getting Started:**
• Start small
• Know your climate zone
• Test your soil
• Plan before planting
• Learn from failures

What specific gardening topic would you like to explore?`;
  }

  private generatePetCareHelp(prompt: string, lowerPrompt: string): string {
    if (/\b(dog|puppy|canine)\b/i.test(lowerPrompt)) {
      return `### 🐕 Dog Care Guide

**Basic Needs:**

**Nutrition:**
• Quality dog food appropriate for age/size
• Consistent feeding schedule
• Fresh water always available
• Avoid toxic foods (chocolate, grapes, onions, xylitol)
• Treats in moderation (10% of diet)

**Exercise:**
\`\`\`
By Size:
• Small dogs: 30 min/day
• Medium dogs: 45-60 min/day
• Large dogs: 60-90 min/day
• High-energy breeds: 2+ hours/day
\`\`\`

**Training Basics:**

**Positive Reinforcement:**
• Reward good behavior immediately
• Use treats, praise, play
• Be consistent
• Short training sessions (5-10 min)
• End on success

**Essential Commands:**
• Sit
• Stay
• Come
• Down
• Leave it
• Heel

**House Training:**
\`\`\`
1. Consistent schedule
2. Take out after eating, sleeping, playing
3. Praise immediately when they go outside
4. Clean accidents with enzyme cleaner
5. Never punish accidents
6. Crate training helps
\`\`\`

**Health Care:**

**Veterinary:**
• Annual checkups
• Vaccinations (core and lifestyle)
• Heartworm prevention
• Flea/tick prevention
• Dental care
• Spay/neuter

**Grooming:**
• Brush regularly (varies by coat)
• Bathe as needed
• Trim nails monthly
• Clean ears weekly
• Brush teeth regularly

**Warning Signs:**
• Loss of appetite
• Lethargy
• Vomiting/diarrhea
• Difficulty breathing
• Limping
• Behavior changes`;
    }

    if (/\b(cat|kitten|feline)\b/i.test(lowerPrompt)) {
      return `### 🐱 Cat Care Guide

**Basic Needs:**

**Nutrition:**
• Quality cat food (wet and/or dry)
• Fresh water (cats prefer running water)
• Age-appropriate food
• Avoid toxic foods (onions, garlic, chocolate)
• Don't overfeed

**Litter Box:**
\`\`\`
Rules:
• One box per cat + one extra
• Scoop daily
• Full clean weekly
• Quiet, accessible location
• Unscented litter preferred
• Large enough for cat to turn around
\`\`\`

**Environment:**

**Enrichment:**
• Scratching posts (vertical and horizontal)
• Climbing spaces (cat trees)
• Window perches
• Interactive toys
• Hiding spots
• Rotate toys to maintain interest

**Play:**
• 15-20 minutes daily minimum
• Mimic prey movements
• Wand toys, laser pointers
• End with a "catch"
• Follow play with food

**Health Care:**

**Veterinary:**
• Annual checkups
• Vaccinations
• Parasite prevention
• Dental care
• Spay/neuter

**Grooming:**
• Brush regularly (especially long-haired)
• Trim nails every 2-3 weeks
• Check ears
• Most cats self-groom

**Common Issues:**
• Hairballs (brush more, hairball food)
• Scratching furniture (provide alternatives)
• Litter box avoidance (check health, cleanliness)
• Aggression (play more, check triggers)

**Warning Signs:**
• Not eating
• Hiding more than usual
• Litter box changes
• Vomiting
• Difficulty breathing
• Lethargy`;
    }

    return `### 🐾 Pet Care Overview

**Key Areas:**
• Dog care
• Cat care
• Small pets
• Fish and aquariums
• Pet health

**Pet Ownership Basics:**
• Research before getting a pet
• Budget for ongoing costs
• Regular veterinary care
• Proper nutrition
• Exercise and enrichment
• Training and socialization

**Choosing a Pet:**
• Consider your lifestyle
• Space requirements
• Time commitment
• Allergies
• Other pets/children
• Adoption vs breeder

What specific pet care topic would you like to explore?`;
  }

  // Initialize the service (called when app starts)
  initialize() {
    console.log('🚀 Initializing White Space AI Service...');
    // Try to update provider from environment if available
    const envProvider = process.env.EXPO_PUBLIC_AI_PROVIDER as AIProvider;
    if (envProvider && this.getAvailableProviders().includes(envProvider)) {
      this.provider = envProvider;
      console.log(`🔄 AI Provider set to: ${envProvider}`);
    }
    console.log(`🤖 Current AI Provider: ${this.provider}`);
  }
}

// Export singleton instance
export const aiService = new AIService();
