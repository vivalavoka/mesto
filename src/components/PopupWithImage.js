import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(...args) {
    super(...args);

    this.popupPhoto = this._popup.querySelector('.popup__photo');
    this.popupTitle = this._popup.querySelector('.popup__figcaption');
  }

  open({name, link}) {
    this.popupPhoto.src = link;
    this.popupPhoto.alt = name;
    this.popupTitle.textContent = name;

    super.open();
  }
}
