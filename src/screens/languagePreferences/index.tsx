import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { useTranslation } from 'react-i18next';

import ScreenHeader from '../../components/screenHeader';
import { image } from '../../assets';
import colors from '../../utils/color';
import LanguageCode, { STORAGE_KEY } from '../../utils/languageCode';
import styles from './style';

import { updateLanguagePreference } from '../../services/language/language';

const LanguagePreferences = () => {
  const { t, i18n } = useTranslation();

  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    i18n.language,
  );

  const [isLoaded, setIsLoaded] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem(
          STORAGE_KEY.IsSELECTED,
        );

        const language =
          savedLanguage === 'en' || savedLanguage === 'es'
            ? savedLanguage
            : i18n.language === 'es'
            ? 'es'
            : LanguageCode.ENGLISH;

        setSelectedLanguage(language);
        await i18n.changeLanguage(language);
      } catch (error) {
        console.log('LOAD LANGUAGE ERROR:', error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadLanguage();
  }, []);

  const handleLanguageChange = async (language: string) => {
    if (
      (language !== 'en' && language !== 'es') ||
      language === selectedLanguage ||
      isUpdating
    ) {
      return;
    }

    const previousLanguage = selectedLanguage;

    try {
      setIsUpdating(true);

      const response = await updateLanguagePreference({
        languagePrefernce: language as 'en' | 'es',
      });

      console.log('LANGUAGE UPDATE RESPONSE:', response);

      await AsyncStorage.setItem(STORAGE_KEY.IsSELECTED, language);
      await i18n.changeLanguage(language);

      setSelectedLanguage(language);

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: response.message,
      });
    } catch (error: any) {
      setSelectedLanguage(previousLanguage);

      console.log('LANGUAGE UPDATE ERROR:', error?.response?.data || error);

      Toast.show({
        type: 'error',
        text1: 'Update Failed',
        text2:
          error?.response?.data?.message ||
          'Unable to update language preference.',
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const languages = [
    {
      code: LanguageCode.ENGLISH,
      title: t('language.english'),
    },
    {
      code: LanguageCode.SPANISH,
      title: t('language.spanish'),
    },
  ];

  return (
    <View style={styles.container}>
      <ScreenHeader
        title={t('languagePreferences.title')}
        backgroundImage={image.homeBG}
        style={styles.header}
      />

      <View style={styles.body}>
        {isLoaded ? (
          <View style={styles.options}>
            {languages.map(language => {
              const isSelected = selectedLanguage === language.code;

              return (
                <Pressable
                  key={language.code}
                  disabled={isUpdating}
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

            {isUpdating && (
              <ActivityIndicator
                color={colors.primary}
                style={{ marginTop: 15 }}
              />
            )}
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default LanguagePreferences;
