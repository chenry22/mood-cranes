import { View, Text, Pressable, StyleSheet, InteractionManager } from 'react-native';
import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { router, Stack } from 'expo-router';

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
  return (
    <Stack screenOptions={{ headerShown: false }} />
  );
}
