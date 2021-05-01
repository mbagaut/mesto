import { Popup } from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popup, cardItem) {
    super(popup);
    this._cardImg = cardItem.link;
    this._cardTitle = cardItem.name;
    this._popup = popup;
    this._popupImg = this._popup.querySelector('.popup__image');
    this._popupTitle = this._popup.querySelector('.popup__title');
  }

  open() {
    this._popupTitle.textContent = this._cardTitle;
    this._popupImg.src = this._cardImg;
    this._popupTitle.alt = this._cardTitle;
    this._popup.addEventListener('click', this._handlePopupClose);
    super.open();
  }
}
