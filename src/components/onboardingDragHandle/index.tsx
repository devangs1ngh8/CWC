import React from 'react';
import { View } from 'react-native';
import styles from './style';

interface Props {
  currentPage: number;
}

const OnboardingDragHandle = ({ currentPage }: Props) => {
  return (
    <View style={styles.dragHandle}>
      {[1, 2, 3, 4].map(page => (
        <View
          key={page}
          style={[styles.dot, currentPage === page && styles.activeDot]}
        />
      ))}
    </View>
  );
};

export default OnboardingDragHandle;
