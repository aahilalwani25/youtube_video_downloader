import initialState from './state';
import {
  CHANGE_MESSAGE_CONTENT,
  CHANGE_MESSAGE_TYPE,
  GOOGLE_BUTTON_LOADING_FALSE,
  GOOGLE_BUTTON_LOADING_TRUE,
  SHOW_TOAST_MESSAGE_FALSE,
  SHOW_TOAST_MESSAGE_TRUE,
} from './types';

function LoginReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_MESSAGE_TYPE:
      return {...state, messageType: action.payload};
    case CHANGE_MESSAGE_CONTENT:
      return {...state, messageContent: action.payload};
    case SHOW_TOAST_MESSAGE_TRUE:
      return {...state, toastMessageShow: true};
    case SHOW_TOAST_MESSAGE_FALSE:
      return {...state, toastMessageShow: false};
    case GOOGLE_BUTTON_LOADING_FALSE:
      return {...state, isGoogleButtonLoading: false};
    case GOOGLE_BUTTON_LOADING_TRUE:
      return {...state, isGoogleButtonLoading: true};
    default:
      return state;
  }
}

export default LoginReducer;
