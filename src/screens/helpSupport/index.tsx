import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

import { ScreenName } from '../../navigation/screenName';

import { useAppSelector } from '../../redux';
import { createHelpSupportTicket } from '../../services/helpSupport/helpSupport';

import ScreenHeader from '../../components/screenHeader';
import BottomSheetModal from '../../components/bottomSheetModal';

import { image } from '../../assets';
import colors from '../../utils/color';
import styles from './style';

const HelpSupport = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();

  const email = useAppSelector(state => state.auth.email);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [category, setCategory] = useState('Technical');
  const [issue, setIssue] = useState('');
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);

  const categories = [
    { id: 1, label: 'Technical' },
    { id: 2, label: 'App Functionality' },
    { id: 3, label: 'Care Navigator' },
    { id: 4, label: 'Other' },
  ];

  const handleSend = async () => {
    Keyboard.dismiss();

    if (!email) {
      Toast.show({
        type: 'error',
        text1: 'Email not found',
        text2: 'Please login again.',
      });
      return;
    }

    if (!issue.trim()) return;

    const selectedCategory = categories.find(item => item.label === category);

    if (!selectedCategory) return;

    try {
      setIsSubmitting(true);

      const payload = {
        email,
        description: issue.trim(),
        category: selectedCategory.id,
      };

      console.log('HELP SUPPORT PAYLOAD:', payload);

      const response = await createHelpSupportTicket(payload);

      console.log('HELP SUPPORT RESPONSE:', response);

      Toast.show({
        type: 'success',
        text1: t('helpSupport.successTitle'),
        text2: response.message,
      });

      setIssue('');

      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: ScreenName.MainTabs,
              params: { screen: 'More' },
            },
          ],
        });
      }, 2000);
    } catch (error: any) {
      console.log('HELP SUPPORT ERROR:', error?.response?.data || error);

      Toast.show({
        type: 'error',
        text1: 'Submission Failed',
        text2:
          error?.response?.data?.message ||
          'Unable to submit your issue. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScreenHeader
        title={t('helpSupport.title')}
        backgroundImage={image.homeBG}
        style={styles.header}
      />

      <KeyboardAvoidingView
        style={styles.keyboardAvoidingStyle}
        behavior="padding"
      >
        <View style={styles.body}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <View style={styles.contactHeading}>
              <Text style={styles.headingText}>{t('helpSupport.contact')}</Text>
              <Text style={styles.headingHighlight}>{t('helpSupport.us')}</Text>
            </View>

            <Text style={styles.subHeading}>
              {t('helpSupport.description')}
            </Text>

            <View style={styles.faqRow}>
              <Text style={styles.faqDescription}>
                {t('helpSupport.faqDescription')}
              </Text>

              <Pressable onPress={() => navigation.navigate(ScreenName.FAQs)}>
                <Text style={styles.faqLink}>{t('helpSupport.faqs')}</Text>
              </Pressable>
            </View>

            <View style={styles.emailCard}>
              <Image
                source={image.helpSupport}
                style={styles.emailIcon}
                resizeMode="contain"
              />

              <View style={styles.emailContent}>
                <Text style={styles.emailAddress}>
                  {t('helpSupport.email')}
                </Text>

                <Text style={styles.emailSubtitle}>
                  {t('helpSupport.emailSubtitle')}
                </Text>
              </View>
            </View>

            <View style={styles.categorySection}>
              <Text style={styles.fieldLabel}>{t('helpSupport.category')}</Text>

              <Pressable
                style={styles.categoryDropdown}
                onPress={() => {
                  Keyboard.dismiss();
                  setCategoryModalVisible(true);
                }}
              >
                <Text style={styles.categoryText}>{category}</Text>

                <Image
                  source={image.arrowDown}
                  style={styles.dropdownIcon}
                  resizeMode="contain"
                />
              </Pressable>
            </View>

            <View style={styles.issueSection}>
              <Text style={styles.issueDescription}>
                {t('helpSupport.issueDescription')}
              </Text>

              <TextInput
                style={styles.issueInput}
                placeholder={t('helpSupport.issuePlaceholder')}
                placeholderTextColor={colors.textFourth}
                value={issue}
                onChangeText={setIssue}
                multiline
                maxLength={500}
                textAlignVertical="top"
              />
            </View>
          </ScrollView>

          <Pressable
            style={[
              styles.sendButton,
              (!issue.trim() || isSubmitting) && styles.disabledButton,
            ]}
            disabled={!issue.trim() || isSubmitting}
            onPress={handleSend}
          >
            <Text style={styles.sendButtonText}>
              {isSubmitting ? 'Submitting...' : t('helpSupport.send')}
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>

      <BottomSheetModal
        visible={categoryModalVisible}
        onClose={() => setCategoryModalVisible(false)}
      >
        <View style={styles.sheetContent}>
          <Text style={styles.sheetTitle}>{t('helpSupport.category')}</Text>

          {categories.map(item => (
            <Pressable
              key={item.id}
              style={styles.sheetOption}
              onPress={() => {
                setCategory(item.label);
                setCategoryModalVisible(false);
              }}
            >
              <Text
                style={[
                  styles.sheetOptionText,
                  category === item.label && styles.selectedOption,
                ]}
              >
                {item.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </BottomSheetModal>
    </View>
  );
};

export default HelpSupport;
