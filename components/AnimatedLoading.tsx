import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

interface AnimatedLoadingProps {
  size?: number;
  color?: string;
}

export default function AnimatedLoading({
  size = 40,
  color = '#000'
}: AnimatedLoadingProps) {
  const spinAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    // Continuous rotation
    const spinAnimation = Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    );
    spinAnimation.start();

    // Pulsing opacity
    const fadeAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.3,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    );
    fadeAnimation.start();

    return () => {
      spinAnimation.stop();
      fadeAnimation.stop();
    };
  }, []);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Animated.View
        style={[
          styles.spinner,
          {
            width: size,
            height: size,
            borderColor: color,
            borderTopColor: 'transparent',
            transform: [{ rotate: spin }],
            opacity: fadeAnim,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    borderWidth: 3,
    borderRadius: 50,
  },
});
