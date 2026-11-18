import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, Pressable, ScrollView } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

import styles from './style';
import { image } from '../../assets';
import { learningData } from './learningData';
import { useNavigation } from '@react-navigation/native';
import { ScreenName } from '../../navigation/screenName';

import { normalize, SCREEN_WIDTH } from '../../utils/metrics';

import { useAppDispatch, useAppSelector } from '../../redux';
import { updateProfile, setEmail } from '../../redux/slice/authSlice';
import { getUserProfile } from '../../services/auth/auth';

const Home = () => {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const navigation = useNavigation<any>();

  const dispatch = useAppDispatch();
  const profile = useAppSelector(state => state.auth.profile);

  const [selectedDate, setSelectedDate] = useState(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  });
  const [exploreAll, setExploreAll] = useState(false);

  console.log('REDUX PROFILE:', JSON.stringify(profile, null, 2));

  const userName = profile.name?.trim() || 'there';

  const calendarRef = useRef<ScrollView>(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      const itemWidth = normalize(44);
      const itemGap = normalize(8);

      const screenCenter = SCREEN_WIDTH / 3;
      const selectedIndex = days.findIndex(
        day => day.date.getTime() === selectedDate.getTime(),
      );

      const offset =
        selectedIndex * (itemWidth + itemGap) - screenCenter + itemWidth / 3;

      calendarRef.current?.scrollTo({
        x: Math.max(0, offset),
        animated: false,
      });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getUserProfile();

        if (response?.status === 200 && response?.data) {
          const data = response.data;

          const apiProfile = {
            ...(data.name || data.basicDetails?.name
              ? { name: data.basicDetails?.name || data.name }
              : {}),

            ...(data.phone ? { phone: data.phone } : {}),

            ...(data.basicDetails?.dob ? { dob: data.basicDetails.dob } : {}),

            ...(data.basicDetails?.height !== undefined
              ? { height: data.basicDetails.height }
              : {}),

            ...(data.basicDetails?.heightUnit !== undefined
              ? {
                  heightUnit:
                    Number(data.basicDetails.heightUnit) === 2 ? 'FT/IN' : 'CM',
                }
              : {}),

            ...(data.basicDetails?.weight !== undefined
              ? { weight: data.basicDetails.weight }
              : {}),

            ...(data.basicDetails?.weightUnit !== undefined
              ? {
                  weightUnit:
                    Number(data.basicDetails.weightUnit) === 2 ? 'LBS' : 'KG',
                }
              : {}),

            ...(data.healthDetail
              ? {
                  lactating: String(data.healthDetail.lactationStatus ?? ''),
                  contraceptive: String(
                    data.healthDetail.contraceptionStatus ?? '',
                  ),
                  bleedTimeline: String(
                    data.healthDetail.bleedingTimeline ?? '',
                  ),
                  cycleLength: String(data.healthDetail.cycleLength ?? ''),
                  lastMenstruationDate:
                    data.healthDetail.lastMenstruationDate || null,
                }
              : {}),

            ...(data.communityPreference
              ? {
                  state: data.communityPreference.state ?? '',
                  city: data.communityPreference.city ?? '',
                  parish: data.communityPreference.parish ?? '',
                  pastor: data.communityPreference.pastor ?? '',
                }
              : {}),
          };

          dispatch(updateProfile(apiProfile));

          if (data.email) {
            dispatch(setEmail(data.email));
          }

          console.log('PROFILE FETCHED SUCCESSFULLY:', data);
          console.log('PROFILE STORED IN REDUX:', apiProfile);
        }
      } catch (error: any) {
        console.log('HOME PROFILE API ERROR:', error?.response?.data || error);
      }
    };

    fetchProfile();
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <Image source={image.homeBG} style={styles.headerBackground} />

        <View style={styles.headerTop}>
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>Hi {userName}</Text>

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
          ref={calendarRef}
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
                onPress={() => {
                  setSelectedDate(new Date(day.date));

                  const itemWidth = normalize(44);
                  const itemGap = normalize(8);
                  const screenCenter = SCREEN_WIDTH / 3;

                  const offset =
                    day.key * (itemWidth + itemGap) -
                    screenCenter +
                    itemWidth / 3;

                  calendarRef.current?.scrollTo({
                    x: Math.max(0, offset),
                    animated: true,
                  });
                }}
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
          { paddingBottom: insets.bottom },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.cycleSection}>
          <Image source={image.tunnel} style={styles.tunnelImg} />
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
                <Image
                  source={item.image}
                  style={styles.learningImage}
                  resizeMode="cover"
                />

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
