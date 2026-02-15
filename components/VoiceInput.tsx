import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Mic, MicOff, X } from 'lucide-react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system/legacy';
import { supabase } from '@/lib/supabase';

interface VoiceInputProps {
  onTranscript: (text: string) => void;
  onClose: () => void;
  isVisible: boolean;
}

export default function VoiceInput({ onTranscript, onClose, isVisible }: VoiceInputProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const durationInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  
  // Animation values
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const waveAnim1 = useRef(new Animated.Value(0.3)).current;
  const waveAnim2 = useRef(new Animated.Value(0.3)).current;
  const waveAnim3 = useRef(new Animated.Value(0.3)).current;
  const waveAnim4 = useRef(new Animated.Value(0.3)).current;
  const waveAnim5 = useRef(new Animated.Value(0.3)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
      checkPermissions();
    } else {
      fadeAnim.setValue(0);
      setRecordingDuration(0);
    }
  }, [isVisible]);

  useEffect(() => {
    if (isRecording) {
      startPulseAnimation();
      startWaveAnimation();
      // Start duration counter
      durationInterval.current = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
    } else {
      pulseAnim.setValue(1);
      resetWaveAnimations();
      if (durationInterval.current) {
        clearInterval(durationInterval.current);
        durationInterval.current = null;
      }
    }
    
    return () => {
      if (durationInterval.current) {
        clearInterval(durationInterval.current);
      }
    };
  }, [isRecording]);

  const resetWaveAnimations = () => {
    waveAnim1.setValue(0.3);
    waveAnim2.setValue(0.3);
    waveAnim3.setValue(0.3);
    waveAnim4.setValue(0.3);
    waveAnim5.setValue(0.3);
  };

  const startPulseAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.15,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const startWaveAnimation = () => {
    const createWave = (anim: Animated.Value, delay: number, maxHeight: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(anim, {
            toValue: maxHeight,
            duration: 200 + Math.random() * 100,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0.2 + Math.random() * 0.2,
            duration: 200 + Math.random() * 100,
            useNativeDriver: true,
          }),
        ])
      );
    };

    Animated.parallel([
      createWave(waveAnim1, 0, 0.6 + Math.random() * 0.4),
      createWave(waveAnim2, 50, 0.8 + Math.random() * 0.2),
      createWave(waveAnim3, 100, 1),
      createWave(waveAnim4, 150, 0.8 + Math.random() * 0.2),
      createWave(waveAnim5, 200, 0.6 + Math.random() * 0.4),
    ]).start();
  };

  const checkPermissions = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      setPermissionGranted(status === 'granted');
      if (status !== 'granted') {
        Alert.alert(
          'Microphone Access',
          'White Space needs microphone access for voice input. Please enable it in Settings.',
          [{ text: 'OK', onPress: onClose }]
        );
      }
    } catch (error) {
      console.error('Error checking permissions:', error);
    }
  };

  const startRecording = async () => {
    try {
      setRecordingDuration(0);
      
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync({
        android: {
          extension: '.m4a',
          outputFormat: Audio.AndroidOutputFormat.MPEG_4,
          audioEncoder: Audio.AndroidAudioEncoder.AAC,
          sampleRate: 16000,
          numberOfChannels: 1,
          bitRate: 128000,
        },
        ios: {
          extension: '.m4a',
          audioQuality: Audio.IOSAudioQuality.HIGH,
          sampleRate: 16000,
          numberOfChannels: 1,
          bitRate: 128000,
          linearPCMBitDepth: 16,
          linearPCMIsBigEndian: false,
          linearPCMIsFloat: false,
        },
        web: {
          mimeType: 'audio/webm',
          bitsPerSecond: 128000,
        },
      });
      
      setRecording(recording);
      setIsRecording(true);
    } catch (error) {
      console.error('Failed to start recording:', error);
      Alert.alert('Error', 'Failed to start recording. Please try again.');
    }
  };

  const stopRecording = async () => {
    if (!recording) return;

    setIsRecording(false);
    setIsProcessing(true);
    
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(null);

      if (uri && recordingDuration >= 1) {
        // Send to speech-to-text service
        const transcript = await transcribeAudio(uri);
        
        if (transcript && transcript.trim()) {
          onTranscript(transcript);
          onClose();
        } else {
          Alert.alert(
            'No Speech Detected',
            'I couldn\'t hear anything. Please try again and speak clearly.',
            [{ text: 'OK' }]
          );
        }
      } else if (recordingDuration < 1) {
        Alert.alert(
          'Recording Too Short',
          'Please hold the button and speak for at least 1 second.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Failed to stop recording:', error);
      Alert.alert('Error', 'Failed to process recording. Please try again.');
    } finally {
      setIsProcessing(false);
      setRecordingDuration(0);
    }
  };

  const transcribeAudio = async (uri: string): Promise<string> => {
    try {
      // Read the audio file as base64
      const base64Audio = await FileSystem.readAsStringAsync(uri, {
        encoding: 'base64',
      });

      // Try to use Supabase Edge Function for transcription
      const { data, error } = await supabase.functions.invoke('speech-to-text', {
        body: {
          audio: base64Audio,
          format: 'm4a',
        },
      });

      if (error) {
        console.warn('Speech-to-text service error:', error);
        // Fallback: Return empty to trigger "no speech detected"
        return '';
      }

      return data?.text || '';
    } catch (error) {
      console.error('Transcription error:', error);
      return '';
    }
  };

  const handleMicPress = () => {
    if (isProcessing) return;
    
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isVisible) return null;

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.overlay}>
        {/* Close button */}
        <TouchableOpacity 
          style={styles.closeButton} 
          onPress={onClose}
          disabled={isProcessing}
        >
          <X size={24} color="#666" />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.title}>
          {isProcessing 
            ? 'Processing...' 
            : isRecording 
              ? 'Listening...' 
              : 'Tap to speak'}
        </Text>

        {/* Duration */}
        {isRecording && (
          <Text style={styles.duration}>{formatDuration(recordingDuration)}</Text>
        )}

        {/* Wave animation bars */}
        {(isRecording || isProcessing) && (
          <View style={styles.waveContainer}>
            {isProcessing ? (
              <ActivityIndicator size="large" color="#000" />
            ) : (
              <>
                <Animated.View
                  style={[
                    styles.waveBar,
                    { transform: [{ scaleY: waveAnim1 }] },
                  ]}
                />
                <Animated.View
                  style={[
                    styles.waveBar,
                    styles.waveBarTall,
                    { transform: [{ scaleY: waveAnim2 }] },
                  ]}
                />
                <Animated.View
                  style={[
                    styles.waveBar,
                    styles.waveBarTallest,
                    { transform: [{ scaleY: waveAnim3 }] },
                  ]}
                />
                <Animated.View
                  style={[
                    styles.waveBar,
                    styles.waveBarTall,
                    { transform: [{ scaleY: waveAnim4 }] },
                  ]}
                />
                <Animated.View
                  style={[
                    styles.waveBar,
                    { transform: [{ scaleY: waveAnim5 }] },
                  ]}
                />
              </>
            )}
          </View>
        )}

        {/* Mic button with pulse animation */}
        <Animated.View
          style={[
            styles.micButtonContainer,
            { transform: [{ scale: pulseAnim }] },
          ]}
        >
          <TouchableOpacity
            style={[
              styles.micButton,
              isRecording && styles.micButtonRecording,
              isProcessing && styles.micButtonProcessing,
            ]}
            onPress={handleMicPress}
            activeOpacity={0.8}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : isRecording ? (
              <MicOff size={32} color="#fff" />
            ) : (
              <Mic size={32} color="#fff" />
            )}
          </TouchableOpacity>
        </Animated.View>

        {/* Hint text */}
        <Text style={styles.hint}>
          {isProcessing 
            ? 'Converting speech to text...'
            : isRecording 
              ? 'Tap to stop recording' 
              : 'Tap and speak clearly'}
        </Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
  },
  overlay: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  closeButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    padding: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    marginBottom: 16,
  },
  duration: {
    fontSize: 18,
    fontWeight: '500',
    color: '#EF4444',
    marginBottom: 24,
  },
  waveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    marginBottom: 40,
    gap: 8,
  },
  waveBar: {
    width: 6,
    height: 40,
    backgroundColor: '#000',
    borderRadius: 3,
  },
  waveBarTall: {
    height: 60,
  },
  waveBarTallest: {
    height: 80,
  },
  micButtonContainer: {
    marginBottom: 30,
  },
  micButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  micButtonRecording: {
    backgroundColor: '#EF4444',
  },
  micButtonProcessing: {
    backgroundColor: '#666',
  },
  hint: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});
