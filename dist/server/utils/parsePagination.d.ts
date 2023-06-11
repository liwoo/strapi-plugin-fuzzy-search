import { PaginationBaseQuery } from '../config/querySchema';
export declare const parsePagination: (paginationQuery: PaginationBaseQuery) => {
    page: number;
    pageSize: number;
    withCount: boolean;
};
