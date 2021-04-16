const olekminsk = new URL('../images/olekminsk.jpg', import.meta.url);
const yakutsk = new URL('../images/yakutsk.jpg', import.meta.url);
const nerchinsk = new URL('../images/nerchinsk.jpg', import.meta.url);
const chita = new URL('../images/chita.jpg', import.meta.url);
const eniseisk = new URL('../images/eniseisk.jpg', import.meta.url);
const beketov2 = new URL('../images/beketov2.jpg', import.meta.url);


const initialCards = [
  {
    name: 'Олёкминск',
    img: olekminsk
  },
  {
    name: 'Якутск',
    img: yakutsk
  },
  {
    name: 'Нерчинск',
    img: nerchinsk
  },
  {
    name: 'Чита',
    img: chita
  },
  {
    name: 'Енисейск',
    img: eniseisk
  },
  {
    name: 'Якутск',
    img: beketov2
  }
];

const popupElements = {
  openPopupRedactBut: document.querySelector('#popup-redact-but'),
  openPopupAddBut: document.querySelector('#popup-add-but'),
  popupRedact: document.querySelector('#popup-redact'),
  popupAdd: document.querySelector('#popup-add'),
  popupImg: document.querySelector('#popup-img'),
  titleName: document.querySelector('.person__title'),
  subtitleJob: document.querySelector('.person__job'),
  popupRedactForm: document.forms.popupRedactForm,
  popupAddForm: document.forms.popupAddForm,
  cardsContainer: document.querySelector('#photos'),
  submitAddForm: document.forms.popupAddForm.querySelector('.popup__submit-btn'),
  submitRedactForm: document.forms.popupRedactForm.querySelector('.popup__submit-btn'),
  templateSelector: '#card-template',
  popupsNodeList: document.querySelectorAll('.popup'),
};

const formSelectors = {
  fieldsetSelector: '.popup__fieldset',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__input-error',
}
export { initialCards, popupElements, formSelectors }
