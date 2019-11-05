'use strict';
(function () {
  var COMMENTS_NUM = 5;

  var commentsToRender = [];
  var commentCounter = 0;
  var commentsNum;

  var picture = document.querySelector('.big-picture');
  var pictureSocial = picture.querySelector('.big-picture__social');
  var pictureCommentsList = pictureSocial.querySelector('.social__comments');
  var pictureComment = pictureCommentsList.querySelector('.social__comment');
  var commentsLoader = picture.querySelector('.comments-loader');

  // Отображает пользовательский комментарий
  var renderComment = function (comment) {
    var message = pictureComment.cloneNode(true);

    var messagePicture = message.querySelector('.social__picture');
    messagePicture.src = comment.avatar;
    messagePicture.alt = comment.name;

    var messageText = message.querySelector('.social__text');
    messageText.textContent = comment.message;

    return pictureCommentsList.appendChild(message);
  };

  var renderedCommentsCount = pictureSocial.querySelector('.social__comment-count');

  // Отображает ленту комментариев
  var renderCommentFeed = function (comments) {

    var fragment = document.createDocumentFragment();

    if (comments.length <= COMMENTS_NUM) {
      window.utils.hideVisually(commentsLoader);
    }

    comments.splice(0, COMMENTS_NUM).forEach(function (element) {
      fragment.appendChild(renderComment(element));
      commentCounter++;
    });

    pictureCommentsList.appendChild(fragment);
    renderedCommentsCount.innerHTML = commentCounter + ' из <span class="comments-count">' + commentsNum + '</span> комментариев';
  };

  var picrureImage = picture.querySelector('.big-picture__img img');
  var pictureLikesCount = pictureSocial.querySelector('.likes-count');
  var pictureDescription = pictureSocial.querySelector('.social__caption');
  // Отображает страницу пользовательского поста
  var renderPicture = function (post) {
    commentsNum = post.comments.length;
    commentsToRender = post.comments.slice();

    window.utils.cancelHideVisually(commentsLoader);
    commentsLoader.classList.remove('hidden');
    picture.classList.remove('hidden');
    picrureImage.src = post.url;
    pictureLikesCount.textContent = post.likes;
    pictureDescription.textContent = post.description;
    pictureCommentsList.innerHTML = '';
    renderCommentFeed(commentsToRender);

    return pictureSocial;
  };

  var pictureClose = picture.querySelector('.big-picture__cancel');
  var commentsCount = renderedCommentsCount.querySelector('.comments-count');

  // Открывает пользовательский пост
  var openPicture = function (data) {
    renderPicture(data);
    commentsCount.textContent = data.comments.length;
    commentsLoader.addEventListener('click', onCommentsLoaderClick);
    pictureClose.addEventListener('click', onPictureCloseClick);
    pictureClose.addEventListener('keydown', onPictureCloseEnterPress);
    document.addEventListener('keydown', onPictureEscPress);
  };

  var onCommentsLoaderClick = function (evt) {
    evt.preventDefault();

    renderCommentFeed(commentsToRender);
  };

  var onPictureCloseClick = function () {
    closePicture();
  };

  var onPictureCloseEnterPress = function (evt) {
    window.utils.isEnterKeycode(evt, closePicture);
  };

  var onPictureEscPress = function (evt) {
    window.utils.isEscKeycode(evt, closePicture);
  };

  // Закрывает пользовательский пост
  var closePicture = function () {
    commentCounter = 0;
    picture.classList.add('hidden');
    commentsLoader.removeEventListener('click', onCommentsLoaderClick);
    pictureClose.removeEventListener('click', onPictureCloseClick);
    pictureClose.removeEventListener('keydown', onPictureCloseEnterPress);
    document.removeEventListener('keydown', onPictureEscPress);
  };

  window.picture = {
    open: openPicture
  };
})();
