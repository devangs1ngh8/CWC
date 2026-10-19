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

const Onboarding = () => {
  const navigation = useNavigation<any>();
  const [currentPage, setCurrentPage] = useState(0);

  const onboardingData = [
    {
      id: 1,
      image: image.Onboarding1,
      title: 'Learn about Evaria Cycles & Wellness',
      description:
        'Evaria Cycles & Wellness is a science-informed cycle-tracking tool designed to help women honor the gift of their bodies. We provide comprehensive resources, access to trusted experts, and opportunities for spiritual formation.',
    },

    {
      id: 2,
      image: image.Onboarding2,
      title: 'Cycle Power: Unlocking Body Literacy',
      description:
        'Go beyond period tracking—learn the four cycle phases, what biomarkers reveal about your Fertility, and how daily insights help you make informed choices for general wellness, nutrition, energy, and fertility.',
    },

    {
      id: 3,
      image: image.Onboarding3,
      title: 'Connect with Fertility Experts',
      description:
        'Your questions deserve expert answers. See how to easily connect with our network of fertility care professionals directly from the app.',
    },

    {
      id: 4,
      image: image.Onboarding4,
      title: 'Explore Faith-Integrated Resources',
      description:
        'Discover how to access our curated resources that explore the beauty of the body, the vocation of love, and personal identity from a faithfully Catholic perspective.',
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
              currentPage === onboardingData.length - 1 ? 'Get Started' : 'Next'
            }
            onPress={handleNext}
          />
        }
      />
    </View>
  );
};

export default Onboarding;
