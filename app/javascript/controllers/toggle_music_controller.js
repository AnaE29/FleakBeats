import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  switch(event) {
    const isChecked = event.target.checked;
    const container = document.getElementById("soundcloud-container");

    if (!container) return;

    if (isChecked) {
      console.log("Mode Chill activé (Lofi)");

      container.innerHTML = `
        <iframe width="100%" height="600" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1328002846&color=%233329ab&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/fighting-koj" title="Edit" target="_blank" style="color: #cccccc; text-decoration: none;">Edit</a> · <a href="https://soundcloud.com/fighting-koj/suzume-no-tojimari-lyrics-mp3" title="스즈메의 문단속 - 참새  | すずめの戸締とじまり - すずめ  | suzume no tojimari  lyrics" target="_blank" style="color: #cccccc; text-decoration: none;">스즈메의 문단속 - 참새  | すずめの戸締とじまり - すずめ  | suzume no tojimari  lyrics</a></div>`;
    } else {
      console.log("Mode Boost activé (Normal)");

      container.innerHTML = `
        <iframe width="100%" height="600" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1543953862&color=%233329ab&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/maki-chill" title="MAKI" target="_blank" style="color: #cccccc; text-decoration: none;">MAKI</a> · <a href="https://soundcloud.com/maki-chill/suzume-lofi-cover" title="Suzume (lofi)" target="_blank" style="color: #cccccc; text-decoration: none;">Suzume (lofi)</a></div>`;
    }
  }
}
