import { View, Image } from 'react-native';
import React, { useEffect } from 'react';
import styles from './style';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { image } from '../../assets/index';
import { useNavigation } from '@react-navigation/native';
import i18n from '../../i18n';

const Splash = () => {
  const navigation = useNavigation<any>();
  let savedLanguage = null;
  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const visistedLanguage = await AsyncStorage.getItem('visistedLanguage');
        savedLanguage = await AsyncStorage.getItem('selectedLanguage');
        const onboardingCompleted = await AsyncStorage.getItem(
          'onboardingCompleted',
        );

        if (savedLanguage) {
          await i18n.changeLanguage(savedLanguage);
        }

        if (onboardingCompleted === 'true') {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
        } else if (visistedLanguage === 'true') {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Onboarding' }],
          });
        } else {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Language' }],
          });
        }
      } catch (error) {
        console.log('Error : ', error);
        navigation.replace('Language');
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={image.splashBackground} style={styles.background} />
      <Image
        source={savedLanguage === 'es' ? image.spanishSplash : image.splashLogo}
        style={styles.logo}
      />
    </View>
  );
};

export default Splash;
