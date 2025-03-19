// import { Controller } from "@hotwired/stimulus"

// export default class extends Controller {
//   static values = { index: Number }

//   open(event) {
//     if (this.element.classList.contains("flipped")) return;

//     if (window.currentlyOpenCard && window.currentlyOpenCard !== this) {
//       window.currentlyOpenCard.close();
//     }

//     this.element.classList.add("flipped");
//     window.currentlyOpenCard = this;

//     if (typeof Amplitude !== "undefined" && this.hasIndexValue) {
//       Amplitude.playSongAtIndex(this.indexValue);
//     }

//     const focus_container = document.getElementById("focus");
//     focus_container.appendChild(this.element);

//   }

//   close(event) {
//     this.element.classList.remove("flipped");
//     if (window.currentlyOpenCard === this) {
//       window.currentlyOpenCard = null;
//     }
//     if (typeof Amplitude !== "undefined") {
//       Amplitude.pause();
//     }
//   }
// }


// si ma carte est retourné je la sors du scroll

import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = { index: Number }

  open(event) {
    const focusContainer = document.getElementById("focus");
    const scrollerInner = document.querySelector(".scroller_inner"); // Le conteneur du scroll

    // Vérifie si une carte est déjà dans le focus
    if (window.currentlyOpenCard && window.currentlyOpenCard !== this.element) {
      // Ramène l'ancienne carte dans le scroll
      scrollerInner.appendChild(window.currentlyOpenCard);
      window.currentlyOpenCard.classList.remove("flipped");
    }

    // Déplace la nouvelle carte dans le focus
    focusContainer.appendChild(this.element);
    this.element.classList.add("flipped");

    // Sauvegarde la carte actuellement dans le focus
    window.currentlyOpenCard = this.element;

    if (typeof Amplitude !== "undefined" && this.hasIndexValue) {
      Amplitude.playSongAtIndex(this.indexValue);
    }
  }

  close(event) {
    const scrollerInner = document.querySelector(".scroller_inner"); // Le conteneur du scroll

    // Ramène la carte dans le scroll
    scrollerInner.appendChild(this.element);
    this.element.classList.remove("flipped");

    if (window.currentlyOpenCard === this.element) {
      window.currentlyOpenCard = null;
    }

    if (typeof Amplitude !== "undefined") {
      Amplitude.pause();
    }
  }
}
