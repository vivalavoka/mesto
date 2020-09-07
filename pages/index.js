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
import Popup from '../components/Popup.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';

const cardListSection = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, 'element-template');
    return card.generateCard();
  },
}, '.elements');

const profilePopup = new Popup('.page__popup-profile');
const elementPopup = new Popup('.page__popup-element');

const profileFormSubmitHandler = evt => {
  evt.preventDefault();

  profileTitle.textContent = profileName.value;
  profileSubtitle.textContent = profileJob.value;

  profilePopup.close();
}

const elementFormSubmitHandler = evt => {
  evt.preventDefault();

  cardListSection.setItem(new Card({
    name: elementTitle.value,
    link: elementLink.value,
  }, 'element-template'));

  elementPopup.close();
}

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
const setupCommonHandlers = () => {
  setupButtonHandlers();

  profilePopup._popup.querySelector('.popup__form').addEventListener('submit', profileFormSubmitHandler);
  elementPopup._popup.querySelector('.popup__form').addEventListener('submit', elementFormSubmitHandler);
}

setupCommonHandlers();

(new FormValidator(formValidatorOptions, profileForm)).enableValidation();

(new FormValidator(formValidatorOptions, elementForm)).enableValidation();

cardListSection.renderItems();
