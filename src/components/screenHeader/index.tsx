import React from 'react';
import { Image, ImageBackground, Pressable, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from './style';
import { Props } from './@types';
import { image } from '../../assets';

const ScreenHeader = ({
  title,
  backgroundImage,
  onBackPress,
  style,
}: Props) => {
  const navigation = useNavigation();

  return (
    <ImageBackground source={backgroundImage} style={[styles.container, style]}>
      <Pressable
        style={styles.backButton}
        onPress={onBackPress ?? (() => navigation.goBack())}
      >
        <Image source={image.goBack} style={styles.backArrow} />
      </Pressable>

      <Text style={styles.title}>{title}</Text>
    </ImageBackground>
  );
};

export default ScreenHeader;
