import React, { useState } from 'react';
import { View, Text, Pressable, Image, Keyboard, Modal } from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

import ErrorMessage from '../errorMessage';

import styles from './style';
import { image } from '../../assets';
import { Props } from './@types';

const DEFAULT_DATE = new Date(2000, 0, 1);

const DateInput = ({
  value,
  onChange,
  placeholder,
  error,
  inputStyle,
}: Props) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tempDate, setTempDate] = useState(value ?? DEFAULT_DATE);

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');

    return `${day} / ${month} / ${date.getFullYear()}`;
  };

  const openDatePicker = () => {
    Keyboard.dismiss();

    setTempDate(value ?? DEFAULT_DATE);
    setShowDatePicker(true);
  };

  const handleDone = () => {
    onChange(tempDate);
    setShowDatePicker(false);
  };

  const handleCancel = () => {
    setShowDatePicker(false);
  };

  return (
    <View>
      <Pressable
        style={[styles.container, inputStyle, error ? styles.inputError : null]}
        onPress={openDatePicker}
      >
        <Text style={[styles.value, !value && styles.placeholder]}>
          {value ? formatDate(value) : placeholder}
        </Text>

        <Image source={image.dobCalendar} style={styles.calendarIcon} />
      </Pressable>

      <ErrorMessage error={error} />

      <Modal
        visible={showDatePicker}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={handleCancel}
      >
        <Pressable style={styles.modalOverlay} onPress={handleCancel}>
          <Pressable
            style={styles.datePickerContainer}
            onPress={event => event.stopPropagation()}
          >
            <View style={styles.pickerHeader}>
              <Pressable onPress={handleDone}>
                <Text style={styles.doneText}>Done</Text>
              </Pressable>
            </View>

            <DateTimePicker
              value={tempDate}
              mode="date"
              display="spinner"
              maximumDate={new Date()}
              onChange={(_, selectedDate) => {
                if (selectedDate) {
                  setTempDate(selectedDate);
                }
              }}
              themeVariant="light"
              style={styles.datePicker}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

export default DateInput;
