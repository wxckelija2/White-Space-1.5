import { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  Animated,
  Easing,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/lib';
import { supabase } from '@/lib/supabase';
import { createInitialSubscription } from '@/lib/stripe';
import LanguageSelection from '@/components/LanguageSelection';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showLanguageSelection, setShowLanguageSelection] = useState(false);
  const { signIn, signUp } = useAuth();
  const router = useRouter();

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const logoScale = useRef(new Animated.Value(0.3)).current;
  const logoRotate = useRef(new Animated.Value(0)).current;
  const formOpacity = useRef(new Animated.Value(0)).current;
  const formSlide = useRef(new Animated.Value(30)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;
  
  // Floating orbs animation
  const orb1Anim = useRef(new Animated.Value(0)).current;
  const orb2Anim = useRef(new Animated.Value(0)).current;
  const orb3Anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Entrance animation sequence
    Animated.sequence([
      // Logo entrance with bounce
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1,
          friction: 4,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.timing(logoRotate, {
          toValue: 1,
          duration: 800,
          easing: Easing.out(Easing.back(1.5)),
          useNativeDriver: true,
        }),
      ]),
      // Title and subtitle fade in
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 600,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
      // Form slides up
      Animated.parallel([
        Animated.timing(formOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(formSlide, {
          toValue: 0,
          duration: 500,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // Floating orbs continuous animation
    const createOrbAnimation = (anim: Animated.Value, duration: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: 1,
            duration: duration,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: duration,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ])
      );
    };

    createOrbAnimation(orb1Anim, 3000).start();
    createOrbAnimation(orb2Anim, 4000).start();
    createOrbAnimation(orb3Anim, 3500).start();
  }, []);

  // Button press animation
  const animateButtonPress = () => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert('Missing Information', 'Please enter your email and password');
      return;
    }

    if (isSignUp && password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match');
      return;
    }

    if (isSignUp && password.length < 6) {
      Alert.alert('Weak Password', 'Password must be at least 6 characters');
      return;
    }

    animateButtonPress();
    setLoading(true);
    
    try {
      if (isSignUp) {
        const newUser = await signUp(email, password);

        // Create initial user settings for new users
        if (newUser?.id) {
          try {
            await supabase
              .from('user_settings')
              .insert({
                user_id: newUser.id,
                preferences: { language: 'en' },
              });
          } catch (settingsError) {
            console.error('Failed to create user settings:', settingsError);
          }

          // Create initial free subscription for new users
          try {
            await createInitialSubscription(newUser.id, 'basic');
          } catch (subscriptionError) {
            console.error('Failed to create initial subscription:', subscriptionError);
          }
        }

        // Show language selection for new users
        setShowLanguageSelection(true);
      } else {
        await signIn(email, password);
        router.replace('/(tabs)');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Toggle between sign in and sign up with animation
  const toggleAuthMode = () => {
    Animated.sequence([
      Animated.timing(formOpacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(formOpacity, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
    setIsSignUp(!isSignUp);
    setConfirmPassword('');
  };

  // Show language selection for new users after signup
  if (showLanguageSelection) {
    return (
      <LanguageSelection
        onComplete={() => {
          setShowLanguageSelection(false);
          Alert.alert(
            'Welcome to White Space!',
            'Your account is ready. Check your email to verify.',
            [{ text: 'Get Started', onPress: () => router.replace('/(tabs)') }]
          );
        }}
      />
    );
  }

  // Orb positions
  const orb1TranslateY = orb1Anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20],
  });
  const orb2TranslateY = orb2Anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 15],
  });
  const orb3TranslateY = orb3Anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -12],
  });

  const logoRotation = logoRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Floating background orbs */}
      <Animated.View
        style={[
          styles.orb,
          styles.orb1,
          { transform: [{ translateY: orb1TranslateY }] },
        ]}
      />
      <Animated.View
        style={[
          styles.orb,
          styles.orb2,
          { transform: [{ translateY: orb2TranslateY }] },
        ]}
      />
      <Animated.View
        style={[
          styles.orb,
          styles.orb3,
          { transform: [{ translateY: orb3TranslateY }] },
        ]}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          {/* Logo */}
          <View style={styles.header}>
            <Animated.View
              style={[
                styles.logoContainer,
                {
                  transform: [
                    { scale: logoScale },
                  ],
                },
              ]}
            >
              <Image
                source={require('../assets/images/logo.png')}
                style={styles.logoImage}
                resizeMode="contain"
              />
            </Animated.View>

            <Animated.Text
              style={[
                styles.title,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              White Space
            </Animated.Text>
            <Animated.Text
              style={[
                styles.subtitle,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              {isSignUp ? 'Create your space' : 'Welcome back'}
            </Animated.Text>
          </View>

          {/* Form */}
          <Animated.View
            style={[
              styles.form,
              {
                opacity: formOpacity,
                transform: [{ translateY: formSlide }],
              },
            ]}
          >
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="you@example.com"
                placeholderTextColor="#a0a0a0"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor="#a0a0a0"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {isSignUp && (
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Confirm Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor="#a0a0a0"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            )}

            <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
              <TouchableOpacity
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleAuth}
                disabled={loading}
                activeOpacity={0.9}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>
                    {isSignUp ? 'Create Account' : 'Sign In'}
                  </Text>
                )}
              </TouchableOpacity>
            </Animated.View>

            <TouchableOpacity
              style={styles.switchButton}
              onPress={toggleAuthMode}
            >
              <Text style={styles.switchText}>
                {isSignUp
                  ? 'Already have an account? '
                  : "Don't have an account? "}
                <Text style={styles.switchTextBold}>
                  {isSignUp ? 'Sign In' : 'Sign Up'}
                </Text>
              </Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Footer */}
          <Animated.View
            style={[
              styles.footer,
              { opacity: formOpacity },
            ]}
          >
            <Text style={styles.footerText}>
              By continuing, you agree to our Terms & Privacy Policy
            </Text>
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  keyboardView: {
    flex: 1,
  },
  // Floating orbs
  orb: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.08,
  },
  orb1: {
    width: 300,
    height: 300,
    backgroundColor: '#000',
    top: -100,
    right: -100,
  },
  orb2: {
    width: 200,
    height: 200,
    backgroundColor: '#000',
    bottom: 100,
    left: -80,
  },
  orb3: {
    width: 150,
    height: 150,
    backgroundColor: '#000',
    bottom: -50,
    right: 50,
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoContainer: {
    width: 120,
    height: 120,
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: 120,
    height: 120,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#000',
    letterSpacing: -1,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 17,
    color: '#666',
    fontWeight: '400',
  },
  form: {
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    backgroundColor: '#f8f8f8',
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 16,
    fontSize: 16,
    color: '#000',
    borderWidth: 1.5,
    borderColor: '#e8e8e8',
  },
  button: {
    backgroundColor: '#000',
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  switchButton: {
    alignItems: 'center',
    marginTop: 28,
    padding: 12,
  },
  switchText: {
    color: '#666',
    fontSize: 15,
  },
  switchTextBold: {
    color: '#000',
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    paddingTop: 16,
  },
  footerText: {
    color: '#999',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
  },
});
