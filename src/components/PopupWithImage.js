import { Popup } from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._popup = popup;
    this._popupImg = this._popup.querySelector('.popup__image');
    this._popupTitle = this._popup.querySelector('.popup__title');
  }

  open(cardItem) {
    this._cardImg = cardItem.link;
    this._cardTitle = cardItem.name;
    this._popupTitle.textContent = this._cardTitle;
    this._popupImg.src = this._cardImg;
    this._popupTitle.alt = this._cardTitle;
    super.open();
  }
}
