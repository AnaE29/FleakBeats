import { Controller } from "@hotwired/stimulus"
import Amplitude from "amplitudejs"

export default class extends Controller {
  static targets = ["show", "url"]

  connect() {

    let playlists = {};
    this.showTargets.forEach((showTarget) => {
      const urls = Array.from(showTarget.querySelectorAll('[data-player-target="url"]')).map((url) =>  url.src );
      const artists = Array.from(showTarget.querySelectorAll('[data-amplitude-info="artist"]')).map((artist) =>  artist.dataset.artist);
      const songs = urls.map((value, index) => { return { "url": value, "artist": artists[index] } });
      const playlistName = showTarget.dataset.playlistName;
      playlists[playlistName] = {"songs": songs };
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

    document.getElementById('song-saved').addEventListener('click', function(){
      document.getElementById('song-saved').classList.toggle('saved');
    });

    // ---------------- !TODO : Button Favorite! ------------------------------------


    Amplitude.init({
      "bindings": {
        37: 'prev',
        39: 'next',
        32: 'play_pause',
      },
      "callbacks": {
        timeupdate: function(){
          let percentage = Amplitude.getSongPlayedPercentage();

          if( isNaN( percentage ) ){
              percentage = 0;
          }

          let slider = document.getElementById('song-percentage-played');
          slider.style.backgroundSize = percentage + '% 100%';
        }
      },
      "songs": [
        {"url": "", "artist": ""}
      ],
      // songs: playlists['shrek']['songs'],

      playlists: playlists,

    });

    window.onkeydown = function(e) {
        return !(e.keyCode == 32);
    };

    console.log(playlists);



  }

  // autoplay() {
  //   this.showTarget.querySelector(".amplitude-play-pause").click();

  // }
}
