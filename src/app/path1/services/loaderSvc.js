(function () {
  'use strict';

  angular.module('path1')
    .service('loaderSvc', function () {
      var manifest = [
        {src: 'characters/baula_sprite.png', id: 'grant'},
        {src: 'characters/baula/blue_char.png', id: 'baula-blue'},
        {src: 'characters/baula/green_char.png', id: 'baula-green'},
        {src: 'characters/baula/orange_char.png', id: 'baula-orange'},
        {src: 'characters/baula/red_char.png', id: 'baula-red'},
        {src: 'characters/baula/violet_char.png', id: 'baula-violet'},
        {src: 'characters/baula/yellow_char.png', id: 'baula-yellow'},

        {src: 'characters/colibri/blue_char.png', id: 'colibri-blue'},
        {src: 'characters/colibri/green_char.png', id: 'colibri-green'},
        {src: 'characters/colibri/orange_char.png', id: 'colibri-orange'},
        {src: 'characters/colibri/red_char.png', id: 'colibri-red'},
        {src: 'characters/colibri/violet_char.png', id: 'colibri-violet'},
        {src: 'characters/colibri/yellow_char.png', id: 'colibri-yellow'},


        {src: 'butterfly/blue.png', id: 'butterfly-blue'},
        {src: 'butterfly/green.png', id: 'butterfly-green'},
        {src: 'butterfly/orange.png', id: 'butterfly-orange'},
        {src: 'butterfly/red.png', id: 'butterfly-red'},
        {src: 'butterfly/violet.png', id: 'butterfly-violet'},
        {src: 'butterfly/yellow.png', id: 'butterfly-yellow'},

        {src: 'sky.png', id: 'sky'},
        {src: 'path1/FISERV-PROGRAMATHON-CAMINO1-FONDO_FONDO.png', id: 'ground'},
        {src: 'hill1.png', id: 'hill'},
        {src: 'hill2.png', id: 'hill2'},
        {src: 'logo.png', id: 'logo'},
        {src: 'runningTrack.mp3', id: 'runningSound'},
        {src: 'jump.mp3', id: 'jumpingSound'}
      ], loader = new createjs.LoadQueue(true);
      createjs.Sound.registerPlugins([createjs.HTMLAudioPlugin]);  // need this so it doesn't default to Web Audio
      loader.installPlugin(createjs.Sound);
      this.getResult = function (asset) {
        return loader.getResult(asset);
      };
      this.getLoader = function () {
        return loader;
      };
      this.loadAssets = function () {
        loader.loadManifest(manifest, true, '/assets/');
      };
    });

}());
