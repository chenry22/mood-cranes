import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Image, Platform } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#007AFF',   // iOS blue
        tabBarInactiveTintColor: '#8E8E93',
      }}
    >
      <Tabs.Screen 
        name="list" 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen 
        name="cranes" 
        options={{
          tabBarIcon: ({ size, color }) =>
             ( <Image 
              source={ require('../../assets/images/crane.png') } 
              resizeMode='contain'
              style={{
                width: size,
                height: size,
                tintColor: color,
              }}
            /> ),
        }}
      />
      <Tabs.Screen
        name="mood"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen 
        name="boats" 
        options={{
          tabBarIcon: ({ size, color }) =>
             ( <Image 
              source={ require('../../assets/images/boat.png') } 
              resizeMode='contain'
              style={{
                width: size,
                height: size,
                tintColor: color,
              }}
            /> ),
        }}
      />
      <Tabs.Screen 
        name="profile" 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />

    </Tabs>
  );
}
