import { InferType } from 'yup';
export declare const paginationSchema: import("yup").ObjectSchema<{
    pageSize: string;
    page: string;
    withCount: string;
}, import("yup").AnyObject, {
    pageSize: undefined;
    page: undefined;
    withCount: undefined;
}, "">;
export declare const querySchema: import("yup").ObjectSchema<{
    query: string;
    locale: string;
    filters: {
        contentTypes?: string;
    };
}, import("yup").AnyObject, {
    query: undefined;
    locale: undefined;
    filters: {
        contentTypes: undefined;
    };
}, "">;
export type PaginationBaseQuery = InferType<typeof paginationSchema>;
export type SearchQuery = InferType<typeof querySchema> & {
    pagination: Record<string, PaginationBaseQuery>;
};
