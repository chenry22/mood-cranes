// app/(tabs)/feel.tsx
import { View, Pressable, StyleSheet, Image, Text } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';

import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import RingSegment from './RingSegment';
import { Ionicons } from '@expo/vector-icons';

const FIRST_RADIUS = 250;
const SECOND_RADIUS = 500;
const THIRD_RADIUS = 750;

type EmotionNode = {
  name: string;
  color: string;
  sub?: EmotionNode[];
};

const emotions: EmotionNode[] = [
  { name: 'Fearful', color: 'rgb(193, 57, 135)', sub: [
    { name: 'Scared', color: 'rgb(155, 45, 110)', sub: [
      { name: 'Helpless', color: 'rgb(193, 57, 135)', sub: [] },
      { name: 'Frightened', color: 'rgb(193, 57, 135)', sub: [] },
    ] }, 
    { name: 'Anxious', color: 'rgb(155, 45, 110)', sub: [
      { name: 'Overwhelmed', color: 'rgb(193, 57, 135)', sub: [] },
      { name: 'Worried', color: 'rgb(193, 57, 135)', sub: [] },
    ] },
    { name: 'Insecure', color: 'rgb(155, 45, 110)', sub: [
      { name: 'Inadequate', color: 'rgb(193, 57, 135)', sub: [] },
      { name: 'Inferior', color: 'rgb(193, 57, 135)', sub: [] },
    ] }, 
    { name: 'Weak', color: 'rgb(155, 45, 110)', sub: [
      { name: 'Worthless', color: 'rgb(193, 57, 135)', sub: [] },
      { name: 'Insignificant', color: 'rgb(193, 57, 135)', sub: [] },
    ] }, 
    { name: 'Rejected', color: 'rgb(155, 45, 110)', sub: [
      { name: 'Excluded', color: 'rgb(193, 57, 135)', sub: [] },
      { name: 'Persecuted', color: 'rgb(193, 57, 135)', sub: [] },
    ] }, 
    { name: 'Threatened', color: 'rgb(155, 45, 110)', sub: [
      { name: 'Nervous', color: 'rgb(193, 57, 135)', sub: [] },
      { name: 'Exposed', color: 'rgb(193, 57, 135)', sub: [] },
    ] }, 
  ]},
  { name: 'Bad', color: 'rgb(76, 48, 118)', sub: [
    { name: 'Tired', color: 'rgb(63, 36, 95)', sub: [
      { name: 'Unfocused', color: 'rgb(76, 48, 118)', sub: [] },
      { name: 'Sleepy', color: 'rgb(76, 48, 118)', sub: [] },
    ] }, 
    { name: 'Stressed', color: 'rgb(63, 36, 95)', sub: [
      { name: 'Out of Control', color: 'rgb(76, 48, 118)', sub: [] },
      { name: 'Overwhelmed', color: 'rgb(76, 48, 118)', sub: [] },
    ] }, 
    { name: 'Busy', color: 'rgb(63, 36, 95)', sub: [
      { name: 'Rushed', color: 'rgb(76, 48, 118)', sub: [] },
      { name: 'Pressured', color: 'rgb(76, 48, 118)', sub: [] },
    ] }, 
    { name: 'Bored', color: 'rgb(63, 36, 95)', sub: [
      { name: 'Apathetic', color: 'rgb(76, 48, 118)', sub: [] },
      { name: 'Indifferent', color: 'rgb(76, 48, 118)', sub: [] },
    ] }, 
  ]},
  { name: 'Surprised', color: 'rgb(83, 115, 96)', sub: [
    { name: 'Excited', color: 'rgb(43, 79, 56)', sub: [
      { name: 'Energetic', color: 'rgb(83, 115, 96)', sub: [] },
      { name: 'Eager', color: 'rgb(83, 115, 96)', sub: [] },
    ] }, 
    { name: 'Amazed', color: 'rgb(43, 79, 56)', sub: [
      { name: 'Awe', color: 'rgb(83, 115, 96)', sub: [] },
      { name: 'Astonished', color: 'rgb(83, 115, 96)', sub: [] },
    ] },
    { name: 'Confused', color: 'rgb(43, 79, 56)', sub: [
      { name: 'Perplexed', color: 'rgb(83, 115, 96)', sub: [] },
      { name: 'Disillusioned', color: 'rgb(83, 115, 96)', sub: [] },
    ] },
    { name: 'Startled', color: 'rgb(43, 79, 56)', sub: [
      { name: 'Dismayed', color: 'rgb(83, 115, 96)', sub: [] },
      { name: 'Shocked', color: 'rgb(83, 115, 96)', sub: [] },
    ] },
  ]},
  { name: 'Happy', color: 'rgb(219, 138, 49)', sub: [
    { name: 'Playful', color: 'rgb(207, 105, 40)', sub: [
      { name: 'Mischevious', color: 'rgb(219, 138, 49)', sub: [] },
      { name: 'Aroused', color: 'rgb(219, 138, 49)', sub: [] },
    ] }, 
    { name: 'Content', color: 'rgb(207, 105, 40)', sub: [
      { name: 'Joyful', color: 'rgb(219, 138, 49)', sub: [] },
      { name: 'Free', color: 'rgb(219, 138, 49)', sub: [] },
    ]},
    { name: 'Interested', color: 'rgb(207, 105, 40)', sub: [
      { name: 'Inquisitive', color: 'rgb(219, 138, 49)', sub: [] },
      { name: 'Curious', color: 'rgb(219, 138, 49)', sub: [] },
    ] },
    { name: 'Proud', color: 'rgb(207, 105, 40)', sub: [
      { name: 'Confident', color: 'rgb(219, 138, 49)', sub: [] },
      { name: 'Successful', color: 'rgb(219, 138, 49)', sub: [] },
    ] },
    { name: 'Accepted', color: 'rgb(207, 105, 40)', sub: [
      { name: 'Valued', color: 'rgb(219, 138, 49)', sub: [] },
      { name: 'Respected', color: 'rgb(219, 138, 49)', sub: [] },
    ] },
    { name: 'Powerful', color: 'rgb(207, 105, 40)', sub: [
      { name: 'Creative', color: 'rgb(219, 138, 49)', sub: [] },
      { name: 'Courageous', color: 'rgb(219, 138, 49)', sub: [] },
    ] },
    { name: 'Peaceful', color: 'rgb(207, 105, 40)', sub: [
      { name: 'Thankful', color: 'rgb(219, 138, 49)', sub: [] },
      { name: 'Loving', color: 'rgb(219, 138, 49)', sub: [] },
    ] },
    { name: 'Trusting', color: 'rgb(207, 105, 40)', sub: [
      { name: 'Intimate', color: 'rgb(219, 138, 49)', sub: [] },
      { name: 'Sensitive', color: 'rgb(219, 138, 49)', sub: [] },
    ] },
    { name: 'Optimistic', color: 'rgb(207, 105, 40)', sub: [
      { name: 'Inspired', color: 'rgb(219, 138, 49)', sub: [] },
      { name: 'Hopeful', color: 'rgb(219, 138, 49)', sub: [] },
    ] },
  ] },
  { name: 'Sad', color: 'rgb(49, 43, 81)', sub: [
    { name: 'Hurt', color: 'rgb(33, 10, 65)', sub: [
      { name: 'Embarrassed', color: 'rgb(47, 41, 77)' }, 
      { name: 'Disappointed', color: 'rgb(47, 41, 77)' }, 
    ] }, 
    { name: 'Depressed', color: 'rgb(33, 10, 65)', sub: [
      { name: 'Inferior', color: 'rgb(47, 41, 77)' }, 
      { name: 'Empty', color: 'rgb(47, 41, 77)' }, 
    ] }, 
    { name: 'Guilty', color: 'rgb(33, 10, 65)', sub: [
      { name: 'Remorseful', color: 'rgb(47, 41, 77)' }, 
      { name: 'Ashamed', color: 'rgb(47, 41, 77)' }, 
    ] }, 
    { name: 'Despair', color: 'rgb(33, 10, 65)', sub: [
      { name: 'Powerless', color: 'rgb(47, 41, 77)' }, 
      { name: 'Grief', color: 'rgb(47, 41, 77)' }, 
    ] }, 
    { name: 'Vulnerable', color: 'rgb(33, 10, 65)', sub: [
      { name: 'Fragile', color: 'rgb(47, 41, 77)' }, 
      { name: 'Victimized', color: 'rgb(47, 41, 77)' }, 
    ] }, 
    { name: 'Lonely', color: 'rgb(33, 10, 65)', sub: [
      { name: 'Abandoned', color: 'rgb(47, 41, 77)' }, 
      { name: 'Isolated', color: 'rgb(47, 41, 77)' }, 
    ] }, 
  ] },
  { name: 'Disgusted', color: 'rgb(167, 96, 58)', sub: [
    { name: 'Disapproving', color: 'rgb(116, 63, 24)', sub: [
      { name: 'Judgemental', color: 'rgb(167, 96, 58)' }, 
      { name: 'Embarrassed', color: 'rgb(167, 96, 58)' }, 
    ] }, 
    { name: 'Disappointed', color: 'rgb(116, 63, 24)', sub: [
      { name: 'Appalled', color: 'rgb(167, 96, 58)' }, 
      { name: 'Revolted', color: 'rgb(167, 96, 58)' }, 
    ] }, 
    { name: 'Awful', color: 'rgb(116, 63, 24)', sub: [
      { name: 'Nauseated', color: 'rgb(167, 96, 58)' }, 
      { name: 'Detestable', color: 'rgb(167, 96, 58)' }, 
    ] }, 
    { name: 'Repelled', color: 'rgb(116, 63, 24)', sub: [
      { name: 'Horrified', color: 'rgb(167, 96, 58)' }, 
      { name: 'Hesitant', color: 'rgb(167, 96, 58)' }, 
    ] }, 
  ] },
  { name: 'Angry', color: 'rgb(190, 60, 65)', sub: [
    { name: 'Let Down', color: 'rgb(134, 38, 45)', sub: [
      { name: 'Betrayed', color: 'rgb(190, 60, 65)' }, 
      { name: 'Resentful', color: 'rgb(190, 60, 65)' }, 
    ] }, 
    { name: 'Humiliated', color: 'rgb(134, 38, 45)', sub: [
      { name: 'Disrespected', color: 'rgb(190, 60, 65)' }, 
      { name: 'Ridiculed', color: 'rgb(190, 60, 65)' }, 
    ] }, 
    { name: 'Bitter', color: 'rgb(134, 38, 45)', sub: [
      { name: 'Indignant', color: 'rgb(190, 60, 65)' }, 
      { name: 'Violated', color: 'rgb(190, 60, 65)' }, 
    ] }, 
    { name: 'Mad', color: 'rgb(134, 38, 45)', sub: [
      { name: 'Furious', color: 'rgb(190, 60, 65)' }, 
      { name: 'Jealous', color: 'rgb(190, 60, 65)' }, 
    ] }, 
    { name: 'Aggressive', color: 'rgb(134, 38, 45)', sub: [
      { name: 'Provoked', color: 'rgb(190, 60, 65)' }, 
      { name: 'Hostile', color: 'rgb(190, 60, 65)' }, 
    ] }, 
    { name: 'Frustrated', color: 'rgb(134, 38, 45)', sub: [
      { name: 'Infuriated', color: 'rgb(190, 60, 65)' }, 
      { name: 'Annoyed', color: 'rgb(190, 60, 65)' }, 
    ] }, 
    { name: 'Distant', color: 'rgb(134, 38, 45)', sub: [
      { name: 'Withdrawn', color: 'rgb(190, 60, 65)' }, 
      { name: 'Numb', color: 'rgb(190, 60, 65)' }, 
    ] }, 
    { name: 'Critical', color: 'rgb(134, 38, 45)', sub: [
      { name: 'Skeptical', color: 'rgb(190, 60, 65)' }, 
      { name: 'Dismissive', color: 'rgb(190, 60, 65)' }, 
    ] }, 
  ] },
];

