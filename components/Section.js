export default class Section {
  constructor({data, renderer}, containerElement) {
    this._renderedItems = data;
    this._renderer = renderer;

    this._container = containerElement;
  }

  setItem(element) {
    this._container.prepend(element);
  }

  clear() {
    this._container.innerHtml = '';
  }

  renderItems() {
    this.clear();

    this._renderedItems.forEach((item) => {
      this.setItem(this._renderer(item));
    });
  }
}
