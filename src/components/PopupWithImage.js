import { Popup } from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._popup = popup;
    this._popupImg = this._popup.querySelector('.popup__image');
    this._popupTitle = this._popup.querySelector('.popup__title');
  }

  open(cardImg, cardTitle) {
    this._popupTitle.textContent = cardTitle.textContent;
    this._popupImg.src = cardImg.src;
    this._popupTitle.alt = cardTitle.textContent;
    this._popup.addEventListener('click', this._handlePopupClose);
    super.open();
  }
}
