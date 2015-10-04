(function () {
  'use strict';

  angular.module('path1')
    .service('loaderSvc', function () {
      var manifest = [
        {src: 'characters/baula_sprite.png', id: 'character'},
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

        {src: 'characters/jaguar/blue_char.png', id: 'jaguar-blue'},
        {src: 'characters/jaguar/green_char.png', id: 'jaguar-green'},
        {src: 'characters/jaguar/orange_char.png', id: 'jaguar-orange'},
        {src: 'characters/jaguar/red_char.png', id: 'jaguar-red'},
        {src: 'characters/jaguar/violet_char.png', id: 'jaguar-violet'},
        {src: 'characters/jaguar/yellow_char.png', id: 'jaguar-yellow'},

        {src: 'characters/mono/blue_char.png', id: 'mono-blue'},
        {src: 'characters/mono/green_char.png', id: 'mono-green'},
        {src: 'characters/mono/orange_char.png', id: 'mono-orange'},
        {src: 'characters/mono/red_char.png', id: 'mono-red'},
        {src: 'characters/mono/violet_char.png', id: 'mono-violet'},
        {src: 'characters/mono/yellow_char.png', id: 'mono-yellow'},

        {src: 'characters/perezoso/blue_char.png', id: 'perezoso-blue'},
        {src: 'characters/perezoso/green_char.png', id: 'perezoso-green'},
        {src: 'characters/perezoso/orange_char.png', id: 'perezoso-orange'},
        {src: 'characters/perezoso/red_char.png', id: 'perezoso-red'},
        {src: 'characters/perezoso/violet_char.png', id: 'perezoso-violet'},
        {src: 'characters/perezoso/yellow_char.png', id: 'perezoso-yellow'},

        {src: 'characters/rana/blue_char.png', id: 'rana-blue'},
        {src: 'characters/rana/green_char.png', id: 'rana-green'},
        {src: 'characters/rana/orange_char.png', id: 'rana-orange'},
        {src: 'characters/rana/red_char.png', id: 'rana-red'},
        {src: 'characters/rana/violet_char.png', id: 'rana-violet'},
        {src: 'characters/rana/yellow_char.png', id: 'rana-yellow'},

        {src: 'characters/tucan/blue_char.png', id: 'tucan-blue'},
        {src: 'characters/tucan/green_char.png', id: 'tucan-green'},
        {src: 'characters/tucan/orange_char.png', id: 'tucan-orange'},
        {src: 'characters/tucan/red_char.png', id: 'tucan-red'},
        {src: 'characters/tucan/violet_char.png', id: 'tucan-violet'},
        {src: 'characters/tucan/yellow_char.png', id: 'tucan-yellow'},

        {src: 'characters/venado/blue_char.png', id: 'venado-blue'},
        {src: 'characters/venado/green_char.png', id: 'venado-green'},
        {src: 'characters/venado/orange_char.png', id: 'venado-orange'},
        {src: 'characters/venado/red_char.png', id: 'venado-red'},
        {src: 'characters/venado/violet_char.png', id: 'venado-violet'},
        {src: 'characters/venado/yellow_char.png', id: 'venado-yellow'},

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
