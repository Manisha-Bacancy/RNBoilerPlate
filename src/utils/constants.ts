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
