import { observable } from 'mobx';
import { serializable } from 'serializr';

export class UserStore {
    @serializable @observable id: string = '';
    @serializable @observable name: string = '';
    @serializable @observable email: string = '';
    @serializable @observable password: string = '';
}
