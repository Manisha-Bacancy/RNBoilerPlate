import React, {FC} from 'react';
import {
  View,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Platform,
} from 'react-native';

const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

interface MyStatusBarProps {
  backgroundColor: string;
  barStyle?: any;
}

export const MyStatusBar: FC<MyStatusBarProps> = ({
  backgroundColor,
  barStyle,
}) => (
  <View style={[styles.statusBar, {backgroundColor}]}>
    <SafeAreaView>
      <StatusBar barStyle={barStyle} backgroundColor={backgroundColor} />
    </SafeAreaView>
  </View>
);
MyStatusBar.defaultProps = {
  barStyle: 'light-content',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  appBar: {
    backgroundColor: '#79B45D',
    height: APPBAR_HEIGHT,
  },
  content: {
    flex: 1,
    backgroundColor: '#33373B',
  },
});
