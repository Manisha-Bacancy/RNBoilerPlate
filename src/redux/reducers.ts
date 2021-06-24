import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {reducer as PostsReducer} from '../screens/home/reducer_actions';
/**
 * You can import more reducers here
 */
/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  form: formReducer,
  posts: PostsReducer,
});
