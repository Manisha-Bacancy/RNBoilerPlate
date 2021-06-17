import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, Text} from 'react-native';
import {isSignedIn} from '../../services/AsyncStorageNRetrive';
import styles from './style';
import NavigationService from '../../navigation/NavigationService';

const Lunch: React.FC = () => {
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

export default Lunch;
