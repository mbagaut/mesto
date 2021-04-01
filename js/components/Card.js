export class Card {
  constructor(title, image, openPopup, popupElements) {
    this._title = title;
    this._image = image;
    this._openPopup = openPopup;
    this._popupElements = popupElements;
    this._cardTemplate = popupElements.templateSelector;
    this._popupTitle = popupElements.popupImg.querySelector('.popup__title_img-only');
    this._popupImg = popupElements.popupImg.querySelector('.popup__image');
  }

  createNewCard() {
    const cardElement = document
      .querySelector(this._cardTemplate)
      .content
      .querySelector('.card')
      .cloneNode(true);

    this._cardImg = cardElement.querySelector('.photos__image');
    this._cardTitle = cardElement.querySelector('.photos__title');
    this._cardImg.src = this._image;
    this._cardImg.alt = this._title;
    this._cardTitle.textContent = this._title;

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
    this._popupTitle.textContent = cardTitle.textContent;
    this._popupImg.src = cardImg.src;
    this._popupImg.alt = cardTitle.textContent;

    this._openPopup(this._popupElements.popupImg);
  }
}
