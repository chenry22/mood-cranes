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


export default function RegisterPage() {
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');

  async function tryCreateAccount() {
    if (await accountService.createAccount(email, password)) {
      router.navigate('/mood')
    }
  }

  function switchToLogin() {
    router.navigate('/login')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create Account</Text>
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

      <Button onPressOut={tryCreateAccount}>Register</Button>

      <View>
        <Text style={{ color: 'white', textAlign: 'center' }}>Existing User?</Text>
        <Button onPressOut={switchToLogin}>Log In</Button>
      </View>
    </View>
  );
}
