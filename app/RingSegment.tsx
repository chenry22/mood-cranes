// app/(tabs)/RingSegment.tsx
import Svg, { Path, Text } from 'react-native-svg';
import { Platform, Pressable, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Canvas from 'react-native-canvas';

const deg2rad = (deg: number) => (deg * Math.PI) / 180;

type RingSegmentProps = {
  radius: number;
  padding: number;
  startAngle: number;
  sweepAngle: number;
  color: string;
  label: string,
  onPress: () => void;
};

export default function RingSegment({ radius, startAngle, sweepAngle, color, label, padding, onPress }: RingSegmentProps) {
  const x0 = radius + radius * Math.cos(deg2rad(startAngle)) + padding;
  const y0 = radius + radius * Math.sin(deg2rad(startAngle)) + padding;

  const x1 = radius + radius * Math.cos(deg2rad(startAngle + sweepAngle)) + padding;
  const y1 = radius + radius * Math.sin(deg2rad(startAngle + sweepAngle)) + padding;

  const largeArcFlag = sweepAngle > 180 ? 1 : 0;

  const path = `
    M ${radius + padding} ${radius + padding}
    L ${x0} ${y0}
    A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x1} ${y1}
    Z
  `;

  const labelAngle = startAngle + sweepAngle / 2;
  var labelRadius = radius > 300 ? radius - 80 : radius * 0.7; // a little inside the ring

  if (Platform.OS === 'ios') {
    labelRadius = radius > 300 ? radius - 120 : radius * 0.7;
  }
  
  const labelX = radius + labelRadius * Math.cos(deg2rad(labelAngle)) + padding;
  const labelY = radius + labelRadius * Math.sin(deg2rad(labelAngle)) + padding;

  return (<>
            <Path d={path} fill={color}
              onPress={onPress}/>
            <Text
              x={labelX}
              y={labelY}
              fill="#fff"
              fontSize="12"
              fontWeight="bold"
              textAnchor="middle"
              alignmentBaseline="middle"
              pointerEvents='none'
            >
              {label}
            </Text>
          </>
  );
}
