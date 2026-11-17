import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import { saveProfileData } from '../../utils/profileStorage';

import { useAppDispatch, useAppSelector } from '../../redux';
import { updateProfile } from '../../redux/slice/authSlice';

import { completeOnboarding } from '../../services/auth/auth';

import {
  HeaderSection,
  StepBody,
  PrimaryButton,
  DateInput,
  CustomDropdown,
} from '../../components';

import {
  lactatingOptions,
  contraceptiveOptions,
  bleedTimelineOptions,
  cycleLengthOptions,
} from '../../utils/profileData';

import { image } from '../../assets';
import styles from './style';
import { validateCyclesState } from '../../utils/validations';
import { ScreenName } from '../../navigation/screenName';

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const YourCycles = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();

  const dispatch = useAppDispatch();

  const profile = useAppSelector(state => state.auth.profile);

  // console.log('Redux Profile:', profile);

  const [hasInteracted, setHasInteracted] = useState(false);
  const [hasAttemptedNext, setHasAttemptedNext] = useState(false);

  const [lactating, setLactating] = useState('');
  const [contraceptive, setContraceptive] = useState('');
  const [bleedTimeline, setBleedTimeline] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const [lastMenstruationDate, setLastMenstruationDate] = useState<Date | null>(
    null,
  );

  const [cycleLength, setCycleLength] = useState('');

  const areAllFieldsFilled = validateCyclesState(
    lactating,
    contraceptive,
    bleedTimeline,
    lastMenstruationDate,
    cycleLength,
  );

  const isNextDisabled = !areAllFieldsFilled || !hasInteracted || isLoading;

  const handleNext = async () => {
    setHasAttemptedNext(true);

    if (!areAllFieldsFilled || isLoading) {
      return;
    }

    if (!profile.dob) {
      console.log('DOB is missing from Redux profile');
      return;
    }

    const profileData = {
      lactating,
      contraceptive,
      bleedTimeline,
      lastMenstruationDate: lastMenstruationDate
        ? formatDate(lastMenstruationDate)
        : null,
      cycleLength,
    };

    const payload = {
      step: 2,
      basicDetails: {
        name: profile.name,
        dob: profile.dob,
        heightUnit: profile.heightUnit === 'CM' ? 1 : 2,
        height: profile.height,
        weightUnit: profile.weightUnit === 'KG' ? 1 : 2,
        weight: profile.weight,
      },
      healthDetail: {
        lactationStatus: 0,
        contraceptionStatus: 0,
        bleedingTimeline: 0,
        cycleLength: 0,
        lastMenstruationDate: lastMenstruationDate
          ? formatDate(lastMenstruationDate)
          : '',
      },
    };

    try {
      setIsLoading(true);

      console.log('COMPLETE ONBOARDING REQUEST:', payload);

      const response = await completeOnboarding(payload);

      console.log('COMPLETE ONBOARDING SUCCESS:', response);

      dispatch(updateProfile(profileData));

      await saveProfileData(profileData);

      console.log('PROFILE SAVED IN REDUX:', profileData);

      navigation.navigate(ScreenName.CatholicCommunity);
    } catch (error: any) {
      console.log('COMPLETE ONBOARDING ERROR:', error.response?.data || error);
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

      <StepBody
        root={styles.body}
        titlePrimary={t('cycles.step')}
        titleSecondary={t('cycles.title')}
        headingPrimaryStyle={styles.stepTitle}
        headingSecondaryStyle={styles.screenTitle}
        titleContentStyle={styles.titleContent}
        bottomContent={
          <View style={styles.bottomContent}>
            <PrimaryButton
              title={isLoading ? 'Please wait...' : t('common.next')}
              onPress={handleNext}
              disabled={isNextDisabled || isLoading}
            />
          </View>
        }
      >
        <Text style={styles.label}>{t('cycles.lactatingStatus')}</Text>

        <CustomDropdown
          title={t('cycles.lactatingTitle')}
          placeholder={t('cycles.lactatingTitle')}
          options={lactatingOptions.map(option => t(option))}
          selectedValue={lactating}
          onSelect={value => {
            setLactating(value);
            setHasInteracted(true);
          }}
        />

        <Text style={styles.label}>{t('cycles.contraceptiveStatus')}</Text>

        <View style={contraceptive && styles.selectedBorder}>
          <CustomDropdown
            title={t('cycles.contraceptiveTitle')}
            placeholder={t('cycles.contraceptiveStatus')}
            options={contraceptiveOptions.map(option => t(option))}
            selectedValue={contraceptive}
            onSelect={value => {
              setContraceptive(value);
              setHasInteracted(true);
            }}
          />
        </View>

        <Text style={styles.label}>{t('cycles.bleedTimeline')}</Text>

        <View style={bleedTimeline && styles.selectedBorder}>
          <CustomDropdown
            title={t('cycles.bleedTitle')}
            placeholder={t('cycles.bleedTitle')}
            options={bleedTimelineOptions.map(option => t(option))}
            selectedValue={bleedTimeline}
            onSelect={value => {
              setBleedTimeline(value);
              setHasInteracted(true);
            }}
          />
        </View>

        <Text style={styles.label}>{t('cycles.lastMenstruationDate')}</Text>

        <DateInput
          value={lastMenstruationDate}
          onChange={date => {
            setLastMenstruationDate(date);
            setHasInteracted(true);
          }}
          placeholder={t('cycles.datePlaceholder')}
        />

        <View style={styles.cycleLabelRow}>
          <Text style={styles.label}>{t('cycles.cycleLength')}</Text>

          <Image source={image.informationCircle} style={styles.infoIcon} />
        </View>

        <View style={cycleLength && styles.selectedBorder}>
          <CustomDropdown
            title={t('cycles.cycleLength')}
            placeholder={t('cycles.cycleStatus')}
            options={cycleLengthOptions}
            selectedValue={cycleLength}
            onSelect={value => {
              setCycleLength(value);
              setHasInteracted(true);
            }}
          />
        </View>
      </StepBody>
    </View>
  );
};

export default YourCycles;
