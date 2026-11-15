import { View, Text, Pressable, Keyboard } from 'react-native';
import React, { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import styles from './style';
import {
  BodySection,
  HeaderSection,
  PrimaryButton,
  BaseInput,
  PasswordInput,
} from '../../components';
import {
  validateEmail,
  cleanEmail,
  cleanPassword,
} from '../../utils/validations';
import { image } from '../../assets';

import { useTranslation } from 'react-i18next';
import { ScreenName } from '../../navigation/screenName';
import { loginUser } from '../../services/auth/auth';
import { Storage } from '../../services/storage';
import { StorageKeys } from '../../services/storage/keys';

import { useAppDispatch, useAppSelector } from '../../redux/auth/hooks';

import { setEmail as setReduxEmail } from '../../redux/auth/authSlice';

const Login = () => {
  const navigation = useNavigation<any>();
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();

  const inputRef = useRef<any>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const savedEmail = useAppSelector(state => state.auth.email);

  console.log('Redux Email:', savedEmail);

  const handleLogin = async () => {
    if (isLoading) return;

    const validEmail = validateEmail(email);

    setEmailError(validEmail ? '' : 'Incorrect Email');
    setPasswordError('');

    if (!validEmail || !password.trim()) return;

    Keyboard.dismiss();
    setIsLoading(true);

    try {
      const data = await loginUser({
        type: 1,
        email: email.trim(),
        password,
      });

      await Storage.set(StorageKeys.AUTH_TOKEN, data.accessToken);

      dispatch(setReduxEmail(email.trim()));

      navigation.reset({
        index: 0,
        routes: [{ name: ScreenName.MainTabs }],
      });
    } catch (error: any) {
      console.log('Login Error:', error.response?.data || error);

      const message =
        error.response?.data?.message ||
        error.message ||
        'Invalid email or password';

      setPasswordError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = email.trim().length > 0 && password.length > 0;

  return (
    <View style={styles.container}>
      <HeaderSection
        backgroundImage={image.headImage}
        logo={
          i18n.resolvedLanguage === 'es'
            ? image.spanishSplashText
            : image.splashText
        }
        style={styles.header}
      />

      <BodySection
        titlePrimary={t('login.primaryTitle')}
        titleSecondary={t('login.secondaryTitle')}
        headingPrimaryStyle={styles.primaryTextStyle}
        description={t('login.subtitle')}
        bottomContent={
          <View>
            <PrimaryButton
              title={t('login.loginButton')}
              onPress={handleLogin}
              disabled={!isFormValid || isLoading}
            />

            <View style={styles.createTextRow}>
              <Text style={styles.createText}>{t('login.createAccount')}</Text>
              <Pressable onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.link}>{t('login.here')}</Text>
              </Pressable>
            </View>
          </View>
        }
      >
        <BaseInput
          label={t('login.email')}
          placeholder={t('login.enterEmail')}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          maxLength={50}
          returnKeyType="next"
          onSubmitEditing={() => inputRef.current?.focus()}
          onChangeText={value => setEmail(cleanEmail(value))}
          error={emailError}
        />

        <PasswordInput
          ref={inputRef}
          label={t('login.password')}
          placeholder={t('login.enterPassword')}
          value={password}
          returnKeyType="done"
          onSubmitEditing={() => Keyboard.dismiss()}
          onChangeText={value => setPassword(cleanPassword(value))}
          error={passwordError}
        />

        <Pressable
          style={styles.forgot}
          onPress={() => navigation.navigate('ForgotPassword')}
        >
          <Text style={styles.forgotText}>{t('login.forgotPassword')}</Text>
        </Pressable>
      </BodySection>
    </View>
  );
};

export default Login;
