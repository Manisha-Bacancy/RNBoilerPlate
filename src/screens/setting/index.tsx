import React, {Fragment} from 'react';
import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import NavigationService from '../../route/navigationservice';
import styles from './style';
import {Headers, MyStatusBar} from '../../components/';
import I18n from '../../I18n';
import {Colors} from '../../theme';

interface IProps {
  navigation: any;
}

export const Setting: React.FC<IProps> = props => {
  const goBack = () => NavigationService.goBack();
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Headers
          title={I18n.t('setting.title')}
          navigation={props.navigation}
          leftButtonType={'back'}
          leftIcon={'chevron-back-outline'}
          leftAction={goBack}
        />

        <Text style={{flex: 1, textAlign: 'center'}}>
          {'This is Setting screen!'}
        </Text>
      </View>
      <SafeAreaView style={styles.safeAreaBottomeContainer} />
    </SafeAreaView>
  );
};
