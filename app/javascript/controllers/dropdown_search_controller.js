import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["item"];

  filter(event) {
    const query = event.target.value.toLowerCase();

    this.itemTargets.forEach((item) => {
      const text = item.textContent.toLowerCase();
      item.style.display = text.includes(query) ? "block" : "none";
    });
  }
}
