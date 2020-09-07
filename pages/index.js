// import './index.css';

import {
  initialCards,
  editButton,
  addButton,
  profileTitle,
  profileSubtitle,
  profileForm,
  profileName,
  profileJob,
  elementForm,
  elementTitle,
  elementLink,
  formValidatorOptions,
} from '../utils/constants.js';

import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';

const cardListSection = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, 'element-template');
    return card.generateCard();
  },
}, '.elements');

// const photoPopup = new PopupWithImage('.page__popup-photo');

const profilePopup = new PopupWithForm('.page__popup-profile', (evt) => {
  evt.preventDefault();

  profileTitle.textContent = profileName.value;
  profileSubtitle.textContent = profileJob.value;

  profilePopup.close();
});
const elementPopup = new PopupWithForm('.page__popup-element', (evt) => {
  evt.preventDefault();

  cardListSection.addItem(new Card({
    name: elementTitle.value,
    link: elementLink.value,
  }, 'element-template'));

  elementPopup.close();
});

// set Common page button handlers
const setupButtonHandlers = () => {
  editButton.addEventListener('click', evt => {
    profileName.value = profileTitle.textContent;
    profileJob.value = profileSubtitle.textContent;
    profilePopup.open();
  });
  addButton.addEventListener('click', evt => {
    elementPopup.open();
  });
}

// Initialize common handlers
setupButtonHandlers();

(new FormValidator(formValidatorOptions, profileForm)).enableValidation();

(new FormValidator(formValidatorOptions, elementForm)).enableValidation();

cardListSection.renderItems();
