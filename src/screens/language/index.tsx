import { View, Text, Image, Pressable } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  PrimaryButton,
  HeaderSection,
  BodySection,
  RadioButton,
} from '../../components';

import styles from './style';
import { image } from '../../assets';
import colors from '../../utils/color';

const language = [
  { id: 1, title: 'English' },

  { id: 2, title: 'Español' },
];

const Language = () => {
  const navigation = useNavigation<any>();

  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const handleContinue = async () => {
    await AsyncStorage.setItem('languageSelected', 'true');

    if (selectedLanguage === 'English') {
      navigation.replace('Onboarding');
    } else {
      navigation.replace('SpanishSplash');
    }
  };
  return (
    <View style={styles.container}>
      <HeaderSection
        backgroundImage={image.headImage}
        logo={image.splashText}
        backgroundColor={colors.primary}
        style={styles.header}
      />

      <BodySection
        titlePrimary="Choose Your"
        titleSecondary="Language"
        headingSecondaryStyle={styles.secondaryHead}
        description="We've set your language to English. Do you want to continue or switch to Español?"
        bottomContent={
          <PrimaryButton title="Continue" onPress={handleContinue} />
        }
      >
        <View style={styles.options}>
          {language.map(lang => (
            <RadioButton
              title={lang.title}
              selected={selectedLanguage === lang.title}
              onPress={() => setSelectedLanguage(lang.title)}
            />
          ))}
        </View>

        <View style={styles.infoRow}>
          <Image source={image.infoCircle} style={styles.infoImage} />
          <Text style={styles.note}>
            You can change this later in the settings.
          </Text>
        </View>
      </BodySection>
    </View>
  );
};

export default Language;
