export default class Card {
  constructor(data, templateSelector, handlers) {
    this._id = data.id;
    this._name = data.name;
    this._link = data.link;
    this._likeCount = data.likeCount;
    this._isOwner = data.isOwner;

    this._handleCardClick = handlers.handleCardClick;
    this._handleCardDelete = handlers.handleCardDelete;
    this._handleCardLike = handlers.handleCardLike;

    this._templateSelector = `#${templateSelector}`;
    this._element = null;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector).content
      .cloneNode(true);
  }

  _setEventListeners() {
    this._element.querySelector('.element__like-btn').addEventListener('click', () => this._handleCardLike(this._id));

    this._element.querySelector('.element__delete').addEventListener('click', () => this._handleCardDelete(this._id));

    this._element.querySelector('.element__photo-link').addEventListener('click', () => this._handleCardClick({
      name: this._name,
      link: this._link,
    }));
  }

  likeCard() {
    this._element.querySelector('.element__like-btn').classList.add('button_action_fill-heart');
  }

  dislikeCard() {
    this._element.querySelector('.element__like-btn').classList.remove('button_action_fill-heart');
  }

  removeCard() {
    this._element.remove();
  }

  generateCard() {
    this._element = this._getTemplate().querySelector('.element');

    const title = this._element.querySelector('.element__title');
    const photo = this._element.querySelector('.element__photo');
    const likeCount = this._element.querySelector('.element__like-count');
    const deleteBtn = this._element.querySelector('.element__delete');

    title.textContent = this._name;
    photo.alt = this._name;
    photo.src = this._link;
    likeCount.textContent = this._likeCount;
    if (!this._isOwner) {
      deleteBtn.classList.add('button_state_invisible');
    }

    this._setEventListeners();

    return this._element;
  }
}
