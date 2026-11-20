import React, { useEffect, useState } from 'react';
import {
  getMySubscription,
  MySubscriptionType,
} from '../../services/subscription/subscription';
import { View, Text, ScrollView, Pressable, Image, Alert } from 'react-native';

import styles from './style';
import { image } from '../../assets';
import { HeaderSection } from '../../components';

const MySubscription = () => {
  const [subscription, setSubscription] = useState<MySubscriptionType | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchSubscription = async () => {
      try {
        const response = await getMySubscription();

        console.log('MY SUBSCRIPTION:', response);

        if (isMounted) {
          setSubscription(response.data);
        }
      } catch (error: any) {
        console.log('GET SUBSCRIPTION ERROR:', error.response?.data || error);

        if (isMounted) {
          setSubscription(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchSubscription();

    return () => {
      isMounted = false;
    };
  }, []);

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
          {loading ? (
            <Text style={styles.sectionTitle}>Loading subscription...</Text>
          ) : subscription ? (
            <View style={styles.subscriptionCard}>
              <View style={styles.planHeader}>
                <Text style={styles.planTitle}>{subscription.planName}</Text>

                {subscription.isFreeTrial === 1 && (
                  <View style={styles.expiryBadge}>
                    <Text style={styles.expiryText}>
                      Free Trial Ends on{' '}
                      {new Date(
                        subscription.expireAt.replace(' ', 'T'),
                      ).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </Text>
                  </View>
                )}
              </View>

              <View style={styles.priceContainer}>
                <Text style={styles.price}>
                  {subscription.price.unit}
                  {subscription.price.amount}
                </Text>

                <Text style={styles.period}>/ {subscription.planName}</Text>
              </View>

              {subscription.isFreeTrial === 1 && (
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

                    <Text style={styles.accessTitle}>Free Trial</Text>
                  </View>
                </View>
              )}

              <View style={styles.separator} />

              <Text style={styles.includedHeading}>{subscription.title}:</Text>

              <View style={styles.featuresContainer}>
                {subscription.description.map((feature, index) => (
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
              No active subscription found.
            </Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default MySubscription;
