// import { Controller } from "@hotwired/stimulus"

// // Connects to data-controller="scroller"
// export default class extends Controller {
//   connect() {
//     const scroller = this.element;
//     scroller.setAttribute('data-animated', true);

//     const scrollerInner = scroller.querySelector(".scroller_inner");
//     const scrollerContent = Array.from(scrollerInner.children);

//     scrollerContent.forEach((item) => {
//       const duplicatedItem = item.cloneNode(true);
//       duplicatedItem.setAttribute("aria-hidden", true);
//       scrollerInner.appendChild(duplicatedItem);
//     });
//   }
// }


import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="scroller"
export default class extends Controller {
  connect() {
    const scroller = this.element;
    scroller.setAttribute('data-animated', true);

    const scrollerInner = scroller.querySelector(".scroller_inner");
    const scrollerContent = Array.from(scrollerInner.children);

    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", true);

      // Copier les événements
      this.copyEventListeners(item, duplicatedItem);

      scrollerInner.appendChild(duplicatedItem);
    });
  }

  copyEventListeners(original, clone) {
    const events = ["click", "mouseenter", "mouseleave"]; // Liste des événements à cloner
    events.forEach(event => {
      clone.addEventListener(event, (e) => {
        // Simuler un clic sur l'original
        original.dispatchEvent(new Event(event, { bubbles: true }));
      });
    });
  }

}

// import { Controller } from "@hotwired/stimulus";

// // Connects to data-controller="scroller"
// export default class extends Controller {
//   connect() {
//     const scroller = this.element;
//     scroller.setAttribute("data-animated", true);

//     const scrollerInner = scroller.querySelector(".scroller_inner");

//     // Vérifier si déjà dupliqué pour éviter le doublon
//     if (scrollerInner.dataset.duplicated) return;
//     scrollerInner.dataset.duplicated = "true";

//     // On duplique tout le contenu une seule fois
//     const originalContent = Array.from(scrollerInner.children);
//     originalContent.forEach((item) => {
//       const clonedItem = item.cloneNode(true);
//       clonedItem.setAttribute("aria-hidden", true);
//       this.copyEventListeners(item, clonedItem);
//       scrollerInner.appendChild(clonedItem);
//     });

//     // Ajuster la hauteur pour éviter tout saut
//     this.adjustHeight(scrollerInner);
//   }

//   adjustHeight(scrollerInner) {
//     setTimeout(() => {
//       let totalHeight = 0;
//       Array.from(scrollerInner.children).forEach((item) => {
//         totalHeight += item.offsetHeight + 50; // Ajouter le gap
//       });
//       scrollerInner.style.height = `${totalHeight}px`;
//     }, 100);
//   }

//   copyEventListeners(original, clone) {
//     const events = ["click", "mouseenter", "mouseleave"];
//     events.forEach((event) => {
//       clone.addEventListener(event, (e) => {
//         original.dispatchEvent(new Event(event, { bubbles: true }));
//       });
//     });
//   }
// }
