(function () {
  'use strict';

  //! POPUP TOGGLE

  // Ищем кнопку вызова popup
  let openPopupBut = document.querySelector('#popup-open');

  // Ищем область вокруг popup и кнопку закрытия popup
  let closePopupBut = document.querySelector('.popup__overlay');
  let closePopupOverlay = document.querySelector('.popup__close');

  // Ищем popup, который хотим открыть или закрыть
  let popup = document.querySelector('#popup');

  // Создадим функцию, которая будет открывать и закрывать popup
  function popupToggle() {
    popup.classList.toggle('popup_opened');
  }

  // Вешаем обработчик на две кнопки и область
  openPopupBut.addEventListener('click', popupToggle);
  closePopupBut.addEventListener('click', popupToggle);
  closePopupOverlay.addEventListener('click', popupToggle);


  //! POPUP EDIT

  // Находим форму в DOM
  let formElement = document.querySelector('.popup__content');
  // Находим поля формы в DOM
  let nameInput = formElement.querySelector('#name');
  let jobInput = formElement.querySelector('#job');
  // Находим текст заголовка и подзаголовка
  let titleName = document.querySelector('.person__title');
  let subtitleJob = document.querySelector('.person__job');

  // Передаем установленные имя и род деятельности в форму в виде placeholder
  function inputPlaceholder() {
    nameInput.setAttribute('placeholder', titleName.textContent)
    jobInput.setAttribute('placeholder', subtitleJob.textContent)
  }
  inputPlaceholder();

  // Обработчик «отправки» формы
  function formSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    // Получим значения полей jobInput и nameInput из свойства value
    let nameInputValue = nameInput.value;
    let jobInputValue = jobInput.value;

    // Вставим новые значения с помощью textContent
    titleName.textContent = nameInputValue;
    subtitleJob.textContent = jobInputValue;
    popup.classList.remove('popup_opened');
    inputPlaceholder();
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
      // Проверяем, имеет ли текущий элемент класс photos__icon_color_white
      let likeOn = currentLikeBut.classList.contains('photos__icon_color_white');

      if (likeOn === true) {
        currentLikeBut.classList.remove('photos__icon_color_white');
        currentLikeBut.classList.add('photos__icon_color_black');
      } else {
        currentLikeBut.classList.remove('photos__icon_color_black');
        currentLikeBut.classList.add('photos__icon_color_white');
      }
    }
  }

})()
