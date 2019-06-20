import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'
import reducer from './combined_reducers';
import rootSaga from './root_saga';

const sagaMiddleware = createSagaMiddleware();
const createStoreWithMiddleware = applyMiddleware(sagaMiddleware)(createStore);

const NODE_ENV = 'DEVELOPMENT';
let store;
if (NODE_ENV === 'DEVELOPMENT') {
  const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__ || compose;
  store = createStoreWithMiddleware(
    reducer,
    composeEnhancer()
  );
}
else {
  store = createStoreWithMiddleware(
    reducer
  );
}

sagaMiddleware.run(rootSaga);

export default store;
