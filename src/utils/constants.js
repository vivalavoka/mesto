export const editButton = document.querySelector('.profile__edit-button');
export const addButton = document.querySelector('.profile__add-button');

// Initialize profile output
export const profileTitle = document.querySelector('.profile__title');
export const profileSubtitle = document.querySelector('.profile__subtitle');

// Profile popup part
export const profileForm = document.forms.namedItem('profile-form');

// Element popup part
export const elementForm = document.forms.namedItem('element-form');

// Photo popup part
export const photoPopup = document.querySelector('.page__popup-photo');

// Forms options
export const formValidatorOptions = {
  submitButtonSelector: '.popup__submit',
  initialInputClass: '.input_state_initial',
  invalidInputClass: '.input_state_invalid',
  disableButtonClass: 'popup__submit_state_disable',
  enableButtonClass: 'popup__submit_state_enable',
};

export const initialCards = [
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
