import './index.css';

import { initialCards, popupElements, formSelectors } from '../utils/constants.js'
import { FormValidator } from '../components/FormValidator.js'
import { Section } from '../components/Section.js'
import { UserInfo } from '../components/UserInfo.js'
import UserCard from '../components/UserCard.js'
import InitialCard from '../components/InitialCard.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'

const userInformation = new UserInfo(popupElements);

const handleCardClick = (cardImg, cardTitle) => { new PopupWithImage(popupElements.popupImg).open(cardImg, cardTitle); }

const openPopup = (popup, handleFormSubmit) => { new PopupWithForm(popup, handleFormSubmit).open(); }

const addCardFormValidator = new FormValidator(formSelectors, popupElements.popupAddForm);
const editProfileFormValidator = new FormValidator(formSelectors, popupElements.popupRedactForm);
addCardFormValidator.enableValidation();
editProfileFormValidator.enableValidation();

const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = new InitialCard(item, popupElements, handleCardClick).generateCard();
    cardsList.addItem(cardElement);
  },
},
  popupElements
);
cardsList.renderCards();

const handleEditProfileSubmit = (evt) => {
  evt.preventDefault();

  const inputName = evt.target.name.value;
  const inputJob = evt.target.job.value;
  userInformation.setUserInfo({ inputName, inputJob });

  new PopupWithForm(evt.currentTarget, handleEditProfileSubmit).close()
};

const handleAddCardSubmit = (evt) => {
  evt.preventDefault();
  const cardTitle = popupElements.popupAddForm.cardName.value;
  const cardImage = popupElements.popupAddForm.cardLink.value;

  const cardElement = new UserCard({ cardTitle, cardImage }, popupElements, handleCardClick).generateCard();
  new PopupWithForm(evt.currentTarget, handleAddCardSubmit).close()
  cardsList.addItem(cardElement);
};

popupElements.openPopupRedactBut.addEventListener('click', () => {

  userInformation.getUserInfo(popupElements.popupRedactForm);

  editProfileFormValidator.removeValidationErrors();
  openPopup(popupElements.popupRedact, handleEditProfileSubmit);
});

popupElements.openPopupAddBut.addEventListener('click', () => {
  popupElements.popupAddForm.reset();
  addCardFormValidator.removeValidationErrors();
  openPopup(popupElements.popupAdd, handleAddCardSubmit);
});
