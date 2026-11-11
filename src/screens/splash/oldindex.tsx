// import { View, Image } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import styles from './style';

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { image } from '../../assets/index';
// import { useNavigation } from '@react-navigation/native';
// import i18n from '../../i18n';

// const Splash = () => {
//   const navigation = useNavigation<any>();
//   const [savedLanguage, setSavedLanguage] = useState<string | null>(null);
//   useEffect(() => {
//     const timer = setTimeout(async () => {
//       try {
//         const visistedLanguage = await AsyncStorage.getItem('visistedLanguage');
//         const lang = await AsyncStorage.getItem('selectedLanguage');
//         setSavedLanguage(lang);
//         const onboardingCompleted = await AsyncStorage.getItem(
//           'onboardingCompleted',
//         );

//         if (lang) {
//           await i18n.changeLanguage(lang);
//         }

//         if (onboardingCompleted === 'true') {
//           navigation.reset({
//             index: 0,
//             routes: [{ name: 'Login' }],
//           });
//         } else if (visistedLanguage === 'true') {
//           navigation.reset({
//             index: 0,
//             routes: [{ name: 'Tutorial' }],
//           });
//         } else {
//           navigation.reset({
//             index: 0,
//             routes: [{ name: 'Language' }],
//           });
//         }
//       } catch (error) {
//         console.log('Error : ', error);
//         navigation.replace('Language');
//       }
//     }, 2000);
//     return () => clearTimeout(timer);
//   }, [navigation, savedLanguage]);

//   console.log('language', i18n.language);

//   return (
//     <View style={styles.container}>
//       <Image source={image.splashBackground} style={styles.background} />
//       <Image
//         source={savedLanguage == 'es' ? image.spanishSplash : image.splashLogo}
//         style={styles.logo}
//       />
//     </View>
//   );
// };

// export default Splash;

// import { View, Image } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import styles from './style';

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { image } from '../../assets/index';
// import { useNavigation } from '@react-navigation/native';
// import i18n from '../../i18n';

// const Splash = () => {
//   const navigation = useNavigation<any>();
//   const [savedLanguage, setSavedLanguage] = useState<string | null>(null);
//   const [isLanguageLoaded, setIsLanguageLoaded] = useState(false);

//   useEffect(() => {
//     let isMounted = false;

//     const loadSplash = async () => {
//       const visistedLanguage = await AsyncStorage.getItem('visistedLanguage');
//       const lang = await AsyncStorage.getItem('selectedLanguage');

//       const onboardingCompleted = await AsyncStorage.getItem(
//         'onboardingCompleted',
//       );

//       if (lang) {
//         await i18n.changeLanguage(lang);
//       }

//       if (!isMounted) return;
//       setSavedLanguage(lang);
//       setIsLanguageLoaded(true);

//       setTimeout(() => {
//         if (!isMounted) return;
//         if (onboardingCompleted === 'true') {
//           navigation.reset({
//             index: 0,
//             routes: [{ name: 'Login' }],
//           });
//         } else if (visistedLanguage === 'true') {
//           navigation.reset({
//             index: 0,
//             routes: [{ name: 'Tutorial' }],
//           });
//         } else {
//           navigation.reset({
//             index: 0,
//             routes: [{ name: 'Language' }],
//           });
//         }
//       }, 2000);
//     };

//     loadSplash();
//     return () => {
//       isMounted = false;
//     };
//   }, [navigation]);

//   console.log('Saved language:', savedLanguage);
//   console.log('Active i18n language:', i18n.language);

//   return (
//     <View style={styles.container}>
//       <Image source={image.splashBackground} style={styles.background} />
//       {isLanguageLoaded && (
//         <Image
//           source={
//             savedLanguage == 'es' ? image.spanishSplash : image.splashLogo
//           }
//           style={styles.logo}
//         />
//       )}
//     </View>
//   );
// };

// export default Splash;

import { View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './style';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { image } from '../../assets';
import { useNavigation } from '@react-navigation/native';
import i18n from '../../i18n';

const Splash = () => {
  const navigation = useNavigation<any>();

  const [savedLanguage, setSavedLanguage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadSplash = async () => {
      try {
        console.log('Splash: loading storage...');

        const [lang, visitedLanguage, onboardingCompleted] = await Promise.all([
          AsyncStorage.getItem('selectedLanguage'),
          AsyncStorage.getItem('visistedLanguage'),
          AsyncStorage.getItem('onboardingCompleted'),
        ]);

        console.log('Stored language:', lang);

        if (lang) {
          await i18n.changeLanguage(lang);
        }

        if (!isMounted) return;

        setSavedLanguage(lang);

        console.log('Active language:', i18n.language);

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
        console.log('Splash loading error:', error);

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

      {savedLanguage !== null && (
        <Image
          source={
            savedLanguage === 'es' ? image.spanishSplash : image.splashLogo
          }
          style={styles.logo}
        />
      )}
    </View>
  );
};

export default Splash;
