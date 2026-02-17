import type { PSC, Workgroup } from "~/models"

export interface PersonRole {
  id: number
  name: string
}
export interface Person {
  id: number
  name: string
  avatarUrl: string | null
  username: string
  company?: string
  companyId?: number
  country?: {
    label: string
    code: string
  }
  roles?: PersonRole[]
  collaboratorIndex?: number
  translations: number
  modulesMaintained: number
  psc: number
  pscList: PSC[]
  workGroupList: Workgroup[]
}
