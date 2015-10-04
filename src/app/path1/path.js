(function() {
  'use strict';
  angular.module('path1', [])
    .controller('PathOneController', PathOneController);

  /** @ngInject */
  function PathOneController($scope, $window, PlayerService, GameService) {
    var vm = this;
    $scope.windowWidth = $window.innerWidth;
    $scope.gameHeight = 600;
    $scope.score = 0;
    $scope.lifesCount = 3;
    $scope.game = GameService.getGame();
    vm.game = $scope.game;
    vm.player = PlayerService.getPlayer();

    $scope.$watch('game', function (newValue) {
      if(newValue.lives === 0) {
        //TODO: Game over.
        return;
      }
      if(newValue.points < 0) {
        //TODO show you have one live less;

      }

    }, true);
  }
})();
