import { View, Text, Pressable, Alert, Keyboard } from 'react-native';
import React, { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AsyncStorage from '@react-native-async-storage/async-storage';

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
  validatePassword,
  cleanEmail,
  cleanPassword,
} from '../../utils/validations';
import { image } from '../../assets';

import { useTranslation } from 'react-i18next';
import { ScreenName } from '../../navigation/screenName';

const Login = () => {
  const navigation = useNavigation<any>();
  const { t, i18n } = useTranslation();

  const inputRef = useRef<any>(null);

  const insets = useSafeAreaInsets();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLogin = async () => {
    const validEmail = validateEmail(email);
    const validPassword = validatePassword(password);

    setEmailError(validEmail ? '' : 'Incorrect Email');
    setPasswordError(validPassword ? '' : t('login.passwordError'));

    if (!validEmail && !validPassword) {
      return;
    }

    const savedPassword = await AsyncStorage.getItem('savedPassword');

    if (savedPassword === null) {
      setEmailError('Incorrect Email');
      return;
    }

    if (password !== savedPassword) {
      setPasswordError('Incorrect Password');
      return;
    }

    navigation.reset({
      index: 0,
      routes: [{ name: 'MainTabs' }],
    });
  };

  const isFormValid = email.trim() !== '' && password.trim() !== '';

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
          <View style={{ paddingBottom: insets.bottom }}>
            <PrimaryButton
              title={t('login.loginButton')}
              onPress={handleLogin}
              disabled={!isFormValid}
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
