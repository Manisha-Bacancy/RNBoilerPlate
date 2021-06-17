import {StyleSheet} from 'react-native';
import colors from '../../config/Colors';
import {smartScale} from '../../config/Metrics';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  safeAreaContainer: {
    flex: 1,
    backgroundColor: colors.green,
  },
  safeAreaBottomeContainer: {
    flex: 0,
    backgroundColor: colors.white,
  },
  indicatorContainer: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  postListContainer: {flex: 1, margin: smartScale(10)},
});

export default styles;
