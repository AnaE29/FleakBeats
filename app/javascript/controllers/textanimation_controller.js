import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="textanimation"
export default class extends Controller {
  static targets = ["text"]
  connect() {
    this.animateText()

    }

    animateText() {
      let delay = 100;
      let delay_start = 400;

      let contents = this.textTarget.textContent.trim();
      this.textTarget.textContent = "";
      let letters = contents.split("");

      this.textTarget.style.visibility = "visible";
      letters.forEach((letter, index) => {
        setTimeout(() => {
          this.textTarget.textContent += letter;
        }, delay_start + delay * index);
      });
      delay_start += delay * letters.length;
    }


  }
