import { observable, action } from 'mobx'
import { UserStore } from './UserStore'
import { serializable } from 'serializr';

export class TodoStore {
  @serializable @observable name: string = '';
  @serializable @observable done: boolean = false;
  @serializable @observable user?: UserStore;

  @action
  setName(newName: string) {
    self.name = newName
  }

  @action
  setUser(user: UserStore | '') {
    if (user === '') {
      // When selected value is empty, set as null
      this.user = null as any
    } else {
      this.user = user as UserStore
    }
  }

  @action
  toggle() {
    this.done = !this.done
  }
}