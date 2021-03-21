const initialCards = [
  {
    name: 'Олёкминск',
    link: 'images/olekminsk.jpg'
  },
  {
    name: 'Якутск',
    link: 'images/yakutsk.jpg'
  },
  {
    name: 'Нерчинск',
    link: 'images/nerchinsk.jpg'
  },
  {
    name: 'Чита',
    link: 'images/chita.jpg'
  },
  {
    name: 'Енисейск',
    link: 'images/eniseisk.jpg'
  },
  {
    name: 'Якутск',
    link: 'images/beketov2.jpg'
  }
];

const popupElements = {
  openPopupRedactBut: document.querySelector('#popup-redact-but'),
  openPopupAddBut: document.querySelector('#popup-add-but'),
  popupRedact: document.querySelector('#popup-redact'),
  popupAdd: document.querySelector('#popup-add'),
  popupImg: document.querySelector('#popup-img'),
  titleName: document.querySelector('.person__title'),
  subtitleJob: document.querySelector('.person__job'),
  popupRedactForm: document.forms.popupRedactForm,
  popupAddForm: document.forms.popupAddForm,
  cardsContainer: document.querySelector('#photos'),
};

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

const addNewCard = (card) => {
  popupElements.cardsContainer.prepend(card);
};

const toggleLike = (card) => {
  const currentLikeBut = card.querySelector('.photos__icon');
  currentLikeBut.addEventListener('click', () => currentLikeBut.classList.toggle('photos__icon_active'));
};

const cardDel = (card) => {
  const currentDelBut = card.querySelector('.photos__icon-del');
  currentDelBut.addEventListener('click', () => card.remove());
};

const openPhoto = (img, imgTitle) => {
  popupElements.popupImg.querySelector('.popup__title_img-only').textContent = imgTitle.textContent;
  popupElements.popupImg.querySelector('.popup__image').src = img.src;
  popupElements.popupImg.querySelector('.popup__image').alt = imgTitle.textContent;

  openPopup(popupElements.popupImg);
};

const handleCardImg = (card) => {
  const currentImg = card.querySelector('.photos__image');
  const currentImgTitle = card.querySelector('.photos__string');

  currentImg.addEventListener('click', () => openPhoto(currentImg, currentImgTitle));
};

const createNewCard = (title, image) => {
  const cardsTemplate = document.querySelector('#card-template').content;
  const newCard = cardsTemplate.querySelector('.card').cloneNode(true);
  const newCardImg = newCard.querySelector('.photos__image');
  const newCardTitle = newCard.querySelector('.photos__title');

  newCardImg.src = image;
  newCardImg.alt = title;
  newCardTitle.textContent = title;

  toggleLike(newCard);
  cardDel(newCard);
  handleCardImg(newCard);

  return newCard;
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
  const card = createNewCard(cardTitle, cardImage);
  closePopup(popupElements.popupAdd);
  addNewCard(card);
};

const addInitCards = () => {
  initialCards.forEach((item) => {
    const card = createNewCard(item.name, item.link);
    addNewCard(card);
  });
};

addInitCards();

// Функция нужна для корректной работы валидатора инпутов в форме редактирования заголовков при первой загрузке страницы.
const addInitTitle = () => {
  popupElements.popupRedactForm.name.setAttribute('value', 'П. И. Бекетов');
  popupElements.popupRedactForm.job.setAttribute('value', 'Русский землепроходец');
};

addInitTitle();

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
