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
let openPopupRedactBut = document.querySelector('#popup-redact-but');
let openPopupAddBut = document.querySelector('#popup-add-but');
let imgCopy;

// Ищем popup, который хотим открыть или закрыть
let popupRedact = document.querySelector('#popup-redact');
let popupAdd = document.querySelector('#popup-add');
let popupImg = document.querySelector('#popup-img');
let popupImgContent = popupImg.querySelector('.popup__content');

// Ищем область вокруг popup и кнопку для закрытия popup
let closePopupRedactBut = popupRedact.querySelector('.popup__overlay');
let closePopupRedactOverlay = popupRedact.querySelector('.popup__close');
let closePopupAddBut = popupAdd.querySelector('.popup__overlay');
let closePopupAddOverlay = popupAdd.querySelector('.popup__close');
let closePopupImgBut = popupImg.querySelector('.popup__overlay');
let closePopupImgOverlay = popupImg.querySelector('.popup__close');

// Находим текст заголовка и подзаголовка
let titleName = document.querySelector('.person__title');
let subtitleJob = document.querySelector('.person__job');

// Находим формы внутри popup-ов в DOM
let popupRedactForm = popupRedact.querySelector('.popup__form');
let popupAddForm = popupAdd.querySelector('.popup__form');

// Находим поля форм в DOM
let nameInput = popupRedactForm.querySelector('#name');
let jobInput = popupRedactForm.querySelector('#job');
let nameCardInput = popupAddForm.querySelector('#card-name');
let linkInput = popupAddForm.querySelector('#link');


// Находим заготовку карточек
const cardsTemplate = document.querySelector('#card-template').content;
// Находим контейнер для карточек
const photosContainer = document.querySelector('#photos');
// Подготовим массив для сборки всех добавляемых карточек
let newCards = [];


// Удаление картики из popup после его закрытия
function delImg() {
  imgCopy.remove();
}

// Открытие и закрытие popup-ов
function togglePopup(popupName) {
  // Проверяем, имеет ли кнопка класс popup_opened
  let popupContent = popupName.querySelector('.popup__content');

  if (popupName.classList.contains('popup_opened') === false) {
    popupName.classList.add('popup_opened');
    popupContent.classList.add('popup__content_opened');
    if (popupName === popupRedact) {
      nameInput.setAttribute('value', titleName.textContent)
      jobInput.setAttribute('value', subtitleJob.textContent)
    }
  } else {
    popupName.classList.remove('popup_opened');
    popupContent.classList.remove('popup__content_opened');

    if (imgCopy !== undefined) {
      setTimeout(delImg, 200);
    }
  }
}

// Добавление новой карточки в DOM
function addNewCard(newCard) {
  photosContainer.prepend(newCard);
  newCards.push(newCard);
}

// Добавление и удаление лайка
function addLike(newCard) {
  let currentLikeBut = newCard.children[0].children[2].children[1];
  currentLikeBut.addEventListener('click', () => currentLikeBut.classList.toggle('photos__icon_active'));
}

// Удаление карточки
function cardDel(newCard) {
  let currentDelBut = newCard.children[0].children[1];
  currentDelBut.addEventListener('click', () => newCard.remove());
}

// Клонирование картинки из карточки в popup при его открытии
function cloneImgFromCardToPopup(newCard) {
  let currentImg = newCard.children[0].children[0]; // нахожу в карточке картинку
  let currentImgTitle = newCard.children[0].children[2].innerText; // нахожу в карточке заголовок

  // вешаю слушателя на картинку в карточке
  currentImg.addEventListener('click', function () {

    //при клике на картинку клонирую её
    imgCopy = currentImg.cloneNode(false);
    imgCopy.classList.remove('photos__image');
    imgCopy.classList.add('popup__image');

    // добавляем в заголовок картинки текст из карточки
    popupImgContent.children[1].innerText = currentImgTitle;
    // добавляю картинку в popup
    popupImgContent.append(imgCopy);
    // открываю popup
    togglePopup(popupImg);
  });
}

// Создание новой карточки
function createNewCard(title, image) {
  const newCard = cardsTemplate.querySelector('.card').cloneNode(true);
  newCard.querySelector('.photos__image').src = image;
  newCard.querySelector('.photos__image').alt = title;
  newCard.querySelector('.photos__title').textContent = title;

  // Передаю готовую карточку в другие функции
  addNewCard(newCard);
  addLike(newCard);
  cardDel(newCard);
  cloneImgFromCardToPopup(newCard);
}

// Обработчик «отправки» формы для popup-redact
function formSubmitHandler(evt) {
  // Эта строчка отменяет стандартную отправку формы.
  evt.preventDefault();

  // Получим значения полей jobInput и nameInput из свойства value и вставим с помощью textContent
  titleName.textContent = nameInput.value;
  subtitleJob.textContent = jobInput.value;
  togglePopup(popupRedact);
}

// Обработчик «отправки» формы для popup-add
function formAddCard(evt) {
  // Эта строчка отменяет стандартную отправку формы.
  evt.preventDefault();

  let cardTitle = nameCardInput.value;
  let cardImage = linkInput.value;
  createNewCard(cardTitle, cardImage);
  togglePopup(popupAdd);
}

// Добавление первых 6ти карточек на страницу при загрузке
function addInitCards() {
  for (let i = 0; i <= initialCards.length - 1; i++) {
    const newCard = cardsTemplate.querySelector('.card').cloneNode(true);
    newCard.querySelector('.photos__image').src = initialCards[i].link;
    newCard.querySelector('.photos__image').alt = initialCards[i].name;
    newCard.querySelector('.photos__title').textContent = initialCards[i].name;
    addNewCard(newCard);
    addLike(newCard);
    cardDel(newCard);
    cloneImgFromCardToPopup(newCard);
  }
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
popupRedactForm.addEventListener('submit', formSubmitHandler);
popupAddForm.addEventListener('submit', formAddCard);
