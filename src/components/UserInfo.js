export class UserInfo {
  constructor(popupElements) {
    this._titleName = popupElements.titleName;
    this._subtitleJob = popupElements.subtitleJob;
  }

  getUserInfo(form) {
    const titleName = this._titleName.textContent;
    const subtitleJob = this._subtitleJob.textContent;
    form.name.value = titleName;
    form.job.value = subtitleJob;

    return { titleName, subtitleJob }
  }

  setUserInfo({ inputName, inputJob }) {
    this._titleName.textContent = inputName;
    this._subtitleJob.textContent = inputJob;
  }
}
