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

// Ищем кнопки вызова popup_redact и popup_add и
const openPopupRedactBut = document.querySelector('#popup-redact-but');
const openPopupAddBut = document.querySelector('#popup-add-but');

// Ищем popup, который хотим открыть или закрыть
const popupRedact = document.querySelector('#popup-redact');
const popupAdd = document.querySelector('#popup-add');
const popupImg = document.querySelector('#popup-img');
const popupImgContent = popupImg.querySelector('.popup__content');

// Ищем область вокруг popup и кнопку для закрытия popup
const closePopupRedactBut = popupRedact.querySelector('.popup__overlay');
const closePopupRedactOverlay = popupRedact.querySelector('.popup__close');
const closePopupAddBut = popupAdd.querySelector('.popup__overlay');
const closePopupAddOverlay = popupAdd.querySelector('.popup__close');
const closePopupImgBut = popupImg.querySelector('.popup__overlay');
const closePopupImgOverlay = popupImg.querySelector('.popup__close');

// Находим текст заголовка и подзаголовка
const titleName = document.querySelector('.person__title');
const subtitleJob = document.querySelector('.person__job');

// Находим формы внутри popup-ов в DOM
const popupRedactForm = popupRedact.querySelector('.popup__form');
const popupAddForm = popupAdd.querySelector('.popup__form');

// Находим поля форм в DOM
const nameInput = popupRedactForm.querySelector('#name');
const jobInput = popupRedactForm.querySelector('#job');
const nameCardInput = popupAddForm.querySelector('#card-name');
const linkInput = popupAddForm.querySelector('#link');

// Находим заготовку карточек и контейнер для карточек
const cardsTemplate = document.querySelector('#card-template').content;
const photosContainer = document.querySelector('#photos');

// Находим фотографию и заголовок у popupImg
const popupImgPicture = popupImg.querySelector('.popup__image');
const popupImgTitle = popupImg.querySelector('.popup__title_img-only');

// Открытие и закрытие popup-ов
function togglePopup(popup) {
  popup.classList.toggle('popup_opened');
  popup.querySelector('.popup__content').classList.toggle('popup__content_opened');
}

function openProfilePopup() {
  nameInput.setAttribute('value', titleName.textContent)
  jobInput.setAttribute('value', subtitleJob.textContent)
  togglePopup(popupRedact);
}

// Добавление новой карточки в DOM
function addNewCard(card) {
  photosContainer.prepend(card);
}

// Добавление и удаление лайка
function toggleLike(card) {
  const currentLikeBut = card.querySelector('.photos__icon');
  currentLikeBut.addEventListener('click', () => currentLikeBut.classList.toggle('photos__icon_active'));
}

// Удаление карточки
function cardDel(card) {
  const currentDelBut = card.querySelector('.photos__icon-del');
  currentDelBut.addEventListener('click', () => card.remove());
}

// Добавление картинки из карточки в popup-img при его открытии
function addImgFromCardToPopup(card) {
  const currentImg = card.querySelector('.photos__image'); // нахожу в карточке картинку
  const currentImgTitle = card.querySelector('.photos__string'); // нахожу в карточке заголовок

  // вешаю слушателя на картинку в карточке
  currentImg.addEventListener('click', function () {

    // добавляем в заголовок картинки в текст из карточки
    popupImgTitle.textContent = currentImgTitle.textContent;
    popupImgPicture.src = currentImg.src;
    popupImgPicture.alt = currentImgTitle.textContent;

    // открываю popup
    togglePopup(popupImg);
  });
}

// Отрисовка карточек
function drawCard(card) {
  addNewCard(card);
  toggleLike(card);
  cardDel(card);
  addImgFromCardToPopup(card);
}

// Создание новой карточки
function createNewCard(title, image) {
  const newCard = cardsTemplate.querySelector('.card').cloneNode(true);
  newCard.querySelector('.photos__image').src = image;
  newCard.querySelector('.photos__image').alt = title;
  newCard.querySelector('.photos__title').textContent = title;

  return newCard;
}

// Обработчик «отправки» формы для popup-redact
function handleFormRedactPopup(evt) {
  // Эта строчка отменяет стандартную отправку формы.
  evt.preventDefault();

  // Получим значения полей jobInput и nameInput из свойства value и вставим с помощью textContent
  titleName.textContent = nameInput.value;
  subtitleJob.textContent = jobInput.value;
  togglePopup(popupRedact);
}

// Обработчик «отправки» формы для popup-add
function handleFormAddCard(evt) {
  // Эта строчка отменяет стандартную отправку формы.
  evt.preventDefault();

  let cardTitle = nameCardInput.value;
  let cardImage = linkInput.value;
  let card = createNewCard(cardTitle, cardImage);
  togglePopup(popupAdd);
  drawCard(card);
}

// Добавление первых 6ти карточек на страницу при загрузке
function addInitCards() {
  initialCards.forEach((item) => {
    let card = createNewCard(item.name, item.link);
    drawCard(card);
  });
}

addInitCards();

// Вешаем обработчик на кнопки закрытия и области вокруг каждого popup
openPopupRedactBut.addEventListener('click', () => togglePopup(popupRedact));
closePopupRedactBut.addEventListener('click', () => togglePopup(popupRedact));
closePopupRedactOverlay.addEventListener('click', () => togglePopup(popupRedact));

openPopupAddBut.addEventListener('click', () => togglePopup(popupAdd));
closePopupAddBut.addEventListener('click', () => togglePopup(popupAdd));
closePopupAddOverlay.addEventListener('click', () => togglePopup(popupAdd));

closePopupImgBut.addEventListener('click', () => togglePopup(popupImg));
closePopupImgOverlay.addEventListener('click', () => togglePopup(popupImg));

// Прикрепляем обработчик к формам, он будет следить за событием “submit”
popupRedactForm.addEventListener('submit', handleFormRedactPopup);
popupAddForm.addEventListener('submit', handleFormAddCard);
