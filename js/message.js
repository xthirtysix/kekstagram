'use strict';

(function () {
  var main = document.querySelector('main');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');

  var displaySuccessMessage = function () {
    var successMessage = successTemplate.cloneNode(true);
    var successButton = successMessage.querySelector('.success__button');

    var successMessageClose = function () {
      successMessage.remove();
    };

    var onSuccessMessageClick = function (evt) {
      if (evt.target.className === 'success' || evt.target.className === 'success__button') {
        successMessageClose();
      }
    };

    var onSuccessMessageEscPress = function (evt) {
      window.utils.isEscKeycode(evt, successMessageClose);
    };

    var onSuccessButtonEnterPress = function (evt) {
      window.utils.isEnterKeycode(evt, successMessageClose);
    };

    successMessage.addEventListener('click', onSuccessMessageClick);
    document.addEventListener('keydown', onSuccessMessageEscPress);
    successButton.addEventListener('keydown', onSuccessButtonEnterPress);

    return main.appendChild(successMessage);
  };

  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var displayErrorMessage = function (error, isOnGet) {
    var errorMessage = errorTemplate.cloneNode(true);
    var errorTitle = errorMessage.querySelector('.error__title');
    var errorButtons = errorMessage.querySelectorAll('.error__button');
    var errorRepeatButton = errorButtons[0];
    var errorCancelButton = errorButtons[1];

    var errorMessageClose = function () {
      errorMessage.remove();
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

    return main.appendChild(errorMessage);
  };

  window.message = {
    error: displayErrorMessage,
    success: displaySuccessMessage
  };
})();
