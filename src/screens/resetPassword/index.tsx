import { View, Text, Alert, Image, Keyboard } from 'react-native';
import React, { useRef, useState } from 'react';
import {
  BodySection,
  HeaderSection,
  PasswordInput,
  PrimaryButton,
} from '../../components';
import styles from './style';
import { image } from '../../assets';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { cleanPassword, validatePassword } from '../../utils/validations';
import { ScreenName } from '../../navigation/screenName';

const ResetPassword = () => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();

  const inputRef = useRef<any>(null);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleResetPassword = async () => {
    if (!validatePassword(password)) {
      Alert.alert('Invalid Password', 'Please enter a valid password');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match');
      return;
    }

    await AsyncStorage.setItem('savedPassword', password);
    navigation.reset({
      index: 0,
      routes: [{ name: ScreenName.Login }],
    });
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
          <View style={{ paddingBottom: insets.bottom }}>
            <PrimaryButton
              title={t('reset.resetPassword')}
              onPress={handleResetPassword}
              disabled={!password || !confirmPassword}
            />
          </View>
        }
      >
        <PasswordInput
          label="New password"
          placeholder="Enter Password"
          value={password}
          onChangeText={value => setPassword(cleanPassword(value))}
          maxLength={15}
          returnKeyType="next"
          onSubmitEditing={() => inputRef.current?.focus()}
        />

        <PasswordInput
          ref={inputRef}
          label="Confirm password"
          placeholder="Enter Password"
          value={confirmPassword}
          onChangeText={value => setConfirmPassword(cleanPassword(value))}
          maxLength={15}
          onSubmitEditing={() => Keyboard.dismiss()}
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
