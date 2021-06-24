import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import I18n from '../I18n/I18n';
import {BottomTabBar} from '../components';
import {Home, Profile} from '../screens';

// tab stack
const Tab = createBottomTabNavigator();

export const TabStack = () => {
  return (
    <Tab.Navigator tabBar={props => <BottomTabBar {...props} />}>
      <Tab.Screen name={I18n.t('home.title')} component={Home} />
      <Tab.Screen name={I18n.t('profile.title')} component={Profile} />
    </Tab.Navigator>
  );
};
