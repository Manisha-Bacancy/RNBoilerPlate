import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Platform,
  StyleSheet,
} from 'react-native';
import {MyStatusBar} from '../../components';
import {setIsLogin} from '../../services';
import {Colors, Images, smartScale} from '../../theme';
import {signInWithEmail} from '../../modules/auth/actions';

import Config from 'react-native-config';
import I18n from '../../I18n/I18n';
import {
  reduxForm,
  formValueSelector,
  InjectedFormProps,
  FormProps,
} from 'redux-form';
import {useDispatch, useSelector} from 'react-redux';
import {EMAIL_REGEX, isStringIncludeEmoji} from '../../utils/constants';
import {Button} from '../../components';
import {connect} from 'react-redux';
import {InputField} from '../../components/Inputfields';
interface IProps {
  navigation: any;
  email: string;
  password: string;
  handleSubmit: any;
  form: any;
  validate: any;
  initialValues: any;
  change: Function;
}

type Props = IProps & InjectedFormProps<any, {}, string>;

const Login = (props: any) => {
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const [isVisiblePassword, setIsVisiblePassword] = useState(true);
  const dispatch = useDispatch();

  const {handleSubmit} = props;
  const goHome = () => {
    setIsLogin(true);
    props.navigation.reset({
      routes: [{name: 'SignedInStack'}],
    });
  };

  useEffect(() => {
    props.change('email', 'test@yopmail.com');
    props.change('password', 'Test@123');
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <View style={styles.textInputContainer}>
            <InputField
              placeholder={I18n.t('login.email')}
              refProp={emailInputRef}
              style={styles.textInputStyle}
              name="email"
              returnKeyType={'next'}
              autoCapitalize="none"
              keyboardType={'email-address'}
              ellipsizeMode="tail"
              numberOfLines={1}
              onEndEditing={() => {
                passwordInputRef.current.isFocused();
              }}
              onSubmitEditing={() => passwordInputRef.current.focus()}
              containerStyle={styles.textInputContainerStyle}
            />
            <InputField
              placeholder={I18n.t('login.password')}
              refProp={passwordInputRef}
              style={styles.textInputStyle}
              name="password"
              returnKeyType={'done'}
              ellipsizeMode="tail"
              numberOfLines={1}
              containerStyle={styles.passwordContainerStyle}
              rightSideComponent={
                <Image
                  source={
                    !isVisiblePassword
                      ? Images.icons.eye
                      : Images.icons.eyeclose
                  }
                  style={styles.passwordShowHideImgStyle}
                  resizeMode="contain"
                />
              }
              rightIcon={() => {
                setIsVisiblePassword(!isVisiblePassword);
              }}
              secureTextEntry={isVisiblePassword}
            />
          </View>
          <Button
            buttonText={I18n.t('login.btnLogin')}
            onPress={handleSubmit(goHome)}
            buttonStyles={styles.buttonStyle}
          />
        </View>
        <View style={styles.forgotPwdContainer}>
          <TouchableOpacity
            style={styles.marginTo20Style}
            onPress={() => props.navigation.navigate('ForgotPassword')}>
            <Text>{'Forgot Password?'}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.marginTo20Style}
            onPress={() => props.navigation.navigate('Signup')}>
            <Text>{"Don't have an account ? Signup"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const initialState = {
  email: '',
  password: '',
};
const validate = values => {
  const errors: any = {};
  errors.email = !values.email
    ? 'Email is required'
    : isStringIncludeEmoji(values.email)
    ? 'Email Invalid'
    : !EMAIL_REGEX.test(values.email)
    ? 'Email Invalid'
    : undefined;

  errors.password = !values.password ? 'Password is required' : undefined;
  return errors;
};

const DecoratedSampleForm = reduxForm({
  form: 'loginForm',
  validate,
  initialValues: initialState,
  enableReinitialize: true,
})(Login);

// Decorate with connect to read form values
const selector = formValueSelector('loginForm'); // <-- same as form name
export default connect(state => {
  // or together as a group
  const {email, password} = selector(state, 'email', 'password');
  return {
    email,
    password,
  };
})(DecoratedSampleForm);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: smartScale(20),
    backgroundColor: Colors.white,
  },
  safeAreaContainer: {flex: 1, backgroundColor: Colors.white},
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textInputContainer: {marginTop: smartScale(80)},
  textInputStyle: {marginLeft: smartScale(-4)},
  textInputContainerStyle: {marginBottom: smartScale(5)},
  passwordContainerStyle: {marginTop: smartScale(10)},
  passwordShowHideImgStyle: {
    height: smartScale(25),
    width: smartScale(25),
    tintColor: Colors.grey,
  },
  buttonStyle: {
    shadowColor: Colors.buttonColor,
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,
    elevation: 19,
  },
  forgotPwdContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  marginTo20Style: {marginTop: smartScale(20)},
});
