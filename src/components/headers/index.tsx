import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors, Fonts, FontSize, smartScale} from '../../theme';
import styles from './style';

interface Props {
  navigation: any;
  title: string;

  isShadow?: boolean;

  titleColor?: string;
  titleImage?: any;
  titleImageWidth?: number;
  titleAction?: Function;
  titleFontSize?: number;
  titleFont?: string;
  leftRightFontSize?: number;
  leftRightTitleColor?: string;

  backgroundColor?: string;
  height?: number;
  customHeaderBackground?: any;
  iconType?: any;
  iconColor?: string;
  leftButtonType?: string;
  leftTitle?: string;
  leftIcon?: string;
  left2Icon?: string;
  left3Icon?: string;
  leftAction?: Function;
  left2Action?: Function;
  left3Action?: Function;

  rightTitle?: string;
  rightIcon?: string;
  right2Icon?: string;
  right3Icon?: string;
  rightAction?: Function;
  right2Action?: Function;
  right3Action?: Function;

  badgeSize?: number;
  badgeColor?: string;
  badgeFontSize?: number;
  badgeFont?: string;
  badge1Count?: number;
  badge2Count?: number;
  badge3Count?: number;
  badgeTextColor?: string;
}

export const Headers: React.FC<Props> = props => {
  const {
    title,
    navigation,
    isShadow,
    height,
    backgroundColor,
    leftButtonType,
    iconType,
    leftTitle,
    leftIcon,
    leftAction,
    iconColor,
    titleColor,
    titleFontSize,
    titleFont,
    titleImage,
    titleAction,
    titleImageWidth,
    rightTitle,
    rightIcon,
    rightAction,
    badge1Count,

    badgeSize,
    badgeColor,
    badgeTextColor,
    badgeFontSize,
    badgeFont,
    leftRightFontSize,
    leftRightTitleColor,
  } = props;

  const leftButtonsRender = () => {
    return (
      <View
        style={[
          styles.rightButtonRenderContainer,
          {justifyContent: 'flex-start'},
        ]}>
        {renderButton(leftTitle, leftIcon, styles.leftButton, leftAction)}
      </View>
    );
  };

  const titleRender = () => {
    if (title) {
      return (
        <View style={styles.titleTextContainer}>
          <Text
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={{
              color: titleColor,
              fontSize: titleFontSize,
              fontFamily: titleFont,
            }}>
            {title}
          </Text>
        </View>
      );
    } else if (titleImage) {
      return (
        <TouchableOpacity
          style={[styles.titleImageView, {width: titleImageWidth}]}
          onPress={() => titleAction()}>
          <View style={styles.titleImgContainer}>
            <Image style={styles.titleImg} source={titleImage} />
          </View>
        </TouchableOpacity>
      );
    } else {
      return <View style={styles.flexContainer} />;
    }
  };
  const rightButtonsRender = () => {
    return (
      <View
        style={[
          styles.rightButtonRenderContainer,
          {justifyContent: 'flex-end'},
        ]}>
        {renderButton(
          rightTitle,
          rightIcon,
          styles.rightButton,
          rightAction,
          badge1Count,
        )}
      </View>
    );
  };
  const renderButton = (
    title: string,
    icon: any,
    viewStyle: any,
    action: Function,
    badgeCount?: number,
  ) => {
    if (icon) {
      return (
        <View style={[viewStyle]}>
          <TouchableOpacity
            style={[{alignItems: 'center', justifyContent: 'center'}]}
            onPress={() => action()}>
            {iconType == 'image' ? (
              <Image style={styles.iconImg} source={icon} />
            ) : (
              <Icon name={icon} size={30} color={iconColor} />
            )}
          </TouchableOpacity>

          {renderBadge(badgeCount)}
        </View>
      );
    } else if (title) {
      return (
        <View style={[viewStyle]}>
          <Text
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={{
              color: leftRightTitleColor,
              fontSize: leftRightFontSize,
              fontFamily: titleFont,
            }}>
            {title}
          </Text>
        </View>
      );
    } else {
      return <View style={{height: smartScale(30), width: smartScale(30)}} />;
    }
  };
  const renderBadge = (badgeCount: number) => {
    if (badgeCount > 0) {
      return (
        <View
          style={[
            styles.badgeContainer,
            {
              minWidth: badgeSize,
              height: badgeSize,
              borderRadius: badgeSize / 2,
              backgroundColor: badgeColor,
              shadowColor: badgeColor,
              borderWidth: 2,
              borderColor: Colors.red,
            },
          ]}>
          <Text
            style={{
              color: badgeTextColor,
              fontSize: badgeFontSize,
              fontFamily: badgeFont,
            }}
            numberOfLines={1}>
            {badgeCount}
          </Text>
        </View>
      );
    } else {
      return null;
    }
  };
  return (
    <View
      style={[
        isShadow ? styles.shadowView : styles.normalView,
        {height: height, backgroundColor: backgroundColor},
      ]}>
      {leftButtonsRender()}
      {titleRender()}
      {rightButtonsRender()}

      {/*  <Icon
        onPress={() => navigation.openDrawer()}
        name="md-menu"
        size={30}
        color={Colors.white}
      />
      <Text style={styles.txtTitle}>{title}</Text>
      <View style={styles.rightHeaderIcon} /> */}
    </View>
  );
};
Headers.defaultProps = {
  isShadow: false,

  titleColor: Colors.white,
  titleFontSize: FontSize.Largest,
  titleFont: Fonts.fontRegular,
  titleImageWidth: smartScale(120),
  titleImage: '',

  backgroundColor: Colors.green,
  height: smartScale(60),
  iconColor: Colors.white,
  leftTitle: '',
  leftButtonType: '',
  leftIcon: '',
  left2Icon: '',
  left3Icon: '',
  rightTitle: '',
  rightIcon: '',
  right2Icon: '',
  right3Icon: '',

  badgeSize: smartScale(17),
  badgeColor: Colors.primaryColor,
  badge1Count: 0,
  badge2Count: 0,
  badge3Count: 0,
  badgeTextColor: Colors.white,
  badgeFontSize: FontSize.MediumAvergage,
  badgeFont: Fonts.fontSemiBold,
  leftRightFontSize: FontSize.MediumLarge,
  leftRightTitleColor: Colors.white,
};
