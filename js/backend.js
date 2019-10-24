'use strict';

(function () {
  var FEED_DATA_URL = 'https://js.dump.academy/kekstagram/data';
  var RESPONSE_CODES = {
    success: 200,
    notFound: 404
  };

  var load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case (RESPONSE_CODES.success):
          onSuccess(xhr.response);
          break;
        case (RESPONSE_CODES.notFound):
          onError('Адрес зпроса не найден');
          break;
        default:
          onError('Статус ответа ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Неизвестная ошибка');
    });

    xhr.addEventListener('timeout', function () {
      onError('Превышен лимит ожидания');
    });

    xhr.timeout = 5000;
    xhr.open('GET', FEED_DATA_URL);

    xhr.send();
  };

  window.backend = {
    load: load
  };
})();
