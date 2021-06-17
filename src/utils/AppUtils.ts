export const NETWORK_ERROR_MSG = 'Network not available.';
//regex
export const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const webSiteRegex =
  /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
export const noSpace = /^\S+$/;
export const numberRegex = /^\d+$/;
export const textRegex = /^[A-Za-z  ']*$/;
export const onlyNumberRegex = /^[0-9]+$/;
export const nameRegex = /^[a-zA-Z].[\s\.]$/g;
export const fullNameRegex = /^[a-zA-Z](?:[ '’.\-a-zA-Z]*[a-zA-Z])?$/;
export const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
