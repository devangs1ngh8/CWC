import { View, Image } from 'react-native';
import React, { useEffect } from 'react';
import styles from './style';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../Navigation/RootStackNavigation';
import { image } from '../../assets/index';

// import splashLogo from '../../Assets/images/splashLogo.png';
type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const Splash = ({ navigation }: Props) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Language' }],
      });
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={image.splashBackground}
        style={styles.background}
        resizeMode="stretch"
      />
      <Image
        source={image.splashLogo}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

export default Splash;
