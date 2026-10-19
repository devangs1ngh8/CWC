import React from 'react';

import styles from './style';
import { Image, View } from 'react-native';

import { type Props } from './@types';

const HeaderSection = ({
  backgroundColor,
  backgroundImage,
  backgroundImageStyle,
  logo,
  logoStyle,
  style,
}: Props) => {
  return (
    <View style={[styles.container, { backgroundColor }, style]}>
      {backgroundImage && (
        <Image source={backgroundImage} style={backgroundImageStyle} />
      )}

      {logo && <Image source={logo} style={[styles.logo, logoStyle]} />}
    </View>
  );
};

export default HeaderSection;
