export const APP_NAME = 'White Space';
export const APP_VERSION = '1.0.0';
export const APP_TAGLINE = 'Create anything, instantly';

export const OUTPUT_TYPES = {
  DECK: 'deck',
  IMAGE: 'image',
  VIDEO: 'video',
  SUMMARY: 'summary',
  MOCKUP: 'mockup',
  COPY: 'copy',
} as const;

export const INPUT_TYPES = {
  TEXT: 'text',
  IMAGE: 'image',
  VIDEO: 'video',
  AUDIO: 'audio',
} as const;

export const PROJECT_STATUS = {
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
} as const;

export const EXAMPLE_PROMPTS = [
  {
    id: '1',
    title: 'Create social media clip with caption',
    prompt: 'Make a 30-sec clip for Instagram with caption and thumbnail',
  },
  {
    id: '2',
    title: 'Redesign room with mood board',
    prompt: 'Redecor my room for a modern minimalist vibe',
  },
  {
    id: '3',
    title: 'Generate pitch deck from idea',
    prompt: 'Create a 3-slide pitch deck for my app idea',
  },
];

export const COLORS = {
  primary: '#000',
  secondary: '#666',
  background: '#fafafa',
  white: '#fff',
  border: '#e5e5e5',
  success: '#22c55e',
  error: '#ef4444',
  warning: '#f59e0b',
} as const;
