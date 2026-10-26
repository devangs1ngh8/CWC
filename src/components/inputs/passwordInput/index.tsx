import React, { useState } from 'react';
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

type PasswordInputProps = TextInputProps & {
  label: string;
  error?: string;
};

const PasswordInput = ({
  label,
  error,
  value,
  onChangeText,
  placeholder,
  maxLength,
  ...rest
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View style={[styles.passwordContainer, error ? styles.inputError : '']}>
        <TextInput
          style={styles.passwordInput}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={!showPassword}
          maxLength={15}
          {...rest}
        />

        <Pressable onPress={() => setShowPassword(!showPassword)}>
          <Image
            source={showPassword ? image.eyeOpen : image.eyeClose}
            style={showPassword ? styles.showImg : styles.hideImg}
          />
        </Pressable>
      </View>

      {error && (
        <View style={styles.errorRow}>
          <Image source={image.errorInfo} style={styles.errorIcon} />
          <Text style={styles.error}>{error}</Text>
        </View>
      )}
    </View>
  );
};

export default PasswordInput;
