import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["dropdownHover", "results"];
  static values = { shows: Array }

  connect() {
    console.log("Connectedfriehfkjerhf");
    console.log(document.getElementsByClassName("front") || "No front");
  }

  show() {
    this.element.querySelector("#dropdownHover").classList.remove("hidden");
  }



  hide() {
    this.element.querySelector("#dropdownHover").classList.add("hidden");
  }

  filter(event) {
    const query = event.target.value;
    if (query.length < 2) {
      this.resultsTarget.innerHTML = "";
      return;
    }

    fetch(`/shows/autocomplete?query=${query}`, {
      headers: { "Accept": "application/json" }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.resultsTarget.innerHTML = "";
        data.forEach(show => {
          const div = document.createElement("div");

          div.textContent = show.name;
          console.log(div.textContent);
          div.classList.add("autocomplete-item", "p-2", "cursor-pointer", "text-red-500");
          div.addEventListener("click", () => {
            event.target.value = show.name;
            this.resultsTarget.innerHTML = "";
            console.log(document.querySelectorAll(`.show-card`));
            Array.from(document.querySelectorAll(".front")).filter(e => e.classList.contains(`id-${show.id}`))[0].click();
            // document.querySelectorAll(`.front id-${show.id}`)
          });
          this.resultsTarget.appendChild(div);
        });
      })
      .catch(error => console.error("Error", error));
  }


}
