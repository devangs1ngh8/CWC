import React, { useState } from 'react';
import { Text, TextInput, View, StyleProp, TextStyle } from 'react-native';

import styles from './style';
import { Props } from './@types';
import ErrorMessage from '../errorMessage';

const FormInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  maxLength,
  autoCapitalize = 'sentences',
  inputStyle,
  error,
}: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View>
      {label !== '' && <Text style={styles.label}>{label}</Text>}

      <TextInput
        style={[
          styles.input,
          inputStyle,
          isFocused && styles.activeInput,
          error ? styles.inputError : null,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={styles.placeholderColor.color}
        keyboardType={keyboardType}
        maxLength={maxLength}
        autoCapitalize={autoCapitalize}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      <ErrorMessage error={error} />
    </View>
  );
};

export default FormInput;
