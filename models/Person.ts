import type { PSC, Workgroup } from '~~/models'

export interface PersonRole {
  id: number
  name: string
}
export interface Person {
  id: number
  name: string
  avatarUrl: string | null
  username: string
  company?: {
    id: number
    name: string
    urlKey: string
  }
  companyId?: number
  country?: {
    label: string
    code: string
  }
  roles?: PersonRole[]
  collaboratorIndex?: number
  translations: number
  modulesMaintained: number
  modulesContributionsIds: number[]
  psc: number
  urlKey: string
  pscList: PSC[]
  workGroupList: Workgroup[]
  contact?:
    | {
        address: string
        email: string
        phone: string
        city: string
        website: string
      }
    | undefined
}

export interface PersonResult {
  hits: Person[]
  total: number
}