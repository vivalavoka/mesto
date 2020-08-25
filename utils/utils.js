const _keyDownListener = (evt, popup) => {
  if (evt.key === 'Escape') {
    closePopup(popup);
  }
}

const _closePopupListener = (evt, popup) => {
  if (evt.target.classList.contains('popup__close-button')
    || evt.target.classList.contains('popup')) {
    closePopup(popup);
  }
}

const _setPopupEventListeners = (popup) => {
  document.addEventListener('keyup', (evt) => _keyDownListener(evt, popup));
  popup.addEventListener('click', (evt) => _closePopupListener(evt, popup));
}

const _removePopupEventListeners = (popup) => {
  document.removeEventListener('keyup', (evt) => _keyDownListener(evt, popup));
  popup.removeEventListener('click', (evt) => _closePopupListener(evt, popup));
}

export const openPopup = (popup) => {
  _setPopupEventListeners(popup);
  popup.classList.add('popup_opened');
}

export const closePopup = (popup) => {
  _removePopupEventListeners(popup);
  popup.classList.remove('popup_opened');
}
