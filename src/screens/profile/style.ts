import {StyleSheet} from 'react-native';
import colors from '../../config/Colors';

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
});

export default styles;
