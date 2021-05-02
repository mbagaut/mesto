export default class Card {
  constructor(data, api, { selectors, handleCardClick, handleDelClick }) {
    this._api = api;
    this._cardTemplate = selectors.templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDelClick = handleDelClick;
    this._name = data.name;
    this._link = data.link;
    this._owner = data.owner;
    this._likes = data.likes;
    this._cardId = data._id;
  }

  generateCard(userData) {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._cardImg = this._element.querySelector('.photos__image');
    this._cardTitle = this._element.querySelector('.photos__title');
    this._likeCounter = this._element.querySelector('.photos__like-counter');
    this._cardImg.src = this._link;
    this._cardImg.alt = this._name;

    this._cardTitle.textContent = this._name;
    this._likeCounter.textContent = this._likes.length;

    if (userData.userId === this._owner._id) {
      this._element.querySelector('.photos__icon-del').style.display = 'block';
    }

    if (+this._likeCounter.textContent < 1) {
      this._element.querySelector('.photos__like-counter').style.display = 'none';
      this._element.querySelector('.photos__like-column').style.display = 'block';
    }

    if (this._likes.find((like) => like._id === userData.userId)) {
      this._element.querySelector('.photos__icon').classList.add('photos__icon_active');
    }

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
    delBut.addEventListener('click', () => this._handleDelClick(this._element));
    cardImg.addEventListener('click', () => this._handleCardClick(cardImg, cardTitle));
  }

  _handleLikeClick(likeBut) {
    if (!likeBut.classList.contains('photos__icon_active')) {

      this._api.putLike(this._cardId)
        .then((data) => {
          likeBut.classList.add('photos__icon_active');
          this._likeCounter.textContent = data.likes.length;
          this._element.querySelector('.photos__like-counter').style.display = 'block';
          this._element.querySelector('.photos__like-column').style.display = 'flex';
        })
        .catch((err) => console.log(`АЛЯРМ!: ${err}`));

    } else {

      this._api.deleteLike(this._cardId)
        .then((data) => {
          likeBut.classList.remove('photos__icon_active');
          this._likeCounter.textContent = data.likes.length;
          if (+this._likeCounter.textContent < 1) {
            this._element.querySelector('.photos__like-counter').style.display = 'none';
            this._element.querySelector('.photos__like-column').style.display = 'block';
          }
        })
        .catch((err) => console.log(`АЛЯРМ!: ${err}`));
    }
  }
}
