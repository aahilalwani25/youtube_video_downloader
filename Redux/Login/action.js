import {
  CHANGE_MESSAGE_CONTENT,
  CHANGE_MESSAGE_TYPE,
  GOOGLE_BUTTON_LOADING_TRUE,
  SHOW_TOAST_MESSAGE_FALSE,
  SHOW_TOAST_MESSAGE_TRUE,
} from './types';

export function changeMessageType(type) {
  return {
    type: CHANGE_MESSAGE_TYPE,
    payload: type,
  };
}

export function changeMessageContent(content) {
  return {
    type: CHANGE_MESSAGE_CONTENT,
    payload: content,
  };
}

export function showToastMessageTrue() {
  return {
    type: SHOW_TOAST_MESSAGE_TRUE,
  };
}

export function showToastMessageFalse() {
  return {
    type: SHOW_TOAST_MESSAGE_FALSE,
  };
}

export function googleButtonLoadingTrue() {
  return {
    type: GOOGLE_BUTTON_LOADING_TRUE,
  };
}

export function googleButtonLoadingFalse() {
  return {
    type: GOOGLE_BUTTON_LOADING_TRUE,
  };
}
