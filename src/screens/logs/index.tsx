import React, { useEffect, useState, useRef } from 'react';

import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  TextInput,
  Modal,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';

import { useTranslation } from 'react-i18next';

import {
  addMedication,
  updateMedication,
  deleteMedication,
} from '../../services/medication/medication';

import styles from './style';

import { image } from '../../assets';

import { getLogsSections, HormoneKey, hormonesData } from './logsData';

import {
  cleanHormoneValue,
  validateConsecutiveSpaces,
  validateHormoneValue,
} from '../../utils/validations';

import LogSection from '../../components/logSection';

import LogOption from '../../components/logOption';

import { Storage } from '../../services/storage/index';

import { StorageKeys } from '../../services/storage/keys';

import colors from '../../utils/color';

import { validateTemperature } from '../../utils/validations';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAppDispatch, useAppSelector } from '../../redux';

import { setLogsForDate } from '../../redux/slice/logsSlice';

import { getLogs, saveLogs } from '../../services/logs/logs';

import { normalize, SCREEN_WIDTH } from '../../utils/metrics';

import { LogsResponse } from '../../services/logs/@types/types';

const Logs = () => {
  const { t } = useTranslation();

  const sections = getLogsSections(t);

  const calendarRef = useRef<ScrollView>(null);

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const [savedHormones, setSavedHormones] = useState<Record<string, string>>(
    {},
  );

  type Medication = {
    id: string;

    name: string;

    dosage: string;

    dosageUnit: 'mg' | 'ml';

    time: string;
  };

  type HormoneValues = {
    lh: string;

    fsh: string;

    estrogen: string;

    progesterone: string;
  };

  type LogsDetails = {
    temperature: string;

    temperatureUnit: '°C' | '°F';

    savedHormones: Record<string, string>;

    hormones: HormoneValues;

    medications: Medication[];

    notes: string;
  };

  const createEmptyLogsDetails = (): LogsDetails => ({
    temperature: '',

    temperatureUnit: '°C',

    savedHormones: {},

    hormones: {
      lh: '',

      fsh: '',

      estrogen: '',

      progesterone: '',
    },

    medications: [],

    notes: '',
  });

  const [medications, setMedications] = useState<Medication[]>([]);

  const [selectedDate, setSelectedDate] = useState(new Date(today));

  const [selectedByDate, setSelectedByDate] = useState<
    Record<string, Record<string, string[]>>
  >({});

  const [detailsByDate, setDetailsByDate] = useState<
    Record<string, LogsDetails>
  >({});

  const [isDetailsLoaded, setIsDetailsLoaded] = useState(false);

  const [isLogsLoading, setIsLogsLoading] = useState(true);

  const [temperatureUnit, setTemperatureUnit] = useState<'°C' | '°F'>('°C');

  const [notes, setNotes] = useState('');

  const [editingHormone, setEditingHormone] = useState<HormoneKey | null>(null);

  const [hormones, setHormones] = useState({
    lh: '',

    fsh: '',

    estrogen: '',

    progesterone: '',
  });

  const dispatch = useAppDispatch();

  const userId = useAppSelector(state => state.auth.userId);

  const logsDetailsKey = `${StorageKeys.LOGS_DETAILS}_${userId}`;

  const logDate = [
    selectedDate.getFullYear(),

    String(selectedDate.getMonth() + 1).padStart(2, '0'),

    String(selectedDate.getDate()).padStart(2, '0'),
  ].join('-');

  const selected = selectedByDate[logDate] || {};

  const currentDetails = detailsByDate[logDate] ?? createEmptyLogsDetails();

  const updateDetailsForDate = (updates: Partial<LogsDetails>) => {
    setDetailsByDate(prev => ({
      ...prev,

      [logDate]: {
        ...(prev[logDate] ?? createEmptyLogsDetails()),

        ...updates,
      },
    }));
  };

  const handleSaveTemperature = async () => {
    if (!currentDetails.temperature.trim() || !userId) {
      return;
    }

    try {
      const response = await saveLogs({
        logType: 2,
        logDate,
        basalBodyTemperature: {
          category: 8,
          categoryNameKey: 'LOG.CATEGORY.BASAL_BODY_TEMPERATURE',
          unit: 1,
          value: Number(currentDetails.temperature),
        },
      });

      console.log('Temperature saved:', response);

      const latestLogs = await getLogs(logDate);

      dispatch(
        setLogsForDate({
          userId,
          date: logDate,
          data: latestLogs,
        }),
      );
    } catch (error: any) {
      console.log('Temperature save error:', error.response?.data || error);
    }
  };

  const handleSaveHormones = async () => {
    if (!userId) return false;

    const selectedHormones = hormonesData
      .filter(hormone => hormones[hormone.key].trim() !== '')
      .map(hormone => ({
        optionNameKey: `LOG.URINARY_HORMONES.${hormone.key.toUpperCase()}`,
        value: Number(hormones[hormone.key]),
        unit: hormone.unit,
      }));

    try {
      const response = await saveLogs({
        logType: 3,
        logDate,
        urinaryHormones: {
          category: 9,
          categoryNameKey: 'LOG.CATEGORY.URINARY_HORMONES',
          selectedOption: selectedHormones,
        },
      });

      console.log('Hormones saved:', response);

      // Fetch updated data from server
      const latestLogs = await getLogs(logDate);

      dispatch(
        setLogsForDate({
          userId,
          date: logDate,
          data: latestLogs,
        }),
      );

      return true;
    } catch (error: any) {
      console.log('SAVE HORMONES ERROR:', error.response?.data || error);
      return false;
    }
  };

  const logsCacheKey = `${userId}_${logDate}`;

  const logs = useAppSelector(state => state.logs.logsByDate[logsCacheKey]);

  const fetchedCategories = logs?.data?.logs ?? [];

  useEffect(() => {
    if (!userId || !isDetailsLoaded) return;

    let isMounted = true;

    const fetchLogs = async () => {
      setIsLogsLoading(true);

      try {
        console.log('GET LOGS REQUEST DATE:', logDate);

        const response = await getLogs(logDate);

        if (!isMounted) return;

        const categories = response?.data?.logs ?? [];

        const hormoneCategory = categories.find(item => item.category === 9);

        const medicationCategory = categories.find(
          item => item.category === 10,
        );

        // Map urinary hormones from API
        const hormoneValues = {
          lh: '',
          fsh: '',
          estrogen: '',
          progesterone: '',
        };

        const savedHormones: Record<string, string> = {};

        hormoneCategory?.options?.forEach((item: any) => {
          const key = item.optionNameKey?.split('.').pop()?.toLowerCase();

          if (key && key in hormoneValues) {
            hormoneValues[key as keyof typeof hormoneValues] =
              item.value != null ? String(item.value) : '';

            savedHormones[key] =
              item.value != null
                ? `${item.value} ${item.unit ?? ''}`.trim()
                : '';
          }
        });

        // Map medications from API
        const serverMedications: Medication[] = (
          medicationCategory?.medications ?? []
        ).map((item: any) => ({
          id: item._id,
          name: item.name,
          dosage: String(item.dosage),
          dosageUnit: item.unit === 1 ? 'mg' : 'ml',
          time:
            item.time === 1 ? t('logs.medications.morning') : String(item.time),
        }));

        // Update Redux
        dispatch(
          setLogsForDate({
            userId,
            date: logDate,
            data: response,
          }),
        );

        // Update UI state from server response
        setDetailsByDate(previous => ({
          ...previous,
          [logDate]: {
            ...(previous[logDate] ?? createEmptyLogsDetails()),
            hormones: hormoneValues,
            savedHormones,
            medications: serverMedications,
          },
        }));

        console.log('SERVER HORMONES:', hormoneValues);
        console.log('SERVER MEDICATIONS:', serverMedications);
      } catch (error: any) {
        console.log('GET LOGS ERROR:', error.response?.data || error);
      } finally {
        if (isMounted) {
          setIsLogsLoading(false);
        }
      }
    };

    fetchLogs();

    return () => {
      isMounted = false;
    };
  }, [logDate, dispatch, userId, isDetailsLoaded, t]);

  useEffect(() => {
    if (!userId) return;

    const savedDetails =
      Storage.get<Record<string, LogsDetails>>(logsDetailsKey);

    if (savedDetails && typeof savedDetails === 'object') {
      setDetailsByDate(savedDetails);
    } else {
      setDetailsByDate({});
    }

    setIsDetailsLoaded(true);
  }, [userId, logsDetailsKey]);

  useEffect(() => {
    if (!isDetailsLoaded || !userId) return;

    Storage.set(logsDetailsKey, detailsByDate);
  }, [detailsByDate, isDetailsLoaded, userId, logsDetailsKey]);

  const [medicationName, setMedicationName] = useState('');

  const [dosage, setDosage] = useState('');

  const [dosageUnit, setDosageUnit] = useState<'mg' | 'ml'>('ml');

  const [medicationTime, setMedicationTime] = useState('Morning');

  const [isEditingMedication, setIsEditingMedication] = useState(false);

  const [medicationModalVisible, setMedicationModalVisible] = useState(false);

  const [selectedMedicationId, setSelectedMedicationId] = useState<
    string | null
  >(null);

  const [medicationOptionsVisible, setMedicationOptionsVisible] =
    useState(false);

  const [deleteMedicationVisible, setDeleteMedicationVisible] = useState(false);

  const [loadingOptionKey, setLoadingOptionKey] = useState<string | null>(null);

  const resetMedicationForm = () => {
    setMedicationName('');

    setDosage('');

    setDosageUnit('ml');

    setMedicationTime(t('logs.medications.morning'));

    setSelectedMedicationId(null);
  };

  const openAddMedication = () => {
    resetMedicationForm();

    setIsEditingMedication(false);

    setMedicationModalVisible(true);
  };

  const openMedicationOptions = (medication: Medication) => {
    setSelectedMedicationId(medication.id);

    setMedicationOptionsVisible(true);
  };

  const editMedication = () => {
    const medication = currentDetails.medications.find(
      item => item.id === selectedMedicationId,
    );

    if (!medication) return;

    setMedicationName(medication.name);

    setDosage(medication.dosage);

    setDosageUnit(medication.dosageUnit);

    setMedicationTime(medication.time);

    setIsEditingMedication(true);

    setMedicationOptionsVisible(false);

    setMedicationModalVisible(true);

    console.log('MEDICATION BEING EDITED:', medication);
  };

  const openDeleteMedication = () => {
    setMedicationOptionsVisible(false);

    setDeleteMedicationVisible(true);
  };

  const saveMedication = async () => {
    if (!medicationName.trim() || !dosage.trim()) return;

    const payload = {
      name: medicationName.trim(),

      dosage,

      unit: dosageUnit === 'mg' ? 1 : 2,

      time: 1,

      logDate,
    };

    try {
      if (isEditingMedication && selectedMedicationId) {
        const isValidMongoId = /^[0-9a-fA-F]{24}$/.test(selectedMedicationId);

        if (!isValidMongoId) {
          console.log(
            'Cannot update medication: Invalid MongoDB ID',

            selectedMedicationId,
          );

          return;
        }

        const response = await updateMedication({
          medicationId: selectedMedicationId,

          ...payload,
        });

        if (!response || (response.status !== 200 && response.status !== 201)) {
          console.log('UPDATE MEDICATION FAILED:', response);

          return;
        }

        updateDetailsForDate({
          medications: currentDetails.medications.map(item =>
            item.id === selectedMedicationId
              ? {
                  ...item,

                  name: medicationName.trim(),

                  dosage,

                  dosageUnit,

                  time: medicationTime,
                }
              : item,
          ),
        });

        console.log('UPDATE MEDICATION RESPONSE:', response.data);
      } else {
        const response = await addMedication(payload);

        if (!response || response.status !== 201) {
          console.log('ADD MEDICATION FAILED:', response);

          return;
        }

        updateDetailsForDate({
          medications: [
            ...currentDetails.medications,

            {
              id: response.data._id,

              name: response.data.name,

              dosage: response.data.dosage,

              dosageUnit,

              time: medicationTime,
            },
          ],
        });

        console.log('ADD MEDICATION RESPONSE:', response.data);
      }

      setMedicationModalVisible(false);

      resetMedicationForm();
    } catch (error: any) {
      console.log('SAVE MEDICATION ERROR:', error.response?.data || error);
    }
  };

  const confirmDeleteMedication = async () => {
    if (!selectedMedicationId) return;

    try {
      const response = await deleteMedication(selectedMedicationId);

      if (!response || response.status !== 200) {
        console.log('DELETE MEDICATION FAILED:', response);

        return;
      }

      updateDetailsForDate({
        medications: currentDetails.medications.filter(
          item => item.id !== selectedMedicationId,
        ),
      });

      setDeleteMedicationVisible(false);

      setSelectedMedicationId(null);
    } catch (error: any) {
      console.log('DELETE MEDICATION ERROR:', error.response?.data || error);
    }
  };

  const categoryConfig: Record<
    string,
    { category: number; categoryNameKey: string }
  > = {
    bleeding: {
      category: 1,
      categoryNameKey: 'LOG.CATEGORY.BLEEDING',
    },
    sensation: {
      category: 2,
      categoryNameKey: 'LOG.CATEGORY.VULVAL_SENSATION',
    },
    cervicalColor: {
      category: 3,
      categoryNameKey: 'LOG.CATEGORY.CERVICAL_FLUID_COLOR',
    },
    cervicalObservation: {
      category: 4,
      categoryNameKey: 'LOG.CATEGORY.CERVICAL_VISUAL_OBSERVATION',
    },
    mood: {
      category: 5,
      categoryNameKey: 'LOG.CATEGORY.MOOD',
    },
    symptoms: {
      category: 6,
      categoryNameKey: 'LOG.CATEGORY.SYMPTOMS',
    },
    sleep: {
      category: 7,
      categoryNameKey: 'LOG.CATEGORY.SLEEP_DISTURBANCES',
    },
  };

  const selectOption = async (sectionKey: string, optionTitle: string) => {
    if (!userId) return;

    const config = categoryConfig[sectionKey];
    if (!config) return;

    const categoryData = fetchedCategories.find(
      item => item.category === config.category,
    );

    const selectedOption = categoryData?.options?.find(
      item =>
        item.optionName === optionTitle ||
        t(item.optionNameKey) === optionTitle,
    );

    if (!selectedOption) {
      console.log('Option not found in API:', optionTitle);
      return;
    }

    const isSymptoms = sectionKey === 'symptoms';
    const isNone =
      selectedOption.optionNameKey.toUpperCase().endsWith('.NONE') ||
      optionTitle.trim().toLowerCase() === 'none';

    const currentSelections =
      selected[sectionKey] ??
      categoryData?.options
        ?.filter(item => item.isSelected)
        .map(item => item.optionName) ??
      [];

    const isAlreadySelected = currentSelections.includes(optionTitle);

    let updatedSelections: string[];

    if (!isSymptoms) {
      updatedSelections = isAlreadySelected ? [] : [optionTitle];
    } else if (isNone) {
      updatedSelections = isAlreadySelected ? [] : [optionTitle];
    } else {
      const withoutNone = currentSelections.filter(
        item => item.trim().toLowerCase() !== 'none',
      );

      updatedSelections = isAlreadySelected
        ? withoutNone.filter(item => item !== optionTitle)
        : [...withoutNone, optionTitle];
    }

    setLoadingOptionKey(`${sectionKey}-${optionTitle}`);

    try {
      const previouslySelected =
        categoryData?.options?.filter(item => item.isSelected) ?? [];

      for (const previousOption of previouslySelected) {
        const previousTitle = previousOption.optionName;

        if (!updatedSelections.includes(previousTitle)) {
          await saveLogs({
            logType: 1,
            logDate,
            logEntry: {
              category: config.category,
              categoryNameKey: config.categoryNameKey,
              selectedOption: {
                optionNameKey: previousOption.optionNameKey,
                isSelected: false,
              },
            },
          });
        }
      }

      if (updatedSelections.includes(optionTitle)) {
        await saveLogs({
          logType: 1,
          logDate,
          logEntry: {
            category: config.category,
            categoryNameKey: config.categoryNameKey,
            selectedOption: {
              optionNameKey: selectedOption.optionNameKey,
              isSelected: true,
            },
          },
        });
      }

      setSelectedByDate(previous => ({
        ...previous,
        [logDate]: {
          ...(previous[logDate] || {}),
          [sectionKey]: updatedSelections,
        },
      }));

      const response = await getLogs(logDate);

      dispatch(
        setLogsForDate({
          userId,
          date: logDate,
          data: response,
        }),
      );
    } catch (error: any) {
      console.log('SAVE LOG ERROR:', error.response?.data || error);
    } finally {
      setLoadingOptionKey(null);
    }
  };

  const formattedDate = selectedDate.toLocaleDateString('en-US', {
    month: 'long',

    day: 'numeric',

    year: 'numeric',
  });

  const days = Array.from({ length: 15 }, (_, index) => {
    const date = new Date(today);

    date.setDate(today.getDate() + index - 7);

    const isToday = date.getTime() === today.getTime();

    const isFuture = date.getTime() > today.getTime();

    return {
      key: index,

      label: date.toLocaleDateString('en-US', {
        weekday: 'short',
      }),

      date,

      isToday,

      isFuture,
    };
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      const itemWidth = normalize(44);

      const itemGap = normalize(8);

      const screenCenter = SCREEN_WIDTH / 3;

      const selectedIndex = days.findIndex(
        day => day.date.getTime() === selectedDate.getTime(),
      );

      const offset =
        selectedIndex * (itemWidth + itemGap) - screenCenter + itemWidth / 3;

      calendarRef.current?.scrollTo({
        x: Math.max(0, offset),

        animated: false,
      });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleNotesChange = (value: string) => {
    if (validateConsecutiveSpaces(value)) {
      updateDetailsForDate({ notes: value });
    }
  };

  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <Image source={image.homeBG} style={styles.headerBackground} />

        <View style={styles.headerTop}>
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>{t('logs.title')}</Text>

            <Text style={styles.headerSubtitle}>
              {selectedDate.getTime() === today.getTime()
                ? `${t('logs.today')}, ${formattedDate}`
                : formattedDate}
            </Text>
          </View>

          <View style={styles.headerIcons}>
            <Pressable>
              <Image source={image.notification} style={styles.iconImage} />
            </Pressable>

            <Pressable>
              <Image source={image.calendar} style={styles.iconImage} />
            </Pressable>
          </View>
        </View>
      </View>

      <View style={styles.calendar}>
        <ScrollView
          ref={calendarRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.weekRow}
        >
          {days.map(day => {
            const isSelected = selectedDate.getTime() === day.date.getTime();

            return (
              <Pressable
                key={day.key}
                disabled={day.isFuture}
                onPress={() => {
                  setSelectedDate(new Date(day.date));

                  const itemWidth = normalize(44);

                  const itemGap = normalize(8);

                  const screenCenter = SCREEN_WIDTH / 3;

                  const offset =
                    day.key * (itemWidth + itemGap) -
                    screenCenter +
                    itemWidth / 3;

                  calendarRef.current?.scrollTo({
                    x: Math.max(0, offset),

                    animated: true,
                  });
                }}
                style={[styles.dateItem, isSelected && styles.selectedDate]}
              >
                <Text
                  style={[styles.dayText, day.isFuture && { opacity: 0.4 }]}
                >
                  {day.label}
                </Text>

                <Text
                  style={[
                    styles.dateText,

                    isSelected && styles.selectedDateText,

                    day.isFuture && { opacity: 0.4 },
                  ]}
                >
                  {day.date.getDate()}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent]}
        showsVerticalScrollIndicator={false}
      >
        {isLogsLoading ? (
          <View>
            <ActivityIndicator size="small" color={colors.primary} />
          </View>
        ) : (
          <>
            {sections.map(section => {
              const config = categoryConfig[section.key];

              const apiCategory = fetchedCategories.find(
                item => item.category === config?.category,
              );

              const apiOptions = (apiCategory?.options || []).filter(
                option => option.status === 1,
              );

              return (
                <LogSection
                  key={section.key}
                  title={section.title}
                  backgroundColor={section.bg}
                  titleColor={section.titleColor}
                >
                  {apiOptions.map(option => {
                    const optionTitle = option.optionName;

                    return (
                      <LogOption
                        key={option.optionNameKey}
                        title={optionTitle}
                        source={
                          section.options.find(
                            item =>
                              item.title === option.optionName ||
                              item.title === optionTitle,
                          )?.source
                        }
                        selected={
                          selected[section.key]?.includes(optionTitle) ??
                          Boolean(option.isSelected)
                        }
                        selectedCard={section.selectedCard}
                        isLoading={
                          loadingOptionKey === `${section.key}-${optionTitle}`
                        }
                        onPress={() => selectOption(section.key, optionTitle)}
                      />
                    );
                  })}
                </LogSection>
              );
            })}

            <View style={styles.temperatureSection}>
              <Text style={styles.simpleHeading}>
                {t('logs.temperature.title')} ⓘ
              </Text>

              <View style={styles.temperatureRow}>
                <View style={styles.temperatureInputContainer}>
                  <Image
                    style={styles.thermometerIcon}
                    source={image.thermometer}
                  />

                  <TextInput
                    style={styles.temperatureInput}
                    placeholder={t('logs.temperature.placeholder')}
                    placeholderTextColor={colors.textFourth}
                    keyboardType="decimal-pad"
                    value={currentDetails.temperature}
                    onChangeText={value =>
                      updateDetailsForDate({
                        temperature: validateTemperature(value),
                      })
                    }
                    onEndEditing={handleSaveTemperature}
                  />
                </View>

                <View style={styles.temperatureToggle}>
                  {(['°C', '°F'] as const).map(unit => (
                    <Pressable
                      key={unit}
                      onPress={() =>
                        updateDetailsForDate({ temperatureUnit: unit })
                      }
                      style={[
                        styles.unitButton,

                        currentDetails.temperatureUnit === unit &&
                          styles.activeUnitButton,
                      ]}
                    >
                      <Text
                        style={[
                          styles.unitText,

                          currentDetails.temperatureUnit === unit &&
                            styles.activeUnitText,
                        ]}
                      >
                        {unit}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            </View>

            <View style={styles.hormoneSection}>
              <Text style={styles.simpleHeading}>
                {t('logs.sections.urinaryHormones')}
              </Text>

              <View style={styles.hormoneCard}>
                {hormonesData.map(hormone => (
                  <View key={hormone.key} style={styles.hormoneRow}>
                    <Text style={styles.hormoneText}>
                      {t(hormone.labelKey)}
                    </Text>

                    <View style={styles.pencilRow}>
                      <Text style={styles.hormoneValue}>
                        {currentDetails.savedHormones[hormone.key] || '----'}
                      </Text>

                      <Pressable
                        onPress={() => {
                          setHormones(currentDetails.hormones);

                          setEditingHormone(hormone.key);
                        }}
                      >
                        <Image
                          source={image.editPencil}
                          style={styles.hormoneEdit}
                        />
                      </Pressable>
                    </View>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.medicationSection}>
              <Text style={styles.simpleHeading}>
                {t('logs.medications.title')}
              </Text>

              {currentDetails.medications.length === 0 ? (
                <View style={styles.emptyMedicationCard}>
                  <Image
                    source={image.medicines}
                    style={styles.emptyMedicationImage}
                  />

                  <Text style={styles.emptyMedicationText}>
                    {t('logs.medications.emptyTitle')}
                  </Text>

                  <Pressable
                    style={styles.startAddingButton}
                    onPress={openAddMedication}
                  >
                    <Text style={styles.startAddingText}>
                      {t('logs.medications.startAdding')}
                    </Text>
                  </Pressable>
                </View>
              ) : (
                <>
                  {currentDetails.medications.map(medication => (
                    <View key={medication.id} style={styles.medicationCard}>
                      <Image
                        source={image.medicines}
                        style={styles.medicationCardIcon}
                      />

                      <View style={styles.medicationCardContent}>
                        <Text style={styles.medicationCardName}>
                          {medication.name}
                        </Text>

                        <Text style={styles.medicationCardDetails}>
                          {medication.dosage}

                          {medication.dosageUnit}

                          <Text style={styles.medicationDot}> • </Text>

                          {medication.time}
                        </Text>
                      </View>

                      <Pressable
                        onPress={() => openMedicationOptions(medication)}
                      >
                        <Text style={styles.medicationMore}>⋮</Text>
                      </Pressable>
                    </View>
                  ))}

                  <Pressable
                    style={styles.addMedicationCard}
                    onPress={openAddMedication}
                  >
                    <Image
                      source={image.addMedication}
                      style={styles.addMedicationPlus}
                    />

                    <Text style={styles.addMedicationText}>
                      {t('logs.medications.addMedication')}
                    </Text>
                  </Pressable>
                </>
              )}
            </View>

            <View style={styles.notesSection}>
              <Text style={styles.notesLabel}>{t('logs.notes.title')}</Text>

              <TextInput
                placeholder={t('logs.notes.placeholder')}
                style={styles.notesInput}
                placeholderTextColor={colors.textFourth}
                value={currentDetails.notes}
                onChangeText={handleNotesChange}
                maxLength={100}
                multiline
              />

              <Text style={styles.limitIndicator}>
                {t('logs.notes.limitNumber')}
              </Text>
            </View>
          </>
        )}
      </ScrollView>

      <Modal
        visible={editingHormone !== null}
        transparent
        animationType="slide"
        onRequestClose={() => {
          Keyboard.dismiss();

          setEditingHormone(null);
        }}
      >
        <View
          style={styles.modalOverlay}
          onStartShouldSetResponder={() => true}
          onResponderRelease={() => {
            Keyboard.dismiss();

            setEditingHormone(null);
          }}
        >
          <View
            style={styles.hormoneModal}
            onStartShouldSetResponder={() => true}
            onResponderRelease={event => event.stopPropagation()}
          >
            <View style={styles.modalHandle} />

            <View style={styles.titleRow}>
              <Text style={styles.titleOne}>{t('logs.sections.urinary')}</Text>

              <Text style={styles.titleTwo}>
                {t('logs.medications.medication')}
              </Text>
            </View>

            {editingHormone !== null && (
              <>
                <KeyboardAvoidingView
                  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                  keyboardVerticalOffset={0}
                >
                  <ScrollView
                    style={styles.hormoneScroll}
                    contentContainerStyle={styles.hormoneScrollContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    keyboardDismissMode="on-drag"
                    automaticallyAdjustKeyboardInsets={Platform.OS === 'ios'}
                  >
                    {hormonesData.map(hormone => (
                      <View key={hormone.key} style={styles.modalField}>
                        <Text style={styles.modalLabel}>
                          {t(hormone.labelKey)}
                        </Text>

                        <View style={styles.modalInputContainer}>
                          <TextInput
                            style={styles.modalInput}
                            value={hormones[hormone.key]}
                            onChangeText={value =>
                              setHormones(previous => ({
                                ...previous,

                                [hormone.key]: cleanHormoneValue(value),
                              }))
                            }
                            keyboardType="decimal-pad"
                            placeholder="Enter value"
                            placeholderTextColor={colors.textFourth}
                            maxLength={6}
                          />

                          <Text style={styles.modalUnit}>{hormone.unit}</Text>
                        </View>
                      </View>
                    ))}
                  </ScrollView>
                </KeyboardAvoidingView>

                <Pressable
                  style={styles.modalSaveButton}
                  onPress={async () => {
                    const isValid = hormonesData.every(hormone => {
                      const value = hormones[hormone.key];

                      return value === '' || validateHormoneValue(value);
                    });

                    if (!isValid) return;

                    const isSaved = await handleSaveHormones();

                    if (!isSaved) return;

                    updateDetailsForDate({
                      hormones: { ...hormones },

                      savedHormones: {
                        ...currentDetails.savedHormones,

                        ...Object.fromEntries(
                          hormonesData.map(hormone => [
                            hormone.key,

                            hormones[hormone.key]
                              ? `${hormones[hormone.key]} ${hormone.unit}`
                              : '',
                          ]),
                        ),
                      },
                    });

                    Keyboard.dismiss();

                    setEditingHormone(null);
                  }}
                >
                  <Text style={styles.modalSaveText}>
                    {t('community.save')}
                  </Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>

      <Modal
        visible={medicationOptionsVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setMedicationOptionsVisible(false)}
      >
        <View
          style={styles.modalOverlay}
          onStartShouldSetResponder={() => true}
          onResponderRelease={() => setMedicationOptionsVisible(false)}
        >
          <Pressable onPress={() => setMedicationOptionsVisible(false)} />

          <View
            style={styles.medicationOptionsModal}
            onStartShouldSetResponder={() => true}
            onResponderRelease={event => event.stopPropagation()}
          >
            <View style={styles.modalHandle} />

            <Pressable style={styles.medicationOption} onPress={editMedication}>
              <Image
                source={image.editMedication}
                style={styles.medicationOptionIcon}
              />

              <Text style={styles.medicationOptionText}>
                {t('logs.medications.edit')} {t('logs.medications.medication')}
              </Text>
            </Pressable>

            <Pressable
              style={styles.medicationOption}
              onPress={openDeleteMedication}
            >
              <Image
                source={image.deleteMedication}
                style={styles.medicationOptionIcon}
              />

              <Text style={styles.medicationOptionText}>
                {t('logs.medications.deleteMedication')}
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        visible={deleteMedicationVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setDeleteMedicationVisible(false)}
      >
        <View
          style={styles.modalOverlay}
          onStartShouldSetResponder={() => true}
          onResponderRelease={() => setDeleteMedicationVisible(false)}
        >
          <Pressable onPress={() => setDeleteMedicationVisible(false)} />

          <View
            style={styles.deleteMedicationModal}
            onStartShouldSetResponder={() => true}
            onResponderRelease={event => event.stopPropagation()}
          >
            <View style={styles.modalHandle} />

            <Image
              source={image.deleteAccount}
              style={styles.deleteMedicationIcon}
            />

            <Text style={styles.deleteMedicationTitle}>
              Are you sure you want to delete this medication?
            </Text>

            <View style={styles.deleteMedicationButtons}>
              <Pressable
                style={styles.deleteMedicationCancel}
                onPress={() => setDeleteMedicationVisible(false)}
              >
                <Text style={styles.deleteMedicationCancelText}>
                  {t('reminders.cancel')}
                </Text>
              </Pressable>

              <Pressable
                style={styles.deleteMedicationConfirm}
                onPress={confirmDeleteMedication}
              >
                <Text style={styles.deleteMedicationConfirmText}>
                  {t('reminders.yesDelete')}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={medicationModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => {
          Keyboard.dismiss();

          setMedicationModalVisible(false);
        }}
      >
        <View
          style={styles.modalOverlay}
          onStartShouldSetResponder={() => true}
          onResponderRelease={() => {
            Keyboard.dismiss();

            setMedicationModalVisible(false);
          }}
        >
          <View
            style={styles.medicationModal}
            onStartShouldSetResponder={() => true}
            onResponderRelease={event => event.stopPropagation()}
          >
            <View style={styles.modalHandle} />

            <View style={styles.titleRow}>
              <Text style={styles.titleOne}>
                {isEditingMedication
                  ? t('logs.medications.edit')
                  : t('logs.medications.add')}
              </Text>

              <Text style={styles.titleTwo}>
                {t('logs.medications.medication')}
              </Text>
            </View>

            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              keyboardVerticalOffset={0}
            >
              <ScrollView
                style={styles.hormoneScroll}
                contentContainerStyle={styles.hormoneScrollContent}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="on-drag"
                automaticallyAdjustKeyboardInsets={Platform.OS === 'ios'}
              >
                {/* Medication Name */}

                <View style={styles.medicationField}>
                  <Text>{t('logs.medications.name')}</Text>

                  <TextInput
                    style={styles.medicationInput}
                    placeholder="Enter medication name"
                    placeholderTextColor={colors.textFourth}
                    value={medicationName}
                    onChangeText={setMedicationName}
                    returnKeyType="next"
                  />
                </View>

                {/* Dosage */}

                <View style={styles.medicationField}>
                  <Text>{t('logs.medications.dosage')}</Text>

                  <View style={styles.dosageRow}>
                    <TextInput
                      style={styles.dosageInput}
                      placeholder="Enter dosage"
                      placeholderTextColor={colors.textFourth}
                      keyboardType="decimal-pad"
                      value={dosage}
                      onChangeText={value =>
                        setDosage(
                          value

                            .replace(/[^0-9.]/g, '')

                            .replace(/(\..*)\./g, '$1'),
                        )
                      }
                      maxLength={5}
                    />

                    <View style={styles.unitContainer}>
                      {(['mg', 'ml'] as const).map(unit => (
                        <Pressable
                          key={unit}
                          onPress={() => setDosageUnit(unit)}
                          style={[
                            styles.unitButton,

                            dosageUnit === unit && styles.activeUnitButton,
                          ]}
                        >
                          <Text
                            style={[
                              styles.unitTexts,

                              dosageUnit === unit && styles.activeUnitText,
                            ]}
                          >
                            {unit}
                          </Text>
                        </Pressable>
                      ))}
                    </View>
                  </View>
                </View>

                {/* Medication Time */}

                <View style={styles.medicationField}>
                  <Text>{t('logs.medications.time')}</Text>

                  <View style={styles.timeContainer}>
                    {[
                      t('logs.medications.morning'),

                      t('logs.medications.night'),

                      t('logs.medications.afternoon'),

                      t('logs.medications.evening'),
                    ].map(time => (
                      <Pressable
                        key={time}
                        onPress={() => setMedicationTime(time)}
                        style={[
                          styles.timeButton,

                          medicationTime === time && styles.activeTimeButton,
                        ]}
                      >
                        <Text
                          style={[
                            styles.timeText,

                            medicationTime === time && styles.activeTimeText,
                          ]}
                        >
                          {time}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>

            <Pressable
              style={styles.medicationSaveButton}
              onPress={() => {
                Keyboard.dismiss();

                saveMedication();
              }}
            >
              <Text style={styles.medicationSaveText}>
                {t('community.save')}
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Logs;
