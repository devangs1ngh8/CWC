import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { saveProfileData } from '../../utils/profileStorage';

import {
  HeaderSection,
  BodySection,
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
import { useNavigation } from '@react-navigation/native';
import { ScreenName } from '../../navigation/screenName';

const YourCycles = () => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();

  const [hasInteracted, setHasInteracted] = useState(false);
  const [hasAttemptedNext, setHasAttemptedNext] = useState(false);

  const [lactating, setLactating] = useState('Yes');
  const [contraceptive, setContraceptive] = useState('None');
  const [bleedTimeline, setBleedTimeline] = useState('Less than 3 days');
  const [lastMenstruationDate, setLastMenstruationDate] = useState<Date | null>(
    null,
  );
  const [cycleLength, setCycleLength] = useState('24');

  const cycleOptions = Array.from({ length: 23 }, (_, index) =>
    String(index + 18),
  );

  const handleNext = async () => {
    if (!areAllFieldsFilled) {
      return;
    }

    await saveProfileData({
      lactating,
      contraceptive,
      bleedTimeline,
      lastMenstruationDate: lastMenstruationDate?.toISOString() ?? null,
      cycleLength,
    });

    navigation.navigate(ScreenName.CatholicCommunity);
  };

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

  return (
    <View style={styles.container}>
      <HeaderSection
        backgroundImage={image.headImage}
        logo={image.splashText}
        style={styles.header}
        showBackButton
      />

      <BodySection
        titlePrimary={t('cycles.step')}
        titleSecondary={t('cycles.title')}
        headingPrimaryStyle={styles.stepTitle}
        headingSecondaryStyle={styles.screenTitle}
        titleContentStyle={styles.titleContent}
        bottomContent={
          <View
            style={[styles.bottomContent, { paddingBottom: insets.bottom }]}
          >
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
          options={lactatingOptions.map(option => t(option))}
          selectedValue={lactating}
          onSelect={value => {
            setLactating(value);
            setHasAttemptedNext(true);
          }}
        />

        <Text style={styles.label}>{t('cycles.contraceptiveStatus')}</Text>

        <View style={contraceptive && styles.selectedBorder}>
          <CustomDropdown
            title={t('cycles.contraceptiveTitle')}
            options={contraceptiveOptions.map(option => t(option))}
            selectedValue={contraceptive}
            onSelect={value => {
              setContraceptive(value);
              setHasAttemptedNext(true);
            }}
          />
        </View>

        <Text style={styles.label}>{t('cycles.bleedTimeline')}</Text>

        <View style={bleedTimeline && styles.selectedBorder}>
          <CustomDropdown
            title={t('cycles.bleedTitle')}
            options={bleedTimelineOptions.map(option => t(option))}
            selectedValue={bleedTimeline}
            onSelect={value => {
              setBleedTimeline(value);
              setHasAttemptedNext(true);
            }}
          />
        </View>

        <Text style={styles.label}>{t('cycles.lastMenstruationDate')}</Text>

        <DateInput
          value={lastMenstruationDate}
          onChange={date => {
            setLastMenstruationDate(date);
            setHasAttemptedNext(true);
          }}
          placeholder={t('cycles.datePlaceholder')}
        />

        <View style={styles.cycleLabelRow}>
          <Text style={styles.label}>{t('cycles.cycleLength')}</Text>

          <Image source={image.informationCircle} style={styles.infoIcon} />
        </View>

        <View style={bleedTimeline && styles.selectedBorder}>
          <CustomDropdown
            title={t('cycles.cycleLength')}
            options={cycleLengthOptions}
            selectedValue={cycleLength}
            onSelect={value => {
              setCycleLength(value);
              setHasAttemptedNext(true);
            }}
          />
        </View>
      </BodySection>
    </View>
  );
};

export default YourCycles;
