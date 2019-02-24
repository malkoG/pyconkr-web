import { client } from 'lib/apollo_graphql/client'
import { getProfile, ProfileType } from 'lib/apollo_graphql/queries/getProfile'
import { action, observable } from 'mobx'
import { object, serializable } from 'serializr'

export class Profile {
    @serializable @observable name: string = '';
    @serializable @observable avatarUrl: string = '';
}

export class ProfileStore {
    @serializable @observable email: string = '';
    @serializable(object(Profile)) @observable profile = {}
    @serializable @observable username: string = '';

    @action
    getProfile() {
        return getProfile(client)({})
    }

    @action
    setProfile(profile: ProfileType) {
        this.email = profile.email
        this.profile = {...profile.profile}
        this.username = profile.username
    }
}
