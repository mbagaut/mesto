import { Popup } from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popup, handleFormSubmit) {
    super(popup);
    this._popup = popup;
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._form = this._popup.querySelector('.popup__form');
    this._submitBtn = this._popup.querySelector('.popup__submit-btn');
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._submitForm);
  }

  _submitForm = (evt) => {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
  };

  close() {
    super.close()
    this._form.reset();
  }

  loadingProcess(buttonText) {
    this._submitBtn.textContent = buttonText;
  }
}
