'use strict';
(function () {
  var main = document.querySelector('main');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');

  var displaySuccessMessage = function () {
    var successMessage = successTemplate.cloneNode(true);
    var successButton = successMessage.querySelector('.success__button');

    var closeSuccessMessage = function () {
      successMessage.remove();
    };

    var onSuccessMessageClick = function (evt) {
      if (evt.target.className === 'success' || evt.target.className === 'success__button') {
        closeSuccessMessage();
      }
    };

    var onSuccessMessageEscPress = function (evt) {
      window.utils.isEscKeycode(evt, closeSuccessMessage);
    };

    var onSuccessButtonEnterPress = function (evt) {
      window.utils.isEnterKeycode(evt, closeSuccessMessage);
    };

    successMessage.addEventListener('click', onSuccessMessageClick);
    document.addEventListener('keydown', onSuccessMessageEscPress);
    successButton.addEventListener('keydown', onSuccessButtonEnterPress);

    return main.appendChild(successMessage);
  };

  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var displayErrorMessage = function (error, retryAction) {
    var errorMessage = errorTemplate.cloneNode(true);
    errorMessage.style.zIndex = '100';
    var errorTitle = errorMessage.querySelector('.error__title');
    var errorButtons = errorMessage.querySelectorAll('.error__button');
    var errorRetryButton = errorButtons[0];
    var errorCancelButton = errorButtons[1];

    var closeErrorMessage = function () {
      errorMessage.remove();
    };

    var onErrorMessageClick = function (evt) {
      if (evt.target.className === 'error' || evt.target.className === 'error__button') {
        closeErrorMessage();
      }
    };

    var onErrorMessageEscPress = function (evt) {
      window.utils.isEscKeycode(evt, closeErrorMessage);
    };

    var onErrorRetryButtonClick = function () {
      closeErrorMessage();
      retryAction();
    };

    var onErrorCancelButtonClick = function () {
      closeErrorMessage();
    };

    errorMessage.addEventListener('click', onErrorMessageClick);
    document.addEventListener('keydown', onErrorMessageEscPress);
    errorRetryButton.addEventListener('click', onErrorRetryButtonClick);
    errorCancelButton.addEventListener('click', onErrorCancelButtonClick);

    errorTitle.textContent = error;

    return main.appendChild(errorMessage);
  };

  window.message = {
    error: displayErrorMessage,
    success: displaySuccessMessage
  };
})();
