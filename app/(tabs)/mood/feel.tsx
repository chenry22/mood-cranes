// app/(tabs)/feel.tsx
import { View, Pressable, StyleSheet, Image, Text, Platform } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';

import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, clamp } from 'react-native-reanimated';
import RingSegment from '../../../components/RingSegment';
import { Ionicons } from '@expo/vector-icons';
import Svg from 'react-native-svg';
import { emotions } from '../../../components/emotions';

const FIRST_RADIUS = 250;
const SECOND_RADIUS = 500;
const THIRD_RADIUS = 750;

export default function Feel() {
  const [firstSelected, setFirstSelected] = useState<number | null>(null);
  const [secondSelected, setSecondSelected] = useState<number | null>(null);
  const [thirdSelected, setThirdSelected] = useState<number | null>(null);

  const focusX = useSharedValue(0);
  const focusY = useSharedValue(0)
  const dragging = useSharedValue(false);
  const dragStart = useSharedValue({ x: 0, y: 0 });

  const handleSelect = (i: number | null, j: number | null, k: number | null, layer: number) => {
    if (dragging.value) { return; } // ignore drag tap
    switch(layer) {
      case 0:
        focusX.value = withTiming(0, { duration: 400 });
        focusY.value = withTiming(0, { duration: 400 });
        setFirstSelected(null);
        setSecondSelected(null);
        setThirdSelected(null);
        break;
      case 1:
        if (i === null) { return; }
        var angle = (360 / emotions.length) * i + (360 / emotions.length / 2); // degrees
        // get 0.8 * radius length in that direction, move focus to there
        var x = Math.cos(angle * Math.PI / 180) * FIRST_RADIUS * 0.8;
        var y = Math.sin(angle * Math.PI / 180) * FIRST_RADIUS * 0.8;
        
        focusX.value = withTiming(x, { duration: 400 });
        focusY.value = withTiming(y, { duration: 400 });
        setFirstSelected(i);
        setSecondSelected(null);
        setThirdSelected(null);
        break;
      case 2:
        if (i === null || j === null) { return; }
        if (firstSelected === null) { return; }
        var subSweep = (360 / emotions.length) / (emotions[i].sub?.length || 1);
        var angle = ((360 / emotions.length) * i) + (subSweep * j) + (subSweep / 2); // degrees
        // get 0.8 * radius length in that direction, move focus to there
        var x = Math.cos(angle * Math.PI / 180) * SECOND_RADIUS * 0.85;
        var y = Math.sin(angle * Math.PI / 180) * SECOND_RADIUS * 0.85;

        focusX.value = withTiming(x, { duration: 400 });
        focusY.value = withTiming(y, { duration: 400 });
        setFirstSelected(i);
        setSecondSelected(j);
        setThirdSelected(null);
        break;
      case 3:
        if (i === null || j === null || k === null) { return; }
        var subSweep = (360 / emotions.length) / emotions[i].sub!.length / (emotions[i].sub![j].sub?.length || 1);
        var angle = (((360 / emotions.length) * i) + ((360 / emotions.length) / emotions[i].sub!.length * j) + (subSweep * k)); // degrees
        // get 0.8 * radius length in that direction, move focus to there
        var x = Math.cos(angle * Math.PI / 180) * THIRD_RADIUS * 0.8;
        var y = Math.sin(angle * Math.PI / 180) * THIRD_RADIUS * 0.8;

        focusX.value = withTiming(x, { duration: 400 });
        focusY.value = withTiming(y, { duration: 400 });
        setFirstSelected(i);
        setSecondSelected(j);
        setThirdSelected(k);
        break;
    }
  };

  const panGesture = Gesture.Pan()
    .onStart((e) => {
      dragging.value = true;
      dragStart.value = { x: e.translationX, y: e.translationY }
    })
    .onUpdate((e) => {
      let dx = dragStart.value.x - e.translationX;
      let dy = dragStart.value.y - e.translationY;
      focusX.value = clamp(focusX.value + dx, -THIRD_RADIUS, THIRD_RADIUS);
      focusY.value = clamp(focusY.value + dy, -THIRD_RADIUS, THIRD_RADIUS);
      dragStart.value = {
        x: e.translationX, y: e.translationY
      }
    }).onEnd(() => {
      setTimeout(() => { dragging.value = false }, 50);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: -focusX.value }, { translateY: -focusY.value }],
  }));

  function selectedMood() {
    if (thirdSelected !== null && secondSelected !== null && firstSelected !== null) {
      return emotions[firstSelected].sub![secondSelected].sub![thirdSelected].name
    } else if (secondSelected !== null && firstSelected !== null) {
      return emotions[firstSelected].sub![secondSelected].name
    } else if (firstSelected !== null) {
      return emotions[firstSelected].name ?? ''
    }
    return '';
  }

  return (
    <GestureDetector gesture={panGesture}>
    <View style={styles.container}>
      <Pressable style={styles.backButton} onPress={() => router.navigate('/(tabs)/mood')}>
        <Ionicons name="chevron-back" size={28} color="white" />
        <Text style={{
          color: 'white'
        }}>Back</Text>
      </Pressable>

      { selectedMood() !== '' && <Pressable style={styles.selectButton} onPress={() => {
        router.push({
          pathname: `/mood/entry`,
          params: { mood: selectedMood() },
        });
      }}>
        <Ionicons name="locate" size={24} color="blue" />
        <Text style={{ color: 'blue', textAlign: 'center' }}>
          Select Emotion{"\n"}({selectedMood()})
        </Text>
      </Pressable>
      }

      {/* Ring container */}
      <Animated.View style={[{ position: 'absolute', 
        width: '100%', height: '100%', left: '50%', top: '50%',
        justifyContent: 'center', alignItems: 'center'
       }, animatedStyle]}
       
      >
        <Pressable onPress={() => handleSelect(null, null, null, 0)} style={styles.centerOrb}>
          <View>
            <Image source={ require('@/assets/images/crane.png') } style={styles.centerImage}/>
          </View>
        </Pressable>

        <Svg pointerEvents='box-none'
            width={THIRD_RADIUS * 2} height={THIRD_RADIUS * 2}
            style={{ width: THIRD_RADIUS * 2, height: THIRD_RADIUS * 2, position: 'absolute', 
              left: -THIRD_RADIUS, top: -THIRD_RADIUS }}
        >
          {/* third ring */}
          { emotions.map((emotion, i) => emotion.sub!.map((subEmotionA, j) => subEmotionA.sub?.map((subEmotion, k) => {
              const subSweep = (360 / emotions.length) / emotions[i].sub!.length / (emotions[i].sub![j].sub?.length || 1);
              const shown = (firstSelected === null || firstSelected === i)
                && (secondSelected === null || secondSelected === j)
                && (thirdSelected === null || thirdSelected === k);
              return <RingSegment
                  key={subEmotion.name}
                  radius={THIRD_RADIUS}
                  startAngle={(((360 / emotions.length) * i) + ((360 / emotions.length) / emotions[i].sub!.length * j) + (subSweep * k))}
                  sweepAngle={subSweep - 0.3}
                  label={ subEmotion.name }
                  color={ shown ? subEmotion.color : 'gray' }
                  padding={0}
                  onPress={() => handleSelect(i, j, k, 3)}
                />
              ;
          })))}

          {/* second ring */}
          { emotions.map((emotion, i) => emotion.sub?.map((subEmotion, j) => {
              const subSweep = (360 / emotions.length) / (emotions[i].sub?.length || 1);
              const shown = (firstSelected === null || firstSelected === i) && (secondSelected === null || secondSelected === j);
              return <RingSegment
                  key={subEmotion.name}
                  radius={SECOND_RADIUS}
                  startAngle={(((360 / emotions.length) * i) + (subSweep * j)) + 0.1}
                  sweepAngle={subSweep - 0.5}
                  label={ subEmotion.name }
                  color={ shown ? subEmotion.color : 'gray' }
                  padding={THIRD_RADIUS - SECOND_RADIUS}
                  onPress={() => handleSelect(i, j, null, 2)}
                />;
          }))}
          
          {/* First ring */}
          {emotions.map((emotion, i) => (
            <RingSegment
              key={emotion.name}
              radius={FIRST_RADIUS}
              startAngle={(360 / emotions.length) * i}
              sweepAngle={360 / emotions.length - 1}
              label={ emotion.name }
              color={ firstSelected === null || firstSelected === i ? emotion.color : 'gray' }
              padding={THIRD_RADIUS - FIRST_RADIUS}
              onPress={() => handleSelect(i, null, null, 1)}
            />
          ))}
        </Svg>
      </Animated.View>
    </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3b3b3b',
    justifyContent: 'center',
    alignItems: 'center',
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
    bottom: 30,
    zIndex: 10,
    padding: 12,
    backgroundColor: 'lightblue',
    borderRadius: 20,
  },
  centerOrb: {
    zIndex: 10,
    width: 150,
    height: 150,
    left: -75,
    top: -75,
    borderRadius: 100,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  centerImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    tintColor: 'white'
  },
});
