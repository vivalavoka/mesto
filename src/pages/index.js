import './index.css';

import {
  initialCards,
  editButton,
  addButton,
  profileForm,
  elementForm,
  formValidatorOptions,
} from '../utils/constants.js';

import Api from '../components/Api.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';

// const api = new Api({
//   baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-15',
//   headers: {
//     authorization: '',
//     'Content-Type': 'application/json'
//   }
// });

const createCard = (item) => {
  return (new Card(item, 'element-template', (data) => {
    photoPopup.open(data);
  })).generateCard();
};

const profileFormValidator = new FormValidator(formValidatorOptions, profileForm);

const elementFormValidator = new FormValidator(formValidatorOptions, elementForm);

const cardListSection = new Section({
  items: initialCards,
  renderer: (item) => createCard(item),
}, '.elements');

const userInfo = new UserInfo({
  name: '.profile__title',
  job: '.profile__subtitle',
});
const photoPopup = new PopupWithImage('.page__popup-photo');

const profilePopup = new PopupWithForm('.page__popup-profile', (values) => {
  userInfo.setUserInfo(values['profile-name'], values['profile-job']);

  profilePopup.close();

  profileFormValidator.checkValidation();
});

const elementPopup = new PopupWithForm('.page__popup-element', (values) => {
  cardListSection.addItem(createCard({
    name: values['element-title'],
    link: values['element-link'],
  }));

  elementPopup.close();

  elementFormValidator.checkValidation();
});

// set Common page button handlers
const setupButtonHandlers = () => {
  editButton.addEventListener('click', evt => {
    const {name, job} = userInfo.getUserInfo();
    profilePopup.inputs['profile-name'].value = name;
    profilePopup.inputs['profile-job'].value = job;

    profilePopup.open();
  });

  addButton.addEventListener('click', evt => {
    elementPopup.open();
  });
}

// Initialize common handlers
setupButtonHandlers();

profileFormValidator.enableValidation();
elementFormValidator.enableValidation();

cardListSection.renderItems();
