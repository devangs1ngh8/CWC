import React from 'react';

import styles from './style';
import { Image, Pressable, View } from 'react-native';

import { type Props } from './@types';
import { useNavigation } from '@react-navigation/native';
import { image } from '../../assets';

const HeaderSection = ({
  backgroundImage,
  backgroundImageStyle,
  logo,
  logoStyle,
  style,
  showBackButton,
}: Props) => {
  const navigation = useNavigation<any>();
  return (
    <View style={[styles.container, style]}>
      {backgroundImage && (
        <Image source={backgroundImage} style={backgroundImageStyle} />
      )}

      {logo && <Image source={logo} style={[styles.logo, logoStyle]} />}

      {showBackButton && (
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Image source={image.goBack} />
        </Pressable>
      )}
    </View>
  );
};

export default HeaderSection;
