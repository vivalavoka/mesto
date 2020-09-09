export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);

    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleClickClose = this._handleClickClose.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleClickClose(evt) {
    if (evt.target.classList.contains('popup__close-button')
      || evt.target.classList.contains('popup')) {
      this.close();
    }
  }

  setEventListeners() {
    document.addEventListener('keyup', this._handleEscClose);
    this._popup.addEventListener('click', this._handleClickClose);
  }

  open() {
    this.setEventListeners();
    this._popup.classList.add('popup_opened');
  }

  close() {
    document.removeEventListener('keyup', this._handleEscClose);
    this._popup.removeEventListener('click', this._handleClickClose);
    this._popup.classList.remove('popup_opened');
  }
}
