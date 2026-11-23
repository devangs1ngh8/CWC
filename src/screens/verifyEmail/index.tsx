import { View, Text, TextInput, Pressable } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import styles from './style';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BodySection, HeaderSection, PrimaryButton } from '../../components';
import { image } from '../../assets';
import { useTranslation } from 'react-i18next';

import { validateOtp } from '../../utils/validations';
import colors from '../../utils/color';

import { ScreenName } from '../../navigation/screenName';
import { verifyOtp, resendOtp } from '../../services/auth/auth';

import { Storage } from '../../services/storage';
import { StorageKeys } from '../../services/storage/keys';

const VerifyEmail = () => {
  const navigation = useNavigation<any>();

  const route = useRoute<any>();
  const { userId } = route.params || {};

  const { t } = useTranslation();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const [timer, setTimer] = useState(30);

  const inputRefs = useRef<any[]>([]);

  const handleVerify = async () => {
    if (otp.length !== 6) {
      setError(t('otp.otpError'));
      return;
    }

    if (!userId) {
      setError('User ID is missing. Please try signing up again.');
      return;
    }

    try {
      setIsLoading(true);
      setError('');

      const response = await verifyOtp({
        type: 1,
        otp,
        userId,
      });

      console.log('VERIFY OTP RESPONSE:', response);

      const accessToken = (response as any)?.data?.accessToken;

      if (!accessToken) {
        setError('Access token not received from server.');
        return;
      }

      await Storage.set(StorageKeys.AUTH_TOKEN, accessToken);

      console.log('BEARER TOKEN SAVED:', !!accessToken);

      navigation.navigate(ScreenName.PersonalInformation);
    } catch (error: any) {
      console.log('Verify OTP Error:', error.response?.data || error);

      setError(
        error.response?.data?.message ||
          error.message ||
          'Invalid OTP. Please try again.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (value: string, index: number) => {
    const digit = validateOtp(value);
    if (!digit) return;

    const updatedOtp = otp.split('');

    const targetIndex = updatedOtp[index] ? index + 1 : index;

    if (targetIndex >= 6) return;

    updatedOtp[targetIndex] = digit;

    setOtp(updatedOtp.join('').slice(0, 6));
    setError('');

    if (targetIndex < 5) {
      inputRefs.current[targetIndex + 1]?.focus();
    }
  };

  const handleBackspace = (index: number) => {
    const updatedOtp = otp.split('');

    if (updatedOtp[index]) {
      updatedOtp[index] = '';
      setOtp(updatedOtp.join(''));
    }

    if (index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer(prev => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleResend = async () => {
    if (!userId || isResending) return;

    setIsResending(true);

    try {
      await resendOtp(userId);

      setOtp('');
      setError('');
      setTimer(30);
      inputRefs.current[0]?.focus();
    } catch (error: any) {
      console.log('Resend OTP Error:', error.response?.data || error);

      setError(
        error.response?.data?.message ||
          error.message ||
          'Unable to resend OTP. Please try again.',
      );
    } finally {
      setIsResending(false);
    }
  };

  return (
    <View style={styles.container}>
      <HeaderSection
        backgroundImage={image.headImage}
        logo={image.splashText}
        style={styles.header}
        showBackButton
      />

      <BodySection
        titlePrimary={t('verifyEmail.primaryTitle')}
        titleSecondary={t('verifyEmail.secondaryTitle')}
        headingSecondaryStyle={styles.secondaryTextStyle}
        description={t('verifyEmail.subtitle')}
        bottomContent={
          <View style={styles.bottomContainer}>
            <PrimaryButton
              title={t('verifyEmail.confirmCode')}
              onPress={handleVerify}
              disabled={otp.length !== 6 || isLoading}
            />
          </View>
        }
      >
        <View>
          <View style={styles.otpContainer}>
            {Array.from({ length: 6 }, (_, index) => (
              <TextInput
                autoFocus={index === 0}
                key={index}
                ref={ref => {
                  inputRefs.current[index] = ref;
                }}
                style={[
                  styles.otpBox,
                  activeIndex === index && styles.activeOtpBox,
                ]}
                value={otp[index] || ''}
                maxLength={2}
                editable={true}
                selectionColor={colors.primary}
                onFocus={() => setActiveIndex(index)}
                keyboardType="number-pad"
                onChangeText={value => handleOtpChange(value, index)}
                onKeyPress={({ nativeEvent }) => {
                  if (nativeEvent.key === 'Backspace') {
                    handleBackspace(index);
                  }
                }}
              />
            ))}
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>

        <View style={styles.resendRow}>
          <Text style={styles.resendText}>Didn't received a code?</Text>

          {timer > 0 ? (
            <Text style={styles.resendTime}>
              00:{String(timer).padStart(2, '0')}
            </Text>
          ) : (
            <Pressable onPress={handleResend} disabled={isResending}>
              <Text style={styles.resendButton}>
                {isResending ? 'Sending...' : 'Resend OTP'}
              </Text>
            </Pressable>
          )}
        </View>
      </BodySection>
    </View>
  );
};

export default VerifyEmail;
