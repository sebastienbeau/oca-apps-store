
export interface Sponsor {
  id: number
  sponsorLevel: SponsorLevel
  sponsorLevelInfo: SponsorLevelInfo
  sponsorRank: number
  logo: string
  name: string
  locations: string[]
  shortDescription: string
  description: string
  members: number
  membersCount: string
  collaborators: any[]
  contributorsCount: string
  modulesCount: string
  industries: SponsorIndustry[]
  countries?: SponsorCountry[]
  collaboratorIndex: number
  isIntegrator: boolean
  website: string
  websiteLabel: string
  phone: string
  email: string
  stories: SponsorStory[]
  descriptionWhyOca: string
}

export interface SponsorCountry {
  label: string
  code: string
}
export interface SponsorStory {
  title: string
  teaser: string
  coverUrl: string
  relativeUrl: string
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
export interface SponsorLevelInfo {
  id: number
  name: string
  level: string
  title: string
  color: string
  image: string | null
}
export interface SponsorLogo {
  id: number
  name: string
}
