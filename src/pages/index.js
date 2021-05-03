import './index.css';

import { selectors, formSelectors } from '../utils/constants.js'
import { FormValidator } from '../components/FormValidator.js'
import { Section } from '../components/Section.js'
import { UserInfo } from '../components/UserInfo.js'
import Card from '../components/Card.js'
import Api from '../components/Api.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupCardDel from '../components/PopupCardDel.js'

const userInformation = new UserInfo(selectors);
const addCardFormValidator = new FormValidator(formSelectors, document.forms.popupAddForm);
const editProfileFormValidator = new FormValidator(formSelectors, document.forms.popupRedactForm);
const avatarFormValidator = new FormValidator(formSelectors, document.forms.popupAvatarForm);
addCardFormValidator.enableValidation();
editProfileFormValidator.enableValidation();
avatarFormValidator.enableValidation();

// Класс API
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-23',
  headers: {
    authorization: 'ac575190-0d35-42fd-b4c8-6b2b3e6183a4',
    'Content-Type': 'application/json'
  }
});


Promise.all([api.getUserInfo(), api.getCards()])
  .then((data) => {
    // console.log(data[0], data[1])
    userInformation.setUserInfo(data[0]);
    userInformation.setNewAvatar(data[0]);
    cardsList.renderCards(data[1]);
  })
  .catch((err) => console.log(`АЛЯРМ!: ${err}`));


const popupImg = new PopupWithImage(document.querySelector(selectors.popupImg));
popupImg.setEventListeners();

const popupDel = new PopupCardDel(document.querySelector(selectors.popupDel), api);
popupDel.setEventListeners();


// Создать новую карточку
const createNewCard = (cardData) => {
  return new Card(cardData, api, {
    selectors,
    handleCardClick: () => {
      popupImg.open(cardData)
    },
    handleDelClick: (card) => {
      popupDel.open(cardData, card)
    }
  })
};


// Создать секцию с карточками
const cardsList = new Section({
  renderer: (cardData) => {
    const cardElement = createNewCard(cardData);
    const userData = userInformation.getUserInfo();
    cardsList.addItem(cardElement.generateCard(userData));
  }
}, selectors);


// Попап добавления карточек
const handleAddCardSubmit = (formValues) => {
  popupAdd.loadingProcess('Создаём...');
  const { cardName: name, cardLink: link } = formValues;
  api.postCard(name, link)
    .then((cardData) => {
      const cardElement = createNewCard(cardData);
      const userData = userInformation.getUserInfo();
      cardsList.addItem(cardElement.generateCard(userData));
      popupAdd.close()
    })
    .catch((err) => console.log(`АЛЯРМ!: ${err}`))
    .finally(() => {
      popupAdd.loadingProcess('Создать');
    });
};

const popupAdd = new PopupWithForm(
  document.querySelector(selectors.popupAdd),
  handleAddCardSubmit);
popupAdd.setEventListeners();


// Попап смены аватара
const handleAvatarSubmit = (formValues) => {
  popupAvatar.loadingProcess('Сохраняем...');
  api.changeAvatar(formValues.avatarLink)
    .then((userInfo) => {
      userInformation.setNewAvatar(userInfo);
      popupAvatar.close();
    })
    .catch((err) => console.log(`АЛЯРМ!: ${err}`))
    .finally(() => {
      popupAvatar.loadingProcess('Сохранить');
    })
}

const popupAvatar = new PopupWithForm(
  document.querySelector(selectors.popupAvatar),
  handleAvatarSubmit
);
popupAvatar.setEventListeners();


// Попап информации о пользователе
const handleEditProfileSubmit = (formValues) => {
  popupRedact.loadingProcess('Сохраняем...');
  api.changeUserInfo(formValues)
    .then((userInfo) => {
      userInformation.setUserInfo(userInfo);
      popupRedact.close();
    })
    .finally(() => {
      popupRedact.loadingProcess('Сохранить');
    });
};

const popupRedact = new PopupWithForm(
  document.querySelector(selectors.popupRedact),
  handleEditProfileSubmit
);
popupRedact.setEventListeners();


// Слушатели открытия попапов
document.querySelector(selectors.openPopupAvatarBut)
  .addEventListener('click', () => {
    avatarFormValidator.removeValidationErrors();
    popupAvatar.open();
  });

document.querySelector(selectors.openPopupRedactBut)
  .addEventListener('click', () => {
    document.forms.popupRedactForm.name.value = userInformation.getUserInfo().titleName;
    document.forms.popupRedactForm.about.value = userInformation.getUserInfo().subtitleJob;

    editProfileFormValidator.removeValidationErrors();
    popupRedact.open();
  });

document.querySelector(selectors.openPopupAddBut)
  .addEventListener('click', () => {
    addCardFormValidator.removeValidationErrors();
    popupAdd.open();
  });
