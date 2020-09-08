import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);

    this._submit = submitCallback;
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = Array.from(this._form.elements);
  }

  _getInputValues() {
    const _formValues = {};
    this._inputs.forEach(input => _formValues[input.name] = input.value);
    return _formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._submit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
