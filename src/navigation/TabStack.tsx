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
import Home from '../screens/home';
import Profile from '../screens/profile';
import colors from '../config/Colors';
import {smartScale} from '../config/Metrics';
import {FONT_MEDIUM} from '../config/Fonts';
import I18n from '../I18n/I18n';

// tab stack
const Tab = createBottomTabNavigator();
const MyTabBar = ({state, descriptors, navigation}) => {
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
              tintColor = colors.tabIconActive;
            } else {
              tintColor = colors.tabIconInActive;
            }
          } else if (label == 'Profile') {
            tabBarIcon = 'account';
            if (isFocused) {
              tintColor = colors.tabIconActive;
            } else {
              tintColor = colors.tabIconInActive;
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
              <View style={{height: 0.5, backgroundColor: colors.grey}} />
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
export const TabStack = () => {
  // if you want to do custom tab then use below code
  return (
    <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen name={I18n.t('home.title')} component={Home} />
      <Tab.Screen name={I18n.t('profile.title')} component={Profile} />
    </Tab.Navigator>
  );

  // if you don't want to do custom tab then uncomment this code

  // return (
  //   <Tab.Navigator
  //     tabBarOptions={{
  //       activeTintColor: colors.green,
  //       inactiveTintColor: colors.grey,
  //       labelStyle: {fontSize: smartScale(14)},
  //       tabStyle: {
  //         //height: smartScale(-10),
  //         backgroundColor: 'pink',
  //         alignItems: 'center',
  //         justifyContent: 'center',
  //       },
  //     }}
  //     screenOptions={({route, navigation}) => ({
  //       tabBarIcon: ({focused, color, size}) => {
  //         let iconName = 'home';
  //         let txtColor = colors.green;
  //         if (route.name === 'Home') {
  //           iconName = 'home';
  //         } else if (route.name === 'Profile') {
  //           iconName = 'account';
  //         }
  //         if (focused) {
  //           txtColor = colors.green;
  //         } else {
  //           txtColor = colors.grey;
  //         }

  //         return (
  //           <MaterialCommunityIcons
  //             name={iconName}
  //             size={size}
  //             color={txtColor}
  //             style={{color: txtColor}}
  //           />
  //         );
  //       },
  //     })}>
  //     <Tab.Screen name="Home" component={Home} />
  //     <Tab.Screen name="Profile" component={Profile} />
  //   </Tab.Navigator>
  // );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: smartScale(46),

    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  safeAreaBottomContainer: {
    flex: 0,
    backgroundColor: colors.white,
  },
  tabMainStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    fontFamily: FONT_MEDIUM,
    fontSize: smartScale(12),
    marginVertical: smartScale(3),
  },
});
