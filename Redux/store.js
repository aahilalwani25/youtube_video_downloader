import {combineReducers, createStore} from 'redux';
import LoginReducer from './Login/reducer';
import homeReducer from './Home/reducer';

//here all reducers is stored
const rootReducer = combineReducers({
  LoginReducer,
  homeReducer
});
const configureStore = () => {
  return createStore(rootReducer);
}
export default configureStore;