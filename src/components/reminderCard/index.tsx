import React from 'react';
import { View, Text, Image, Pressable, Switch } from 'react-native';

import { image } from '../../assets';
import styles from './style';
import { Props } from './@types';
import colors from '../../utils/color';

const ReminderCard = ({
  title,
  time,
  frequency,
  enabled,
  isDefault,
  weekdays,
  onEdit,
  onDelete,
  onToggle,
}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Image source={image.reminderBell} style={styles.bellIcon} />

        <View style={styles.details}>
          <Text style={styles.title}>{title}</Text>

          <View style={styles.subtitleRow}>
            <Text style={styles.subtitle}>{time}</Text>

            <Image source={image.dot} style={styles.dotIcon} />

            <Text style={styles.subtitle}>{frequency}</Text>
          </View>

          {frequency === 'weekly' && (
            <View style={styles.weekdays}>
              {weekdays?.map(day => (
                <Text key={day} style={styles.day}>
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S']}
                </Text>
              ))}
            </View>
          )}
        </View>

        <Switch
          value={isDefault ? true : enabled}
          disabled={isDefault}
          onValueChange={onToggle}
          trackColor={{
            false: colors.borderColor,
            true: isDefault ? colors.buttonDisable : colors.primary,
          }}
          ios_backgroundColor={colors.borderColor}
        />
      </View>

      <View style={styles.divider} />

      <View style={styles.buttons}>
        <Pressable style={styles.button} onPress={onEdit}>
          <Image source={image.editPencilProfile} style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Edit</Text>
        </Pressable>

        {!isDefault && (
          <Pressable style={styles.button} onPress={onDelete}>
            <Image source={image.deleteReminder} style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Delete</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default ReminderCard;
