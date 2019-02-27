import { client } from 'lib/apollo_graphql/client'
import { getAuthToken } from 'lib/apollo_graphql/mutations/getAuthToken'
import { action, configure, observable } from 'mobx'
import { serializable, object } from 'serializr'
import { ProfileStore } from './ProfileStore';
import { ProfileType } from 'lib/apollo_graphql/queries/getProfile';

// don't allow state modifications outside actions
configure({ enforceActions: 'observed' })

enum oAuthTypeEnum {
  github = 'github',
  google = 'google',
  facebook = 'facebook',
}

enum clientIdEnum {
  github = 'bc6a4bddabaa55004090',
  google = '434664051101-ms06l6uja93lrjs3errmb73alb6dek1f.apps.googleusercontent.com',
  facebook = '373255026827477',
}

export class AuthStore {
  @serializable @observable inProgress: boolean = false
  @serializable @observable state: string = 'pending'
  @serializable @observable oAuthType?: oAuthTypeEnum
  @serializable @observable clientId?: clientIdEnum
  @serializable(object(ProfileStore)) @observable profileStore: ProfileStore
  constructor(profileStore: ProfileStore) {
    this.profileStore = profileStore
  }

  @action
  async setToken (code: string, oAuthType: string) {
    this.oAuthType = oAuthTypeEnum.github
    this.clientId = clientIdEnum[this.oAuthType]

    // Get AuthToken
    const result = await getAuthToken(client)({
      clientId: this.clientId,
      oauthType: this.oAuthType,
      code,
      redirectUri: 'http://localhost:3000/',
    })

    // If error on getting a token
    if (result.errors) {
      throw new Error(`Authentication is failed: ${result.errors}`)
    }

    // Set Token
    const token = result.data.oAuthTokenAuth.token
    localStorage.setItem('token', token)

    const profile = await this.profileStore.getProfile()
    await this.profileStore.setProfile(profile.data.me as ProfileType);
    debugger;
  }
}
