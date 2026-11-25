import React, { useEffect, useState } from 'react';
import { View, Text, Image, Switch, ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';
import { useTranslation } from 'react-i18next';

import ScreenHeader from '../../components/screenHeader';
import { image } from '../../assets';
import colors from '../../utils/color';
import styles from './style';

import {
  getTrackingPreference,
  updateTrackingPreference,
  TrackingPreferenceData,
  UpdateTrackingPreferencePayload,
} from '../../services/trackingPreference/trackingPreference';

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

  const [hcpList, setHcpList] = useState<
    TrackingPreferenceData['sharedWithHCPs']
  >([]);

  const [isLoading, setIsLoading] = useState(true);

  const loadTrackingPreferences = async () => {
    try {
      setIsLoading(true);

      const response = await getTrackingPreference();
      const data = response.data;

      const hormoneData = data.urinaryHormoneAnalysis;

      setOptions(previous => ({
        ...previous,
        urinaryHormone: Object.values(hormoneData).some(Boolean),
        fsh: hormoneData.fshTestResult,
        lh: hormoneData.lhTestResult,
        estrogen: hormoneData.estrogenLevelTest,
        progesterone: hormoneData.progesteroneTestResult,
        manageSymptoms: data.manageSymptoms,
        hcp: data.myInsightsWithHCP,
      }));

      setHcpList(data.sharedWithHCPs || []);
    } catch (error: any) {
      console.log(
        'TRACKING PREFERENCE GET ERROR:',
        error?.response?.data || error,
      );

      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Unable to fetch tracking preferences.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTrackingPreferences();
  }, []);

  const handleToggle = async (key: keyof typeof options, value: boolean) => {
    const previousOptions = options;

    let payload: UpdateTrackingPreferencePayload = {};

    switch (key) {
      case 'manageSymptoms':
        payload = {
          manageSymptoms: value,
        };
        break;

      case 'hcp':
        payload = {
          myInsightsWithHCP: value,
        };
        break;

      case 'fsh':
        payload = {
          urinaryHormoneAnalysis: {
            fshTestResult: value,
          },
        };
        break;

      case 'lh':
        payload = {
          urinaryHormoneAnalysis: {
            lhTestResult: value,
          },
        };
        break;

      case 'estrogen':
        payload = {
          urinaryHormoneAnalysis: {
            estrogenLevelTest: value,
          },
        };
        break;

      case 'progesterone':
        payload = {
          urinaryHormoneAnalysis: {
            progesteroneTestResult: value,
          },
        };
        break;

      case 'urinaryHormone':
        payload = {
          urinaryHormoneAnalysis: {
            fshTestResult: value,
            lhTestResult: value,
            estrogenLevelTest: value,
            progesteroneTestResult: value,
          },
        };
        break;

      default:
        return;
    }

    setOptions(previous => {
      if (key === 'urinaryHormone') {
        return {
          ...previous,
          urinaryHormone: value,
          fsh: value,
          lh: value,
          estrogen: value,
          progesterone: value,
        };
      }

      const updated = {
        ...previous,
        [key]: value,
      };

      if (
        key === 'fsh' ||
        key === 'lh' ||
        key === 'estrogen' ||
        key === 'progesterone'
      ) {
        updated.urinaryHormone =
          updated.fsh || updated.lh || updated.estrogen || updated.progesterone;
      }

      return updated;
    });

    try {
      await updateTrackingPreference(payload);
    } catch (error: any) {
      setOptions(previousOptions);

      console.log(
        'TRACKING PREFERENCE PUT ERROR:',
        error?.response?.data || error,
      );

      Toast.show({
        type: 'error',
        text1: 'Update Failed',
        text2: error?.response?.data?.message || 'Unable to update preference.',
      });
    }
  };

  const handleHcpToggle = async (hcpId: string, value: boolean) => {
    const previousList = hcpList;

    const updatedList = hcpList.map(hcp =>
      hcp.hcpId === hcpId ? { ...hcp, isEnabled: value } : hcp,
    );

    setHcpList(updatedList);

    try {
      await updateTrackingPreference({
        sharedWithHCPs: updatedList,
      });
    } catch (error: any) {
      setHcpList(previousList);

      console.log(
        'HCP PREFERENCE UPDATE ERROR:',
        error?.response?.data || error,
      );

      Toast.show({
        type: 'error',
        text1: 'Update Failed',
        text2:
          error?.response?.data?.message || 'Unable to update HCP preference.',
      });
    }
  };

  const renderSwitch = (key: keyof typeof options, disabled = false) => (
    <Switch
      style={{
        transform: [{ scaleX: 0.67 }, { scaleY: 0.67 }],
      }}
      value={options[key]}
      disabled={disabled || isLoading}
      onValueChange={value => handleToggle(key, value)}
      trackColor={{
        false: colors.borderColor,
        true: colors.primary,
      }}
      ios_backgroundColor={colors.borderColor}
    />
  );

  return (
    <View style={styles.container}>
      <ScreenHeader
        title={t('trackingPreferences.title')}
        backgroundImage={image.homeBG}
        style={styles.heading}
      />

      <View style={styles.body}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* TRACKING PREFERENCES */}
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

                {/* HORMONE CHILD OPTIONS */}
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

          {/* HCP PREFERENCES */}
          <View style={styles.card}>
            <View style={[styles.row, !options.hcp && styles.lastRow2]}>
              <Image source={hcpData.icon} style={styles.icon} />

              <Text style={styles.rowTitle}>{t(hcpData.titleKey)}</Text>

              {renderSwitch('hcp')}
            </View>

            {options.hcp &&
              hcpList.map((hcp, index) => (
                <View
                  key={hcp.hcpId}
                  style={[
                    styles.child2Row,
                    index === hcpList.length - 1 && styles.lastRow,
                  ]}
                >
                  <Text style={styles.emailTitle}>{hcp.name}</Text>

                  <Switch
                    style={{
                      transform: [{ scaleX: 0.67 }, { scaleY: 0.67 }],
                    }}
                    value={hcp.isEnabled}
                    disabled={isLoading}
                    onValueChange={value => handleHcpToggle(hcp.hcpId, value)}
                    trackColor={{
                      false: colors.borderColor,
                      true: colors.primary,
                    }}
                    ios_backgroundColor={colors.borderColor}
                  />
                </View>
              ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default TrackingPreferences;
