import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  // login
  postsRequest: ['data'],
  postsSuccess: ['postsDataRes'],
  postsFailure: ['postsResError'],
});

export const PostsTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  postsDataRes: null,
  postsResError: null,
});

/* ------------- Selectors ------------- */

export const PostsSelectors = {
  getData: state => state.data,
};

/* ------------- Reducers ------------- */

// postsRequest
export const postsRequest = (state, {data}) => {
  return state.merge({
    fetching: true,
    data,
    postsDataRes: null,
    postsResError: null,
  });
};

export const postsSuccess = (state, action) => {
  const {postsDataRes} = action;
  return state.merge({
    fetching: false,
    postsResError: null,
    postsDataRes: postsDataRes.data,
  });
};

export const postsFailure = (state, action) => {
  const {postsResError} = action;
  return state.merge({
    fetching: false,
    postsResError: postsResError.data,
    error: postsResError.data.message,
    postsDataRes: null,
  });
};

/* reducer  */
export const reducer = createReducer(INITIAL_STATE, {
  //Login
  [Types.POSTS_REQUEST]: postsRequest,
  [Types.POSTS_SUCCESS]: postsSuccess,
  [Types.POSTS_FAILURE]: postsFailure,
});
