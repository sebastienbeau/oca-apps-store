export interface Sponsor {
  id: number
  logo: string
  name: string
  locations: string[]
  description: string
  members: number
  collaborators: number
  industries: number
  collaboratorIndex: number
}
export interface SponsorResult {
  hits: Sponsor[]
  total: number
}
export interface SponsorResultGroupedLevels {
  hits: { [level: string]: Sponsor[] }
  total: number
}
