import React from 'react';
import { Pressable, Text, View } from 'react-native';
import styles from './style';

const LanguageOption = ({ title, selected, onPress }: Props) => {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ checked: selected }}
      style={[styles.container, selected && styles.selectedContainer]}
    >
      <View style={[styles.radio, selected && styles.selectedRadio]}>
        {selected && <View style={styles.radioDot} />}
      </View>

      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

export default LanguageOption;
