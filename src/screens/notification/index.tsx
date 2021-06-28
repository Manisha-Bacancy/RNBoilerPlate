import * as React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import NavigationService from '../../route/navigationservice';
import styles from './style';

interface IProps {
  navigation: any;
}

export const Notification: React.FC<IProps> = () => {
  const goBack = () => NavigationService.goBack();
  return (
    <View style={styles.container}>
      <Text>{'This is Notification screen!'}</Text>
      <TouchableOpacity onPress={goBack}>
        <Text>{'Go Back'}</Text>
      </TouchableOpacity>
    </View>
  );
};
