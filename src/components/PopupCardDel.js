import { Popup } from './Popup.js';

export default class PopupCardDel extends Popup {
  constructor(popupDel, api) {
    super(popupDel);
    this._api = api;
    this._popup = popupDel;
  }

  open(cardItem, card) {
    this._card = card;
    this._cardItem = cardItem;
    this._popup.addEventListener('submit', this._submitForm);
    super.open();
  }

  _submitForm = (evt) => {
    evt.preventDefault();
    this._api.deleteCard(this._cardItem._id)
      .then(() => {
        this._card.remove();
        this.close()
      })
      .catch((err) => console.log(`АЛЯРМ!: ${err}`));
  };

  close() {
    super.close()
    this._popup.removeEventListener('submit', this._submitForm)
  }
}
