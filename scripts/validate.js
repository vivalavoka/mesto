const showInputError = (form, element, errorMessage, options) => {
  element.classList.remove(options.initialInputClass);
  element.classList.add(options.invalidInputClass);
  const errorElement = form.querySelector(`#${element.id}-error`);
  errorElement.textContent = errorMessage;
}

const hideInputError = (form, element, options) => {
  element.classList.remove(options.invalidInputClass);
  element.classList.add(options.initialInputClass);
  const errorElement = form.querySelector(`#${element.id}-error`);
  errorElement.textContent = '';
}

const isValid = (form, element, options) => {
  if (element.validity.valid) {
    hideInputError(form, element, options);
  } else {
    showInputError(form, element, element.validationMessage, options);
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => !inputElement.validity.valid);
};


const toggleButtonState = (inputList, buttonElement, options) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.remove(options.enableButtonClass);
    buttonElement.classList.add(options.disableButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(options.disableButtonClass);
    buttonElement.classList.add(options.enableButtonClass);
    buttonElement.disabled = false;
  }
};

const setEventListeners = (form, options) => {
  const inputList = Array.from(form.elements);
  const buttonElement = form.querySelector(options.submitButtonSelector);

  inputList.forEach(element => {
    element.addEventListener('input', evt => {
      isValid(form, evt.target, options);
      toggleButtonState(inputList, buttonElement, options);
    })
  });
}

const enableValidation = (options) => {
  Array.from(document.forms).forEach(formElement => {
    formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });
    setEventListeners(formElement, options);
  })
}

enableValidation({
  submitButtonSelector: '.popup__submit',
  initialInputClass: '.input_state_initial',
  invalidInputClass: '.input_state_invalid',
  disableButtonClass: 'popup__submit_state_disable',
  enableButtonClass: 'popup__submit_state_enable',
});
