import {combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import ReduxPersist from '../config/ReduxPersist';
import {reducer as formReducer} from 'redux-form';
import {reducer as PostsReducer} from './reducersAndActions/PostsRedux';
import configureStore from './store/CreateStore';
import rootSaga from './sagas';

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  form: formReducer,
  posts: PostsReducer,
});

export default () => {
  let finalReducers = reducers;
  // If rehydration is on use persistReducer otherwise default combineReducers
  if (ReduxPersist.active) {
    const persistConfig = ReduxPersist.storeConfig;
    finalReducers = persistReducer(persistConfig, reducers);
  }

  let {store, sagasManager, sagaMiddleware} = configureStore(
    finalReducers,
    rootSaga,
  );
  const persistor = persistStore(store);
  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('.').reducers;
      store.replaceReducer(nextRootReducer);
      const newYieldedSagas = require('./sagas').default;
      sagasManager.cancel();
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware(newYieldedSagas);
      });
    });
  }

  return {store, persistor};
};
