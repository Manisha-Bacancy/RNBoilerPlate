import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './style';

interface Props {
  navigation?: any;
  title?: string;
  onPress: Function;
  activeOpacity?: number;
  buttonStyles?: any;
  buttonTextStyles?: any;
  buttonViewStyle?: any;
  buttonText: string;
}
export const Button: React.FC<Props> = props => {
  const {
    onPress,
    activeOpacity,
    buttonStyles,
    buttonTextStyles,
    buttonViewStyle,
    buttonText,
  } = props;
  return (
    <TouchableOpacity
      {...props}
      style={Object.assign([styles.buttonStyle, buttonStyles])}
      onPress={() => onPress()}
      activeOpacity={activeOpacity}>
      <View>
        <Text style={Object.assign([styles.buttonTextStyle, buttonTextStyles])}>
          {buttonText}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