export default function Feel() {
  const [firstSelected, setFirstSelected] = useState<number | null>(null);
  const [secondSelected, setSecondSelected] = useState<number | null>(null);
  const [thirdSelected, setThirdSelected] = useState<number | null>(null);
  const focus = useSharedValue({ x: 0, y: 0 });
  const dragging = useSharedValue(false);
  const dragStart = useSharedValue({ x: 0, y: 0 })

  const handleSelect = (i: number | null, j: number | null, k: number | null, layer: number) => {
    if (dragging.value) { return; } // ignore drag ta
    switch(layer) {
      case 0:
        focus.value = withTiming({ x: 0, y: 0 }, { duration: 400 });
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
        focus.value = withTiming({ x, y }, { duration: 400 });
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

        focus.value = withTiming({ x, y }, { duration: 400 });
        setFirstSelected(i);
        setSecondSelected(j);
        setThirdSelected(null);
        break;
      case 3:
        if (i === null || j === null || k === null) { return; }
        var subSweep = (360 / emotions.length) / emotions[i].sub!.length / (emotions[i].sub![j].sub?.length || 1);
        var angle = (((360 / emotions.length) * i) + ((360 / emotions.length) / emotions[i].sub!.length * j) + (subSweep * k)); // degrees
        // get 0.8 * radius length in that direction, move focus to there
        var x = Math.cos(angle * Math.PI / 180) * THIRD_RADIUS * 0.9;
        var y = Math.sin(angle * Math.PI / 180) * THIRD_RADIUS * 0.9;

        focus.value = withTiming({ x, y }, { duration: 400 });
        setFirstSelected(i);
        setSecondSelected(j);
        setThirdSelected(k);
        break;
    }
  };

  const panGesture = Gesture.Pan()
    .onStart((e) => {
      dragging.value = true;
      dragStart.value = { x: e.x, y: e.y }
    })
    .onUpdate((e) => {
      let dx = dragStart.value.x - e.x;
      let dy = dragStart.value.y - e.y;
      focus.value = {
        x: Math.max(Math.min(THIRD_RADIUS, focus.value.x + dx), -THIRD_RADIUS),
        y: Math.max(Math.min(THIRD_RADIUS, focus.value.y + dy), -THIRD_RADIUS)
      }
      dragStart.value = {
        x: e.x, y: e.y
      }
    }).onEnd(() => {
      setTimeout(() => { dragging.value = false }, 50);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: -focus.value.x }, { translateY: -focus.value.y }],
  }));

  return (
    <GestureDetector gesture={panGesture}>
    <View style={styles.container}>
      <Pressable style={styles.backButton} onPress={() => router.navigate('/mood')}>
        <Ionicons name="chevron-back" size={28} color="white" />
        <Text style={{
          color: 'white'
        }}>Back</Text>
      </Pressable>

      {/* Ring container */}
      
      <Animated.View style={[{ position: 'absolute', 
        justifyContent: 'center', alignItems: 'center',
       }, animatedStyle]}
      >
        <Pressable onPress={() => handleSelect(null, null, null, 0)} style={styles.centerOrb}>
          <View>
            <Image source={ require('@/assets/images/crane.png') } style={styles.centerImage}/>
          </View>
        </Pressable>

        {/* First ring */}
        {emotions.map((emotion, i) => (
          <RingSegment
            key={emotion.name}
            radius={FIRST_RADIUS}
            startAngle={(360 / emotions.length) * i}
            sweepAngle={360 / emotions.length - 1}
            label={ emotion.name }
            color={ firstSelected === null || firstSelected === i ? emotion.color : 'gray' }
            zIndex={3}
            onPress={() => handleSelect(i, null, null, 1)}
          />
        ))}

        {/* second ring */}
        { emotions.map((emotion, i) => emotion.sub?.map((subEmotion, j) => {
            const subSweep = (360 / emotions.length) / (emotions[i].sub?.length || 1);
            const shown = (firstSelected === null || firstSelected === i) && (secondSelected === null || secondSelected === j);
            return (
              <RingSegment
                key={subEmotion.name}
                radius={SECOND_RADIUS}
                startAngle={(((360 / emotions.length) * i) + (subSweep * j)) + 0.1}
                sweepAngle={subSweep - 0.5}
                label={ subEmotion.name }
                color={ shown ? subEmotion.color : 'gray' }
                zIndex={2}
                onPress={() => handleSelect(i, j, null, 2)}
              />
            );
          })
        )
        }


        {/* third ring */}
        { emotions.map((emotion, i) => emotion.sub!.map((subEmotionA, j) => subEmotionA.sub?.map((subEmotion, k) => {
            const subSweep = (360 / emotions.length) / emotions[i].sub!.length / (emotions[i].sub![j].sub?.length || 1);
            const shown = (firstSelected === null || firstSelected === i) 
              && (secondSelected === null || secondSelected === j)
              && (thirdSelected === null || thirdSelected === k);
            return (
              <RingSegment
                key={subEmotion.name}
                radius={THIRD_RADIUS}
                startAngle={(((360 / emotions.length) * i) + ((360 / emotions.length) / emotions[i].sub!.length * j) + (subSweep * k))}
                sweepAngle={subSweep - 0.3}
                label={ subEmotion.name }
                color={ shown ? subEmotion.color : 'gray' }
                zIndex={1}
                onPress={() => handleSelect(i, j, k, 3)}
              />
            );
        })))}
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
    top: 20,
    left: 10,
    zIndex: 10,
    padding: 10,
    backgroundColor: 'black',
    borderRadius: 30,
  },
  centerOrb: {
    zIndex: 10,
    width: 150,
    height: 150,
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
