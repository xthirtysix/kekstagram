'use strict';

(function () {
  var IMAGES_COUNT = 25;

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
      window.isEnterCode(evt, window.picture.openBigPicture(obj));
    });

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

  var feed = window.data.generateFeed(IMAGES_COUNT);

  renderFeed(feed);
})();
