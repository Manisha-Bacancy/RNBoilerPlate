import {Dimensions, Platform} from 'react-native';

export const WINDOW = Dimensions.get('window');
export const deviceType = WINDOW.width < 480 ? 'phone' : 'tablet';

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
