import { combineReducers } from 'redux';
import BoardReducer from './BoardReducer';


const rootReducer = combineReducers({
  board: BoardReducer
});

export default rootReducer;
