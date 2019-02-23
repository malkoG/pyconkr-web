import { createModelSchema, object, serializable } from 'serializr'
import { AuthStore } from './AuthStore'
import { PresentationStore } from './PresentationStore'
import { TodoStore } from './TodoStore'
import { UserStore } from './UserStore'

export class MobxStores {

  @serializable(object(TodoStore)) todoStore: TodoStore
  @serializable(object(AuthStore)) authStore: AuthStore
  @serializable(object(UserStore)) userStore: UserStore
  // @serializable presentationStore: PresentationStore

  constructor () {
    this.todoStore = new TodoStore()
    this.userStore = new UserStore()
    this.authStore = new AuthStore()
    // this.presentationStore = new PresentationStore()
  }
}

export type MobxStoresType = typeof MobxStores
