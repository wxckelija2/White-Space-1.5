// Smart cleanup system for WhiteSpace Plus
// The signature feature that turns messy input into clean output

export interface CleanupOptions {
  type?: 'text' | 'code' | 'json' | 'auto';
  language?: string;
  preserveFormatting?: boolean;
  aggressive?: boolean;
}

export interface CleanupResult {
  original: string;
  cleaned: string;
  changes: string[];
  confidence: number; // 0-1, how confident we are in the cleanup
  type: string; // what type of content was detected
}

export class SmartCleanup {
  // Main cleanup function
  static async cleanup(input: string, options: CleanupOptions = {}): Promise<CleanupResult> {
    const { type = 'auto', language, preserveFormatting = false, aggressive = false } = options;

    let detectedType = type;
    let confidence = 0.8;

    // Auto-detect content type if not specified
    if (type === 'auto') {
      const detection = this.detectContentType(input);
      detectedType = detection.type;
      confidence = detection.confidence;
    }

    let cleaned = input;
    const changes: string[] = [];

    // Apply cleanup based on detected type
    switch (detectedType) {
      case 'code':
        const codeResult = this.cleanupCode(input, language, aggressive);
        cleaned = codeResult.cleaned;
        changes.push(...codeResult.changes);
        break;

      case 'json':
        const jsonResult = this.cleanupJSON(input, aggressive);
        cleaned = jsonResult.cleaned;
        changes.push(...jsonResult.changes);
        break;

      case 'text':
      default:
        const textResult = this.cleanupText(input, preserveFormatting, aggressive);
        cleaned = textResult.cleaned;
        changes.push(...textResult.changes);
        break;
    }

    return {
      original: input,
      cleaned,
      changes,
      confidence,
      type: detectedType,
    };
  }

