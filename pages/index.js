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

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';

const renderElement = element => {
  elementList.prepend(element.generateCard());
}

const profileFormSubmitHandler = evt => {
  evt.preventDefault();

  profileTitle.textContent = profileName.value;
  profileSubtitle.textContent = profileJob.value;

  closePopup(document.querySelector('.popup_opened'));
}

const elementFormSubmitHandler = evt => {
  evt.preventDefault();

  renderElement(new Card({
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

// Initialize existing cards
initialCards.forEach(card => {
  renderElement(new Card(card, 'element-template'));
});
