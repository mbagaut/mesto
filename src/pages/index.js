import './index.css';

import { popupSelectors, formSelectors } from '../utils/constants.js'
import { FormValidator } from '../components/FormValidator.js'
import { Section } from '../components/Section.js'
import { UserInfo } from '../components/UserInfo.js'
import Card from '../components/Card.js'
import Api from '../components/Api.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupCardDel from '../components/PopupCardDel.js'

const userInformation = new UserInfo(popupSelectors);
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

// Получить userInfo
api.getUserInfo()
  .then((userInfo) => {
    userInformation.setUserInfo(userInfo);
    userInformation.setNewAvatar(userInfo);
  })
  .catch((err) => console.log(`АЛЯРМ!: ${err}`));

// Загрузить даннные карточек
api.getCards()
  .then((cards) => cardsList.renderCards(cards))
  .catch((err) => console.log(`АЛЯРМ!: ${err}`));


// Создать новую карточку
const createNewCard = (cardData) => {
  return new Card(cardData, api, {
    popupSelectors,
    handleCardClick: () => {
      const popupImg = new PopupWithImage(
        document.querySelector(popupSelectors.popupImg),
        cardData
      );
      popupImg.setEventListeners();
      popupImg.open()
    },
    handleDelClick: (card) => {
      const popupDel = new PopupCardDel(
        document.querySelector(popupSelectors.popupDel),
        api,
        cardData,
        card
      );
      popupDel.setEventListeners();
      popupDel.open(cardData)
    }
  })
};


// Создать секцию с карточками
const cardsList = new Section({
  renderer: (cardData) => {
    const cardElement = createNewCard(cardData);
    api.getUserInfo()
      .then((data) => {
        cardsList.addItem(cardElement.generateCard(data));
      })
      .catch((err) => console.log(`АЛЯРМ!: ${err}`));
  }
}, popupSelectors);


// Попап добавления карточек
const handleAddCardSubmit = (formValues) => {
  popupAdd.loadingProcess(true);
  console.log(document.querySelector(popupSelectors.popupSubmitBtn))
  let { cardName: name, cardLink: link } = formValues;
  api.postCard(name, link)
    .then((cardData) => {
      const cardElement = createNewCard(cardData);
      api.getUserInfo()
        .then((data) => {
          cardsList.addItem(cardElement.generateCard(data));
        })
        .catch((err) => console.log(`АЛЯРМ!: ${err}`))
    })
    .catch((err) => console.log(`АЛЯРМ!: ${err}`))
    .finally(() => {
      popupAdd.close()
      popupAdd.loadingProcess();
    });
};

const popupAdd = new PopupWithForm(
  document.querySelector(popupSelectors.popupAdd),
  handleAddCardSubmit);
popupAdd.setEventListeners();


// Попап смены аватара
const handleAvatarSubmit = (formValues) => {
  popupAvatar.loadingProcess(true);
  api.changeAvatar(formValues.avatarLink)
    .then((userInfo) => {
      userInformation.setNewAvatar(userInfo);
    })
    .catch((err) => console.log(`АЛЯРМ!: ${err}`))
    .finally(() => {
      popupAvatar.close();
      popupAvatar.loadingProcess();
    })
}

const popupAvatar = new PopupWithForm(
  document.querySelector(popupSelectors.popupAvatar),
  handleAvatarSubmit
);
popupAvatar.setEventListeners();


// Попап информации о пользователе
const handleEditProfileSubmit = (formValues) => {
  popupRedact.loadingProcess(true);
  userInformation.setUserInfo(formValues);
  api.changeUserInfo(formValues)
    .finally(() => {
      popupRedact.close();
      popupRedact.loadingProcess();
    });
};

const popupRedact = new PopupWithForm(
  document.querySelector(popupSelectors.popupRedact),
  handleEditProfileSubmit
);
popupRedact.setEventListeners();


// Слушатели открытия попапов
document.querySelector(popupSelectors.openPopupAvatarBut)
  .addEventListener('click', () => {
    avatarFormValidator.removeValidationErrors();
    popupAvatar.open();
  });

document.querySelector(popupSelectors.openPopupRedactBut)
  .addEventListener('click', () => {
    document.forms.popupRedactForm.name.value = userInformation.getUserInfo().titleName;
    document.forms.popupRedactForm.about.value = userInformation.getUserInfo().subtitleJob;

    editProfileFormValidator.removeValidationErrors();
    popupRedact.open();
  });

document.querySelector(popupSelectors.openPopupAddBut)
  .addEventListener('click', () => {
    addCardFormValidator.removeValidationErrors();
    popupAdd.open();
  });
