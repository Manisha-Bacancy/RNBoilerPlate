import {all} from 'redux-saga/effects';
import authSaga from '../modules/auth/saga';


export default function* rootSagas() {
  yield all([
    // some sagas only receive an action
    authSaga(),
  ]);
}
