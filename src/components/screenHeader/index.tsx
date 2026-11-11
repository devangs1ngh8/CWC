import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import styles from './style';
import { Props } from './@types';
import { image } from '../../assets';

const ScreenHeader = ({
  title,
  backgroundImage,
  onBackPress,
  style,
  showBackButton = true,
}: Props) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, style]}>
      <Image source={backgroundImage ?? image.homeBG} />

      <View style={styles.headingContent}>
        {showBackButton && (
          <Pressable
            style={styles.backButton}
            onPress={onBackPress ?? (() => navigation.goBack())}
            hitSlop={10}
          >
            <Image source={image.goBack} style={styles.backArrow} />
          </Pressable>
        )}

        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      </View>
    </View>
  );
};

export default ScreenHeader;
