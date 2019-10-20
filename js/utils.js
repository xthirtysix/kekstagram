'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

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

  var getRandomNum = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  var hideVisually = function (element) {
    element.classList.add('visually-hidden');
  };

  var cancelHideVisually = function (element) {
    element.classList.remove('visually-hidden');
  };

  window.utils = {
    shuffleArray: shuffleArray,
    hasDuplicates: hasDuplicates,
    getRandomNum: getRandomNum,
    hideVisually: hideVisually,
    cancelHideVisually: cancelHideVisually,
    isEscKeycode: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterKeycode: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    }
  };
})();
