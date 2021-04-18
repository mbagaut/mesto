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

const popupImgInstance = new PopupWithImage(popupElements.popupImg);
popupImgInstance.setEventListeners();
const handleCardClick = (cardImg, cardTitle) => { popupImgInstance.open(cardImg, cardTitle); }

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

  popupRedactInstance.close()
};

const handleAddCardSubmit = (formValues) => {
  const cardElement = new UserCard(formValues, popupElements, handleCardClick).generateCard();
  popupAddInstance.close()
  cardsList.addItem(cardElement);
};

const popupRedactInstance = new PopupWithForm(popupElements.popupRedact, handleEditProfileSubmit);
const popupAddInstance = new PopupWithForm(popupElements.popupAdd, handleAddCardSubmit);


popupElements.openPopupRedactBut.addEventListener('click', () => {

  popupElements.popupRedactForm.name.value = userInformation.getUserInfo().titleName;
  popupElements.popupRedactForm.job.value = userInformation.getUserInfo().subtitleJob;

  editProfileFormValidator.removeValidationErrors();
  popupRedactInstance.open();
  popupRedactInstance.setEventListeners();
});

popupElements.openPopupAddBut.addEventListener('click', () => {

  addCardFormValidator.removeValidationErrors();
  popupAddInstance.open();
  popupAddInstance.setEventListeners();
});
