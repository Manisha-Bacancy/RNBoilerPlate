import React from 'react';
import {View, Text, StyleSheet, Button, SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerMenu from '../screens/drawermenu/DrawerMenu';
import {TabStack} from './TabStack';

const Drawer = createDrawerNavigator();

export const DrawerStack = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props): ReactElement => <DrawerMenu {...props} />}
      drawerPosition={'left'}
      initialRouteName={'TabStack'}>
      <Drawer.Screen name="TabStack" component={TabStack} />
      {/*  <Drawer.Screen name="Setting" component={Setting} /> */}
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
