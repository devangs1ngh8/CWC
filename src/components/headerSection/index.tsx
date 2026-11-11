import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from './style';
import { type Props } from './@types';
import { image } from '../../assets';

const HeaderSection = ({
  backgroundImage,
  backgroundImageStyle,
  logo,
  logoStyle,
  style,
  showBackButton,
  title,
  titleStyle,
}: Props) => {
  const navigation = useNavigation<any>();

  return (
    <View style={[styles.container, style]}>
      {backgroundImage && (
        <Image
          source={backgroundImage}
          style={[styles.headerImg, backgroundImageStyle]}
        />
      )}

      {logo && <Image source={logo} style={[styles.logo, logoStyle]} />}

      {(showBackButton || title) && (
        <View style={styles.titleRow}>
          {showBackButton && (
            <Pressable
              onPress={() => navigation.goBack()}
              style={styles.backButtonContainer}
            >
              <Image source={image.goBack} style={styles.backButton} />
            </Pressable>
          )}

          {title ? (
            <Text style={[styles.title, titleStyle]}>{title}</Text>
          ) : null}
        </View>
      )}
    </View>
  );
};

export default HeaderSection;
