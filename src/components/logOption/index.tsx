import { View, Text, Pressable, Image } from 'react-native';
import React from 'react';
import { Props } from './@types';
import styles from './style';

const LogOption = ({
  title,
  source,
  selected,
  selectedCard,
  onPress,
}: Props) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.card, selected && { borderColor: selectedCard }]}
    >
      <Image source={source} style={styles.image} />

      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

export default LogOption;
