import { View, Text, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import {
  PrimaryButton,
  ScreenHeading,
  ScreenBody,
  LanguageOption,
} from '../../components';

import styles from './style';
import { image } from '../../assets';
import colors from '../../colors';
import { useNavigation } from '@react-navigation/native';
import { normalize } from '../../utils/metrics';

const Language = () => {
  const navigation = useNavigation<any>();
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const handleContinue = () => {
    navigation.navigate('Onboarding1', {
      language: selectedLanguage,
    });
  };
  return (
    <View style={styles.container}>
      <ScreenHeading
        height={normalize(300)}
        backgroundImage={image.headImage}
        logo={image.splashText}
        backgroundColor={colors.primary}
      />

      <ScreenBody
        titleContent={
          <View style={styles.headingRow}>
            <Text style={styles.headingTitle}>Choose Your</Text>
            <Text style={styles.headingAccent}>Language</Text>
          </View>
        }
        flex={1}
        description="We've set your language to English. Do you want to continue or switch to Español?"
        bottomContent={
          <PrimaryButton title="Continue" onPress={handleContinue} />
        }
      >
        <View style={styles.options}>
          <LanguageOption
            title="English"
            selected={selectedLanguage === 'English'}
            onPress={() => setSelectedLanguage('English')}
          />

          <LanguageOption
            title="Español"
            selected={selectedLanguage === 'Español'}
            onPress={() => setSelectedLanguage('Español')}
          />
        </View>

        <View style={styles.infoRow}>
          <Image source={image.infoCircle} style={styles.infoImage} />
          <Text style={styles.note}>
            You can change this later in the settings.
          </Text>
        </View>
      </ScreenBody>
    </View>
  );
};

export default Language;
