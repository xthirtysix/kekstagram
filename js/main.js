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

var IMAGES_COUNT = 25;

var FEED_LENGTH = 25;

var MAX_MESSAGE_LENGTH = 2;

var MIN_LIKES = 15;

var MAX_LIKES = 200;

var MIN_COMMENTS = 1;

var MAX_COMMENTS = 5;

var AVATARS_COUNT = 6;

var postTemplate = document
  .querySelector('#picture')
  .content.querySelector('a');

var pictureFeed = document.querySelector('.pictures');

/* Перемешивает значения в массиве */
var shufleArray = function (arr) {
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

/* Перемешивает значения в массиве последовательныхчисел начиная с startNum, длиной в length */
var shuffleNumArray = function (startNum, length) {
  var arr = [];

  for (var i = startNum; i < startNum + length; i++) {
    arr.push(i);
  }

  return shufleArray(arr);
};

var generateMessage = function (messageTemplates, length) {
  var shuffledMessages = shufleArray(messageTemplates);
  var message = '';

  if (messageTemplates.length === 0) {
    return '';
  } else {

    for (var i = 0; i < length; i++) {
      if (i === 0) {
        message = message + shuffledMessages[i];
      } else {
        message = message + ' ' + shuffledMessages[i];
      }
    }

    return message;
  }
};

var getRandomNum = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var getUrl = function (fileName) {
  return 'photos/' + fileName + '.jpg';
};

var generateComment = function () {
  return {
    avatar: 'img/avatar-' + getRandomNum(1, AVATARS_COUNT) + '.svg',
    message: generateMessage(MESSAGES, getRandomNum(1, MAX_MESSAGE_LENGTH)),
    name: NAMES[getRandomNum(0, NAMES.length - 1)]
  };
};

var generateFeed = function (length) {
  var arr = shuffleNumArray(0, length);
  var feed = [];

  for (var i = 0; i < length; i++) {
    var post = {};
    var commentsCount = getRandomNum(MIN_COMMENTS, MAX_COMMENTS);

    /* Добавляет изображение */
    if (length <= IMAGES_COUNT) {
      post.url = getUrl(arr[i] + 1);
    } else {
      post.url = getUrl(getRandomNum(1, arr.length));
    }

    /* Добавляет описание */
    post.description = '';

    /* Добавляет лайки */
    post.likes = getRandomNum(MIN_LIKES, MAX_LIKES);

    /* Добавляет комментарии */
    post.comments = [];

    for (var j = 0; j < commentsCount; j++) {
      post.comments.push(generateComment());
    }

    /* Добавляет пост в ленту */
    feed.push(post);
  }

  return feed;
};


var renderPost = function (obj) {
  var post = postTemplate.cloneNode(true);

  post.querySelector('.picture__img').src = obj.url;
  post.querySelector('.picture__likes').textContent = obj.likes;
  post.querySelector('.picture__comments').textContent = obj.comments.length;

  return post;
};

var renderFeed = function (feed) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < feed.length; i++) {
    fragment.appendChild(renderPost(feed[i]));
  }

  return pictureFeed.appendChild(fragment);
};

renderFeed(generateFeed(FEED_LENGTH));
