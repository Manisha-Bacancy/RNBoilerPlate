import {Dimensions, Platform,PixelRatio} from 'react-native';

export const WINDOW = Dimensions.get('window');
export const deviceType = WINDOW.width < 480 ? 'phone' : 'tablet';
export const aspectRatio = WINDOW.height / WINDOW.width;
export const iPhoneX =
  Platform.OS === 'ios' && (WINDOW.height === 812 || WINDOW.height === 896);

export const smartScale = value => {
  const height =
    Platform.OS === 'ios'
      ? iPhoneX
        ? WINDOW.height - 78
        : WINDOW.height
      : WINDOW.height - 24;
  if (deviceType == 'phone') {
    return (value * height) / 667;
  } else {
    return (value * height) / 667;
  }
};

const screenPaddingValue = iPhoneX ? smartScale(17) : smartScale(26);
export const screenChatPaddingValue = iPhoneX ? smartScale(34) : smartScale(26);
const scalarSpace = iPhoneX ? smartScale(11) : smartScale(13);

export const getWidthByColumn = (column = 1) => {
  const totalPixel = WINDOW.width;
  const totalSpace = screenPaddingValue * 2 + scalarSpace * (column - 1);
  return (totalPixel - totalSpace) / column;
};

export const headerHeight =
  Platform.OS === 'ios'
    ? iPhoneX
      ? smartScale(87)
      : smartScale(65)
    : smartScale(45);

export const fontSizeLarge = smartScale(deviceType == 'phone' ? 20 : 36);
export const fontSizeMedium = smartScale(deviceType == 'phone' ? 14 : 14);
export const fontSizeSmall = smartScale(deviceType == 'phone' ? 14 : 16);
export const fontSizeExtraSmall = smartScale(deviceType == 'phone' ? 10 : 14);
export const fontSizeContent = smartScale(deviceType == 'phone' ? 12 : 14);
export const SupportedOrientations = ['portrait', 'landscape'];


const pixelRatio = PixelRatio.get();
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export const normalize = (size:number) => {
  if (pixelRatio >= 2 && pixelRatio < 3) {
    // iphone 5s and older Androids
    if (deviceWidth < 360) {
      return size * 0.95;
    }

    // iphone 5
    if (deviceHeight < 667) {
      return size;
      // iphone 6-6s
    }

    if (deviceHeight >= 667 && deviceHeight <= 735) {
      return size * 1.15;
    }
    // older phablets
    return size * 1.25;
  }

  if (pixelRatio >= 3 && pixelRatio < 3.5) {
    // catch Android font scaling on small machines
    // where pixel ratio / font scale ratio => 3:3
    if (deviceWidth <= 360) {
      return size;
    }

    // Catch other weird android width sizings
    if (deviceHeight < 667) {
      return size * 1.15;
      // catch in-between size Androids and scale font up
      // a tad but not too much
    }

    if (deviceHeight >= 667 && deviceHeight <= 735) {
      return size * 1.2;
    }

    // catch larger devices
    // ie iphone 6s plus / 7 plus / mi note 等等
    return size * 1.27;
  }

  if (pixelRatio >= 3.5) {
    // catch Android font scaling on small machines
    // where pixel ratio / font scale ratio => 3:3
    if (deviceWidth <= 360) {
      return size;
      // Catch other smaller android height sizings
    }

    if (deviceHeight < 667) {
      return size * 1.2;
      // catch in-between size Androids and scale font up
      // a tad but not too much
    }

    if (deviceHeight >= 667 && deviceHeight <= 735) {
      return size * 1.25;
    }

    // catch larger phablet devices
    return size * 1.4;
  }

  return size;
};


