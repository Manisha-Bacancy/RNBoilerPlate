import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, Text} from 'react-native';
import {isSignedIn} from '../../services';
import styles from './style';
import NavigationService from '../../route/navigationservice';

interface IProps {
  navigation: any;
}

export const Lunch: React.FC<IProps> = () => {
  useEffect(() => {
    isSignedIn().then(isLoggedin => {
      if (isLoggedin == true) {
        NavigationService.navigateAndReset('SignedInStack');
      } else {
        NavigationService.navigateAndReset('SignedOutStack');
      }
    });
  }, []);
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}></View>
    </SafeAreaView>
  );
};
