import {openPopup, closePopup} from '../utils/utils.js';
import {
  initialCards,
  editButton,
  addButton,
  elementList,
  profileTitle,
  profileSubtitle,
  profilePopup,
  profileForm,
  profileName,
  profileJob,
  elementPopup,
  elementForm,
  elementTitle,
  elementLink,
  formValidatorOptions,
} from '../utils/contants.js';

import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';

const cardListSection = new Section({
  data: initialCards,
  renderer: (item) => {
    const card = new Card(item, 'element-template');
    return card.generateCard();
  },
}, elementList);

const profileFormSubmitHandler = evt => {
  evt.preventDefault();

  profileTitle.textContent = profileName.value;
  profileSubtitle.textContent = profileJob.value;

  closePopup(document.querySelector('.popup_opened'));
}

const elementFormSubmitHandler = evt => {
  evt.preventDefault();

  cardListSection.setItem(new Card({
    name: elementTitle.value,
    link: elementLink.value,
  }, 'element-template'));

  closePopup(document.querySelector('.popup_opened'));
}

// set Common page button handlers
const setupButtonHandlers = () => {
  editButton.addEventListener('click', evt => {
    profileName.value = profileTitle.textContent;
    profileJob.value = profileSubtitle.textContent;
    openPopup(profilePopup);
  });
  addButton.addEventListener('click', evt => {
    openPopup(elementPopup);
  });
}

// Initialize common handlers
const setupCommonHandlers = () => {
  setupButtonHandlers();

  profilePopup.querySelector('.popup__form').addEventListener('submit', profileFormSubmitHandler);
  elementPopup.querySelector('.popup__form').addEventListener('submit', elementFormSubmitHandler);
}

setupCommonHandlers();

(new FormValidator(formValidatorOptions, profileForm)).enableValidation();

(new FormValidator(formValidatorOptions, elementForm)).enableValidation();

cardListSection.renderItems();
