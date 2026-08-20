import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { User, Phone, Mail, MapPin, Calendar, Check, ArrowRight, ArrowLeft } from 'lucide-react-native';
import { COLORS, SHADOWS } from '../theme/colors';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

export const SignupScreen: React.FC<Props> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [name, setName] = useState('Priya Sharma');
  const [mobile, setMobile] = useState('+91 98765 43210');
  const [email, setEmail] = useState('priya.sharma@example.com');
  const [address, setAddress] = useState('12, Green Park, Andheri West, Mumbai - 400058');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Female');
  const [dob, setDob] = useState('15/08/1996');

  const [errorMsg, setErrorMsg] = useState('');
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const handleSendOtp = () => {
    if (!name.trim() || !mobile.trim() || !email.trim()) {
      setErrorMsg('Please fill in Name, Mobile, and Email fields.');
      return;
    }
    setErrorMsg('');

    const demoOtp = '1234';

    navigation.navigate('OtpVerification', {
      name,
      mobile,
      email,
      address,
      gender,
      dob,
      demoOtp,
    });
  };

  return (
    <LinearGradient colors={['#E6F4F1', '#FFFFFF']} style={[styles.container, { paddingTop: insets.top }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ flex: 1 }}
        >
          <Animated.View style={{ flex: 1, opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
            >
              {/* Header & Logo */}
              <View style={styles.headerRow}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                  <ArrowLeft size={24} color={COLORS.textPrimary} />
                </TouchableOpacity>
              </View>
              <View style={styles.headerSection}>
                <View style={styles.logoBadge}>
                  <Text style={styles.logoIcon}>🛠️</Text>
                </View>
                <Text style={styles.brandName}>SERVICIFY</Text>
                <Text style={styles.welcomeTitle}>Create Account</Text>
                <Text style={styles.welcomeSubtitle}>
                  Enter your details to register as a new user.
                </Text>
              </View>

          {errorMsg !== '' && (
            <View style={styles.errorBanner}>
              <Text style={styles.errorText}>{errorMsg}</Text>
            </View>
          )}

          {/* Form Card */}
          <View style={styles.formCard}>
            {/* Full Name */}
            <Text style={styles.inputLabel}>Full Name *</Text>
            <View style={styles.inputWrapper}>
              <User size={18} color={COLORS.primary} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter your full name"
                placeholderTextColor={COLORS.textMuted}
                value={name}
                onChangeText={setName}
              />
            </View>

            {/* Mobile Number */}
            <Text style={styles.inputLabel}>Mobile Number *</Text>
            <View style={styles.inputWrapper}>
              <Phone size={18} color={COLORS.primary} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter 10-digit mobile number"
                placeholderTextColor={COLORS.textMuted}
                keyboardType="phone-pad"
                value={mobile}
                onChangeText={setMobile}
              />
            </View>

            {/* Email Address */}
            <Text style={styles.inputLabel}>Email Address *</Text>
            <View style={styles.inputWrapper}>
              <Mail size={18} color={COLORS.primary} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter email address"
                placeholderTextColor={COLORS.textMuted}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            {/* Address */}
            <Text style={styles.inputLabel}>Address</Text>
            <View style={styles.inputWrapper}>
              <MapPin size={18} color={COLORS.primary} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter street, area & pincode"
                placeholderTextColor={COLORS.textMuted}
                value={address}
                onChangeText={setAddress}
              />
            </View>

            {/* Gender Selection */}
            <Text style={styles.inputLabel}>Gender</Text>
            <View style={styles.genderRow}>
              {(['Female', 'Male', 'Other'] as const).map((g) => {
                const isSelected = gender === g;
                return (
                  <TouchableOpacity
                    key={g}
                    style={[styles.genderPill, isSelected && styles.selectedGenderPill]}
                    onPress={() => setGender(g)}
                    activeOpacity={0.8}
                  >
                    {isSelected && <Check size={14} color={COLORS.white} />}
                    <Text
                      style={[
                        styles.genderText,
                        isSelected && styles.selectedGenderText,
                      ]}
                    >
                      {g}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Date of Birth */}
            <Text style={styles.inputLabel}>Date of Birth (DD/MM/YYYY)</Text>
            <View style={styles.inputWrapper}>
              <Calendar size={18} color={COLORS.primary} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="DD/MM/YYYY"
                placeholderTextColor={COLORS.textMuted}
                value={dob}
                onChangeText={setDob}
              />
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSendOtp}
            activeOpacity={0.85}
          >
            <Text style={styles.submitButtonText}>Create Account</Text>
            <ArrowRight size={18} color={COLORS.white} />
          </TouchableOpacity>
        </ScrollView>
      </Animated.View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },
  headerRow: {
    marginBottom: 10,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoBadge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primaryBg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.primary,
    marginBottom: 10,
  },
  logoIcon: {
    fontSize: 28,
  },
  brandName: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.primary,
    letterSpacing: 2,
  },
  welcomeTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginTop: 6,
  },
  welcomeSubtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 4,
    paddingHorizontal: 16,
  },
  errorBanner: {
    backgroundColor: '#FEE2E2',
    padding: 12,
    borderRadius: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.danger,
  },
  errorText: {
    fontSize: 13,
    color: COLORS.danger,
    textAlign: 'center',
    fontWeight: '600',
  },
  formCard: {
    backgroundColor: COLORS.white,
    padding: 18,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    marginBottom: 20,
    ...SHADOWS.small,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 6,
    marginTop: 10,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  genderRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
    marginBottom: 6,
  },
  genderPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    height: 42,
    borderRadius: 10,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  selectedGenderPill: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  genderText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  selectedGenderText: {
    color: COLORS.white,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    height: 52,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    ...SHADOWS.medium,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.white,
  },
});
