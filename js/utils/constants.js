const initialCards = [
  {
    name: 'Олёкминск',
    link: 'images/olekminsk.jpg'
  },
  {
    name: 'Якутск',
    link: 'images/yakutsk.jpg'
  },
  {
    name: 'Нерчинск',
    link: 'images/nerchinsk.jpg'
  },
  {
    name: 'Чита',
    link: 'images/chita.jpg'
  },
  {
    name: 'Енисейск',
    link: 'images/eniseisk.jpg'
  },
  {
    name: 'Якутск',
    link: 'images/beketov2.jpg'
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
};

export { initialCards, popupElements }
