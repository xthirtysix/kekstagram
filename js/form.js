'use strict';
(function () {
  var MAX_DESCRIPTION_LENGTH = 140;
  var MAX_SATURATION_PERCENT = 100;
  var DEFAULT_SCALE_LEVEL = 100;

  var Hashtag = {
    MIN_LENGTH: 2,
    MAX_LENGTH: 20,
    COUNT: 5
  };

  var Effect = {
    CHROME: {
      min: 0,
      max: 1
    },
    SEPIA: {
      min: 0,
      max: 1
    },
    MARVIN: {
      min: 0,
      max: 100
    },
    PHOBOS: {
      min: 0,
      max: 3
    },
    HEAT: {
      min: 1,
      max: 3
    }
  };

  var form = document.querySelector('.img-upload__form');
  var photoEditForm = form.querySelector('.img-upload__overlay');
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
  var getSaturationValue = function (effect, percent) {
    return effect.min + (effect.max - effect.min) / MAX_SATURATION_PERCENT * percent;
  };

  var editableImage = photoEditForm.querySelector('.img-upload__preview img');

  // Отображает эффект фильтра
  var renderEffect = function (percent) {
    switch (currentEffect) {
      case 'chrome':
        editableImage.style.filter = 'grayscale(' + getSaturationValue(Effect.CHROME, percent) + ')';
        break;
      case 'sepia':
        editableImage.style.filter = 'sepia(' + getSaturationValue(Effect.SEPIA, percent) + ')';
        break;
      case 'marvin':
        editableImage.style.filter = 'invert(' + getSaturationValue(Effect.MARVIN, percent) + '%)';
        break;
      case 'phobos':
        editableImage.style.filter = 'blur(' + getSaturationValue(Effect.PHOBOS, percent) + 'px)';
        break;
      case 'heat':
        editableImage.style.filter = 'brightness(' + getSaturationValue(Effect.HEAT, percent) + ')';
        break;
      default:
        editableImage.style.filter = '';
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
    resetZoomValue();
    defaultEffect.checked = true;
    changeEffect();
    toggleSlider();
    renderEffect();
    hashtagsInput.value = '';
    checkHashtagsValidity();
    descriptionInput.value = '';
    checkDescriptionValidity();
  };

  var onPhotoEditCloseClick = function () {
    closePhotoEdit();
  };

  var hashtagsInput = document.querySelector('.text__hashtags');
  var descriptionInput = photoEditForm.querySelector('.text__description');

  var onPhotoEditFormEscPress = function (evt) {
    if (hashtagsInput !== document.activeElement && descriptionInput !== document.activeElement) {
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

  var toggleBorder = function (element, condition) {
    if (condition) {
      element.style.borderColor = 'red';
      element.style.borderWidth = '2px';
    } else {
      element.style.borderColor = '';
      element.style.borderWidth = '';
    }
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
        } else if (array[i].length < Hashtag.MIN_LENGTH || array[i].length > Hashtag.MAX_LENGTH) {
          errorMessage = 'Допустимая длина хэштэга - от ' + Hashtag.MIN_LENGTH + ' до ' + Hashtag.MAX_LENGTH + ' символов, включая "#"';
          break;
        } else {
          errorMessage = '';
        }
      }
    };

    if (hashtags.length > Hashtag.COUNT) {
      errorMessage = 'Макимальное количество хэштэгов - ' + Hashtag.COUNT;
    } else if (window.utils.hasDuplicates(hashtags)) {
      errorMessage = 'Хэштэги нечувствительны к регистру, и не должны повторяться.';
    } else {
      validateHashtagsInArray(hashtags);
    }

    toggleBorder(hashtagsInput, errorMessage);
    hashtagsInput.setCustomValidity(errorMessage);
  };

  var onHashtagsInput = function () {
    checkHashtagsValidity();
  };

  // Валидация описания загружаемой фотографии
  var checkDescriptionValidity = function () {
    var errorMessage = '';

    if (descriptionInput.value.length > MAX_DESCRIPTION_LENGTH) {
      errorMessage = 'Длина описания не должна превышать ' + MAX_DESCRIPTION_LENGTH + ' символов';
    }

    toggleBorder(descriptionInput, errorMessage);
    descriptionInput.setCustomValidity(errorMessage);
  };

  var onDescriptionInput = function () {
    checkDescriptionValidity();
  };

  var onSuccess = function () {
    window.message.success();
    closePhotoEdit();
  };

  var sendData = function () {
    return window.backend.send(new FormData(form), onSuccess, onError);
  };

  var onError = function (message) {
    window.message.error(message, sendData);
    closePhotoEdit();
  };

  var onUploadSubmitClick = function (evt) {
    if (hashtagsInput.validity.valid === true && descriptionInput.validity.valid === true) {
      evt.preventDefault();
      sendData();
    }
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

      var value = getValue();

      renderEffect(value);
      depthLevel.style.width = value + '%';
      document.querySelector('.effect-level__value').value = value;
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var fileChooser = document.querySelector('#upload-file');
  var photoEditClose = photoEditForm.querySelector('.img-upload__cancel');
  var uploadSubmit = photoEditForm.querySelector('.img-upload__submit');

  // Zoom
  var scaleControl = form.querySelector('.img-upload__scale');
  var zoomOutButton = scaleControl.querySelector('.scale__control--smaller');
  var zoomInButton = scaleControl.querySelector('.scale__control--bigger');
  var zoomPercent = scaleControl.querySelector('.scale__control--value');

  var resetZoomValue = function () {
    zoomPercent.value = DEFAULT_SCALE_LEVEL + '%';
  };

  var onZoomInButtonClick = function (evt) {
    evt.preventDefault();
    zoomPercent.value = window.zoom.in(zoomPercent.value);
  };

  var onZoomOutButtonClick = function (evt) {
    evt.preventDefault();
    zoomPercent.value = window.zoom.out(zoomPercent.value);
  };

  // Открыть/закрыть форму редактирования(загрузки) изображения.
  var openPhotoEdit = function () {
    resetUploadForm();
    photoEditForm.classList.remove('hidden');
    photoEditClose.addEventListener('click', onPhotoEditCloseClick);
    document.addEventListener('keydown', onPhotoEditFormEscPress);
    sliderPin.addEventListener('mousedown', onSliderPinMousedown);
    effectsList.addEventListener('click', onEffectClick);
    hashtagsInput.addEventListener('input', onHashtagsInput);
    descriptionInput.addEventListener('input', onDescriptionInput);
    uploadSubmit.addEventListener('click', onUploadSubmitClick);
    zoomInButton.addEventListener('click', onZoomInButtonClick);
    zoomOutButton.addEventListener('click', onZoomOutButtonClick);
  };

  var closePhotoEdit = function () {
    photoEditForm.classList.add('hidden');
    fileChooser.value = '';
    photoEditClose.removeEventListener('click', onPhotoEditCloseClick);
    document.removeEventListener('keydown', onPhotoEditFormEscPress);
    sliderPin.removeEventListener('mousedown', onSliderPinMousedown);
    effectsList.removeEventListener('click', onEffectClick);
    hashtagsInput.removeEventListener('input', onHashtagsInput);
    descriptionInput.removeEventListener('input', onDescriptionInput);
    uploadSubmit.removeEventListener('click', onUploadSubmitClick);
    zoomInButton.removeEventListener('click', onZoomInButtonClick);
    zoomOutButton.removeEventListener('click', onZoomOutButtonClick);
  };

  window.form = {
    open: openPhotoEdit
  };
})();
