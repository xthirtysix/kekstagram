'use strict';

(function () {
  var FEED_DATA_URL = 'https://js.dump.academy/kekstagram/data';

  var load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError(xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться');
    });

    xhr.timeout = 5000;
    xhr.open('GET', FEED_DATA_URL);

    xhr.send();
  };

  window.backend = {
    load: load
  };
})();
