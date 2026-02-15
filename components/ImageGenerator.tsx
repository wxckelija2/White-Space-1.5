import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ImageIcon, X, Sparkles, Crown } from 'lucide-react-native';
import { generateImages, canGenerateImages, ImageGenerationOptions } from '@/lib/image-generation';
import { supabase } from '@/lib/supabase';

interface ImageGeneratorProps {
  onClose: () => void;
  onImageGenerated?: (images: any[]) => void;
}

export default function ImageGenerator({ onClose, onImageGenerated }: ImageGeneratorProps) {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState<'realistic' | 'artistic' | 'cartoon' | 'abstract'>('realistic');
  const [size, setSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<any[]>([]);
  const [canGenerate, setCanGenerate] = useState(false);

  React.useEffect(() => {
    checkGenerationAccess();
  }, []);

  const checkGenerationAccess = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const access = await canGenerateImages(user.id);
        setCanGenerate(access);
      }
    } catch (error) {
      console.error('Error checking generation access:', error);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      Alert.alert('Error', 'Please enter a description for the image');
      return;
    }

    if (!canGenerate) {
      // Calculate wait time based on timezone
      const now = new Date();
      const resetTime = new Date(now);
      resetTime.setHours(24, 0, 0, 0); // Next midnight
      const hoursUntilReset = Math.ceil((resetTime.getTime() - now.getTime()) / (1000 * 60 * 60));
      
      Alert.alert(
        'Daily Limit Reached',
        `You've used all your free image generations for today.\n\nOptions:\n• Start a new chat tomorrow\n• Wait ${hoursUntilReset} hours for reset\n• Upgrade to Plus for unlimited generations`,
        [
          { text: 'OK', style: 'cancel' },
          { text: 'Upgrade to Plus', onPress: onClose }
        ]
      );
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      const options: ImageGenerationOptions = {
        prompt: prompt.trim(),
        style,
        size,
        count,
      };

      const images = await generateImages(user.id, options);
      setGeneratedImages(images);

      if (onImageGenerated) {
        onImageGenerated(images);
      }

      Alert.alert('Success', `Generated ${images.length} image${images.length > 1 ? 's' : ''}!`);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const styleOptions = [
    { value: 'realistic', label: 'Realistic', description: 'Photorealistic images' },
    { value: 'artistic', label: 'Artistic', description: 'Creative and stylized' },
    { value: 'cartoon', label: 'Cartoon', description: 'Fun and animated' },
    { value: 'abstract', label: 'Abstract', description: 'Modern and conceptual' },
  ];

  const sizeOptions = [
    { value: 'small', label: 'Small (256px)', description: 'Fast generation' },
    { value: 'medium', label: 'Medium (512px)', description: 'Balanced quality/speed' },
    { value: 'large', label: 'Large (1024px)', description: 'High quality' },
  ];

  if (!canGenerate) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <ImageIcon size={24} color="#000" />
          <Text style={styles.title}>AI Image Generator</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={24} color="#666" />
          </TouchableOpacity>
        </View>

        <View style={styles.upgradeContainer}>
          <Crown size={64} color="#FFD700" />
          <Text style={styles.upgradeTitle}>White Space Pro Feature</Text>
          <Text style={styles.upgradeDescription}>
            Generate stunning AI images from text descriptions. Create art, designs, concepts, and more with our advanced image generation technology.
          </Text>

          <View style={styles.proFeatures}>
            <Text style={styles.featuresTitle}>Pro Features:</Text>
            <FeatureItem text="High-quality image generation" />
            <FeatureItem text="Multiple art styles (Realistic, Artistic, Cartoon, Abstract)" />
            <FeatureItem text="Customizable image sizes" />
            <FeatureItem text="Batch generation (up to 4 images)" />
            <FeatureItem text="Commercial usage rights" />
          </View>

          <TouchableOpacity
            style={styles.upgradeButton}
            onPress={onClose}
          >
            <Crown size={20} color="#fff" />
            <Text style={styles.upgradeButtonText}>Upgrade to Pro</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <ImageIcon size={24} color="#000" />
        <Text style={styles.title}>AI Image Generator</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <X size={24} color="#666" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Prompt Input */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Describe your image</Text>
          <TextInput
            style={styles.promptInput}
            placeholder="A serene mountain landscape at sunset, with flowing rivers and pine trees..."
            placeholderTextColor="#999"
            value={prompt}
            onChangeText={setPrompt}
            multiline
            numberOfLines={3}
          />
        </View>

        {/* Style Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Art Style</Text>
          <View style={styles.optionsGrid}>
            {styleOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.optionCard,
                  style === option.value && styles.selectedOption,
                ]}
                onPress={() => setStyle(option.value as any)}
              >
                <Text style={[styles.optionLabel, style === option.value && styles.selectedOptionText]}>
                  {option.label}
                </Text>
                <Text style={[styles.optionDescription, style === option.value && styles.selectedOptionText]}>
                  {option.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Size Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Image Size</Text>
          <View style={styles.sizeOptions}>
            {sizeOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.sizeOption,
                  size === option.value && styles.selectedSizeOption,
                ]}
                onPress={() => setSize(option.value as any)}
              >
                <Text style={[styles.sizeLabel, size === option.value && styles.selectedSizeText]}>
                  {option.label}
                </Text>
                <Text style={[styles.sizeDescription, size === option.value && styles.selectedSizeText]}>
                  {option.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Count Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Number of Images</Text>
          <View style={styles.countSelector}>
            {[1, 2, 3, 4].map((num) => (
              <TouchableOpacity
                key={num}
                style={[
                  styles.countButton,
                  count === num && styles.selectedCountButton,
                ]}
                onPress={() => setCount(num)}
              >
                <Text style={[styles.countText, count === num && styles.selectedCountText]}>
                  {num}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Generate Button */}
        <TouchableOpacity
          style={[styles.generateButton, loading && styles.disabledButton]}
          onPress={handleGenerate}
          disabled={loading || !prompt.trim()}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Sparkles size={20} color="#fff" />
              <Text style={styles.generateButtonText}>Generate Images</Text>
            </>
          )}
        </TouchableOpacity>

        {/* Generated Images */}
        {generatedImages.length > 0 && (
          <View style={styles.resultsSection}>
            <Text style={styles.resultsTitle}>Generated Images</Text>
            <View style={styles.imagesGrid}>
              {generatedImages.map((image, index) => (
                <View key={index} style={styles.imageContainer}>
                  <Image
                    source={{ uri: image.url }}
                    style={styles.generatedImage}
                    resizeMode="cover"
                  />
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const FeatureItem = ({ text }: { text: string }) => (
  <View style={styles.featureItem}>
    <View style={styles.featureBullet} />
    <Text style={styles.featureText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  closeButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  upgradeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  upgradeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 20,
    marginBottom: 16,
    textAlign: 'center',
  },
  upgradeDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  proFeatures: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 32,
    width: '100%',
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#007AFF',
    marginRight: 12,
  },
  featureText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  upgradeButton: {
    flexDirection: 'row',
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    width: '100%',
  },
  upgradeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
  },
  promptInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    minHeight: 80,
    textAlignVertical: 'top',
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  optionCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  selectedOption: {
    borderColor: '#007AFF',
    backgroundColor: '#f0f8ff',
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: '#666',
  },
  selectedOptionText: {
    color: '#007AFF',
  },
  sizeOptions: {
    gap: 8,
  },
  sizeOption: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  selectedSizeOption: {
    borderColor: '#007AFF',
    backgroundColor: '#f0f8ff',
  },
  sizeLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  sizeDescription: {
    fontSize: 14,
    color: '#666',
  },
  selectedSizeText: {
    color: '#007AFF',
  },
  countSelector: {
    flexDirection: 'row',
    gap: 12,
  },
  countButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  selectedCountButton: {
    borderColor: '#007AFF',
    backgroundColor: '#f0f8ff',
  },
  countText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  selectedCountText: {
    color: '#007AFF',
  },
  generateButton: {
    flexDirection: 'row',
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 24,
  },
  disabledButton: {
    opacity: 0.6,
  },
  generateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  resultsSection: {
    marginTop: 24,
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  imagesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  imageContainer: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  generatedImage: {
    width: '100%',
    height: '100%',
  },
});