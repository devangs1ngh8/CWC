import React, { useState, forwardRef } from 'react';
import {
  Image,
  Pressable,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

import styles from '../style';
import { image } from '../../../assets';
import colors from '../../../utils/color';

type PasswordInputProps = TextInputProps & {
  label: string;
  error?: string;
  placeholderTextColor?: string;
};

const PasswordInput = forwardRef<TextInput, PasswordInputProps>(
  (
    {
      label,
      error,
      value,
      onChangeText,
      placeholder,
      maxLength,
      placeholderTextColor = colors.textFourth,
      ...rest
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>

        <View
          style={[styles.passwordContainer, error ? styles.inputError : null]}
        >
          <TextInput
            ref={ref}
            style={styles.passwordInput}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={!showPassword}
            maxLength={maxLength ?? 15}
            {...rest}
          />

          <Pressable onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={showPassword ? image.eyeOpen : image.eyeClose}
              style={styles.showImg}
            />
          </Pressable>
        </View>

        {error ? (
          <View style={styles.errorRow}>
            <Image source={image.errorInfo} style={styles.errorIcon} />
            <Text style={styles.error}>{error}</Text>
          </View>
        ) : null}
      </View>
    );
  },
);

export default PasswordInput;
