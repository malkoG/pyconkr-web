import { TodoStore } from "./TodoStore"
import { UserStore } from "./UserStore"
import { createModelSchema, object, serializable } from "serializr"
import { PresentationStore } from "./PresentationStore";

export class MobxStores {

  @serializable todoStore: TodoStore

  @serializable userStore: UserStore
  @serializable presentationStore: PresentationStore

  constructor () {
    this.todoStore = new TodoStore()
    this.userStore = new UserStore()
    this.presentationStore = new PresentationStore()
  }
}

createModelSchema(MobxStores, {
  userStore: object(UserStore),
  todoStore: object(TodoStore),
  presentationStore: object(PresentationStore),
})

export type MobxStoresType = typeof MobxStores