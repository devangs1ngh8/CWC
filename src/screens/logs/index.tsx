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

  const [isStorageLoaded, setIsStorageLoaded] = useState(false);

  const [detailsByDate, setDetailsByDate] = useState<
    Record<string, LogsDetails>
  >({});

  const [isDetailsLoaded, setIsDetailsLoaded] = useState(false);

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

  const logsSelectionsKey = `${StorageKeys.LOGS_SELECTIONS}_${userId}`;
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
    if (!currentDetails.temperature.trim()) {
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
    } catch (error) {
      console.log('Temperature save error:', error);
    }
  };

  const handleSaveHormones = async () => {
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
    } catch (error: any) {
      console.log('SAVE HORMONES ERROR:', error.response?.data || error);
    }
  };

  const logsCacheKey = `${userId}_${logDate}`;

  const logs = useAppSelector(state => state.logs.logsByDate[logsCacheKey]);

  const fetchedCategories = logs?.data?.logs ?? [];

  useEffect(() => {
    if (!userId) return;

    const savedSelections =
      Storage.get<Record<string, Record<string, string | string[]>>>(
        logsSelectionsKey,
      );

    if (savedSelections && typeof savedSelections === 'object') {
      const normalizedSelections: Record<string, Record<string, string[]>> = {};

      Object.entries(savedSelections).forEach(([date, sections]) => {
        normalizedSelections[date] = {};

        Object.entries(sections).forEach(([sectionKey, value]) => {
          normalizedSelections[date][sectionKey] = Array.isArray(value)
            ? value
            : value
            ? [value]
            : [];
        });
      });

      setSelectedByDate(normalizedSelections);
    } else {
      setSelectedByDate({});
    }

    setIsStorageLoaded(true);
  }, [userId, logsSelectionsKey]);

  useEffect(() => {
    if (!isStorageLoaded || !userId) return;

    Storage.set(logsSelectionsKey, selectedByDate);
  }, [selectedByDate, isStorageLoaded, userId, logsSelectionsKey]);

  useEffect(() => {
    if (!isStorageLoaded || !userId) return;

    const fetchLogs = async () => {
      try {
        const response = await getLogs(logDate);

        dispatch(
          setLogsForDate({
            userId,
            date: logDate,
            data: response,
          }),
        );
      } catch (error: any) {
        console.log('STATUS:', error.response?.status);

        console.log('ERROR DATA:', error.response?.data);

        console.log('REQUEST URL:', error.config?.url);
      }
    };

    fetchLogs();
  }, [logDate, dispatch, isStorageLoaded, userId]);

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

  const selectOption = async (sectionKey: string, optionTitle: string) => {
    const optionKey = `${sectionKey}-${optionTitle}`;

    setLoadingOptionKey(optionKey);

    const dripTitle = t('logs.vulvalSensation.drip');

    const bubbleTitle = t('logs.vulvalSensation.bubble');

    const noneTitle = t('logs.symptoms.blockGreen');

    setSelectedByDate(prev => {
      const currentSelections = prev[logDate]?.[sectionKey] || [];

      let updatedSelections: string[] = [];

      if (sectionKey === 'sensation') {
        const isSpecialOption =
          optionTitle === dripTitle || optionTitle === bubbleTitle;

        const specialOption = currentSelections.find(
          item => item === dripTitle || item === bubbleTitle,
        );

        if (isSpecialOption) {
          if (currentSelections.includes(optionTitle)) {
            updatedSelections = currentSelections.filter(
              item => item !== optionTitle,
            );
          } else {
            const extraOption = currentSelections.find(
              item => item !== dripTitle && item !== bubbleTitle,
            );

            updatedSelections = [
              optionTitle,
              ...(extraOption ? [extraOption] : []),
            ];
          }
        } else {
          if (specialOption) {
            updatedSelections = currentSelections.includes(optionTitle)
              ? currentSelections.filter(item => item !== optionTitle)
              : [specialOption, optionTitle];
          } else {
            updatedSelections = currentSelections.includes(optionTitle)
              ? []
              : [optionTitle];
          }
        }
      } else if (sectionKey === 'symptoms') {
        if (optionTitle === noneTitle) {
          updatedSelections = currentSelections.includes(noneTitle)
            ? []
            : [noneTitle];
        } else {
          updatedSelections = currentSelections.filter(
            item => item !== noneTitle,
          );

          updatedSelections = updatedSelections.includes(optionTitle)
            ? updatedSelections.filter(item => item !== optionTitle)
            : [...updatedSelections, optionTitle];
        }
      } else {
        updatedSelections = currentSelections.includes(optionTitle)
          ? []
          : [optionTitle];
      }

      return {
        ...prev,

        [logDate]: {
          ...(prev[logDate] || {}),

          [sectionKey]: updatedSelections,
        },
      };
    });

    try {
      const response = await getLogs(logDate);

      dispatch(
        setLogsForDate({
          userId,
          date: logDate,
          data: response,
        }),
      );
    } catch (error: any) {
      console.log('Error fetching logs:', error.response?.data || error);
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
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {sections.map(section => (
          <LogSection
            key={section.key}
            title={section.title}
            backgroundColor={section.bg}
            titleColor={section.titleColor}
          >
            {section.options.map(option => (
              <LogOption
                key={option.title}
                title={option.title}
                source={option.source}
                selected={
                  selected[section.key]?.includes(option.title) || false
                }
                selectedCard={section.selectedCard}
                isLoading={
                  loadingOptionKey === `${section.key}-${option.title}`
                }
                onPress={() => selectOption(section.key, option.title)}
              />
            ))}
          </LogSection>
        ))}

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
                <Text style={styles.hormoneText}>{t(hormone.labelKey)}</Text>

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

                  <Pressable onPress={() => openMedicationOptions(medication)}>
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

                    await handleSaveHormones();

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

            {/* Save Button */}

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
