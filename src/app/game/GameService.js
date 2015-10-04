(function () {
  'use strict';

  angular.module('kiss').factory('GameService', GameService);

  /** @ngInject */
  function GameService(SettingsService) {
    var game = {
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
      },
      getGame: function getGame() {
        return game;
      }

    };
  }

})();
