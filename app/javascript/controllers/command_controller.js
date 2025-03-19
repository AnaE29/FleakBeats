import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["commandHover"];

  show() {
    this.element.querySelector("#commandHover").classList.remove("hidden");
  }

  hide() {
    this.element.querySelector("#commandHover").classList.add("hidden");
  }
}
