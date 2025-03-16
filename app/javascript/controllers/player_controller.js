import { Controller } from "@hotwired/stimulus"
import Amplitude from "amplitudejs"
// Connects to data-controller="player"
export default class extends Controller {
  static targets = ["show", "url"]
  // pour Rudy
  ///  static values = { songs: Array }
  connect() {


    // "amplitude-playlist": this.showTarget.dataset.amplitudePlaylist}





    let playlists = {};
    this.showTargets.forEach((showTarget) => {
      const urls = Array.from(showTarget.querySelectorAll('[data-player-target="url"]')).map((url) => { return {"url": url.src}} );
      const playlistName = showTarget.dataset.playlistName;
      playlists[playlistName] = {"songs": urls};
    });



    /*  const url = this.squidgameTarget.src
      console.log(url) */

    // ------------------------- GESTION SWITCH THEME ------------------------------

    // let theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

    // if( theme == 'dark' ){
    //     document.documentElement.classList.add('dark')
    // }

    // document.getElementById('dark-mode-toggle').addEventListener('click', function(){
    //   document.documentElement.classList.toggle('dark')
    // });
    // ------------------------- !GESTION SWITCH THEME! ------------------------------


    // ---------------- TODO : Button Favorite ------------------------------------

    // document.getElementById('song-saved').addEventListener('click', function(){
    //   document.getElementById('song-saved').classList.toggle('saved');
    // });

    // ---------------- !TODO : Button Favorite! ------------------------------------




    //----------- TODO : Récupération du lien MP3 pour le lecteur --------------


    //--------------------------------------------------------------------------
    Amplitude.init({
      "bindings": {
        37: 'prev',
        39: 'next',
        32: 'play_pause'
      },
      "callbacks": {
        timeupdate: function(){
          let percentage = Amplitude.getSongPlayedPercentage();

          if( isNaN( percentage ) ){
              percentage = 0;
          }

          /**
           * Massive Help from: https://nikitahl.com/style-range-input-css
           */
          let slider = document.getElementById('song-percentage-played');
          slider.style.backgroundSize = percentage + '% 100%';
        }
      },
      "songs": [
        {"url": ""}
      ],

      // songs: playlists['shrek']['songs'],

      playlists: playlists,
    });

    window.onkeydown = function(e) {
        return !(e.keyCode == 32);
    };
    console.log(playlists);


  }
}
