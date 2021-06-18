import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {smartScale} from '../../config/Metrics';
import {setIsLogin} from '../../services/AsyncStorageNRetrive';
import {IProps} from '../../typescript/typeScriptDeclaration';
import styles from './style';

const Login: React.FC<IProps> = props => {
  const goHome = () => {
    setIsLogin(true);
    props.navigation.reset({
      routes: [{name: 'SignedInStack'}],
    });
  };
  const goForgotPassword = () => {
    props.navigation.navigate('ForgotPassword');
  };
  const goSignup = () => {
    props.navigation.navigate('Signup');
  };
  return (
    <View style={styles.container}>
      <Text>{'This is login screen!'}</Text>
      <TouchableOpacity style={{marginTop: smartScale(20)}} onPress={goHome}>
        <Text>{'Login'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{marginTop: smartScale(20)}} onPress={goSignup}>
        <Text>{'Signup'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{marginTop: smartScale(20)}}
        onPress={goForgotPassword}>
        <Text>{'Forgot Password'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
