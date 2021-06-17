import * as React from 'react';
import {NavigationContainerRef} from '@react-navigation/native';

// NavigationContainer is referred here - Check NavigationStack
export const navigationRef = React.createRef<NavigationContainerRef>();

function navigate(name: string, params?: any) {
  navigationRef.current?.navigate(name, params);
}

function goBack() {
  navigationRef.current?.goBack();
}

function navigateAndReset(name: string) {
  navigationRef.current?.reset({
    index: 0,
    routes: [{name: name}],
  });
}
function navigateAndResetWithParams(name, params?: any) {
  navigationRef.current?.reset({
    index: 0,
    routes: [{name: name, params: params}],
  });
}
export default {
  navigate,
  goBack,
  navigateAndReset,
  navigateAndResetWithParams,
};
