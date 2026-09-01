import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../Navigation';

export default function AuthPage() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  const loginForm = useForm({
    defaultValues: { email: '', password: '' },
  });

  const signupForm = useForm({
    defaultValues: { email: '', password: '', name: '' },
  });

  async function handleLogin(data: any) {
    console.log('Login data:', data);
    navigation.navigate('Feed');
  }

  async function handleSignup(data: any) {
    console.log('Signup data:', data);
    navigation.navigate('AccountType');
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Netaji 🇮🇳</Text>
          <Text style={styles.subtitle}>Voice of People. Power of Nation.</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.tabRow}>
            <TouchableOpacity
              style={[styles.tab, mode === 'login' && styles.tabActive]}
              onPress={() => setMode('login')}
            >
              <Text style={[styles.tabText, mode === 'login' && styles.tabTextActive]}>
                Login
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tab, mode === 'signup' && styles.tabActive]}
              onPress={() => setMode('signup')}
            >
              <Text style={[styles.tabText, mode === 'signup' && styles.tabTextActive]}>
                Signup
              </Text>
            </TouchableOpacity>
          </View>

          {mode === 'login' ? (
            <View style={styles.form}>
              <Controller
                control={loginForm.control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={value}
                    onChangeText={onChange}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                )}
              />

              <Controller
                control={loginForm.control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={value}
                    onChangeText={onChange}
                    secureTextEntry
                  />
                )}
              />

              <TouchableOpacity
                style={styles.submitButton}
                onPress={loginForm.handleSubmit(handleLogin)}
              >
                <Text style={styles.submitText}>Login</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.form}>
             <TextInput
  style={styles.input}
  placeholder="Full Name"
/>

              <Controller
                control={signupForm.control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={value}
                    onChangeText={onChange}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                )}
              />

              <Controller
                control={signupForm.control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={value}
                    onChangeText={onChange}
                    secureTextEntry
                  />
                )}
              />

              <TouchableOpacity
                style={styles.submitButton}
                onPress={signupForm.handleSubmit(handleSignup)}
              >
                <Text style={styles.submitText}>Create Account</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Your data is safe and secure</Text>
          <Text style={styles.footerText}>with us</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#faf5ff' },
  container: { flex: 1, paddingHorizontal: 24, justifyContent: 'space-between' },
  header: { alignItems: 'center', marginTop: 60 },
  title: { fontSize: 36, fontWeight: '800', color: '#0f172a' },
  subtitle: { fontSize: 16, color: '#64748b', marginTop: 12 },
  card: { backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 28, padding: 20, marginTop: 40 },
  tabRow: { flexDirection: 'row', backgroundColor: '#faf5ff', borderRadius: 16, padding: 4, marginBottom: 24 },
  tab: { flex: 1, paddingVertical: 12, borderRadius: 12, alignItems: 'center' },
  tabActive: { backgroundColor: '#ffffff' },
  tabText: { fontWeight: '600', color: '#64748b' },
  tabTextActive: { color: '#7e22ce' },
  form: { gap: 16 },
  input: {
    height: 56, borderRadius: 12, backgroundColor: '#ffffff',
    borderWidth: 1, borderColor: '#e2e8f0', paddingHorizontal: 16, color: '#1e293b',
  },
  submitButton: { backgroundColor: '#7e22ce', paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginTop: 8 },
  submitText: { color: '#ffffff', fontWeight: '700', fontSize: 18 },
  footer: { alignItems: 'center', marginBottom: 32 },
  footerText: { color: '#475569' },
});