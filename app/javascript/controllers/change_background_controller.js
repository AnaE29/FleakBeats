import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  connect() {
    const body = document.querySelector(`body`);
    let count = 1;
    const max = 6;
    document.addEventListener("keyup", (event) => {
      if (event.key === "ArrowDown") {
        count -= 1
        if (count === 0) count = max
        body.setAttribute("id", `bg${count}`)
      } else if (event.key === "ArrowUp") {
        count += 1
        if (count === (max + 1)) count = 1
        body.setAttribute("id", `bg${count}`)
      }
    })
  }
}

/* const changeBackground = (event) => {
  if (event.key === "up") {
    moveBackground(1);
  } else if (event.key === "down") {
    moveBackground(2);
  }
};

document.addEventListener("keyup", changeBackground); */
