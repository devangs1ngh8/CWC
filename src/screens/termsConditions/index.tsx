import React from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import styles from './style';
import { BodySection, HeaderSection, ScreenHeader } from '../../components';
import { image } from '../../assets';

const TermsConditions = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <ScreenHeader
        backgroundImage={image.homeBG}
        title={t('terms.title')}
        style={styles.header}
      />

      <BodySection root={styles.body} showDragHandle={false}>
        <Text style={styles.content}>{t('terms.description')}</Text>
      </BodySection>
    </View>
  );
};

export default TermsConditions;
