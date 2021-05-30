import { defaults, error, success } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';

defaults.delay = 1000;
defaults.maxTextHeight = null;

function successRequest() {
  success({
    title: 'Success',
    text: 'Enjoy your content!',
  });
}

function invalidRequest() {
  error({
    title: 'Oops',
    text: 'Invalid request. Please correct your request!',
  });
}

export { successRequest, invalidRequest };