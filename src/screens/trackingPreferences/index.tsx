import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, Image, Switch, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';

import ScreenHeader from '../../components/screenHeader';
import { image } from '../../assets';
import colors from '../../utils/color';
import styles from './style';
import { trackingPreferencesData, hcpData } from './trackingPreferencesData';

const TrackingPreferences = () => {
  const { t } = useTranslation();

  const [options, setOptions] = useState({
    urinaryHormone: false,
    fsh: false,
    lh: false,
    estrogen: false,
    progesterone: false,
    manageSymptoms: true,
    hcp: false,
    email1: false,
    email2: false,
    email3: false,
    email4: false,
  });

  const handleToggle = async (key: keyof typeof options, value: boolean) => {
    const updatedOptions = {
      ...options,
      [key]: value,
    };

    setOptions(updatedOptions);

    await AsyncStorage.setItem(
      'trackingPreferences',
      JSON.stringify(updatedOptions),
    );
  };

  const renderSwitch = (key: keyof typeof options, disabled = false) => (
    <Switch
      value={options[key]}
      disabled={disabled}
      onValueChange={value => handleToggle(key, value)}
      trackColor={{
        false: colors.borderColor,
        true: colors.primary,
      }}
      ios_backgroundColor={colors.borderColor}
    />
  );

  useEffect(() => {
    const loadOptions = async () => {
      const savedOptions = await AsyncStorage.getItem('trackingPreferences');

      if (savedOptions) {
        setOptions(previous => ({
          ...previous,
          ...JSON.parse(savedOptions),
        }));
      }
    };

    loadOptions();
  }, []);

  return (
    <View style={styles.container}>
      <ScreenHeader
        title={t('trackingPreferences.title')}
        backgroundImage={image.homeBG}
      />

      <View style={styles.body}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.card}>
            {trackingPreferencesData.map(item => (
              <View key={item.key}>
                <View
                  style={[
                    styles.row,
                    item.key === 'manageSymptoms' && styles.lastRow,
                  ]}
                >
                  <Image source={item.icon} style={styles.icon} />

                  <Text style={styles.rowTitle}>{t(item.titleKey)}</Text>

                  {renderSwitch(item.key)}
                </View>

                {item.key === 'urinaryHormone' &&
                  options.urinaryHormone &&
                  item.children.map((child, childIndex) => (
                    <View key={child.key}>
                      <View style={styles.childRow}>
                        <Image source={child.icon} style={styles.icon} />

                        <Text style={styles.childTitle}>
                          {t(child.titleKey)}
                        </Text>

                        {renderSwitch(child.key)}
                      </View>
                      {childIndex !== item.children.length - 1 && (
                        <View style={styles.childDivider} />
                      )}
                    </View>
                  ))}
              </View>
            ))}
          </View>

          <View style={styles.card}>
            <View style={[styles.row, !options.hcp && styles.lastRow2]}>
              <Image source={hcpData.icon} style={styles.icon} />

              <Text style={styles.rowTitle}>{t(hcpData.titleKey)}</Text>

              {renderSwitch('hcp')}
            </View>

            {options.hcp &&
              hcpData.children.map((child, index) => (
                <View
                  key={child.key}
                  style={[
                    styles.child2Row,
                    index === hcpData.children.length - 1 && styles.lastRow,
                  ]}
                >
                  <Text style={styles.emailTitle}>{child.title}</Text>
                  {renderSwitch(child.key)}
                </View>
              ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default TrackingPreferences;
