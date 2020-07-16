const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const closePopup = () => {
  const popupElement = document.querySelector('.popup');

  popupElement.classList.remove('popup_opened');
  popupElement.remove();
}

const editFormSubmitHandler = evt => {
  evt.preventDefault();

  const mainInput = document.querySelector('#main-input');
  const additionalInput = document.querySelector('#additional-input');

  const profileTitle = document.querySelector('.profile__title');
  const profileSubtitle = document.querySelector('.profile__subtitle');

  profileTitle.textContent = mainInput.value;
  profileSubtitle.textContent = additionalInput.value;

  closePopup();
}

const addFormSubmitHandler = evt => {
  evt.preventDefault();

  const mainInput = document.querySelector('#main-input').value;
  const additionalInput = document.querySelector('#additional-input').value;

  addElement(mainInput, additionalInput);

  closePopup();
}

const addElement = (title, photo) => {
  const template = document.querySelector('#element-template').content;
  const elementList = document.querySelector('.elements');
  const element = template.cloneNode(true);

  element.querySelector('.element__title').textContent = title;
  element.querySelector('.element__photo').alt = title;
  element.querySelector('.element__photo').src = photo;

  elementList.prepend(element);
}

const fillEditPopup = (popupElement) => {
  popupElement.querySelector('.popup__title').textContent = 'Редактировать профиль';

  const formElement = popupElement.querySelector('.popup__form');

  // const formElement = formElement.querySelector('.popup__submit');
  formElement.addEventListener('submit', editFormSubmitHandler);

  const mainInput = formElement.querySelector('#main-input');
  const additionalInput = formElement.querySelector('#additional-input');

  const profileTitle = document.querySelector('.profile__title');
  const profileSubtitle = document.querySelector('.profile__subtitle');

  mainInput.value = profileTitle.textContent;
  additionalInput.value = profileSubtitle.textContent;
  mainInput.placeholder = 'Имя';
  additionalInput.placeholder = 'Профессия';
}

const fillAddPopup = (popupElement) => {
  popupElement.querySelector('.popup__title').textContent = 'Новое место';

  const formElement = popupElement.querySelector('.popup__form');
  formElement.addEventListener('submit', addFormSubmitHandler);

  const mainInput = formElement.querySelector('#main-input');
  const additionalInput = formElement.querySelector('#additional-input');

  mainInput.placeholder = 'Название';
  additionalInput.placeholder = 'Ссылка на картинку';
}

const openPopup = type => {
  const template = document.querySelector('#popup-template').content;
  const pageContent = document.querySelector('.page__content');
  const popup = template.cloneNode(true);

  type === 'edit'
    ? fillEditPopup(popup)
    : fillAddPopup(popup)
  const closeButton = popup.querySelector('.popup__close-button');
  closeButton.addEventListener('click', closePopup);

  pageContent.append(popup);
}

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

editButton.addEventListener('click', () => openPopup('edit'));
addButton.addEventListener('click', () => openPopup('add'));

initialCards.forEach(card => {
  addElement(card.name, card.link);
})
