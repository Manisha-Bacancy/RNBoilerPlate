import * as Actions from './constants';

/**
 * Action login
 * @param username
 * @param password
 * @returns {{type: string, username: *, password: *}}
 */
export function signInWithEmail(loginParams:any) {
  return {
    type: Actions.LOGIN_REQUEST,
    payload: loginParams,
  };
}