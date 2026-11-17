import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';

import {
  getCommunityStates,
  getCommunityCities,
  getCommunityParishes,
  getCommunityPastors,
} from '../../services/community/community';

import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import { saveProfileData } from '../../utils/profileStorage';

import { useAppDispatch, useAppSelector } from '../../redux';

import { updateProfile } from '../../redux/slice/authSlice';

import { completeOnboarding } from '../../services/auth/auth';

// import {
//   states,
//   citiesByState,
//   parishNames,
//   pastorNames,
// } from '../../constants/communityOptions';

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

  // console.log('Redux Profile:', profile);

  const [community, setCommunity] = useState('');
  const [receiveUpdates, setReceiveUpdates] = useState(false);

  const [hasInteracted, setHasInteracted] = useState(false);
  const [hasAttemptedSave, setHasAttemptedSave] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [parishes, setParishes] = useState<string[]>([]);

  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [parish, setParish] = useState('');
  const [pastor, setPastor] = useState('');

  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingParishes, setLoadingParishes] = useState(false);
  const [loadingPastor, setLoadingPastor] = useState(false);

  const areRequiredFieldsFilled = Boolean(
    community &&
      selectedState &&
      selectedCity &&
      parish &&
      receiveUpdates &&
      !loadingPastor,
  );

  const isSaveDisabled =
    !areRequiredFieldsFilled || !hasInteracted || isLoading;

  const handleStateChange = async (value: string) => {
    setSelectedState(value);

    // Reset dependent fields
    setSelectedCity('');
    setParish('');
    setPastor('');

    setCities([]);
    setParishes([]);

    setHasInteracted(true);

    try {
      setLoadingCities(true);

      const data = await getCommunityCities(value);

      setCities(data || []);
    } catch (error) {
      console.log('FETCH CITIES ERROR:', error);
    } finally {
      setLoadingCities(false);
    }
  };

  const handleCityChange = async (value: string) => {
    setSelectedCity(value);

    // Reset dependent fields
    setParish('');
    setPastor('');

    setParishes([]);

    setHasInteracted(true);

    try {
      setLoadingParishes(true);

      const data = await getCommunityParishes(selectedState, value);

      setParishes(data || []);
    } catch (error) {
      console.log('FETCH PARISHES ERROR:', error);
    } finally {
      setLoadingParishes(false);
    }
  };

  const handleParishChange = async (value: string) => {
    setParish(value);
    setPastor('');

    setHasInteracted(true);

    try {
      setLoadingPastor(true);

      const data = await getCommunityPastors(
        selectedState,
        selectedCity,
        value,
      );

      // Ignore empty or whitespace-only values
      const validPastors = (data || []).filter(
        item => item && item.trim().length > 0,
      );

      setPastor(validPastors[0] || '');
    } catch (error) {
      console.log('FETCH PASTOR ERROR:', error);
      setPastor('');
    } finally {
      setLoadingPastor(false);
    }
  };

  const handleSave = async () => {
    setHasAttemptedSave(true);

    if (!areRequiredFieldsFilled || isLoading) {
      setApiError('Please fill all required fields.');
      return;
    }

    if (!profile.dob || !profile.name || !profile.height || !profile.weight) {
      setApiError('Previous profile details are missing.');
      return;
    }

    const profileData = {
      community,
      state: selectedState,
      city: selectedCity,
      parish,
      pastor,
      receiveUpdates,
    };

    const payload = {
      step: 4,

      // Step 1: PersonalInformation data
      basicDetails: {
        name: profile.name,
        dob: profile.dob,
        heightUnit: profile.heightUnit === 'CM' ? 1 : 2,
        height: profile.height,
        weightUnit: profile.weightUnit === 'KG' ? 1 : 2,
        weight: profile.weight,
      },

      // Step 2: YourCycles data
      healthDetail: {
        lactationStatus: 0,
        contraceptionStatus: 0,
        bleedingTimeline: 0,
        cycleLength: Number(profile.cycleLength),
        lastMenstruationDate: profile.lastMenstruationDate || '',
      },

      // Step 4: CatholicCommunity data
      communityPreference: {
        isCatholic: community === 'yes' ? 1 : 0,
        comment: '',
        state: selectedState,
        city: selectedCity,
        parish,
        pastor,
        committedToCatholicTeachings: 0,
      },
    };

    try {
      setIsLoading(true);
      setApiError('');

      console.log(
        'COMPLETE ONBOARDING STEP 4 REQUEST:',
        JSON.stringify(payload, null, 2),
      );

      const response = await completeOnboarding(payload);

      console.log('COMPLETE ONBOARDING STEP 4 SUCCESS:', response);

      dispatch(updateProfile(profileData));

      await saveProfileData(profileData);

      console.log('STEP 4 PROFILE SAVED:', profileData);

      navigation.reset({
        index: 0,
        routes: [{ name: ScreenName.Subscription }],
      });
    } catch (error: any) {
      console.log(
        'COMPLETE ONBOARDING STEP 4 ERROR:',
        error.response?.data || error,
      );

      setApiError(
        error.response?.data?.message ||
          'Unable to complete onboarding. Please try again.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchStates = async () => {
      try {
        setLoadingStates(true);

        const data = await getCommunityStates();

        setStates(data || []);
      } catch (error) {
        console.log('FETCH STATES ERROR:', error);
      } finally {
        setLoadingStates(false);
      }
    };

    fetchStates();
  }, []);

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
              placeholder={
                loadingStates ? 'Loading states...' : t('community.selectState')
              }
              options={states}
              selectedValue={selectedState}
              onSelect={handleStateChange}
              disabled={loadingStates}
            />

            {hasAttemptedSave && !selectedState && (
              <ErrorMessage error={t('community.errors.stateRequired')} />
            )}
          </View>

          <View style={styles.halfColumn}>
            <Text style={styles.label}>{t('community.city')}</Text>

            <CustomDropdown
              title={t('community.selectCity')}
              placeholder={
                !selectedState
                  ? 'Select state first'
                  : loadingCities
                  ? 'Loading cities...'
                  : t('community.selectCity')
              }
              options={cities}
              selectedValue={selectedCity}
              onSelect={handleCityChange}
              disabled={!selectedState || loadingCities}
            />

            {hasAttemptedSave && !selectedCity && (
              <ErrorMessage error={t('community.errors.cityRequired')} />
            )}
          </View>
        </View>

        <Text style={styles.label}>{t('community.localParishName')}</Text>

        <CustomDropdown
          title={t('community.selectParish')}
          placeholder={
            !selectedCity
              ? 'Select city first'
              : loadingParishes
              ? 'Loading parishes...'
              : t('community.selectParish')
          }
          options={parishes}
          selectedValue={parish}
          onSelect={handleParishChange}
          disabled={!selectedCity || loadingParishes}
        />

        {hasAttemptedSave && !parish && (
          <ErrorMessage error={t('community.errors.parishRequired')} />
        )}

        <Text style={styles.label}>{t('community.pastorName')}</Text>

        <TextInput
          style={styles.pastorInput}
          value={loadingPastor ? 'Loading pastor...' : pastor}
          placeholder={!parish ? 'Select parish first' : 'Pastor name'}
          editable={false}
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
