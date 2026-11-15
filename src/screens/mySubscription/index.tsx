import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Image, Alert } from 'react-native';

import styles from './style';
import { image } from '../../assets';
import { HeaderSection } from '../../components';

import { getSubscriptionData } from '../../utils/subscriptionStorage';
import { normalize } from '../../utils/metrics';

const MySubscription = () => {
  const subscription = getSubscriptionData();

  const planDetails = {
    monthlyTrial: {
      title: 'Monthly',
      price: '$35',
      period: '/ month',
      hasFreeTrial: true,
      expiryDate: 'Dec 15, 2026',
    },
    monthly: {
      title: 'Monthly',
      price: '$45',
      period: '/ month',
      hasFreeTrial: false,
      expiryDate: 'Dec 15, 2026',
    },
    annual: {
      title: 'Annual',
      price: '$35',
      period: '/ annum',
      hasFreeTrial: true,
      expiryDate: 'May 15, 2027',
    },
  };

  const selectedPlan = subscription ? planDetails[subscription.planId] : null;

  const features = [
    'Track cycle and understand the body based on the science of cervical fluid method.',
    'Visual cycle timeline and hormonal phase breakdown',
    'Learning Lounge explaining fertility signs and cycles',
    'Faith-based content rooted in Catholic teaching on marriage and family',
    'Access to Fertility experts',
  ];

  const handleCancelSubscription = () => {
    Alert.alert(
      'Cancel Subscription',
      'Are you sure you want to cancel your subscription?',
      [
        {
          text: 'Keep Subscription',
          style: 'cancel',
        },
        {
          text: 'Continue',
          style: 'destructive',
          onPress: () => {},
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <HeaderSection
          backgroundImage={image.backgroundIMG}
          style={styles.headerSection}
          showBackButton
          title="My Subscription"
        />

        <Image
          source={image.subscriptionWoman}
          style={styles.headerWoman}
          resizeMode="contain"
        />
      </View>

      <View style={styles.content}>
        <ScrollView
          style={styles.mainScroll}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {selectedPlan ? (
            <View style={styles.subscriptionCard}>
              <View style={styles.planHeader}>
                <Text style={styles.planTitle}>{selectedPlan.title}</Text>

                <View style={styles.expiryBadge}>
                  <Text style={styles.expiryText}>
                    Free Trial Ends on {selectedPlan.expiryDate}
                  </Text>
                </View>
              </View>

              <View style={styles.priceContainer}>
                <Text style={styles.price}>{selectedPlan.price}</Text>
                <Text style={styles.period}>{selectedPlan.period}</Text>
              </View>

              {selectedPlan.hasFreeTrial && (
                <>
                  <Text style={styles.sectionTitle}>Your Free Access</Text>

                  <View style={styles.trialCard}>
                    <Image
                      source={image.giftCard}
                      style={styles.accessIcon}
                      resizeMode="contain"
                    />

                    <View style={styles.accessDetails}>
                      <Text style={styles.accessSubtitle}>
                        Included free trial
                      </Text>
                      <Text style={styles.accessTitle}>
                        3 Months{' '}
                        <Text style={styles.purpleText}>Free Trial</Text>
                      </Text>
                    </View>
                  </View>
                </>
              )}

              {subscription?.promoCode && (
                <>
                  {selectedPlan.title === 'Annual' && (
                    <Text style={styles.plusSign}>+</Text>
                  )}

                  <View
                    style={[
                      styles.promoCard,
                      selectedPlan.title === 'Monthly' && {
                        marginTop: normalize(24),
                      },
                    ]}
                  >
                    <Image source={image.voucher} style={styles.accessIcon} />

                    <View style={styles.accessDetails}>
                      <Text style={styles.accessSubtitle}>
                        Promo Code ({subscription.promoCode})
                      </Text>

                      <Text style={styles.accessTitle}>
                        {selectedPlan.title === 'Annual'
                          ? '+6 Months'
                          : 'Promo Applied'}
                      </Text>
                    </View>
                  </View>
                </>
              )}

              <View style={styles.separator} />

              <Text style={styles.includedHeading}>What's included:</Text>

              <View style={styles.featuresContainer}>
                {features.map((feature, index) => (
                  <View key={index} style={styles.featureRow}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>

              <Pressable
                style={styles.cancelButton}
                onPress={handleCancelSubscription}
              >
                <Text style={styles.cancelButtonText}>Cancel Subscription</Text>
              </Pressable>
            </View>
          ) : (
            <Text style={styles.sectionTitle}>
              No subscription plan selected.
            </Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default MySubscription;
