import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {REDUX_PERSIST} from '../config';

// creates the store
export default (rootReducer, rootSaga) => {
  /* ------------- Redux Configuration ------------- */

  const middleware = [];
  const enhancers = [];

  /* ------------- Saga Middleware ------------- */

  const sagaMonitor = null;
  //1.create the saga middleware
  const sagaMiddleware = createSagaMiddleware({sagaMonitor});
  middleware.push(sagaMiddleware);

  /* ------------- Assemble Middleware ------------- */

  enhancers.push(applyMiddleware(...middleware));

  // if Reactotron is enabled (default for __DEV__), we'll create the store through Reactotron
  //2. mount it on the Store
  const createAppropriateStore = createStore;
  // if (Config.useReactotron) {
  //   enhancers.push(Reactotron.createEnhancer())
  // }
  const store = createAppropriateStore(rootReducer, compose(...enhancers));

  // configure persistStore and check reducer version number
  if (REDUX_PERSIST.active) {
    //Rehydration.updateReducers(store)
  }

  // 3. then run the saga
  let sagasManager = sagaMiddleware.run(rootSaga);
  //render the application
  return {
    store,
    sagasManager,
    sagaMiddleware,
  };
};
