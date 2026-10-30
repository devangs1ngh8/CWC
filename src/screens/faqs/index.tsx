import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, Image } from 'react-native';
import { useTranslation } from 'react-i18next';

import ScreenHeader from '../../components/screenHeader';
import { image } from '../../assets';
import styles from './style';
import { faqData } from './data';

const FAQs = () => {
  const { t } = useTranslation();

  const [expandedFaq, setExpandedFaq] = useState<string | null>('1');

  const handleToggle = (id: string) => {
    setExpandedFaq(previous => (previous === id ? null : id));
  };

  return (
    <View style={styles.container}>
      <ScreenHeader
        title={t('staticContent.faqs')}
        backgroundImage={image.homeBG}
      />

      <View style={styles.body}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {faqData.map(item => {
            const isExpanded = expandedFaq === item.id;

            return (
              <View key={item.id} style={styles.card}>
                <Pressable
                  style={styles.questionRow}
                  onPress={() => handleToggle(item.id)}
                >
                  <Text style={styles.question}>{t(item.questionKey)}</Text>

                  <Image
                    source={isExpanded ? image.arrowUp : image.arrowDown}
                    style={styles.arrow}
                  />
                </Pressable>

                {isExpanded && (
                  <View>
                    <View style={styles.divider} />

                    <Text style={styles.answer}>{t(item.answerKey)}</Text>
                  </View>
                )}
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default FAQs;
