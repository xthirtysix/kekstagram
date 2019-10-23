'use strict';
(function () {
  var COMMENTS_LOAD_COUNT = 5;

  var bigPicture = document.querySelector('.big-picture');
  var bigPictureSocial = bigPicture.querySelector('.big-picture__social');
  var bigPictureCommentsList = bigPictureSocial.querySelector('.social__comments');
  var bigPictureComment = bigPictureCommentsList.querySelector('.social__comment');

  // Отображает пользовательский комментарий
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

  var commentsLoader = bigPicture.querySelector('.comments-loader');

  // Отображает страницу пользовательского поста
  var renderBigPicture = function (post) {
    var onCommentsLoaderClick = function () {
      renderComments();
    };

    commentsLoader.addEventListener('click', onCommentsLoaderClick);

    var renderComments = function () {
      var comments = bigPictureSocial.querySelectorAll('.social__comment');
      var commentsToLoad = post.comments.length - comments.length;

      if (!comments.length) {
        if (commentsToLoad < COMMENTS_LOAD_COUNT) {
          for (var i = 0; i < post.comments.length; i++) {
            renderComment(post.comments[i]);
          }
          commentsLoader.classList.add('hidden');
          commentsLoader.removeEventListener('click', onCommentsLoaderClick);
        } else {
          for (var j = 0; j < COMMENTS_LOAD_COUNT; j++) {
            renderComment(post.comments[j]);
          }
        }
      } else if (commentsToLoad > COMMENTS_LOAD_COUNT) {
        for (var k = comments.length; k < comments.length + COMMENTS_LOAD_COUNT; k++) {
          renderComment(post.comments[k]);
        }
      } else {
        for (var n = comments.length; n < post.comments.length; n++) {
          renderComment(post.comments[n]);
          commentsLoader.classList.add('hidden');
          commentsLoader.removeEventListener('click', onCommentsLoaderClick);
        }
      }
    };

    bigPicture.classList.remove('hidden');
    commentsLoader.classList.remove('hidden');
    bigPicrureImage.src = post.url;
    bigPictureLikesCount.textContent = post.likes;
    bigPictureCommentsCount.textContent = post.comments.length;
    bigPictureDescription.textContent = post.description;

    bigPictureCommentsList.innerHTML = '';

    renderComments();

    return bigPictureSocial;
  };

  var bigPictureClose = bigPicture.querySelector('.big-picture__cancel');

  // Открывает пользовательский пост
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
    window.utils.isEnterKeycode(evt, closeBigPicture);
  };

  var onBigPictureEscPress = function (evt) {
    window.utils.isEscKeycode(evt, closeBigPicture);
  };

  // Закрывает пользовательский пост
  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
    bigPictureClose.removeEventListener('click', onBigPictureCloseClick);
    bigPictureClose.removeEventListener('keydown', onBigPictureCloseEnterPress);
    document.removeEventListener('keydown', onBigPictureEscPress);
  };

  window.picture = {
    openBigPicture: openBigPicture
  };
})();
