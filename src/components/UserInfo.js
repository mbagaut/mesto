export class UserInfo {
  constructor(selectors) {
    this._titleName = document.querySelector(selectors.titleName);
    this._subtitleJob = document.querySelector(selectors.subtitleJob);
    this._userAvatar = document.querySelector(selectors.avatarImg);
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
