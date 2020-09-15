export default class UserInfo {
  constructor({name, about, avatar}) {
    this._id = null;

    this._name = document.querySelector(name);
    this._about = document.querySelector(about);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    return {
      id: this._id,
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._avatar.src,
    }
  }

  setUniqId(id) {
    this._id = id;
  }

  setUserInfo(name, about) {
    this._name.textContent = name;
    this._about.textContent = about;
  }

  setAvatar(src) {
    this._avatar.src = src;
  }
}
