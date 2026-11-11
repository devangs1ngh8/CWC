import React, { useEffect, useState } from 'react';
import { View, Text, Switch, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

import ScreenHeader from '../../components/screenHeader';
import { image } from '../../assets';
import colors from '../../utils/color';
import styles from './style';
import { goalsData } from './goalsData';

type GoalsState = {
  periodPredictions: boolean;
  periodNotifications: boolean;
  fertilityEstimation: boolean;
  fertilityNotifications: boolean;
};

const defaultGoals: GoalsState = {
  periodPredictions: true,
  periodNotifications: false,
  fertilityEstimation: false,
  fertilityNotifications: false,
};

const ManageGoals = () => {
  const { t } = useTranslation();

  const [goals, setGoals] = useState<GoalsState>(defaultGoals);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved goals
  useEffect(() => {
    const loadGoals = async () => {
      try {
        const savedGoals = await AsyncStorage.getItem('manageGoals');

        if (savedGoals) {
          const parsedGoals = JSON.parse(savedGoals);

          setGoals({
            ...defaultGoals,
            ...parsedGoals,
          });
        }
      } catch (error) {
        console.log('Error loading goals:', error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadGoals();
  }, []);

  // Save goals whenever they change
  useEffect(() => {
    if (!isLoaded) return;

    const saveGoals = async () => {
      try {
        await AsyncStorage.setItem('manageGoals', JSON.stringify(goals));
      } catch (error) {
        console.log('Error saving goals:', error);
      }
    };

    saveGoals();
  }, [goals, isLoaded]);

  const handleGoalChange = (key: keyof GoalsState, value: boolean) => {
    setGoals(previous => ({
      ...previous,
      [key]: value,
    }));
  };

  return (
    <View style={styles.container}>
      <ScreenHeader
        title={t('manageGoals.title')}
        backgroundImage={image.homeBG}
        style={styles.header}
      />

      <View style={styles.body}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          bounces={false}
        >
          <View style={styles.goalsCard}>
            {goalsData.map((goal, index) => {
              const goalKey = goal.key as keyof GoalsState;

              return (
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
                    style={{ transform: [{ scaleX: 0.67 }, { scaleY: 0.67 }] }}
                    value={goals[goalKey]}
                    disabled={goal.disabled}
                    onValueChange={value => handleGoalChange(goalKey, value)}
                    trackColor={{
                      false: colors.borderColor,
                      true: goal.disabled
                        ? colors.buttonDisable
                        : colors.primary,
                    }}
                    ios_backgroundColor={colors.borderColor}
                  />
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ManageGoals;
