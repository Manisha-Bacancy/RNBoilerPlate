import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {setIsLogin} from '../../services';
import {smartScale} from '../../theme';
import styles from './style';

interface IProps {
  navigation: any;
}

export const Login: React.FC<IProps> = props => {
  const goHome = () => {
    setIsLogin(true);
    props.navigation.reset({
      routes: [{name: 'SignedInStack'}],
    });
  };

  return (
    <View style={styles.container}>
      <Text>{'This is login screen!'}</Text>
      <TouchableOpacity style={{marginTop: smartScale(20)}} onPress={goHome}>
        <Text>{'Login'}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{marginTop: smartScale(20)}}
        onPress={() => props.navigation.navigate('Signup')}>
        <Text>{'Signup'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{marginTop: smartScale(20)}}
        onPress={() => props.navigation.navigate('ForgotPassword')}>
        <Text>{'Forgot Password'}</Text>
      </TouchableOpacity>
    </View>
  );
};
