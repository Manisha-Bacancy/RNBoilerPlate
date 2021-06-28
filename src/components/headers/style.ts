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

  normalView: {
    width: '100%',
    height: smartScale(60),
    alignItems: 'center',
    flexDirection: 'row',
  },

  shadowView: {
    width: '100%',
    height: smartScale(60),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    zIndex: 1,
  },
  leftButtonRenderContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  leftButton: {
    marginLeft: smartScale(10),
  },
  titleTextContainer: {
    marginLeft: smartScale(10),
    marginRight: smartScale(10),
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.8,
  },
  titleImageView: {
    height: '100%',
    backgroundColor: 'transparent',
    marginLeft: smartScale(10),
    marginRight: smartScale(10),
    paddingTop: smartScale(5),
    paddingBottom: smartScale(5),
  },
  titleImgContainer: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  titleImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  flexContainer: {flex: 1},
  rightButtonRenderContainer: {
    flex: 0.3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightButton: {
    marginRight: smartScale(10),
  },
  iconButtonContainer: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    margin: 0,
  },
  iconImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  badgeContainer: {
    position: 'absolute',
    top: -4,
    right: -4,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 4,
    overflow: 'hidden',
  },
});

export default styles;
