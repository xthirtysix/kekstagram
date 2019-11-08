'use strict';
(function () {
  var MAX_DESCRIPTION_LENGTH = 140;
  var DEFAULT_ZOOM = '100%';

  var Hashtag = {
    MIN_LENGTH: 2,
    MAX_LENGTH: 20,
    COUNT: 5
  };

  var form = document.querySelector('#upload-select-image');
  var photoEditForm = form.querySelector('.img-upload__overlay');
  var defaultEffect = form.querySelector('#effect-none');
  var hashtagsInput = form.querySelector('.text__hashtags');
  var descriptionInput = photoEditForm.querySelector('.text__description');

  // Сбрасывает форму редактирования изображения до значений по умолчанию
  var resetUploadForm = function () {
    zoomPercent.value = DEFAULT_ZOOM;
    window.zoom.reset();
    window.slider.reset();
    defaultEffect.checked = true;
    window.effects.render();
    hashtagsInput.value = '';
    checkHashtagsValidity();
    descriptionInput.value = '';
    checkDescriptionValidity();
  };

  var onPhotoEditCloseClick = function () {
    closePhotoEdit();
  };

  var onPhotoEditFormEscPress = function (evt) {
    if (hashtagsInput !== document.activeElement &&
      descriptionInput !== document.activeElement) {
      window.utils.isEscKeycode(evt, closePhotoEdit);
    }
  };

  // Меняет стиль границы элемента
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
        } else if (array[i].length < Hashtag.MIN_LENGTH ||
          array[i].length > Hashtag.MAX_LENGTH) {
          errorMessage = 'Допустимая длина хэштэга - от ' + Hashtag.MIN_LENGTH +
            ' до ' + Hashtag.MAX_LENGTH + ' символов, включая "#"';
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

  // Отправить фотографию
  var sendData = function () {
    return window.backend.send(new FormData(form), onSuccess, onError);
  };

  var onSuccess = function () {
    window.message.success();
    closePhotoEdit();
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

  var fileChooser = document.querySelector('#upload-file');
  var photoEditClose = photoEditForm.querySelector('.img-upload__cancel');
  var uploadSubmit = photoEditForm.querySelector('.img-upload__submit');

  // Обработчики зума
  var scaleControl = form.querySelector('.img-upload__scale');
  var zoomOutButton = scaleControl.querySelector('.scale__control--smaller');
  var zoomInButton = scaleControl.querySelector('.scale__control--bigger');
  var zoomPercent = scaleControl.querySelector('.scale__control--value');

  var onZoomInButtonClick = function (evt) {
    evt.preventDefault();
    zoomPercent.value = window.zoom.in(zoomPercent.value);
  };

  var onZoomOutButtonClick = function (evt) {
    evt.preventDefault();
    zoomPercent.value = window.zoom.out(zoomPercent.value);
  };

  // Обработчики эффектов
  var effectsList = form.querySelector('.effects__list');

  var onEffectsClick = function () {
    window.slider.reset();
    window.effects.render();
  };

  // Открыть/закрыть форму редактирования(загрузки) изображения.
  var openPhotoEdit = function () {
    resetUploadForm();
    window.slider.init();
    photoEditForm.classList.remove('hidden');
    effectsList.addEventListener('click', onEffectsClick);
    photoEditClose.addEventListener('click', onPhotoEditCloseClick);
    document.addEventListener('keydown', onPhotoEditFormEscPress);
    hashtagsInput.addEventListener('input', onHashtagsInput);
    descriptionInput.addEventListener('input', onDescriptionInput);
    uploadSubmit.addEventListener('click', onUploadSubmitClick);
    zoomInButton.addEventListener('click', onZoomInButtonClick);
    zoomOutButton.addEventListener('click', onZoomOutButtonClick);
  };

  var closePhotoEdit = function () {
    window.slider.halt();
    fileChooser.value = '';
    photoEditForm.classList.add('hidden');
    effectsList.addEventListener('click', onEffectsClick);
    photoEditClose.removeEventListener('click', onPhotoEditCloseClick);
    document.removeEventListener('keydown', onPhotoEditFormEscPress);
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
