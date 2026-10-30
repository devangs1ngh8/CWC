import React, { useRef, useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

import HeaderSection from '../../components/headerSection';
import { PasswordInput, PrimaryButton } from '../../components';
import { image } from '../../assets';
import styles from './style';
import { cleanPassword, validateChangePassword } from '../../utils/validations';
import { checkSavedPassword } from '../../utils/commonFunctions';

const ChangePassword = () => {
  const navigation = useNavigation<any>();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const passwordRef = useRef<(TextInput | null)[]>([]);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [oldPasswordError, setOldPasswordError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const [hasInteracted, setHasInteracted] = useState(false);

  const checkOldPassword = async () => {
    const cleanedOldPassword = cleanPassword(oldPassword);

    if (!cleanedOldPassword) {
      setOldPasswordError(t('changePassword.errors.oldRequired'));
      return false;
    }

    const savedPassword = await AsyncStorage.getItem('savedPassword');

    if (!savedPassword || cleanedOldPassword !== savedPassword) {
      setOldPasswordError(t('changePassword.errors.oldIncorrect'));
      return false;
    }

    setOldPasswordError('');
    return true;
  };

  const handlePasswordFieldBlur = async () => {
    if (newPassword || confirmPassword) {
      await checkOldPassword();
    }
  };

  const handleChangePassword = async () => {
    const oldPass = cleanPassword(oldPassword);
    const newPass = cleanPassword(newPassword);
    const confirmPass = cleanPassword(confirmPassword);

    const validation = validateChangePassword(oldPass, newPass, confirmPass);

    setNewPasswordError(
      validation.newPasswordError
        ? t(`changePassword.errors.${validation.newPasswordError}`)
        : '',
    );

    setConfirmPasswordError(
      validation.confirmPasswordError
        ? t(`changePassword.errors.${validation.confirmPasswordError}`)
        : '',
    );

    if (!oldPass) {
      setOldPasswordError(t('changePassword.errors.oldRequired'));
      return;
    }

    const isOldPasswordCorrect = await checkSavedPassword(oldPass);

    if (!isOldPasswordCorrect) {
      setOldPasswordError(t('changePassword.errors.oldIncorrect'));
      return;
    }

    setOldPasswordError('');

    if (validation.newPasswordError || validation.confirmPasswordError) {
      return;
    }

    await AsyncStorage.setItem('savedPassword', newPass);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={0}
    >
      <HeaderSection
        title={t('changePassword.title')}
        backgroundImage={image.homeBG}
        showBackButton
      />

      <View style={styles.body}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
        >
          <PasswordInput
            ref={ref => {
              passwordRef.current[0] = ref;
            }}
            label={t('changePassword.oldPassword')}
            placeholder={t('changePassword.enterOldPassword')}
            value={oldPassword}
            onChangeText={value => {
              setHasInteracted(true);
              setOldPassword(cleanPassword(value));
              setOldPasswordError('');
            }}
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => passwordRef.current[1]?.focus()}
            error={oldPasswordError}
          />

          <PasswordInput
            ref={ref => {
              passwordRef.current[1] = ref;
            }}
            label={t('changePassword.newPassword')}
            placeholder={t('changePassword.enterNewPassword')}
            value={newPassword}
            onChangeText={value => {
              setHasInteracted(true);
              setNewPassword(cleanPassword(value));
              setNewPasswordError('');
            }}
            onBlur={handlePasswordFieldBlur}
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => passwordRef.current[2]?.focus()}
            error={newPasswordError}
          />

          <PasswordInput
            ref={ref => {
              passwordRef.current[2] = ref;
            }}
            label={t('changePassword.confirmPassword')}
            placeholder={t('changePassword.enterConfirmPassword')}
            value={confirmPassword}
            onChangeText={value => {
              setHasInteracted(true);
              setConfirmPassword(cleanPassword(value));
              setConfirmPasswordError('');
            }}
            onBlur={handlePasswordFieldBlur}
            returnKeyType="done"
            onSubmitEditing={() => Keyboard.dismiss()}
            error={confirmPasswordError}
          />
        </ScrollView>

        <View style={{ paddingBottom: insets.bottom }}>
          <PrimaryButton
            title={t('changePassword.button')}
            onPress={handleChangePassword}
            disabled={!hasInteracted}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChangePassword;
