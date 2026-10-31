import React from 'react';
import { Pressable, Text, View } from 'react-native';
import styles from './style';
import { type Props } from './@types';

const RadioButton = ({ title, selected, onPress }: Props) => {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="radio"
      style={[styles.container, selected && styles.selectedContainer]}
    >
      <View style={[styles.radio, selected && styles.selectedRadio]}>
        {selected && <View style={styles.radioDot} />}
      </View>

      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

export default RadioButton;
