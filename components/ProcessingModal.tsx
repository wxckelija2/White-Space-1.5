import { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Modal } from 'react-native';
import { Sparkles, FileText, Image, Video } from 'lucide-react-native';

interface ProcessingModalProps {
  visible: boolean;
}

export default function ProcessingModal({ visible }: ProcessingModalProps) {
  const fadeAnim1 = useRef(new Animated.Value(0)).current;
  const fadeAnim2 = useRef(new Animated.Value(0)).current;
  const fadeAnim3 = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    if (visible) {
      Animated.sequence([
        Animated.parallel([
          Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim1, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
        ]),
        Animated.timing(fadeAnim2, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim3, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start();

      Animated.loop(
        Animated.sequence([
          Animated.timing(fadeAnim1, {
            toValue: 0.4,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim1, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [visible, fadeAnim1, fadeAnim2, fadeAnim3, scaleAnim]);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.container,
            { transform: [{ scale: scaleAnim }] },
          ]}>
          <View style={styles.iconContainer}>
            <Sparkles size={40} color="#000" />
          </View>

          <Text style={styles.title}>Generating your assets</Text>
          <Text style={styles.description}>
            Creating multiple outputs from your input
          </Text>

          <View style={styles.progressContainer}>
            <Animated.View style={[styles.progressCard, { opacity: fadeAnim1 }]}>
              <FileText size={20} color="#666" />
              <Text style={styles.progressText}>Slide Deck</Text>
            </Animated.View>

            <Animated.View style={[styles.progressCard, { opacity: fadeAnim2 }]}>
              <Image size={20} color="#666" />
              <Text style={styles.progressText}>Social Image</Text>
            </Animated.View>

            <Animated.View style={[styles.progressCard, { opacity: fadeAnim3 }]}>
              <Video size={20} color="#666" />
              <Text style={styles.progressText}>Video Clip</Text>
            </Animated.View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 32,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
  },
  progressContainer: {
    width: '100%',
    gap: 12,
  },
  progressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
});
