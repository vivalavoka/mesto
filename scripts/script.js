const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

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

const createCard = (title, photo) => {
  const element = elementTemplate.cloneNode(true);

  const elementTitle = element.querySelector('.element__title');
  const elementPhoto = element.querySelector('.element__photo');

  elementTitle.textContent = title;
  elementPhoto.alt = title;
  elementPhoto.src = photo;

  element.querySelector('.element__like').addEventListener('click', evt => {
    evt.target.classList.toggle('button_action_fill-heart');
  });

  element.querySelector('.element__delete').addEventListener('click', evt => {
    evt.target.closest('.element').remove();
  });

  element.querySelector('.element__photo-link').addEventListener('click', evt => {
    const element = evt.target.closest('.element');

    const popupPhoto = photoPopup.querySelector('.popup__photo');
    const popupTitle = photoPopup.querySelector('.popup__figcaption');
    const elementTitle = element.querySelector('.element__title');

    popupPhoto.src = evt.target.src;
    popupPhoto.alt = evt.target.alt;
    popupTitle.textContent = elementTitle.textContent;

    openPopup(photoPopup);
  });

  return element;
}

const renderElement = element => {
  elementList.prepend(element);
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

const profileFormSubmitHandler = evt => {
  evt.preventDefault();

  profileTitle.textContent = profileName.value;
  profileSubtitle.textContent = profileJob.value;

  closePopup(document.querySelector('.popup_opened'));
}

const elementFormSubmitHandler = evt => {
  evt.preventDefault();

  renderElement(createCard(elementTitle.value, elementLink.value));

  closePopup(document.querySelector('.popup_opened'));
}

const setKeydownEventListeners = () => {
  document.addEventListener('keydown', keyDownListener);
}

const openPopup = popup => {
  setKeydownEventListeners();
  popup.classList.add('popup_opened');
}

const removeKeydownEventListeners = () => {
  document.removeEventListener('keydown', keyDownListener);
}

const closePopup = popup => {
  removeKeydownEventListeners();
  popup.classList.remove('popup_opened');
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

// set Common popup click handlers
const setupPopupHandlers = popupElement => {
  const closeButton = popupElement.querySelector('.popup__close-button');

  popupElement.addEventListener('click', overlayClickListener);
  closeButton.addEventListener('click', closeButtonListener);
}

// Initialize common handlers
const setupCommonHandlers = () => {
  setupButtonHandlers();

  profilePopup.querySelector('.popup__form').addEventListener('submit', profileFormSubmitHandler);
  setupPopupHandlers(profilePopup);

  elementPopup.querySelector('.popup__form').addEventListener('submit', elementFormSubmitHandler);
  setupPopupHandlers(elementPopup);

  setupPopupHandlers(photoPopup);
}

setupCommonHandlers();

// Initialize existing cards
initialCards.forEach(card => {
  renderElement(createCard(card.name, card.link));
});
