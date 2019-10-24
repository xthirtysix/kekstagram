'use strict';

(function () {
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var displayErrorMessage = function (error, isOnGet) {
    var errorMessage = errorTemplate.cloneNode(true);
    var errorTitle = errorMessage.querySelector('.error__title');
    var errorButtons = errorMessage.querySelectorAll('.error__button');
    var errorRepeatButton = errorButtons[0];
    var errorCancelButton = errorButtons[1];

    var errorMessageClose = function () {
      errorMessage.remove();
      errorMessage.removeEventListener('click', onErrorMessageClick);
      errorMessage.removeEventListener('keydown', onErrorMessageEscPress);
      errorRepeatButton.removeEventListener('click', onErrorRetryButtonClick);
      errorCancelButton.removeEventListener('click', onErrorCancelButtonClick);
    };

    var onErrorMessageClick = function (evt) {
      if (evt.target.className === 'error' || evt.target.className === 'error__button') {
        errorMessageClose();
      }
    };

    var onErrorRetryButtonClick = function () {
      errorMessageClose();
      window.preview.get();
    };

    var onErrorMessageEscPress = function (evt) {
      window.utils.isEscKeycode(evt, errorMessageClose);
    };

    var onErrorCancelButtonClick = function () {
      errorMessageClose();
    };

    if (isOnGet) {
      window.utils.hideVisually(errorCancelButton);
      errorTitle.textContent = error;
    } else {
      window.utils.cancelHideVisually(errorCancelButton);
      errorCancelButton.addEventListener('click', onErrorCancelButtonClick);
    }
    errorMessage.addEventListener('click', onErrorMessageClick);
    errorMessage.addEventListener('keydown', onErrorMessageEscPress);
    errorRepeatButton.addEventListener('click', onErrorRetryButtonClick);

    return document.querySelector('main').appendChild(errorMessage);
  };

  window.message = {
    error: displayErrorMessage
  };
})();
