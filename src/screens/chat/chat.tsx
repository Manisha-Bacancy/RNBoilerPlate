import React, {useEffect} from 'react';
import {View, ScrollView, Text, SafeAreaView, StyleSheet} from 'react-native';
import {Headers} from '../../components';

import I18n from '../../I18n/I18n';
import {Colors, smartScale} from '../../theme';
import {WebView} from 'react-native-webview';
import NavigationService from '../../route/navigationservice';
import {sbConnect} from './chatservice';
import {CHAT_APP_ID} from '../../utils/constants';

interface IProps {
  navigation: any;
}

const NICKNAME = 'Manisha';
const USER_ID = '001';
export const Chat: React.FC<IProps> = props => {
  const goBack = () => NavigationService.goBack();
  useEffect(() => {
    sbConnect(USER_ID, NICKNAME, CHAT_APP_ID)
      .then(user => {
        console.log('Connect Chat response:::', user);
      })
      .catch(err => {
        console.log('Chat Error:::', err);
      });
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Headers
          title={I18n.t('chat.title')}
          navigation={props.navigation}
          leftButtonType={'back'}
          leftIcon={'chevron-back-outline'}
          leftAction={goBack}
        />
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>{'Chat screen !'}</Text>
        </View>
      </View>
      <SafeAreaView style={styles.safeAreaBottomeContainer} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  safeAreaContainer: {
    flex: 1,
    backgroundColor: Colors.green,
  },
  safeAreaBottomeContainer: {
    flex: 0,
    backgroundColor: Colors.white,
  },
});
