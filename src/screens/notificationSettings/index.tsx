import React, { useState } from 'react';
import { View, Text, Switch, Image } from 'react-native';
import Toast from 'react-native-toast-message';
import { useTranslation } from 'react-i18next';

import ScreenHeader from '../../components/screenHeader';
import { image } from '../../assets';
import colors from '../../utils/color';
import styles from './style';

import { updateNotificationSetting } from '../../services/notification/notification';

const NotificationSettings = () => {
  const { t } = useTranslation();

  const [isEnabled, setIsEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async (value: boolean) => {
    const previousValue = isEnabled;

    setIsEnabled(value);
    setIsLoading(true);

    try {
      const response = await updateNotificationSetting({
        push: value ? 1 : 0,
      });

      console.log('NOTIFICATION UPDATE RESPONSE:', response);

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: response.message,
      });
    } catch (error: any) {
      setIsEnabled(previousValue);

      console.log('NOTIFICATION UPDATE ERROR:', error?.response?.data || error);

      Toast.show({
        type: 'error',
        text1: 'Update Failed',
        text2:
          error?.response?.data?.message ||
          'Unable to update notification preference.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScreenHeader
        title={t('notificationSettings.title')}
        backgroundImage={image.homeBG}
        style={styles.header}
      />

      <View style={styles.body}>
        <View style={styles.notificationCard}>
          <Image source={image.reminders} style={styles.notificationIcon} />

          <View style={styles.notificationTextContainer}>
            <Text style={styles.notificationTitle}>
              {t('notificationSettings.pushNotification')}
            </Text>

            <Text style={styles.notificationDescription}>
              {t('notificationSettings.description')}
            </Text>
          </View>

          <Switch
            style={{
              transform: [{ scaleX: 0.67 }, { scaleY: 0.67 }],
            }}
            value={isEnabled}
            disabled={isLoading}
            onValueChange={handleToggle}
            trackColor={{
              false: colors.borderColor,
              true: colors.primary,
            }}
            ios_backgroundColor={colors.borderColor}
          />
        </View>
      </View>
    </View>
  );
};

export default NotificationSettings;
