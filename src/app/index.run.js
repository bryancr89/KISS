(function() {
  'use strict';

  angular
    .module('kiss')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
