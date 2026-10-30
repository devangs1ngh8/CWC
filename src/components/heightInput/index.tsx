import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

import styles from './style';
import { Props } from './@types';
import { cleanNumber } from '../../utils/validations';

const SplitHeightInput = ({
  feet,
  inches,
  onFeetChange,
  onInchesChange,
  feetPlaceholder,
  inchesPlaceholder,
  placeholderColor,
  inputStyle,
}: Props) => {
  const [focusedInput, setFocusedInput] = useState<'feet' | 'inches' | null>(
    null,
  );

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.inputBox,
          focusedInput === 'feet' && styles.activeInput,
          feet && inputStyle,
        ]}
      >
        <TextInput
          style={styles.input}
          placeholder={feetPlaceholder}
          placeholderTextColor={placeholderColor}
          keyboardType="numeric"
          value={feet}
          onChangeText={value => onFeetChange(cleanNumber(value))}
          maxLength={1}
          onFocus={() => setFocusedInput('feet')}
          onBlur={() => setFocusedInput(null)}
        />
        <Text style={styles.suffix}>FT</Text>
      </View>

      <View
        style={[
          styles.inputBox,
          focusedInput === 'inches' && styles.activeInput,
          inches && inputStyle,
        ]}
      >
        <TextInput
          style={styles.input}
          placeholder={inchesPlaceholder}
          placeholderTextColor={placeholderColor}
          keyboardType="numeric"
          value={inches}
          onChangeText={value => onInchesChange(cleanNumber(value))}
          maxLength={2}
          onFocus={() => setFocusedInput('inches')}
          onBlur={() => setFocusedInput(null)}
        />
        <Text style={styles.suffix}>IN</Text>
      </View>
    </View>
  );
};

export default SplitHeightInput;
