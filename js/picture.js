'use strict';
(function () {
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

  // Отображает страницу пользовательского поста
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

  // Скрывает элемент
  window.utils.hideVisually(commentsLoader);
  window.utils.hideVisually(commentsCount);

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
