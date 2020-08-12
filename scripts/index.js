import Card from './Card.js';
import FormValidator from './FormValidator.js';

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

// Initialize element template
const elementList = document.querySelector('.elements');

// Initialize profile output
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

// Profile popup part
const profilePopup = document.querySelector('.page__popup-profile');

const profileName = document.querySelector('#profile-name');
const profileJob = document.querySelector('#profile-job');

// Element popup part
const elementPopup = document.querySelector('.page__popup-element');

const elementTitle = document.querySelector('#element-title');
const elementLink = document.querySelector('#element-link');

const initialCards = [
  {
      name: 'Москва, Россия',
      link: 'https://images.unsplash.com/photo-1520106212299-d99c443e4568?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
  },
  {
      name: 'Лондон, Великобритания',
      link: 'https://images.unsplash.com/photo-1594714076347-185959343580?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80'
  },
  {
      name: 'Манарола, Италия',
      link: 'https://images.unsplash.com/photo-1594881497142-08fdfdfc4074?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=658&q=80'
  },
  {
      name: 'Токио, Китай',
      link: 'https://images.unsplash.com/photo-1455459182396-ae46100617cb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80'
  },
  {
      name: 'Хигашияма, Япония',
      link: 'https://images.unsplash.com/photo-1594837712147-ea4964693e15?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=702&q=80'
  },
  {
      name: 'Бруклин, США',
      link: 'https://images.unsplash.com/photo-1594744754648-7836af69e1c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80'
  }
];

const renderElement = element => {
  elementList.prepend(element.generateCard());
}

const keyDownListener = function (evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

const overlayClickListener = function (evt) {
  if (evt.currentTarget === evt.target) {
    closePopup(document.querySelector('.popup_opened'));
  }
}

const closeButtonListener = function (evt) {
  closePopup(document.querySelector('.popup_opened'));
}

const formSubmitHandler = evt => {
  evt.preventDefault();

  if (evt.target.name === 'profile-form') {
    profileTitle.textContent = profileName.value;
    profileSubtitle.textContent = profileJob.value;
  } else if (evt.target.name === 'element-form') {
    renderElement(new Card({
      name: elementTitle.value,
      link: elementLink.value,
    }, 'element-template'));
  }

  closePopup(document.querySelector('.popup_opened'));
}

const setPopupEventListeners = (popupElement) => {
  const closeButton = popupElement.querySelector('.popup__close-button');
  const popupForm = popupElement.querySelector('.popup__form');

  document.addEventListener('keydown', keyDownListener);
  popupElement.addEventListener('click', overlayClickListener);
  closeButton.addEventListener('click', closeButtonListener);

  if (popupForm) {
    popupForm.addEventListener('submit', formSubmitHandler);
  }
}

const openPopup = popup => {
  setPopupEventListeners(popup);
  popup.classList.add('popup_opened');
}

const removePopupEventListeners = (popupElement) => {
  const closeButton = popupElement.querySelector('.popup__close-button');
  const popupForm = popupElement.querySelector('.popup__form');

  document.removeEventListener('keydown', keyDownListener);
  popupElement.removeEventListener('click', overlayClickListener);
  closeButton.removeEventListener('click', closeButtonListener);

  if (popupForm) {
    popupForm.removeEventListener('submit', formSubmitHandler);
  }
}

const closePopup = popup => {
  removePopupEventListeners(popup);
  popup.classList.remove('popup_opened');
}

// Initialize buttons handlers
const setOpenPopupEventListeners = () => {
  editButton.addEventListener('click', evt => {
    profileName.value = profileTitle.textContent;
    profileJob.value = profileSubtitle.textContent;
    openPopup(profilePopup);
  });
  addButton.addEventListener('click', evt => {
    openPopup(elementPopup);
  });
}

setOpenPopupEventListeners();

(new FormValidator({
  submitButtonSelector: '.popup__submit',
  initialInputClass: '.input_state_initial',
  invalidInputClass: '.input_state_invalid',
  disableButtonClass: 'popup__submit_state_disable',
  enableButtonClass: 'popup__submit_state_enable',
}, document.forms.namedItem('profile-form'))).enableValidation();

(new FormValidator({
  submitButtonSelector: '.popup__submit',
  initialInputClass: '.input_state_initial',
  invalidInputClass: '.input_state_invalid',
  disableButtonClass: 'popup__submit_state_disable',
  enableButtonClass: 'popup__submit_state_enable',
}, document.forms.namedItem('element-form'))).enableValidation();

// Initialize existing cards
initialCards.forEach(card => {
  renderElement(new Card(card, 'element-template'));
});
