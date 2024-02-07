import initialState from './state';
import {CHANGE_ALERT_SHOW, CHANGE_TOAST_MESSAGE_SHOW, SET_LINK} from './types';

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LINK:
      console.log(state);
      return {...state, link: action.payload};
    case CHANGE_ALERT_SHOW:
      return {...state, showAlert: action.payload};
    case CHANGE_TOAST_MESSAGE_SHOW:
      return {
        ...state,
        showToastMessage: action.payload.showToastMessage,
        toastMessageContent: action.payload.toastMessageContent,
        toastMessageType: action.payload.toastMessageType
      };
    default:
      return state;
  }
}

export default homeReducer;
