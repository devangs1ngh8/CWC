import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from './style';
import { image } from '../../assets';
import { HeaderSection } from '../../components';
import i18n from '../../i18n';
import { ScreenName } from '../../navigation/screenName';

const PromoApplied = () => {
  const navigation = useNavigation<any>();

  const handleDone = () => {
    navigation.navigate(ScreenName.SuccessSubscription);
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

        <View style={styles.successContent}>
          <Image source={image.promoApplied} style={styles.successIcon} />

          <Text style={styles.heading}>Promo Applied!</Text>

          <View style={styles.bonusBadge}>
            <Text style={styles.bonusText}>+6 Months Added</Text>
          </View>

          <Text style={styles.description}>
            You've successfully unlocked extra trial access. Enjoy 6 more months
            included with your subscription.
          </Text>
        </View>

        <View style={styles.bottomActions}>
          <Pressable style={styles.doneButton} onPress={handleDone}>
            <Text style={styles.doneButtonText}>Done</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default PromoApplied;
