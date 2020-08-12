export default class FormValidator {
  constructor(options, formElement) {
    this._submitButtonSelector = options.submitButtonSelector;
    this._initialInputClass = options.initialInputClass;
    this._invalidInputClass = options.invalidInputClass;
    this._disableButtonClass = options.disableButtonClass;
    this._enableButtonClass = options.enableButtonClass;

    this._formElement = formElement;
  }

  _showInputError(element, errorMessage) {
    element.classList.remove(this._initialInputClass);
    element.classList.add(this._invalidInputClass);
    const errorElement = this._formElement.querySelector(`#${element.id}-error`);
    errorElement.textContent = errorMessage;
  }

  _hideInputError(element) {
    element.classList.remove(this._invalidInputClass);
    element.classList.add(this._initialInputClass);
    const errorElement = this._formElement.querySelector(`#${element.id}-error`);
    errorElement.textContent = '';
  }

  _isValid (element) {
    if (element.validity.valid) {
      this._hideInputError(element);
    } else {
      this._showInputError(element, element.validationMessage);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => !inputElement.validity.valid);
  };

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.remove(this._enableButtonClass);
      buttonElement.classList.add(this._disableButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._disableButtonClass);
      buttonElement.classList.add(this._enableButtonClass);
      buttonElement.disabled = false;
    }
  };

  _setEventListeners() {
    const inputList = Array.from(this._formElement.elements);
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);

    inputList.forEach(element => {
      element.addEventListener('input', evt => {
        this._isValid(evt.target);
        this._toggleButtonState(inputList, buttonElement);
      })
    });
  }

  enableValidation() {
    this._formElement.addEventListener('submit', evt => {
        evt.preventDefault();
    });
    this._setEventListeners();
  }
}
