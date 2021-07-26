/**
 *
 * LoginScreen reducer
 *
 */

import * as Actions from './constants';

const initState = {
  loading: false,
  user: null,
  error: null,
};

export const authReducer = (state: any = initState, action: any) => {
  const {type} = action;
  switch (type) {
    case Actions.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case Actions.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.response.data.data,
        loading: false,
      };
    case Actions.LOGIN_FAILURE:
      return {
        ...state,
        error:
          action.response.data != undefined ? action.response.data.message : '',
        loading: false,
      };

    case Actions.GET_POSTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case Actions.GET_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.response.data,
        error: null,
        loading: false,
      };
    case Actions.GET_POSTS_FAILURE:
      return {
        ...state,
        error:
          action.response.message != undefined ? action.response.message : '',
        loading: false,
      };
    case Actions.RESET_ERROR:
      return {
        ...state,
        error: null,
        loading: false,
      };
    default:
      return state;
  }
};

export default authReducer;
