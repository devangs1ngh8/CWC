import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { saveProfileData } from '../../utils/profileStorage';

import styles from './style';
import {
  HeaderSection,
  BodySection,
  PrimaryButton,
  DateInput,
  UnitToggle,
  FormInput,
  HeightInput,
} from '../../components';

import {
  cleanNumber,
  cleanName,
  validatePersonalInfoState,
  getPersonalInfoErrors,
} from '../../utils/validations';

import { image } from '../../assets';
import { useNavigation } from '@react-navigation/native';
import { ScreenName } from '../../navigation/screenName';

const PersonalInformation = () => {
  const navigation = useNavigation<any>();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState<Date | null>(null);

  const [heightUnit, setHeightUnit] = useState('CM');
  const [heightCm, setHeightCm] = useState('');
  const [feet, setFeet] = useState('');
  const [inches, setInches] = useState('');

  const [weightUnit, setWeightUnit] = useState('KG');
  const [weight, setWeight] = useState('');

  const [hasAttemptedNext, setHasAttemptedNext] = useState(false);

  const { isFormValid, areAllFieldsFilled, isNextDisabled } =
    validatePersonalInfoState(
      fullName,
      dob,
      heightUnit,
      heightCm,
      feet,
      inches,
      weight,
      hasAttemptedNext,
    );

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

    if (!areAllFieldsFilled || !isFormValid) {
      return;
    }

    const finalHeight = heightUnit === 'CM' ? heightCm : `${feet}' ${inches}"`;

    await saveProfileData({
      name: fullName.trim(),
      dob: dob?.toISOString() ?? null,
      height: finalHeight,
      heightUnit,
      weight,
      weightUnit,
    });

    navigation.navigate(ScreenName.YourCycles);
  };

  return (
    <View style={styles.container}>
      <HeaderSection
        backgroundImage={image.headImage}
        logo={image.splashText}
        style={styles.header}
      />

      <BodySection
        root={styles.body}
        titlePrimary={t('personalInfo.step')}
        titleSecondary={t('personalInfo.title')}
        headingPrimaryStyle={styles.stepTitle}
        headingSecondaryStyle={styles.screenTitle}
        titleContentStyle={styles.titleContent}
        bottomContent={
          <View
            style={[styles.bottomContent, { paddingBottom: insets.bottom }]}
          >
            <PrimaryButton
              title={t('common.next')}
              disabled={isNextDisabled}
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
        />
      </BodySection>
    </View>
  );
};

export default PersonalInformation;
