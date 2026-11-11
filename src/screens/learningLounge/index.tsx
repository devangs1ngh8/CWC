import React from 'react';
import { View, Text, Image, Pressable, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import styles from './style';
import { image } from '../../assets';
import { HeaderSection, ScreenHeader } from '../../components';
import { learningData } from '../home/learningData';
import { ScreenName } from '../../navigation/screenName';

const LearningLounge = () => {
  const navigation = useNavigation<any>();
  const { t } = useTranslation();

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
      >
        <View style={styles.learningGrid}>
          {learningData.map(item => (
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
      </ScrollView>
    </View>
  );
};

export default LearningLounge;
