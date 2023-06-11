import { PaginationArgs } from '../interfaces/interfaces';
export declare const getTransformedUserPaginationInput: ({ page, pageSize: inputPageSize, start, limit, }?: PaginationArgs) => {
    start: number;
    limit: any;
};
