import { View, Text, Pressable, Keyboard, Image } from 'react-native';
import React, { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { registerUser } from '../../services/auth/auth';

import { setEmail as setReduxEmail } from '../../redux/slice/authSlice';
import { useAppDispatch, useAppSelector } from '../../redux';

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

const SignUp = () => {
  const navigation = useNavigation<any>();
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();

  const inputRef = useRef<any>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const savedEmail = useAppSelector(state => state.auth.email);

  console.log('Redux Email:', savedEmail);

  const handleRegister = async () => {
    if (isLoading) return;

    const validEmail = validateEmail(email);
    const validPassword = validatePassword(password);

    setEmailError(validEmail ? '' : 'Incorrect Email');
    setPasswordError(validPassword ? '' : 'Incorrect Password');

    if (!validEmail || !validPassword) return;

    Keyboard.dismiss();
    setIsLoading(true);

    try {
      const data = await registerUser({
        type: 1,
        email: email.trim(),
        password,
      });

      dispatch(setReduxEmail(email.trim()));
      console.log('Signup Email Dispatched:', email.trim());

      navigation.navigate(ScreenName.VerifyEmail, {
        userId: data.userId,
        email: email.trim(),
      });
    } catch (error: any) {
      console.log('Register Error:', error.response?.data || error);

      const message =
        error.response?.data?.message || error.message || 'Registration failed';

      setEmailError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = email.trim() !== '' && password.trim() !== '' && agreed;

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
        titlePrimary={t('signup.primaryTitle')}
        titleSecondary={t('signup.secondaryTitle')}
        headingPrimaryStyle={styles.primaryTextStyle}
        description={t('signup.subtitle')}
        bottomContent={
          <View>
            <PrimaryButton
              title={t('signup.registerButton')}
              onPress={handleRegister}
              disabled={!isFormValid || isLoading}
            />

            <View style={styles.createTextRow}>
              <Text style={styles.createText}>
                {t('signup.alreadyAccount')}
              </Text>
              <Pressable onPress={() => navigation.navigate(ScreenName.Login)}>
                <Text style={styles.link}>{t('signup.login')}</Text>
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

        <Pressable style={styles.consentRow} onPress={() => setAgreed(!agreed)}>
          <View style={agreed ? styles.checkboxSelected : styles.checkbox}>
            {agreed && (
              <Image source={image.tickCheckbox} style={styles.tickIcon} />
            )}
          </View>
          <View style={styles.consentTextRow}>
            <Text style={styles.consentText}>{t('signup.agree')}</Text>
            <Pressable
              onPress={() => navigation.navigate(ScreenName.PrivacyPolicy)}
            >
              <Text style={styles.link}>{t('signup.privacy')}</Text>
            </Pressable>

            <Text style={styles.consentText}>{t('signup.and')}</Text>
            <Pressable
              onPress={() => navigation.navigate(ScreenName.TermsConditions)}
            >
              <Text style={styles.link}>{t('signup.terms')}</Text>
            </Pressable>
          </View>
        </Pressable>
      </BodySection>
    </View>
  );
};

export default SignUp;
