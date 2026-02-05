import { View, Text, Pressable, StyleSheet, InteractionManager, TextInput } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@react-navigation/elements';
import { accountService } from '@/services/appwrite';
import { router } from 'expo-router';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000', // looks best for glow
    color: 'white',
    gap: '30px'
  },

  header: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 28

  },

  input: {
    borderColor: 'blue',
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white'
  }
});


export default function LoginPage() {
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');

  async function tryLogin() {
    if (await accountService.tryLogin(email, password)) {
      router.navigate('/mood')
    }
  }

  function switchToRegister() {
    router.navigate('/register')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome!</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        value={email}
        placeholder="E-mail"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangePassword}
        value={password}
        placeholder="Password"
        secureTextEntry
      />

      <Button onPressOut={tryLogin}>Log In</Button>

      <View>
        <Text style={{ color: 'white', textAlign: 'center' }}>New User?</Text>
        <Button onPressOut={switchToRegister}>Create Account</Button>
      </View>
    </View>
  );
}
