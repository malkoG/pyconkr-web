import { observable } from 'mobx'
import { UserStore } from "./UserStore"

export class Presentation {
  @observable id: string = ''
  @observable name: string = ''
  @observable nameKo?: string
  @observable nameEn?: string
  @observable desc?: string
  @observable descKo?: string
  @observable descEn?: string
  @observable price?: number
  @observable visible?: boolean
  // language: ProgramLanguage
  @observable createdAt?: Date
  @observable updatedAt?: Date
  // programPtr: ProgramNode!
  @observable owner?: UserStore
  @observable accepted?: boolean
  // @observable place?: PlaceNode
  @observable startedAt?: Date
  @observable finishedAt?: Date
  // category: CategoryNode
  @observable slideUrl?: string
  @observable pdfUrl?: string
  @observable videoUrl?: string
  // difficulty: DifficultyNode
  @observable recordable?: boolean
}

export class PresentationStore {
  @observable presentations?: Array<Presentation> = []
}