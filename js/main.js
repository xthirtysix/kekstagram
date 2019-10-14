'use strict';

var NAMES = [
  'Анастасия',
  'Анна',
  'Маргарита',
  'Алиса',
  'Кира',
  'Софья',
  'Сергей',
  'Александр',
  'Андрей',
  'Максим',
  'Дмитрий'
];

var MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var AVATARS_COUNT = 6;
var MAX_MESSAGE_LENGTH = 2;
var MIN_COMMENTS = 1;
var MAX_COMMENTS = 5;
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var IMAGES_COUNT = 25;
var MAX_SATURATION_PERCENT = 100;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
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

// Перемешивает значения в массиве
var shuffleArray = function (arr) {
  var i;
  var j;
  var k;

  for (i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    k = arr[i];
    arr[i] = arr[j];
    arr[j] = k;
  }
  return arr;
};

var generateMessage = function (messageTemplates, length) {
  var shuffledMessages = shuffleArray(messageTemplates);
  var message = '';

  for (var i = 0; i < length; i++) {
    if (i === 0) {
      message = message + shuffledMessages[i];
    } else {
      message = message + ' ' + shuffledMessages[i];
    }
  }
  return message;
};

var getRandomNum = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var getPostImageUrl = function (fileName) {
  return 'photos/' + fileName + '.jpg';
};

var generateComment = function () {
  return {
    avatar: 'img/avatar-' + getRandomNum(1, AVATARS_COUNT) + '.svg',
    message: generateMessage(MESSAGES, getRandomNum(1, MAX_MESSAGE_LENGTH)),
    name: NAMES[getRandomNum(0, NAMES.length - 1)]
  };
};

var generateCommentsFeed = function () {
  var comments = [];
  var commentsCount = getRandomNum(MIN_COMMENTS, MAX_COMMENTS);

  for (var i = 0; i < commentsCount; i++) {
    comments.push(generateComment());
  }

  return comments;
};

var generateFeed = function (length) {
  var feed = [];

  for (var i = 0; i < length; i++) {
    var post = {};

    // Добавляет изображение
    post.url = getPostImageUrl(i + 1);

    // Добавляет описание
    post.description = 'Сфотографировано на калькулятор';

    // Добавляет лайки
    post.likes = getRandomNum(MIN_LIKES, MAX_LIKES);

    // Добавляет комментарии
    post.comments = generateCommentsFeed();

    // Добавляет пост в ленту
    feed.push(post);
  }

  return feed;
};

var postTemplate = document
  .querySelector('#picture')
  .content.querySelector('a');


var renderPost = function (obj) {
  var post = postTemplate.cloneNode(true);

  post.querySelector('.picture__img').src = obj.url;
  post.querySelector('.picture__likes').textContent = obj.likes;
  post.querySelector('.picture__comments').textContent = obj.comments.length;

  return post;
};

var pictureFeed = document.querySelector('.pictures');

var renderFeed = function (feed) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < feed.length; i++) {
    fragment.appendChild(renderPost(feed[i]));
  }

  return pictureFeed.appendChild(fragment);
};

var feed = generateFeed(IMAGES_COUNT);

renderFeed(feed);

var bigPicture = document.querySelector('.big-picture');
var bigPictureSocial = bigPicture.querySelector('.big-picture__social');
var bigPictureCommentsList = bigPictureSocial.querySelector('.social__comments');
var bigPictureComment = bigPictureCommentsList.querySelector('.social__comment');

var renderComment = function (comment) {
  var message = bigPictureComment.cloneNode(true);
  var messagePicture = message.querySelector('.social__picture');
  var messageText = message.querySelector('.social__text');

  messagePicture.src = comment.avatar;
  messagePicture.alt = comment.name;
  messageText.textContent = comment.message;

  return bigPictureCommentsList.appendChild(message);
};

var bigPicrureImage = bigPicture.querySelector('.big-picture__img img');
var bigPictureLikesCount = bigPictureSocial.querySelector('.likes-count');
var bigPictureCommentsCount = bigPictureSocial.querySelector('.comments-count');
var bigPictureDescription = bigPictureSocial.querySelector('.social__caption');

var renderBigPicture = function (post) {
  bigPicture.classList.remove('hidden');
  bigPicrureImage.src = post.url;
  bigPictureLikesCount.textContent = post.likes;
  bigPictureCommentsCount.textContent = post.comments.length;
  bigPictureDescription.textContent = post.description;

  bigPictureCommentsList.innerHTML = '';

  post.comments.forEach(function (element) {
    return renderComment(element);
  });

  return bigPictureSocial;
};

var commentsCount = bigPicture.querySelector('.social__comment-count');
var commentsLoader = bigPicture.querySelector('.comments-loader');

var hideVisually = function (element) {
  element.classList.add('visually-hidden');
};

