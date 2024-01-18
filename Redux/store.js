import {combineReducers} from 'redux';

//here all reducers is stored
const rootReducer = combineReducers({
  login: LoginReducer(),
});

export default rootReducer;
