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

const popupImg = new PopupWithImage(popupElements.popupImg);
popupImg.setEventListeners();
const handleCardClick = (cardImg, cardTitle) => { popupImg.open(cardImg, cardTitle); }

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

const handleEditProfileSubmit = (formValues) => {
  const inputName = formValues.name;
  const inputJob = formValues.job;

  userInformation.setUserInfo({ inputName, inputJob });
  popupRedact.close()
};

const handleAddCardSubmit = (formValues) => {
  const cardElement = new UserCard(formValues, popupElements, handleCardClick).generateCard();
  popupAdd.close()
  cardsList.addItem(cardElement);
};

const popupRedact = new PopupWithForm(popupElements.popupRedact, handleEditProfileSubmit);
popupRedact.setEventListeners();

const popupAdd = new PopupWithForm(popupElements.popupAdd, handleAddCardSubmit);
popupAdd.setEventListeners();

popupElements.openPopupRedactBut.addEventListener('click', () => {
  popupElements.popupRedactForm.name.value = userInformation.getUserInfo().titleName;
  popupElements.popupRedactForm.job.value = userInformation.getUserInfo().subtitleJob;

  editProfileFormValidator.removeValidationErrors();
  popupRedact.open();
});

popupElements.openPopupAddBut.addEventListener('click', () => {
  addCardFormValidator.removeValidationErrors();
  popupAdd.open();
});
