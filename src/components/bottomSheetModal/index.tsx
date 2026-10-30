import React from 'react';
import { Modal, Pressable, View } from 'react-native';

import styles from './style';
import { Props } from './@types';

const BottomSheetModal = ({ visible, onClose, children }: Props) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable onPress={onClose} />

        <View style={styles.bottomSheet}>
          <View style={styles.handle} />
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default BottomSheetModal;
