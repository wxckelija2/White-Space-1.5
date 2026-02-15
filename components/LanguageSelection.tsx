import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { setUserLanguage } from '@/lib/auth-functions';
import { Globe, Check } from 'lucide-react-native';

// Comprehensive list of 50+ languages
const languages = [
  // Major world languages
  { code: 'en', name: 'English', native: 'English' },
  { code: 'es', name: 'Spanish', native: 'Español' },
  { code: 'fr', name: 'French', native: 'Français' },
  { code: 'de', name: 'German', native: 'Deutsch' },
  { code: 'it', name: 'Italian', native: 'Italiano' },
  { code: 'pt', name: 'Portuguese', native: 'Português' },
  { code: 'ru', name: 'Russian', native: 'Русский' },
  { code: 'ja', name: 'Japanese', native: '日本語' },
  { code: 'ko', name: 'Korean', native: '한국어' },
  { code: 'zh', name: 'Chinese (Simplified)', native: '中文 (简体)' },
  { code: 'zh-TW', name: 'Chinese (Traditional)', native: '中文 (繁體)' },
  { code: 'ar', name: 'Arabic', native: 'العربية' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা' },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
  { code: 'ur', name: 'Urdu', native: 'اردو' },

  // European languages
  { code: 'nl', name: 'Dutch', native: 'Nederlands' },
  { code: 'sv', name: 'Swedish', native: 'Svenska' },
  { code: 'da', name: 'Danish', native: 'Dansk' },
  { code: 'no', name: 'Norwegian', native: 'Norsk' },
  { code: 'fi', name: 'Finnish', native: 'Suomi' },
  { code: 'pl', name: 'Polish', native: 'Polski' },
  { code: 'cs', name: 'Czech', native: 'Čeština' },
  { code: 'sk', name: 'Slovak', native: 'Slovenčina' },
  { code: 'hu', name: 'Hungarian', native: 'Magyar' },
  { code: 'ro', name: 'Romanian', native: 'Română' },
  { code: 'bg', name: 'Bulgarian', native: 'Български' },
  { code: 'hr', name: 'Croatian', native: 'Hrvatski' },
  { code: 'sl', name: 'Slovenian', native: 'Slovenščina' },
  { code: 'et', name: 'Estonian', native: 'Eesti' },
  { code: 'lv', name: 'Latvian', native: 'Latviešu' },
  { code: 'lt', name: 'Lithuanian', native: 'Lietuvių' },
  { code: 'el', name: 'Greek', native: 'Ελληνικά' },
  { code: 'tr', name: 'Turkish', native: 'Türkçe' },

  // Asian languages
  { code: 'th', name: 'Thai', native: 'ไทย' },
  { code: 'vi', name: 'Vietnamese', native: 'Tiếng Việt' },
  { code: 'id', name: 'Indonesian', native: 'Bahasa Indonesia' },
  { code: 'ms', name: 'Malay', native: 'Bahasa Melayu' },
  { code: 'fil', name: 'Filipino', native: 'Filipino' },
  { code: 'he', name: 'Hebrew', native: 'עברית' },
  { code: 'fa', name: 'Persian', native: 'فارسی' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },

  // African languages
  { code: 'sw', name: 'Swahili', native: 'Kiswahili' },
  { code: 'am', name: 'Amharic', native: 'አማርኛ' },
  { code: 'ha', name: 'Hausa', native: 'هَوُسَ' },
  { code: 'yo', name: 'Yoruba', native: 'Yorùbá' },
  { code: 'zu', name: 'Zulu', native: 'isiZulu' },
  { code: 'af', name: 'Afrikaans', native: 'Afrikaans' },

  // Other languages
  { code: 'uk', name: 'Ukrainian', native: 'Українська' },
  { code: 'sr', name: 'Serbian', native: 'Српски' },
  { code: 'mk', name: 'Macedonian', native: 'Македонски' },
  { code: 'sq', name: 'Albanian', native: 'Shqip' },
  { code: 'is', name: 'Icelandic', native: 'Íslenska' },
  { code: 'ga', name: 'Irish', native: 'Gaeilge' },
  { code: 'cy', name: 'Welsh', native: 'Cymraeg' },
  { code: 'eu', name: 'Basque', native: 'Euskera' },
  { code: 'ca', name: 'Catalan', native: 'Català' },
];

interface LanguageSelectionProps {
  onComplete: () => void;
}

export default function LanguageSelection({ onComplete }: LanguageSelectionProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Auto-detect language on mount
  useEffect(() => {
    detectUserLanguage();
  }, []);

  const detectUserLanguage = async () => {
    try {
      // Try to detect from browser/device language
      // In a real app, you'd use react-native-localize or similar
      // For now, we'll use a simple detection based on common patterns

      const detectedLanguage = await simpleLanguageDetection();
      setSelectedLanguage(detectedLanguage);

      const languageName = languages.find(l => l.code === detectedLanguage)?.name || 'English';

      // Show detection message
      Alert.alert(
        'Language Detected',
        `We detected you're using ${languageName}. You can change this below.`,
        [{ text: 'OK' }]
      );
    } catch (error) {
      console.error('Language detection failed:', error);
      setSelectedLanguage('en'); // Default to English
    }
  };

  // Simple language detection based on common patterns
  const simpleLanguageDetection = async (): Promise<string> => {
    // In a real implementation, you'd use device locale APIs
    // For demo purposes, we'll simulate detection

    // Check if running in browser (web version)
    if (typeof window !== 'undefined' && navigator) {
      const browserLang = navigator.language || 'en';

      // Map browser language codes to our supported languages
      const langMap: { [key: string]: string } = {
        'en': 'en',
        'en-US': 'en',
        'en-GB': 'en',
        'es': 'es',
        'es-ES': 'es',
        'es-MX': 'es',
        'fr': 'fr',
        'fr-FR': 'fr',
        'de': 'de',
        'de-DE': 'de',
        'it': 'it',
        'pt': 'pt',
        'pt-BR': 'pt',
        'ru': 'ru',
        'ja': 'ja',
        'ko': 'ko',
        'zh': 'zh',
        'zh-CN': 'zh',
        'zh-TW': 'zh-TW',
        'ar': 'ar',
        'hi': 'hi',
        'bn': 'bn',
        'pa': 'pa',
        'ur': 'ur',
      };

      return langMap[browserLang] || 'en';
    }

    // For React Native, default to English
    // In production, you'd use libraries like:
    // - react-native-localize (iOS/Android)
    // - expo-localization
    return 'en';
  };

  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLanguage(languageCode);
  };

  const handleContinue = async () => {
    if (!selectedLanguage) {
      Alert.alert('Error', 'Please select a language to continue');
      return;
    }

    setLoading(true);
    try {
      // Save language preference
      await setUserLanguage(selectedLanguage);

      Alert.alert(
        'Welcome to White Space!',
        `Language set to ${languages.find(l => l.code === selectedLanguage)?.name}`,
        [{ text: 'Continue', onPress: onComplete }]
      );
    } catch (error: any) {
      console.error('Error saving language preference:', error);
      Alert.alert('Error', 'Failed to save language preference. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Globe size={48} color="#000" />
          <Text style={styles.title}>Choose Your Language</Text>
          <Text style={styles.subtitle}>
            Select your preferred language for the best White Space experience
          </Text>
        </View>

        <ScrollView style={styles.languageList} showsVerticalScrollIndicator={false}>
          {languages.map((language) => (
            <TouchableOpacity
              key={language.code}
              style={[
                styles.languageItem,
                selectedLanguage === language.code && styles.selectedLanguageItem,
              ]}
              onPress={() => handleLanguageSelect(language.code)}
            >
              <View style={styles.languageInfo}>
                <Text style={styles.languageName}>{language.name}</Text>
                <Text style={styles.languageNative}>{language.native}</Text>
              </View>
              {selectedLanguage === language.code && (
                <View style={styles.checkIcon}>
                  <Check size={20} color="#000" />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.continueButton, !selectedLanguage && styles.disabledButton]}
            onPress={handleContinue}
            disabled={!selectedLanguage || loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.continueButtonText}>Continue to White Space</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  languageList: {
    flex: 1,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  selectedLanguageItem: {
    borderColor: '#000',
    backgroundColor: '#f8f9fa',
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 2,
  },
  languageNative: {
    fontSize: 14,
    color: '#666',
  },
  checkIcon: {
    padding: 8,
  },
  footer: {
    marginTop: 24,
  },
  continueButton: {
    backgroundColor: '#000',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});