import {persistStore, persistReducer} from 'redux-persist';
import configureStore from './store';
import rootSaga from './sagas';
import {reducers} from './reducers';
import {REDUX_PERSIST} from '../config';

export default () => {
  let finalReducers = reducers;
  // If rehydration is on use persistReducer otherwise default combineReducers
  if (REDUX_PERSIST.active) {
    const persistConfig = REDUX_PERSIST.storeConfig;
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
