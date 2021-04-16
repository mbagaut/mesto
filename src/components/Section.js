export class Section {
  constructor({ items, renderer }, { cardsContainer }) {
    this._cardsContainer = cardsContainer;
    this._renderedItems = items;
    this._renderer = renderer;
  }

  renderCards() {
    this._renderedItems.forEach(item => this._renderer(item));
  }

  addItem(card) {
    this._cardsContainer.prepend(card);
  }
}
