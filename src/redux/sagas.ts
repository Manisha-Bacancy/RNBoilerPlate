import {all} from 'redux-saga/effects';
import loginSaga from '../screens/home/saga';

export default function* root() {
  yield all([
    // some sagas only receive an action
    //takeLatest(PostsTypes.POSTS_REQUEST, onPosts, api),
    loginSaga(),
  ]);
}
