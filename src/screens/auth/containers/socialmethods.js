import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, View, Platform, Text, TouchableOpacity} from 'react-native';
import appleAuth, {
  AppleAuthRequestOperation,
  AppleAuthRequestScope,
  AppleButton,
} from '@invertase/react-native-apple-authentication';
import {AccessToken, LoginManager} from 'react-native-fbsdk';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import {Colors, smartScale} from '../../../theme';
import {setIsLogin, setLoginMethod} from '../../../services';
import {GOOGLE_SIGN_IN_CONFIG} from '../../../config/authconfig';
GoogleSignin.configure(GOOGLE_SIGN_IN_CONFIG);
function SocialMethods(props) {
  const navigation = useNavigation();
  const onAppleButtonPress = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });
      console.log('appleAuthRequestResponse::::', appleAuthRequestResponse);
      setIsLogin(true);
      setLoginMethod('apple');
      navigation.reset({
        routes: [{name: 'SignedInStack'}],
      });
      //dispatch(signInWithApple(appleAuthRequestResponse));

      // get current authentication state for user
      // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
      //   const credentialState = await appleAuth.getCredentialStateForUser(
      //     appleAuthRequestResponse.user,
      // );

      // functionChecker("AppleLogin.js","functionCheck --> credentialState",credentialState);
      // const { email, email_verified, is_private_email, sub } = jwt_decode(appleAuthRequestResponse.identityToken)

      // if(__DEV__) console.log("jwt_decode(appleAuthRequestResponse.identityToken) ",email_verified, is_private_email, sub)
      // use credentialState response to ensure the user is authenticated
      // if (credentialState === appleAuth.State.AUTHORIZED) {
      //     // user is authenticated
      //     // functionChecker("AppleLogin.js","functionCheck",appleAuthRequestResponse);
      //     doAppleCheckUserExit(appleAuthRequestResponse);
      // }
    } catch (e) {
      console.log('error:::', e.code);
      if (e.code === appleAuth.Error.CANCELED) {
        console.log('CANCELED error:::', e.code);
      }
    }
  };
  const loginFacebook = async () => {
    try {
      const loginFacebook = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);
      if (loginFacebook.isCancelled) {
      } else {
        AccessToken.getCurrentAccessToken().then(data => {
          const token = data.accessToken.toString();
          console.log('Facebooke token:::', token);
          initUser(token);

          //dispatch(signInWithFacebook(token));
        });
      }
    } catch (e) {
      console.log('Login fail with error: ' + e);
    }
  };
  const initUser = token => {
    fetch(
      'https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' +
        token,
    )
      .then(response => response.json())
      .then(json => {
        // Some user object has been set up somewhere, build that user here
        console.log('Facebook Response json::::', json);
        setIsLogin(true);
        setLoginMethod('facebook');
        navigation.reset({
          routes: [{name: 'SignedInStack'}],
        });
        // user.name = json.name;
        // user.id = json.id;
        // user.user_friends = json.friends;
        // user.email = json.email;
        // user.username = json.name;
        // user.loading = false;
        // user.loggedIn = true;
        // user.avatar = setAvatar(json.id);
      })
      .catch(() => {
        reject('ERROR GETTING DATA FROM FACEBOOK');
      });
  };
  const loginGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const {idToken, user} = userInfo;
      const {email, name} = user;
      console.log('GOOGLE userInfo:::', userInfo);
      setIsLogin(true);
      setLoginMethod('google');
      navigation.reset({
        routes: [{name: 'SignedInStack'}],
      });
      //dispatch(signInWithGoogle(idToken));
    } catch (error) {
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  return (
    <View style={{}}>
      <AppleButton
        style={styles.appleButton}
        cornerRadius={5}
        buttonStyle={AppleButton.Style.BLACK}
        buttonType={AppleButton.Type.SIGN_IN}
        onPress={() => onAppleButtonPress()}
      />

      <TouchableOpacity
        style={{
          height: smartScale(40),
          backgroundColor: '#3b5998',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={loginFacebook}>
        <Text style={{color: Colors.white, fontSize: smartScale(15)}}>
          {'Facebook Login'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          height: smartScale(40),
          backgroundColor: '#dd4b39',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: smartScale(10),
        }}
        onPress={loginGoogle}>
        <Text style={{color: Colors.white, fontSize: smartScale(15)}}>
          {'Google Login'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
export default SocialMethods;
const styles = StyleSheet.create({
  appleButton: {
    width: 200,
    height: 60,
    margin: 10,
  },
  header: {
    margin: 10,
    marginTop: 30,
    fontSize: 18,
    fontWeight: '600',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'pink',
  },
  horizontal: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});
