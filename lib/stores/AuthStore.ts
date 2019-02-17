import { client } from 'lib/apollo_graphql/client'
import { getAuthToken } from 'lib/apollo_graphql/mutations/getAuthToken'
import { action, configure, observable } from 'mobx'
import { object, serializable } from 'serializr'
import { UserStore } from './UserStore'

// don't allow state modifications outside actions
configure({ enforceActions: 'observed' })

export class AuthStore {
  @serializable @observable inProgress: boolean = false
  @serializable @observable state: string = 'pending'
  @serializable(object(UserStore)) @observable values?: UserStore

  @action
  async login() {
    this.inProgress = false
    this.state = 'pending'
    const result = await fetch('https://jsonplaceholder.typicode.com/todos/1')
    const data = await result.json()
  }

  @action
  async getToken (code: any) {
    const token = await getAuthToken(client)({ clientId: 'clientId', oauthType: 'github', code })
    debugger;
    console.log(token)
  }
}
