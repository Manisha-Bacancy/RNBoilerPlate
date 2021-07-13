import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import authReducer from '../modules/auth/reducer';


/**
 * Root reducer
 * @type {Reducer<any> | Reducer<any, AnyAction>}
 */

export const rootReducers = combineReducers({
  form: formReducer,
  auth:authReducer
});




export default rootReducers;
