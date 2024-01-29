/**
 * @format
 */

import {AppRegistry} from 'react-native';

import {name as appName} from './app.json';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from './Redux/store';

const store = configureStore()

const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => RNRedux);
//AppRegistry.registerComponent(appName, () => App);
