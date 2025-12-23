import type { Person } from '~/models'
import { BaseServiceTypeSense } from '~/services'
import type { SearchResponseHit } from 'typesense/lib/Typesense/Documents'

interface PersonSchema {
    id: number
    url_key: string
}
export class PersonService extends BaseServiceTypeSense {
    navCategories: Person[] | null = null
    hits(data: SearchResponseHit<PersonSchema>[]): Person[] {
        return data.map((hit: any) => this.jsonToModel(hit?.document))
    }

    jsonToModel(json: PersonSchema): Person {
        return PersonFactory.createPerson(json)
    }
}

export const PersonFactory = {
    createPerson(json: any): Person {
        const Person: Person = {
            id: json.id,
        }
        return Person
    },
}
