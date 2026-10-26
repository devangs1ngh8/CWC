import React, { useRef, useState } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  View,
  useWindowDimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

import {
  HeaderSection,
  PrimaryButton,
  BodySection,
  OnboardingDragHandle,
} from '../../components';

import { getTutorialData } from './tutorialData';
import { image } from '../../assets';
import styles from './style';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenName } from '../../navigation/screenName';

const Tutorial = () => {
  const navigation = useNavigation<any>();
  const { t } = useTranslation();
  const { width } = useWindowDimensions();

  const insets = useSafeAreaInsets();

  const [currentPage, setCurrentPage] = useState(0);
  const listRef = useRef<FlatList<any>>(null);

  const tutorialData = getTutorialData(t);

  const handleSkip = async () => {
    await AsyncStorage.setItem('onboardingCompleted', 'true');

    navigation.reset({
      index: 0,
      routes: [{ name: ScreenName.Login }],
    });
  };

  const goToPage = (page: number) => {
    if (page < 0 || page >= tutorialData.length) {
      return;
    }

    listRef.current?.scrollToIndex({
      index: page,
    });

    setCurrentPage(page);
  };

  const handleNext = () => {
    if (currentPage < tutorialData.length - 1) {
      goToPage(currentPage + 1);
    } else {
      handleSkip();
    }
  };

  const renderItem = ({ item, index }: any) => (
    <View style={[styles.slide, { width }]}>
      <HeaderSection backgroundImage={item.image} style={styles.headerStyle} />

      <Pressable style={styles.skipButton} onPress={handleSkip}>
        <Image source={image.skipButton} style={styles.skipImage} />
      </Pressable>

      <BodySection
        root={styles.body}
        titlePrimary={item.title}
        headingPrimaryStyle={styles.headingStyle}
        description={item.description}
        topContent={<OnboardingDragHandle currentPage={index + 1} />}
        bottomContent={
          <View style={{ paddingBottom: insets.bottom }}>
            <PrimaryButton
              title={
                index === tutorialData.length - 1
                  ? t('onboarding.getStarted')
                  : t('onboarding.next')
              }
              onPress={handleNext}
            />
          </View>
        }
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={listRef}
        data={tutorialData}
        renderItem={renderItem}
        keyExtractor={item => String(item.id)}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default Tutorial;