hideVisually(commentsLoader);
hideVisually(commentsCount);

var bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
var pictures = document.querySelectorAll('.picture');

var onPreviewClick = function (data) {
  openBigPicture(data);
};

var openBigPicture = function (data) {
  renderBigPicture(data);
  bigPictureClose.addEventListener('click', onBigPictureCloseClick);
  bigPictureClose.addEventListener('keydown', onBigPictureCloseEnterPress);
  document.addEventListener('keydown', onBigPictureEscPress);
};

var onBigPictureCloseClick = function () {
  closeBigPicture();
};

var onBigPictureCloseEnterPress = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeBigPicture();
  }
};

var onBigPictureEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeBigPicture();
  }
};

var closeBigPicture = function () {
  bigPicture.classList.add('hidden');
};


var addPictureHandler = function (picture, data) {
  picture.addEventListener('click', function () {
    onPreviewClick(data);
  });
  picture.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      onPreviewClick(picture, data);
    }
  });
};

for (var j = 0; j < pictures.length; j++) {
  addPictureHandler(pictures[j], feed[j]);
}

var photoEditForm = document.querySelector('.img-upload__overlay');
var effectsList = photoEditForm.querySelector('.effects__list');
var currentEffect = effectsList.querySelector('input[name=effect]:checked').value;

var changeEffect = function () {
  currentEffect = photoEditForm.querySelector('input[name=effect]:checked').value;
};

var findSaturationValue = function (effect, percent) {
  return effect.min + (effect.max - effect.min) / MAX_SATURATION_PERCENT * percent;
};

var editableImage = photoEditForm.querySelector('.img-upload__preview img');

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
    renderEffect(MAX_SATURATION_PERCENT);
  }
};

var getSaturationPercent = function () {
  return photoEditForm.querySelector('.effect-level__value').value;
};

var defaultEffect = effectsList.querySelector('#effect-none');

var resetEffect = function () {
  defaultEffect.checked = true;
  changeEffect();
  toggleSlider();
  renderEffect();
};

var onSliderPinMouseUp = function () {
  renderEffect(getSaturationPercent());
};

var onUploadButtonClick = function () {
  openPhotoEdit();
};

var onPhotoEditCloseClick = function () {
  closePhotoEdit();
};

var hashtagsInput = document.querySelector('.text__hashtags');

var onPhotoEditFormEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && hashtagsInput !== document.activeElement) {
    closePhotoEdit();
  }
};

var slider = photoEditForm.querySelector('.img-upload__effect-level');

var toggleSlider = function () {
  if (currentEffect === 'none') {
    slider.classList.add('hidden');
  } else {
    slider.classList.remove('hidden');
  }
};

var hasDuplicates = function (array) {
  var duplicates = [];

  for (var i = 0; i < array.length; i++) {
    var value = array[i].toLowerCase();

    if (duplicates.indexOf(value) !== -1) {
      return true;
    }

    duplicates.push(value);
  }

  return false;
};

var checkValidity = function () {
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
      }
    }
  };

  if (hashtags.length > MAX_HASHTAG_COUNT) {
    errorMessage = 'Макимальное количество хэштэгов - ' + MAX_HASHTAG_COUNT;
  } else if (hasDuplicates(hashtags)) {
    errorMessage = 'Хэштэги не чувствительны к регистру, и не должны повторяться.';
  } else {
    validateHashtagsInArray(hashtags);
  }

  hashtagsInput.setCustomValidity(errorMessage);
};

var onHashtagsInput = function () {
  checkValidity();
};

var uploadFile = document.querySelector('#upload-file');
var sliderPin = photoEditForm.querySelector('.effect-level__pin');
var photoEditClose = photoEditForm.querySelector('.img-upload__cancel');

uploadFile.addEventListener('change', onUploadButtonClick);

var openPhotoEdit = function () {
  photoEditForm.classList.remove('hidden');
  resetEffect();
  uploadFile.removeEventListener('change', onUploadButtonClick);
  photoEditClose.addEventListener('click', onPhotoEditCloseClick);
  document.addEventListener('keydown', onPhotoEditFormEscPress);
  effectsList.addEventListener('click', onEffectClick);
  sliderPin.addEventListener('mouseup', onSliderPinMouseUp);
  hashtagsInput.addEventListener('input', onHashtagsInput);
};

var closePhotoEdit = function () {
  photoEditForm.classList.add('hidden');
  uploadFile.value = '';
  uploadFile.addEventListener('change', onUploadButtonClick);
  photoEditClose.removeEventListener('click', onPhotoEditCloseClick);
  document.removeEventListener('keydown', onPhotoEditFormEscPress);
  effectsList.removeEventListener('click', onEffectClick);
  sliderPin.removeEventListener('mouseup', onSliderPinMouseUp);
  hashtagsInput.removeEventListener('input', onHashtagsInput);
};
