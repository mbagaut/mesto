// const olekminsk = new URL('../images/olekminsk.jpg', import.meta.url);
// const yakutsk = new URL('../images/yakutsk.jpg', import.meta.url);
// const nerchinsk = new URL('../images/nerchinsk.jpg', import.meta.url);
// const chita = new URL('../images/chita.jpg', import.meta.url);
// const eniseisk = new URL('../images/eniseisk.jpg', import.meta.url);
// const beketov2 = new URL('../images/beketov2.jpg', import.meta.url);

const selectors = {
  openPopupAvatarBut: '#popup-avatar-but',
  openPopupRedactBut: '#popup-redact-but',
  openPopupAddBut: '#popup-add-but',

  popupAvatar: '#popup-avatar',
  popupRedact: '#popup-redact',
  popupAdd: '#popup-add',
  popupImg: '#popup-img',
  popupDel: '#popup-del',

  titleName: '.person__title',
  subtitleJob: '.person__job',
  avatarImg: '.person__photo',

  cardsContainer: '#photos',
  templateSelector: '#card-template',
};

const formSelectors = {
  fieldsetSelector: '.popup__fieldset',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__input-error',
}
export { selectors, formSelectors }
