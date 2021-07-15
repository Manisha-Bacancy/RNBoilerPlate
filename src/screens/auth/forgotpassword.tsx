import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import NavigationService from '../../route/navigationservice';
import {smartScale} from '../../theme';
import normalize from '../../theme/normalize';

interface IProps {
  navigation: any;
}

export const ForgotPassword: React.FC<IProps> = () => {
  const goBack = () => NavigationService.goBack();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{'This is Forgot Password screen!'}</Text>
      <TouchableOpacity style={{backgroundColor: 'yellow'}} onPress={goBack}>
        <Text style={styles.text}>{'Go Back'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#d4895e',
    fontSize: smartScale(15),
    marginHorizontal: normalize(20),
  },
  title: {
    color: '#d4895e',
    fontSize: smartScale(20),
    marginHorizontal: smartScale(20),
  },
});
