export class Card {
  constructor(title, image, cardSelector, openPopup, popupElements) {
    this._cardSelector = cardSelector;
    this._title = title;
    this._image = image;
    this._openPopup = openPopup;
    this._popupElements = popupElements;
  }

  createNewCard() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    cardElement.querySelector('.photos__image').src = this._image;
    cardElement.querySelector('.photos__image').alt = this._title;
    cardElement.querySelector('.photos__title').textContent = this._title;

    this._setEventListeners(cardElement);

    return cardElement;
  }

  _setEventListeners(card) {
    const likeBut = card.querySelector('.photos__icon');
    const delBut = card.querySelector('.photos__icon-del');
    const cardImg = card.querySelector('.photos__image');
    const cardTitle = card.querySelector('.photos__string');

    likeBut.addEventListener('click', () => this._handleLikeClick(likeBut));
    delBut.addEventListener('click', () => this._handleDelClick(card));
    cardImg.addEventListener('click', () => this._handlePhotoClick(cardImg, cardTitle));
  }

  _handleLikeClick(likeBut) {
    likeBut.classList.toggle('photos__icon_active');
  }

  _handleDelClick(card) {
    card.remove();
  }

  _handlePhotoClick(cardImg, cardTitle) {
    this._popupElements.popupImg.querySelector('.popup__title_img-only').textContent = cardTitle.textContent;
    this._popupElements.popupImg.querySelector('.popup__image').src = cardImg.src;
    this._popupElements.popupImg.querySelector('.popup__image').alt = cardTitle.textContent;

    this._openPopup(this._popupElements.popupImg);
  }
}
