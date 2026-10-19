import React, { useState } from 'react';
import styles from './style';

import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  HeaderSection,
  PrimaryButton,
  BodySection,
  OnboardingDragHandle,
} from '../../components';
import { image } from '../../assets';
import { Image, Pressable, View } from 'react-native';
import colors from '../../utils/color';
import { useTranslation } from 'react-i18next';

const Onboarding = () => {
  const navigation = useNavigation<any>();
  const [currentPage, setCurrentPage] = useState(0);
  const { t } = useTranslation();

  const onboardingData = [
    {
      id: 1,
      image: image.Onboarding1,
      title: t('onboarding.slide1Title'),
      description: t('onboarding.slide1Description'),
    },

    {
      id: 2,
      image: image.Onboarding2,
      title: t('onboarding.slide2Title'),
      description: t('onboarding.slide2Description'),
    },

    {
      id: 3,
      image: image.Onboarding3,
      title: t('onboarding.slide3Title'),
      description: t('onboarding.slide3Description'),
    },

    {
      id: 4,
      image: image.Onboarding4,
      title: t('onboarding.slide4Title'),
      description: t('onboarding.slide4Description'),
    },
  ];

  const handleSkip = async () => {
    try {
      await AsyncStorage.setItem('onboardingCompleted', 'true');

      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.log('Error : ', error);
    }
  };

  const handleNext = async () => {
    if (currentPage < onboardingData.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      handleSkip();
    }
  };

  return (
    <View style={styles.container}>
      <HeaderSection
        backgroundImage={onboardingData[currentPage].image}
        backgroundColor={colors.primary}
        style={styles.headerStyle}
      />

      <Pressable style={styles.skipButton} onPress={handleSkip}>
        <Image source={image.skipButton} style={styles.skipImage} />
      </Pressable>

      <BodySection
        root={styles.body}
        titlePrimary={onboardingData[currentPage].title}
        headingPrimaryStyle={styles.headingStyle}
        description={onboardingData[currentPage].description}
        topContent={<OnboardingDragHandle currentPage={currentPage + 1} />}
        bottomContent={
          <PrimaryButton
            title={
              currentPage === onboardingData.length - 1
                ? t('onboarding.getStarted')
                : t('onboarding.next')
            }
            onPress={handleNext}
          />
        }
      />
    </View>
  );
};

export default Onboarding;
