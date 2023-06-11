import { PaginationBaseQuery } from '../config/querySchema';
import { RESTPaginationMeta, ResultsResponse } from '../interfaces/interfaces';
export declare const paginateResults: (pagination: Record<string, PaginationBaseQuery>, pluralNames: string[], resultsResponse: ResultsResponse) => Promise<{
    [x: string]: Record<string, unknown>[] | import("../interfaces/interfaces").PaginatedModelResponse<RESTPaginationMeta>;
}>;
