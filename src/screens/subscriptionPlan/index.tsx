import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Image } from 'react-native';

import styles from './style';
import { image } from '../../assets';
import { HeaderSection } from '../../components';
import i18n from '../../i18n';
import { useNavigation } from '@react-navigation/native';
import { ScreenName } from '../../navigation/screenName';

type PlanType = 'monthly' | 'annually';

const SubscriptionPlan = () => {
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('annually');

  const features = [
    'Daily Catholic faith-based cycle logs',
    'Faith & Fertility Learning Lounge',
    'Detailed visual cycle timeline',
    'Access to certified fertility experts',
  ];

  const isAnnual = selectedPlan === 'annually';

  const navigation = useNavigation<any>();

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

        <View style={styles.fixedHeader}>
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
              onPress={() => setSelectedPlan('monthly')}
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
              onPress={() => setSelectedPlan('annually')}
            >
              <Text
                style={[styles.toggleText, isAnnual && styles.activeToggleText]}
              >
                Annually
              </Text>
            </Pressable>
          </View>
        </View>

        <ScrollView
          style={styles.mainScroll}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.selectedPlanCard}>
            <Text style={styles.selectedPlanTitle}>
              {isAnnual ? 'Annually Plan' : 'Monthly Plan'}
            </Text>

            <View style={styles.selectedPlanPrice}>
              <Text style={styles.selectedPrice}>
                {isAnnual ? '$35' : '$45'}
              </Text>

              <Text style={styles.selectedPeriod}>
                {isAnnual ? '/annum' : '/month'}
              </Text>
            </View>

            {isAnnual && (
              <View style={styles.trialBadge}>
                <Text style={styles.trialBadgeText}>
                  3 Months Free Trial Included
                </Text>
              </View>
            )}
          </View>

          <Text style={styles.featuresHeading}>INCLUDED WITH YOUR PLAN</Text>

          <View style={styles.featuresContainer}>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureRow}>
                <View>
                  <Image source={image.voucherTick} style={styles.checkMark} />
                </View>

                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
        </ScrollView>

        <View style={styles.bottomActions}>
          <Pressable
            style={styles.promoButton}
            onPress={() => navigation.navigate(ScreenName.PromoCode)}
          >
            <Image
              source={image.voucher}
              style={styles.voucher}
              resizeMode="contain"
            />
            <Text style={styles.promoText}>Have A Promo Code?</Text>
          </Pressable>

          <Pressable
            style={styles.primaryButton}
            onPress={() => navigation.navigate(ScreenName.SuccessSubscription)}
          >
            <Text style={styles.primaryButtonText}>
              {isAnnual ? 'Start 3 Months Free Trial' : 'Proceed'}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default SubscriptionPlan;