  // Detect what type of content we're dealing with
  private static detectContentType(input: string): { type: string; confidence: number } {
    const trimmed = input.trim();

    // Check for JSON
    if ((trimmed.startsWith('{') && trimmed.endsWith('}')) ||
        (trimmed.startsWith('[') && trimmed.endsWith(']'))) {
      try {
        JSON.parse(trimmed);
        return { type: 'json', confidence: 0.9 };
      } catch {
        // Not valid JSON, continue checking
      }
    }

    // Check for code patterns
    const codeIndicators = [
      /function\s+\w+\s*\(/,
      /class\s+\w+/,
      /import\s+.*from/,
      /export\s+(const|function|class)/,
      /const\s+\w+\s*=/,
      /let\s+\w+\s*=/,
      /var\s+\w+\s*=/,
      /if\s*\(/,
      /for\s*\(/,
      /while\s*\(/,
      /\{\s*$/m, // opening brace at line end
      /\}\s*$/m, // closing brace at line end
      /\;\s*$/m, // semicolon at line end
    ];

    const codeMatches = codeIndicators.filter(pattern => pattern.test(trimmed));
    if (codeMatches.length >= 2) {
      return { type: 'code', confidence: Math.min(0.9, codeMatches.length / 10) };
    }

    // Default to text
    return { type: 'text', confidence: 0.7 };
  }

  // Clean up text content
  private static cleanupText(input: string, preserveFormatting: boolean, aggressive: boolean): { cleaned: string; changes: string[] } {
    let cleaned = input;
    const changes: string[] = [];

    // Basic text cleanup
    if (!preserveFormatting) {
      // Fix multiple spaces
      if (cleaned.includes('  ')) {
        cleaned = cleaned.replace(/\s+/g, ' ');
        changes.push('Removed extra spaces');
      }

      // Fix multiple newlines
      if (cleaned.includes('\n\n\n')) {
        cleaned = cleaned.replace(/\n{3,}/g, '\n\n');
        changes.push('Fixed excessive line breaks');
      }
    }

    // Fix punctuation spacing
    if (cleaned.match(/\s+[,.!?;:]/)) {
      cleaned = cleaned.replace(/\s+([,.!?;:])/g, '$1');
      changes.push('Fixed punctuation spacing');
    }

    // Fix missing spaces after punctuation
    if (cleaned.match(/[,.!?;:]\w/)) {
      cleaned = cleaned.replace(/([,.!?;:])(\w)/g, '$1 $2');
      changes.push('Added missing spaces after punctuation');
    }

    // Capitalize first letter of sentences
    if (aggressive) {
      cleaned = cleaned.replace(/(^|[.!?]\s*)(\w)/g, (match, prefix, letter) => {
        return prefix + letter.toUpperCase();
      });
      changes.push('Capitalized sentence starts');
    }

    // Trim whitespace
    cleaned = cleaned.trim();
    if (cleaned !== input) {
      changes.push('Trimmed whitespace');
    }

    return { cleaned, changes };
  }

  // Clean up code content
  private static cleanupCode(input: string, language?: string, aggressive?: boolean): { cleaned: string; changes: string[] } {
    let cleaned = input;
    const changes: string[] = [];

    // Basic code formatting
    // Remove trailing whitespace from lines
    const lines = cleaned.split('\n');
    const cleanedLines = lines.map(line => line.trimEnd());

    if (cleanedLines.some((line, i) => line !== lines[i])) {
      cleaned = cleanedLines.join('\n');
      changes.push('Removed trailing whitespace');
    }

    // Fix inconsistent indentation (basic)
    if (aggressive && language === 'javascript') {
      // Simple brace-based indentation
      let indentLevel = 0;
      const indentedLines = cleaned.split('\n').map(line => {
        const trimmed = line.trim();
        if (trimmed.startsWith('}')) {
          indentLevel = Math.max(0, indentLevel - 1);
        }

        const indented = '  '.repeat(indentLevel) + trimmed;

        if (trimmed.endsWith('{')) {
          indentLevel += 1;
        }

        return indented;
      });

      cleaned = indentedLines.join('\n');
      changes.push('Fixed indentation');
    }

    // Fix missing semicolons in JS
    if (aggressive && language === 'javascript') {
      // This is a very basic implementation - in reality you'd want a proper AST parser
      cleaned = cleaned.replace(/(\w|\))\s*$/gm, (match) => {
        // Skip if already ends with semicolon or is a comment/block
        if (match.endsWith(';') || match.includes('//') || match.includes('/*')) {
          return match;
        }
        // Skip if it's a block statement or function
        if (match.includes('{') || match.includes('}') || match.includes('function')) {
          return match;
        }
        return match + ';';
      });
      changes.push('Added missing semicolons');
    }

    return { cleaned, changes };
  }

  // Clean up JSON content
  private static cleanupJSON(input: string, aggressive: boolean): { cleaned: string; changes: string[] } {
    const changes: string[] = [];

    try {
      // Parse and re-stringify to format
      const parsed = JSON.parse(input);
      const cleaned = JSON.stringify(parsed, null, 2);
      changes.push('Formatted JSON with proper indentation');
      return { cleaned, changes };
    } catch (error) {
      // If JSON is invalid, try basic cleanup
      let cleaned = input;

      // Remove trailing commas
      cleaned = cleaned.replace(/,(\s*[}\]])/g, '$1');
      changes.push('Removed trailing commas');

      // Fix quotes (basic)
      if (aggressive) {
        // This is very basic - real JSON fixing would be more complex
        cleaned = cleaned.replace(/'/g, '"');
        changes.push('Converted single quotes to double quotes');
      }

      return { cleaned, changes };
    }
  }

  // Quick cleanup for one-click actions
  static quickCleanup(input: string): string {
    // Fast cleanup for one-click actions
    return input
      .trim()
      .replace(/\s+/g, ' ') // multiple spaces to single
      .replace(/\n{3,}/g, '\n\n') // excessive newlines
      .replace(/\s+([,.!?;:])/g, '$1') // fix punctuation spacing
      .replace(/([,.!?;:])(\w)/g, '$1 $2'); // add missing spaces
  }
}