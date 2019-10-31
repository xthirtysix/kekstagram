'use strict';
(function () {
  var buttonsContainer = document.querySelector('.img-filters__form');
  var buttons = buttonsContainer.querySelectorAll('.img-filters__button');
  var activeClass = 'img-filters__button--active';

  var onSuccess = function (data) {
    var feed = data.slice();
    window.render(feed);
    var filters = document.querySelector('.img-filters');
    filters.classList.remove('img-filters--inactive');

    var changeFilter = function (evt) {
      evt.preventDefault();

      buttonsContainer.querySelector('.' + activeClass)
      .classList.remove(activeClass);

      evt.target.classList.add(activeClass);
      window.render(window.useFilter(feed, evt.target.id));
    };

    var onFilterButtonsClick = window.utils.debounce(changeFilter);

    buttons.forEach(function (el) {
      el.addEventListener('click', onFilterButtonsClick);
    });
  };

  var onError = function (message) {
    window.message.error(message, getData);
  };

  var getData = function () {
    window.backend.load(onSuccess, onError);
  };

  getData();
})();
