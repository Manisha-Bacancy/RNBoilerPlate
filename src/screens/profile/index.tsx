import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {Headers} from '../../components';
import styles from './style';
import I18n from '../../I18n/I18n';

interface IProps {
  navigation: any;
}

export const Profile: React.FC<IProps> = props => {
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Headers
          title={I18n.t('profile.title')}
          navigation={props.navigation}
          leftButtonType={'menu'}
          leftIcon={'md-menu'}
          leftAction={() => props.navigation.openDrawer()}
        />
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <Text>{'This is Profile screen!'}</Text>
        </View>
      </View>
      <SafeAreaView style={styles.safeAreaBottomeContainer} />
    </SafeAreaView>
  );
};
