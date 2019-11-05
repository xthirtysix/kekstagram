'use strict';
(function () {
  var buttonsContainer = document.querySelector('.img-filters__form');
  var activeClass = 'img-filters__button--active';
  var activeFilter = buttonsContainer.querySelector('.img-filters__button--active');
  var feedFilter = document.querySelector('.img-filters');

  var onSuccess = function (data) {
    var feed = data.slice();
    window.render(feed);
    feedFilter.classList.remove('img-filters--inactive');

    var changeFilter = function (evt) {
      evt.preventDefault();

      activeFilter.classList.remove(activeClass);
      evt.target.classList.add(activeClass);
      activeFilter = evt.target;
      window.render(window.filter.apply(feed, evt.target.id));
    };

    var onFilterButtonsClick = window.utils.preventDebounce(changeFilter);

    buttonsContainer.addEventListener('click', onFilterButtonsClick);
  };

  var onError = function (message) {
    window.message.error(message, getData);
  };

  var getData = function () {
    window.backend.load(onSuccess, onError);
  };

  getData();
})();
