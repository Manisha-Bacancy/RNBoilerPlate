import {call, put, takeLatest} from 'redux-saga/effects';
import {API} from '../../api';
import PostsActions from './reducer_actions';
import {PostsTypes} from './reducer_actions';

// worker Saga: will be fired on POSTS_REQUEST actions
function* onPosts(api, action) {
  const {data} = action;
  const response = yield call(api.onPosts, data);
  // success?
  if (response.ok) {
    yield put(PostsActions.postsSuccess(response));
  } else {
    yield put(PostsActions.postsFailure(response));
  }
}
export default function* loginSaga() {
  yield takeLatest(PostsTypes.POSTS_REQUEST, onPosts, API.create());
}
