import {all} from 'redux-saga/effects';
import {watchGetData, watchAddData, watchDeleteData, watchEditData} from './actions/todo';

export default function* rootSaga() {
  yield all([
    watchGetData(),
    watchAddData(),
    watchDeleteData(),
    watchEditData()
  ])
}