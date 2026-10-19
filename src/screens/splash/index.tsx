import { View, Image } from 'react-native';
import React, { useEffect } from 'react';
import styles from './style';

// import type { NativeStackScreenProps } from '@react-navigation/native-stack';
// import type { RootStackParamList } from '../../Navigation/RootStackNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { image } from '../../assets/index';
import { useNavigation } from '@react-navigation/native';

// type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const Splash = () => {
  const navigation = useNavigation<any>();
  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const languageSelected = await AsyncStorage.getItem('languageSelected');
        const onboardingCompleted = await AsyncStorage.getItem(
          'onboardingCompleted',
        );

        if (onboardingCompleted === 'true') {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
        } else if (languageSelected === 'true') {
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
      <Image source={image.splashLogo} style={styles.logo} />
    </View>
  );
};

export default Splash;
