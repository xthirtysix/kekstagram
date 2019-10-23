'use strict';

(function () {
  var sliderPin = sliderLine.querySelector('.effect-level__pin');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var displayErrorMessage = function () {
    var errorMessage = errorTemplate.cloneNode(true);
    var errorButtons = errorMessage.querySelectorAll('.error__button');
    var errorRepeatButton = errorButtons[0];
    var errorCancelButton = errorButtons[1];

    var errorMessageClose = function () {
      errorMessage.remove();
    };

    var onErrorMessageClick = function (evt) {
      if (evt.target.className === 'error' || evt.target.className === 'error__button') {
        errorMessageClose();
        window.utils.cancelHideVisually(photoEditForm);
      }
    };

    var onErrorMessageEscPress = function (evt) {
      window.utils.isEscKeycode(evt, errorMessageClose);
      window.utils.isEscKeycode(evt, window.utils.cancelHideVisually(photoEditForm));
    };

    var onErrorRepeatButtonClick = function () {
      errorMessageClose();
      window.utils.cancelHideVisually(photoEditForm);
    };

    var onErrorRepeatButtonEnterPress = function (evt) {
      window.utils.isEnterKeycode(evt, errorMessageClose);
      window.utils.isEnterKeycode(evt, window.utils.cancelHideVisually(photoEditForm));
    };

    var onErrorCancelButtonClick = function () {
      errorMessageClose();
      window.utils.cancelHideVisually(photoEditForm);
      closePhotoEdit();
    };

    var onErrorCancelButtonEnterPress = function (evt) {
      window.utils.isEnterKeycode(evt, errorMessageClose);
      window.utils.isEnterKeycode(evt, window.utils.cancelHideVisually(photoEditForm));
      window.utils.isEnterKeycode(evt, window.utils.closePhotoEdit);
    };

    window.utils.hideVisually(photoEditForm);

    errorMessage.addEventListener('click', onErrorMessageClick);
    errorMessage.addEventListener('keydown', onErrorMessageEscPress);
    errorRepeatButton.addEventListener('click', onErrorRepeatButtonClick);
    errorRepeatButton.addEventListener('keydown', onErrorRepeatButtonEnterPress);
    errorCancelButton.addEventListener('click', onErrorCancelButtonClick);
    errorCancelButton.addEventListener('keydown', onErrorCancelButtonEnterPress);

    return main.appendChild(errorMessage);
  };

  // Отображает сообщение после загрузки фото
  var displaySubmitMessage = function () {
    if (hashtagsInput.validity.valid === true && descriptionInput.validity.valid === true) {
      displaySuccessMessage();
    } else {
      displayErrorMessage();
    }
  };

  var onUploadSubmitClick = function (evt) {
    evt.preventDefault();
    displaySubmitMessage();
  };

  // Перемещение ползунка
  var onSliderPinMousedown = function (evt) {
    evt.preventDefault();

    var start = evt.clientX;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = start - moveEvt.clientX;

      var pinOffset = sliderPin.offsetLeft - shift;

      start = moveEvt.clientX;

      var getValue = function () {
        return Math.round(pinOffset / (sliderLine.offsetWidth / MAX_SATURATION_PERCENT));
      };

      if (pinOffset >= 0 && pinOffset <= sliderLine.offsetWidth) {
        sliderPin.style.left = pinOffset + 'px';
      } else {
        return;
      }

      if (sliderPin.offsetLeft < 0) {
        sliderPin.offsetLeft = 0;
      } else if (sliderPin.offsetLeft > sliderLine.offsetWidth) {
        sliderPin.offsetLeft = sliderLine.offsetWidth;
      }

      renderEffect(getValue());
      depthLevel.style.width = getValue() + '%';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };
})();
