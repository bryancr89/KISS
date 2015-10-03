(function() {
  'use strict';

  angular.module('path1')
    .factory("Character", ['loaderSvc', function (loaderSvc) {
      function Character(obj) {
        var spriteSheet = new createjs.SpriteSheet({
          framerate: 2,
          "images": [loaderSvc.getResult(obj.characterAssetName)],
          "frames": {"regX": 10, "height": 355, "count": 3, "regY": 0, "width": 261},
          // define two animations, run (loops, 1.5x speed) and jump (returns to run):
          "animations": {
            "run": [0, 2, "run", 1.2],
            "jump": [0, 2, "run"]
          }
        });
        this.grant = new createjs.Sprite(spriteSheet, "run");
        this.grant.y = obj.y;
        this.grant.x = obj.x;

      }
      Character.prototype = {
        addToStage: function (stage) {
          stage.addChild(this.grant);
        },
        removeFromStage: function (stage) {
          stage.removeChild(this.grant);
        },
        getWidth: function () {
          return this.grant.getBounds().width * this.grant.scaleX;
        },
        getX: function () {
          return this.grant.x;
        },
        setX: function (val) {
          //this.grant.x =  val;
        },
        playAnimation: function (animation) {
          //this.grant.gotoAndPlay(animation);
        }
      };
      return (Character);
    }
    ]);
}());
