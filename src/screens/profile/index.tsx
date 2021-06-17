import React, {Fragment} from 'react';
import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import Headers from '../../components/headers/Header';
import styles from './style';
import I18n from '../../I18n/I18n';
interface Props {
  navigation: any;
}
const Profile: React.FC<Props> = props => {
  return (
    <Fragment>
      <SafeAreaView style={styles.safeAreaBottomeContainer} />
      <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.container}>
          <Headers
            title={I18n.t('profile.title')}
            navigation={props.navigation}
          />
          <View
            style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <Text>{'This is Profile screen!'}</Text>
          </View>
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

export default Profile;
