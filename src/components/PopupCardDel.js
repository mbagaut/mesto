import { Popup } from './Popup.js';

export default class PopupCardDel extends Popup {
  constructor(popupDel, api, cardItem, card) {
    super(popupDel);
    this._api = api;
    this._cardItem = cardItem;
    this._popup = popupDel;
    this._card = card;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', this._submitForm);
  }

  _submitForm = (evt) => {
    evt.preventDefault();
    this._api.deleteCard(this._cardItem._id)
      .then(() => {
        this._card.remove();
      });
    super.close()
    this._removeEventListeners();
  };

  _removeEventListeners() {
    super._removeEventListeners()
    this._popup.removeEventListener('submit', this._submitForm);
  }
}
