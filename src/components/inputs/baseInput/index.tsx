import React from 'react';
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  Image,
  StyleProp,
} from 'react-native';
import styles from '../style';
import { image } from '../../../assets';
import colors from '../../../utils/color';

type BaseInputProps = TextInputProps & {
  label: string;
  error?: string;
  placeholderTextColor?: string;
};

const BaseInput = ({
  label,
  error,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  maxLength,
  placeholderTextColor = colors.textFourth,
  ...rest
}: BaseInputProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        style={[styles.input, error ? styles.inputError : null]}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        maxLength={maxLength}
        {...rest}
      />

      {error && (
        <View style={styles.errorRow}>
          <Image source={image.errorInfo} style={styles.errorIcon} />
          <Text style={styles.error}>{error}</Text>
        </View>
      )}
    </View>
  );
};

export default BaseInput;
