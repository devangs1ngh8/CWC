import React from 'react';
import { View, Text, Image } from 'react-native';

import styles from './style';
import { image } from '../../assets';

type ErrorMessageProps = {
  error?: string;
};

const ErrorMessage = ({ error }: ErrorMessageProps) => {
  if (!error) {
    return null;
  }

  return (
    <View style={styles.errorRow}>
      <Image source={image.errorInfo} style={styles.errorIcon} />
      <Text style={styles.error}>{error}</Text>
    </View>
  );
};

export default ErrorMessage;
