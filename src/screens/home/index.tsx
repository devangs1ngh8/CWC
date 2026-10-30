import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

import styles from './style';
import { image } from '../../assets';
import { learningData } from './learningData';
import { useNavigation } from '@react-navigation/native';
import { ScreenName } from '../../navigation/screenName';

const Home = () => {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const navigation = useNavigation<any>();

  const [userName, setUserName] = useState('');
  const [selectedDate, setSelectedDate] = useState(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  });
  const [exploreAll, setExploreAll] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  useEffect(() => {
    const loadUserName = async () => {
      try {
        const name = await AsyncStorage.getItem('userName');
        if (name) {
          setUserName(name);
        }
      } catch (error) {
        console.warn('Unable to load user name:', error);
      }
    };

    loadUserName();
  }, []);

  const days = Array.from({ length: 15 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() + index - 7);

    const isToday = date.getTime() === today.getTime();
    const isFuture = date.getTime() > today.getTime();

    return {
      key: index,
      label: date.toLocaleDateString('en-US', {
        weekday: 'short',
      }),
      date,
      isToday,
      isFuture,
    };
  });

  const formattedDate = today.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const visibleLearningData = exploreAll
    ? learningData
    : learningData.slice(0, 4);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <Image
          source={image.homeBG}
          style={styles.headerBackground}
          resizeMode="cover"
        />

        <View style={styles.headerTop}>
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>
              Hi {userName.trim() || 'there'}
            </Text>

            <Text style={styles.headerSubtitle}>
              {t('logs.today')}, {formattedDate}
            </Text>
          </View>

          <View style={styles.headerIcons}>
            <Pressable>
              <Image source={image.notification} style={styles.iconImage} />
            </Pressable>

            <Pressable>
              <Image source={image.calendar} style={styles.iconImage} />
            </Pressable>
          </View>
        </View>
      </View>

      <View style={styles.calendar}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.weekRow}
        >
          {days.map(day => {
            const isSelected = selectedDate.getTime() === day.date.getTime();

            return (
              <Pressable
                key={day.key}
                disabled={day.isFuture}
                onPress={() => setSelectedDate(new Date(day.date))}
                style={[styles.dateItem, isSelected && styles.selectedDate]}
              >
                <Text
                  style={[styles.dayText, day.isFuture && { opacity: 0.4 }]}
                >
                  {day.label}
                </Text>

                <Text
                  style={[
                    styles.dateText,
                    isSelected && styles.selectedDateText,
                    day.isFuture && { opacity: 0.4 },
                  ]}
                >
                  {day.date.getDate()}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 20 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.cycleSection}>
          <Image source={image.tunnel} />

          <Image source={image.periodDueImg} style={styles.periodDueImage} />
        </View>

        <View style={styles.learningSection}>
          <View style={styles.sectionHeadingRow}>
            <Image source={image.lineLeft} />
            <Text style={styles.sectionHeading}>LEARNING LOUNGE</Text>
            <Image source={image.lineRight} />
          </View>

          <View style={styles.learningGrid}>
            {visibleLearningData.map(item => (
              <Pressable
                key={item.id}
                style={styles.learningCard}
                onPress={() =>
                  navigation.navigate(ScreenName.LearningDetail, { item })
                }
              >
                <Image source={item.image} style={styles.learningImage} />

                <Text style={styles.learningTitle} numberOfLines={2}>
                  {item.title}
                </Text>

                <Text style={styles.learningDescription} numberOfLines={2}>
                  {item.description}
                </Text>
              </Pressable>
            ))}
          </View>

          <Pressable
            style={styles.exploreButton}
            onPress={() => navigation.navigate(ScreenName.LearningLounge)}
          >
            <Text style={styles.exploreButtonText}>{t('home.explore')}</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
