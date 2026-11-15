import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import { saveProfileData } from '../../utils/profileStorage';

import { useAppDispatch, useAppSelector } from '../../redux/auth/hooks';
import { updateProfile } from '../../redux/auth/authSlice';

import {
  states,
  citiesByState,
  parishNames,
  pastorNames,
} from '../../constants/communityOptions';

import {
  HeaderSection,
  StepBody,
  PrimaryButton,
  CustomDropdown,
  ErrorMessage,
} from '../../components';

import { image } from '../../assets';
import styles from './style';
import { ScreenName } from '../../navigation/screenName';

const CatholicCommunity = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();

  const dispatch = useAppDispatch();

  const profile = useAppSelector(state => state.auth.profile);

  console.log('Redux Profile:', profile);

  const [community, setCommunity] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [parish, setParish] = useState('');
  const [pastor, setPastor] = useState('');
  const [receiveUpdates, setReceiveUpdates] = useState(false);

  const [hasInteracted, setHasInteracted] = useState(false);
  const [hasAttemptedSave, setHasAttemptedSave] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const areRequiredFieldsFilled = Boolean(
    community && selectedState && selectedCity && parish && receiveUpdates,
  );

  const isSaveDisabled = hasAttemptedSave
    ? !areRequiredFieldsFilled
    : !hasInteracted;

  const handleStateChange = (value: string) => {
    setSelectedState(value);
    setSelectedCity('');
    setHasInteracted(true);
  };

  const handleSave = async () => {
    setHasAttemptedSave(true);

    if (!areRequiredFieldsFilled) {
      setApiError('Please fill all required fields.');
      return;
    }

    try {
      setIsLoading(true);
      setApiError('');

      const profileData = {
        community,
        state: selectedState,
        city: selectedCity,
        parish,
        pastor,
        receiveUpdates,
      };

      dispatch(updateProfile(profileData));

      await saveProfileData(profileData);

      navigation.reset({
        index: 0,
        routes: [{ name: ScreenName.Subscription }],
      });
    } catch (error) {
      console.log('PROFILE STORAGE ERROR:', error);
      setApiError('Unable to save profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <HeaderSection
        backgroundImage={image.headImage}
        logo={image.splashText}
        style={styles.header}
        showBackButton
      />

      <StepBody
        root={styles.body}
        titlePrimary={t('community.step')}
        titleSecondary={t('community.title')}
        description={t('community.question')}
        descriptionStyle={styles.description}
        headingPrimaryStyle={styles.stepTitle}
        headingSecondaryStyle={styles.screenTitle}
        titleContentStyle={styles.titleContent}
        bottomContent={
          <View style={styles.bottomContent}>
            <PrimaryButton
              title={isLoading ? 'Saving...' : t('community.save')}
              onPress={handleSave}
              disabled={isSaveDisabled || isLoading}
            />
          </View>
        }
      >
        <View style={styles.radioRow}>
          {[
            { label: t('community.yes'), value: 'yes' },
            { label: t('community.no'), value: 'no' },
          ].map(option => {
            const isSelected = community === option.value;

            return (
              <Pressable
                key={option.value}
                style={[
                  styles.radioOption,
                  isSelected && styles.radioOptionSelected,
                ]}
                onPress={() => {
                  setCommunity(option.value);
                  setHasInteracted(true);
                }}
              >
                <View
                  style={[
                    styles.radioCircle,
                    isSelected && styles.radioCircleSelected,
                  ]}
                />

                <Text
                  style={[
                    styles.radioText,
                    isSelected && styles.radioTextSelected,
                  ]}
                >
                  {option.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {hasAttemptedSave && !community && (
          <ErrorMessage error={t('community.errors.communityRequired')} />
        )}

        <View style={styles.locationRow}>
          <View style={styles.halfColumn}>
            <Text style={styles.label}>{t('community.state')}</Text>

            <CustomDropdown
              title={t('community.selectState')}
              placeholder={t('community.selectState')}
              options={states}
              selectedValue={selectedState}
              onSelect={handleStateChange}
            />

            {hasAttemptedSave && !selectedState && (
              <ErrorMessage error={t('community.errors.stateRequired')} />
            )}
          </View>

          <View style={styles.halfColumn}>
            <Text style={styles.label}>{t('community.city')}</Text>

            <CustomDropdown
              title={t('community.selectCity')}
              placeholder={t('community.selectCity')}
              options={citiesByState[selectedState] || []}
              selectedValue={selectedCity}
              onSelect={value => {
                setSelectedCity(value);
                setHasInteracted(true);
              }}
            />

            {hasAttemptedSave && !selectedCity && (
              <ErrorMessage error={t('community.errors.cityRequired')} />
            )}
          </View>
        </View>

        <Text style={styles.label}>{t('community.localParishName')}</Text>

        <CustomDropdown
          title={t('community.selectParish')}
          placeholder={t('community.selectParish')}
          options={parishNames}
          selectedValue={parish}
          onSelect={value => {
            setParish(value);
            setHasInteracted(true);
          }}
        />

        {hasAttemptedSave && !parish && (
          <ErrorMessage error={t('community.errors.parishRequired')} />
        )}

        <Text style={styles.label}>
          {t('community.pastorName')} ({t('community.optional')})
        </Text>

        <CustomDropdown
          title={t('community.selectPastor')}
          placeholder={t('community.selectPastor')}
          options={pastorNames}
          selectedValue={pastor}
          onSelect={value => {
            setPastor(value);
            setHasInteracted(true);
          }}
        />

        <Pressable
          style={styles.checkboxRow}
          onPress={() => {
            setReceiveUpdates(previous => !previous);
            setHasInteracted(true);
          }}
        >
          <View
            style={[styles.checkbox, receiveUpdates && styles.checkboxSelected]}
          >
            {receiveUpdates && <Text style={styles.checkboxTick}>✓</Text>}
          </View>

          <Text style={styles.checkboxText}>
            {t('community.receiveUpdates')}
          </Text>
        </Pressable>

        {apiError ? <ErrorMessage error={apiError} /> : null}
      </StepBody>
    </View>
  );
};

export default CatholicCommunity;
