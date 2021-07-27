/**
* Created by bavv on 26/06/2020
* Copyright (c) 2020 bavv
*/

'use strick';

import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';
import { createLogger } from 'redux-logger';
import reducer from './reducers';
import sagas from './sagas';

const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

var logger = createLogger({
  predicate: () => isDebuggingInChrome,
  collapsed: true,
  duration: true
})

const sagaMiddleware = createSagaMiddleware();

export default configureStore = (onCompletion = () => { }) => {
  const store = createStore(
    reducer,
    undefined,
    compose(
      applyMiddleware(sagaMiddleware, logger)
    )
  );

  persistStore(
    store,
    undefined,
    onCompletion
  );

  sagaMiddleware.run(sagas);

  return store;
}

