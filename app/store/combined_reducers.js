import {combineReducers} from 'redux';
import todoReducer from './reducers/todo';

const reducer = combineReducers({
  todo: todoReducer
});

export default reducer;