import React, { useEffect, useState } from 'react';
import { getProfileData } from '../../utils/profileStorage';
import { View, Text, Image, Pressable, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';

import styles from './style';
import { image } from '../../assets';
import { moreData } from './moreData';
import { HeaderSection } from '../../components';
import { ScreenName } from '../../navigation/screenName';
import { useNavigation } from '@react-navigation/native';
import { BottomSheetModal } from '../../components';

const More = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();

  const [profileName, setProfileName] = useState('Your Name');
  const [profileEmail, setProfileEmail] = useState('your.email@example.com');

  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      const profile = await getProfileData();

      if (profile.name) setProfileName(profile.name);
      if (profile.email) setProfileEmail(profile.email);
    };

    loadProfile();
  }, []);

  const handleLogout = () => {
    setIsLogoutModalVisible(false);

    navigation.reset({
      index: 0,
      routes: [{ name: ScreenName.SignUp }],
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <HeaderSection backgroundImage={image.homeBG} />
        <Text style={styles.version}>v1.2.0</Text>

        <Image
          source={image.defaultProfile}
          style={styles.profileImage}
          resizeMode="cover"
        />
      </View>

      <View style={styles.profileSection}>
        <Text style={styles.profileName}>{profileName}</Text>
        <Text style={styles.profileEmail}>{profileEmail}</Text>

        <Pressable
          style={styles.editButton}
          onPress={() => navigation.navigate(ScreenName.EditProfile)}
        >
          <View style={styles.editButtonView}>
            <Image style={styles.pencilImg} source={image.editPencilProfile} />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </View>
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.menuCard}>
          {moreData.map((item, index) => (
            <Pressable
              key={item.id}
              style={[
                styles.menuItem,
                index === moreData.length - 1 && styles.lastMenuItem,
              ]}
              onPress={() => {
                if (item.titleKey === 'more.logout') {
                  setIsLogoutModalVisible(true);
                } else if (item.screenName) {
                  navigation.navigate(item.screenName);
                }
              }}
            >
              <Image source={item.icon} style={styles.menuIcon} />

              <Text style={styles.menuTitle}>{t(item.titleKey)}</Text>

              <Image source={image.arrowRight} style={styles.arrowIcon} />
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <BottomSheetModal
        visible={isLogoutModalVisible}
        onClose={() => setIsLogoutModalVisible(false)}
      >
        <View style={styles.logoutContent}>
          <Image source={image.logout2} style={styles.logoutModalIcon} />

          <Text style={styles.logoutModalTitle}>
            {t('more.logoutModal.title')}
          </Text>

          <Text style={styles.logoutModalDescription}>
            {t('more.logoutModal.description')}
          </Text>

          <View style={styles.logoutModalButtons}>
            <Pressable
              style={styles.cancelLogoutButton}
              onPress={() => setIsLogoutModalVisible(false)}
            >
              <Text style={styles.cancelLogoutText}>
                {t('more.logoutModal.cancel')}
              </Text>
            </Pressable>

            <Pressable
              style={styles.confirmLogoutButton}
              onPress={handleLogout}
            >
              <Text style={styles.confirmLogoutText}>
                {t('more.logoutModal.confirm')}
              </Text>
            </Pressable>
          </View>
        </View>
      </BottomSheetModal>
    </View>
  );
};

export default More;
