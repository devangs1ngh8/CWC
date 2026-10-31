import { View, Text } from 'react-native';
import React from 'react';
import { Props } from './@types';
import styles from './style';

const LogSection = ({
  title,
  backgroundColor,
  titleColor,
  children,
}: Props) => {
  return (
    <View style={[styles.section, { backgroundColor }]}>
      <Text style={[styles.heading, { color: titleColor }]}>{title}</Text>

      <View style={styles.options}>{children}</View>
    </View>
  );
};

export default LogSection;
