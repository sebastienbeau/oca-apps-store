import type { Sponsor } from '~/models'
import { BaseServiceTypeSense } from '~/services'
import type { SearchResponseHit } from 'typesense/lib/Typesense/Documents'

interface SponsorSchema {
    id: number
    url_key: string
}
export class SponsorService extends BaseServiceTypeSense {
    navCategories: Sponsor[] | null = null
    hits(data: SearchResponseHit<SponsorSchema>[]): Sponsor[] {
        return data.map((hit: any) => this.jsonToModel(hit?.document))
    }

    jsonToModel(json: SponsorSchema): Sponsor {
        return SponsorFactory.createSponsor(json)
    }
}

export const SponsorFactory = {
    createSponsor(json: any): Sponsor {
        const Sponsor: Sponsor = {
            id: json.id,
        }
        return Sponsor
    },
}
