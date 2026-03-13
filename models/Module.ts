export interface Module {
  id: number
  name: string
  urlKey: string
  iconUrl?: string
  techname: string
  repository: {
    url: string
    name: string
    description: string
  },
  category: string
  version: string
  dependencies: string[]
  usedBy: string[]
  license: string
  summary: string
  description: string
  maturity: string
  authors: string[]
  publicURL: string
  runboatURL: string
  website: string
  readmeFragments: {
    configure?: string
    context?: string
    credits?: string
    history?: string
    install?: string
    roadmap?: string
    usage?: string
  }
  contributors: [
    {
      name: string
      website: string
    },
  ],
  maintainer: string[],
  bugTracker: {
    url: string
    instructions: string
  },
  popularity: number
  lastUpdate: Date | null
}

export interface ModuleGroupedHit {
  urlKey: string
  hits: Module[]
}

export interface ModuleResult {
  hits: ModuleGroupedHit[]
  total: number
}