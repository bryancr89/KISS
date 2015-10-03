(function () {
  'use strict';

  angular.module('path1')
    .factory("Butterfly", Butterfly);

  /** @ngInject */
  function Butterfly(loaderSvc) {
    function Butterfly(obj) {
      var self = this,
        spriteSheet = new createjs.SpriteSheet({
        framerate: 3,
        "images": [loaderSvc.getResult(obj.butterflyAssetName)],
        "frames": {"regX": 0, "height": 75, "count": 5, "regY": 0, "width": 73},
        // define two animations, run (loops, 1.5x speed) and jump (returns to run):
        "animations": {
          "run": [0, 3, "run", 1.5]
        }
      });

      this.butterfly = new createjs.Sprite(spriteSheet, "run");
      this.butterfly.color = obj.color;
      this.butterfly.y = obj.y;
      this.butterfly.x = obj.x;

      this.butterfly.on('mousedown', function () {
        obj.validateAction();
        this.parent.removeChild(this);
      });
    }

    Butterfly.prototype = {
      addToStage: function (stage) {
        stage.addChild(this.butterfly);
      },
      removeFromStage: function (stage) {
        stage.removeChild(this.butterfly);
      },
      getWidth: function () {
        return this.butterfly.getBounds().width * this.butterfly.scaleX;
      },
      getX: function () {
        return this.butterfly.x;
      },
      setX: function (val) {
        this.butterfly.x = val;
      },
      playAnimation: function (animation) {
        //this.butterfly.gotoAndPlay(animation);
      }
    };
    return (Butterfly);
  }
})();
