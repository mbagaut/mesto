export class UserInfo {
  constructor(popupSelectors) {
    this._titleName = document.querySelector(popupSelectors.titleName);
    this._subtitleJob = document.querySelector(popupSelectors.subtitleJob);
    this._userAvatar = document.querySelector(popupSelectors.avatarImg);
  }

  setUserInfo(userInfo) {
    this._titleName.textContent = userInfo.name;
    this._subtitleJob.textContent = userInfo.about;
    this._userId = userInfo._id;
  }

  getUserInfo() {
    const titleName = this._titleName.textContent;
    const subtitleJob = this._subtitleJob.textContent;
    const userId = this._userId;
    return { titleName, subtitleJob, userId }
  }

  setNewAvatar(userInfo) {
    this._userAvatar.src = userInfo.avatar;
  }
}
