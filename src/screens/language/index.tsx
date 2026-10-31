import { View, Text, Image } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import LanguageCode, { STORAGE_KEY } from '../../utils/languageCode';

import {
  PrimaryButton,
  HeaderSection,
  BodySection,
  RadioButton,
} from '../../components';

import styles from './style';
import { image } from '../../assets';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { currentlang } from '../../utils/commonFunctions';
import { ScreenName } from '../../navigation/screenName';

const Language = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  const { t, i18n } = useTranslation();

  const language = [
    { id: 1, title: t('language.english'), code: LanguageCode.ENGLISH },

    { id: 2, title: t('language.spanish'), code: LanguageCode.SPANISH },
  ];

  const [selectedLanguage, setSelectedLanguage] = useState(currentlang);

  const handleContinue = async () => {
    await AsyncStorage.setItem(STORAGE_KEY.IsVISITED, 'true');
    await i18n.changeLanguage(selectedLanguage);
    await AsyncStorage.setItem(STORAGE_KEY.IsSELECTED, selectedLanguage);
    navigation.reset({
      index: 0,
      routes: [{ name: ScreenName.Tutorial }],
    });
  };

  return (
    <View style={styles.container}>
      <HeaderSection
        backgroundImage={image.headImage}
        logo={image.splashText}
        style={styles.header}
      />

      <BodySection
        titlePrimary={t('language.title')}
        titleSecondary={t('language.subtitle')}
        headingSecondaryStyle={styles.secondaryHead}
        description={t('language.description')}
        bottomContent={
          <View style={{ paddingBottom: insets.bottom }}>
            <PrimaryButton
              title={t('language.continue')}
              onPress={handleContinue}
            />
          </View>
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
