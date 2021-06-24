import {smartScale} from './metrics';

const Fonts = {
  fontSemiBold: 'Poppins-SemiBold',
  fontMedium: 'Poppins-medium',
  fontRegular: 'Poppins-Regular',
};
const FontSize = {
  Smallest: smartScale(7),
  Smallest1: smartScale(8),
  Small: smartScale(9),
  Average: smartScale(11),
  MediumAvergage: smartScale(12),
  Normal: smartScale(13),
  MediumLarge: smartScale(14),
  Large: smartScale(15),
  VeryLarge: smartScale(17),
  Largest: smartScale(19),
  Largest1: smartScale(21),
  Largest2: smartScale(24),
  Largest3: smartScale(30),
  ExtraLarge: smartScale(49),
};
export {Fonts, FontSize};
