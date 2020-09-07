import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);

    this._submit = submitCallback;
    this._form = this._popup.querySelector('.popup__form');
  }

  _getInputValues() {
    return Array.from(this._form.elements);
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._submit);
  }

  close() {
    super.close();
    this._form.reset();
  }
}
