import React from 'react';
import { View, Text, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { image } from '../assets';

import Home from '../screens/home';
import Logs from '../screens/logs';
import Insights from '../screens/insights';
import More from '../screens/more';

import styles, { activeColor, inactiveColor } from './bottomStyle';

const Tab = createBottomTabNavigator();

const tabIcons = {
  Home: image.home,
  Logs: image.logs,
  Insights: image.insights,
  More: image.more,
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,

        tabBarStyle: styles.tabBar,

        tabBarIcon: ({ focused }) => (
          <Image
            source={tabIcons[route.name as keyof typeof tabIcons]}
            resizeMode="contain"
            style={[
              styles.icon,
              {
                tintColor: focused ? activeColor : inactiveColor,
              },
            ]}
          />
        ),

        tabBarLabel: ({ focused, color }) => (
          <View style={styles.labelContainer}>
            <Text
              style={[styles.label, { color }, focused && styles.activeLabel]}
            >
              {route.name}
            </Text>

            {focused && <View style={styles.activeDot} />}
          </View>
        ),
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Logs" component={Logs} />
      <Tab.Screen name="Insights" component={Insights} />
      <Tab.Screen name="More" component={More} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
