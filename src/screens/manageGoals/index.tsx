import React, { useState } from 'react';
import { View, Text, Switch, ScrollView, Image } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../redux';
import { updateProfile } from '../../redux/slice/authSlice';
import { updateManageGoals } from '../../services/user/manageGoals';
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

const ManageGoals = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const personalPreference = useAppSelector(
    state => state.auth.profile.personalPreference,
  );

  const [isSaving, setIsSaving] = useState(false);

  const goals: GoalsState = {
    periodPredictions: personalPreference.periodsPredictions === 1,
    periodNotifications: personalPreference.periodNotifications === 1,
    fertilityEstimation: personalPreference.fertilityPredictions === 1,
    fertilityNotifications:
      personalPreference.fertilityStatusNotification === 1,
  };

  const handleGoalChange = async (key: keyof GoalsState, value: boolean) => {
    if (isSaving) return;

    const previousPreference = personalPreference;

    const updatedPreference = {
      ...previousPreference,

      periodsPredictions:
        key === 'periodPredictions'
          ? Number(value)
          : previousPreference.periodsPredictions,

      periodNotifications:
        key === 'periodNotifications'
          ? Number(value)
          : previousPreference.periodNotifications,

      fertilityPredictions:
        key === 'fertilityEstimation'
          ? Number(value)
          : previousPreference.fertilityPredictions,

      fertilityStatusNotification:
        key === 'fertilityNotifications'
          ? Number(value)
          : previousPreference.fertilityStatusNotification,
    };

    try {
      setIsSaving(true);

      await updateManageGoals(updatedPreference);

      dispatch(
        updateProfile({
          personalPreference: updatedPreference,
        }),
      );
    } catch (error: any) {
      console.log('MANAGE GOALS UPDATE ERROR:', error?.response?.data || error);
    } finally {
      setIsSaving(false);
    }
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
                    disabled={goal.disabled || isSaving}
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
