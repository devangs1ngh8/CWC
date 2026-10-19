import React from 'react';
import styles from './style';
import { Pressable, Text } from 'react-native';
import { type Props } from './@types';

const PrimaryButton = ({ title, onPress }: Props) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

export default PrimaryButton;
