/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
// import {configureStore} from '@reduxjs/toolkit';
// import rootReducer from './Redux/store';

// const store= configureStore(rootReducer);

// const RNRedux = () => (
//   <Provider store={store}>
//     <App />
//   </Provider>
// );

//AppRegistry.registerComponent(appName, () => RNRedux);
AppRegistry.registerComponent(appName, () => App);
