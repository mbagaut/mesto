import { Card } from './Card.js';

export default class UserCard extends Card {
  constructor(data, popupElements, handleCardClick) {
    super(popupElements, handleCardClick);
    this._title = data.cardName;
    this._image = data.cardLink;
  }
}
