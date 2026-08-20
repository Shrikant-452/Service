import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Phone, Mail, Lock, ArrowRight, UserPlus } from 'lucide-react-native';
import { COLORS, SHADOWS } from '../theme/colors';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  
  const [loginMethod, setLoginMethod] = useState<'mobile' | 'email'>('mobile');
  const [mobile, setMobile] = useState('+91 98765 43210');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  const handleLogin = () => {
    if (loginMethod === 'mobile') {
      if (!mobile.trim()) {
        setErrorMsg('Please enter a valid mobile number.');
        return;
      }
      setErrorMsg('');
      const demoOtp = '1234';
      navigation.navigate('OtpVerification', {
        name: 'Demo User',
        mobile,
        email: '',
        address: '',
        gender: '',
        dob: '',
        demoOtp,
      });
    } else {
      if (!email.trim() || !password.trim()) {
        setErrorMsg('Please enter email and password.');
        return;
      }
      setErrorMsg('');
      // Mock direct login for email/password
      navigation.replace('MainTabs');
    }
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
            <View style={styles.headerSection}>
              <View style={styles.logoBadge}>
                <Text style={styles.logoIcon}>🛠️</Text>
              </View>
              <Text style={styles.brandName}>SERVICIFY</Text>
              <Text style={styles.welcomeTitle}>Welcome Back</Text>
              <Text style={styles.welcomeSubtitle}>
                Log in to book verified home services instantly.
              </Text>
            </View>

            {errorMsg !== '' && (
              <View style={styles.errorBanner}>
                <Text style={styles.errorText}>{errorMsg}</Text>
              </View>
            )}

            {/* Toggle Login Method */}
            <View style={styles.toggleContainer}>
              <TouchableOpacity
                style={[styles.toggleBtn, loginMethod === 'mobile' && styles.activeToggle]}
                onPress={() => { setLoginMethod('mobile'); setErrorMsg(''); }}
              >
                <Text style={[styles.toggleText, loginMethod === 'mobile' && styles.activeToggleText]}>
                  Mobile
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.toggleBtn, loginMethod === 'email' && styles.activeToggle]}
                onPress={() => { setLoginMethod('email'); setErrorMsg(''); }}
              >
                <Text style={[styles.toggleText, loginMethod === 'email' && styles.activeToggleText]}>
                  Email
                </Text>
              </TouchableOpacity>
            </View>

            {/* Form Card */}
            <View style={styles.formCard}>
              {loginMethod === 'mobile' ? (
                <>
                  <Text style={styles.inputLabel}>Mobile Number</Text>
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
                </>
              ) : (
                <>
                  <Text style={styles.inputLabel}>Email Address</Text>
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
                  <Text style={styles.inputLabel}>Password</Text>
                  <View style={styles.inputWrapper}>
                    <Lock size={18} color={COLORS.primary} style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your password"
                      placeholderTextColor={COLORS.textMuted}
                      secureTextEntry
                      value={password}
                      onChangeText={setPassword}
                    />
                  </View>
                </>
              )}
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleLogin}
              activeOpacity={0.85}
            >
              <Text style={styles.submitButtonText}>
                {loginMethod === 'mobile' ? 'Send OTP' : 'Login'}
              </Text>
              <ArrowRight size={18} color={COLORS.white} />
            </TouchableOpacity>

            {/* Sign Up Link */}
            <TouchableOpacity
              style={styles.signupButton}
              onPress={() => navigation.navigate('Signup')}
              activeOpacity={0.85}
            >
              <UserPlus size={18} color={COLORS.primary} />
              <Text style={styles.signupButtonText}>New user? Sign up here</Text>
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
    paddingTop: 30,
    paddingBottom: 40,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 30,
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
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginTop: 6,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 4,
    paddingHorizontal: 16,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 4,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    ...SHADOWS.small,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  activeToggle: {
    backgroundColor: COLORS.primary,
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  activeToggleText: {
    color: COLORS.white,
    fontWeight: '700',
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
    height: 50,
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
  submitButton: {
    backgroundColor: COLORS.primary,
    height: 52,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    ...SHADOWS.medium,
    marginBottom: 20,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.white,
  },
  signupButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    backgroundColor: COLORS.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  signupButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.primary,
  },
});
