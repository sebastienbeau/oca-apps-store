import type { Module } from '~/models'
import { BaseServiceTypeSense } from '~/services'
import type { SearchResponseHit } from 'typesense/lib/Typesense/Documents'

interface ModuleSchema {
    id: number
    url_key: string
}
export class ModuleService extends BaseServiceTypeSense {
    navCategories: Module[] | null = null
    hits(data: SearchResponseHit<ModuleSchema>[]): Module[] {
        return data.map((hit: any) => this.jsonToModel(hit?.document))
    }

    jsonToModel(json: ModuleSchema): Module {
        return ModuleFactory.createModule(json)
    }
}

export const ModuleFactory = {
    createModule(json: any): Module {
        const module: Module = {
            id: json.id,
        }
        return module
    },
}
