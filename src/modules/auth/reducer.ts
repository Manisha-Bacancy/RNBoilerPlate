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
  posts: [],
  friendList: [],
};

export const authReducer = (state: any = initState, action: any) => {
  const {type} = action;
  switch (type) {
    case Actions.LOGIN_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
        user: null,
      };

    case Actions.LOGIN_SUCCESS:
      return {
        ...state,
        error: null,
        user: action.response.data.data,
        loading: false,
      };
    case Actions.LOGIN_FAILURE:
      return {
        ...state,
        user: null,
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

    case Actions.GET_FRIENDS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        friendList: [],
      };

    case Actions.GET_FRIENDS_SUCCESS:
      return {
        ...state,
        friendList: action.response.data.data.friendList,
        error: null,
        loading: false,
      };
    case Actions.GET_FRIENDS_FAILURE:
      return {
        ...state,
        friendList: [],
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
