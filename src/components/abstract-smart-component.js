import AbstractComponent from "./abstract-component";

export default class AbstractSmartComponent extends AbstractComponent {
  recoveryListeners() {
    throw new Error (`Abstract method not implemented: recoveryListeners`);
  }

  rerender () {
    const oldElement = this.getElement();
    // console.dir(oldElement);
    const parent = oldElement.parentElement;

    this.removeElement();

    const newElement = this.getElement();
    // console.dir(newElement);

    parent.replaceChild(newElement, oldElement);

    this.recoveryListeners();
  }
}