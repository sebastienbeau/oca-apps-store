export interface Module {
  id: number
  name: string
  urlKey: string
  technicalName: string
  shortDescription: string
  description: string
  license: string
  author: string
  maintainer: {
    name: string
    website: string
  },
  repository: {
    url: string
    project: string
  },
  supportedVersions: string[]
  contributors: [
    {
      name: string
      website: string
    },
  ],
  bugTracker: {
    url: string
    instructions: string
  },
  documentation: {
    userGuide: string
    contributionGuide: string
  },
  category: string
  popularity: number
  lastUpdate: Date | null
}

export interface ModuleResult {
  hits: Module[]
  total: number
}