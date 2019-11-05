'use strict';
(function () {
  var PERCENT = 100;
  var DECIMAL_SYSTEM = 10;

  var Zoom = {
    STEP: 25,
    MIN: 25,
    MAX: 100
  };

  var uploadedImageContainer = document.querySelector('.img-upload__preview');
  var uploadedImage = uploadedImageContainer.querySelector('img');

  var scaleImage = function (image, scale) {
    image.style.transform = 'scale(' + scale / PERCENT + ')';
  };

  var zoomIn = function (scaleLevel) {
    var currentScale = parseInt(scaleLevel, DECIMAL_SYSTEM);

    if (currentScale < Zoom.MAX) {
      currentScale += Zoom.STEP;
    }

    scaleImage(uploadedImage, currentScale);
    return currentScale + '%';
  };

  var zoomOut = function (scaleLevel) {
    var currentScale = parseInt(scaleLevel, DECIMAL_SYSTEM);

    if (currentScale > Zoom.MIN) {
      currentScale -= Zoom.STEP;
    }

    scaleImage(uploadedImage, currentScale);
    return currentScale + '%';
  };

  window.zoom = {
    in: zoomIn,
    out: zoomOut
  };
})();
