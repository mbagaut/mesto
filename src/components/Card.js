export class Card {
  constructor(popupElements, handleCardClick) {
    this._cardTemplate = popupElements.templateSelector;
    this._popupElements = popupElements;
    this._handleCardClick = handleCardClick;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._cardImg = this._element.querySelector('.photos__image');
    this._cardTitle = this._element.querySelector('.photos__title');
    this._cardImg.src = this._image;
    this._cardImg.alt = this._title;
    this._cardTitle.textContent = this._title;

    return this._element;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardTemplate)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    const likeBut = this._element.querySelector('.photos__icon');
    const delBut = this._element.querySelector('.photos__icon-del');
    const cardImg = this._element.querySelector('.photos__image');
    const cardTitle = this._element.querySelector('.photos__string');

    likeBut.addEventListener('click', () => this._handleLikeClick(likeBut));
    delBut.addEventListener('click', () => this._handleDelClick());
    cardImg.addEventListener('click', () => this._handleCardClick(cardImg, cardTitle));
  }

  _handleLikeClick(likeBut) {
    likeBut.classList.toggle('photos__icon_active');
  }

  _handleDelClick() {
    this._element.remove();
  }

}
