import React, { useEffect, useRef, useState } from 'react';

import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  ActivityIndicator,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import styles from './style';
import { image } from '../../assets';
import { ScreenHeader } from '../../components';
import { learningData } from '../home/learningData';
import { ScreenName } from '../../navigation/screenName';
import { getEducationList } from '../../services/home';

const PAGE_SIZE = 10;
const SCROLL_THRESHOLD = 100;

const LearningLounge = () => {
  const navigation = useNavigation<any>();
  const { t } = useTranslation();

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [isLoading, setIsLoading] = useState(false);

  const isLoadingRef = useRef(false);
  const hasTriggeredRef = useRef(false);

  const visibleLearningData = learningData.slice(0, visibleCount);

  const hasMoreData = visibleCount < learningData.length;

  const loadMoreData = () => {
    if (isLoadingRef.current || !hasMoreData) {
      return;
    }

    isLoadingRef.current = true;
    setIsLoading(true);

    setTimeout(() => {
      setVisibleCount(prev => Math.min(prev + PAGE_SIZE, learningData.length));

      setIsLoading(false);
      isLoadingRef.current = false;
    }, 1000);
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;

    const isAtBottom =
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - SCROLL_THRESHOLD;

    if (isAtBottom && !hasTriggeredRef.current) {
      hasTriggeredRef.current = true;
      loadMoreData();
    }

    // Allow the next pagination trigger after scrolling away
    if (!isAtBottom) {
      hasTriggeredRef.current = false;
    }
  };

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const response = await getEducationList(1, 10);

        // console.log('EDUCATION API RESPONSE:', response);
      } catch (error: any) {
        // console.log(
        //   'EDUCATION API ERROR:',
        //   error.response?.data || error.message,
        // );
      }
    };

    fetchEducation();
  }, []);

  return (
    <View style={styles.container}>
      <ScreenHeader
        backgroundImage={image.homeBG}
        title={t('learningLounge.title')}
        style={styles.header}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <View style={styles.learningGrid}>
          {visibleLearningData.map(item => (
            <Pressable
              key={item.id}
              style={styles.learningCard}
              onPress={() =>
                navigation.navigate(ScreenName.LearningDetail, { item })
              }
            >
              <Image
                source={item.image}
                style={styles.learningImage}
                resizeMode="cover"
              />

              <Text style={styles.learningTitle} numberOfLines={1}>
                {item.title}
              </Text>

              <Text style={styles.learningDescription} numberOfLines={2}>
                {item.description}
              </Text>
            </Pressable>
          ))}
        </View>

        {isLoading && (
          <ActivityIndicator
            size="large"
            color="#793466"
            style={{ paddingVertical: 20 }}
          />
        )}

        {!hasMoreData && (
          <Text style={{ textAlign: 'center', paddingVertical: 15 }}>
            No more learning content
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

export default LearningLounge;
