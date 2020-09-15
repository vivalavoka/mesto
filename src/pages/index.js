import './index.css';

import {
  cohortId,
  authToken,
  editButton,
  addButton,
  avatarEditButton,
  profileForm,
  elementForm,
  avatarForm,
  formValidatorOptions,
} from '../utils/constants.js';

import Api from '../components/Api.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';

const api = new Api({
  baseUrl: `https://mesto.nomoreparties.co/v1/${cohortId}`,
  headers: {
    authorization: authToken,
  }
});

const createCard = (item) => {
  const {id} = userInfo.getUserInfo();
  return (new Card({
    name: item.name,
    link: item.link,
    likeCount: item.likes.length,
    isOwner: item.owner._id === id,
  }, 'element-template', (data) => {
    photoPopup.open(data);
  })).generateCard();
};

const profileFormValidator = new FormValidator(formValidatorOptions, profileForm);

const elementFormValidator = new FormValidator(formValidatorOptions, elementForm);

const avatarFormValidator = new FormValidator(formValidatorOptions, avatarForm);

let cardListSection;

const userInfo = new UserInfo({
  name: '.profile__title',
  about: '.profile__subtitle',
  avatar: '.profile__avatar',
});
const photoPopup = new PopupWithImage('.page__popup-photo');

const profilePopup = new PopupWithForm('.page__popup-profile', (values) => {
  const name = values['profile-name'];
  const about = values['profile-about'];

  api.updateProfile(name, about).then(data => {
    userInfo.setUserInfo(data.name, data.about)
  });

  profilePopup.close();
  profileFormValidator.checkValidation();
});

const elementPopup = new PopupWithForm('.page__popup-element', (values) => {

  api.addCard(values['element-title'], values['element-link']).then(response => {
    cardListSection.addItem(createCard(response));
  })

  elementPopup.close();
  elementFormValidator.checkValidation();
});

const avatarPopup = new PopupWithForm('.page__popup-avatar', (values) => {
  avatarPopup.close();

  userInfo.setAvatar(values['avatar-link']);

  avatarFormValidator.checkValidation();
});

// set Common page button handlers
const setupButtonHandlers = () => {
  editButton.addEventListener('click', evt => {
    const {name, about} = userInfo.getUserInfo();
    profilePopup.inputs['profile-name'].value = name;
    profilePopup.inputs['profile-about'].value = about;

    profilePopup.open();
  });

  addButton.addEventListener('click', evt => {
    elementPopup.open();
  });

  avatarEditButton.addEventListener('click', evt => {
    avatarPopup.open();
  })
}

// Initialize common handlers
setupButtonHandlers();

profileFormValidator.enableValidation();
elementFormValidator.enableValidation();
avatarFormValidator.enableValidation();

api.getInitialCards().then(items => {
  cardListSection = new Section({
    items,
    renderer: (item) => createCard(item),
  }, '.elements');
  cardListSection.renderItems();
});

api.getProfile().then(data => {
  userInfo.setUniqId(data._id);
  userInfo.setUserInfo(data.name, data.about);
  userInfo.setAvatar(data.avatar);
});
