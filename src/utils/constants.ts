import {
  Dimensions,
  Platform,
  Alert,
  BackHandler,
  StatusBar,
} from 'react-native';
export const NETWORK_ERROR_MSG = 'Network not available.';
//regex
export const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const WEBSITE_REGEX =
  /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
export const NO_SPACE_REGEX = /^\S+$/;
export const NUMBER_REGEX = /^\d+$/;
export const TEXT_REGEX = /^[A-Za-z  ']*$/;
export const ONLY_NUMBER_REGEX = /^[0-9]+$/;
export const NAME_REGEX = /^[a-zA-Z].[\s\.]$/g;
export const FULL_NAME_REGEX = /^[a-zA-Z](?:[ '’.\-a-zA-Z]*[a-zA-Z])?$/;
export const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
export const SUPPORTED_OPRATIONS = ['portrait', 'landscape'];
export const CHAT_APP_ID = '6A167B0A-7374-47B0-9A7D-C581CA592D4A';

export const isStringIncludeEmoji = str => {
  var ranges = [
    '(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])', // U+1F680 to U+1F6FF
  ];
  if (str != undefined) {
    if (str.match(ranges.join('|'))) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
