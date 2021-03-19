const formSelectors = {
  fieldsetSelector: '.popup__fieldset',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__input-error',
};

const showInputError = (fieldset, inputElement, errorMessage) => {
  const errorElement = fieldset.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(formSelectors.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(formSelectors.errorClass);
};

const hideInputError = (fieldset, inputElement) => {
  const errorElement = fieldset.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(formSelectors.inputErrorClass);
  errorElement.classList.remove(formSelectors.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (fieldset, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(fieldset, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(fieldset, inputElement);
  }
};

const hasValidInput = (inputList) => {
  return !inputList.some((input) => {
    return !input.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasValidInput(inputList)) {
    buttonElement.classList.remove(formSelectors.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');

  } else {
    buttonElement.classList.add(formSelectors.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  }
};

const setEventListeners = (fieldset) => {
  const inputList = Array.from(fieldset.querySelectorAll(formSelectors.inputSelector));
  const buttonElement = fieldset.querySelector(formSelectors.submitButtonSelector);

  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(fieldset, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.forms);
  formList.forEach((form) => {
    form.addEventListener('submit', (evt) => evt.preventDefault());

    const fieldsetList = Array.from(form.querySelectorAll(formSelectors.fieldsetSelector));
    fieldsetList.forEach((fieldset) => {
      setEventListeners(fieldset);
    });
  });
};

enableValidation();
