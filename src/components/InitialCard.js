import { Card } from './Card.js';

export default class InitialCard extends Card {
  constructor(data, popupElements, handleCardClick) {
    super(popupElements, handleCardClick);
    this._title = data.name;
    this._image = data.img;
  }
}
