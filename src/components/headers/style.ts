import {StyleSheet} from 'react-native';
import {Colors, Fonts, FontSize, smartScale} from '../../theme';

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.green,
    height: smartScale(50),
    paddingHorizontal: smartScale(10),
  },
  txtTitle: {
    flex: 1,
    textAlign: 'center',
    fontFamily: Fonts.fontMedium,
    fontSize: FontSize.Large,
    color: Colors.white,
  },
  rightHeaderIcon: {height: smartScale(30), width: smartScale(30)},
});

export default styles;
