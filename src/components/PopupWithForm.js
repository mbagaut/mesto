import { Popup } from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popup, handleFormSubmit) {
    super(popup);
    this._popup = popup;
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popup.querySelectorAll('.popup__input');
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners()

    this._popup.addEventListener('submit', this._disableDefaultBehavior);
  }

  _disableDefaultBehavior = (evt) => {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
  };

  close() {
    super.close()
    this._inputList.forEach(input => { input.value = '' });
  }

  _removeEventListeners() {
    super._removeEventListeners()
    this._popup.removeEventListener('submit', this._disableDefaultBehavior);
  }
}
