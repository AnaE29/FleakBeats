import { Controller } from "@hotwired/stimulus"
import Amplitude from "amplitudejs"
// Connects to data-controller="player"
export default class extends Controller {
  static targets = ["url", "show"]
  // pour Rudy
///  static values = { songs: Array }
  connect() {
    console.log(this.showTarget.dataset.amplitudePlaylist);

    let songs = []
    this.urlTargets.forEach(song => {
      songs.push({"url": song.attributes.src.value, "amplitude-playlist": this.showTarget.dataset.amplitudePlaylist})
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
    let audioElement = document.querySelector('audio');

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

      // songs: this.songsValue,



        "songs": songs
    });

    window.onkeydown = function(e) {
        return !(e.keyCode == 32);
    };
      }
}
