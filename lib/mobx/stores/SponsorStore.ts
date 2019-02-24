import { observable } from 'mobx'
import { list, object, serializable } from 'serializr';

export class Sponsor {
    @serializable @observable id: string = '';
    @serializable @observable name?: string;
    @serializable @observable nameKo?: string;
    @serializable @observable desc?: string;
}

export class SponsorStore {
    @serializable(list(object(Sponsor))) @observable sponsors: Sponsor[] = [
        { id: '1', name: 'one', nameKo: '하나', desc: 'sample1'},
        { id: '2', name: 'two', nameKo: '둘', desc: 'sample2'},
    ]
}
