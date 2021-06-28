import {StyleSheet} from 'react-native';
import {Colors, smartScale} from '../../theme';

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

export default styles;
