'use strict';

(function () {
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

  var CommentsNum = {
    MIN: 1,
    MAX: 5
  };
  var LikesNum = {
    MIN: 15,
    MAX: 200
  };

  // Возвращает сгенерированное пользовательское сообщение
  var generateMessage = function (messageTemplates, length) {
    var shuffledMessages = window.utils.shuffleArray(messageTemplates);
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

  // Возвращает URL изображения
  var getPostImageUrl = function (fileName) {
    return 'photos/' + fileName + '.jpg';
  };

  // Возвращает объект пользовательского комментария
  var generateComment = function () {
    return {
      avatar: 'img/avatar-' + window.utils.getRandomNum(1, AVATARS_COUNT) + '.svg',
      message: generateMessage(MESSAGES, window.utils.getRandomNum(1, MAX_MESSAGE_LENGTH)),
      name: NAMES[window.utils.getRandomNum(0, NAMES.length - 1)]
    };
  };

  // Возвращает массив пользовательских комментариев
  var generateCommentsFeed = function () {
    var comments = [];
    var commentsCount = window.utils.getRandomNum(CommentsNum.MIN, CommentsNum.MAX);

    for (var i = 0; i < commentsCount; i++) {
      comments.push(generateComment());
    }

    return comments;
  };

  // Возвращает массив сгенерированных пользовательских постов
  var generateFeed = function (length) {
    var previews = [];

    for (var i = 0; i < length; i++) {
      var post = {};

      post.url = getPostImageUrl(i + 1);
      post.description = 'Сфотографировано на калькулятор';
      post.likes = window.utils.getRandomNum(LikesNum.MIN, LikesNum.MAX);
      post.comments = generateCommentsFeed();
      previews.push(post);
    }

    return previews;
  };

  window.data = {
    generateMessage: generateMessage,
    getPostImageUrl: getPostImageUrl,
    generateComment: generateComment,
    generateCommentsFeed: generateCommentsFeed,
    generateFeed: generateFeed
  };
})();
