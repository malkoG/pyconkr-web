import { observable, action, configure } from "mobx"
import "ts-transform-async-to-mobx-flow/transformToMobxFlow"

// don't allow state modifications outside actions
configure({ enforceActions: "observed" })

export class AuthStore {

  @observable inProgress: boolean = false
  @observable state: string = 'pending'
  @observable values: object  = {
    email: '',
    password: '',
  }

  @action
  @transformToMobxFlow
  async login() {
    this.state
  }
  // login = flow(function * login () {
  //   this.inProgress = false
  //   this.errors = undefined
  //   try {
  //     const result = yield []
  //   } catch (error) {

  //   }
  // })


  // async login() {
  //   this.inProgress = false
  //   this.state = 'pending'

  //   try {

  //   } catch (error) {

  //   }
  // }
}
