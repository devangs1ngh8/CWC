import React, { useState } from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { saveProfileData } from '../../utils/profileStorage';

import {
  HeaderSection,
  BodySection,
  PrimaryButton,
  CustomDropdown,
  ErrorMessage,
} from '../../components';

import {
  states,
  citiesByState,
  parishNames,
  pastorNames,
} from '../../constants/communityOptions';

import { image } from '../../assets';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
import { ScreenName } from '../../navigation/screenName';

const CatholicCommunity = () => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();

  const [community, setCommunity] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [parish, setParish] = useState('');
  const [pastor, setPastor] = useState('');
  const [receiveUpdates, setReceiveUpdates] = useState(false);

  const [hasInteracted, setHasInteracted] = useState(false);
  const [hasAttemptedSave, setHasAttemptedSave] = useState(false);

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
      return;
    }

    await saveProfileData({
      state: selectedState,
      city: selectedCity,
      parish,
      pastor,
    });

    navigation.reset({
      index: 0,
      routes: [{ name: ScreenName.Login }],
    });
  };

  return (
    <View style={styles.container}>
      <HeaderSection
        backgroundImage={image.headImage}
        logo={image.splashText}
        style={styles.header}
        showBackButton
      />

      <BodySection
        titlePrimary={t('community.step')}
        titleSecondary={t('community.title')}
        description={t('community.question')}
        descriptionStyle={styles.description}
        headingPrimaryStyle={styles.stepTitle}
        headingSecondaryStyle={styles.screenTitle}
        titleContentStyle={styles.titleContent}
        bottomContent={
          <View
            style={[styles.bottomContent, { paddingBottom: insets.bottom }]}
          >
            <PrimaryButton
              title={t('community.save')}
              onPress={handleSave}
              disabled={isSaveDisabled}
            />
          </View>
        }
      >
        {/* <Text style={styles.description}>{t('community.question')}</Text> */}

        <View style={styles.radioRow}>
          {[t('community.yes'), t('community.no')].map(option => {
            const isSelected = community === option;

            return (
              <Pressable
                key={option}
                style={[
                  styles.radioOption,
                  isSelected && styles.radioOptionSelected,
                ]}
                onPress={() => {
                  setCommunity(option);
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
                  {option}
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

            <View style={selectedState && styles.selectedBorder}>
              <CustomDropdown
                title={t('community.selectState')}
                options={states}
                selectedValue={selectedState || t('community.selectState')}
                onSelect={handleStateChange}
              />
            </View>

            {hasAttemptedSave && !selectedState && (
              <ErrorMessage error={t('community.errors.stateRequired')} />
            )}
          </View>

          <View style={styles.halfColumn}>
            <Text style={styles.label}>{t('community.city')}</Text>

            <View style={selectedCity && styles.selectedBorder}>
              <CustomDropdown
                title={t('community.selectCity')}
                options={citiesByState[selectedState] || []}
                selectedValue={selectedCity || t('community.selectCity')}
                onSelect={value => {
                  setSelectedCity(value);
                  setHasInteracted(true);
                }}
              />
            </View>

            {hasAttemptedSave && !selectedCity && (
              <ErrorMessage error={t('community.errors.cityRequired')} />
            )}
          </View>
        </View>

        <Text style={styles.label}>{t('community.localParishName')}</Text>

        <View style={parish && styles.selectedBorder}>
          <CustomDropdown
            title={t('community.selectParish')}
            options={parishNames}
            selectedValue={parish || t('community.selectParish')}
            onSelect={value => {
              setParish(value);
              setHasInteracted(true);
            }}
          />
        </View>

        {hasAttemptedSave && !parish && (
          <ErrorMessage error={t('community.errors.parishRequired')} />
        )}

        <Text style={styles.label}>
          {t('community.pastorName')} ({t('community.optional')})
        </Text>

        <View style={pastor && styles.selectedBorder}>
          <CustomDropdown
            title={t('community.selectPastor')}
            options={pastorNames}
            selectedValue={pastor || t('community.selectPastor')}
            onSelect={value => {
              setPastor(value);
              setHasInteracted(true);
            }}
          />
        </View>

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
      </BodySection>
    </View>
  );
};

export default CatholicCommunity;
