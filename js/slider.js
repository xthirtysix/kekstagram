'use strict';
(function () {
  var MAX_SATURATION_PERCENT = 100;


  var sliderLine = document.querySelector('.effect-level__line');
  var sliderPin = sliderLine.querySelector('.effect-level__pin');
  var depthLevel = sliderLine.querySelector('.effect-level__depth');

  var getValue = function () {
    return Math.round(sliderPin.offsetLeft / sliderLine.offsetWidth * MAX_SATURATION_PERCENT);
  };

  var onSliderPinMousedown = function (evt) {
    evt.preventDefault();

    var start = evt.clientX;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = start - moveEvt.clientX;
      var pinOffset = sliderPin.offsetLeft - shift;

      start = moveEvt.clientX;

      if (pinOffset >= 0 && pinOffset <= sliderLine.offsetWidth) {
        var position = pinOffset + 'px';
        sliderPin.style.left = position;
        depthLevel.style.width = position;
      } else {
        return;
      }

      if (sliderPin.offsetLeft < 0) {
        sliderPin.offsetLeft = 0;
      } else if (sliderPin.offsetLeft > sliderLine.offsetWidth) {
        sliderPin.offsetLeft = sliderLine.offsetWidth;
      }
      window.effects.render();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var resetSlider = function () {
    sliderPin.style.left = MAX_SATURATION_PERCENT + '%';
    depthLevel.style.width = MAX_SATURATION_PERCENT + '%';
  };

  var initSlider = function () {
    sliderPin.addEventListener('mousedown', onSliderPinMousedown);
  };

  var haltSlider = function () {
    sliderPin.removeEventListener('mousedown', onSliderPinMousedown);
  };

  window.slider = {
    init: initSlider,
    halt: haltSlider,
    reset: resetSlider,
    getValue: getValue
  };
})();
