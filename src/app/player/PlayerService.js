(function () {
  'use strict';

  angular.module('kiss').factory('PlayerService', PlayerService);

  function PlayerService() {
    var player = {
      points: 0,
      name: '',
      character: 'colibri'
    };

    return {
      getPlayer: function getPlayer() {
        return player;
      },
      setCharacter: function setCharacter(character) {
        player.character = character;
        return this;
      },
      setDifficulty: function setDifficulty(difficulty) {
       player.difficulty = difficulty;
        return this;
      },
      setName: function setName(name) {
        player.name = name;
        return this;
      }
    };
  }

})();
