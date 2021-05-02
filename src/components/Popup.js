export class Popup {
  constructor(popup) {
    this._popup = popup;
  }

  // Научите, пожалуйста, как это сделать в css? Я понимаю как это реализовать через зависимости одного класса от другого, но БЭМ это запрещает. Есть ли ещё способы?
  open() {
    this._popup.classList.add('popup_opened');
    this._popup.querySelector('.popup__content').classList.add('popup__content_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  setEventListeners() {
    this._popup.addEventListener('click', this._handlePopupClose);
  }

  _handlePopupClose = (evt) => {
    if (evt.target.classList.contains('popup__overlay') || evt.target.classList.contains('popup__close')) {
      this.close();
    }
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  close() {
    this._popup.classList.remove('popup_opened');
    this._popup.querySelector('.popup__content').classList.remove('popup__content_opened');

    this._removeEventListeners();
  }

  _removeEventListeners() {
    document.removeEventListener('keydown', this._handleEscClose);
  }
}
