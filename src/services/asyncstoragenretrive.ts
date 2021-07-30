import AsyncStorage from '@react-native-async-storage/async-storage';

export const onSignOut = () => AsyncStorage.removeItem('AUTH_TOKEN');
export const isLogout = () => AsyncStorage.removeItem('isLogin');

export const isSignedIn = () => {
  return new Promise(async (resolve, reject) => {
    //const value = await AsyncStorage.getItem('AUTH_TOKEN');
    const isLogin = await AsyncStorage.getItem('isLogin');

    //if (value != undefined && value !== null && value !== '') {
    if (isLogin != undefined && isLogin !== null && isLogin !== '') {
      resolve(true);
    } else {
      resolve(false);
    }
    // } else {
    //   resolve(false);
    // }
  });
};

export const setIsLogin = async data => {
  if (data != null) {
    try {
      await AsyncStorage.setItem('isLogin', JSON.stringify(data));
    } catch (error) {}
  }
};

/**
 * To save the user info to async storage
 */
export const setUserData = async data => {
  if (data != null) {
    try {
      await AsyncStorage.setItem('USER_INFO', JSON.stringify(data));
    } catch (error) {}
  }
};

/**
 * Retrive the user info from async storage
 */

export const getUserData = async () => {
  try {
    const data = await AsyncStorage.getItem('USER_INFO');
    if (data !== null) {
      return JSON.parse(data);
    }
  } catch (error) {
    return '';
  }
};
