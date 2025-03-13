import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="player"
export default class extends Controller {
  // static targets = ["squidgame"]
  connect() {
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

        "songs": [
        {
          "name": "Squid-Game",
          "artist": "Toto",
          "url": "https://521dimensions.com/song/Anthem-Emancipator.mp3",
          "cover_art_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfNiZ_4Qb0qHbF6NT-QEee_F-osRFQJpWE1g&s"
        },

        {
          "name": "Test",
          "artist": "Test",
          "url": "/assets/test-67b5afd5839d9e7cf283122b8e248424e23339f157173b7ccdddab5b49962cd8.mp3",
          "cover_art_url": "https://521dimensions.com/img/open-source/amplitudejs/album-art/die-digital.jpg"
        },
        {
          "name": "Offcut #6",
          "artist": "Little People",
          "album": "We Are But Hunks of Wood Remixes",
          "url": "https://521dimensions.com/song/Offcut6-LittlePeople.mp3",
          "cover_art_url": "https://521dimensions.com/img/open-source/amplitudejs/album-art/we-are-but-hunks-of-wood.jpg"
        },
        {
          "name": "Dusk To Dawn",
          "artist": "Emancipator",
          "album": "Dusk To Dawn",
          "url": "https://521dimensions.com/song/DuskToDawn-Emancipator.mp3",
          "cover_art_url": "https://521dimensions.com/img/open-source/amplitudejs/album-art/from-dusk-to-dawn.jpg"
        },
        {
          "name": "Anthem",
          "artist": "Emancipator",
          "album": "Soon It Will Be Cold Enough",
          "url": "https://521dimensions.com/song/Anthem-Emancipator.mp3",
          "cover_art_url": "https://521dimensions.com/img/open-source/amplitudejs/album-art/soon-it-will-be-cold-enough.jpg"
        }
        ]
    });

    window.onkeydown = function(e) {
        return !(e.keyCode == 32);
    };
      }
}
