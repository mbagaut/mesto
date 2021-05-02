export class FormValidator {
  constructor(formSelectors, currentForm) {
    this._formSelectors = formSelectors;
    this._currentForm = currentForm;
    this._submitBtn = this._currentForm.querySelector(this._formSelectors.submitButtonSelector);
  }

  enableValidation() {
    const fieldsetList = Array.from(this._currentForm.querySelectorAll(this._formSelectors.fieldsetSelector));
    fieldsetList.forEach((fieldset) => {
      this._fieldset = fieldset;
      this._setEventListeners();
    });
  }

  _setEventListeners() {
    this._inputList = Array.from(this._fieldset.querySelectorAll(this._formSelectors.inputSelector));

    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  _toggleButtonState() {
    if (this._hasValidInput(this._inputList)) {
      this._submitBtn.classList.remove(this._formSelectors.inactiveButtonClass);
      this._submitBtn.removeAttribute('disabled');

    } else {
      this._submitBtn.classList.add(this._formSelectors.inactiveButtonClass);
      this._submitBtn.setAttribute('disabled', true);
    }
  }

  _hasValidInput() {
    return !this._inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._fieldset.querySelector(`.${inputElement.id.replace(/([0-9])/g, '')}-error`);
    inputElement.classList.add(this._formSelectors.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._formSelectors.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._fieldset.querySelector(`.${inputElement.id.replace(/([0-9])/g, '')}-error`);
    inputElement.classList.remove(this._formSelectors.inputErrorClass);
    errorElement.classList.remove(this._formSelectors.errorClass);
    errorElement.textContent = '';
  }

  removeValidationErrors() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });

    this._toggleButtonState();
  }

  _disableButtonState() {
    this._submitBtn.classList.add(this._formSelectors.inactiveButtonClass);
    this._submitBtn.setAttribute('disabled', true);
  }
}
