import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static highestZIndex = 1;

  connect() {
    this.element.style.position = "absolute";
    this.element.style.zIndex = Controller.highestZIndex++;
    this.randomizePosition();

    this.pos1 = this.pos2 = this.pos3 = this.pos4 = 0;
    this.isDragging = false;
  }

  randomizePosition() {
    const maxWidth = window.innerWidth - this.element.offsetWidth;
    const maxHeight = window.innerHeight - this.element.offsetHeight;

    const randomX = Math.random() * maxWidth;
    const randomY = Math.random() * maxHeight;

    this.element.style.left = `${randomX}px`;
    this.element.style.top = `${randomY}px`;
  }

  startDrag(event) {
    event.preventDefault();
    this.isDragging = false;

    this.bringToFront();

    this.pos3 = event.clientX;
    this.pos4 = event.clientY;

    document.onmouseup = this.stopDrag.bind(this);
    document.onmousemove = this.drag.bind(this);
  }

  bringToFront() {
    this.element.style.zIndex = ++Controller.highestZIndex;
  }

  drag(event) {
    event.preventDefault();
    this.isDragging = true;

    this.pos1 = this.pos3 - event.clientX;
    this.pos2 = this.pos4 - event.clientY;
    this.pos3 = event.clientX;
    this.pos4 = event.clientY;

    this.element.style.top = `${this.element.offsetTop - this.pos2}px`;
    this.element.style.left = `${this.element.offsetLeft - this.pos1}px`;
  }

  stopDrag() {
    document.onmouseup = null;
    document.onmousemove = null;
    setTimeout(() => {
      if (!this.isDragging) {
        this.element.click();
      }
    }, 50);
  }
}
