import React, { useState } from 'react';
import { View, Text, Pressable, Modal, ScrollView, Image } from 'react-native';

import styles from './style';
import { Props } from './@types';
import { image } from '../../assets';

const CustomDropdown = ({ title, options, selectedValue, onSelect }: Props) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Pressable
        style={[styles.dropdown, selectedValue && styles.dropdownSelected]}
        onPress={() => setVisible(true)}
      >
        <Text style={styles.dropdownText}>{selectedValue}</Text>

        <Image style={styles.arrow} source={image.arrowDown} />
      </Pressable>

      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.bottomSheet}>
            <View style={styles.handle} />

            <Text style={styles.title}>{title}</Text>

            <ScrollView>
              {options.map(option => (
                <Pressable
                  key={option}
                  style={[
                    styles.option,
                    selectedValue === option && styles.selectedOption,
                  ]}
                  onPress={() => {
                    onSelect(option);
                    setVisible(false);
                  }}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedValue === option && styles.selectedOptionText,
                    ]}
                  >
                    {option}
                  </Text>

                  {selectedValue === option && (
                    <Image source={image.tickBox} style={styles.check} />
                  )}
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default CustomDropdown;
