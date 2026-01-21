import { View, Text, Pressable, StyleSheet, InteractionManager } from 'react-native';
import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { router } from 'expo-router';

const ANIMATION_TIME = 1800; // in ms

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000', // looks best for glow
  },
  orb: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#3B82F6',
    shadowColor: '#3B82F6',
    shadowOpacity: 0.9,
    shadowRadius: 40,
    shadowOffset: { width: 0, height: 0 },
  },
  text: {
    marginTop: 24,
    fontSize: 18,
    color: '#fff',
    opacity: 0.85,
  },
});


export default function MoodPage() {
  const scale = useRef(new Animated.Value(1)).current;
  const glow = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(scale, {
            toValue: 1.08,
            duration: ANIMATION_TIME,
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: 1,
            duration: ANIMATION_TIME,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(glow, {
            toValue: 1,
            duration: ANIMATION_TIME,
            useNativeDriver: true,
          }),
          Animated.timing(glow, {
            toValue: 0.6,
            duration: ANIMATION_TIME,
            useNativeDriver: true,
          }),
        ]),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <Pressable onPress={() => {
        requestAnimationFrame(() => {
          router.push('/feel');
        });
      }}>
        <Animated.View
          style={[
            styles.orb, {
              transform: [{ scale }],
              opacity: glow,
            },
          ]}
        />
      </Pressable>

      <Text style={styles.text}>how do you feel?</Text>
    </View>
  );
}
