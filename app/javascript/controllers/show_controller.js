import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = { index: Number }

  open(event) {
    if (this.element.classList.contains("flipped")) return;

    if (window.currentlyOpenCard && window.currentlyOpenCard !== this) {
      window.currentlyOpenCard.close();
    }
    
    this.element.classList.add("flipped");
    window.currentlyOpenCard = this;

    if (typeof Amplitude !== "undefined" && this.hasIndexValue) {
      Amplitude.playSongAtIndex(this.indexValue);
    }
  }

  close(event) {
    this.element.classList.remove("flipped");
    if (window.currentlyOpenCard === this) {
      window.currentlyOpenCard = null;
    }
    if (typeof Amplitude !== "undefined") {
      Amplitude.pause();
    }
  }
}
