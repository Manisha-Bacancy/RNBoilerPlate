/**
 *
 * LoginScreen saga
 *
 */

import {Alert} from 'react-native';
import {all, call, put, takeLatest, fork, takeEvery} from 'redux-saga/effects';
import * as Actions from './constants';
import {getPosts, loginWithEmail} from './service';

/**
 * Sign In saga
 * @param email
 * @param password
 * @returns {IterableIterator<*>}
 */
export function* signInWithEmailSaga({payload}) {
  const response = yield call(loginWithEmail, payload);
  if (response.status == 200) {
    yield put({type: Actions.LOGIN_SUCCESS, response});
  } else {
    yield put({type: Actions.LOGIN_FAILURE, response});
  }
}

/**
 * Get list post sage REST API
 * @returns {IterableIterator<*>}
 */
function* getPostsSaga() {
  const response = yield call(getPosts);
  console.log('getPostsSaga response:::', response);
  if (response.status == 200) {
    yield put({type: Actions.GET_POSTS_SUCCESS, response});
  } else {
    yield put({type: Actions.GET_POSTS_FAILURE, response});
    //Alert.alert('Error::', response.message);
  }
}

export default function* authSaga() {
  yield takeEvery(Actions.LOGIN_REQUEST, signInWithEmailSaga);
  yield takeEvery(Actions.GET_POSTS_REQUEST, getPostsSaga);
}

//      try {
//          const userDetails = yield call(loginWithEmail, payload);

//          yield put({ type: Actions.LOGIN_SUCCESS, userDetails });
//      } catch (e) {
//  // yield call(handleError, e)
//  yield put({
//     type: Actions.LOGIN_FAILURE,
//     payload: {
//       message: e.message,
//     },
//   });

//  }
