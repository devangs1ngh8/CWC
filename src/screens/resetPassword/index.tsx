import { View, Text, Image, Keyboard } from 'react-native';
import React, { useRef, useState } from 'react';

import {
  BodySection,
  HeaderSection,
  PasswordInput,
  PrimaryButton,
  ErrorMessage,
} from '../../components';

import Toast from 'react-native-toast-message';

import styles from './style';
import { image } from '../../assets';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { cleanPassword, validatePassword } from '../../utils/validations';

import { ScreenName } from '../../navigation/screenName';

import { changePassword } from '../../services/auth/auth';

const ResetPassword = () => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();

  const route = useRoute<any>();
  const { userId } = route.params || {};

  const inputRef = useRef<any>(null);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const [isResetting, setIsResetting] = useState(false);

  const handleResetPassword = async () => {
    Keyboard.dismiss();

    const isPasswordValid = validatePassword(password);
    const passwordsMatch = password === confirmPassword;

    setPasswordError(
      isPasswordValid
        ? ''
        : 'Password must contain 8-15 characters, uppercase, lowercase, number and special character.',
    );

    setConfirmPasswordError(passwordsMatch ? '' : 'Passwords do not match.');

    if (!isPasswordValid || !passwordsMatch) {
      return;
    }

    if (!userId) {
      Toast.show({
        type: 'error',
        text1: 'Reset Failed',
        text2: 'User ID not found. Please verify OTP again.',
      });
      return;
    }

    try {
      setIsResetting(true);

      const response = await changePassword({
        password,
        userId,
      });

      if (response.status === 200) {
        Toast.show({
          type: 'success',
          text1: 'Password Reset',
          text2: 'Your password has been reset successfully.',
        });

        setTimeout(() => {
          navigation.reset({
            index: 0,
            routes: [{ name: ScreenName.Login }],
          });
        }, 1500);
      }
    } catch (error: any) {
      console.log('RESET PASSWORD ERROR:', error?.response?.data || error);

      Toast.show({
        type: 'error',
        text1: 'Reset Failed',
        text2:
          error?.response?.data?.message ||
          'Unable to reset password. Please try again.',
      });
    } finally {
      setIsResetting(false);
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
        titlePrimary={t('reset.primaryTitle')}
        titleSecondary={t('reset.secondaryTitle')}
        headingSecondaryStyle={styles.secondaryTitleStyle}
        description={t('reset.description')}
        bottomContent={
          <View>
            <PrimaryButton
              title={t('reset.resetPassword')}
              onPress={handleResetPassword}
              disabled={!password || !confirmPassword || isResetting}
            />
          </View>
        }
      >
        <PasswordInput
          label="New password"
          placeholder="Enter Password"
          value={password}
          onChangeText={value => {
            setPassword(cleanPassword(value));
            setPasswordError('');
          }}
          maxLength={15}
          returnKeyType="next"
          onSubmitEditing={() => inputRef.current?.focus()}
          error={passwordError}
        />

        <PasswordInput
          ref={inputRef}
          label="Confirm password"
          placeholder="Enter Password"
          value={confirmPassword}
          onChangeText={value => {
            setConfirmPassword(cleanPassword(value));
            setConfirmPasswordError('');
          }}
          maxLength={15}
          onSubmitEditing={() => Keyboard.dismiss()}
          error={confirmPasswordError}
        />

        <View style={styles.warningContainer}>
          <Image source={image.infoCircle} style={styles.warningImg} />
          <Text style={styles.warningText}>{t('reset.passwordWarning')}</Text>
        </View>
      </BodySection>
    </View>
  );
};

export default ResetPassword;
