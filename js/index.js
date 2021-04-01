import { initialCards, popupElements, formSelectors } from './utils/constants.js'
import { Card } from './components/Card.js'
import { FormValidator } from './components/FormValidator.js'


const addCardFormValidator = new FormValidator(formSelectors, popupElements.popupAddForm);
const editProfileFormValidator = new FormValidator(formSelectors, popupElements.popupRedactForm);

addCardFormValidator.enableValidation();
editProfileFormValidator.enableValidation();



const handlePopupClose = (evt) => {
  popupElements.popupsNodeList.forEach((popup) => {
    if (evt.key === 'Escape' || evt.target.classList.contains('popup__overlay') || evt.target.classList.contains('popup__close') && popup.classList.contains('popup_opened')) {
      closePopup(popup);
    }
  })
};

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

const addNewCard = (newCard) => {
  popupElements.cardsContainer.prepend(newCard);
};

const handleEditProfileSubmit = (evt) => {
  evt.preventDefault();

  popupElements.titleName.textContent = popupRedactForm.name.value;
  popupElements.subtitleJob.textContent = popupRedactForm.job.value;
  closePopup(popupElements.popupRedact);
};

const createCard = (cardTitle, cardImage) => new Card(cardTitle, cardImage, openPopup, popupElements).createNewCard();


const handleAddCardSubmit = (evt) => {
  evt.preventDefault();

  const cardTitle = popupElements.popupAddForm.cardName.value;
  const cardImage = popupElements.popupAddForm.cardLink.value;
  const newCard = createCard(cardTitle, cardImage);

  closePopup(popupElements.popupAdd);
  addNewCard(newCard);
};

const addInitCards = () => {
  initialCards.forEach((item) => {
    const newCard = createCard(item.name, item.link);

    addNewCard(newCard);
  });
};

addInitCards();

const prepareForm = (form, submitBtn) => {
  console.log('You are not prepared!');

  const popupErrorsText = form.querySelectorAll('.popup__input-error');
  const popupErrorsBorder = form.querySelectorAll('.popup__input_error');

  if (popupErrorsText) {
    popupErrorsText.forEach((popupErr) => {
      popupErr.textContent = '';
    })

    popupErrorsBorder.forEach((popupErr) => {
      popupErr.classList.remove('popup__input_error');
    })

    submitBtn.classList.add('popup__submit-btn_disabled');
    submitBtn.setAttribute('disabled', true);

    if (form === popupElements.popupRedactForm) {
      popupElements.popupRedactForm.name.value = popupElements.titleName.textContent;
      popupElements.popupRedactForm.job.value = popupElements.subtitleJob.textContent;
    }
  }

  console.log('Sometimes the hand of fate must be forced');
};

popupElements.popupRedactForm.addEventListener('submit', handleEditProfileSubmit);
popupElements.popupAddForm.addEventListener('submit', handleAddCardSubmit);

popupElements.openPopupRedactBut.addEventListener('click', () => {
  prepareForm(popupElements.popupRedactForm, popupElements.submitRedactForm);
  openPopup(popupElements.popupRedact);
});

popupElements.openPopupAddBut.addEventListener('click', () => {
  popupElements.popupAddForm.reset();

  prepareForm(popupElements.popupAdd, popupElements.submitAddForm);
  openPopup(popupElements.popupAdd);
});
