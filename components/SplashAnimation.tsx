import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  Easing,
  Image,
} from 'react-native';

const { width, height } = Dimensions.get('window');

interface SplashAnimationProps {
  onAnimationComplete: () => void;
}

export default function SplashAnimation({ onAnimationComplete }: SplashAnimationProps) {
  // Main animations
  const fadeIn = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.3)).current;
  const logoRotate = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textSlide = useRef(new Animated.Value(30)).current;
  const glowPulse = useRef(new Animated.Value(0)).current;
  const containerFade = useRef(new Animated.Value(1)).current;
  
  // Letter animations for "White Space"
  const letters = "White Space".split('').map(() => ({
    opacity: useRef(new Animated.Value(0)).current,
    translateY: useRef(new Animated.Value(20)).current,
  }));

  // Floating dots
  const dots = Array.from({ length: 12 }, (_, i) => ({
    translateX: useRef(new Animated.Value(0)).current,
    translateY: useRef(new Animated.Value(0)).current,
    opacity: useRef(new Animated.Value(0)).current,
    scale: useRef(new Animated.Value(0)).current,
  }));

  // Ring animations
  const ring1Scale = useRef(new Animated.Value(0)).current;
  const ring1Opacity = useRef(new Animated.Value(0.8)).current;
  const ring2Scale = useRef(new Animated.Value(0)).current;
  const ring2Opacity = useRef(new Animated.Value(0.6)).current;
  const ring3Scale = useRef(new Animated.Value(0)).current;
  const ring3Opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    runAnimation();
  }, []);

  const runAnimation = () => {
    // Phase 1: Fade in background
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Phase 2: Logo appears with bounce and slight rotation
    setTimeout(() => {
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1,
          tension: 40,
          friction: 5,
          useNativeDriver: true,
        }),
        Animated.timing(logoRotate, {
          toValue: 1,
          duration: 800,
          easing: Easing.out(Easing.back(1.5)),
          useNativeDriver: true,
        }),
      ]).start();

      // Start glow pulse
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowPulse, {
            toValue: 1,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(glowPulse, {
            toValue: 0,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, 200);

    // Phase 3: Expanding rings
    setTimeout(() => {
      animateRings();
    }, 400);

    // Phase 4: Floating dots burst
    setTimeout(() => {
      animateDots();
    }, 600);

    // Phase 5: Letters appear one by one
    setTimeout(() => {
      animateLetters();
    }, 800);

    // Phase 6: Tagline slides in
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.spring(textSlide, {
          toValue: 0,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    }, 1400);

    // Phase 7: Fade out
    setTimeout(() => {
      Animated.timing(containerFade, {
        toValue: 0,
        duration: 400,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start(() => {
        onAnimationComplete();
      });
    }, 2200);
  };

  const animateRings = () => {
    const ringAnimation = (scale: Animated.Value, opacity: Animated.Value, delay: number) => {
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(scale, {
            toValue: 3,
            duration: 1000,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0,
            duration: 1000,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
        ]).start();
      }, delay);
    };

    ringAnimation(ring1Scale, ring1Opacity, 0);
    ringAnimation(ring2Scale, ring2Opacity, 150);
    ringAnimation(ring3Scale, ring3Opacity, 300);
  };

  const animateDots = () => {
    dots.forEach((dot, i) => {
      const angle = (i / dots.length) * Math.PI * 2;
      const radius = 80 + Math.random() * 60;
      const targetX = Math.cos(angle) * radius;
      const targetY = Math.sin(angle) * radius;

      Animated.parallel([
        Animated.timing(dot.opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(dot.scale, {
          toValue: 0.5 + Math.random() * 0.5,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(dot.translateX, {
          toValue: targetX,
          duration: 600,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(dot.translateY, {
          toValue: targetY,
          duration: 600,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start(() => {
        Animated.parallel([
          Animated.timing(dot.opacity, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(dot.scale, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
        ]).start();
      });
    });
  };

  const animateLetters = () => {
    letters.forEach((letter, i) => {
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(letter.opacity, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true,
          }),
          Animated.spring(letter.translateY, {
            toValue: 0,
            tension: 100,
            friction: 8,
            useNativeDriver: true,
          }),
        ]).start();
      }, i * 50);
    });
  };

  const logoRotation = logoRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['-10deg', '0deg'],
  });

  return (
    <Animated.View style={[styles.container, { opacity: containerFade }]}>
      <Animated.View style={[styles.background, { opacity: fadeIn }]} />

      {/* Expanding rings */}
      <View style={styles.ringsContainer}>
        <Animated.View style={[styles.ring, { 
          transform: [{ scale: ring1Scale }],
          opacity: ring1Opacity,
        }]} />
        <Animated.View style={[styles.ring, { 
          transform: [{ scale: ring2Scale }],
          opacity: ring2Opacity,
        }]} />
        <Animated.View style={[styles.ring, { 
          transform: [{ scale: ring3Scale }],
          opacity: ring3Opacity,
        }]} />
      </View>

      {/* Floating dots */}
      <View style={styles.dotsContainer}>
        {dots.map((dot, i) => (
          <Animated.View
            key={i}
            style={[
              styles.dot,
              {
                opacity: dot.opacity,
                transform: [
                  { translateX: dot.translateX },
                  { translateY: dot.translateY },
                  { scale: dot.scale },
                ],
              },
            ]}
          />
        ))}
      </View>

      {/* Logo with glow */}
      <Animated.View style={[
        styles.logoWrapper,
        {
          transform: [
            { scale: logoScale },
            { rotate: logoRotation },
          ],
        },
      ]}>
        <Animated.View style={[
          styles.logoGlow,
          {
            opacity: glowPulse.interpolate({
              inputRange: [0, 1],
              outputRange: [0.3, 0.8],
            }),
            transform: [{
              scale: glowPulse.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.2],
              }),
            }],
          },
        ]} />
        <View style={styles.logo}>
          <Image
            source={require('../assets/images/logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>
      </Animated.View>

      {/* App name with letter animation */}
      <View style={styles.titleContainer}>
        <View style={styles.lettersRow}>
          {"White Space".split('').map((char, i) => (
            <Animated.Text
              key={i}
              style={[
                styles.letter,
                char === ' ' && styles.letterSpace,
                {
                  opacity: letters[i].opacity,
                  transform: [{ translateY: letters[i].translateY }],
                },
              ]}
            >
              {char}
            </Animated.Text>
          ))}
        </View>

        {/* Tagline */}
        <Animated.Text style={[
          styles.tagline,
          {
            opacity: textOpacity,
            transform: [{ translateY: textSlide }],
          },
        ]}>
          Clarity in conversation
        </Animated.Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
  },
  ringsContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ring: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#fff',
  },
  dotsContainer: {
    position: 'absolute',
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#fff',
  },
  logoWrapper: {
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoGlow: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#fff',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 20,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  logoImage: {
    width: 100,
    height: 100,
  },
  titleContainer: {
    alignItems: 'center',
  },
  lettersRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  letter: {
    fontSize: 36,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 1,
  },
  letterSpace: {
    width: 12,
  },
  tagline: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
});
