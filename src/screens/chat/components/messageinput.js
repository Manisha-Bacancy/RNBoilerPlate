import React from 'react';
import {
  View,
  TextInput,
  Dimensions,
  Platform,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Colors, Fonts, FontSize, smartScale} from '../../../theme';
import Icon from 'react-native-vector-icons/Ionicons';
import I18n from '../../../I18n/I18n';

export const MessageInput = props => {
  return (
    <View style={styles.containerStyle}>
      <View style={styles.inputViewStyle}>
        <TextInput
          style={styles.inputViewContaibner}
          placeholder={I18n.t('chat.writeAMsg')}
          autoCapitalize="none"
          autoCorrect={false}
          selectionColor={'#212529'}
          underlineColorAndroid="transparent"
          value={props.textMessage}
          multiline={true}
          onChangeText={props.onChangeText}
          disableFullscreenUI={true}
        />
      </View>
      <TouchableOpacity
        onPress={props.onRightPress}
        style={styles.btnSendContainer}>
        <Icon name={'send'} size={smartScale(12)} color={Colors.white} />
        {/*  <Image source={Images.chat.btnSend} style={styles.imgSend} /> */}
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  containerStyle: {
    flexDirection: 'row',

    borderWidth: 1,
    alignItems: 'center',
    borderRadius: smartScale(10),
    borderColor: '#C8D1D3',
    paddingLeft: smartScale(10),
    paddingRight: smartScale(10),
  },
  btnSendContainer: {
    height: smartScale(32),
    width: smartScale(32),
    borderRadius: smartScale(32) / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.green,
  },
  imgSend: {
    height: smartScale(12),
    width: smartScale(15),
    resizeMode: 'contain',
    alignSelf: 'center',
  },

  margin10Style: {
    marginLeft: smartScale(10),
  },
  inputViewStyle: {
    flex: 1,
    minHeight: smartScale(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconStyle: {
    padding: smartScale(10),
  },
  inputStyle: {
    fontSize: FontSize.Normal,
    backgroundColor: '#fff',
  },
  inputViewContaibner: {
    fontFamily: Fonts.fontRegular,
    fontSize: smartScale(16),
    padding: smartScale(5),

    ...Platform.select({
      android: {
        width: '100%',
        //width: width - 100,
      },
      ios: {
        paddingTop: 0,
        width: '100%',
        //width: width - 100,
      },
    }),
  },
};
