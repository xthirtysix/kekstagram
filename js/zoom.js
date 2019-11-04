'use strict';
(function () {
  var zoomIn = function (image, currentValue, maxValue, step) {
    if (parseFloat(currentValue) < maxValue - step) {
      var newValue = parseFloat(currentValue) + step;
      image.style.transform = 'scale(0.' + newValue + ')';
      currentValue = newValue + '%';
    } else if (parseFloat(currentValue) >= maxValue - step) {
      image.style.transform = 'scale(1)';
      currentValue = '100%';
    }

    return currentValue;
  };

  var zoomOut = function (image, currentValue, minValue, step) {
    if (parseFloat(currentValue) > minValue) {
      var newValue = parseFloat(currentValue) - step;
      image.style.transform = 'scale(0.' + newValue + ')';
      currentValue = newValue + '%';
    }

    return currentValue;
  };

  window.zoom = {
    in: zoomIn,
    out: zoomOut
  };
})();
