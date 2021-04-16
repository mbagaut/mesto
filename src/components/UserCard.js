import { Card } from './Card.js';

export default class UserCard extends Card {
  constructor(data, popupElements, handleCardClick) {
    super(popupElements, handleCardClick);
    this._title = data.cardTitle;
    this._image = data.cardImage;
  }
}
