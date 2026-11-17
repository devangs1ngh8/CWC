import { View, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import {
  BaseInput,
  BodySection,
  HeaderSection,
  PrimaryButton,
} from '../../components';
import { image } from '../../assets';
import { useTranslation } from 'react-i18next';

import { ScreenName } from '../../navigation/screenName';

import { validateEmail, cleanEmail } from '../../utils/validations';
import { forgotPassword } from '../../services/auth/auth';

const ForgotPassword = () => {
  const navigation = useNavigation<any>();
  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const handleSendCode = async () => {
    if (isLoading) return;

    const enteredEmail = email.trim();

    if (!validateEmail(enteredEmail)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    setEmailError('');
    setIsLoading(true);

    try {
      const response = await forgotPassword({
        email: enteredEmail,
      });

      if (response?.status === 200 && response?.data?.userId) {
        navigation.navigate(ScreenName.SecurityPin, {
          email: enteredEmail,
          userId: response.data.userId,
        });
      } else {
        setEmailError(response?.message || 'Unable to send OTP.');
      }
    } catch (error: any) {
      console.log('FORGOT PASSWORD ERROR:', error.response?.data || error);

      setEmailError(
        error.response?.data?.message ||
          error.message ||
          'Unable to send OTP. Please try again.',
      );
    } finally {
      setIsLoading(false);
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
        titlePrimary={t('forgotPassword.primaryTitle')}
        titleSecondary={t('forgotPassword.secondaryTitle')}
        headingPrimaryStyle={styles.primaryTextStyle}
        description={t('forgotPassword.subtitle')}
        bottomContent={
          <View>
            <PrimaryButton
              onPress={handleSendCode}
              disabled={!email.trim() || isLoading}
              title={isLoading ? 'Sending...' : t('forgotPassword.sendCode')}
            />
          </View>
        }
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <BaseInput
            label={t('forgotPassword.email')}
            placeholder={t('forgotPassword.enterEmail')}
            keyboardType="email-address"
            value={email}
            onChangeText={value => {
              setEmail(cleanEmail(value));
              setEmailError('');
            }}
            maxLength={50}
            autoCapitalize="none"
            autoCorrect={false}
            error={emailError}
          />
        </ScrollView>
      </BodySection>
    </View>
  );
};

export default ForgotPassword;
