import * as React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import NavigationService from '../../navigation/NavigationService';
import {IProps} from '../../typescript/typeScriptDeclaration';
import styles from './style';

const Setting: React.FC<IProps> = () => {
  const goBack = () => NavigationService.goBack();
  return (
    <View style={styles.container}>
      <Text>{'This is Setting screen!'}</Text>
      <TouchableOpacity onPress={goBack}>
        <Text>{'Go Back'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Setting;
