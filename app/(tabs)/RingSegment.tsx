// app/(tabs)/RingSegment.tsx
import Svg, { Path, Text } from 'react-native-svg';
import { TouchableOpacity, View } from 'react-native';
import React from 'react';

const deg2rad = (deg: number) => (deg * Math.PI) / 180;

type RingSegmentProps = {
  radius: number;
  startAngle: number;
  sweepAngle: number;
  color: string;
  label: string,
  zIndex: number
  onPress: () => void;
};

export default function RingSegment({ radius, startAngle, sweepAngle, color, label, zIndex, onPress }: RingSegmentProps) {
  const x0 = radius + radius * Math.cos(deg2rad(startAngle));
  const y0 = radius + radius * Math.sin(deg2rad(startAngle));

  const x1 = radius + radius * Math.cos(deg2rad(startAngle + sweepAngle));
  const y1 = radius + radius * Math.sin(deg2rad(startAngle + sweepAngle));

  const largeArcFlag = sweepAngle > 180 ? 1 : 0;

  const path = `
    M ${radius} ${radius}
    L ${x0} ${y0}
    A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x1} ${y1}
    Z
  `;

  const labelAngle = startAngle + sweepAngle / 2;
  const labelRadius = radius > 200 ? radius - 80 : radius * 0.7; // a little inside the ring
  const labelX = radius + labelRadius * Math.cos(deg2rad(labelAngle));
  const labelY = radius + labelRadius * Math.sin(deg2rad(labelAngle));

  return (
        <Svg 
          pointerEvents='box-none'
          width={radius * 2} height={radius * 2}
          style={{ width: radius * 2, height: radius * 2, position: 'absolute', 
            left: -radius, top: -radius, zIndex: zIndex }}
        >
            <Path d={path} fill={color} 
              onPress={onPress}
            />
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
        </Svg>
  );
}
