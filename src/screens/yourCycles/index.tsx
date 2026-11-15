import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import { saveProfileData } from '../../utils/profileStorage';

import { useAppDispatch, useAppSelector } from '../../redux/auth/hooks';
import { updateProfile } from '../../redux/auth/authSlice';

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

  console.log('Redux Profile:', profile);

  const [hasInteracted, setHasInteracted] = useState(false);
  const [hasAttemptedNext, setHasAttemptedNext] = useState(false);

  const [lactating, setLactating] = useState('');
  const [contraceptive, setContraceptive] = useState('');
  const [bleedTimeline, setBleedTimeline] = useState('');

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

  const isNextDisabled = hasAttemptedNext
    ? !areAllFieldsFilled
    : !hasInteracted;

  const handleNext = async () => {
    setHasAttemptedNext(true);

    if (!areAllFieldsFilled) {
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

    dispatch(updateProfile(profileData));

    await saveProfileData(profileData);

    navigation.navigate(ScreenName.YourPreferences);
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
              title={t('common.next')}
              onPress={handleNext}
              disabled={isNextDisabled}
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
