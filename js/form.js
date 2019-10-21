'use strict';
(function () {
  var MAX_DESCRIPTION_LENGTH = 140;
  var MAX_SATURATION_PERCENT = 100;

  var MIN_HASTAG_LENGTH = 2;
  var MAX_HASHTAG_LENGTH = 20;
  var MAX_HASHTAG_COUNT = 5;

  var EFFECTS = {
    chrome: {
      min: 0,
      max: 1
    },
    sepia: {
      min: 0,
      max: 1
    },
    marvin: {
      min: 0,
      max: 100
    },
    phobos: {
      min: 0,
      max: 3
    },
    heat: {
      min: 1,
      max: 3
    }
  };

  var photoEditForm = document.querySelector('.img-upload__overlay');
  var effectsList = photoEditForm.querySelector('.effects__list');
  var currentEffect = effectsList.querySelector('input[name=effect]:checked').value;

  var sliderLine = photoEditForm.querySelector('.effect-level__line');
  var sliderPin = sliderLine.querySelector('.effect-level__pin');
  var depthLevel = sliderLine.querySelector('.effect-level__depth');

  // Меняет значение текущего эффекта
  var changeEffect = function () {
    currentEffect = photoEditForm.querySelector('input[name=effect]:checked').value;
  };

  var resetSlider = function () {
    sliderPin.style.left = sliderLine.offsetWidth + 'px';
    depthLevel.style.width = MAX_SATURATION_PERCENT + '%';
  };

  // Возваращает значение насыщенности эффекта
  var findSaturationValue = function (effect, percent) {
    return effect.min + (effect.max - effect.min) / MAX_SATURATION_PERCENT * percent;
  };

  var editableImage = photoEditForm.querySelector('.img-upload__preview img');

  // Отображает эффект фильтра
  var renderEffect = function (percent) {
    switch (currentEffect) {
      case 'chrome':
        editableImage.style = 'filter: grayscale(' + findSaturationValue(EFFECTS.chrome, percent) + ')';
        break;
      case 'sepia':
        editableImage.style = 'filter: sepia(' + findSaturationValue(EFFECTS.sepia, percent) + ')';
        break;
      case 'marvin':
        editableImage.style = 'filter: invert(' + findSaturationValue(EFFECTS.marvin, percent) + '%)';
        break;
      case 'phobos':
        editableImage.style = 'filter: blur(' + findSaturationValue(EFFECTS.phobos, percent) + 'px)';
        break;
      case 'heat':
        editableImage.style = 'filter: brightness(' + findSaturationValue(EFFECTS.heat, percent) + ')';
        break;
      default:
        editableImage.style = '';
        break;
    }
  };

  var onEffectClick = function (evt) {
    if (evt.target.name === 'effect') {
      changeEffect();
      toggleSlider();
      resetSlider();
      renderEffect(MAX_SATURATION_PERCENT);
    }
  };


  var defaultEffect = effectsList.querySelector('#effect-none');

  // Сбрасывает форму редактирования(загрузки) изображения на значения по умолчанию
  var resetUploadForm = function () {
    hashtagsInput.value = '';
    descriptionInput.value = '';
    defaultEffect.checked = true;
    changeEffect();
    toggleSlider();
    renderEffect();
    checkHashtagsValidity();
    checkDescriptionValidity();
    resetInputBorder(hashtagsInput);
    resetInputBorder(descriptionInput);
  };

  var onUploadButtonClick = function () {
    openPhotoEdit();
  };

  var onPhotoEditCloseClick = function () {
    closePhotoEdit();
  };

  var hashtagsInput = document.querySelector('.text__hashtags');

  var onPhotoEditFormEscPress = function (evt) {
    if (hashtagsInput !== document.activeElement) {
      window.utils.isEscKeycode(evt, closePhotoEdit);
    }
  };

  var slider = photoEditForm.querySelector('.img-upload__effect-level');

  // Скрывает/показывает ползунок уровня эффекта
  var toggleSlider = function () {
    if (currentEffect === 'none') {
      slider.classList.add('hidden');
    } else {
      slider.classList.remove('hidden');
    }
  };

  // Добавляет элементу красную рамку толщиной 2px
  var colorInputBorder = function (input) {
    input.style.borderColor = 'red';
    input.style.borderWidth = '2px';
  };

  // Убирает рамку элемента
  var resetInputBorder = function (input) {
    input.style.borderColor = '';
    input.style.borderWidth = '';
  };

  // Валидация хэштэгов загружаемой фотографии
  var checkHashtagsValidity = function () {
    var errorMessage = '';

    var hashtags = hashtagsInput.value.split(' ').filter(function (element) {
      return element !== '';
    });

    var validateHashtagsInArray = function (array) {
      for (var i = 0; i < array.length; i++) {
        if (array[i][0] !== '#') {
          errorMessage = 'Хэштэг должен начинаться с "#"';
          break;
        } else if (array[i].length < MIN_HASTAG_LENGTH || array[i].length > MAX_HASHTAG_LENGTH) {
          errorMessage = 'Допустимая длина хэштэга - от ' + MIN_HASTAG_LENGTH + ' до ' + MAX_HASHTAG_LENGTH + ' символов, включая "#"';
          break;
        } else {
          errorMessage = '';
        }
      }
    };

    if (hashtags.length > MAX_HASHTAG_COUNT) {
      errorMessage = 'Макимальное количество хэштэгов - ' + MAX_HASHTAG_COUNT;
    } else if (window.utils.hasDuplicates(hashtags)) {
      errorMessage = 'Хэштэги не чувствительны к регистру, и не должны повторяться.';
    } else {
      validateHashtagsInArray(hashtags);
    }

    if (errorMessage) {
      colorInputBorder(hashtagsInput);
    } else {
      resetInputBorder(hashtagsInput);
    }

    hashtagsInput.setCustomValidity(errorMessage);
  };

  var onHashtagsInput = function () {
    checkHashtagsValidity();
  };

  // Валидация описания загружаемой фотографии
  var descriptionInput = photoEditForm.querySelector('.text__description');

  var checkDescriptionValidity = function () {
    var errorMessage = '';

    if (descriptionInput.value.length > MAX_DESCRIPTION_LENGTH) {
      errorMessage = 'Длина описания не должна превышать ' + MAX_DESCRIPTION_LENGTH + ' символов';
    }

    if (errorMessage) {
      colorInputBorder(descriptionInput);
    } else {
      resetInputBorder(descriptionInput);
    }

    descriptionInput.setCustomValidity(errorMessage);
  };

  var onDescriptionInput = function () {
    checkDescriptionValidity();
  };

  // Показ сообщения об успешной загрузки фото
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

    closePhotoEdit();
    successMessage.addEventListener('click', onSuccessMessageClick);
    document.addEventListener('keydown', onSuccessMessageEscPress);
    successButton.addEventListener('keydown', onSuccessButtonEnterPress);

    return main.appendChild(successMessage);
  };

  // Показ сообщения об ошибке загрузки фото
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

  var uploadFile = document.querySelector('#upload-file');
  var photoEditClose = photoEditForm.querySelector('.img-upload__cancel');
  var uploadSubmit = photoEditForm.querySelector('.img-upload__submit');

  uploadFile.addEventListener('change', onUploadButtonClick);

  // Открыть/закрыть форму редактирования(загрузки) изображения.
  var openPhotoEdit = function () {
    resetUploadForm();
    photoEditForm.classList.remove('hidden');
    uploadFile.removeEventListener('change', onUploadButtonClick);
    photoEditClose.addEventListener('click', onPhotoEditCloseClick);
    document.addEventListener('keydown', onPhotoEditFormEscPress);
    sliderPin.addEventListener('mousedown', onSliderPinMousedown);
    effectsList.addEventListener('click', onEffectClick);
    hashtagsInput.addEventListener('input', onHashtagsInput);
    descriptionInput.addEventListener('input', onDescriptionInput);
    uploadSubmit.addEventListener('click', onUploadSubmitClick);
  };

  var closePhotoEdit = function () {
    photoEditForm.classList.add('hidden');
    uploadFile.value = '';
    uploadFile.addEventListener('change', onUploadButtonClick);
    photoEditClose.removeEventListener('click', onPhotoEditCloseClick);
    document.removeEventListener('keydown', onPhotoEditFormEscPress);
    sliderPin.removeEventListener('mousedown', onSliderPinMousedown);
    effectsList.removeEventListener('click', onEffectClick);
    hashtagsInput.removeEventListener('input', onHashtagsInput);
    descriptionInput.removeEventListener('input', onDescriptionInput);
    uploadSubmit.removeEventListener('click', onUploadSubmitClick);
  };
})();
