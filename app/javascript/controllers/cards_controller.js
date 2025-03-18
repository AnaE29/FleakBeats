import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["modal"]



  open() {
    this.modalTarget.classList.add("show");
    this.modalTarget.addEventListener("click", this.close.bind(this));
  }

  close(event) {
    if (event.target === this.modalTarget) {
      this.modalTarget.classList.remove("show");
    }
  }
  
}
