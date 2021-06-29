import {StyleSheet} from 'react-native';
import {Colors, smartScale} from '../../theme';

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
    backgroundColor: Colors.red,
  },
  webviewstyle: {
    backgroundColor: 'transparent',
  },
  innerCircleStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 63,
    height: 30,
    borderWidth: 1,
    borderRadius: 10,
  },
  activeTextStyle: {
    color: Colors.green,
    paddingRight: smartScale(13),
    fontSize: smartScale(15),
  },
  inactiveTextStyle: {
    color: Colors.grey,
    paddingLeft: smartScale(13),
    fontSize: smartScale(15),
  },
});

export default styles;
