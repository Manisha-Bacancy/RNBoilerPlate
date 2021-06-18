/* ***********************************************************
 * A short word on how to use this automagically generated file.
 * We're often asked in the Infinite Red Slack channel how to connect
 * to a to a third party api, so we thought we'd demonstrate - but
 * you should know you can use sagas for other flow control too.
 *
 * Other points:
 *  - You'll need to add this saga to sagas/index.js
 *  - This template uses the api declared in sagas/index.js, so
 *    you'll need to define a constant in that file.
 *************************************************************/

import {call, put} from 'redux-saga/effects';
import PostsActions from '../reducersAndActions/PostsRedux';

/* Login Auth */

// worker Saga: will be fired on POSTS_REQUEST actions
export function* onPosts(api, action) {
  const {data} = action;
  // get current data from Store
  // const currentData = yield select(AuthSelectors.getData)
  // make the call to the api
  const response = yield call(api.onPosts, data);
  // success?
  if (response.ok) {
    yield put(PostsActions.postsSuccess(response));
  } else {
    yield put(PostsActions.postsFailure(response));
  }
}
