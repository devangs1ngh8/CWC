import React from 'react';
import { View, Text, Pressable } from 'react-native';

import styles from './style';
import { Props } from './@types';

const UnitToggle = ({ options, selected, onSelect }: Props) => {
  return (
    <View style={styles.container}>
      {options.map(option => (
        <Pressable
          key={option}
          style={[styles.button, selected === option && styles.selectedButton]}
          onPress={() => onSelect(option)}
        >
          <Text
            style={[styles.text, selected === option && styles.selectedText]}
          >
            {option}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

export default UnitToggle;
