'use strict';
(function () {
  var RANDOM_COUNT = 10;

  var filterPopular = function (feed) {
    return feed.slice();
  };

  var filterRandom = function (feed) {
    return window.utils.shuffleArray(feed.slice())
      .slice(0, RANDOM_COUNT);
  };

  var filterDiscussed = function (feed) {
    return feed.slice()
      .sort(function (a, b) {
        var orderPriority = b.comments.length - a.comments.length;
        if (!orderPriority) {
          orderPriority = window.utils.compare(a.likes, b.likes);
        }

        return orderPriority;
      });
  };

  var buttonIdToFilter = {
    'filter-popular': filterPopular,
    'filter-random': filterRandom,
    'filter-discussed': filterDiscussed
  };

  var applyFilter = function (feed, id) {
    return buttonIdToFilter[id](feed);
  };

  window.filter = {
    apply: applyFilter
  };
})();
