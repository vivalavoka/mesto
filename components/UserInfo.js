export default class UserInfo {
  constructor(nameSelector, jobSelector) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
  }

  getUserInfo() {
    return {
      name: this._name.value,
      job: this._job.value,
    }
  }

  setUserInfo(name, job) {
    this._name.value = name;
    this._job.value = job;
  }
}
