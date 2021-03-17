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

// Ищем кнопки вызова модальных окон
const openPopupRedactBut = document.querySelector('#popup-redact-but');
const openPopupAddBut = document.querySelector('#popup-add-but');

// Ищем всем модальные окна
const popupRedact = document.querySelector('#popup-redact');
const popupAdd = document.querySelector('#popup-add');
const popupImg = document.querySelector('#popup-img');

// Ищем заголовок и подзаголовок
const titleName = document.querySelector('.person__title');
const subtitleJob = document.querySelector('.person__job');

// Ищем формы в DOM
const pageForms = document.forms;
const popupRedactForm = pageForms.popupRedactForm;
const popupAddForm = pageForms.popupAddForm;


function togglePopup(popup) {
  popup.classList.toggle('popup_opened');
  popup.querySelector('.popup__content').classList.toggle('popup__content_opened');

  if (popup.classList.contains('popup_opened')) {
    popup.querySelector('.popup__overlay').addEventListener('click', () => togglePopup(popup));
    popup.querySelector('.popup__close').addEventListener('click', () => togglePopup(popup));
  }
}

function openProfilePopup() {
  popupRedactForm.name.setAttribute('value', titleName.textContent)
  popupRedactForm.job.setAttribute('value', subtitleJob.textContent)
  togglePopup(popupRedact);
}

function addNewCard(card) {
  document.querySelector('#photos').prepend(card);
}

function toggleLike(card) {
  const currentLikeBut = card.querySelector('.photos__icon');
  currentLikeBut.addEventListener('click', () => currentLikeBut.classList.toggle('photos__icon_active'));
}

function cardDel(card) {
  const currentDelBut = card.querySelector('.photos__icon-del');
  currentDelBut.addEventListener('click', () => card.remove());
}

function addImgFromCardToPopup(card) {
  const currentImg = card.querySelector('.photos__image');
  const currentImgTitle = card.querySelector('.photos__string');

  currentImg.addEventListener('click', function () {
    popupImg.querySelector('.popup__title_img-only').textContent = currentImgTitle.textContent;
    popupImg.querySelector('.popup__image').src = currentImg.src;
    popupImg.querySelector('.popup__image').alt = currentImgTitle.textContent;

    togglePopup(popupImg);
  });
}

function addEventListenersOnCards(card) {
  toggleLike(card);
  cardDel(card);
  addImgFromCardToPopup(card);
}

function createNewCard(title, image) {
  const cardsTemplate = document.querySelector('#card-template').content;
  const newCard = cardsTemplate.querySelector('.card').cloneNode(true);
  const newCardImg = newCard.querySelector('.photos__image');
  const newCardTitle = newCard.querySelector('.photos__title');

  newCardImg.src = image;
  newCardImg.alt = title;
  newCardTitle.textContent = title;

  addEventListenersOnCards(newCard);
  return newCard;
}

// Обработчик «отправки» формы для popup-redact
function handleFormRedactPopup(evt) {
  evt.preventDefault();

  titleName.textContent = popupRedactForm.name.value;
  subtitleJob.textContent = popupRedactForm.job.value;
  togglePopup(popupRedact);
}

// Обработчик «отправки» формы для popup-add
function handleFormAddCard(evt) {
  evt.preventDefault();

  const cardTitle = popupAddForm.cardName.value;
  const cardImage = popupAddForm.cardLink.value;
  const card = createNewCard(cardTitle, cardImage);
  togglePopup(popupAdd);
  addNewCard(card);
}

function addInitCards() {
  initialCards.forEach((item) => {
    const card = createNewCard(item.name, item.link);
    addNewCard(card);
  });
}

addInitCards();

// Вешаем обработчик на кнопки закрытия и области вокруг каждого popup
openPopupRedactBut.addEventListener('click', openProfilePopup);
openPopupAddBut.addEventListener('click', () => togglePopup(popupAdd));

// Прикрепляем обработчик к формам, он будет следить за событием “submit”
popupRedactForm.addEventListener('submit', handleFormRedactPopup);
popupAddForm.addEventListener('submit', handleFormAddCard);
