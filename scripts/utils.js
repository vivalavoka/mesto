const _keyDownListener = (evt, popup) => {
  if (evt.key === 'Escape') {
    closePopup(popup);
  }
}

const _overlayClickListener = (evt, popup) => {
  if (evt.currentTarget === evt.target) {
    closePopup(popup);
  }
}

const _closeButtonListener = (evt, popup) => {
  closePopup(popup);
}

const _setPopupEventListeners = (popup) => {
  const closeButton = popup.querySelector('.popup__close-button');

  document.addEventListener('keyup', (evt) => _keyDownListener(evt, popup));
  popup.addEventListener('click', (evt) => _overlayClickListener(evt, popup));
  closeButton.addEventListener('click', (evt) => _closeButtonListener(evt, popup));
}

const _removePopupEventListeners = (popup) => {
  const closeButton = popup.querySelector('.popup__close-button');

  document.removeEventListener('keydown', (evt) => _keyDownListener(evt, popup));
  popup.removeEventListener('click', (evt) => _overlayClickListener(evt, popup));
  closeButton.removeEventListener('click', (evt) => _closeButtonListener(evt, popup));
}

export const openPopup = (popup) => {
  _setPopupEventListeners(popup);
  popup.classList.add('popup_opened');
}

export const closePopup = (popup) => {
  _removePopupEventListeners(popup);
  popup.classList.remove('popup_opened');
}