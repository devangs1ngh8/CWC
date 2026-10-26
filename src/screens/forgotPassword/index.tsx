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
import { validateEmail } from '../../utils/validations';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ForgotPassword = () => {
  const navigation = useNavigation<any>();
  const { t } = useTranslation();

  const insets = useSafeAreaInsets();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleSendCode = () => {
    const validEmail = validateEmail(email);
    setEmailError(validEmail ? '' : t('forgotPassword.emailError'));

    if (validEmail) {
      navigation.navigate('SecurityPin');
    }
  };

  const isFormValid = email.trim() !== '' && validateEmail(email);

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
          <View style={{ paddingBottom: insets.bottom }}>
            <PrimaryButton
              onPress={handleSendCode}
              disabled={!isFormValid}
              title={t('forgotPassword.sendCode')}
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
            onChangeText={setEmail}
            maxLength={15}
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
