import {StyleSheet} from 'react-native';
import colors from '../../../config/Colors';
import {FONT_REGULAR} from '../../../config/Fonts';
import {smartScale} from '../../../config/Metrics';

const styles = StyleSheet.create({
  txtTitle: {
    color: colors.black,
    fontFamily: FONT_REGULAR,
    fontSize: smartScale(14),
  },
  divider: {
    height: smartScale(1),
    marginTop: smartScale(10),
    backgroundColor: colors.grey,
  },
});

export default styles;
