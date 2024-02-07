import {CHANGE_TOAST_MESSAGE_SHOW, SET_LINK} from './types';

export function setLink(link) {
  //console.log('Dispatching setLink action with link:', link);
  return {
    type: SET_LINK,
    payload: link,
  };
}

export function changeToastMessage(
  showToastMessage,
  toastMessageContent,
  toastMessageType,
) {
  return {
    type: CHANGE_TOAST_MESSAGE_SHOW,
    payload: {
      showToastMessage: showToastMessage,
      toastMessageContent: toastMessageContent,
      toastMessageType: toastMessageType,
    },
  };
}
