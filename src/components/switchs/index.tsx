import React, {ReactNode} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors, Fonts, FontSize, smartScale} from '../../theme';
import styles from './style';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';
import {Switch} from 'react-native-switch';

interface IProps {
  navigation?: any;
  onValueChange?: (value: boolean) => void;
  disabled?: boolean;
  activeText?: string;
  inActiveText?: string;
  backgroundActive?: string;
  backgroundInactive?: string;
  value?: boolean;
  circleActiveColor?: string;
  circleInActiveColor?: string;
  circleSize?: number;
  circleBorderActiveColor?: string;
  circleBorderInactiveColor?: string;
  activeTextStyle?: StyleProp<TextStyle>;
  inactiveTextStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  barHeight?: number;
  circleBorderWidth?: number;
  renderInsideCircle?: () => ReactNode;
  changeValueImmediately?: boolean;
  innerCircleStyle?: StyleProp<ViewStyle>;
  outerCircleStyle?: StyleProp<ViewStyle>;
  renderActiveText?: boolean;
  renderInActiveText?: boolean;
  switchLeftPx?: number;
  switchRightPx?: number;
  switchWidthMultiplier?: number;
  switchBorderRadius?: number;
}

export const CustomSwitch: React.FC<IProps> = props => {
  const {
    value,
    activeText,
    onValueChange,
    disabled,
    inActiveText,
    backgroundActive,
    backgroundInactive,
    circleActiveColor,
    circleInActiveColor,
    circleBorderActiveColor,
    circleBorderInactiveColor,
    circleSize,
    barHeight,
    circleBorderWidth,
    changeValueImmediately,
    innerCircleStyle,
    outerCircleStyle,
    renderActiveText,
    renderInActiveText,
    switchLeftPx,
    switchRightPx,
    switchWidthMultiplier,
    switchBorderRadius,
    inactiveTextStyle,
    activeTextStyle,
    containerStyle,
  } = props;
  return (
    <View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        activeText={activeText}
        inActiveText={inActiveText}
        circleSize={circleSize}
        barHeight={barHeight}
        backgroundActive={backgroundActive}
        backgroundInactive={backgroundInactive}
        circleActiveColor={circleActiveColor}
        circleInActiveColor={circleInActiveColor}
        changeValueImmediately={changeValueImmediately} // if rendering inside circle, change state immediately or wait for animation to complete
        innerCircleStyle={innerCircleStyle} // style for inner animated circle for what you (may) be rendering inside the circle
        outerCircleStyle={outerCircleStyle} // style for outer animated circle
        renderActiveText={renderActiveText}
        renderInActiveText={renderInActiveText}
        switchLeftPx={switchLeftPx} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
        switchRightPx={switchRightPx} // de5nominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
        switchWidthMultiplier={switchWidthMultiplier} // multiplied by the `circleSize` prop to calculate total width of the Switch
        switchBorderRadius={switchBorderRadius}
        activeTextStyle={activeTextStyle}
        inactiveTextStyle={inactiveTextStyle}
        containerStyle={containerStyle}
      />
    </View>
  );
};

CustomSwitch.defaultProps = {
  value: false,
  onValueChange: () => null,
  renderInsideCircle: () => null,

  disabled: false,
  activeText: 'On',
  inActiveText: 'Off',
  backgroundActive: 'green',
  backgroundInactive: 'gray',
  circleActiveColor: 'white',
  circleInActiveColor: 'white',
  circleBorderActiveColor: 'rgb(100, 100, 100)',
  circleBorderInactiveColor: 'rgb(80, 80, 80)',
  circleSize: 30,
  barHeight: null,
  circleBorderWidth: 1,
  changeValueImmediately: true,
  innerCircleStyle: {alignItems: 'center', justifyContent: 'center'},
  outerCircleStyle: {},
  renderActiveText: true,
  renderInActiveText: true,
  switchLeftPx: 2,
  switchRightPx: 2,
  switchWidthMultiplier: 2,
  switchBorderRadius: null,
};
