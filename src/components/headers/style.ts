import {StyleSheet} from 'react-native';
import colors from '../../config/Colors';
import {FONT_SEMI_BOLD} from '../../config/Fonts';
import {smartScale} from '../../config/Metrics';

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.green,
    height: smartScale(50),
    paddingHorizontal: smartScale(10),
  },
  txtTitle: {
    flex: 1,
    textAlign: 'center',
    fontFamily: FONT_SEMI_BOLD,
    fontSize: smartScale(15),
    color: colors.white,
  },
  rightHeaderIcon: {height: smartScale(30), width: smartScale(30)},
});

export default styles;
