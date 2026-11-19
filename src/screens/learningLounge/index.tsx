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
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import styles from './style';
import { image } from '../../assets';
import { ScreenHeader } from '../../components';

import { ScreenName } from '../../navigation/screenName';
import { getEducationList } from '../../services/home';
import colors from '../../utils/color';
import i18n from '../../i18n';

const PAGE_SIZE = 10;
const SCROLL_THRESHOLD = 100;

const LearningLounge = () => {
  const navigation = useNavigation<any>();
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);

  const [learningItems, setLearningItems] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const isLoadingRef = useRef(false);
  const hasTriggeredRef = useRef(false);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;

    const isAtBottom =
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - SCROLL_THRESHOLD;

    if (isAtBottom && !hasTriggeredRef.current) {
      hasTriggeredRef.current = true;

      if (page < totalPages) {
        fetchEducation(page + 1);
      }
    }

    if (!isAtBottom) {
      hasTriggeredRef.current = false;
    }
  };

  const fetchEducation = async (pageNumber: number) => {
    if (isLoadingRef.current) return;

    isLoadingRef.current = true;
    setIsLoading(true);

    try {
      const response = await getEducationList(pageNumber, PAGE_SIZE);
      const candidates = [response?.data?.data, response?.data, response];

      const result = candidates.find(item => Array.isArray(item?.data));

      const newItems = result?.data || [];

      console.log('EDUCATION ITEMS COUNT:', newItems.length);
      console.log('FIRST EDUCATION ITEM:', newItems[0]);

      setLearningItems(prev =>
        pageNumber === 1 ? newItems : [...prev, ...newItems],
      );

      setPage(result?.currentPage || pageNumber);
      setTotalPages(result?.totalPages || 1);
    } catch (error: any) {
      console.log('EDUCATION API ERROR:', error?.response?.data || error);
    } finally {
      isLoadingRef.current = false;
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEducation(1);
  }, []);

  const renderLearningItem = ({ item }: { item: any }) => {
    return (
      <Pressable
        style={styles.learningCard}
        onPress={() => navigation.navigate(ScreenName.LearningDetail, { item })}
      >
        <Image
          source={
            item.mediaFile?.url
              ? { uri: item.mediaFile.url }
              : item.mediaFile?.path
              ? { uri: item.mediaFile.path }
              : i18n.language === 'es'
              ? image.defaultLearningSpanish
              : image.defaultLearningEnglish
          }
          style={styles.learningImage}
        />

        <Text style={styles.learningTitle} numberOfLines={1}>
          {item.title}
        </Text>

        <Text style={styles.learningDescription} numberOfLines={2}>
          {item.description?.replace(/<[^>]*>/g, '').trim()}
        </Text>
      </Pressable>
    );
  };

  const renderFooter = () => {
    if (isLoading) {
      return <ActivityIndicator size="small" style={styles.loader} />;
    }

    if (page >= totalPages) {
      return <Text style={styles.noData}>No more learning content</Text>;
    }

    return undefined;
  };

  return (
    <View style={styles.container}>
      <ScreenHeader
        backgroundImage={image.homeBG}
        title={t('learningLounge.title')}
        style={styles.header}
      />

      <View style={styles.scrollView}>
        <FlatList
          data={learningItems}
          renderItem={renderLearningItem}
          keyExtractor={item => item._id}
          numColumns={2}
          contentContainerStyle={styles.content}
          columnWrapperStyle={styles.learningGrid}
          showsVerticalScrollIndicator={false}
          onEndReached={() => {
            if (!isLoading && page < totalPages) {
              fetchEducation(page + 1);
            }
          }}
          ListFooterComponent={renderFooter}
        />
      </View>
    </View>
  );
};

export default LearningLounge;
