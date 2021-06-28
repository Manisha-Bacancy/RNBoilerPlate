import {Platform, StyleSheet} from 'react-native';
import {
  aspectRatio,
  Colors,
  Fonts,
  fontSizeMedium,
  smartScale,
  WINDOW,
} from '../../theme';

export default StyleSheet.create({
  itemInputField: {
    borderBottomColor: Colors.grey,
    borderBottomWidth: 1,
    height: smartScale(40),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textInputField: {
    paddingLeft: smartScale(10),
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey,
    height: smartScale(40),
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  rowTextView: {
    color: Colors.titleColor,
    paddingTop: smartScale(5),
    paddingBottom: smartScale(5),
    fontSize: smartScale(17),
    textTransform: 'none',
    width: WINDOW.width - smartScale(80),
  },
  inputStyle: {
    height: smartScale(40),
    width: '90%',
    color: 'black',
    fontSize: fontSizeMedium,
    letterSpacing: 0.5,
    paddingLeft: smartScale(5),
    paddingBottom: 0,
    marginTop:
      aspectRatio < 1.7
        ? Platform.OS == 'android'
          ? smartScale(-4)
          : smartScale(-10)
        : smartScale(0),
  },
  placeholder: {
    letterSpacing: 0.5,
    color: Colors.placeholderTextColor,
    fontSize: fontSizeMedium,
  },
  infoInputRaw: {
    flexDirection: 'row',
  },
  errorInputRaw: {
    flex: 1,
    paddingLeft: smartScale(2),
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  errorText: {
    color: Colors.error,
    fontFamily: Fonts.fontRegular,
    fontSize: smartScale(14),
  },
  infoRaw: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  infoText: {
    fontSize: smartScale(12),
    color: Colors.infoText,
    marginTop: smartScale(6),
  },
});
