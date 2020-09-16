export default class Card {
  constructor(data, templateSelector, handlers) {
    this._userId = data.userId;
    this._id = data.id;
    this._owner = data.owner;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;

    this._handleCardClick = handlers.handleCardClick;
    this._handleCardDelete = handlers.handleCardDelete;
    this._handleCardLike = handlers.handleCardLike;
    this._handleCardDislike = handlers.handleCardDislike;

    this._templateSelector = `#${templateSelector}`;
    this._element = null;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector).content
      .cloneNode(true);
  }

  _setEventListeners() {
    this._element.querySelector('.element__like-btn').addEventListener('click', () => {
      this._isLiked() ? this._handleCardDislike(this._id) : this._handleCardLike(this._id);
      this._refreshLikeCount();
    });

    this._element.querySelector('.element__delete').addEventListener('click', () => this._handleCardDelete(this._id));

    this._element.querySelector('.element__photo-link').addEventListener('click', () => this._handleCardClick({
      name: this._name,
      link: this._link,
    }));
  }

  _refreshLikeCount() {
    const likeCount = this._element.querySelector('.element__like-count');
    likeCount.textContent = this._likes.length;
  }

  _isLiked() {
    return this._likes.some(({_id}) => _id === this._userId);
  }

  updateLikes(likes) {
    this._likes = likes;
    this._refreshLikeCount();
    this._isLiked() ? this.likeCard() : this.dislikeCard();
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
    const deleteBtn = this._element.querySelector('.element__delete');

    title.textContent = this._name;
    photo.alt = this._name;
    photo.src = this._link;

    this._refreshLikeCount();

    if (this._owner._id !== this._userId) {
      deleteBtn.classList.add('button_state_invisible');
    }

    this._isLiked() ? this.likeCard() : this.dislikeCard();

    this._setEventListeners();

    return this._element;
  }
}
