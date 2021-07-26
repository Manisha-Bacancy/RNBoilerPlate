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

export const getLoginMethod = () => {
  return new Promise(async (resolve, reject) => {
    const isMethod = await AsyncStorage.getItem('method');

    if (isMethod != undefined && isMethod !== null && isMethod !== '') {
      resolve(isMethod);
    } else {
      resolve(null);
    }
  });
};

export const setLoginMethod = async data => {
  if (data != null) {
    try {
      await AsyncStorage.setItem('method', JSON.stringify(data));
    } catch (error) {}
  }
};
