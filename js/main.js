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

var MESSAGE_LENGTH = 2;


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

var generateMessage = function (messages, length) {
  var shuffledMessages = shufleArray(messages);
  var message = '';

  /* Если массив с сообщениями пустой, выводим пустое сообщение */
  if (messages.length === false) {
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

/* Ниже непроверенный код */

var getUrl = function (fileName) {
  return 'photos/' + fileName + '.jpg';
};

var generateFeed = function (length) {
  var arr = shuffleNumArray(0, length);
  var feed = [];

  for (var i = 0; i < length; i++) {
    var post = {};

    /* Добавляет изображение */
    if (length <= IMAGES_COUNT) {
      post.url = getUrl(arr[i]);
    } else {
      post.url = getUrl(getRandomNum(0, arr.length - 1));
    }

    /* Добавляет описание */
    post.description = '';

    /* Добавляет лайки */
    post.likes = getRandomNum(15, 200);

    /* Добавляет комментарий */
    post.comments = {
      avatar: 'img/avatar-' + getRandomNum(1, 6) + '.svg',
      message: generateMessage(MESSAGES, MESSAGE_LENGTH),
      name: NAMES[getRandomNum(0, NAMES.length - 1)]
    };

    /* Добавляет пост в ленту */
    feed.push(post);
  }

  return feed;
};

generateFeed(FEED_LENGTH);
