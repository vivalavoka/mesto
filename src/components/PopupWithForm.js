import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);

    this._submit = submitCallback;
    this._form = this._popup.querySelector('.popup__form');
    this.inputs = this._form.elements;

    this._submitButton = Array.from(this.inputs).find(input => input.type === 'submit');
    this._defaultSubmitText = this._submitButton.textContent;
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _getInputValues() {
    const _formValues = {};
    Array.from(this.inputs).forEach(input => {
      _formValues[input.name] = input.value;
    });
    return _formValues;
  }

  _handleSubmit(evt) {
    evt.preventDefault();

    this._submit(this._getInputValues());
  }

  showLoader() {
    this._submitButton.textContent = 'Сохранение...';
  }

  setEventListeners() {
    this._form.addEventListener('submit', this._handleSubmit);
    super.setEventListeners();
  }

  close() {
    this._submitButton.textContent = this._defaultSubmitText;
    this._form.reset();
    this._form.removeEventListener('submit', this._handleSubmit);
    super.close();
  }
}
