import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["dropdownHover"];

  show() {
    this.element.querySelector("#dropdownHover").classList.remove("hidden");
  }

  hide() {
    this.element.querySelector("#dropdownHover").classList.add("hidden");
  }
}
