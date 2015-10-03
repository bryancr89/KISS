(function () {
  'use strict';
  /**/
  angular.module('kiss').controller('PlayerController', PlayerController);

  /** @ngInject */
  function PlayerController(PlayerService) {
    var vm = this;
    vm.player = PlayerService.getPlayer();
  }

})();
