import { PaginatedModelResponse, PaginationArgs } from '../interfaces/interfaces';
export declare const paginateGraphQlResults: (results: Record<string, unknown>[], { limit, start }?: PaginationArgs) => PaginatedModelResponse;
