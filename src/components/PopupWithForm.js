import { Popup } from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popup, handleFormSubmit) {
    super(popup);
    this._popup = popup;
    this._handleFormSubmit = handleFormSubmit;
  }

  _setEventListeners() {
    document.addEventListener('keydown', this._handlePopupClose);
    this._popup.addEventListener('click', this._handlePopupClose);

    this._popup.addEventListener('submit', this._handleFormSubmit);
  }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    console.log(this._formValues);
    return this._formValues;
  }
}
