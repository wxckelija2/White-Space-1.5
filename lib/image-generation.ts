// Image generation service for White Space Pro
import { supabase } from './supabase';
import { getSubscription } from './stripe';
import { incrementUsage } from './usage-tracking';

export interface ImageGenerationOptions {
  prompt: string;
  style?: 'realistic' | 'artistic' | 'cartoon' | 'abstract';
  size?: 'small' | 'medium' | 'large';
  count?: number;
}

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  style: string;
  size: string;
  createdAt: Date;
}

// Check if user can generate images
export async function canGenerateImages(userId: string): Promise<boolean> {
  const subscription = await getSubscription(userId);
  return subscription?.tier === 'plus';
}

// Generate images using AI service
export async function generateImages(userId: string, options: ImageGenerationOptions): Promise<GeneratedImage[]> {
  // Check subscription
  if (!await canGenerateImages(userId)) {
    throw new Error('Image generation is a Pro feature. Please upgrade to access this capability.');
  }

  try {
    // Call image generation API (you would integrate with DALL-E, Midjourney, etc.)
    const response = await supabase.functions.invoke('generate-images', {
      body: {
        userId,
        ...options,
      },
    });

    if (response.error) {
      throw new Error(response.error.message);
    }

    // Increment usage counter
    await incrementUsage(userId, { imageGenerations: options.count || 1 });

    return response.data.images;
  } catch (error: any) {
    console.error('Image generation failed:', error);
    throw new Error(`Failed to generate images: ${error.message}`);
  }
}

// Get user's generated images
export async function getUserImages(userId: string, limit: number = 20): Promise<GeneratedImage[]> {
  const { data, error } = await supabase
    .from('generated_images')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(`Failed to fetch images: ${error.message}`);
  }

  return data.map(img => ({
    id: img.id,
    url: img.image_url,
    prompt: img.prompt,
    style: img.style,
    size: img.size,
    createdAt: new Date(img.created_at),
  }));
}