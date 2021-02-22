//! POPUP TOGGLE

// Ищем кнопку вызова popup
let openPopupBut = document.querySelector('#popup-open');

// Ищем область вокруг popup и кнопку закрытия popup
let closePopupBut = document.querySelector('.popup__overlay');
let closePopupOverlay = document.querySelector('.popup__close');

// Ищем popup, который хотим открыть или закрыть
let popup = document.querySelector('#popup');
let popupContent = document.querySelector('.popup__content');

// Находим текст заголовка и подзаголовка
let titleName = document.querySelector('.person__title');
let subtitleJob = document.querySelector('.person__job');

function popupToggle() {
  // Проверяем, имеет ли кнопка класс popup_opened
  let popupOn = popup.classList.contains('popup_opened');

  if (popupOn === false) {
    popup.classList.add('popup_opened');
    popupContent.classList.add('popup__content_opened');
    nameInput.setAttribute('value', titleName.textContent)
    jobInput.setAttribute('value', subtitleJob.textContent)
  } else {
    popup.classList.remove('popup_opened');
    popupContent.classList.remove('popup__content_opened');
  }
}

// Вешаем обработчик на две кнопки и область
openPopupBut.addEventListener('click', popupToggle);
closePopupBut.addEventListener('click', popupToggle);
closePopupOverlay.addEventListener('click', popupToggle);


//! POPUP EDIT

// Находим форму в DOM
let formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
let nameInput = formElement.querySelector('#name');
let jobInput = formElement.querySelector('#job');

// Обработчик «отправки» формы
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  // Получим значения полей jobInput и nameInput из свойства value и вставим с помощью textContent
  titleName.textContent = nameInput.value;
  subtitleJob.textContent = jobInput.value;
  popupToggle();
}

// Прикрепляем обработчик к форме, он будет следить за событием “submit”
formElement.addEventListener('submit', formSubmitHandler);


//! LIKE BUTTONS

// Ищем все кнопки лайка
let likeButtons = document.querySelectorAll('.photos__icon');

// Переберём массив с помощью цикла
for (let i = 0; i < likeButtons.length; i++) {
  let currentLikeBut = likeButtons[i];

  // Каждому элементу массива повесим обработчик
  currentLikeBut.addEventListener('click', likeToggle);

  function likeToggle() {
    // Проверяем, имеет ли текущий элемент класс photos__icon_active
    let likeOn = currentLikeBut.classList.contains('photos__icon_active');

    if (likeOn === false) {
      currentLikeBut.classList.add('photos__icon_active');
    } else {
      currentLikeBut.classList.remove('photos__icon_active');
    }
  }
}
