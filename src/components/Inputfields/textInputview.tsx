import React from 'react';
import {Platform, Text, TextInput, View, TouchableOpacity} from 'react-native';
import styles from './style';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  smartScale,
  WINDOW,
  Colors,
  iPhoneX,
  FontSize,
  Fonts,
} from '../../theme';

TextInputView.propTypes = {
  icon: PropTypes.string,
  refProp: PropTypes.any,
  value: PropTypes.string,
  keyboardType: PropTypes.string,
  autoCapitalize: PropTypes.string,
  placeholder: PropTypes.string,
  inputFormat: PropTypes.string,
  autoFocus: PropTypes.any,
  returnKeyType: PropTypes.any,
  numberOfLines: PropTypes.number,
  onChangeText: PropTypes.func,
  onEndEditing: PropTypes.func,
  onSubmitEditing: PropTypes.func,
  onFocus: PropTypes.func,
  title: PropTypes.string,
  errorMessage: PropTypes.string,
  rightLabel: PropTypes.string,
  onBlur: PropTypes.func,
  textInputContainerStyle: PropTypes.any,
  iconStyles: PropTypes.any,
};

TextInputView.defaultProps = {
  icon: null,
  value: null,
  title: null,
  errorMessage: null,
  rightLabel: null,
  keyboardType: 'default',
  autoCapitalize: 'none',
  placeholder: null,
  inputFormat: null,
  returnKeyType: 'next',
  editable: true,
};

export function TextInputView(props) {
  const {
    errorMessage,
    rightLabel,
    title,
    input,
    refProp,
    value,
    keyboardType,
    placeholder,
    selectTextOnFocus,
    onEndEditing,
    onSubmitEditing,
    onFocus,
    onChangeText,
    autoFocus,
    returnKeyType,
    name,
    autoCapitalize,
    editable,
    multiline,
    numberOfLines,
    textInputContainerStyle,
    maxLength,
    inputStyles,
    iconStyles,
    onBlur,
    secureTextEntry,
    placeholderTextColor,
    blurOnSubmit,
    autoCorrect,
    textContentType,
  } = props;
  return (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginTop: errorMessage == null ? smartScale(6) : 0,
      }}>
      {title && (
        <Text
          numberOfLines={1}
          ellipsizeMode={'tail'}
          style={[styles.rowTextView]}>
          {title}
        </Text>
      )}

      <View
        style={[
          styles.textInputField,
          {
            width: rightLabel !== null ? WINDOW.width - 120 : null,
            paddingLeft: smartScale(5),
            marginTop: title ? 0 : 10,
          },
          textInputContainerStyle,
        ]}>
        <View
          style={{flexDirection: 'row', flex: 1, justifyContent: 'flex-start'}}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Icon
              name={props.icon}
              style={[
                {
                  marginLeft: smartScale(5),
                  marginRight: smartScale(5),
                  marginBottom: smartScale(3),
                },
                iconStyles,
              ]}
              size={iPhoneX ? 20 : 18}
              color={'black'}
            />
          </View>

          <TextInput
            style={[
              styles.inputStyle,
              {
                height: 'auto',
                textAlignVertical: 'top',
                textAlign: 'left',
              },
              inputStyles,
            ]}
            {...input}
            name={name}
            ref={refProp}
            keyboardType={keyboardType}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            selectTextOnFocus={selectTextOnFocus}
            secureTextEntry={secureTextEntry}
            placeholderTextColor={
              placeholderTextColor ? placeholderTextColor : '#ccc'
            }
            autoCapitalize={autoCapitalize}
            maxLength={maxLength}
            autoCorrect={autoCorrect}
            textContentType={textContentType}
            underlineColorAndroid={
              Platform.OS === 'android' ? 'transparent' : null
            }
            returnKeyType={returnKeyType}
            ellipsizeMode="tail"
            editable={editable}
            blurOnSubmit={blurOnSubmit}
            multiline={multiline}
            numberOfLines={numberOfLines}
            autoFocus={autoFocus}
            onEndEditing={onEndEditing}
            onFocus={onFocus}
            onBlur={onBlur}
            onSubmitEditing={onSubmitEditing}
          />

          <TouchableOpacity onPress={props.onRightLabelPress}>
            <View style={props.rightLabelContainerStyle}>
              <Text
                numberOfLines={1}
                ellipsizeMode={'tail'}
                style={[
                  props.infoText,
                  {
                    color: 'white',
                    marginLeft: smartScale(15),
                    fontSize: FontSize.MediumAvergage,
                    fontWeight: '400',
                    fontFamily: Fonts.fontRegular,
                    width: WINDOW.width - smartScale(80),
                  },
                ]}>
                {rightLabel}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {errorMessage != null && errorMessage != '' ? (
        <Text
          numberOfLines={1}
          ellipsizeMode={'tail'}
          style={[
            styles.rowTextView,
            {
              textTransform: 'capitalize',
              fontWeight: '400',
              paddingLeft: smartScale(10),
              margin: 0,
            },
          ]}>
          {errorMessage}
        </Text>
      ) : null}
    </View>
  );
}
