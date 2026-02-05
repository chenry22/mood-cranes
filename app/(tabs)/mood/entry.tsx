import { Text, View, StyleSheet, TextInput, Pressable, Platform } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { EmotionNode, emotions } from '@/components/emotions';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000', // looks best for glow
  },
  note: {
    flex: 1,
    padding: 20,
    width: 450,
    height: 450,
    maxHeight: '60%',
    maxWidth: '90%',
    color: 'white',
  },
  input: {
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 10,
    borderWidth: 1,
    color: 'white',
    borderColor: 'white',
    maxWidth: '95%',
    maxHeight: '70%',
    fontSize: 18,
  },
  backButton: {
    position: 'absolute',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    top: Platform.OS === 'ios' ? 60 : 20,
    left: 10,
    zIndex: 10,
    padding: 10,
    backgroundColor: 'black',
    borderRadius: 20,
  },
  selectButton: {
    position: 'absolute',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    top: Platform.OS === 'ios' ? 60 : 20,
    right: 10,
    zIndex: 10,
    padding: 12,
    backgroundColor: 'blue',
    borderRadius: 20,
  },
});

export default function Route() {
  const { mood } = useLocalSearchParams();
  const [note, onChangeNote] = useState('');

  const getEmotionColor = (emotions: EmotionNode[]) => {
    for (var e of emotions) {
      if (e.name === mood) {
        return e.color;
      } else if (e.sub !== undefined) {
        let c: string = getEmotionColor(e.sub);
        if (c !== '') {
          return c;
        }
      }
    }
    return "";
  }

  return <View style={styles.container}>
      <Pressable style={styles.backButton} onPress={() => router.navigate('/(tabs)/mood/feel')}>
        <Ionicons name="chevron-back" size={28} color="white" />
        <Text style={{
          color: 'white'
        }}>Back</Text>
      </Pressable>

      <View style={{...styles.note, backgroundColor: getEmotionColor(emotions)}}>
        <Text style={{ color: 'white', fontSize: 20, }}>Right now I feel...</Text>
        <Text style={{ color: 'white', fontSize: 28, fontWeight: 'bold', margin: 24 }}>
          {mood}</Text>
        <TextInput
            multiline
            style={styles.input}
            onChangeText={onChangeNote}
            value={note}
            placeholder="Describe your experience... (optional)"
          />
      </View>

      <Pressable style={styles.selectButton} onPress={() => router.navigate('/(tabs)/mood')}>
        <Ionicons name="save" size={24} color="white" />
        <Text style={{
          color: 'white'
        }}>Save</Text>
      </Pressable>
    </View>;
}