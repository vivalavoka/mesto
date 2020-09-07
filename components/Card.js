import PopupWithImage from './PopupWithImage.js';

const photoPopup = new PopupWithImage('.page__popup-photo');

export default class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;

    this._templateSelector = `#${templateSelector}`;
    this._element = null;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector).content
      .cloneNode(true);
  }

  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', this._handleLikeClick);

    this._element.querySelector('.element__delete').addEventListener('click', this._handleDeleteClick);

    this._element.querySelector('.element__photo-link').addEventListener('click', (evt) => this._handleFullscreenClick(evt));
  }

  _handleLikeClick(evt) {
    evt.target.classList.toggle('button_action_fill-heart');
  }

  _handleDeleteClick(evt) {
    evt.target.closest('.element').remove();
  }

  _handleFullscreenClick(evt) {
    photoPopup.open(evt);
  }

  generateCard() {
    this._element = this._getTemplate();

    const elementTitle = this._element.querySelector('.element__title');
    const elementPhoto = this._element.querySelector('.element__photo');

    elementTitle.textContent = this._name;
    elementPhoto.alt = this._name;
    elementPhoto.src = this._link;

    this._setEventListeners();

    return this._element;
  }
}
