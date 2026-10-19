import { View, Text, Image, Pressable } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

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
  { id: 1, title: 'English', code: 'en' },

  { id: 2, title: 'Español', code: 'es' },
];

const Language = () => {
  const navigation = useNavigation<any>();

  const { t, i18n } = useTranslation();

  const [selectedLanguage, setSelectedLanguage] = useState(
    i18n.resolvedLanguage === 'es' ? 'es' : 'en',
  );

  const handleContinue = async () => {
    try {
      await AsyncStorage.setItem('visistedLanguage', 'true');
      await i18n.changeLanguage(selectedLanguage);
      await AsyncStorage.setItem('selectedLanguage', selectedLanguage);

      navigation.reset({
        index: 0,
        routes: [{ name: 'Onboarding' }],
      });
    } catch (error) {
      console.log('Error : ', error);
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
        titlePrimary={t('language.title')}
        titleSecondary={t('language.subtitle')}
        headingSecondaryStyle={styles.secondaryHead}
        description={t('language.description')}
        bottomContent={
          <PrimaryButton
            title={t('language.continue')}
            onPress={handleContinue}
          />
        }
      >
        <View style={styles.options}>
          {language.map(lang => (
            <RadioButton
              key={lang.id}
              title={lang.title}
              selected={selectedLanguage === lang.code}
              onPress={() => setSelectedLanguage(lang.code)}
            />
          ))}
        </View>

        <View style={styles.infoRow}>
          <Image source={image.infoCircle} style={styles.infoImage} />
          <Text style={styles.note}>{t('language.note')}</Text>
        </View>
      </BodySection>
    </View>
  );
};

export default Language;
