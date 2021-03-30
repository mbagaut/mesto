import { initialCards, popupElements } from './utils/constants.js'
import { Card } from './components/Card.js'
import { FormValidator } from './components/FormValidator.js'

const getForms = () => {
  const formList = Array.from(document.forms);

  formList.forEach((form) => {
    form.addEventListener('submit', (evt) => evt.preventDefault());

    const validationFormClass = new FormValidator(
      {
        fieldsetSelector: '.popup__fieldset',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__submit-btn',
        inactiveButtonClass: 'popup__submit-btn_disabled',
        inputErrorClass: 'popup__input_error',
        errorClass: 'popup__input-error',
      },
      form
    );
    validationFormClass.enableValidation();
  });
}

getForms();

const handlePopupClose = (evt) => {
  const popups = [popupElements.popupAdd, popupElements.popupImg, popupElements.popupRedact];
  const openedPopup = popups.find((popup) => popup.classList.contains('popup_opened'));
  if (evt.key === 'Escape' || evt.target.classList.contains('popup__overlay') || evt.target.classList.contains('popup__close')) {
    closePopup(openedPopup);
  }
}

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  popup.querySelector('.popup__content').classList.add('popup__content_opened');
  document.addEventListener('keydown', handlePopupClose);
  popup.addEventListener('click', handlePopupClose);
};

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  popup.querySelector('.popup__content').classList.remove('popup__content_opened');

  document.removeEventListener('keydown', handlePopupClose);
  popup.removeEventListener('click', handlePopupClose);
};

const openProfilePopup = () => {
  popupElements.popupRedactForm.name.setAttribute('value', popupElements.titleName.textContent)
  popupElements.popupRedactForm.job.setAttribute('value', popupElements.subtitleJob.textContent)
  openPopup(popupElements.popupRedact);
};

const addNewCard = (newCard) => {
  popupElements.cardsContainer.prepend(newCard);
};

const handleFormRedactPopup = (evt) => {
  evt.preventDefault();

  popupElements.titleName.textContent = popupRedactForm.name.value;
  popupElements.subtitleJob.textContent = popupRedactForm.job.value;
  closePopup(popupElements.popupRedact);
};

const handleFormAddCard = (evt) => {
  evt.preventDefault();

  const cardTitle = popupElements.popupAddForm.cardName.value;
  const cardImage = popupElements.popupAddForm.cardLink.value;
  const templateSelector = '#card-template';
  const newCardClass = new Card(cardTitle, cardImage, templateSelector, openPopup);
  const newCard = newCardClass.createNewCard();
  closePopup(popupElements.popupAdd);
  addNewCard(newCard);

};

const addInitCards = () => {
  initialCards.forEach((item) => {
    const templateSelector = '#card-template';
    const newCardClass = new Card(item.name, item.link, templateSelector, openPopup, popupElements);
    const newCard = newCardClass.createNewCard();
    addNewCard(newCard);
  });
};

addInitCards();

popupElements.openPopupRedactBut.addEventListener('click', openProfilePopup);
popupElements.openPopupAddBut.addEventListener('click', () => {
  popupElements.popupAddForm.reset();
  const submitBtn = popupElements.popupAddForm.querySelector('.popup__submit-btn');
  submitBtn.classList.add('popup__submit-btn_disabled');
  submitBtn.setAttribute('disabled', true);
  openPopup(popupElements.popupAdd);
});

popupElements.popupRedactForm.addEventListener('submit', handleFormRedactPopup);
popupElements.popupAddForm.addEventListener('submit', handleFormAddCard);
