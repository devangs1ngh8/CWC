import React, { useState } from 'react';
import { View, Text, Pressable, Image, Keyboard, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import ErrorMessage from '../errorMessage';

import styles from './style';
import { image } from '../../assets';
import { Props } from './@types';

const DateInput = ({
  value,
  onChange,
  placeholder,
  error,
  inputStyle,
}: Props) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');

    return `${day} / ${month} / ${date.getFullYear()}`;
  };

  return (
    <View>
      <Pressable
        style={[styles.container, inputStyle, error ? styles.inputError : null]}
        onPress={() => {
          Keyboard.dismiss();
          setShowDatePicker(true);
        }}
      >
        <Text style={[styles.value, !value && styles.placeholder]}>
          {value ? formatDate(value) : placeholder}
        </Text>

        <Image source={image.dobCalendar} style={styles.calendarIcon} />
      </Pressable>

      <ErrorMessage error={error} />

      {showDatePicker && (
        <DateTimePicker
          value={value ?? new Date(2000, 0, 1)}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          maximumDate={new Date()}
          onValueChange={(_, selectedDate) => {
            if (selectedDate) {
              onChange(selectedDate);
            }
          }}
          themeVariant="light"
        />
      )}

      {showDatePicker && Platform.OS === 'ios' && (
        <Pressable
          style={styles.doneButton}
          onPress={() => setShowDatePicker(false)}
        >
          <Text style={styles.doneText}>Done</Text>
        </Pressable>
      )}
    </View>
  );
};

export default DateInput;
