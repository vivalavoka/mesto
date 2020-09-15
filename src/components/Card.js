export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;

    this._handleCardClick = handleCardClick;

    this._templateSelector = `#${templateSelector}`;
    this._element = null;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector).content
      .cloneNode(true);
  }

  _setEventListeners() {
    this._element.querySelector('.element__like-btn').addEventListener('click', this._handleLikeClick);

    this._element.querySelector('.element__delete').addEventListener('click', this._handleDeleteClick);

    this._element.querySelector('.element__photo-link').addEventListener('click', () => this._handleCardClick({
      name: this._name,
      link: this._link,
    }));
  }

  _handleLikeClick(evt) {
    evt.target.classList.toggle('button_action_fill-heart');
  }

  _handleDeleteClick(evt) {
    evt.target.closest('.element').remove();
  }

  generateCard() {
    this._element = this._getTemplate();

    const title = this._element.querySelector('.element__title');
    const photo = this._element.querySelector('.element__photo');
    const likeCount = this._element.querySelector('.element__like-count');

    title.textContent = this._name;
    photo.alt = this._name;
    photo.src = this._link;
    likeCount.textContent = this._likes.length;

    this._setEventListeners();

    return this._element;
  }
}
