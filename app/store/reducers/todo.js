import ip from 'icepick';
import {
  GET_DATA_REQUEST,
  GET_DATA_SUCCESS,
  GET_DATA_FAILURE,

  ADD_DATA_REQUEST,
  ADD_DATA_SUCCESS,
  ADD_DATA_FAILURE,

  DELETE_DATA_REQUEST,
  DELETE_DATA_SUCCESS,
  DELETE_DATA_FAILURE,

  EDIT_DATA_REQUEST,
  EDIT_DATA_SUCCESS,
  EDIT_DATA_FAILURE
} from '../action_types'

const initialState = ip.freeze({
  notes: {
    apiStatus: null,
    apiError: null,
    data: null
  },
  add: {
    apiStatus: null,
    apiError: null,
    data: null
  },
  delete: {
    apiStatus: null,
    apiError: null,
    data: null
  },
  edit: {
    apiStatus: null,
    apiError: null,
    data: null
  }
});

export default function (state = initialState, action) {
  switch (action.type) {

    case GET_DATA_REQUEST: {
      state = ip.setIn(state, ['notes', 'apiStatus'], 'started');
      state = ip.setIn(state, ['notes', 'apiError'], null);
      return state;
    }

    case GET_DATA_SUCCESS: {
      state = ip.setIn(state, ['notes', 'apiStatus'], 'success');
      state = ip.setIn(state, ['notes', 'apiError'], null);
      state = ip.setIn(state, ['notes', 'data'], action.payload);
      return state;
    }

    case GET_DATA_FAILURE: {
      state = ip.setIn(state, ['notes', 'apiStatus'], 'failure');
      state = ip.setIn(state, ['notes', 'apiError'], action.payload);
      return state;
    }

    case ADD_DATA_REQUEST: {
      state = ip.setIn(state, ['add', 'apiStatus'], 'started');
      state = ip.setIn(state, ['add', 'apiError'], null);
      return state;
    }

    case ADD_DATA_SUCCESS: {
      state = ip.setIn(state, ['add', 'apiStatus'], 'success');
      state = ip.setIn(state, ['add', 'apiError'], null);
      let data = ip.thaw(state.notes.data);
      data.push(action.payload);
      state = ip.setIn(state, ['notes', 'data'], data);
      return state;
    }

    case ADD_DATA_FAILURE: {
      state = ip.setIn(state, ['add', 'apiStatus'], 'failure');
      state = ip.setIn(state, ['add', 'apiError'], action.payload);
      return state;
    }

    case DELETE_DATA_REQUEST: {
      state = ip.setIn(state, ['delete', 'apiStatus'], 'started');
      state = ip.setIn(state, ['delete', 'apiError'], null);
      return state;
    }

    case DELETE_DATA_SUCCESS: {
      state = ip.setIn(state, ['delete', 'apiStatus'], 'success');
      state = ip.setIn(state, ['delete', 'apiError'], null);
      let data = ip.thaw(state.notes.data);
      const getIndex = data.findIndex(item => item.id === action.payload.id);
      if (getIndex !== -1) data.splice(getIndex, 1);
      state = ip.setIn(state, ['notes', 'data'], data);
      return state;
    }

    case DELETE_DATA_FAILURE: {
      state = ip.setIn(state, ['delete', 'apiStatus'], 'failure');
      state = ip.setIn(state, ['delete', 'apiError'], action.payload);
      return state;
    }

    case EDIT_DATA_REQUEST: {
      state = ip.setIn(state, ['edit', 'apiStatus'], 'started');
      state = ip.setIn(state, ['edit', 'apiError'], null);
      return state;
    }

    case EDIT_DATA_SUCCESS: {
      state = ip.setIn(state, ['edit', 'apiStatus'], 'success');
      state = ip.setIn(state, ['edit', 'apiError'], null);
      let data = ip.thaw(state.notes.data);
      const getIndex = data.findIndex(item => item.id === action.payload.id);
      if (getIndex !== -1) {
        const item = data[getIndex];
        data[getIndex].done = !data[getIndex].done;
      }
      state = ip.setIn(state, ['notes', 'data'], data);
      //state = ip.setIn(state, ['edit'], action.payload);
      return state;
    }

    case EDIT_DATA_FAILURE: {
      state = ip.setIn(state, ['edit', 'apiStatus'], 'failure');
      state = ip.setIn(state, ['edit', 'apiError'], action.payload);
      return state;
    }

    default:
      return state;
  }
}