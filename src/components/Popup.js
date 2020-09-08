export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);

    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    document.addEventListener('keyup', this._handleEscClose);
    this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup__close-button')
        || evt.target.classList.contains('popup')) {
        this.close();
      }
    });
  }

  open() {
    this.setEventListeners();
    this._popup.classList.add('popup_opened');
  }

  close() {
    document.removeEventListener('keyup', this._handleEscClose);
    this._popup.classList.remove('popup_opened');
  }
}
