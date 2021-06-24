import {StyleSheet} from 'react-native';
import {Colors, Fonts, smartScale} from '../../theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: smartScale(46),

    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  safeAreaBottomContainer: {
    flex: 0,
    backgroundColor: Colors.white,
  },
  tabMainStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    fontFamily: Fonts.fontMedium,
    fontSize: smartScale(12),
    marginVertical: smartScale(3),
  },
});

export default styles;
