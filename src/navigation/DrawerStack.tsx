import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerMenu from '../screens/drawermenu/DrawerMenu';
import {TabStack} from './TabStack';

const Drawer = createDrawerNavigator();

export const DrawerStack = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props): React.ReactElement => <DrawerMenu {...props} />}
      drawerPosition={'left'}
      initialRouteName={'TabStack'}>
      <Drawer.Screen name="TabStack" component={TabStack} />
      {/*  <Drawer.Screen name="Setting" component={Setting} /> */}
    </Drawer.Navigator>
  );
};
