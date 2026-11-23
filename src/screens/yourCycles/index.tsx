import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import { completeOnboarding } from '../../services/auth/auth';

import { getUserProfile } from '../../services/auth/auth';

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

const getOptionId = (
  options: string[],
  selectedValue: string,
  t: (key: string) => string,
) => {
  const translatedOptions = options.map(option => t(option));

  const selectedIndex = translatedOptions.indexOf(selectedValue);

  return selectedIndex === -1 ? 0 : selectedIndex + 1;
};

const YourCycles = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();

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

    const payload = {
      step: 2,
      healthDetail: {
        lactationStatus: getOptionId(lactatingOptions, lactating, t),

        contraceptionStatus: getOptionId(
          contraceptiveOptions,
          contraceptive,
          t,
        ),

        bleedingTimeline: getOptionId(bleedTimelineOptions, bleedTimeline, t),

        cycleLength: Number(cycleLength),

        lastMenstruationDate: lastMenstruationDate
          ? formatDate(lastMenstruationDate)
          : '',
      },
    };

    try {
      setIsLoading(true);

      console.log('YOUR CYCLES PAYLOAD:', payload);

      const response = await completeOnboarding(payload);

      console.log('YOUR CYCLES RESPONSE:', response);

      if (response?.status === 200) {
        const profileResponse = await getUserProfile();

        console.log(
          'YOUR CYCLES SAVED DATA:',
          JSON.stringify(profileResponse.data.healthDetail, null, 2),
        );

        console.log('SELECTED VALUES:', {
          lactating,
          contraceptive,
          bleedTimeline,
          cycleLength,
        });

        console.log('API PAYLOAD:', JSON.stringify(payload, null, 2));

        navigation.navigate(ScreenName.CatholicCommunity);
      }
    } catch (error: any) {
      console.log('YOUR CYCLES ERROR:', error.response?.data || error);
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
