import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, Text, StyleSheet} from 'react-native';
import {isSignedIn} from '../../services';
import NavigationService from '../../route/navigationservice';
import {Colors} from '../../theme';

interface IProps {
  navigation: any;
}

export const AuthLoading: React.FC<IProps> = () => {
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

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
