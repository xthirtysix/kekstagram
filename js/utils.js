'use strict';
(function () {
  var DEBOUNCE_TIMOUT = 500;

  var Keycode = {
    ESC: 27,
    ENTER: 13
  };

  var shuffleArray = function (arr) {
    var i;
    var j;
    var k;

    for (i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      k = arr[i];
      arr[i] = arr[j];
      arr[j] = k;
    }

    return arr;
  };

  var hasDuplicates = function (array) {
    var duplicates = [];

    for (var i = 0; i < array.length; i++) {
      var value = array[i].toLowerCase();

      if (duplicates.indexOf(value) !== -1) {
        return true;
      }

      duplicates.push(value);
    }

    return false;
  };

  var compare = function (a, b) {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  };

  var getRandomNum = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  var hideVisually = function (element) {
    element.classList.add('visually-hidden');
  };

  var cancelHideVisually = function (element) {
    element.classList.remove('visually-hidden');
  };

  var preventDebounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var args = arguments;

      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }

      lastTimeout = window.setTimeout(function () {
        cb.apply(null, args);
      }, DEBOUNCE_TIMOUT);
    };
  };

  window.utils = {
    shuffleArray: shuffleArray,
    hasDuplicates: hasDuplicates,
    compare: compare,
    getRandomNum: getRandomNum,
    hideVisually: hideVisually,
    cancelHideVisually: cancelHideVisually,
    preventDebounce: preventDebounce,
    isEscKeycode: function (evt, action) {
      if (evt.keyCode === Keycode.ESC) {
        action();
      }
    },
    isEnterKeycode: function (evt, action) {
      if (evt.keyCode === Keycode.ENTER) {
        action();
      }
    }
  };
})();
