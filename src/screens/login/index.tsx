import * as React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import NavigationService from '../../navigation/NavigationService';
import {setIsLogin} from '../../services/AsyncStorageNRetrive';
import styles from './style';

interface Props {
  navigation: any;
}
const Login: React.FC<Props> = props => {
  const goHome = () => {
    setIsLogin(true);

    // props.navigation.reset('SignedInStack', {
    //   screen: 'Home',
    // });
    props.navigation.reset({
      routes: [{name: 'SignedInStack'}],
    });
  };
  const goForgotPassword = () => {
    props.navigation.navigate('ForgotPassword');
  };
  return (
    <View style={styles.container}>
      <Text>{'This is login screen!'}</Text>
      <TouchableOpacity onPress={goHome}>
        <Text>{'Login'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={goForgotPassword}>
        <Text>{'Forgot Password'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
