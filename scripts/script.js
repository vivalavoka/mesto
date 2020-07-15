let popupElement = document.querySelector('.popup');
let formElement = document.querySelector('.popup__form');

let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');

let nameInput = document.querySelector('#name');
let jobInput =  document.querySelector('#job');

let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

function togglePopup() {
  popupElement.classList.toggle('popup_opened');

  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

editButton.addEventListener('click', togglePopup);
closeButton.addEventListener('click', togglePopup);

function formSubmitHandler (evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;

  togglePopup();
}

formElement.addEventListener('submit', formSubmitHandler);
