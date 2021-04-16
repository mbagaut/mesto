export class Popup {
  constructor(popup) {
    this._popup = popup;
  }

  open() {
    this._popup.classList.add('popup_opened');
    this._popup.querySelector('.popup__content').classList.add('popup__content_opened');

    this._setEventListeners();
  }

  _setEventListeners() {
    document.addEventListener('keydown', this._handlePopupClose);
    this._popup.addEventListener('click', this._handlePopupClose);
  }

  _handlePopupClose = (evt) => {
    if (evt.key === 'Escape' || evt.target.classList.contains('popup__overlay') || evt.target.classList.contains('popup__close') && this._popup.classList.contains('popup_opened')) {
      this.close();
    }
  }

  close() {
    this._popup.classList.remove('popup_opened');
    this._popup.querySelector('.popup__content').classList.remove('popup__content_opened');

    this._removeEventListeners();
  }

  _removeEventListeners() {
    document.removeEventListener('keydown', this._handlePopupClose);
    this._popup.removeEventListener('click', this._handlePopupClose);
  }
}
