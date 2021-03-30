export class FormValidator {
  constructor(formSelectors, currentForm) {
    this._formSelectors = formSelectors;
    this._currentForm = currentForm;
  }

  enableValidation() {
    const fieldsetList = Array.from(this._currentForm.querySelectorAll(this._formSelectors.fieldsetSelector));
    fieldsetList.forEach((fieldset) => {
      this._setEventListeners(fieldset);
    });
  }

  _setEventListeners(fieldset) {
    const inputList = Array.from(fieldset.querySelectorAll(this._formSelectors.inputSelector));
    const buttonElement = fieldset.querySelector(this._formSelectors.submitButtonSelector);

    this._toggleButtonState(inputList, buttonElement);


    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(fieldset, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasValidInput(inputList)) {
      buttonElement.classList.remove(this._formSelectors.inactiveButtonClass);
      buttonElement.removeAttribute('disabled');

    } else {
      buttonElement.classList.add(this._formSelectors.inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    }
  }

  _hasValidInput(inputList) {
    return !inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  _checkInputValidity(fieldset, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(fieldset, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(fieldset, inputElement);
    }
  }

  _showInputError(fieldset, inputElement, errorMessage) {
    const errorElement = fieldset.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._formSelectors.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._formSelectors.errorClass);
  }

  _hideInputError(fieldset, inputElement) {
    const errorElement = fieldset.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._formSelectors.inputErrorClass);
    errorElement.classList.remove(this._formSelectors.errorClass);
    errorElement.textContent = '';
  }
}
