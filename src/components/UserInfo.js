export class UserInfo {
  constructor(popupElements) {
    this._titleName = popupElements.titleName;
    this._subtitleJob = popupElements.subtitleJob;
  }

  setUserInfo({ inputName, inputJob }) {
    this._titleName.textContent = inputName;
    this._subtitleJob.textContent = inputJob;
  }

  getUserInfo() {
    const titleName = this._titleName.textContent;
    const subtitleJob = this._subtitleJob.textContent;

    return { titleName, subtitleJob }
  }
}
