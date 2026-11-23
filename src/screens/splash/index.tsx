import { View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import styles from './style';
import { image } from '../../assets';
import i18n from '../../i18n';
import { ScreenName } from '../../navigation/screenName';
import { getValues } from '../../utils/commonFunctions';

import { Storage } from '../../services/storage';
import { StorageKeys } from '../../services/storage/keys';

const Splash = () => {
  const navigation = useNavigation<any>();
  const [savedLanguage, setSavedLanguage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    let timer: ReturnType<typeof setTimeout>;

    const loadSplash = async () => {
      try {
        const { visitedLanguage, lang, onboardingCompleted } =
          await getValues();

        if (lang) {
          await i18n.changeLanguage(lang);
        }

        const token = Storage.get<string>(StorageKeys.AUTH_TOKEN);

        if (!isMounted) return;

        setSavedLanguage(lang);

        timer = setTimeout(() => {
          if (!isMounted) return;

          if (token) {
            navigation.reset({
              index: 0,
              routes: [{ name: ScreenName.MainTabs }],
            });
            return;
          }

          if (onboardingCompleted === 'true') {
            navigation.reset({
              index: 0,
              routes: [{ name: ScreenName.Login }],
            });
          } else if (visitedLanguage === 'true') {
            navigation.reset({
              index: 0,
              routes: [{ name: ScreenName.Tutorial }],
            });
          } else {
            navigation.reset({
              index: 0,
              routes: [{ name: ScreenName.Language }],
            });
          }
        }, 2000);
      } catch (error) {
        console.log('Splash Error:', error);

        if (isMounted) {
          navigation.replace(ScreenName.Login);
        }
      }
    };

    loadSplash();

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
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
