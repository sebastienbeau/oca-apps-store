
export interface Sponsor {
  id: number
  sponsorLevel: SponsorLevel
  sponsorRank: number
  logo: string
  name: string
  locations: string[]
  shortDescription: string
  description: string
  members: number
  collaborators: any[]
  industries: SponsorIndustry[]
  countries?: SponsorCountry[]
  collaboratorIndex: number
  isIntegrator: boolean
  website: string
  websiteLabel: string
  phone: string
  email: string
}

export interface SponsorCountry {
  label: string
  code: string
}

export interface SponsorIndustry {
  name: string
  description: string
}

export interface SponsorResult {
  hits: Sponsor[]
  total: number
}

export interface SponsorResultGroupedLevels {
  hits: { [level: number]: Sponsor[] }
  total: number
}

export interface SponsorLevel {
  id: number
  name: string
}