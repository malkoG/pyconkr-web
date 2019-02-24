import { ProfileType } from 'lib/apollo_graphql/queries/getProfile'
import { action } from 'mobx'
import { object, serializable } from 'serializr'
import { AuthStore } from './AuthStore'
import { ProfileStore } from './ProfileStore'

export class MobxStores {

  @serializable(object(AuthStore)) private authStore: AuthStore
  @serializable(object(ProfileStore)) private profileStore: ProfileStore

  constructor () {
    this.profileStore = new ProfileStore()
    this.authStore = new AuthStore()
  }

  @action
  async getTokenAndSetProfile(code: string) {
    await this.authStore.getToken(code)
    const profile = await this.profileStore.getProfile()
    this.profileStore.setProfile(profile.data.me as ProfileType)
  }
}

const isServer = typeof window === undefined
let stores: MobxStores | null = null

export function initializeStore() {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return new MobxStores()
  }
  if (stores === null) {
    stores = new MobxStores()
  }

  return stores
}

