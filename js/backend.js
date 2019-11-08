'use strict';
(function () {
  var Url = {
    GET: 'https://js.dump.academy/kekstagram/data',
    POST: 'https://js.dump.academy/kekstagram'
  };

  var Code = {
    SUCCESS: 200,
    NOT_FOUND: 404,
    SERVER_ERROR: 500
  };

  var TIMEOUT = 5000;

  var generateXhr = function (timeout, onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.timeout = timeout;

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case (Code.SUCCESS):
          onSuccess(xhr.response);
          break;
        case (Code.NOT_FOUND):
          onError('Адрес запроса не найден');
          break;
        case (Code.SERVER_ERROR):
          onError('Ошибка сервера');
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

    xhr.open('GET', Url.GET);
    xhr.send();
  };

  var send = function (data, onSuccess, onError) {
    var xhr = generateXhr(TIMEOUT, onSuccess, onError);

    xhr.open('POST', Url.POST);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    send: send
  };
})();
