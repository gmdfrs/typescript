import { SortingDirections } from "../types";

export type ProductSortingKeys = "id"|"name"|"createDate"|"modifiedDate"|"description";

export type ProductFilteringKeys = "id"|"name"|"createDate"|"modifiedDate"|"description";

export type SearchProductParams = {
    sort?: Array<[ProductSortingKeys, SortingDirections]>,
    filter?: Array<[ProductFilteringKeys, string[]]>,
    search?: String
}