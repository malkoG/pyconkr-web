import { observable, action } from "mobx"

export class AuthStore {

  @observable inProgress = false
  @observable errors = undefined
  @observable values: object  = {
    email: '',
    password: '',
  }

  @action
  login () {
    this.inProgress = true
    this.errors = undefined
  }
}