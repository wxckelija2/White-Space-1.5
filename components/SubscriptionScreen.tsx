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
import { X, Check, Zap } from 'lucide-react-native';
import { upgradeSubscription } from '@/lib/stripe';
import { supabase } from '@/lib/supabase';

interface SubscriptionScreenProps {
  onClose: () => void;
  onSubscriptionUpdate?: () => void;
}

const FeatureItem = ({ text }: { text: string }) => (
  <View style={styles.featureItem}>
    <Check size={18} color="#000" strokeWidth={2.5} />
    <Text style={styles.featureText}>{text}</Text>
  </View>
);

export default function SubscriptionScreen({ onClose, onSubscriptionUpdate }: SubscriptionScreenProps) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const handleSubscribe = async () => {
    if (!user) {
      Alert.alert('Sign In Required', 'Please sign in to subscribe.');
      return;
    }

    setLoading(true);

    Alert.alert(
      'Confirm Subscription',
      'Subscribe to White Space Pro for $20/month?\n\nYou can cancel anytime.',
      [
        { 
          text: 'Cancel', 
          style: 'cancel', 
          onPress: () => setLoading(false)
        },
        {
          text: 'Subscribe',
          onPress: async () => {
            try {
              await upgradeSubscription(user.id, 'plus');
              Alert.alert(
                'Welcome to Pro! 🎉',
                'You now have access to all premium features.',
                [{ text: 'Continue', onPress: () => {
                  if (onSubscriptionUpdate) onSubscriptionUpdate();
                  onClose();
                }}]
              );
            } catch (error: any) {
              Alert.alert('Error', error.message);
            } finally {
              setLoading(false);
            }
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <X size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Icon */}
        <View style={styles.iconContainer}>
          <View style={styles.iconCircle}>
            <Zap size={32} color="#000" strokeWidth={1.5} />
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>White Space Pro</Text>
        <Text style={styles.subtitle}>Unlock your full potential</Text>

        {/* Price */}
        <View style={styles.priceContainer}>
          <Text style={styles.price}>$20</Text>
          <Text style={styles.pricePeriod}>/month</Text>
        </View>

        {/* Features */}
        <View style={styles.featuresContainer}>
          <FeatureItem text="Unlimited messages" />
          <FeatureItem text="Extended context memory" />
          <FeatureItem text="AI image generation" />
          <FeatureItem text="Priority response times" />
          <FeatureItem text="Voice input & output" />
        </View>
      </ScrollView>

      {/* Bottom */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.subscribeButton}
          onPress={handleSubscribe}
          disabled={loading}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.subscribeButtonText}>Subscribe</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.termsText}>
          Subscription renews monthly. Cancel anytime.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  closeButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  iconContainer: {
    marginTop: 40,
    marginBottom: 24,
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 40,
  },
  price: {
    fontSize: 48,
    fontWeight: '700',
    color: '#000',
  },
  pricePeriod: {
    fontSize: 18,
    color: '#666',
    marginLeft: 4,
  },
  featuresContainer: {
    width: '100%',
    gap: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureText: {
    fontSize: 16,
    color: '#000',
  },
  bottomContainer: {
    paddingHorizontal: 32,
    paddingBottom: 40,
    paddingTop: 20,
  },
  subscribeButton: {
    backgroundColor: '#000',
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  subscribeButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  termsText: {
    fontSize: 13,
    color: '#999',
    textAlign: 'center',
  },
});
