import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
  Animated,
  Easing,
} from 'react-native';
import { Mic, Camera, Upload, Sparkles } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useProjects } from '@/hooks/useProjects';
import { useAuth } from '@/lib/auth';
import ProcessingModal from '@/components/ProcessingModal';
import ResultsModal from '@/components/ResultsModal';

export default function CreateScreen() {
  const [inputText, setInputText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Animation values for staggered card entrance
  const cardAnims = [
    useState(new Animated.Value(0))[0],
    useState(new Animated.Value(0))[0],
    useState(new Animated.Value(0))[0],
  ];

  // Trigger card animations on mount
  useState(() => {
    const animateCards = () => {
      cardAnims.forEach((anim, index) => {
        Animated.timing(anim, {
          toValue: 1,
          duration: 600,
          delay: index * 200,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }).start();
      });
    };
    animateCards();
  });
  const [showResults, setShowResults] = useState(false);

  const { createProject } = useProjects();
  const { user } = useAuth();
  const router = useRouter();

  const handleGenerate = async () => {
    if (!inputText.trim()) {
      Alert.alert('Input Required', 'Please enter text or upload media');
      return;
    }

    if (!user) {
      Alert.alert('Error', 'Please sign in to create projects.');
      return;
    }

    try {
      setIsGenerating(true);

      // DEBUG: Check authentication and data
      console.log('🔍 DEBUG: User object:', user);
      console.log('🔍 DEBUG: User ID:', user?.id);
      console.log('🔍 DEBUG: Is user authenticated:', !!user);

      // Create a new project
      const project = await createProject({
        title: inputText.length > 50 ? inputText.substring(0, 50) + '...' : inputText,
        input_type: 'text',
        input_content: inputText,
        intent: 'generate',
        tags: [],
        status: 'active',
        user_id: user.id,
      });

      // Navigate to the draft workspace
      router.push(`/draft-workspace/${project.id}` as any);

    } catch (error) {
      // DEBUG: Log the actual error
      console.error('🔍 DEBUG: Failed to create project:', error);
      Alert.alert('Error', 'Failed to create project. Please try again.');
      setIsGenerating(false);
    }
  };

  const handleCloseResults = () => {
    setShowResults(false);
    setInputText('');
  };

  const handleVoiceInput = () => {
    Alert.alert('Voice Input', 'Voice recording coming soon!');
  };

  const handleCameraInput = () => {
    Alert.alert('Camera', 'Camera feature coming soon!');
  };

  const handleFileUpload = () => {
    Alert.alert('Upload', 'File upload coming soon!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ProcessingModal visible={isGenerating} />
      <ResultsModal visible={showResults} onClose={handleCloseResults} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.logoText}>White Space</Text>
          <Text style={styles.tagline}>
            Create anything, instantly
          </Text>
        </View>

        <View style={styles.inputCard}>
          <Text style={styles.inputLabel}>
            What do you want to create?
          </Text>
          <TextInput
            style={styles.textInput}
            placeholder="Type, speak, or drop anything..."
            placeholderTextColor="#999"
            multiline
            value={inputText}
            onChangeText={setInputText}
            textAlignVertical="top"
          />

          <View style={styles.inputActions}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={handleVoiceInput}>
              <Mic size={24} color="#000" />
              <Text style={styles.iconButtonText}>Voice</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.iconButton}
              onPress={handleCameraInput}>
              <Camera size={24} color="#000" />
              <Text style={styles.iconButtonText}>Camera</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.iconButton}
              onPress={handleFileUpload}>
              <Upload size={24} color="#000" />
              <Text style={styles.iconButtonText}>Upload</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.generateButton,
            isGenerating && styles.generateButtonDisabled,
          ]}
          onPress={handleGenerate}
          disabled={isGenerating}>
          <Sparkles size={24} color="#fff" />
          <Text style={styles.generateButtonText}>
            {isGenerating ? 'Generating...' : 'Generate'}
          </Text>
        </TouchableOpacity>

        <View style={styles.examplesSection}>
          <Text style={styles.examplesTitle}>Try these:</Text>
          <Animated.View
            style={[
              styles.exampleCard,
              {
                transform: [{
                  translateY: cardAnims[0].interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0],
                  })
                }],
                opacity: cardAnims[0],
              }
            ]}
          >
            <TouchableOpacity
              style={styles.exampleCardContent}
              onPress={() =>
                setInputText(
                  'Make a 30-sec clip for Instagram with caption and thumbnail'
                )
              }>
              <Text style={styles.exampleText}>
                Create social media clip with caption
              </Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View
            style={[
              styles.exampleCard,
              {
                transform: [{
                  translateY: cardAnims[1].interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0],
                  })
                }],
                opacity: cardAnims[1],
              }
            ]}
          >
            <TouchableOpacity
              style={styles.exampleCardContent}
              onPress={() =>
                setInputText('Redecor my room for a modern minimalist vibe')
              }>
              <Text style={styles.exampleText}>
                Redesign room with mood board
              </Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View
            style={[
              styles.exampleCard,
              {
                transform: [{
                  translateY: cardAnims[2].interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0],
                  })
                }],
                opacity: cardAnims[2],
              }
            ]}
          >
            <TouchableOpacity
              style={styles.exampleCardContent}
              onPress={() =>
                setInputText('Create a 3-slide pitch deck for my app idea')
              }>
              <Text style={styles.exampleText}>
                Generate pitch deck from idea
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
  },
  logoText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#000',
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  inputCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  textInput: {
    fontSize: 16,
    color: '#000',
    minHeight: 120,
    padding: 0,
    marginBottom: 20,
  },
  inputActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  iconButton: {
    alignItems: 'center',
    gap: 8,
  },
  iconButtonText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  generateButton: {
    backgroundColor: '#000',
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  generateButtonDisabled: {
    opacity: 0.6,
  },
  generateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  examplesSection: {
    marginTop: 40,
  },
  examplesTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 12,
  },
  exampleCard: {
    marginBottom: 12,
  },
  exampleCardContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  exampleText: {
    fontSize: 14,
    color: '#333',
  },
});
