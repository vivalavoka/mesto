export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;

    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  clear() {
    this._container.innerHtml = '';
  }

  renderItems() {
    this.clear();

    this._renderedItems.forEach((element) => {
      this.addItem(this._renderer(element));
    });
  }
}
