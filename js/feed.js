'use strict';
(function () {
  var onSuccess = function (data) {
    window.feed = data.slice();
    window.render(window.feed);
    var feedFilter = document.querySelector('.img-filters');
    feedFilter.classList.remove('img-filters--inactive');
  };

  var onError = function (message) {
    window.message.error(message, getData);
  };

  var getData = function () {
    window.backend.load(onSuccess, onError);
  };

  getData();

  window.feed = [];
})();
