(function() {
  'use strict';
  angular.module('path1', [])
    .controller('PathOneController', PathOneController);

  /** @ngInject */
  function PathOneController($scope, $window, PlayerService) {
    var vm = this;
    $scope.windowWidth = $window.innerWidth;
    $scope.gameHeight = 600;
    $scope.score = 0;
    $scope.lifesCount = 3;
    this.player = PlayerService.getPlayer();

  }
})();
