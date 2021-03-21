const showInputError = (fieldset, inputElement, errorMessage, formSelectors) => {
  const errorElement = fieldset.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(formSelectors.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(formSelectors.errorClass);
};

const hideInputError = (fieldset, inputElement, formSelectors) => {
  const errorElement = fieldset.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(formSelectors.inputErrorClass);
  errorElement.classList.remove(formSelectors.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (fieldset, inputElement, formSelectors) => {
  if (!inputElement.validity.valid) {
    showInputError(fieldset, inputElement, inputElement.validationMessage, formSelectors);
  } else {
    hideInputError(fieldset, inputElement, formSelectors);
  }
};

const hasValidInput = (inputList) => {
  return !inputList.some((input) => {
    return !input.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, formSelectors) => {
  if (hasValidInput(inputList)) {
    buttonElement.classList.remove(formSelectors.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');

  } else {
    buttonElement.classList.add(formSelectors.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  }
};

const setEventListeners = (fieldset, formSelectors) => {
  const inputList = Array.from(fieldset.querySelectorAll(formSelectors.inputSelector));
  const buttonElement = fieldset.querySelector(formSelectors.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, formSelectors);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(fieldset, inputElement, formSelectors);
      toggleButtonState(inputList, buttonElement, formSelectors);
    });
  });
};

const enableValidation = (formSelectors) => {
  const formList = Array.from(document.forms);
  formList.forEach((form) => {
    form.addEventListener('submit', (evt) => evt.preventDefault());

    const fieldsetList = Array.from(form.querySelectorAll(formSelectors.fieldsetSelector));
    fieldsetList.forEach((fieldset) => {
      setEventListeners(fieldset, formSelectors);
    });
  });
};

enableValidation(
  {
    fieldsetSelector: '.popup__fieldset',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-btn',
    inactiveButtonClass: 'popup__submit-btn_disabled',
    inputErrorClass: 'popup__input_error',
    errorClass: 'popup__input-error',
  }
);
