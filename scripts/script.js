var popupElement = document.querySelector('.popup');

var editButton = document.querySelector('.profile__edit-button');
var closeButton = document.querySelector('.popup__close-button');

function openPopup() {
    popupElement.classList.add('popup_opened');
}

function closePopup() {
    popupElement.classList.remove('popup_opened');
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);