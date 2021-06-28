import {StyleSheet} from 'react-native';
import {Colors, Fonts, FontSize, smartScale} from '../../theme';

export default StyleSheet.create({
  buttonStyle: {
    backgroundColor: Colors.buttonColor,
    width: '90%',
    alignSelf: 'center',
    height: smartScale(45),
    borderRadius: smartScale(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextStyle: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: FontSize.MediumLarge,
    fontFamily: Fonts.fontMedium,
    fontWeight: 'bold',
  },
});
