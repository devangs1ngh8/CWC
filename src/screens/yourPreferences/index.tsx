import React, { useState } from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { saveProfileData } from '../../utils/profileStorage';

// import { useAppDispatch, useAppSelector } from '../../redux';
// import { updateProfile } from '../../redux/slice/authSlice';
// import { UserPreferences } from '../../redux/slice/authTypes';

import { HeaderSection, StepBody, PrimaryButton } from '../../components';

import { image } from '../../assets';
import styles from './style';
import { ScreenName } from '../../navigation/screenName';

type UserPreferences = {
  periodPredictions: boolean;
  cycleDeviationDetection: boolean;
  fertilityStatusEstimation: boolean;
};

const YourPreferences = () => {
  const navigation = useNavigation<any>();

  const [preferences, setPreferences] = useState<UserPreferences>({
    periodPredictions: false,
    cycleDeviationDetection: false,
    fertilityStatusEstimation: false,
  });

  const preferenceOptions: {
    key: keyof UserPreferences;
    label: string;
  }[] = [
    {
      key: 'periodPredictions',
      label: 'Period predictions',
    },
    {
      key: 'cycleDeviationDetection',
      label: 'Cycle deviation detection',
    },
    {
      key: 'fertilityStatusEstimation',
      label: 'Fertility status estimation',
    },
  ];

  const togglePreference = (key: keyof UserPreferences) => {
    setPreferences(previous => ({
      ...previous,
      [key]: !previous[key],
    }));
  };

  const handleNext = async () => {
    try {
      await saveProfileData({ preferences });
      navigation.navigate(ScreenName.CatholicCommunity);
    } catch (error) {
      console.log('PREFERENCES SAVE ERROR:', error);
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
        titlePrimary="STEP 3 OF 4"
        titleSecondary="Your Preferences"
        headingPrimaryStyle={styles.stepTitle}
        headingSecondaryStyle={styles.screenTitle}
        titleContentStyle={styles.titleContent}
        bottomContent={
          <View style={styles.bottomContent}>
            <PrimaryButton title="Next" onPress={handleNext} />
          </View>
        }
      >
        <View style={styles.optionsContainer}>
          {preferenceOptions.map(option => {
            const isSelected = preferences[option.key];

            return (
              <Pressable
                key={option.key}
                style={[styles.option, isSelected && styles.optionSelected]}
                onPress={() => togglePreference(option.key)}
              >
                <View style={[styles.checkbox]}>
                  {isSelected && <Image source={image.tickCheckbox} />}
                </View>

                <Text style={styles.optionText}>{option.label}</Text>
              </Pressable>
            );
          })}
        </View>
      </StepBody>
    </View>
  );
};

export default YourPreferences;
