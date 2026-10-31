import { image } from '../assets';
import i18n from '../i18n';
import LanguageCode from './languageCode';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const currentlang = () =>
  i18n.resolvedLanguage === LanguageCode.SPANISH
    ? LanguageCode.SPANISH
    : LanguageCode.ENGLISH;

export const currentScreen = () => {
  i18n.resolvedLanguage === 'es' ? image.spanishSplashText : image.splashText;
};

export const getValues = async () => {
  const visitedLanguage = await AsyncStorage.getItem('visitedLanguage');
  const lang = i18n.language;

  const onboardingCompleted = await AsyncStorage.getItem('onboardingCompleted');

  return {
    visitedLanguage,
    lang,
    onboardingCompleted,
  };
};
