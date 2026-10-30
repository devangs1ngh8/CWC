import React from 'react';
import { View, Text, Image, Pressable, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import styles from './style';
import { image } from '../../assets';
import { staticContentData } from './data';
import ScreenHeader from '../../components/screenHeader';

const StaticContent = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <ScreenHeader
        title={t('staticContent.title')}
        backgroundImage={image.homeBG}
      />

      <View style={styles.body}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.menuCard}>
            {staticContentData.map((item, index) => (
              <Pressable
                key={item.id}
                style={[
                  styles.menuItem,
                  index === staticContentData.length - 1 && styles.lastMenuItem,
                ]}
                onPress={() => {
                  if (item.screenName) {
                    navigation.navigate(item.screenName);
                  }
                }}
              >
                <Image
                  source={item.icon}
                  style={styles.menuIcon}
                  resizeMode="contain"
                />

                <Text style={styles.menuTitle}>{t(item.titleKey)}</Text>

                <Image
                  source={image.arrowRight}
                  style={styles.arrowIcon}
                  resizeMode="contain"
                />
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default StaticContent;
