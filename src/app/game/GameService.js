(function () {
  'use strict';

  angular.module('kiss').factory('GameService', GameService);

  /** @ngInject */
  function GameService() {
    var game = {
      numberOfLives: 3,
      totalPointsWinPath: 200,
      assertPoint: 10,
      failurePoints: 10,
      points: 0
    };

    return {
      init: function () {
        //TODO: Load default settings
      },
      validAction: function () {
        game.points += game.assertPoint;
      },
      invalidAction: function () {
        game.points += -game.failurePoints;
      },
      getGame: function getGame() {
        return game;
      }

    };
  }

})();
