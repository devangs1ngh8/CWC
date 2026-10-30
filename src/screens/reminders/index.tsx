import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  Image,
  TextInput,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

import { ScreenHeader, BottomSheetModal, DateInput } from '../../components';

import ReminderCard from '../../components/reminderCard';

import { image } from '../../assets';
import styles from './style';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const Reminders = () => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const [reminders, setReminders] = useState<any[]>([
    {
      id: '1',
      title: 'reminders.defaultTitle',
      date: new Date(),
      time: new Date(2000, 0, 1, 7, 30),
      frequency: 'daily',
      weekdays: [],
      enabled: true,
      isDefault: true,
    },
  ]);

  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved reminders when the screen opens.
  useEffect(() => {
    const loadReminders = async () => {
      try {
        const savedReminders = await AsyncStorage.getItem('savedReminders');

        if (savedReminders) {
          const parsedReminders = JSON.parse(savedReminders);

          const loadedReminders = parsedReminders.map((item: any) => ({
            ...item,
            date: new Date(item.date),
            time: new Date(item.time),
            enabled: item.isDefault ? true : item.enabled,
          }));

          const hasDefaultReminder = loadedReminders.some(
            (item: any) => item.isDefault,
          );

          if (!hasDefaultReminder) {
            loadedReminders.unshift({
              id: '1',
              title: 'reminders.defaultTitle',
              date: new Date(),
              time: new Date(2000, 0, 1, 7, 30),
              frequency: 'daily',
              weekdays: [],
              enabled: true,
              isDefault: true,
            });
          }

          setReminders(loadedReminders);
        }
      } catch (error) {
        console.log('Error loading reminders:', error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadReminders();
  }, []);

  // Save reminders whenever the list changes.
  useEffect(() => {
    if (isLoaded) {
      AsyncStorage.setItem('savedReminders', JSON.stringify(reminders)).catch(
        error => console.log('Error saving reminders:', error),
      );
    }
  }, [reminders, isLoaded]);

  const [modal, setModal] = useState('');
  const [selectedReminder, setSelectedReminder] = useState<any>(null);

  const [title, setTitle] = useState('');
  const [date, setDate] = useState<Date | null>(new Date());
  const [time, setTime] = useState(new Date(2000, 0, 1, 7, 30));
  const [frequency, setFrequency] = useState('once');
  const [weekdays, setWeekdays] = useState<number[]>([]);

  const [showTimePicker, setShowTimePicker] = useState(false);

  const formatTime = (value: Date) =>
    value.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

  const formatDate = (value: Date) =>
    value.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

  const openAddModal = () => {
    setTitle('');
    setDate(new Date());
    setTime(new Date(2000, 0, 1, 7, 30));
    setFrequency('once');
    setWeekdays([]);
    setSelectedReminder(null);
    setShowTimePicker(false);
    setModal('add');
  };

  const openEditModal = (item: any) => {
    setSelectedReminder(item);
    setTitle(item.title);
    setDate(item.date);
    setTime(item.time);
    setFrequency(item.frequency);
    setWeekdays(item.weekdays);
    setShowTimePicker(false);
    setModal('edit');
  };

  const closeModal = () => {
    Keyboard.dismiss();
    setShowTimePicker(false);
    setModal('');
  };

  const addReminder = () => {
    if (!title.trim() || !date) return;
    if (frequency === 'weekly' && weekdays.length === 0) return;

    setReminders(previous => [
      ...previous,
      {
        id: Date.now().toString(),
        title: title.trim(),
        date,
        time,
        frequency,
        weekdays,
        enabled: true,
        isDefault: false,
      },
    ]);

    closeModal();
  };

  const saveReminder = () => {
    setReminders(previous =>
      previous.map(item =>
        item.id === selectedReminder?.id ? { ...item, time } : item,
      ),
    );

    closeModal();
  };

  const deleteReminder = () => {
    if (!selectedReminder || selectedReminder.isDefault) return;

    setReminders(previous =>
      previous.filter(item => item.id !== selectedReminder.id),
    );

    closeModal();
  };

  const toggleReminder = (id: string) => {
    setReminders(previous =>
      previous.map(item =>
        item.id === id ? { ...item, enabled: !item.enabled } : item,
      ),
    );
  };

  const selectDay = (day: number) => {
    if (weekdays.includes(day)) {
      setWeekdays(weekdays.filter(item => item !== day));
    } else {
      setWeekdays([...weekdays, day]);
    }
  };

  const isEdit = modal === 'edit';

  return (
    <View style={styles.container}>
      <ScreenHeader
        title={t('reminders.screenTitle')}
        backgroundImage={image.homeBG}
        style={styles.header}
      />

      <View style={styles.body}>
        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        >
          {reminders.map(item => (
            <ReminderCard
              key={item.id}
              title={item.isDefault ? t(item.title) : item.title}
              time={formatTime(item.time)}
              frequency={item.frequency}
              enabled={item.isDefault ? true : item.enabled}
              isDefault={item.isDefault}
              weekdays={item.weekdays}
              onEdit={() => openEditModal(item)}
              onDelete={() => {
                setSelectedReminder(item);
                setModal('delete');
              }}
              onToggle={() => {
                if (!item.isDefault) {
                  toggleReminder(item.id);
                }
              }}
            />
          ))}
        </ScrollView>
      </View>

      <Pressable
        style={[styles.addButton, { paddingBottom: insets.bottom }]}
        onPress={openAddModal}
      >
        <Image source={image.addButton} style={styles.addButtonImage} />
      </Pressable>

      <BottomSheetModal
        visible={modal === 'add' || modal === 'edit'}
        onClose={closeModal}
      >
        <KeyboardAvoidingView behavior="padding">
          <Text style={styles.sheetTitle}>
            {isEdit ? t('reminders.edit') : t('reminders.add')}{' '}
            <Text style={styles.purpleText}>{t('reminders.reminder')}</Text>
          </Text>

          <ScrollView
            contentContainerStyle={styles.sheetContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.label}>{t('reminders.title')}</Text>

            <TextInput
              style={[styles.input, isEdit && styles.disabledInput]}
              value={title}
              onChangeText={setTitle}
              editable={!isEdit}
              placeholder={t('reminders.enterTitle')}
              placeholderTextColor="#AEB4B9"
            />

            <Text style={styles.label}>{t('reminders.startDate')}</Text>

            {isEdit ? (
              <View style={[styles.input, styles.disabledInput]}>
                <Text style={styles.inputText}>
                  {date ? formatDate(date) : ''}
                </Text>
              </View>
            ) : (
              <DateInput
                value={date}
                onChange={setDate}
                placeholder={t('reminders.selectDate')}
              />
            )}

            <Text style={styles.label}>{t('reminders.time')}</Text>

            <Pressable
              style={styles.input}
              onPress={() => {
                Keyboard.dismiss();
                setShowTimePicker(true);
              }}
            >
              <Text style={styles.inputText}>{formatTime(time)}</Text>

              <Text style={styles.clockIcon}>◷</Text>
            </Pressable>

            {showTimePicker && (
              <DateTimePicker
                value={time}
                mode="time"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={(_, selectedTime) => {
                  if (Platform.OS === 'android') {
                    setShowTimePicker(false);
                  }

                  if (selectedTime) {
                    setTime(selectedTime);
                  }
                }}
                themeVariant="light"
              />
            )}

            {showTimePicker && Platform.OS === 'ios' && (
              <Pressable
                onPress={() => setShowTimePicker(false)}
                style={styles.doneButton}
              >
                <Text style={styles.doneText}>{t('reminders.done')}</Text>
              </Pressable>
            )}

            <Text style={styles.label}>{t('reminders.frequency')}</Text>

            <View style={styles.frequencyRow}>
              {['once', 'daily', 'weekly'].map(item => (
                <Pressable
                  key={item}
                  disabled={isEdit}
                  onPress={() => {
                    setFrequency(item);
                    setWeekdays([]);
                  }}
                  style={[
                    styles.frequencyButton,
                    frequency === item && styles.selectedFrequency,
                    isEdit && styles.disabledInput,
                  ]}
                >
                  <Text
                    style={[
                      styles.frequencyText,
                      frequency === item && styles.selectedFrequencyText,
                      isEdit && styles.disabledFrequencyText,
                    ]}
                  >
                    {t(`reminders.${item}`)}
                  </Text>
                </Pressable>
              ))}
            </View>

            {frequency === 'weekly' && (
              <>
                <Text style={styles.label}>{t('reminders.repeat')}</Text>

                <View style={styles.daysRow}>
                  {days.map((day, index) => (
                    <Pressable
                      key={index}
                      disabled={isEdit}
                      onPress={() => selectDay(index)}
                      style={[
                        styles.dayButton,
                        weekdays.includes(index) && styles.selectedDay,
                        isEdit && styles.disabledInput,
                      ]}
                    >
                      <Text
                        style={[
                          styles.dayText,
                          weekdays.includes(index) && styles.selectedDayText,
                          isEdit && styles.disabledFrequencyText,
                        ]}
                      >
                        {day}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </>
            )}
          </ScrollView>

          <View style={styles.footer}>
            <Pressable
              style={styles.submitButton}
              onPress={isEdit ? saveReminder : addReminder}
            >
              <Text style={styles.submitText}>
                {isEdit ? t('reminders.save') : t('reminders.add')}
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </BottomSheetModal>

      <BottomSheetModal visible={modal === 'delete'} onClose={closeModal}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.deleteContent}>
            <Image source={image.deleteAccount} style={styles.deleteIcon} />

            <Text style={styles.deleteTitle}>{t('reminders.deleteTitle')}</Text>

            <Text style={styles.deleteDescription}>
              {t('reminders.deleteDescription')}
            </Text>

            <View
              style={[styles.deleteButtons, { paddingBottom: insets.bottom }]}
            >
              <Pressable style={styles.cancelButton} onPress={closeModal}>
                <Text style={styles.cancelText}>{t('reminders.cancel')}</Text>
              </Pressable>

              <Pressable style={styles.confirmButton} onPress={deleteReminder}>
                <Text style={styles.confirmText}>
                  {t('reminders.yesDelete')}
                </Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </BottomSheetModal>
    </View>
  );
};

export default Reminders;
