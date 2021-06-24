import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './style';
import {Colors, smartScale} from '../../theme';

export const BottomTabBar = ({state, descriptors, navigation}) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safeAreaBottomContainer}>
      <View style={styles.container}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];

          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          var tabBarIcon, tintColor;
          if (label == 'Home') {
            tabBarIcon = 'home';
            if (isFocused) {
              tintColor = Colors.tabIconActive;
            } else {
              tintColor = Colors.tabIconInActive;
            }
          } else if (label == 'Profile') {
            tabBarIcon = 'account';
            if (isFocused) {
              tintColor = Colors.tabIconActive;
            } else {
              tintColor = Colors.tabIconInActive;
            }
          }

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={index.toString()}
              onPress={onPress}
              style={styles.tabMainStyle}>
              <View style={{height: 0.5, backgroundColor: Colors.grey}} />
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <MaterialCommunityIcons
                  name={tabBarIcon}
                  size={smartScale(24)}
                  color={tintColor}
                  style={{color: tintColor}}
                />
                <Text style={[styles.tabText, {color: tintColor}]}>
                  {label}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};
