import { View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './style';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { image } from '../../assets/index';
import { useNavigation } from '@react-navigation/native';
import i18n from '../../i18n';

const Splash = () => {
  const navigation = useNavigation<any>();
  const [savedLanguage, setSavedLanguage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadSplash = async () => {
      try {
        const visitedLanguage = await AsyncStorage.getItem('visistedLanguage');
        const lang = await AsyncStorage.getItem('selectedLanguage');

        const onboardingCompleted = await AsyncStorage.getItem(
          'onboardingCompleted',
        );

        if (lang) {
          await i18n.changeLanguage(lang);
        }

        if (!isMounted) return;

        setSavedLanguage(lang);

        setTimeout(() => {
          if (!isMounted) return;

          if (onboardingCompleted === 'true') {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          } else if (visitedLanguage === 'true') {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Tutorial' }],
            });
          } else {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Language' }],
            });
          }
        }, 2000);
      } catch (error) {
        if (isMounted) {
          navigation.replace('Language');
        }
      }
    };
    loadSplash();
    return () => {
      isMounted = false;
    };
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={image.splashBackground} style={styles.background} />

      {savedLanguage && (
        <Image
          source={
            savedLanguage == 'es' ? image.spanishSplash : image.splashLogo
          }
          style={styles.logo}
        />
      )}
    </View>
  );
};

export default Splash;
