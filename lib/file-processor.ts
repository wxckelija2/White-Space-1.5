import * as FileSystem from 'expo-file-system';

export interface ProcessedFile {
  uri: string;
  type: string;
  name: string;
  base64?: string;
  textContent?: string;
  size: number;
  metadata?: {
    width?: number;
    height?: number;
    pages?: number;
    encoding?: string;
  };
}

export class FileProcessor {
  static async processFile(uri: string, mimeType: string, fileName: string, fileSize: number): Promise<ProcessedFile> {
    const processedFile: ProcessedFile = {
      uri,
      type: mimeType,
      name: fileName,
      size: fileSize,
    };

    try {
      // Convert to base64 for AI processing
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: 'base64' as any,
      });
      processedFile.base64 = base64;

      // Process based on file type
      if (mimeType.startsWith('image/')) {
        processedFile.metadata = await this.processImage(uri);
      } else if (mimeType.startsWith('text/') || mimeType === 'application/json') {
        processedFile.textContent = await this.extractTextContent(uri);
      } else if (mimeType === 'application/pdf') {
        // For PDFs, we'd need additional libraries like react-native-pdf
        // For now, just mark as binary
        processedFile.metadata = { pages: 1 }; // Placeholder
      }

      return processedFile;
    } catch (error) {
      console.error('Error processing file:', fileName, error);
      return processedFile;
    }
  }

  private static async processImage(uri: string): Promise<{ width?: number; height?: number }> {
    // In a real implementation, you'd use Image.getSize or similar
    // For now, return placeholder metadata
    return {
      width: 800, // Placeholder
      height: 600, // Placeholder
    };
  }

  private static async extractTextContent(uri: string): Promise<string> {
    try {
      // For text files, read as string
      const content = await FileSystem.readAsStringAsync(uri, {
        encoding: 'utf8' as any,
      });
      return content;
    } catch (error) {
      console.error('Error extracting text content:', error);
      return '';
    }
  }

  static getSupportedMimeTypes(): string[] {
    return [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'text/plain',
      'text/markdown',
      'text/csv',
      'application/json',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
  }

  static isFileTypeSupported(mimeType: string): boolean {
    return this.getSupportedMimeTypes().includes(mimeType);
  }

  static getFileTypeCategory(mimeType: string): 'image' | 'document' | 'text' | 'other' {
    if (mimeType.startsWith('image/')) return 'image';
    if (mimeType.startsWith('text/')) return 'text';
    if (mimeType.includes('document') || mimeType === 'application/pdf' || mimeType === 'application/json') return 'document';
    return 'other';
  }
}
