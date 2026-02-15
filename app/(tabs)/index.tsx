import { useState, useRef, useEffect } from 'react';
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
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from 'react-native';
import { Mic, Send, MoreVertical, Sparkles, Plus, User, LogIn, LogOut, Paperclip, Volume2, VolumeX } from 'lucide-react-native';
import * as Speech from 'expo-speech';
import * as ImagePicker from 'expo-image-picker';
import { FileProcessor } from '@/lib/file-processor';
import { aiService } from '@/lib/ai';
import { loginUser, logoutUser, isAuthenticated, getCurrentUser } from '@/lib/auth-functions';
import { getSubscription } from '@/lib/stripe';
import { getUsageStats, checkUsageLimits } from '@/lib/usage-tracking';
import { SmartCleanup } from '@/lib/smart-cleanup';
import SubscriptionScreen from '@/components/SubscriptionScreen';
import ImageGenerator from '@/components/ImageGenerator';
import AdminPanel from '@/components/AdminPanel';
import VoiceInput from '@/components/VoiceInput';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  id: string;
  timestamp: Date;
  attachments?: Array<{
    uri: string;
    type: string;
    name: string;
    size: number;
  }>;
}

export default function ChatScreen() {
  const [inputText, setInputText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [shouldStopGeneration, setShouldStopGeneration] = useState(false);
  const [currentAbortController, setCurrentAbortController] = useState<AbortController | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [showChatDrawer, setShowChatDrawer] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showSubscriptionManager, setShowSubscriptionManager] = useState(false);
  const [showImageGenerator, setShowImageGenerator] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [subscription, setSubscription] = useState<any>(null);
  const [usageStats, setUsageStats] = useState<any>(null);
  const [headerTapCount, setHeaderTapCount] = useState(0);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [detectedContentType, setDetectedContentType] = useState<string>('text');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [attachments, setAttachments] = useState<Array<{
    uri: string;
    type: string;
    name: string;
    size: number;
  }>>([]);
  const [showVoiceInput, setShowVoiceInput] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const scrollViewRef = useRef<ScrollView | null>(null);

  // Animation for new messages
  const messageAnim = useState(new Animated.Value(0))[0];

  // Breathing animation for the loader
  const breathingAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    if (isGenerating) {
      // Start breathing animation
      const breathingAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(breathingAnim, {
            toValue: 1,
            duration: 1500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(breathingAnim, {
            toValue: 0,
            duration: 1500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      );
      breathingAnimation.start();

      return () => {
        breathingAnimation.stop();
      };
    }
  }, [isGenerating, breathingAnim]);

  // Check authentication status on mount
  useEffect(() => {
    checkAuthStatus();
    // Initialize AI service with correct provider
    aiService.initialize();
  }, []);

  // Load subscription and usage data when user changes
  useEffect(() => {
    if (currentUser) {
      loadSubscriptionData();
    }
  }, [currentUser]);

  // Detect content type as user types
  useEffect(() => {
    if (inputText.trim().length > 10) {
      // Simple content type detection
      const text = inputText.toLowerCase();

      if (text.includes('function') || text.includes('const') || text.includes('let') || text.includes('import') ||
          text.includes('class') || text.includes('export') || text.includes('if ') || text.includes('for ')) {
        setDetectedContentType('code');
      } else if ((text.startsWith('{') && text.endsWith('}')) || (text.startsWith('[') && text.endsWith(']'))) {
        try {
          JSON.parse(text);
          setDetectedContentType('json');
        } catch {
          setDetectedContentType('text');
        }
      } else {
        setDetectedContentType('text');
      }

      setShowQuickActions(true);
    } else {
      setShowQuickActions(false);
    }
  }, [inputText]);

  const checkAuthStatus = async () => {
    try {
      console.log('🔍 Checking auth status...');
      const authenticated = await isAuthenticated();
      console.log('🔍 Authenticated:', authenticated);
      setIsLoggedIn(authenticated);
      if (authenticated) {
        const user = await getCurrentUser();
        console.log('🔍 Current user:', user?.email);
        setCurrentUser(user);
      } else {
        console.log('🔍 No user logged in');
        setCurrentUser(null);
      }
    } catch (error) {
      console.error('❌ Auth check failed:', error);
      setIsLoggedIn(false);
      setCurrentUser(null);
    }
  };

  const loadSubscriptionData = async () => {
    try {
      if (currentUser) {
        const sub = await getSubscription(currentUser.id);
        setSubscription(sub);

        const usage = await getUsageStats(currentUser.id);
        setUsageStats(usage);
      }
    } catch (error) {
      console.error('Error loading subscription data:', error);
    }
  };

  const handleLogin = async () => {
    console.log('🔐 Login attempt with:', loginEmail, loginPassword ? '***' : '');

    if (!loginEmail.trim() || !loginPassword.trim()) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    setIsAuthenticating(true);
    try {
      console.log('🔐 Calling loginUser...');
      await loginUser(loginEmail.trim(), loginPassword);
      console.log('🔐 loginUser completed, checking auth status...');
      await checkAuthStatus();
      console.log('🔐 Auth status checked, closing modal...');
      setShowAuthModal(false);
      setLoginEmail('');
      setLoginPassword('');
      Alert.alert('Success', 'Logged in successfully!');
    } catch (error: any) {
      console.error('❌ Login failed:', error);
      Alert.alert('Login Failed', error.message || 'An error occurred during login');
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      await checkAuthStatus();
      Alert.alert('Success', 'Logged out successfully!');
    } catch (error: any) {
      Alert.alert('Logout Failed', error.message || 'An error occurred during logout');
    }
  };

  const handleAuthRequired = () => {
    Alert.alert(
      'Authentication Required',
      'You need to be logged in to use White Space AI features.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Login', onPress: () => setShowAuthModal(true) }
      ]
    );
  };

  // Streaming response for smooth typing effect
  const streamResponse = async (
    fullContent: string,
    callback: (partial: string) => void,
    onDone?: () => void
  ) => {
    let currentText = '';
    const words = fullContent.split(' ');

    for (let i = 0; i < words.length; i++) {
      // Check if generation should be stopped
      if (shouldStopGeneration) {
        console.log('🛑 Generation stopped by user');
        setShouldStopGeneration(false);
        if (onDone) onDone();
        return;
      }

      currentText += (i > 0 ? ' ' : '') + words[i];
      callback(currentText);
      await new Promise(resolve => setTimeout(resolve, 50)); // Smooth streaming
    }

    if (onDone) onDone();
  };

  const pickDocument = async () => {
    try {
      // Request permissions
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Please allow access to your photo library in Settings to attach images.',
          [{ text: 'OK' }]
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: false,
        quality: 0.8,
        allowsMultipleSelection: false,
        exif: false,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        
        // Get file extension and determine mime type
        const uriParts = asset.uri.split('.');
        const extension = uriParts[uriParts.length - 1]?.toLowerCase() || 'jpg';
        const mimeType = `image/${extension === 'jpg' ? 'jpeg' : extension}`;

        // Get filename
        const uriPathParts = asset.uri.split('/');
        const fileName = asset.fileName || uriPathParts[uriPathParts.length - 1] || `image.${extension}`;

        const attachment = {
          uri: asset.uri,
          type: mimeType,
          name: fileName,
          size: asset.fileSize || 0,
        };

        console.log('📎 Attachment added:', attachment.name, attachment.type);
        setAttachments(prev => [...prev, attachment]);
      }
    } catch (error: any) {
      console.error('Error picking document:', error);
      Alert.alert('Error', 'Failed to select image. Please try again.');
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  // Detect if user input is unstructured thoughts that need organizing
  const detectUnstructuredThoughts = (text: string): boolean => {
    const words = text.split(/\s+/);
    const wordCount = words.length;

    // Too short to be a brain dump
    if (wordCount < 8) return false;

    // If it's clearly a question or command, don't organize
    const lower = text.toLowerCase().trim();
    if (/^(what|how|why|when|where|who|can you|could you|please|explain|write|create|help|fix|debug|compare|list|give me|tell me|summarize|calculate)/i.test(lower)) {
      return false;
    }

    // Detect brain dump patterns
    let score = 0;

    // Multiple sentences or fragments separated by periods, commas, newlines
    const sentences = text.split(/[.!?\n]+/).filter(s => s.trim().length > 0);
    if (sentences.length >= 3) score += 2;

    // Contains comma-separated items (listing thoughts)
    const commaCount = (text.match(/,/g) || []).length;
    if (commaCount >= 3) score += 1;

    // Contains newlines (multi-line brain dump)
    const newlineCount = (text.match(/\n/g) || []).length;
    if (newlineCount >= 2) score += 2;

    // Contains bullet-like patterns (dashes, asterisks at start of lines)
    if (/^[\s]*[-*•]\s/m.test(text)) score += 2;

    // Mixed topics / scattered keywords
    const topicKeywords = [
      /\b(work|job|meeting|boss|project|deadline|client)\b/i,
      /\b(grocery|shopping|buy|pick up|store)\b/i,
      /\b(call|email|text|message|contact|reach out)\b/i,
      /\b(gym|workout|exercise|run|health|doctor|appointment)\b/i,
      /\b(idea|think|maybe|should|need to|have to|want to|gotta|gonna)\b/i,
      /\b(tomorrow|today|monday|tuesday|wednesday|thursday|friday|weekend|morning|evening|night)\b/i,
      /\b(remember|don't forget|note|important)\b/i,
    ];
    const matchedTopics = topicKeywords.filter(regex => regex.test(text));
    if (matchedTopics.length >= 2) score += 2;

    // Contains "need to", "have to", "should", "want to" patterns (task-like)
    const taskPatterns = (text.match(/\b(need to|have to|should|want to|gotta|gonna|must|don't forget|remember to)\b/gi) || []).length;
    if (taskPatterns >= 2) score += 2;

    // Long unstructured text without clear question marks
    if (wordCount > 20 && !text.includes('?')) score += 1;

    // Threshold: score >= 3 means it's likely unstructured thoughts
    return score >= 3;
  };

  const sendMessage = async () => {
    console.log('📤 sendMessage called, input:', inputText.trim());
    console.log('📤 isLoggedIn:', isLoggedIn);
    console.log('📤 isGenerating:', isGenerating);

    if (!inputText.trim() || isGenerating) {
      console.log('📤 Message blocked - empty or generating');
      return;
    }

    // Check authentication before proceeding
    if (!isLoggedIn) {
      console.log('📤 User not logged in, showing auth required');
      handleAuthRequired();
      return;
    }

    // Check usage limits
    if (currentUser) {
      try {
        const usageCheck = await checkUsageLimits(currentUser.id, subscription?.tier || 'free');
        if (!usageCheck.canUse) {
          Alert.alert(
            'Usage Limit Reached',
            'You\'ve reached your daily message limit. Upgrade to White Space Pro for higher limits!',
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Upgrade', onPress: () => setShowSubscriptionManager(true) }
            ]
          );
          return;
        }
      } catch (error) {
        console.error('Error checking usage limits:', error);
      }
    }

    console.log('📤 Proceeding with AI call...');

    // Convert image attachments to base64 for AI processing
    let processedAttachments = attachments;
    if (attachments.length > 0) {
      processedAttachments = await Promise.all(
        attachments.map(async (attachment) => {
          if (attachment.type?.startsWith('image/') && attachment.uri) {
            try {
              // Check if we're on web
              if (Platform.OS === 'web') {
                // For web, fetch the blob URL and convert to base64
                const response = await fetch(attachment.uri);
                const blob = await response.blob();
                const base64 = await new Promise<string>((resolve, reject) => {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    const result = reader.result as string;
                    // Remove the data URL prefix (e.g., "data:image/png;base64,")
                    const base64Data = result.split(',')[1];
                    resolve(base64Data);
                  };
                  reader.onerror = reject;
                  reader.readAsDataURL(blob);
                });
                console.log('📷 Image converted to base64 (web):', attachment.name);
                return { ...attachment, base64 };
              } else {
                // For native, use expo-file-system
                const FileSystem = require('expo-file-system/legacy');
                const base64 = await FileSystem.readAsStringAsync(attachment.uri, {
                  encoding: FileSystem.EncodingType.Base64,
                });
                console.log('📷 Image converted to base64 (native):', attachment.name);
                return { ...attachment, base64 };
              }
            } catch (e) {
              console.warn('Failed to convert image to base64:', e);
              return attachment;
            }
          }
          return attachment;
        })
      );
    }

    const userMessage: Message = {
      role: 'user',
      content: inputText.trim(),
      id: Date.now().toString(),
      timestamp: new Date(),
      attachments: processedAttachments.length > 0 ? processedAttachments : undefined
    };

    const assistantMessage: Message = {
      role: 'assistant',
      content: '',
      id: (Date.now() + 1).toString(),
      timestamp: new Date()
    };

    // Clear input and add messages
    setInputText('');
    setAttachments([]);
    setMessages(prev => [...prev, userMessage, assistantMessage]);
    setIsGenerating(true);

    // Animate new message
    Animated.timing(messageAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    try {
      // Create AbortController for cancellation support
      const abortController = new AbortController();
      setCurrentAbortController(abortController);

      // Build conversation history from previous messages (excluding the new ones we just added)
      const conversationHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content,
      }));

      // Analyze the message before sending
      console.log('🔍 Analyzing message before sending...');

      // Detect if user is dropping unstructured thoughts that need organizing
      const needsOrganizing = detectUnstructuredThoughts(userMessage.content);
      let finalPrompt = userMessage.content;
      if (needsOrganizing) {
        console.log('🧠 Detected unstructured thoughts — organizing...');
        finalPrompt = `The user has dropped some unstructured thoughts. Please organize them into a clear, structured format with categories, action items, and priorities where applicable. Here are their thoughts:\n\n${userMessage.content}`;
      }
      
      const response = await aiService.generate({
        type: 'generate',
        prompt: finalPrompt,
        conversationHistory,
        abortController,
        attachments: userMessage.attachments,
      });

      await streamResponse(
        response.content,
        (partial) => {
          setMessages(current => {
            const newMessages = [...current];
            const lastMessage = newMessages[newMessages.length - 1];
            if (lastMessage.role === 'assistant') {
              lastMessage.content = partial;
            }
            return newMessages;
          });
        },
        () => {
          setIsGenerating(false);
          setCurrentAbortController(null);
          setShouldStopGeneration(false);
        }
      );
    } catch (error) {
      setMessages(current => {
        const newMessages = [...current];
        const lastMessage = newMessages[newMessages.length - 1];
        if (lastMessage.role === 'assistant') {
          // Check if it was cancelled
          if (error instanceof Error && error.message.includes('cancelled')) {
            lastMessage.content = 'Generation stopped.';
          } else {
          lastMessage.content = 'Sorry, I encountered an error. Please try again.';
          }
        }
        return newMessages;
      });
      setIsGenerating(false);
      setCurrentAbortController(null);
      setShouldStopGeneration(false);
    }

    // Scroll to bottom
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };


  const toggleTheme = () => {
    // White Space uses a single clean theme, no toggle needed
    // Theme is always white/black like the login page
  };

  const handleVoicePress = () => {
    setShowVoiceInput(true);
  };

  const handleVoiceTranscript = (text: string) => {
    setInputText(text);
    setShowVoiceInput(false);
  };

  // Text-to-speech for AI responses
  const speakMessage = async (messageId: string, text: string) => {
    try {
      // Stop any current speech
      if (isSpeaking) {
        await Speech.stop();
        setIsSpeaking(false);
        setSpeakingMessageId(null);
        
        // If clicking the same message, just stop
        if (speakingMessageId === messageId) {
          return;
        }
      }

      // Clean the text for speech (remove markdown, code blocks, etc.)
      const cleanText = text
        .replace(/```[\s\S]*?```/g, 'code block')
        .replace(/`[^`]+`/g, '')
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        .replace(/\*([^*]+)\*/g, '$1')
        .replace(/#{1,6}\s/g, '')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/•/g, '')
        .replace(/\n+/g, '. ')
        .trim();

      if (!cleanText) {
        Alert.alert('Nothing to speak', 'This message has no speakable content.');
        return;
      }

      setIsSpeaking(true);
      setSpeakingMessageId(messageId);

      await Speech.speak(cleanText, {
        language: 'en-US',
        pitch: 1.0,
        rate: 0.9,
        onDone: () => {
          setIsSpeaking(false);
          setSpeakingMessageId(null);
        },
        onError: () => {
          setIsSpeaking(false);
          setSpeakingMessageId(null);
        },
        onStopped: () => {
          setIsSpeaking(false);
          setSpeakingMessageId(null);
        },
      });
    } catch (error) {
      console.error('Speech error:', error);
      setIsSpeaking(false);
      setSpeakingMessageId(null);
    }
  };

  const stopSpeaking = async () => {
    try {
      await Speech.stop();
      setIsSpeaking(false);
      setSpeakingMessageId(null);
    } catch (error) {
      console.error('Error stopping speech:', error);
    }
  };

  const handleStopGeneration = () => {
    console.log('🛑 Stop generation requested');
    if (currentAbortController) {
      currentAbortController.abort();
      setCurrentAbortController(null);
    }
    setShouldStopGeneration(true);
  };

  const handleQuickAction = async (action: string) => {
    if (!inputText.trim()) return;

    let prompt = '';

    switch (action) {
      case 'clean':
        // Use smart cleanup
        try {
          const result = await SmartCleanup.cleanup(inputText);
          prompt = `Clean up this content:\n\n${result.cleaned}\n\nHere's what I cleaned up: ${result.changes.join(', ')}`;
        } catch (error) {
          prompt = `Clean up this content:\n\n${SmartCleanup.quickCleanup(inputText)}`;
        }
        break;

      case 'explain':
        prompt = `Explain what this ${detectedContentType} does in simple terms:\n\n${inputText}`;
        break;

      case 'fix':
        if (detectedContentType === 'code') {
          prompt = `Fix any bugs or issues in this code:\n\n${inputText}`;
        } else {
          prompt = `Fix any issues or improve this content:\n\n${inputText}`;
        }
        break;

      case 'image':
        prompt = `Generate an image based on this description:\n\n${inputText}`;
        setShowImageGenerator(true);
        return; // Don't send to chat, open image generator instead
    }

    // Set the prompt as input and send
    setInputText(prompt);
    setTimeout(() => sendMessage(), 100); // Small delay to ensure state update
  };


  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle="dark-content" />

      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header - ChatGPT-style: Menu + Upgrade on left, title center */}
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setHeaderTapCount(prev => {
              const newCount = prev + 1;
              if (newCount >= 3) {
                setShowAdminPanel(true);
                return 0;
              }
              // Reset after 1 second
              setTimeout(() => setHeaderTapCount(0), 1000);
              return newCount;
            });
          }}
        >
          <View style={[styles.header, { backgroundColor: theme.background, borderBottomColor: theme.border }]}>
            <View style={styles.headerLeft}>
            <TouchableOpacity
              style={styles.headerIconButton}
              onPress={() => setShowChatDrawer(true)}
            >
              <MoreVertical size={20} color={theme.text} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.upgradeButton}
              onPress={() => setShowSubscriptionManager(true)}
            >
              <Sparkles size={16} color="#000" />
              <Text style={styles.upgradeText}>
                {subscription?.tier === 'plus' ? 'Pro' : 'Upgrade'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.headerRight}>
            <TouchableOpacity
              style={styles.authButton}
              onPress={isLoggedIn ? handleLogout : () => setShowAuthModal(true)}
            >
              {isLoggedIn ? (
                <LogOut size={20} color={theme.text} />
              ) : (
                <LogIn size={20} color={theme.text} />
              )}
            </TouchableOpacity>
          </View>
        </View>
        </TouchableOpacity>


      {/* Chat Drawer - slides in from left */}
      {showChatDrawer && (
        <View style={styles.chatDrawerOverlay}>
          <TouchableOpacity
            style={styles.chatDrawerBackdrop}
            activeOpacity={1}
            onPress={() => setShowChatDrawer(false)}
          >
            <View style={styles.chatDrawer}>
              {/* New Chat Button */}
              <TouchableOpacity
                style={styles.newChatButton}
                onPress={() => {
                  setShowChatDrawer(false);
                  setMessages([{
                    role: 'assistant',
                    content: 'Welcome to White Space! I help with business, math, homework, coding, and more.',
                    id: Date.now().toString(),
                    timestamp: new Date()
                  }]);
                }}
              >
                <Plus size={20} color="#000" />
                <Text style={styles.newChatText}>New Chat</Text>
              </TouchableOpacity>

              {/* Chat History */}
              <View style={styles.chatHistorySection}>
                <Text style={styles.chatHistoryTitle}>Recent Chats</Text>

                {/* Current Chat */}
                <TouchableOpacity
                  style={[styles.chatHistoryItem, styles.currentChatItem]}
                >
                  <Text style={styles.chatHistoryItemText} numberOfLines={1}>
                    What would you like to create today?
                  </Text>
                  <Text style={styles.chatHistoryTime}>Now</Text>
                </TouchableOpacity>

                {/* Chat history items */}
                {[
                  { title: "Design a mobile app concept", time: "2h ago", id: 1 },
                  { title: "Write a blog post about AI", time: "Yesterday", id: 2 },
                  { title: "Solve complex math problem", time: "2 days ago", id: 3 },
                ].map((chat, index) => (
                  <TouchableOpacity
                    key={chat.id || index}
                    style={styles.chatHistoryItem}
                    onPress={() => {
                      setShowChatDrawer(false);
                      Alert.alert('Chat Selected', `Selected: ${chat.title}`);
                    }}
                    onLongPress={() => {
                      Alert.alert(
                        'Delete Chat',
                        `Are you sure you want to permanently delete "${chat.title}"?`,
                        [
                          { text: 'Cancel', style: 'cancel' },
                          {
                            text: 'Delete',
                            style: 'destructive',
                            onPress: () => {
                              Alert.alert('Delete Chat', `Delete functionality for "${chat.title}" coming soon!`);
                            }
                          }
                        ]
                      );
                    }}
                  >
                    <Text style={styles.chatHistoryItemText} numberOfLines={1}>
                      {chat.title}
                    </Text>
                    <Text style={styles.chatHistoryTime}>{chat.time}</Text>
                  </TouchableOpacity>
                ))}
              </View>

            </View>
          </TouchableOpacity>
        </View>
      )}

      {/* Landing Page - when no messages */}
      {messages.length === 0 && !isGenerating && (
        <View style={styles.landingPage}>
          <Text style={styles.landingTitle}>White Space</Text>
          <Text style={styles.landingSubtitle}>Drop your thoughts. I'll organize them.</Text>
        </View>
      )}

      {/* Messages - clean vertical stack */}
      {messages.length > 0 && (
        <ScrollView
          ref={scrollViewRef}
          style={[styles.messagesContainer, { backgroundColor: theme.background }]}
          contentContainerStyle={styles.messagesContent}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
          keyboardShouldPersistTaps="handled"
        >
        {messages.map((message) => (
          <Animated.View
            key={message.id}
            style={[
              styles.messageWrapper,
              message.role === 'user' ? styles.userMessageWrapper : styles.assistantMessageWrapper,
              {
                opacity: messageAnim,
                transform: [{
                  translateY: messageAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [10, 0],
                  }),
                }],
              },
            ]}
          >
            <View style={[
              styles.messageBubble,
              message.role === 'user'
                ? [styles.userBubble, { backgroundColor: theme.userBubble, borderColor: theme.userBubble }]
                : [styles.assistantBubble, { backgroundColor: theme.assistantBubble, borderColor: theme.border }]
            ]}>
              <Text style={[
                styles.messageText,
                { color: message.role === 'user' ? theme.userText : theme.assistantText }
              ]}>
                {message.content}
              </Text>
              {message.attachments && message.attachments.length > 0 && (
                <View style={styles.attachmentsContainer}>
                  {message.attachments.map((attachment, index) => (
                    <View key={index} style={styles.attachmentItem}>
                      <Paperclip size={16} color={theme.userText} />
                      <Text style={[styles.attachmentText, { color: message.role === 'user' ? theme.userText : theme.assistantText }]}>
                        {attachment.name} ({Math.round(attachment.size / 1024)} KB)
                      </Text>
                    </View>
                  ))}
                </View>
              )}
              {/* Text-to-speech button for assistant messages */}
              {message.role === 'assistant' && (
                <TouchableOpacity
                  style={styles.speakButton}
                  onPress={() => speakMessage(message.id, message.content)}
                  activeOpacity={0.7}
                >
                  {speakingMessageId === message.id ? (
                    <VolumeX size={16} color={theme.icon} />
                  ) : (
                    <Volume2 size={16} color={theme.icon} />
                  )}
                </TouchableOpacity>
              )}
            </View>
          </Animated.View>
        ))}

        {isGenerating && (
          <Animated.View
            style={[
              styles.messageWrapper,
              styles.assistantMessageWrapper,
              {
                opacity: messageAnim,
                transform: [{
                  translateY: messageAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [10, 0],
                  }),
                }],
              },
            ]}
          >
            <View style={[styles.messageBubble, styles.assistantBubble, { backgroundColor: theme.assistantBubble, borderColor: theme.border }]}>
              <View style={styles.breathingLoader}>
                <Animated.View
                  style={[
                    styles.breathingDot,
                    {
                      transform: [{
                        scale: breathingAnim.interpolate({
                          inputRange: [0, 0.5, 1],
                          outputRange: [0.8, 1.2, 0.8],
                        }),
                      }],
                      opacity: breathingAnim.interpolate({
                        inputRange: [0, 0.5, 1],
                        outputRange: [0.3, 1, 0.3],
                      }),
                    },
                  ]}
                />
              </View>
            </View>
          </Animated.View>
        )}
        </ScrollView>
      )}

      {/* Attachments Preview */}
      {attachments.length > 0 && (
        <View style={[styles.attachmentsPreview, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          {attachments.map((attachment, index) => (
            <View key={index} style={styles.attachmentPreviewItem}>
              <Paperclip size={14} color={theme.text} />
              <Text style={[styles.attachmentPreviewText, { color: theme.text }]} numberOfLines={1}>
                {attachment.name} ({Math.round(attachment.size / 1024)} KB)
              </Text>
              <TouchableOpacity onPress={() => removeAttachment(index)}>
                <Text style={[styles.attachmentRemoveText, { color: theme.primary }]}>×</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      {/* Quick Actions (Pro only) */}
      {showQuickActions && subscription?.tier === 'plus' && (
        <View style={styles.quickActionsContainer}>
          <View style={styles.quickActionsRow}>
            <TouchableOpacity
              style={styles.quickActionButton}
              onPress={() => handleQuickAction('clean')}
              disabled={isGenerating}
            >
              <Text style={styles.quickActionText}>✨ Clean</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickActionButton}
              onPress={() => handleQuickAction('explain')}
              disabled={isGenerating}
            >
              <Text style={styles.quickActionText}>🧠 Explain</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickActionButton}
              onPress={() => handleQuickAction('fix')}
              disabled={isGenerating}
            >
              <Text style={styles.quickActionText}>🛠 Fix</Text>
            </TouchableOpacity>

            {detectedContentType === 'text' && (
              <TouchableOpacity
                style={styles.quickActionButton}
                onPress={() => handleQuickAction('image')}
                disabled={isGenerating}
              >
                <Text style={styles.quickActionText}>🎨 Generate Image</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}

      {/* Input Area - White Space style */}
      <View style={[styles.inputContainer, { backgroundColor: theme.background }]}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={[styles.input, { backgroundColor: theme.surface, borderColor: theme.border, color: theme.text }]}
            placeholder="Drop your noise here..."
            placeholderTextColor={theme.placeholder}
            value={inputText}
            onChangeText={setInputText}
            multiline
            editable={!isGenerating}
            onSubmitEditing={sendMessage}
          />

          <View style={styles.inputActions}>
            <TouchableOpacity
              style={[styles.actionButton, { opacity: inputText.trim() ? 0 : 1 }]}
              onPress={handleVoicePress}
              disabled={!!inputText.trim() || isGenerating}
            >
              <Mic size={20} color={theme.icon} />
            </TouchableOpacity>

            {/* Image Generation Button (Pro only) */}
            {subscription?.tier === 'plus' ? (
              <TouchableOpacity
                style={[styles.actionButton]}
                onPress={() => setShowImageGenerator(true)}
                disabled={isGenerating}
              >
                <Sparkles size={20} color={theme.icon} />
              </TouchableOpacity>
            ) : null}

            {isGenerating ? (
              <TouchableOpacity
                style={[styles.stopButton, { backgroundColor: '#dc3545' }]}
                onPress={handleStopGeneration}
              >
                <Text style={styles.stopButtonText}>Stop</Text>
              </TouchableOpacity>
            ) : (
            <>
              <TouchableOpacity
                style={[styles.actionButton, { opacity: 1 }]}
                onPress={pickDocument}
                disabled={isGenerating}
              >
                <Paperclip size={20} color={theme.icon} />
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.sendButton,
                  {
                      backgroundColor: (inputText.trim() || attachments.length > 0) ? theme.primary : theme.disabled,
                  }
                ]}
                onPress={sendMessage}
                  disabled={!inputText.trim() && attachments.length === 0}
              >
                <Send size={20} color="#fff" />
              </TouchableOpacity>
            </>
            )}
          </View>
        </View>
      </View>

      {/* Authentication Modal */}
      <Modal
        visible={showAuthModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAuthModal(false)}
      >
        <View style={styles.authModalOverlay}>
          <View style={[styles.authModal, { backgroundColor: theme.background }]}>
            <Text style={[styles.authModalTitle, { color: theme.text }]}>
              Login to White Space
            </Text>

            <TextInput
              style={[styles.authInput, { backgroundColor: theme.surface, borderColor: theme.border, color: theme.text }]}
              placeholder="Email"
              placeholderTextColor={theme.placeholder}
              value={loginEmail}
              onChangeText={setLoginEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <TextInput
              style={[styles.authInput, { backgroundColor: theme.surface, borderColor: theme.border, color: theme.text }]}
              placeholder="Password"
              placeholderTextColor={theme.placeholder}
              value={loginPassword}
              onChangeText={setLoginPassword}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
            />

            <View style={styles.authButtons}>
              <TouchableOpacity
                style={[styles.authButtonCancel, { borderColor: theme.border }]}
                onPress={() => {
                  setShowAuthModal(false);
                  setLoginEmail('');
                  setLoginPassword('');
                }}
                disabled={isAuthenticating}
              >
                <Text style={[styles.authButtonText, { color: theme.text }]}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.authButtonLogin,
                  {
                    backgroundColor: isAuthenticating ? theme.disabled : theme.primary,
                  }
                ]}
                onPress={handleLogin}
                disabled={isAuthenticating}
              >
                <Text style={styles.authButtonTextLogin}>
                  {isAuthenticating ? 'Logging in...' : 'Login'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Subscription Screen Modal */}
      <Modal
        visible={showSubscriptionManager}
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={() => setShowSubscriptionManager(false)}
      >
        <SubscriptionScreen
          onClose={() => setShowSubscriptionManager(false)}
          onSubscriptionUpdate={() => {
            // Refresh subscription data
            loadSubscriptionData();
          }}
        />
      </Modal>

      {/* Image Generator Modal */}
      <Modal
        visible={showImageGenerator}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowImageGenerator(false)}
      >
        <ImageGenerator
          onClose={() => setShowImageGenerator(false)}
          onImageGenerated={(images) => {
            // Add generated images to chat
            const imageMessage: Message = {
              role: 'assistant',
              content: `I've generated ${images.length} image${images.length > 1 ? 's' : ''} based on your description. Here ${images.length > 1 ? 'they are' : 'it is'}:`,
              id: Date.now().toString(),
              timestamp: new Date(),
              attachments: images.map(img => ({
                uri: img.url,
                type: 'image',
                name: `Generated Image ${img.id}`,
                size: 0, // We'll calculate this later if needed
              }))
            };
            setMessages(prev => [...prev, imageMessage]);
            setShowImageGenerator(false);
          }}
        />
      </Modal>

      {/* Admin Panel Modal */}
      <Modal
        visible={showAdminPanel}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowAdminPanel(false)}
      >
        <AdminPanel onClose={() => setShowAdminPanel(false)} />
      </Modal>

      {/* Voice Input Overlay */}
      <VoiceInput
        isVisible={showVoiceInput}
        onTranscript={handleVoiceTranscript}
        onClose={() => setShowVoiceInput(false)}
      />

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// White Space Theme - minimalist architect aesthetic
const theme = {
  background: '#fdfdfd', // Off-white for eye comfort
  surface: '#ffffff',   // Clean white surfaces
  text: '#000000',      // Black text
  textSecondary: '#666666', // Subtle secondary text
  placeholder: '#999999',   // Muted placeholder text
  border: '#e0e0e0',        // Subtle breathing line
  userBubble: '#000000',    // Black bubbles for user messages
  userText: '#ffffff',      // White text on black
  assistantBubble: 'transparent', // Transparent bubbles for assistant (White Space style)
  assistantText: '#333333',   // Dark gray text
  inputBackground: '#ffffff', // White input background
  primary: '#000000',         // Black buttons
  disabled: '#cccccc',        // Light gray for disabled
  icon: '#666666',           // Subtle icon color
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdfdfd', // Off-white for eye comfort
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24, // Same as login page
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5', // Same as login page
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerIconButton: {
    padding: 8,
  },
  upgradeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f7f7f8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  upgradeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  chatDrawerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2000,
  },
  chatDrawerBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    flexDirection: 'row',
  },
  chatDrawer: {
    width: '80%',
    maxWidth: 300,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  newChatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    gap: 12,
  },
  newChatText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  chatHistorySection: {
    flex: 1,
    paddingTop: 8,
  },
  chatHistoryTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  chatHistoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  currentChatItem: {
    backgroundColor: '#f7f7f8',
  },
  chatHistoryItemText: {
    fontSize: 14,
    color: '#000',
    flex: 1,
    marginRight: 12,
  },
  chatHistoryTime: {
    fontSize: 12,
    color: '#666',
  },
  headerRight: {
    width: 40,
  },
  authButton: {
    padding: 8,
  },
  authModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  authModal: {
    width: '90%',
    maxWidth: 400,
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 10,
  },
  authModalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  authInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    marginBottom: 16,
  },
  authButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  authButtonCancel: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  authButtonLogin: {
    flex: 1,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  authButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  authButtonTextLogin: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 24, // Same as login page
    paddingBottom: 32,
  },
  messageWrapper: {
    marginBottom: 20,
    width: '100%',
  },
  userMessageWrapper: {
    alignItems: 'flex-end',
  },
  assistantMessageWrapper: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    maxWidth: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  userBubble: {
    backgroundColor: '#000',
    borderColor: '#000',
    alignSelf: 'flex-end',
  },
  assistantBubble: {
    backgroundColor: 'transparent',
    borderColor: '#e0e0e0',
    alignSelf: 'flex-start',
    borderLeftWidth: 2,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    paddingLeft: 20,
  },
  messageText: {
    fontSize: 16, // Same as login inputs
    lineHeight: 22,
    color: '#000',
  },
  inputContainer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    paddingBottom: 34, // Extra bottom padding for safe area
  },
  inputWrapper: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    padding: 4,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    maxHeight: 100,
    color: '#000',
  },
  inputActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingRight: 8,
  },
  actionButton: {
    padding: 8,
  },
  sendButton: {
    backgroundColor: '#000',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stopButton: {
    backgroundColor: '#dc3545',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 60,
  },
  stopButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  attachmentsContainer: {
    marginTop: 8,
    gap: 4,
  },
  attachmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 6,
    gap: 8,
  },
  attachmentText: {
    fontSize: 14,
    flex: 1,
  },
  attachmentsPreview: {
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    padding: 12,
  },
  attachmentPreviewItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  attachmentPreviewText: {
    flex: 1,
    fontSize: 14,
  },
  attachmentRemoveText: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 4,
  },
  breathingLoader: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  breathingDot: {
    width: 8,
    height: 8,
    backgroundColor: '#d1d1d1',
    borderRadius: 4,
  },
  speakButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    padding: 6,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  landingPage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 24,
  },
  landingTitle: {
    fontSize: 32,
    fontWeight: '300',
    color: '#888',
    marginBottom: 16,
    textAlign: 'center',
  },
  landingSubtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  quickActionsContainer: {
    marginHorizontal: 20,
    marginBottom: 16,
  },
  quickActionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  quickActionButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    minWidth: 80,
    alignItems: 'center',
  },
  quickActionText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
