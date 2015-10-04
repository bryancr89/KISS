/**
 * Created by Carlos Salas on 10/3/2015.
 */

(function () {
  'use strict';

  angular.module('kiss').controller('WorldOneController', WorldOneController);

  /** @ngInject */
  function WorldOneController($scope, $state, $timeout, PlayerService, GameService, GameDialogsService) {
    var vm = this;

    vm.scenarios = {
      'CAMPOFERIAL': {
        background: 'fondo',
        items: [{
          title: 'algodon'
        }, {
          title: 'bola'
        }, {
          title: 'churros'
        }, {
          title: 'gaseosa'
        }, {
          title: 'globo'
        }, {
          title: 'gorra'
        }, {
          title: 'granizado'
        }, {
          title: 'hamburguesa'
        }, {
          title: 'manzana'
        }, {
          title: 'mascarada'
        }, {
          title: 'molino'
        }, {
          title: 'monedas'
        }, {
          title: 'oso'
        }, {
          title: 'paleta'
        }, {
          title: 'pulseras'
        }, {
          title: 'tiquete'
        }]
      },
      'MAR': {
        background: 'mar',
        items: [{
          title: 'ancla'
        }, {
          title: 'anguila'
        }, {
          title: 'ballena'
        }, {
          title: 'botella'
        }, {
          title: 'buzo'
        }, {
          title: 'caracol'
        }, {
          title: 'caracol2'
        }, {
          title: 'cofre'
        }, {
          title: 'coral'
        }, {
          title: 'mantarraya'
        }, {
          title: 'medusa'
        }, {
          title: 'patasrana'
        }, {
          title: 'pezangel'
        }, {
          title: 'pezpayazo'
        }, {
          title: 'tiburon'
        }, {
          title: 'tortuga'
        }]
      },
      'PLAYA': {
        background: 'fondo',
        items: [{
          title: '1'
        }, {
          title: '2'
        }, {
          title: '3'
        }, {
          title: '4'
        }, {
          title: '5'
        }, {
          title: '6'
        }, {
          title: '7'
        }, {
          title: '8'
        }, {
          title: '9'
        }, {
          title: '10'
        }, {
          title: '11'
        }, {
          title: '12'
        }, {
          title: '13'
        }, {
          title: '14'
        }, {
          title: '15'
        }, {
          title: 'ola'
        }]
      }
    };
    vm.player = PlayerService.getPlayer();
    var gameDifficulty = GameService.getDifficulty('worldOne', vm.player.difficulty);
    function getDisorderedList(elementsToDisplay) {
      var items = vm.scenario.items,
        results = [];

      while (results.length < elementsToDisplay) {
        var item = items[Math.floor(Math.random() * elementsToDisplay)];
        if (results.indexOf(item) === -1) {
          results.push(item);
        }
      }
      return results
    }

    function start() {
      var scenariosList = Object.keys(vm.scenarios),
        scenarioIndex = Math.floor(Math.random() * scenariosList.length);

      vm.scenarioKey = scenariosList[scenarioIndex];
      vm.scenario = vm.scenarios[vm.scenarioKey];
      vm.disordedList = getDisorderedList(gameDifficulty.elementsToDisplay);
      vm.originalDisordedList = angular.copy(vm.disordedList);
      vm.waiting = false;
      vm.canDragDrop = false;
      vm.finished = false;
      vm.timer = 7000;

      vm.dropCallback = function dropCallback(event, ui) {
        if (areEquals()) {
          vm.finished = true;
          GameDialogsService.wonGame().closePromise.then(function () {
            $state.go('home', {step: 4});
          });
        }
      };

      $timeout(function () {
        vm.waiting = true;
        init();
      }, gameDifficulty.timeToRememberElements);
    }

    function updateTimer() {
      $timeout(function () {
        vm.timer -= 1000;
        if (vm.finished) {
          return;
        }
        if (vm.timer >= 1) {
          return updateTimer();
        }
        GameDialogsService.loseGame().closePromise.then(function () {
          start();
        });
      }, 1000);
    }

    function areEquals() {
      var result = true;
      vm.originalDisordedList.forEach(function (item, index) {
        if (item.title !== vm.disordedList[index].title) {
          result = false;
        }
      });

      return result;
    }

    function init() {
      vm.canDragDrop = true;
      while(areEquals()) {
        vm.disordedList = getDisorderedList(gameDifficulty.elementsToDisplay);
      }

      $timeout(function () {
        vm.waiting = false;
        updateTimer();
      }, 1000)
    }

    start();

    $scope.$on('$destroy', function() {
      vm.finished = true;
    });
  }

})();
