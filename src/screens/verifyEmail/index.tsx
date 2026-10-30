import { View, Text, TextInput, Pressable } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
import { BodySection, HeaderSection, PrimaryButton } from '../../components';
import { image } from '../../assets';
import { useTranslation } from 'react-i18next';

import { validateOtp } from '../../utils/validations';
import colors from '../../utils/color';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenName } from '../../navigation/screenName';

const SecurityPin = () => {
  const navigation = useNavigation<any>();
  const { t } = useTranslation();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const insets = useSafeAreaInsets();

  const [timer, setTimer] = useState(30);

  const inputRefs = useRef<any[]>([]);

  const handleVerify = () => {
    if (otp.length !== 6) {
      setError(t('otp.otpError'));
      return;
    }
    navigation.navigate(ScreenName.PersonalInformation);
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
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleResend = () => {
    navigation.navigate('Hey');
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
          <View
            style={[styles.bottomContainer, { paddingBottom: insets.bottom }]}
          >
            <PrimaryButton
              title={t('verifyEmail.confirmCode')}
              onPress={handleVerify}
              disabled={otp.length !== 6}
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
                maxLength={26}
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
            <Pressable onPress={handleResend}>
              <Text style={styles.resendButton}>Resend OTP</Text>
            </Pressable>
          )}
        </View>
      </BodySection>
    </View>
  );
};

export default SecurityPin;
