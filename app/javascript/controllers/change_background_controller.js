import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  connect() {
    document.querySelectorAll('video').forEach( (video) => {
      video.playbackRate = 0.8
    })
    let count = 1;
    const max = 3;
    document.addEventListener("keyup", (event) => {
      if (event.key === "ArrowDown") {
        console.log(document.querySelector(`#bg${count}`));
        document.querySelector(`#bg${count}`).classList.toggle('hidden')
        count -= 1
        if (count === 0) count = max
        document.querySelector(`#bg${count}`).classList.toggle('hidden')
      } else if (event.key === "ArrowUp") {
        document.querySelector(`#bg${count}`).classList.toggle('hidden')
        count += 1
        if (count === (max + 1)) count = 1
        document.querySelector(`#bg${count}`).classList.toggle('hidden')
      }
    })
  }
}
