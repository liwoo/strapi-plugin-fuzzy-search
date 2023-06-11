import { PaginationBaseQuery } from '../config/querySchema';
import { Result } from '../interfaces/interfaces';
declare const buildRestResponse: (searchResults: Result[], auth: any, pagination: Record<string, PaginationBaseQuery> | null, queriedContentTypes?: string[]) => Promise<{
    [x: string]: Record<string, unknown>[] | import("../interfaces/interfaces").PaginatedModelResponse<import("../interfaces/interfaces").RESTPaginationMeta>;
}>;
export default buildRestResponse;
