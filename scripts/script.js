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

const closePopup = popup => {
  removePopupEventListeners(popup);
  popup.classList.remove('popup_opened');
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

const formSubmitHandler = evt => {
  evt.preventDefault();

  if (evt.target.name === 'profile-form') {
    profileTitle.textContent = profileName.value;
    profileSubtitle.textContent = profileJob.value;
  } else if (evt.target.name === 'element-form') {
    renderElement(createCard(elementTitle.value, elementLink.value));
  }

  closePopup(document.querySelector('.popup_opened'));
}

const renderElement = element => {
  elementList.prepend(element);
}

const createCard = (title, photo) => {
  const element = elementTemplate.cloneNode(true);

  const elementTitle = element.querySelector('.element__title');
  const elementPhoto = element.querySelector('.element__photo');

  elementTitle.textContent = title;
  elementPhoto.alt = title;
  elementPhoto.src = photo;

  element.querySelector('.element__like').addEventListener('click', evt => {
    const classList = evt.target.classList;
    if (classList.contains('button_action_empty-heart')) {
      classList.remove('button_action_empty-heart');
      classList.add('button_action_fill-heart');
    } else {
      classList.remove('button_action_fill-heart');
      classList.add('button_action_empty-heart');
    }
  });

  element.querySelector('.element__delete').addEventListener('click', evt => {
    evt.target.closest('.element').remove();
  });

  element.querySelector('.element__photo-link').addEventListener('click', evt => openPopup(evt.target));

  return element;
}

const fillEditPopup = () => {
  profileName.value = profileTitle.textContent;
  profileJob.value = profileSubtitle.textContent;

  return profilePopup;
}

const fillPhotoPopup = target => {
  const element = target.closest('.element');

  const popupPhoto = photoPopup.querySelector('.popup__photo');
  const popupTitle = photoPopup.querySelector('.popup__figcaption');
  const elementTitle = element.querySelector('.element__title');

  popupPhoto.src = target.src;
  popupPhoto.alt = target.alt;
  popupTitle.textContent = elementTitle.textContent;

  return photoPopup;
}

const openPopup = target => {
  let popup;

  switch (true) {
    case target.classList.contains('profile__edit-button'):
      popup = fillEditPopup();
      break;
    case target.classList.contains('profile__add-button'):
      popup = elementPopup;
      break;
    case target.classList.contains('element__photo'):
      popup = fillPhotoPopup(target);
      break;
  }

  setPopupEventListeners(popup);
  popup.classList.add('popup_opened');
}

// Initialize buttons handlers
const editButton = document.querySelector('.profile__edit-button').addEventListener('click', evt => openPopup(evt.target));
const addButton = document.querySelector('.profile__add-button').addEventListener('click', evt => openPopup(evt.target));

// Initialize element template
const elementList = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element-template').content;

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

// Photo popup part
const photoPopup = document.querySelector('.page__popup-photo');

// Initialize existing cards
initialCards.forEach(card => {
  renderElement(createCard(card.name, card.link));
});
