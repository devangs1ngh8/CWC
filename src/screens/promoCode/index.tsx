import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from './style';
import { image } from '../../assets';
import { HeaderSection, BaseInput } from '../../components';
import i18n from '../../i18n';
import { ScreenName } from '../../navigation/screenName';

const PromoCode = () => {
  const navigation = useNavigation<any>();

  const [promoCode, setPromoCode] = useState('');
  const [error, setError] = useState('');

  const handleApply = () => {
    if (!promoCode.trim()) {
      return;
    }

    if (promoCode.trim().toLowerCase() === 'sin123') {
      setError('');
      navigation.navigate(ScreenName.PromoApplied);
    } else {
      setError('Invalid promo code. Please try again.');
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <HeaderSection
        backgroundImage={image.headImage}
        logo={
          i18n.resolvedLanguage === 'es'
            ? image.spanishSplashText
            : image.splashText
        }
        style={styles.header}
      />

      <View style={styles.content}>
        <View style={styles.dragHandle} />

        <View style={styles.mainContent}>
          <Text style={styles.heading}>
            Have A <Text style={styles.headingHighlight}>Promo Code</Text>?
          </Text>

          <Text style={styles.description}>Enter your promo code here</Text>

          <View style={styles.inputContainer}>
            <BaseInput
              label="Code"
              value={promoCode}
              onChangeText={value => {
                setPromoCode(value);
                setError('');
              }}
              placeholder="Enter Code"
              error={error}
              autoCapitalize="none"
            />
          </View>
        </View>

        <View style={styles.bottomActions}>
          <Pressable style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </Pressable>

          <Pressable
            style={[
              styles.applyButton,
              !promoCode.trim() && styles.disabledApplyButton,
            ]}
            onPress={handleApply}
            disabled={!promoCode.trim()}
          >
            <Text style={styles.applyButtonText}>Apply</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default PromoCode;
