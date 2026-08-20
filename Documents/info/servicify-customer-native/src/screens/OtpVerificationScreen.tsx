import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Animated,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { KeyRound, CheckCircle2, RefreshCw } from 'lucide-react-native';
import { Header } from '../components/Header';
import { COLORS, SHADOWS } from '../theme/colors';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'OtpVerification'>;

export const OtpVerificationScreen: React.FC<Props> = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const { mobile, demoOtp = '1234' } = route.params;

  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const handleAutoFillDemoOtp = () => {
    setOtp(demoOtp);
    setError('');
  };

  const handleVerify = () => {
    if (otp !== demoOtp) {
      setError(`Invalid OTP! Please use demo OTP: ${demoOtp}`);
      return;
    }
    setError('');
    // On OTP verification success, navigate directly to Home Dashboard
    navigation.replace('MainTabs');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header
        showBack
        title="Verify OTP"
        onBackPress={() => navigation.goBack()}
      />

      <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        {/* Verification Icon Header */}
        <View style={styles.iconCircle}>
          <KeyRound size={36} color={COLORS.primary} />
        </View>

        <Text style={styles.title}>Enter OTP Code</Text>
        <Text style={styles.subtitle}>
          We sent a 4-digit verification code to{' '}
          <Text style={styles.highlightMobile}>{mobile}</Text>
        </Text>

        {/* Prominent Demo OTP Box */}
        <View style={styles.demoOtpBox}>
          <Text style={styles.demoTitle}>🔑 DEMO OTP VERIFICATION</Text>
          <Text style={styles.demoCodeText}>{demoOtp}</Text>
          <TouchableOpacity
            style={styles.autoFillButton}
            onPress={handleAutoFillDemoOtp}
            activeOpacity={0.8}
          >
            <Text style={styles.autoFillText}>Tap to Auto-Fill OTP ({demoOtp})</Text>
          </TouchableOpacity>
        </View>

        {/* OTP Input Field */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.otpInput}
            value={otp}
            onChangeText={setOtp}
            keyboardType="number-pad"
            maxLength={4}
            placeholder="• • • •"
            placeholderTextColor={COLORS.textMuted}
          />
        </View>

        {error !== '' && <Text style={styles.errorText}>{error}</Text>}

        {/* Resend Code Option */}
        <TouchableOpacity style={styles.resendRow} activeOpacity={0.7}>
          <RefreshCw size={14} color={COLORS.primary} />
          <Text style={styles.resendText}>Resend OTP Code</Text>
        </TouchableOpacity>

        {/* Verify CTA */}
        <TouchableOpacity
          style={styles.verifyButton}
          onPress={handleVerify}
          activeOpacity={0.85}
        >
          <CheckCircle2 size={20} color={COLORS.white} />
          <Text style={styles.verifyButtonText}>Verify & Enter Dashboard</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 30,
    alignItems: 'center',
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.primaryBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  highlightMobile: {
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  demoOtpBox: {
    width: '100%',
    backgroundColor: COLORS.primaryBg,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderStyle: 'dashed',
    marginBottom: 24,
  },
  demoTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: 1,
  },
  demoCodeText: {
    fontSize: 32,
    fontWeight: '900',
    color: COLORS.primary,
    letterSpacing: 10,
    marginVertical: 8,
  },
  autoFillButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    marginTop: 4,
  },
  autoFillText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.white,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 14,
  },
  otpInput: {
    backgroundColor: COLORS.background,
    borderRadius: 14,
    height: 56,
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: 12,
    color: COLORS.textPrimary,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  errorText: {
    fontSize: 13,
    color: COLORS.danger,
    fontWeight: '600',
    marginBottom: 10,
  },
  resendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 30,
  },
  resendText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
  },
  verifyButton: {
    width: '100%',
    backgroundColor: COLORS.primary,
    height: 52,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    ...SHADOWS.medium,
  },
  verifyButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.white,
  },
});
