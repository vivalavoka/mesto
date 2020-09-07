import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  open(evt) {
    const popupPhoto = this._popup.querySelector('.popup__photo');
    const popupTitle = this._popup.querySelector('.popup__figcaption');

    const elementTitle = evt.target.closest('.element').querySelector('.element__title');
    popupPhoto.src = evt.target.src;
    popupPhoto.alt = evt.target.alt;
    popupTitle.textContent = elementTitle.textContent;

    super.open();
  }
}
