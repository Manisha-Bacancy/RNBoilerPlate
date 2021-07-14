import * as Actions from './constants';
type Action = {type: string, payload: Object};

/**
 * Action login
 * @param email
 * @param password
 * @returns {{type: string, email: *, password: *}}
 */
export function signInWithEmail(loginParams): Action {
  return {
    type: Actions.LOGIN_REQUEST,
    payload: loginParams,
  };
}


/**
 * Get post rest api
 * @returns {{type: string, payload: *}}
 */
 export function getPosts() :Action{
  return {
    type: Actions.GET_POSTS_REQUEST,
    payload: true,
  };
}

export function resetError() :Action{
  return {
    type: Actions.RESET_ERROR,
    payload: true,
  };
}