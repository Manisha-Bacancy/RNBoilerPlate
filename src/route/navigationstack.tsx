import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {navigationRef} from './navigationservice';

import {Setting, Signup, ForgotPassword, Login, Lunch} from '../screens';
import {DrawerStack} from './drawerstack';

const Stack = createStackNavigator();
const AuthStack = createStackNavigator();
const LoggedInStack = createStackNavigator();

// signout stack
const SignedOutStack = props => {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="Signup" component={Signup} />
    </AuthStack.Navigator>
  );
};
// signin stack
const SignedInStack = props => {
  return (
    <LoggedInStack.Navigator
      initialRouteName={'DrawerStack'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="DrawerStack" component={DrawerStack} />
      <Stack.Screen name="Setting" component={Setting} />
    </LoggedInStack.Navigator>
  );
};

// root stack
export const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Lunch'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Lunch" component={Lunch} />
      <Stack.Screen name="SignedInStack" component={SignedInStack} />
      <Stack.Screen name="SignedOutStack" component={SignedOutStack} />
    </Stack.Navigator>
  );
};

// root navigation
export const RootNavigation = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <AppNavigator />
    </NavigationContainer>
  );
};
