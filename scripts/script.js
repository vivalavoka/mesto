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

const popupElement = document.querySelector('.popup');
const formElement = document.querySelector('.popup__form');

const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');

const nameInput = document.querySelector('#name');
const jobInput =  document.querySelector('#job');

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const togglePopup = () => {
  popupElement.classList.toggle('popup_opened');

  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

const formSubmitHandler = evt => {
    evt.preventDefault();

    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;

    togglePopup();
}

editButton.addEventListener('click', togglePopup);
closeButton.addEventListener('click', togglePopup);

formElement.addEventListener('submit', formSubmitHandler);

const template = document.querySelector('#element-template').content;
const elementList = document.querySelector('.elements');

const addElement = (title, photo) => {
  const element = template.cloneNode(true);
  element.querySelector('.element__title').textContent = title;
  element.querySelector('.element__photo').alt = title;
  element.querySelector('.element__photo').src = photo;

  elementList.append(element);
}

initialCards.forEach(card => {
  addElement(card.name, card.link);
})


