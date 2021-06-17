import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {navigationRef} from './NavigationService';
import Lunch from '../screens/lunch';
import Login from '../screens/login';
import Home from '../screens/home/';
import ForgotPassword from '../screens/forgotPassword';
import Profile from '../screens/profile';
import Signup from '../screens/signup';
import Setting from '../screens/setting';
import {DrawerStack} from './DrawerStack';
import Icon from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();
const AuthStack = createStackNavigator();
const LoggedInStack = createStackNavigator();

const SignedOutStack = props => {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="Signup" component={Signup} />
    </AuthStack.Navigator>
  );
};

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
export const RootNavigation = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <AppNavigator />
    </NavigationContainer>
  );
};
