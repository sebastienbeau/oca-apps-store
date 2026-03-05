export interface CompanyCountry {
  label: string
  code: string
}

export interface Company {
  id: string
  name: string
  email: string
  countries: CompanyCountry[]
  phone: string
  urlKey: string,
  redirectUrlKey: string[],
  website: {
    url: string
    label: string
  }
  isIntegrator: boolean
  collaboratorIndex: number
  contributorsCount: string
  membersCount: string
  modulesCount: string
  logoUrls: {
    alt: string
    l: string
    m: string
    s: string
  }
}

export interface CompanyResult {
  hits: Company[]
  total: number
}

export interface Sponsor extends Company {
  sponsorship: {
    description: string,
    shortDescription: string,
    descriptionWhyOca: string,
    industries: SponsorIndustry[],
    level: SponsorLevel,
    stories: SponsorStory[]
  }
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

