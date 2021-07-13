import * as React from 'react';
import {View, Text, TouchableOpacity,StyleSheet} from 'react-native';
import NavigationService from '../../route/navigationservice';

interface IProps {
  navigation: any;
}

export const Signup: React.FC<IProps> = () => {
  const goBack = () => NavigationService.goBack();
  return (
    <View style={styles.container}>
      <Text>{'This is Signup screen!'}</Text>
      <TouchableOpacity onPress={goBack}>
        <Text>{'Go Back'}</Text>
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
});

