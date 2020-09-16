import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._form = this._popup.querySelector('.popup__form');

    this._submitButton = Array.from(this._form.elements).find(input => input.type === 'submit');
    this._defaultSubmitText = this._submitButton.textContent;
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  showLoader() {
    this._submitButton.textContent = 'Подождите...';
  }

  setSubmitCallback(callback) {
    this._submit = callback;
  }

  _handleSubmit(evt) {
    evt.preventDefault();

    this._submit();
  }

  setEventListeners() {
    this._form.addEventListener('submit', this._handleSubmit);
    super.setEventListeners();
  }

  close() {
    super.close();
    this._form.removeEventListener('submit', this._handleSubmit);
    this._submitButton.textContent = this._defaultSubmitText;
  }
}
