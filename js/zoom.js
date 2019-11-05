'use strict';
(function () {
  var zoomIn = function (image, currentValue, maxValue, step) {
    var integer = parseInt(currentValue, 10);
    var newValue;

    if (integer < maxValue - step) {
      newValue = integer + step;
      currentValue = newValue + '%';
    } else if (integer >= maxValue - step) {
      newValue = maxValue;
      currentValue = '100%';
    }

    image.style.transform = 'scale(' + newValue / 100 + ')';
    return currentValue;
  };

  var zoomOut = function (image, currentValue, minValue, step) {
    var integer = parseInt(currentValue, 10);
    var newValue;

    if (integer > minValue) {
      newValue = integer - step;
      currentValue = newValue + '%';
    }

    image.style.transform = 'scale(' + newValue / 100 + ')';
    return currentValue;
  };

  window.zoom = {
    in: zoomIn,
    out: zoomOut
  };
})();
