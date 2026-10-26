import React from 'react';
import { View, Text, TextInput, TextInputProps, Image } from 'react-native';
import styles from '../style';
import { image } from '../../../assets';

type BaseInputProps = TextInputProps & {
  label: string;
  error?: string;
};

const BaseInput = ({
  label,
  error,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  maxLength,
  ...rest
}: BaseInputProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        style={[styles.input, error ? styles.inputError : null]}
        value={value}
        placeholder={placeholder}
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
