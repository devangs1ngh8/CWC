import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Image } from 'react-native';

import { useAppDispatch } from '../../redux/auth/hooks';
import {
  selectPlan,
  type SubscriptionPlanId,
} from '../../redux/subscription/subscriptionSlice';

import styles from './style';
import { image } from '../../assets';
import { HeaderSection } from '../../components';
import i18n from '../../i18n';
import { useNavigation } from '@react-navigation/native';
import { ScreenName } from '../../navigation/screenName';

const Subscription = () => {
  const [expandedPlans, setExpandedPlans] = useState<string[]>(['annual']);

  const dispatch = useAppDispatch();

  const plans = [
    {
      id: 'monthlyTrial',
      title: 'Monthly',
      price: '$35',
      period: '/ month',
      trial: true,
      button: 'Start 3 Months Free Trial',
      features: [
        'Track cycle and understand the body based on the science of cervical fluid method.',
        'Visual cycle timeline and hormonal phase breakdown',
        'Learning Lounge explaining fertility signs and cycles',
        'Faith-based content rooted in Catholic teaching on marriage and family',
        'Access to Fertility experts',
      ],
    },
    {
      id: 'monthly',
      title: 'Monthly',
      price: '$45',
      period: '/ month',
      trial: false,
      button: 'Proceed',
      features: [
        'Track cycle and understand the body',
        'Visual cycle timeline and hormonal phase breakdown',
        'Learning Lounge explaining fertility signs and cycles',
        'Access to Fertility experts',
      ],
    },
    {
      id: 'annual',
      title: 'Annual',
      price: '$35',
      period: '/ annum',
      trial: false,
      button: 'Proceed',
      features: [
        'Track cycle and understand the body based on the science of cervical fluid method.',
        'Visual cycle timeline and hormonal phase breakdown',
        'Learning Lounge explaining fertility signs and cycles',
        'Faith-based content rooted in Catholic teaching on marriage and family',
        'Access to Fertility experts',
      ],
    },
  ];

  const togglePlan = (id: string) => {
    setExpandedPlans(previous =>
      previous.includes(id)
        ? previous.filter(item => item !== id)
        : [...previous, id],
    );
  };

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

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={styles.heading}>
            <Text style={styles.headingPrimary}>Begin Your </Text>
            Subscription Journey
          </Text>

          {plans.map(plan => {
            const expanded = expandedPlans.includes(plan.id);

            return (
              <View key={plan.id} style={styles.planCard}>
                <Text style={styles.planTitle}>{plan.title}</Text>

                <View style={styles.priceRow}>
                  <Text style={styles.price}>{plan.price}</Text>
                  <Text style={styles.period}>{plan.period}</Text>
                </View>

                {plan.trial && (
                  <View style={styles.trialSection}>
                    <Text style={styles.trialHeading}>Your Free Access</Text>

                    <View style={styles.trialCard}>
                      <Image source={image.giftCard} style={styles.giftIcon} />

                      <View>
                        <Text style={styles.trialCaption}>
                          Included free trial
                        </Text>

                        <Text style={styles.trialText}>
                          3 Months{' '}
                          <Text style={styles.trialHighlight}>Free Trial</Text>
                        </Text>
                      </View>
                    </View>
                  </View>
                )}

                <Pressable
                  style={styles.includedHeader}
                  onPress={() => togglePlan(plan.id)}
                >
                  <Text style={styles.includedTitle}>What's included:</Text>

                  <Image
                    source={expanded ? image.arrowUp : image.arrowDown}
                    style={styles.chevron}
                  />
                </Pressable>

                {expanded && (
                  <View style={styles.features}>
                    {plan.features.map((feature, index) => (
                      <Text key={index} style={styles.featureText}>
                        {'•  '}
                        {feature}
                      </Text>
                    ))}
                  </View>
                )}

                <Pressable
                  style={styles.promoButton}
                  onPress={() =>
                    navigation.navigate(ScreenName.SubscriptionPlan)
                  }
                >
                  <Image source={image.voucher} style={styles.voucher} />
                  <Text style={styles.promoText}>Have A Promo Code?</Text>
                </Pressable>

                <Pressable
                  style={styles.primaryButton}
                  onPress={() => {
                    dispatch(selectPlan(plan.id as SubscriptionPlanId));
                    navigation.navigate(ScreenName.SuccessSubscription);
                  }}
                >
                  <Text style={styles.primaryButtonText}>{plan.button}</Text>
                </Pressable>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default Subscription;
