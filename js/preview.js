'use strict';

(function () {
  var postTemplate = document.querySelector('#picture').content.querySelector('a');

  var renderPost = function (obj) {
    var post = postTemplate.cloneNode(true);

    post.querySelector('.picture__img').src = obj.url;
    post.querySelector('.picture__likes').textContent = obj.likes;
    post.querySelector('.picture__comments').textContent = obj.comments.length;

    post.addEventListener('click', function () {
      window.picture.openBigPicture(obj);
    });
    post.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.utils.enterKeycode) {
        window.picture.openBigPicture(obj);
      }
    });

    return post;
  };
  var pictureFeed = document.querySelector('.pictures');

  var onSuccessGet = function (previews) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < previews.length; i++) {
      fragment.appendChild(renderPost(previews[i]));
    }

    return pictureFeed.appendChild(fragment);
  };

  var onErrorGet = function (message) {
    window.message.error(message, true);
  };

  var getData = function () {
    window.backend.load(onSuccessGet, onErrorGet);
  };

  getData();

  window.preview = {
    get: getData
  };
})();
