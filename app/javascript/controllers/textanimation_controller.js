import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="textanimation"
export default class extends Controller {
  static targets = ["text"]

  connect() {
    this.animateText()
  }

  animateText() {
    let delay = 100;
    let delay_start = 700;
    this.textTarget.textContent = "";
    let letters = "Cliques sur une carte pour écouter la playlist".split("");

    letters.forEach((letter, index) => {
      setTimeout(() => {
        this.textTarget.textContent += letter;
      }, delay_start + delay * index);
    });



    setTimeout(() => {
      letters.forEach((letter, index) => {
        setTimeout(() => {
          letters.pop()
          this.textTarget.textContent = letters.join('')
        }, delay_start + delay * index);
      })
    }, 30000);
  }
}
