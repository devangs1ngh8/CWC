import React, { useEffect, useState } from 'react';
import { View, Text, Switch, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

import ScreenHeader from '../../components/screenHeader';
import { image } from '../../assets';
import colors from '../../utils/color';
import styles from './style';
import { goalsData } from './goalsData';

const ManageGoals = () => {
  const { t } = useTranslation();

  const [goals, setGoals] = useState({
    periodPredictions: true,
    periodNotifications: false,
    fertilityEstimation: false,
    fertilityNotifications: false,
  });

  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved goals when screen opens
  useEffect(() => {
    const loadGoals = async () => {
      try {
        const savedGoals = await AsyncStorage.getItem('manageGoals');

        if (savedGoals) {
          setGoals(JSON.parse(savedGoals));
        }
      } catch (error) {
        console.log('Error loading goals:', error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadGoals();
  }, []);

  // Save goals whenever their values change
  useEffect(() => {
    if (isLoaded) {
      AsyncStorage.setItem('manageGoals', JSON.stringify(goals)).catch(error =>
        console.log('Error saving goals:', error),
      );
    }
  }, [goals, isLoaded]);

  return (
    <View style={styles.container}>
      <ScreenHeader
        title={t('manageGoals.title')}
        backgroundImage={image.homeBG}
      />

      <View style={styles.body}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.goalsCard}>
            {goalsData.map((goal, index) => (
              <View
                key={goal.key}
                style={[
                  styles.goalRow,
                  index !== goalsData.length - 1 && styles.goalDivider,
                ]}
              >
                <Image style={styles.goalIcon} source={goal.icon} />

                <Text style={styles.goalTitle}>{t(goal.titleKey)}</Text>

                <Switch
                  value={goals[goal.key]}
                  disabled={goal.disabled}
                  onValueChange={value =>
                    setGoals(previous => ({
                      ...previous,
                      [goal.key]: value,
                    }))
                  }
                  trackColor={{
                    false: colors.borderColor,
                    true: goal.disabled ? colors.buttonDisable : colors.primary,
                  }}
                  ios_backgroundColor={colors.borderColor}
                />
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ManageGoals;
