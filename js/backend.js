'use strict';
(function () {
  var URL = {
    get: 'https://js.dump.academy/kekstagram/datda',
    post: 'https://js.dump.academy/kekstagram'
  };

  var RESPONSE_CODES = {
    success: 200,
    notFound: 404
  };

  var TIMEOUT = 5000;

  var generateXhr = function (timeout, onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.timeout = timeout;

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case (RESPONSE_CODES.success):
          onSuccess(xhr.response);
          break;
        case (RESPONSE_CODES.notFound):
          onError('Адрес запроса не найден');
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

    return xhr;
  };

  var load = function (onSuccess, onError) {
    var xhr = generateXhr(TIMEOUT, onSuccess, onError);

    xhr.open('GET', URL.get);
    xhr.send();
  };

  var send = function (data, onSuccess, onError) {
    var xhr = generateXhr(TIMEOUT, onSuccess, onError);

    xhr.open('POST', URL.post);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    send: send
  };
})();
