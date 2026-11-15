import React from 'react';
import { View, Text, ScrollView, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from './style';
import { image } from '../../assets';
import { HeaderSection } from '../../components';
import i18n from '../../i18n';
import { ScreenName } from '../../navigation/screenName';

import { useAppSelector, useAppDispatch } from '../../redux/auth/hooks';
import {
  selectPlan,
  setPromoCode,
} from '../../redux/subscription/subscriptionSlice';

import { saveSubscriptionData } from '../../utils/subscriptionStorage';

const SuccessSubscription = () => {
  const navigation = useNavigation<any>();

  const dispatch = useAppDispatch();

  const selectedPlanId = useAppSelector(
    state => state.subscription.selectedPlanId,
  );

  const promoCode = useAppSelector(state => state.subscription.promoCode);

  const isAnnual =
    selectedPlanId === 'annual' || selectedPlanId === 'monthlyTrial';

  const features = [
    'Daily Catholic faith-based cycle logs',
    'Faith & Fertility Learning Lounge',
    'Detailed visual cycle timeline',
    'Access to certified fertility experts',
  ];

  const handleRemovePromo = () => {
    dispatch(setPromoCode(null));
  };

  const handleContinue = () => {
    if (!selectedPlanId) {
      return;
    }

    console.log('SAVING SUBSCRIPTION');
    console.log('Selected Plan:', selectedPlanId);
    console.log('Promo Code:', promoCode);

    saveSubscriptionData({
      planId: selectedPlanId,
      promoCode,
    });

    navigation.reset({
      index: 0,
      routes: [{ name: ScreenName.Login }],
    });
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

        <ScrollView
          style={styles.mainScroll}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={styles.heading}>
            <Text style={styles.headingPrimary}>Begin Your </Text>
            Subscription Journey
          </Text>

          <View style={styles.toggleContainer}>
            <Pressable
              style={[
                styles.toggleButton,
                !isAnnual && styles.activeToggleButton,
              ]}
              onPress={() => dispatch(selectPlan('monthly'))}
            >
              <Text
                style={[
                  styles.toggleText,
                  !isAnnual && styles.activeToggleText,
                ]}
              >
                Monthly
              </Text>
            </Pressable>

            <Pressable
              style={[
                styles.toggleButton,
                isAnnual && styles.activeToggleButton,
              ]}
              onPress={() => dispatch(selectPlan('annual'))}
            >
              <Text
                style={[styles.toggleText, isAnnual && styles.activeToggleText]}
              >
                Annually
              </Text>
            </Pressable>
          </View>

          <View style={styles.selectedPlanCard}>
            <Text style={styles.selectedPlanTitle}>
              {isAnnual ? 'Annually Plan' : 'Monthly Plan'}
            </Text>

            <View style={styles.priceContainer}>
              <Text style={styles.selectedPrice}>
                {isAnnual ? '$35' : '$45'}
              </Text>
              <Text style={styles.selectedPeriod}>
                {isAnnual ? '/annum' : '/month'}
              </Text>
            </View>
          </View>

          {promoCode && (
            <View style={styles.freeAccessCard}>
              <Text style={styles.freeAccessHeading}>YOUR FREE ACCESS</Text>

              <View style={styles.accessRow}>
                <Text style={styles.accessLabel}>Included Free Trial:</Text>

                <View style={styles.trialBadge}>
                  <Text style={styles.trialBadgeText}>
                    {isAnnual ? '3 Months Free Trial' : 'Trial Included'}
                  </Text>
                </View>
              </View>

              <View style={styles.accessRow}>
                <Text style={styles.accessLabel}>
                  Promo Code ({promoCode}):
                </Text>

                <View style={styles.promoValueContainer}>
                  <Text style={styles.promoValue}>+6 Months</Text>

                  <Pressable onPress={handleRemovePromo} hitSlop={10}>
                    <Image
                      source={image.deletePromo}
                      style={styles.removePromo}
                    />
                  </Pressable>
                </View>
              </View>
            </View>
          )}

          <Text style={styles.featuresHeading}>INCLUDED WITH YOUR PLAN</Text>

          <View style={styles.featuresContainer}>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureRow}>
                <View style={styles.checkContainer}>
                  <Image
                    source={image.voucherTick}
                    style={styles.checkMark}
                    resizeMode="contain"
                  />
                </View>

                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.disclaimer}>
            You won't be charged until Dec 14, 2026, and you can cancel anytime
            before then.
          </Text>
        </ScrollView>

        <View style={styles.bottomActions}>
          <Pressable style={styles.primaryButton} onPress={handleContinue}>
            <Text style={styles.primaryButtonText}>Continue to Payment</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default SuccessSubscription;
