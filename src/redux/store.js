import {persistStore, persistReducer} from 'redux-persist';
import {composeWithDevTools} from 'redux-devtools-extension';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import rootReducers from './reducers';
import immutableTransform from 'redux-persist-transform-immutable';

const persistConfig = {
  key: 'root',
  transforms: [immutableTransform()],
  storage: AsyncStorage,
  blacklist: ['form', 'auth'],
  // Optionally, just specify the keys you DO want stored to persistence.
  // An empty array means 'don't store any reducers' -> infinitered/ignite#409
  whitelist: [],
};

const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? composeWithDevTools({realtime: true})
    : compose;

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducers);

export default () => {
  const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));

  const store = createStore(persistedReducer, enhancer);
  let persistor = persistStore(store);

  // then run the saga
  sagaMiddleware.run(rootSaga);

  return {store, persistor};
};
