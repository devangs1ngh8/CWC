import React from 'react';
import styles from './style';
import { Pressable, Text } from 'react-native';
import { type Props } from './@types';

const PrimaryButton = ({ title, onPress, disabled = false }: Props) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, disabled && styles.disabledButton]}
    >
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

export default PrimaryButton;
