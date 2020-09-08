import './index.css';

import {
  initialCards,
  editButton,
  addButton,
  profileTitle,
  profileSubtitle,
  profileForm,
  elementForm,
  formValidatorOptions,
} from '../utils/constants.js';

import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';

const createCard = (item) => {
  return (new Card(item, 'element-template', (data) => {
    photoPopup.open(data);
  })).generateCard();
};

const cardListSection = new Section({
  items: initialCards,
  renderer: (item) => createCard(item),
}, '.elements');

const userInfo = new UserInfo('#profile-name', '#profile-job');
const photoPopup = new PopupWithImage('.page__popup-photo');

const profilePopup = new PopupWithForm('.page__popup-profile', (values) => {
  profileTitle.textContent = values['profile-name'];
  profileSubtitle.textContent = values['profile-job'];

  profilePopup.close();
});

const elementPopup = new PopupWithForm('.page__popup-element', (values) => {
  cardListSection.addItem(createCard({
    name: values['element-title'],
    link: values['element-link'],
  }));

  elementPopup.close();
});

// set Common page button handlers
const setupButtonHandlers = () => {
  editButton.addEventListener('click', evt => {
    userInfo.setUserInfo(profileTitle.textContent, profileSubtitle.textContent);
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
