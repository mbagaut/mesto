export class Section {
  constructor({ renderer }, { cardsContainer }) {
    this._cardsContainer = document.querySelector(cardsContainer);
    this._renderer = renderer;
  }

  renderCards(cards) {
    this._renderedItems = cards;
    for (let i = this._renderedItems.length - 1; i >= 0; i--) {
      this._renderer(this._renderedItems[i])
    }
  }

  addItem(card) {
    this._cardsContainer.prepend(card);
  }
}
