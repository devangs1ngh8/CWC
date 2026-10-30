import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';

import ScreenHeader from '../../components/screenHeader';
import { image } from '../../assets';
import styles from './style';

const AboutUs = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <ScreenHeader title={t('aboutUs.title')} backgroundImage={image.homeBG} />

      <View style={styles.body}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          bounces={false}
        >
          <Text style={styles.description}>{t('aboutUs.paragraph1')}</Text>

          <Text style={styles.description}>{t('aboutUs.paragraph2')}</Text>

          <Text style={styles.description}>{t('aboutUs.paragraph3')}</Text>
        </ScrollView>
      </View>
    </View>
  );
};

export default AboutUs;
