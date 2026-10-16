import React from 'react';

import styles from './style';
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';

type Props = {
  height: number;
  width?: number | `${number}%`;
  backgroundColor?: string;
  backgroundImage?: ImageSourcePropType;
  backgroundImageStyle?: StyleProp<ImageStyle>;
  logo?: ImageSourcePropType;
  logoStyle?: StyleProp<ImageStyle>;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

const ScreenHeading = ({
  height,
  width = '100%',
  backgroundColor,
  backgroundImage,
  backgroundImageStyle,
  logo,
  logoStyle,
  children,
  style,
}: Props) => {
  return (
    <View style={[styles.container, { height, width, backgroundColor }, style]}>
      {backgroundImage && (
        <Image
          source={backgroundImage}
          style={[styles.backgroundImage, backgroundImageStyle]}
        />
      )}

      {logo && <Image source={logo} style={[styles.logo, logoStyle]} />}

      {children}
    </View>
  );
};

export default ScreenHeading;
