import React, { useRef, useState } from 'react';
import { View, Text, TextInput, Keyboard } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import styles from './style';

import { completeOnboarding } from '../../services/auth/auth';

import {
  HeaderSection,
  PrimaryButton,
  DateInput,
  UnitToggle,
  FormInput,
  HeightInput,
  StepBody,
} from '../../components';

import {
  cleanNumber,
  cleanName,
  validatePersonalInfoState,
  getPersonalInfoErrors,
} from '../../utils/validations';

import { image } from '../../assets';
import { ScreenName } from '../../navigation/screenName';

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const PersonalInformation = () => {
  const navigation = useNavigation<any>();
  const { t } = useTranslation();

  const inputRefs = useRef<(TextInput | null)[]>([]);

  const focusInput = (index: number) => {
    inputRefs.current[index]?.focus();
  };

  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState<Date | null>(null);

  const [heightUnit, setHeightUnit] = useState('CM');
  const [heightCm, setHeightCm] = useState('');
  const [feet, setFeet] = useState('');
  const [inches, setInches] = useState('');

  const [weightUnit, setWeightUnit] = useState('KG');
  const [weight, setWeight] = useState('');

  const [hasAttemptedNext, setHasAttemptedNext] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const { isFormValid, areAllFieldsFilled } = validatePersonalInfoState(
    fullName,
    dob,
    heightUnit,
    heightCm,
    feet,
    inches,
    weight,
    hasAttemptedNext,
  );

  const isNextDisabled = !isFormValid || !areAllFieldsFilled || isLoading;

  const errors = getPersonalInfoErrors(
    fullName,
    dob,
    heightUnit,
    heightCm,
    feet,
    inches,
    weight,
    hasAttemptedNext,
  );

  const translatedErrors = {
    name: errors.name ? t(`personalInfo.errors.${errors.name}`) : '',
    dob: errors.dob ? t(`personalInfo.errors.${errors.dob}`) : '',
    height: errors.height ? t(`personalInfo.errors.${errors.height}`) : '',
    weight: errors.weight ? t(`personalInfo.errors.${errors.weight}`) : '',
  };

  const handleNext = async () => {
    setHasAttemptedNext(true);

    if (!areAllFieldsFilled || !isFormValid || isLoading) {
      return;
    }

    const finalHeight = heightUnit === 'CM' ? heightCm : `${feet}' ${inches}"`;

    const formattedDob = dob ? formatDate(dob) : '';

    const payload = {
      step: 1,
      basicDetails: {
        name: fullName.trim(),
        dob: formattedDob,
        heightUnit: heightUnit === 'CM' ? 1 : 2,
        height: finalHeight,
        weightUnit: weightUnit === 'KG' ? 1 : 2,
        weight,
      },
    };

    try {
      setIsLoading(true);

      console.log('PERSONAL INFORMATION PAYLOAD:', payload);

      const response = await completeOnboarding(payload);

      console.log('PERSONAL INFORMATION RESPONSE:', response);

      if (response?.status === 200) {
        Keyboard.dismiss();
        navigation.navigate(ScreenName.YourCycles);
      }
    } catch (error: any) {
      console.log('PERSONAL INFORMATION ERROR:', error.response?.data || error);
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
      />

      <StepBody
        root={styles.body}
        titlePrimary={t('personalInfo.step')}
        titleSecondary={t('personalInfo.title')}
        headingPrimaryStyle={styles.stepTitle}
        headingSecondaryStyle={styles.screenTitle}
        titleContentStyle={styles.titleContent}
        bottomContent={
          <View style={styles.bottomContent}>
            <PrimaryButton
              title={isLoading ? 'Please wait...' : t('common.next')}
              disabled={isNextDisabled || isLoading}
              onPress={handleNext}
            />
          </View>
        }
      >
        <FormInput
          label={t('personalInfo.fullName')}
          placeholder={t('personalInfo.fullNamePlaceholder')}
          value={fullName}
          onChangeText={value => setFullName(cleanName(value))}
          autoCapitalize="words"
          maxLength={50}
          error={translatedErrors.name}
          inputStyle={fullName ? styles.filledInput : undefined}
          inputRef={ref => (inputRefs.current[0] = ref)}
          returnKeyType="next"
          onSubmitEditing={() => {
            focusInput(1);
          }}
        />

        <Text style={styles.label}>{t('personalInfo.dateOfBirth')}</Text>

        <DateInput
          value={dob}
          onChange={setDob}
          placeholder={t('personalInfo.datePlaceholder')}
          error={translatedErrors.dob}
          inputStyle={dob ? styles.filledInput : undefined}
        />

        <View style={styles.fieldHeader}>
          <Text style={styles.label}>{t('personalInfo.height')}</Text>

          <UnitToggle
            options={['CM', 'FT/IN']}
            selected={heightUnit}
            onSelect={setHeightUnit}
          />
        </View>

        {heightUnit === 'CM' ? (
          <FormInput
            label=""
            placeholder={t('personalInfo.heightCmPlaceholder')}
            value={heightCm}
            onChangeText={value => setHeightCm(cleanNumber(value))}
            keyboardType="numeric"
            maxLength={3}
            error={translatedErrors.height}
            inputStyle={heightCm ? styles.filledInput : undefined}
            inputRef={ref => (inputRefs.current[1] = ref)}
            returnKeyType="next"
            onSubmitEditing={() => focusInput(3)}
          />
        ) : (
          <HeightInput
            feet={feet}
            inches={inches}
            onFeetChange={setFeet}
            onInchesChange={setInches}
            feetPlaceholder={t('personalInfo.feetPlaceholder')}
            inchesPlaceholder={t('personalInfo.inchesPlaceholder')}
            placeholderColor={styles.placeholderColor.color}
            inputStyle={feet || inches ? styles.filledInput : undefined}
            feetInputRef={ref => (inputRefs.current[1] = ref)}
            inchesInputRef={ref => (inputRefs.current[2] = ref)}
            onFeetSubmitEditing={() => focusInput(2)}
            onInchesSubmitEditing={() => focusInput(3)}
          />
        )}

        <View style={styles.fieldHeader}>
          <Text style={styles.label}>{t('personalInfo.weight')}</Text>

          <UnitToggle
            options={['KG', 'LBS']}
            selected={weightUnit}
            onSelect={setWeightUnit}
          />
        </View>

        <FormInput
          label=""
          placeholder={
            weightUnit === 'KG'
              ? t('personalInfo.weightKgPlaceholder')
              : t('personalInfo.weightLbsPlaceholder')
          }
          value={weight}
          onChangeText={value => setWeight(cleanNumber(value))}
          keyboardType="numeric"
          maxLength={3}
          error={translatedErrors.weight}
          inputStyle={weight ? styles.filledInput : undefined}
          inputRef={ref => (inputRefs.current[3] = ref)}
          returnKeyType="done"
          onSubmitEditing={Keyboard.dismiss}
        />
      </StepBody>
    </View>
  );
};

export default PersonalInformation;
