var popupElement = document.querySelector('.popup');
var formElement = document.querySelector('.popup__form');

var editButton = document.querySelector('.profile__edit-button');
var closeButton = document.querySelector('.popup__close-button');

function togglePopup() {
  popupElement.classList.toggle('popup_opened');
}

editButton.addEventListener('click', togglePopup);
closeButton.addEventListener('click', togglePopup);

function formSubmitHandler (evt) {
    evt.preventDefault();

    togglePopup();

    // Находим поля формы в DOM
    let nameInput = document.querySelector('#name');
    let jobInput =  document.querySelector('#job');

    let profileTitle = document.querySelector('.profile__title');
    let profileSubtitle = document.querySelector('.profile__subtitle');

    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
}

formElement.addEventListener('submit', formSubmitHandler);
