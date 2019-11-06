'use strict';
(function () {
  var MAX_EFFECT_PERCENT = 100;

  var Effect = {
    CHROME: {
      MIN: 0,
      MAX: 1
    },
    SEPIA: {
      MIN: 0,
      MAX: 1
    },
    MARVIN: {
      MIN: 0,
      MAX: 100
    },
    PHOBOS: {
      MIN: 0,
      MAX: 3
    },
    HEAT: {
      MIN: 1,
      MAX: 3
    }
  };

  var form = document.querySelector('#upload-select-image');
  var uploadedImage = form.querySelector('.img-upload__preview img');
  var slider = form.querySelector('.effect-level');
  var effectLevel = slider.querySelector('.effect-level__value');

  var getEffectValue = function (effect) {
    return effect.MIN + (effect.MAX - effect.MIN) / MAX_EFFECT_PERCENT * window.slider.getValue();
  };

  var getEffect = function () {
    return {
      'chrome': 'grayscale(' + getEffectValue(Effect.CHROME) + ')',
      'sepia': 'sepia(' + getEffectValue(Effect.SEPIA) + ')',
      'marvin': 'invert(' + getEffectValue(Effect.MARVIN) + '%)',
      'phobos': 'blur(' + getEffectValue(Effect.PHOBOS) + 'px)',
      'heat': 'brightness(' + getEffectValue(Effect.HEAT) + ')'
    };
  };

  var renderEffect = function () {
    var effectName = form.effect.value;
    window.utils.hideVisually(slider);
    if (effectName !== 'none') {
      window.utils.cancelHideVisually(slider);
    }
    uploadedImage.className = '';
    uploadedImage.style.filter = '';
    uploadedImage.classList.add('effects__preview--' + effectName);
    uploadedImage.style.filter = getEffect()[effectName];
    effectLevel.value = window.slider.getValue();
  };

  window.effects = {
    render: renderEffect
  };
})();
