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


    // ---------------- TODO : Button Favorite ------------------------------------

    const controller = this;

    document.querySelectorAll('#song-saved').forEach((button) => {
      button.addEventListener('click', function(event) {
        event.stopPropagation();
        var track = Amplitude.getActiveSongMetadata().url.split('/').pop().split('.').shift().split('-').shift();
        this.classList.toggle('saved');

        const isFavorite = this.classList.contains('saved');

        fetch('/favorites/toggle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
          },
          body: JSON.stringify({ song_id: track, favorite: isFavorite })
        })
        .then(response => response.json())
        .then(data => {
          console.log('Réponse du favorite controller:', data);
        })
        .catch(error => {
          console.error(error);
          this.classList.toggle('saved');
        });
      });
    });

    // ---------------- !TODO : Button Favorite! ------------------------------------


    Amplitude.init({
      "bindings": {
        37: 'prev',
        39: 'next',
        32: 'play_pause',
      },
      "callbacks": {
        song_change: function() {
          let track = Amplitude.getActiveSongMetadata().url.split('/').pop().split('.').shift().split('-').shift();
          fetch(`/favorites/check?song_id=${track}`, {
            headers: { 'Content-Type': 'application/json' }
          })
            .then(response => response.json())
            .then(data => {
              let button = document.getElementById('song-saved');
              if (data.favorite) {
                console.log("good");
                button.classList.toggle('saved');
              }
            })
            .catch(error => {
              console.error("Erreur lors de la vérification du favori: ", error);
            });
        },
        timeupdate: function() {
          let percentage = Amplitude.getSongPlayedPercentage();
          if (isNaN(percentage)) {
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
