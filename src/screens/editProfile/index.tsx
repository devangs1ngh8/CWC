import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  ScrollView,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Toast from 'react-native-toast-message';

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { BottomSheetModal } from '../../components';

import {
  HeaderSection,
  CustomDropdown,
  DateInput,
  PrimaryButton,
} from '../../components';

import { image } from '../../assets';
import styles from './style';
import colors from '../../utils/color';

import {
  states,
  citiesByState,
  parishNames,
} from '../../constants/communityOptions';

import {
  lactatingOptions,
  contraceptiveOptions,
  bleedTimelineOptions,
  cycleLengthOptions,
} from '../../utils/profileData';

import {
  cleanName,
  cleanNumber,
  validateName,
  validateHeight,
} from '../../utils/validations';

import { getProfileData, saveProfileData } from '../../utils/profileStorage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ScreenName } from '../../navigation/screenName';

const EditProfile = () => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState<Date | null>(null);

  const [height, setHeight] = useState('');
  const [feet, setFeet] = useState('');
  const [inches, setInches] = useState('');
  const [heightUnit, setHeightUnit] = useState('CM');

  const [weight, setWeight] = useState('');
  const [weightUnit, setWeightUnit] = useState('KG');

  const [lactating, setLactating] = useState('');
  const [contraceptive, setContraceptive] = useState('');
  const [bleedTimeline, setBleedTimeline] = useState('');
  const [lastMenstruationDate, setLastMenstruationDate] = useState<Date | null>(
    null,
  );
  const [cycleLength, setCycleLength] = useState('');

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [parish, setParish] = useState('');
  const [pastor, setPastor] = useState('');

  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    height: '',
    weight: '',
  });

  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [isPhotoModalVisible, setIsPhotoModalVisible] = useState(false);

  const handleChoosePhoto = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
    });

    if (result.assets?.[0]?.uri) {
      setPhotoUri(result.assets[0].uri);
    }

    setIsPhotoModalVisible(false);
  };

  const handleTakePhoto = async () => {
    const result = await launchCamera({
      mediaType: 'photo',
      cameraType: 'front',
      saveToPhotos: true,
    });

    if (result.assets?.[0]?.uri) {
      setPhotoUri(result.assets[0].uri);
    }

    setIsPhotoModalVisible(false);
  };

  const handleRemovePhoto = () => {
    setPhotoUri(null);
    setIsPhotoModalVisible(false);
  };

  useEffect(() => {
    const loadProfile = async () => {
      const profile = await getProfileData();
      const oldName = await AsyncStorage.getItem('userName');

      const savedPhoto = await AsyncStorage.getItem('profilePhotoUri');
      setPhotoUri(savedPhoto);

      setName(profile.name ?? oldName ?? '');
      setEmail(profile.email ?? '');
      setPhone(cleanNumber(profile.phone ?? '').slice(0, 10));
      setDob(profile.dob ? new Date(profile.dob) : null);

      setHeightUnit(profile.heightUnit ?? 'CM');

      if (profile.heightUnit === 'FT/IN' && profile.height) {
        const match = profile.height.match(/(\d+)\D+(\d+)/);

        setFeet(match?.[1] ?? '');
        setInches(match?.[2] ?? '');
      } else {
        setHeight(profile.height ?? '');
      }

      setWeight(profile.weight ?? '');
      setWeightUnit(profile.weightUnit ?? 'KG');

      setLactating(profile.lactating ?? '');
      setContraceptive(profile.contraceptive ?? '');
      setBleedTimeline(profile.bleedTimeline ?? '');

      setLastMenstruationDate(
        profile.lastMenstruationDate
          ? new Date(profile.lastMenstruationDate)
          : null,
      );

      setCycleLength(profile.cycleLength ?? '');
      setState(profile.state ?? '');
      setCity(profile.city ?? '');
      setParish(profile.parish ?? '');
      setPastor(profile.pastor ?? '');
    };

    loadProfile();
  }, []);

  const cityOptions = state ? citiesByState[state] ?? [] : [];

  const validateForm = () => {
    const newErrors = {
      name: '',
      phone: '',
      height: '',
      weight: '',
    };

    if (!name.trim() || !validateName(name)) {
      newErrors.name = t('editProfile.validName');
    }

    if (phone.length !== 10) {
      newErrors.phone = t('editProfile.validPhone');
    }

    if (!validateHeight(heightUnit, height, feet, inches)) {
      newErrors.height = 'Enter a valid height';
    }

    const weightValue = Number(weight);

    if (
      !weight.trim() ||
      !Number.isFinite(weightValue) ||
      weightValue <= 0 ||
      weightValue > (weightUnit === 'KG' ? 500 : 1100)
    ) {
      newErrors.weight = 'Enter a valid weight';
    }

    setErrors(newErrors);

    return !Object.values(newErrors).some(Boolean);
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      await saveProfileData({
        name: name.trim(),
        phone,
        dob: dob?.toISOString() ?? null,
        height: heightUnit === 'CM' ? height : `${feet}' ${inches}"`,
        heightUnit,
        weight,
        weightUnit,
        lactating,
        contraceptive,
        bleedTimeline,
        lastMenstruationDate: lastMenstruationDate?.toISOString() ?? null,
        cycleLength,
        state,
        city,
        parish,
      });

      await AsyncStorage.setItem('userName', name.trim());

      await saveProfileData({});

      if (photoUri) {
        await AsyncStorage.setItem('profilePhotoUri', photoUri);
      } else {
        await AsyncStorage.removeItem('profilePhotoUri');
      }

      Toast.show({
        type: 'success',
        text1: 'Profile Updated',
        text2: 'Your details have been saved successfully.',
      });

      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: ScreenName.MainTabs,
              params: {
                screen: 'More',
              },
            },
          ],
        });
      }, 2000);
    } catch (error) {
      console.log('Error saving profile:', error);

      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
        text2: 'Unable to save your profile.',
      });
    }
  };

  const handleNumberChange = (
    value: string,
    field: 'height' | 'weight' | 'feet' | 'inches',
  ) => {
    const number = cleanNumber(value);

    if (field === 'height') setHeight(number);
    if (field === 'weight') setWeight(number);
    if (field === 'feet') setFeet(number);
    if (field === 'inches') setInches(number);

    if (field === 'height' || field === 'feet' || field === 'inches') {
      setErrors(previous => ({ ...previous, height: '' }));
    }

    if (field === 'weight') {
      setErrors(previous => ({ ...previous, weight: '' }));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <HeaderSection
          backgroundImage={image.homeBG}
          style={styles.headerBackground}
          showBackButton
        />
        <Text style={styles.headerTitle}>{t('editProfile.title')}</Text>
      </View>

      <View style={styles.profileTop}>
        <Image
          source={photoUri ? { uri: photoUri } : image.defaultProfile}
          style={styles.profileImage}
        />

        <Pressable
          style={styles.changePhotoButton}
          onPress={() => setIsPhotoModalVisible(true)}
        >
          <Image source={image.camera} />
          <Text style={styles.changePhotoText}>Change Photo</Text>
        </Pressable>
      </View>

      <ScrollView
        style={styles.form}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.label}>{t('editProfile.name')}</Text>
        <TextInput
          style={[styles.input, errors.name ? styles.inputError : null]}
          value={name}
          onChangeText={value => {
            setName(cleanName(value));
            setErrors(previous => ({ ...previous, name: '' }));
          }}
          placeholder={t('editProfile.namePlaceholder')}
          placeholderTextColor={colors.text8}
          autoCapitalize="words"
          maxLength={50}
        />
        {!!errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

        <Text style={styles.label}>{t('editProfile.email')}</Text>
        <TextInput
          style={[styles.input, styles.disabledInput]}
          value={email}
          editable={false}
        />

        <Text style={styles.label}>{t('editProfile.phoneNumber')}</Text>
        <View
          style={[
            styles.phoneInputContainer,
            errors.phone ? styles.inputError : null,
          ]}
        >
          <Text style={styles.countryCode}>+1</Text>
          <View style={styles.phoneDivider} />
          <TextInput
            style={styles.phoneTextInput}
            value={phone}
            onChangeText={value => {
              setPhone(cleanNumber(value).slice(0, 10));
              setErrors(previous => ({ ...previous, phone: '' }));
            }}
            placeholder="Add Phone Number"
            placeholderTextColor={colors.text8}
            keyboardType="phone-pad"
            maxLength={10}
          />
        </View>
        {!!errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

        <Text style={styles.label}>{t('personalInfo.dateOfBirth')}</Text>
        <DateInput
          value={dob}
          onChange={setDob}
          placeholder={t('personalInfo.datePlaceholder')}
        />

        <Text style={styles.label}>{t('personalInfo.height')}</Text>

        <View style={styles.measureRow}>
          {heightUnit === 'CM' ? (
            <TextInput
              style={[
                styles.input,
                styles.measureInput,
                errors.height ? styles.inputError : null,
              ]}
              value={height}
              onChangeText={value => handleNumberChange(value, 'height')}
              keyboardType="decimal-pad"
              placeholder="Height in cm"
              placeholderTextColor={colors.text8}
            />
          ) : (
            <>
              <TextInput
                style={[
                  styles.input,
                  styles.measureInput,
                  errors.height ? styles.inputError : null,
                ]}
                value={feet}
                onChangeText={value => handleNumberChange(value, 'feet')}
                keyboardType="number-pad"
                placeholder="Feet"
                placeholderTextColor={colors.text8}
              />
              <TextInput
                style={[
                  styles.input,
                  styles.measureInput,
                  errors.height ? styles.inputError : null,
                ]}
                value={inches}
                onChangeText={value => handleNumberChange(value, 'inches')}
                keyboardType="number-pad"
                placeholder="Inches"
                placeholderTextColor={colors.text8}
              />
            </>
          )}

          <View style={styles.unitGroup}>
            {['CM', 'FT/IN'].map(unit => (
              <Pressable
                key={unit}
                style={[
                  styles.unitButton,
                  heightUnit === unit && styles.selectedUnit,
                ]}
                onPress={() => {
                  setHeightUnit(unit);
                  setErrors(previous => ({ ...previous, height: '' }));
                }}
              >
                <Text
                  style={[
                    styles.unitText,
                    heightUnit === unit && styles.selectedUnitText,
                  ]}
                >
                  {unit}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
        {!!errors.height && (
          <Text style={styles.errorText}>{errors.height}</Text>
        )}

        <Text style={styles.label}>{t('personalInfo.weight')}</Text>
        <View style={styles.measureRow}>
          <TextInput
            style={[
              styles.input,
              styles.measureInput,
              errors.weight ? styles.inputError : null,
            ]}
            value={weight}
            onChangeText={value => handleNumberChange(value, 'weight')}
            keyboardType="decimal-pad"
            placeholder="Enter weight"
            placeholderTextColor={colors.text8}
          />

          <View style={styles.unitGroup}>
            {['KG', 'LBS'].map(unit => (
              <Pressable
                key={unit}
                style={[
                  styles.unitButton,
                  weightUnit === unit && styles.selectedUnit,
                ]}
                onPress={() => {
                  setWeightUnit(unit);
                  setErrors(previous => ({ ...previous, weight: '' }));
                }}
              >
                <Text
                  style={[
                    styles.unitText,
                    weightUnit === unit && styles.selectedUnitText,
                  ]}
                >
                  {unit}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
        {!!errors.weight && (
          <Text style={styles.errorText}>{errors.weight}</Text>
        )}

        <Text style={styles.label}>{t('cycles.lactatingStatus')}</Text>
        <CustomDropdown
          title={t('cycles.lactatingTitle')}
          options={lactatingOptions.map(option => t(option))}
          selectedValue={lactating}
          onSelect={setLactating}
        />

        <Text style={styles.label}>{t('cycles.contraceptiveStatus')}</Text>
        <CustomDropdown
          title={t('cycles.contraceptiveTitle')}
          options={contraceptiveOptions.map(option => t(option))}
          selectedValue={contraceptive}
          onSelect={setContraceptive}
        />

        <Text style={styles.label}>{t('cycles.bleedTimeline')}</Text>
        <CustomDropdown
          title={t('cycles.bleedTitle')}
          options={bleedTimelineOptions.map(option => t(option))}
          selectedValue={bleedTimeline}
          onSelect={setBleedTimeline}
        />

        <Text style={styles.label}>{t('cycles.lastMenstruationDate')}</Text>
        <DateInput
          value={lastMenstruationDate}
          onChange={setLastMenstruationDate}
          placeholder={t('cycles.datePlaceholder')}
        />

        <Text style={styles.label}>{t('cycles.cycleLength')}</Text>
        <CustomDropdown
          title={t('cycles.cycleLength')}
          options={cycleLengthOptions}
          selectedValue={cycleLength}
          onSelect={setCycleLength}
        />

        <Text style={styles.label}>{t('community.state')}</Text>
        <CustomDropdown
          title={t('community.selectState')}
          options={states}
          selectedValue={state}
          onSelect={value => {
            setState(value);
            setCity('');
          }}
        />

        <Text style={styles.label}>{t('community.city')}</Text>
        <CustomDropdown
          title={t('community.selectCity')}
          options={cityOptions}
          selectedValue={city}
          onSelect={setCity}
        />

        <Text style={styles.label}>{t('community.localParishName')}</Text>
        <CustomDropdown
          title={t('community.selectParish')}
          options={parishNames}
          selectedValue={parish}
          onSelect={setParish}
        />

        <Text style={styles.label}>{t('community.pastorName')}</Text>
        <TextInput
          style={[styles.input, styles.disabledInput]}
          value={pastor}
          editable={false}
        />

        <Pressable
          style={styles.deleteButton}
          onPress={() => setIsDeleteModalVisible(true)}
        >
          <Image source={image.delete} />
          <Text style={styles.deleteButtonText}>
            {t('editProfile.deleteAccount')}
          </Text>
        </Pressable>
      </ScrollView>

      <BottomSheetModal
        visible={isPhotoModalVisible}
        onClose={() => setIsPhotoModalVisible(false)}
      >
        <Pressable style={styles.photoOption} onPress={handleTakePhoto}>
          <Image source={image.camera2} style={styles.optionIcon} />
          <Text style={styles.optionText}>
            {t('editProfile.photoOptions.takePhoto')}
          </Text>
        </Pressable>

        <Pressable style={styles.photoOption} onPress={handleChoosePhoto}>
          <Image source={image.gallery} style={styles.optionIcon} />
          <Text style={styles.optionText}>
            {t('editProfile.photoOptions.uploadFromGallery')}
          </Text>
        </Pressable>

        <Pressable style={styles.photoOption} onPress={handleRemovePhoto}>
          <Image source={image.remove} style={styles.optionIcon} />
          <Text style={styles.optionText}>
            {t('editProfile.photoOptions.removePhoto')}
          </Text>
        </Pressable>
      </BottomSheetModal>

      <BottomSheetModal
        visible={isDeleteModalVisible}
        onClose={() => setIsDeleteModalVisible(false)}
      >
        <View style={styles.deleteContent}>
          <Image style={styles.deleteIcon} source={image.deleteAccount} />

          <Text style={styles.deleteModalTitle}>
            {t('editProfile.deleteAccountModal.title')}
          </Text>

          <Text style={styles.deleteModalDescription}>
            {t('editProfile.deleteAccountModal.description')}
          </Text>

          <View style={styles.deleteModalButtons}>
            <Pressable
              style={styles.cancelDeleteButton}
              onPress={() => setIsDeleteModalVisible(false)}
            >
              <Text style={styles.cancelDeleteText}>
                {t('editProfile.deleteAccountModal.cancel')}
              </Text>
            </Pressable>

            <Pressable
              style={styles.confirmDeleteButton}
              onPress={() => {
                setIsDeleteModalVisible(false);
              }}
            >
              <Text style={styles.confirmDeleteText}>
                {t('editProfile.deleteAccountModal.confirm')}
              </Text>
            </Pressable>
          </View>
        </View>
      </BottomSheetModal>

      <View style={[styles.bottomButton, { paddingBottom: insets.bottom }]}>
        <PrimaryButton
          title={t('editProfile.saveDetails')}
          onPress={handleSave}
        />
      </View>
    </View>
  );
};

export default EditProfile;
