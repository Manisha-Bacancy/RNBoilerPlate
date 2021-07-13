import { PixelRatio, Dimensions ,StyleSheet} from 'react-native';

const ratio = PixelRatio.get();

const normalize = (size:number) => {
  const { width, height } = Dimensions.get('window');
 
  if (ratio >= 2 && ratio < 3) {
    // iphone 5s and older Androids
    if (width < 360) {
      
      return size * 0.95;

    // iphone 5
    } else if (height < 667) {
      return size;
      // iphone 6-6s
    } else if (height >= 667 && height <= 735) {
      return size * 1.15;
    }
    // older phablets
    return size * 1.25;
  } else if (ratio >= 3 && ratio < 3.5) {
    // catch Android font scaling on small machines
    // where pixel ratio / font scale ratio => 3:3
    if (width < 360) {
      return size;
      // Catch other weird android width sizings
    } else if (height < 667) {
      // catch in-between size Androids and scale font up
      // a tad but not too much
      return size * 1.15;
    } else if (height >= 667 && height <= 735) {
      return size * 1.2;
    }
    // catch larger devices
    // ie iphone 6s plus / 7 plus / mi note 等等
    return size * 1.27;
  } else if (ratio >= 3.5) {
     // catch Android font scaling on small machines
    // where pixel ratio / font scale ratio => 3:3
    if (width < 360) {
      return size;
       // Catch other smaller android height sizings
    } else if (height < 667) {
      return size * 1.2;
       // catch in-between size Androids and scale font up
      // a tad but not too much
    } else if (height >= 667 && height <= 735) {
      return size * 1.25;
    }
    // catch larger phablet devices
    return size * 1.4;
  }

  return size;
};

export const create = (
  styles:any,
  targetProperties = [
    'fontSize',
    'margin',
    'marginHorizontal',
    'marginVertical',
    'padding',
    'paddingVertical',
    'paddingHorizontal',
    'height',
  ]
) => {
  const normalizedStyles = {};
  Object.keys(styles).forEach((key) => {
    normalizedStyles[key] = {};
    Object.keys(styles[key]).forEach((property) => {
      if (targetProperties.includes(property)) {
        normalizedStyles[key][property] = normalize(styles[key][property]);
      } else {
        normalizedStyles[key][property] = styles[key][property];
      }
    });
  });

  return StyleSheet.create(normalizedStyles);
};

export default normalize;