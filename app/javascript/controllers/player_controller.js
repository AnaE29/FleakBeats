import { Controller } from "@hotwired/stimulus"
import Amplitude from "amplitudejs"

export default class extends Controller {
  static targets = ["show", "url"]

  connect() {
    this.setAmplitude(false)
    document.addEventListener("keydown", () => {
      console.log(Amplitude);

    })
  }

  setAmplitude(isLofi) {
    let playlistsLofi = {}
    let playlistsNormal = {}
    this.showTargets.forEach((showTarget) => {
      const urls = Array.from(showTarget.querySelectorAll('[data-player-target="url"]')).map((url) =>  url.src );

      //-------------RECUPERATION DES URLS LOFI -------------------------------

      const urlsLofi = urls.filter(url => url.includes("lofi"));
      const urlsNormal = urls.filter(url => !url.includes("lofi"));
      //------------------------------------------------------------------------


      const artists = Array.from(showTarget.querySelectorAll('[data-amplitude-info="artist"]')).map((artist) =>  artist.dataset.artist);

      const songsLofi = urlsLofi.map((value, index) => { return { "url": value, "artist": artists[index] } });
      const songsNormal = urlsNormal.map((value, index) => { return { "url": value, "artist": artists[index] } });
      const playlistName = showTarget.dataset.playlistName;
      playlistsLofi[playlistName] = {"songs": songsLofi };
      playlistsNormal[playlistName] = {"songs": songsNormal };

    });


    // ---------------- TODO : Button Favorite ------------------------------------

    // const controller = this;

    // document.querySelectorAll('#song-saved').forEach((button) => {
    //   button.addEventListener('click', function(event) {
    //     event.stopPropagation();
    //     let track = controller.element.querySelector('[data-player-target="url"]').src
    //     track = track.split('/').pop().split('.').shift().split('-').shift();
    //     console.log(track);
    //     this.classList.toggle('saved');

    //     const isFavorite = this.classList.contains('saved');

    //     fetch('/favorites/toggle', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    //       },
    //       body: JSON.stringify({ song_id: track, favorite: isFavorite })
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //       console.log('Réponse du favorite controller:', data);
    //     })
    //     .catch(error => {
    //       console.error(error);
    //       this.classList.toggle('saved');
    //     });
    //   });
    // });

    // ---------------- !TODO : Button Favorite! ------------------------------------


    const test = Amplitude.init({
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

      playlists: isLofi ? playlistsLofi : playlistsNormal,

    });

    window.onkeydown = function(e) {
        return !(e.keyCode == 32);
    };

  }

  switch(event) {
    Amplitude.stop()
    const isChecked = event.target.checked;
    const playlist = Amplitude.getConfig().active_playlist
    const activeIndex = Amplitude.getConfig().playlists[Amplitude.getConfig().active_playlist].active_index
    this.setAmplitude(isChecked)
    Amplitude.skipTo( 0, activeIndex, playlist)
  }
}
