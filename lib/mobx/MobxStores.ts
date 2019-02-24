import { ProfileType } from 'lib/apollo_graphql/queries/getProfile'
import { AuthStore } from 'lib/mobx/stores/AuthStore'
import { ProfileStore } from 'lib/mobx/stores/ProfileStore'
import { action } from 'mobx'
import { object, serializable } from 'serializr'
import { SponsorStore } from './stores/SponsorStore'

export class MobxStores {

  @serializable(object(AuthStore)) authStore: AuthStore
  @serializable(object(ProfileStore)) profileStore: ProfileStore
  @serializable(object(SponsorStore)) sponsorStore: SponsorStore

  constructor () {
    this.profileStore = new ProfileStore()
    this.authStore = new AuthStore()
    this.sponsorStore = new SponsorStore()
  }

  @action
  async setTokenAndProfile(code: string) {
    await this.authStore.setToken(code, 'github')
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
