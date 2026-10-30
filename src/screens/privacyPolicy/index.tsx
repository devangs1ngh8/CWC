import React from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import styles from './style';
import { BodySection, HeaderSection } from '../../components';
import { image } from '../../assets';

const PrivacyPolicy = () => {
  const { t } = useTranslation();

  const informationItems = t('privacy.sections.information.items', {
    returnObjects: true,
  }) as string[];

  const usageItems = t('privacy.sections.usage.items', {
    returnObjects: true,
  }) as string[];

  return (
    <View style={styles.container}>
      <HeaderSection
        backgroundImage={image.homeBG}
        showBackButton
        title={t('privacy.title')}
        titleStyle={styles.headerTitle}
        style={styles.header}
      />

      <BodySection root={styles.body} showDragHandle={false}>
        <Text style={styles.intro}>{t('privacy.intro')}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {t('privacy.sections.information.title')}
          </Text>

          {informationItems.map((item, index) => (
            <View key={`information-${index}`} style={styles.bulletRow}>
              <Text style={styles.bullet}>{'\u2022'}</Text>
              <Text style={styles.content}>{item}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {t('privacy.sections.usage.title')}
          </Text>

          <Text style={styles.content}>
            {t('privacy.sections.usage.description')}
          </Text>

          {usageItems.map((item, index) => (
            <View key={`usage-${index}`} style={styles.bulletRow}>
              <Text style={styles.bullet}>{'\u2022'}</Text>
              <Text style={styles.content}>{item}</Text>
            </View>
          ))}
        </View>
      </BodySection>
    </View>
  );
};

export default PrivacyPolicy;
