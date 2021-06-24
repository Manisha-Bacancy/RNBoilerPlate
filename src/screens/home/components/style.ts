import {StyleSheet} from 'react-native';
import {Colors, Fonts, FontSize, smartScale} from '../../../theme';

const styles = StyleSheet.create({
  txtTitle: {
    color: Colors.black,
    fontFamily: Fonts.fontMedium,
    fontSize: FontSize.MediumLarge,
  },
  divider: {
    height: smartScale(1),
    marginTop: smartScale(10),
    backgroundColor: Colors.grey,
  },
});

export default styles;
