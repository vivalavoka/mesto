export default class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;

    this._templateSelector = templateSelector;
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

    this._element.querySelector('.element__photo-link').addEventListener('click', this._handleFullscreenClick);
  }

  _handleLikeClick(evt) {
    evt.target.classList.toggle('button_action_fill-heart');
  }

  _handleDeleteClick(evt) {
    evt.target.closest('.element').remove();
  }

  _handleFullscreenClick(evt) {
    const popupPhoto = photoPopup.querySelector('.popup__photo');
    const popupTitle = photoPopup.querySelector('.popup__figcaption');
    const elementTitle = evt.target.closest('.element').querySelector('.element__title');
    popupPhoto.src = evt.target.src;
    popupPhoto.alt = evt.target.alt;
    popupTitle.textContent = elementTitle.textContent;

    openPopup(photoPopup);
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
