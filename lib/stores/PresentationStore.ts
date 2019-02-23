import { observable } from 'mobx'
import { list, object, serializable } from 'serializr'
import { UserStore } from './UserStore'

export class Presentation {
  @serializable @observable id: string = ''
  @serializable @observable name: string = ''
  @serializable @observable nameKo?: string
  @serializable @observable nameEn?: string
  @serializable @observable desc?: string
  @serializable @observable descKo?: string
  @serializable @observable descEn?: string
  @serializable @observable price?: number
  @serializable @observable visible?: boolean
  // language: ProgramLanguage
  @serializable @observable createdAt?: Date
  @serializable @observable updatedAt?: Date
  // programPtr: ProgramNode!
  @serializable @observable owner?: UserStore
  @serializable @observable accepted?: boolean
  // @observable place?: PlaceNode
  @serializable @observable startedAt?: Date
  @serializable @observable finishedAt?: Date
  // category: CategoryNode
  @serializable @observable slideUrl?: string
  @serializable @observable pdfUrl?: string
  @serializable @observable videoUrl?: string
  // difficulty: DifficultyNode
  @serializable @observable recordable?: boolean
}

export class PresentationStore {
  @serializable(list(object(Presentation))) @observable presentations?: Array<Presentation> = []
}
