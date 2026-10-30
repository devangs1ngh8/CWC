import React, { useEffect, useState } from 'react';
import { View, Text, Switch, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

import ScreenHeader from '../../components/screenHeader';
import { image } from '../../assets';
import colors from '../../utils/color';
import styles from './style';

const NOTIFICATION_KEY = 'pushNotificationsEnabled';

const NotificationSettings = () => {
  const { t } = useTranslation();
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    const loadPreference = async () => {
      const savedValue = await AsyncStorage.getItem(NOTIFICATION_KEY);

      if (savedValue !== null) {
        setIsEnabled(savedValue === 'true');
      }
    };

    loadPreference();
  }, []);

  const handleToggle = async (value: boolean) => {
    setIsEnabled(value);
    await AsyncStorage.setItem(NOTIFICATION_KEY, String(value));
  };

  return (
    <View style={styles.container}>
      <ScreenHeader
        title={t('notificationSettings.title')}
        backgroundImage={image.homeBG}
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
            value={isEnabled}
            onValueChange={handleToggle}
            trackColor={{
              false: colors.borderColor,
              true: colors.primary,
            }}
            thumbColor="#FFFFFF"
            ios_backgroundColor={colors.borderColor}
          />
        </View>
      </View>
    </View>
  );
};

export default NotificationSettings;
