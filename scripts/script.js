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
  popup.classList.remove('popup_opened');
}

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
});

const editFormSubmitHandler = evt => {
  evt.preventDefault();

  profileTitle.textContent = profileName.value;
  profileSubtitle.textContent = profileJob.value;

  closePopup(profilePopup);
}

const addFormSubmitHandler = evt => {
  evt.preventDefault();

  renderElement(createCard(elementTitle.value, elementLink.value));

  closePopup(elementPopup);
}

const renderElement = element => {
  elementList.prepend(element);
}

const createCard = (title, photo) => {
  const element = elementTemplate.cloneNode(true);

  element.querySelector('.element__title').textContent = title;
  element.querySelector('.element__photo').alt = title;
  element.querySelector('.element__photo').src = photo;

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

  photoPopup.querySelector('.popup__photo').src = target.src;
  photoPopup.querySelector('.popup__photo').alt = target.alt;
  photoPopup.querySelector('.popup__figcaption').textContent = element.querySelector('.element__title').textContent;

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
profilePopup.querySelector('.popup__form').addEventListener('submit', editFormSubmitHandler);
profilePopup.querySelector('.popup__close-button').addEventListener('click', () => closePopup(profilePopup));
profilePopup.addEventListener('click', (evt) => {
  if (evt.currentTarget === evt.target) {
    closePopup(profilePopup);
  }
});

const profileName = document.querySelector('#profile-name');
const profileJob = document.querySelector('#profile-job');

// Element popup part
const elementPopup = document.querySelector('.page__popup-element');
elementPopup.querySelector('.popup__form').addEventListener('submit', addFormSubmitHandler);
elementPopup.querySelector('.popup__close-button').addEventListener('click', () => closePopup(elementPopup));
elementPopup.addEventListener('click', (evt) => {
  if (evt.currentTarget === evt.target) {
    closePopup(elementPopup);
  }
});

const elementTitle = document.querySelector('#element-title');
const elementLink = document.querySelector('#element-link');

// Photo popup part
const photoPopup = document.querySelector('.page__popup-photo');
photoPopup.querySelector('.popup__close-button').addEventListener('click', () => closePopup(photoPopup));
photoPopup.addEventListener('click', (evt) => {
  if (evt.currentTarget === evt.target) {
    closePopup(photoPopup);
  }
});

// Initialize existing cards
initialCards.forEach(card => {
  renderElement(createCard(card.name, card.link));
});

Array.from(document.forms).forEach(form => {
  Array.from(form.elements).forEach(element => {
    element.addEventListener('input', evt => {
      isValid(form, evt.target);
    })
  });
});

const showInputError = (form, element, errorMessage) => {
  element.classList.remove('input_state_initial');
  element.classList.add('input_state_invalid');
  const errorElement = form.querySelector(`#${element.id}-error`);
  errorElement.textContent = errorMessage;
}

const hideInputError = (form, element) => {
  element.classList.remove('input_state_invalid');
  element.classList.add('input_state_initial');
  const errorElement = form.querySelector(`#${element.id}-error`);
  errorElement.textContent = '';
}

const isValid = (form, element) => {
  if (element.validity.valid) {
    hideInputError(form, element);
  } else {
    showInputError(form, element, element.validationMessage);
  }
}
