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
  ActivityIndicator,
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import {
  getReminders,
  createReminder,
  updateReminder,
  deleteReminder as deleteReminderApi,
  type ReminderListResponse,
} from '../../services/reminder/reminderService';
import { useTranslation } from 'react-i18next';

import { ScreenHeader, BottomSheetModal, DateInput } from '../../components';

import ReminderCard from '../../components/reminderCard';

import { image } from '../../assets';
import styles from './style';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '../../utils/color';

const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const Reminders = () => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const [reminders, setReminders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const getFrequencyValue = (value: string): number => {
    switch (value) {
      case 'daily':
        return 1;
      case 'weekly':
        return 2;
      default:
        return 3;
    }
  };

  const getFrequencyLabel = (value: number): string => {
    switch (value) {
      case 1:
        return 'daily';
      case 2:
        return 'weekly';
      default:
        return 'once';
    }
  };

  const formatReminderDate = (date: Date, time: Date) => {
    const selectedDateTime = new Date(date);

    selectedDateTime.setHours(time.getHours(), time.getMinutes(), 0, 0);

    const year = selectedDateTime.getFullYear();
    const month = String(selectedDateTime.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDateTime.getDate()).padStart(2, '0');
    const hours = String(selectedDateTime.getHours()).padStart(2, '0');
    const minutes = String(selectedDateTime.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:00`;
  };

  const fetchReminders = async () => {
    try {
      setLoading(true);

      const response = await getReminders();

      const mappedReminders = response.data.reminders.map(item => {
        const apiDate = new Date(item.date);

        const reminderDate = new Date(
          apiDate.getUTCFullYear(),
          apiDate.getUTCMonth(),
          apiDate.getUTCDate(),
          apiDate.getUTCHours(),
          apiDate.getUTCMinutes(),
          0,
        );

        return {
          id: item._id,
          title: item.title,
          date: reminderDate,
          time: reminderDate,
          frequency: getFrequencyLabel(item.frequency),
          weekdays: item.repeatFrequency ?? [],
          enabled: item.status === 1,
          isDefault: item.isDefault ?? false,
        };
      });

      setReminders(mappedReminders);
    } catch (error) {
      console.log('Fetch reminders error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReminders();
  }, []);

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

  const addReminder = async () => {
    if (!title.trim() || !date) return;

    if (frequency === 'weekly' && weekdays.length === 0) {
      return;
    }

    try {
      const payload = {
        title: title.trim(),
        date: formatReminderDate(date, time),
        frequency: getFrequencyValue(frequency),
        repeatFrequency: frequency === 'weekly' ? weekdays : null,
      };

      await createReminder(payload);

      await fetchReminders();
      closeModal();
    } catch (error) {
      console.log('Create reminder error:', error);
    }
  };

  const saveReminder = async () => {
    if (!selectedReminder) return;

    if (!isDefaultEdit) {
      if (!title.trim() || !date) return;

      if (frequency === 'weekly' && weekdays.length === 0) {
        return;
      }
    }

    try {
      const payload = {
        reminderId: selectedReminder.id,
        title: isDefaultEdit ? selectedReminder.title : title.trim(),
        date: formatReminderDate(
          isDefaultEdit ? selectedReminder.date : date!,
          time,
        ),
        frequency: getFrequencyValue(
          isDefaultEdit ? selectedReminder.frequency : frequency,
        ),
        repeatFrequency: isDefaultEdit
          ? null
          : frequency === 'weekly'
          ? weekdays
          : null,
        status: selectedReminder.enabled ? 1 : 0,
      };

      await updateReminder(payload);

      await fetchReminders();
      closeModal();
    } catch (error) {
      console.log('Update reminder error:', error);
    }
  };

  const deleteReminder = async () => {
    if (!selectedReminder || selectedReminder.isDefault) return;

    try {
      await deleteReminderApi(selectedReminder.id);

      await fetchReminders();
      closeModal();
    } catch (error) {
      console.log('Delete reminder error:', error);
    }
  };

  const toggleReminder = async (item: any) => {
    try {
      const payload = {
        reminderId: item.id,
        title: item.title,
        date: formatReminderDate(item.date, item.time),
        frequency: getFrequencyValue(item.frequency),
        repeatFrequency: item.frequency === 'weekly' ? item.weekdays : null,
        status: item.enabled ? 0 : 1,
      };

      await updateReminder(payload);

      await fetchReminders();
    } catch (error) {
      console.log('Toggle reminder error:', error);
    }
  };

  const selectDay = (day: number) => {
    setWeekdays(previous =>
      previous.includes(day)
        ? previous.filter(item => item !== day)
        : [...previous, day],
    );
  };

  const isEdit = modal === 'edit';
  const isDefaultEdit = isEdit && selectedReminder?.isDefault;

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
          {loading ? (
            <ActivityIndicator
              size="large"
              color={colors.primary}
              style={{ marginTop: 30 }}
            />
          ) : reminders.length === 0 ? (
            <Text style={{ textAlign: 'center', marginTop: 30 }}>
              No reminders found.
            </Text>
          ) : (
            reminders.map(item => (
              <ReminderCard
                key={item.id}
                title={
                  item.isDefault ? t('reminders.defaultTitle') : item.title
                }
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
                    toggleReminder(item);
                  }
                }}
              />
            ))
          )}
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
            style={[styles.input, isDefaultEdit && styles.disabledInput]}
            value={title}
            onChangeText={setTitle}
            editable={!isDefaultEdit}
            placeholder={t('reminders.enterTitle')}
            placeholderTextColor={colors.textSecondary}
          />

          <Text style={styles.label}>{t('reminders.startDate')}</Text>

          {isDefaultEdit ? (
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
              allowFutureDates={true}
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
                disabled={isDefaultEdit}
                onPress={() => {
                  setFrequency(item);
                  setWeekdays([]);
                }}
                style={[
                  styles.frequencyButton,
                  frequency === item && styles.selectedFrequency,
                  isDefaultEdit && styles.disabledInput,
                ]}
              >
                <Text
                  style={[
                    styles.frequencyText,
                    frequency === item && styles.selectedFrequencyText,
                    isDefaultEdit && styles.disabledFrequencyText,
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
                    disabled={isDefaultEdit}
                    onPress={() => selectDay(index)}
                    style={[
                      styles.dayButton,
                      weekdays.includes(index) && styles.selectedDay,
                      isDefaultEdit && styles.disabledInput,
                    ]}
                  >
                    <Text
                      style={[
                        styles.dayText,
                        weekdays.includes(index) && styles.selectedDayText,
                        isDefaultEdit && styles.disabledFrequencyText,
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
