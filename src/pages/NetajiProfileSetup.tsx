import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import {
  ArrowLeft,
  Camera,
  User,
  AtSign,
  Calendar,
  CircleUserRound,
  Flag,
  Briefcase,
  Clock,
  MapPin,
  Building2,
  Hash,
  Pencil,
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../Navigation';

export default function NetajiProfileSetup() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [usernameError, setUsernameError] = useState('');

  const [form, setForm] = useState({
    name: '',
    username: '',
    dob: '',
    gender: '',
    bio: '',
    politicalParty: '',
    position: '',
    yearsInPolitics: '',
    state: '',
    district: '',
    pincode: '',
  });

  function goToLogin() {
    console.log('Sign out and go to login');
    navigation.navigate('Auth');
  }

  function goBack() {
    navigation.goBack();
  }

  async function handleSubmit() {
    if (!form.name.trim() || !form.username.trim()) {
      Alert.alert('Error', 'Name aur username required hai');
      return;
    }

    console.log('Netaji form submitted:', form);
    navigation.navigate('Feed');
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <ArrowLeft size={22} color="#0f172a" />
        </TouchableOpacity>

        <Text style={styles.title}>Create your political profile</Text>
        <Text style={styles.subtitle}>Tell us about your political journey</Text>

        <View style={styles.photoContainer}>
          <View style={styles.photoCircle}>
            <Camera size={32} color="#475569" />
          </View>
          <TouchableOpacity>
            <Text style={styles.photoText}>Add Profile Picture</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <InputField
            icon={<User size={20} color="#64748b" />}
            placeholder="Full Name"
            value={form.name}
            onChangeText={(v: string) => setForm({ ...form, name: v })}
          />

          <View>
            <InputField
              icon={<AtSign size={20} color="#64748b" />}
              placeholder="Username"
              value={form.username}
              onChangeText={(v: string) => {
                setUsernameError('');
                setForm({ ...form, username: v });
              }}
            />
            {usernameError ? (
              <Text style={styles.errorText}>{usernameError}</Text>
            ) : null}
          </View>

          <InputField
            icon={<Calendar size={20} color="#64748b" />}
            placeholder="Date of Birth (YYYY-MM-DD)"
            value={form.dob}
            onChangeText={(v: string) => setForm({ ...form, dob: v })}
          />

          <View style={styles.inputRow}>
            <CircleUserRound size={20} color="#64748b" />
            <TextInput
              style={styles.inputText}
              placeholder="Gender (male/female/other)"
              value={form.gender}
              onChangeText={(v: string) => setForm({ ...form, gender: v })}
            />
          </View>

          <InputField
            icon={<Pencil size={20} color="#64748b" />}
            placeholder="Bio"
            value={form.bio}
            onChangeText={(v: string) => setForm({ ...form, bio: v })}
          />

          <InputField
            icon={<Flag size={20} color="#64748b" />}
            placeholder="Political Party"
            value={form.politicalParty}
            onChangeText={(v: string) => setForm({ ...form, politicalParty: v })}
          />

          <InputField
            icon={<Briefcase size={20} color="#64748b" />}
            placeholder="Position / Role"
            value={form.position}
            onChangeText={(v: string) => setForm({ ...form, position: v })}
          />

          <InputField
            icon={<Clock size={20} color="#64748b" />}
            placeholder="Years in Politics"
            value={form.yearsInPolitics}
            onChangeText={(v: string) => setForm({ ...form, yearsInPolitics: v })}
          />

          <InputField
            icon={<MapPin size={20} color="#64748b" />}
            placeholder="State"
            value={form.state}
            onChangeText={(v: string) => setForm({ ...form, state: v })}
          />

          <InputField
            icon={<Building2 size={20} color="#64748b" />}
            placeholder="District"
            value={form.district}
            onChangeText={(v: string) => setForm({ ...form, district: v })}
          />

          <InputField
            icon={<Hash size={20} color="#64748b" />}
            placeholder="Pincode"
            value={form.pincode}
            onChangeText={(v: string) => setForm({ ...form, pincode: v })}
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Continue</Text>
        </TouchableOpacity>

        <View style={styles.loginRow}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={goToLogin}>
            <Text style={styles.loginLink}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function InputField({ icon, placeholder, value, onChangeText }: any) {
  return (
    <View style={styles.inputRow}>
      {icon}
      <TextInput
        style={styles.inputText}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#faf5ff',
  },
  container: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  backButton: {
    height: 44,
    width: 44,
    borderRadius: 22,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0f172a',
    textAlign: 'center',
    marginTop: 24,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 4,
  },
  photoContainer: {
    alignItems: 'center',
    marginTop: 24,
  },
  photoCircle: {
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoText: {
    color: '#7e22ce',
    fontWeight: '700',
    fontSize: 14,
    marginTop: 12,
  },
  form: {
    gap: 10,
  },
  inputRow: {
    height: 44,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
  },
  inputText: {
    flex: 1,
    fontSize: 14,
    color: '#1e293b',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 8,
  },
  submitButton: {
    backgroundColor: '#7e22ce',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  submitText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 16,
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  loginText: {
    color: '#64748b',
    fontSize: 12,
  },
  loginLink: {
    color: '#7e22ce',
    fontWeight: '700',
    fontSize: 12,
  },
});