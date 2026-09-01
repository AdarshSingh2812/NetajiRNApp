import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Users, Landmark, ChevronRight, ShieldCheck } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../Navigation';

export default function AccountTypePage() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  function goPublic() {
    navigation.navigate('PublicProfileSetup');
  }

  function goNetaji() {
    navigation.navigate('NetajiProfileSetup');
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Choose your{'\n'}account type</Text>
          <Text style={styles.subtitle}>
            Select the option that best describes you. You can change this
            later.
          </Text>
        </View>

        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.optionCard} onPress={goPublic}>
            <View style={styles.optionLeft}>
              <View style={styles.iconCircle}>
                <Users size={32} color="#7e22ce" />
              </View>
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionTitle}>Public User</Text>
                <Text style={styles.optionDescription}>
                  Join as a citizen and connect with your community.
                </Text>
              </View>
            </View>
            <ChevronRight size={22} color="#0f172a" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionCard} onPress={goNetaji}>
            <View style={styles.optionLeft}>
              <View style={styles.iconCircle}>
                <Landmark size={32} color="#7e22ce" />
              </View>
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionTitle}>Netaji / Politician</Text>
                <Text style={styles.optionDescription}>
                  Join as a politician or public representative.
                </Text>
              </View>
            </View>
            <ChevronRight size={22} color="#0f172a" />
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <ShieldCheck size={32} color="#7e22ce" style={{ marginBottom: 12 }} />
          <Text style={styles.footerText}>Your data is safe and secure</Text>
          <Text style={styles.footerText}>with us</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#faf5ff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  header: {
    marginTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#0f172a',
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 16,
    lineHeight: 24,
  },
  optionsContainer: {
    gap: 20,
    marginTop: 24,
  },
  optionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  iconCircle: {
    height: 64,
    width: 64,
    borderRadius: 32,
    backgroundColor: '#f3e8ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    fontWeight: '700',
    fontSize: 20,
    color: '#0f172a',
  },
  optionDescription: {
    color: '#64748b',
    marginTop: 4,
    fontSize: 13,
    lineHeight: 18,
  },
  footer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  footerText: {
    color: '#475569',
  },
});