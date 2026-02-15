import { Platform, Alert } from 'react-native';

export type ExportFormat = 'pdf' | 'txt' | 'html';
export type ExportQuality = 'draft' | 'standard' | 'premium';

export interface ExportOptions {
  format: ExportFormat;
  quality: ExportQuality;
  includeMetadata?: boolean;
  title?: string;
  author?: string;
}

export interface ExportResult {
  success: boolean;
  content?: string;
  fileName?: string;
  error?: string;
}

class ExportService {
  private generateFormattedContent(content: string, options: ExportOptions): string {
    const { title = 'White Space Export', author = 'White Space User', includeMetadata = true } = options;

    let formattedContent = content;

    if (includeMetadata) {
      const metadata = [
        `Title: ${title}`,
        `Author: ${author}`,
        `Generated: ${new Date().toLocaleString()}`,
        `Quality: ${options.quality}`,
        '',
        '---',
        '',
      ].join('\n');

      formattedContent = metadata + formattedContent;
    }

    return formattedContent;
  }

  private generateFileName(title: string, format: ExportFormat): string {
    const sanitizedTitle = title
      .replace(/[^a-z0-9]/gi, '_')
      .toLowerCase()
      .substring(0, 30);

    const timestamp = new Date().toISOString().split('T')[0];
    return `${sanitizedTitle}_${timestamp}.${format}`;
  }

  async exportToText(content: string, options: ExportOptions): Promise<ExportResult> {
    try {
      const formattedContent = this.generateFormattedContent(content, options);
      const fileName = this.generateFileName(options.title || 'export', 'txt');

      // For Expo Go, we'll just return the content - sharing will be handled differently
      return {
        success: true,
        content: formattedContent,
        fileName,
      };
    } catch (error) {
      console.error('Text export failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Text export failed',
      };
    }
  }

  async exportToHTML(content: string, options: ExportOptions): Promise<ExportResult> {
    try {
      const formattedContent = this.generateFormattedContent(content, options);
      const fileName = this.generateFileName(options.title || 'export', 'html');

      // Simple HTML wrapper for web display
      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>${options.title || 'White Space Export'}</title>
            <style>
              body { font-family: system-ui, sans-serif; line-height: 1.6; padding: 20px; max-width: 800px; margin: 0 auto; }
              pre { white-space: pre-wrap; }
            </style>
          </head>
          <body>
            <pre>${formattedContent.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
          </body>
        </html>
      `;

      return {
        success: true,
        content: htmlContent,
        fileName,
      };
    } catch (error) {
      console.error('HTML export failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'HTML export failed',
      };
    }
  }

  async export(content: string, options: ExportOptions): Promise<ExportResult> {
    switch (options.format) {
      case 'txt':
        return this.exportToText(content, options);
      case 'html':
        return this.exportToHTML(content, options);
      case 'pdf':
        // PDF not supported in Expo Go, fallback to HTML
        console.warn('PDF export not supported in Expo Go, using HTML instead');
        return this.exportToHTML(content, { ...options, format: 'html' });
      default:
        return {
          success: false,
          error: `Unsupported format: ${options.format}`,
        };
    }
  }

  async shareExport(result: ExportResult): Promise<void> {
    if (!result.success || !result.content) {
      throw new Error('Invalid export result');
    }

    // In Expo Go, we'll use a simple alert with the content
    // In a real app, you'd implement proper sharing
    Alert.alert(
      'Export Ready',
      `Your ${result.fileName} has been generated. Here's the content:\n\n${result.content.substring(0, 500)}${result.content.length > 500 ? '...' : ''}`,
      [
        { text: 'OK' },
        {
          text: 'Copy to Clipboard',
          onPress: () => {
            // Note: In a real implementation, you'd use Clipboard
            console.log('Copy to clipboard:', result.content);
          }
        }
      ]
    );
  }

  // Get available export formats for current platform
  getAvailableFormats(): ExportFormat[] {
    return ['txt', 'html']; // PDF not supported in Expo Go
  }

  // Utility method to check if export is supported
  isExportSupported(): boolean {
    return true; // Basic export always supported
  }
}

// Export singleton instance
export const exportService = new ExportService();
