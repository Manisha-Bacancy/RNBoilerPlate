import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import Headers from '../../components/headers/Header';
import styles from './style';
import I18n from '../../I18n/I18n';
import {IProps} from '../../typescript/typeScriptDeclaration';

const Profile: React.FC<IProps> = props => {
  let name: string = 'Manisha';
  let total: number;
  name = 'Manisha';

  function add(num1: number, num2?: number) {
    return num1 + num2;
  }
  console.tron.log('add sum  ::-', add(10));
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

export default Profile;
