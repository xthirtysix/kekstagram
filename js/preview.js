'use strict';

(function () {
  // var IMAGES_COUNT = 25;

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

  var onErrorGet = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; padding: 10px 0; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '24px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(onSuccessGet, onErrorGet);
})();
