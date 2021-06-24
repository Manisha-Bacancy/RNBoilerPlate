import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: false,
  postsDataRes: null,
  postsResError: null,
});
/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  postsRequest: ['data'],
  postsSuccess: ['postsDataRes'],
  postsFailure: ['postsResError'],
});

export const PostsTypes = Types;

export default Creators;

/* ------------- Actions ------------- */

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

/* ------------- Reducers ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  //Login
  [Types.POSTS_REQUEST]: postsRequest,
  [Types.POSTS_SUCCESS]: postsSuccess,
  [Types.POSTS_FAILURE]: postsFailure,
});
