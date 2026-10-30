import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

import ScreenHeader from '../../components/screenHeader';
import { image } from '../../assets';
import colors from '../../utils/color';
import LanguageCode, { STORAGE_KEY } from '../../utils/languageCode';
import styles from './style';

const LanguagePreferences = () => {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    i18n.language,
  );
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem(
          STORAGE_KEY.IsSELECTED,
        );

        const language = savedLanguage || i18n.language || LanguageCode.ENGLISH;

        setSelectedLanguage(language);
        await i18n.changeLanguage(language);
      } finally {
        setIsLoaded(true);
      }
    };

    loadLanguage();
  }, []);

  const handleLanguageChange = async (language: string) => {
    setSelectedLanguage(language);
    await AsyncStorage.setItem(STORAGE_KEY.IsSELECTED, language);
    await i18n.changeLanguage(language);
  };

  const languages = [
    { code: LanguageCode.ENGLISH, title: t('language.english') },
    { code: LanguageCode.SPANISH, title: t('language.spanish') },
  ];

  return (
    <View style={styles.container}>
      <ScreenHeader
        title={t('languagePreferences.title')}
        backgroundImage={image.homeBG}
      />

      <View style={styles.body}>
        {isLoaded ? (
          <View style={styles.options}>
            {languages.map(language => {
              const isSelected = selectedLanguage === language.code;

              return (
                <Pressable
                  key={language.code}
                  style={[styles.option, isSelected && styles.selectedOption]}
                  onPress={() => handleLanguageChange(language.code)}
                >
                  <View
                    style={[styles.radio, isSelected && styles.selectedRadio]}
                  >
                    {isSelected && <View style={styles.radioDot} />}
                  </View>

                  <Text style={styles.optionText}>{language.title}</Text>
                </Pressable>
              );
            })}
          </View>
        ) : (
          <ActivityIndicator color={colors.primary} />
        )}
      </View>
    </View>
  );
};

export default LanguagePreferences;
