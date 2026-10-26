import { View, Text, TextInput } from 'react-native';
import React, { useRef, useState } from 'react';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
import { BodySection, HeaderSection, PrimaryButton } from '../../components';
import { image } from '../../assets';
import { useTranslation } from 'react-i18next';

import { validateOtp } from '../../utils/validations';
import colors from '../../utils/color';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SecurityPin = () => {
  const navigation = useNavigation<any>();
  const { t } = useTranslation();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const insets = useSafeAreaInsets();

  const inputRefs = useRef<any[]>([]);

  const handleVerify = () => {
    if (otp.length !== 6) {
      setError(t('otp.otpError'));
      return;
    }
    navigation.navigate('ResetPassword');
  };

  const handleOtpChange = (value: string, index: number) => {
    const digit = validateOtp(value);

    const updatedOtp = otp.split('');
    updatedOtp[index] = digit;

    setOtp(updatedOtp.join(''));

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (index: number) => {
    if (index > 0 && !otp[index]) {
      inputRefs.current[index - 1]?.focus();
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
        titlePrimary={t('securityPin.primaryTitle')}
        titleSecondary={t('securityPin.secondaryTitle')}
        headingSecondaryStyle={styles.secondaryTextStyle}
        description={t('securityPin.subtitle')}
        bottomContent={
          <View
            style={[styles.bottomContainer, { paddingBottom: insets.bottom }]}
          >
            <PrimaryButton
              title={t('securityPin.verifyCode')}
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
                key={index}
                ref={ref => {
                  inputRefs.current[index] = ref;
                }}
                style={[
                  styles.otpBox,
                  activeIndex === index && styles.activeOtpBox,
                ]}
                value={otp[index] || ''}
                maxLength={1}
                selectionColor={colors.primary}
                onFocus={() => setActiveIndex(index)}
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
      </BodySection>
    </View>
  );
};

export default SecurityPin;
