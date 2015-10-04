(function () {
  'use strict';

  angular.module('kiss').factory('GameService', GameService);

  /** @ngInject */
  function GameService(SettingsService) {
    var initialLives,
      difficulty = {
        easy: {
          timeElementsToAdd: 5000,
          timeChangeColor: 10000
        },
        medium: {
          timeElementsToAdd: 2500,
          timeChangeColor: 5000
        },
        hard: {
          timeElementsToAdd: 1000,
          timeChangeColor: 3000
        }
      },
      game = {
        lives: 0,
        totalPointsWinPath: 0,
        assertPoint: 0,
        pointsToWin: 0,
        points: 0,
        pointsSuccess: 0,
        pointsFail: 0,
        pointsToAccessWorld: 0,
        pointsAtWinningWorld: 0,
        deployObjectsTime: 0
      };

    return {
      init: function () {
        SettingsService.getSettings().then(function (settings) {

          settings.forEach(function (setting) {
            var value = isNaN(setting.value) ? setting.value : +setting.value;
            switch (setting.id) {
              case 'initialLifes':
                game.lives = value;
                initialLives = value;
                break;
              default:
                game[setting.id] = value;
                break;
            }
          });
        });
      },
      validAction: function () {
        game.points += game.pointsToWin;
      },
      invalidAction: function () {
        game.points += -game.pointsFail;
        if(game.points < 0) {
          game.lives--;
        }
      },
      resetGame: function() {
        game.points = 0;
        game.lives = initialLives;
      },
      getGame: function getGame() {
        return game;
      },
      getDifficulty: function getDifficulty(type) {
        return difficulty[type];
      }

    };
  }

})();
