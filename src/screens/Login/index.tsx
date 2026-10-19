import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import { BodySection, HeaderSection } from '../../components';
import { image } from '../../assets';
import colors from '../../utils/color';
import translations from '../../utils/translations';

const Login = () => {
  const navigation = useNavigation<any>();

  const [language, setLanguage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const getLanguage = async () => {
      const savedLanguage = await AsyncStorage.getItem('selectedLanguage');

      if (savedLanguage === 'Español') {
        setLanguage('Español');
      } else {
        setLanguage('English');
      }
    };
    getLanguage();
  }, []);

  const text = translations[language];
  return (
    <View style={styles.container}>
      <HeaderSection
        backgroundImage={image.headImage}
        backgroundColor={colors.primary}
        logo={image.splashText}
        style={styles.header}
      />

      <BodySection titlePrimary="" />
    </View>
  );
};

export default Login;
