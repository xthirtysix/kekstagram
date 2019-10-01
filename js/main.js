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

/* Перемешивает значения в массиве */
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

    /* Добавляет изображение */
    post.url = getPostImageUrl(i + 1);

    /* Добавляет описание */
    post.description = 'Сфотографировано на калькулятор';

    /* Добавляет лайки */
    post.likes = getRandomNum(MIN_LIKES, MAX_LIKES);

    /* Добавляет комментарии */
    post.comments = generateCommentsFeed();

    /* Добавляет пост в ленту */
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

bigPicture.classList.remove('hidden');

var bigPictureSocial = bigPicture.querySelector('.big-picture__social');

var bigPictureDescription = bigPictureSocial.querySelector('.social__caption');

var bigPictureLikesCount = bigPictureSocial.querySelector('.likes-count');

var bigPictureCommentsCount = bigPictureSocial.querySelector('.comments-count');

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

var renderBigPicture = function (post) {
  bigPicture.querySelector('.big-picture__img img').src = post.url;
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

renderBigPicture(feed[0]);
