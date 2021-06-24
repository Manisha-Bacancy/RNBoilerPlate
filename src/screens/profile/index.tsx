import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {Headers} from '../../components';
import styles from './style';
import I18n from '../../I18n/I18n';

interface IProps {
  navigation: any;
}

export const Profile: React.FC<IProps> = props => {
  let name: string = 'Manisha';
  let total: number;
  name = 'Patel';

  function sum(num1: number, num2: number) {
    return (total = num1 + num2);
  }
  console.tron.log('add sum  ::-', sum(10, 20));
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Headers
          title={I18n.t('profile.title')}
          navigation={props.navigation}
        />
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <Text>{'This is Profile screen!'}</Text>
        </View>
      </View>
      <SafeAreaView style={styles.safeAreaBottomeContainer} />
    </SafeAreaView>
  );
};
