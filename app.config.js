export default {
  expo: {
    name: 'White Space',
    slug: 'white-space',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'whitespace',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.whitespace.app',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/icon.png',
        backgroundColor: '#ffffff',
      },
      package: 'com.whitespace.app',
    },
    web: {
      bundler: 'metro',
      output: 'single',
      favicon: './assets/images/favicon.png',
    },
    plugins: [
      'expo-router',
      'expo-font',
      'expo-web-browser',
      [
        'expo-image-picker',
        {
          photosPermission: 'Allow $(PRODUCT_NAME) to access your photos and screenshots to upload images for content generation.',
          cameraPermission: 'Allow $(PRODUCT_NAME) to access your camera to take photos and screenshots for content generation.',
          // Allow multiple selection and larger file sizes
          allowsMultipleSelection: true,
          // Quality settings for better file size management
          quality: 0.8,
          // Allow editing if needed
          allowsEditing: false,
        },
      ],
      [
        'expo-document-picker',
        {
          appleTeamId: undefined, // Set to your Apple Team ID if needed
          // Add support for screenshot and common image file types
          iOSActivationRules: {
            allowPhotos: true,
            allowVideos: true,
            allowDocuments: true,
          },
          // Specify supported file types
          mimeTypes: [
            'image/png',
            'image/jpeg',
            'image/jpg',
            'image/heic',
            'image/heif',
            'image/gif',
            'image/webp',
            'image/tiff',
            'image/bmp',
            'image/svg+xml',
          ],
          // iOS UTI types for better compatibility
          iOSUTITypes: [
            'public.png',
            'public.jpeg',
            'public.jpeg-2000',
            'public.gif',
            'public.tiff',
            'public.bmp',
            'public.webp',
            'org.webmproject.webp',
            'public.heic',
            'public.heif',
            'public.svg-image',
          ],
          // File size limits (in bytes) - 50-250MB range
          maxFileSize: 250 * 1024 * 1024, // 250MB
          // Allow multiple file selection
          multiple: true,
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      SUPABASE_URL: process.env.EXPO_PUBLIC_SUPABASE_URL,
      SUPABASE_ANON_KEY: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
      AI_PROVIDER: process.env.EXPO_PUBLIC_AI_PROVIDER,
    },
  },
};
