/**
 *
 * LoginScreen saga
 *
 */

import {all, call, put, takeLatest, fork, takeEvery} from 'redux-saga/effects';
import * as Actions from './constants';
import {loginWithEmail} from './service';

/**
 * Sign In saga
 * @param email
 * @param password
 * @returns {IterableIterator<*>}
 */
export function* signInWithEmailSaga({payload}) {
  const response = yield call(loginWithEmail, payload);
  console.log('signInWithEmailSaga response:::', response);
  if (response.status == 200) {
    yield put({type: Actions.LOGIN_SUCCESS, response});
  } else {
    yield put({type: Actions.LOGIN_FAILURE, response});
  }
}

export default function* authSaga() {
  yield takeEvery(Actions.LOGIN_REQUEST, signInWithEmailSaga);
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
