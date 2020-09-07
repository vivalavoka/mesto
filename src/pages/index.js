import './index.css';

import {
  initialCards,
  editButton,
  addButton,
  profileTitle,
  profileSubtitle,
  profileForm,
  elementForm,
  elementTitle,
  elementLink,
  formValidatorOptions,
} from '../utils/constants.js';

import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';

const cardListSection = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, 'element-template', (evt) => {
      photoPopup.open(evt);
    });
    return card.generateCard();
  },
}, '.elements');

const userInfo = new UserInfo('#profile-name', '#profile-job');
const photoPopup = new PopupWithImage('.page__popup-photo');

const profilePopup = new PopupWithForm('.page__popup-profile', (evt) => {
  evt.preventDefault();

  const {name, job} = userInfo.getUserInfo();

  profileTitle.textContent = name;
  profileSubtitle.textContent = job;

  profilePopup.close();
});

const elementPopup = new PopupWithForm('.page__popup-element', (evt) => {
  evt.preventDefault();

  const card = new Card({
    name: elementTitle.value,
    link: elementLink.value,
  }, 'element-template', (evt) => {
    photoPopup.open(evt);
  });

  cardListSection.addItem(card.generateCard());

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
