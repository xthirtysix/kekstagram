'use strict';
(function () {
  var postTemplate = document.querySelector('#picture').content.querySelector('a');

  var render = function (obj) {
    var post = postTemplate.cloneNode(true);

    post.querySelector('.picture__img').src = obj.url;
    post.querySelector('.picture__likes').textContent = obj.likes;
    post.querySelector('.picture__comments').textContent = obj.comments.length;

    post.addEventListener('click', function () {
      window.picture.open(obj);
    });
    post.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.utils.enterKeycode) {
        window.picture.open(obj);
      }
    });

    return post;
  };

  var pictureFeed = document.querySelector('.pictures');
  var uploadForm = pictureFeed.querySelector('.img-upload');

  var renderFeed = function (data) {
    pictureFeed.innerHTML = '';
    pictureFeed.appendChild(uploadForm);

    data.forEach(function (el) {
      pictureFeed.appendChild(render(el));
    });
  };

  window.render = renderFeed;
})();
