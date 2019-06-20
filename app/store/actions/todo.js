import { createAction } from 'redux-actions';
import {call, put, takeEvery, actionChannel} from 'redux-saga/effects';
import {getMethod, postMethod, putMethod} from '../../utils/api';screenTop
import {apiConfig} from '../../config/config';

import {
  GET_DATA_START,
  GET_DATA_REQUEST,
  GET_DATA_SUCCESS,
  GET_DATA_FAILURE,

  ADD_DATA_START,
  ADD_DATA_REQUEST,
  ADD_DATA_SUCCESS,
  ADD_DATA_FAILURE,

  DELETE_DATA_START,
  DELETE_DATA_REQUEST,
  DELETE_DATA_SUCCESS,
  DELETE_DATA_FAILURE,

  EDIT_DATA_START,
  EDIT_DATA_REQUEST,
  EDIT_DATA_SUCCESS,
  EDIT_DATA_FAILURE
} from '../action_types';

export const getDataStart = createAction(GET_DATA_START);
export const getDataRequest = createAction(GET_DATA_REQUEST);
export const getDataSuccess = createAction(GET_DATA_SUCCESS);
export const getDataFailure = createAction(GET_DATA_FAILURE);

export const addDataStart = createAction(ADD_DATA_START);
export const addDataRequest = createAction(ADD_DATA_REQUEST);
export const addDataSuccess = createAction(ADD_DATA_SUCCESS);
export const addDataFailure = createAction(ADD_DATA_FAILURE);

export const deleteDataStart = createAction(DELETE_DATA_START);
export const deleteDataRequest = createAction(DELETE_DATA_REQUEST);
export const deleteDataSuccess = createAction(DELETE_DATA_SUCCESS);
export const deleteDataFailure = createAction(DELETE_DATA_FAILURE);

export const editDataStart = createAction(EDIT_DATA_START);
export const editDataRequest = createAction(EDIT_DATA_REQUEST);
export const editDataSuccess = createAction(EDIT_DATA_SUCCESS);
export const editDataFailure = createAction(EDIT_DATA_FAILURE);

// GET DATA
function* getData() {
  yield put(getDataRequest());
  try {
    const {response, error} = yield call(getMethod, `${apiConfig('v1')}/task/active/`);
    console.log('response', response);
    if (response) {
      yield put(getDataSuccess(response.data));
    }
    if (error) {
      yield put(getDataFailure(error));
    }
  }
  catch (error) {
    yield put(getDataFailure(error));
  }
}

export function* watchGetData() {
  yield takeEvery(GET_DATA_START, getData)
}


// ADD DATA
function* addData(reqData) {
  yield put(addDataRequest());
  try {
    const {response, error} = yield call(postMethod, `${apiConfig('v1')}/task`, reqData.payload);
    console.log('response', response);
    if (response) {
      yield put(addDataSuccess(response.data));
    }
    if (error) {
      yield put(addDataFailure(error));
    }
  }
  catch (error) {
    yield put(addDataFailure(error));
  }
}

export function* watchAddData() {
  yield takeEvery(ADD_DATA_START, addData)
}


// DELETE DATA
function* deleteData(reqData) {
  yield put(deleteDataRequest());
  try {
    const {response, error} = yield call(putMethod, `${apiConfig('v1')}/task/${reqData.payload.id}`, reqData.payload);
    const isResponse = response !== undefined;
    yield put(deleteDataSuccess({id: reqData.payload.id}));
    if (response) {
      yield put(deleteDataSuccess({id: action.payload.id}));
    }
    if (error) {
      yield put(deleteDataFailure(error));
    }
  }
  catch (error) {
    yield put(deleteDataFailure(error));
  }
}

export function* watchDeleteData() {
  yield takeEvery(DELETE_DATA_START, deleteData)
}


// UPDATE DATA
function* editData(reqData) {
  yield put(editDataRequest());
  try {
    const {response, error} = yield call(putMethod, `${apiConfig('v1')}/task/${reqData.payload.id}`, reqData.payload);
    const isResponse = response !== undefined;
    yield put(editDataSuccess({id: reqData.payload.id}));
    if (response) {
      yield put(editDataSuccess({id: action.payload.id}));
    }
    if (error) {
      yield put(editDataFailure(error));
    }
  }
  catch (error) {
    yield put(editDataFailure(error));
  }
}

export function* watchEditData() {
  yield takeEvery(EDIT_DATA_START, editData)
}