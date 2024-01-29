import {combineReducers, createStore} from 'redux';
import LoginReducer from './Login/reducer';

//here all reducers is stored
const rootReducer = combineReducers({
  LoginReducer,
});
const configureStore = () => {
  return createStore(rootReducer);
}
export default configureStore;