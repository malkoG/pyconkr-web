import { client } from 'lib/apollo_graphql/client'
import { getAuthToken } from 'lib/apollo_graphql/mutations/getAuthToken'
import { action, configure, observable } from 'mobx'
import { serializable } from 'serializr'

// don't allow state modifications outside actions
configure({ enforceActions: 'observed' })

export class AuthStore {
  @serializable @observable inProgress: boolean = false
  @serializable @observable state: string = 'pending'
  @serializable @observable oAuthType: string = 'github'
  @serializable @observable clientId: string = ''

  @serializable @observable sampleVar: string = ''

  @action
  async getToken (code: string) {
    if (this.oAuthType === 'github') this.clientId = 'bc6a4bddabaa55004090'

    // Get AuthToken
    const result = await getAuthToken(client)({ clientId: this.clientId, oauthType: 'github', code, redirectUri: 'http://localhost:3000/' })

    // If error on getting a token
    if (result.errors) {
      throw new Error(`Authentication is failed: ${result.errors}`)
    }

    const token = result.data.oAuthTokenAuth.token
    localStorage.setItem('token', token)
  }
}
