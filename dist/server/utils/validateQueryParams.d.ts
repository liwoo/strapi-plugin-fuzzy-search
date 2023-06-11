import { SearchQuery } from '../config/querySchema';
import { ContentType } from '../interfaces/interfaces';
export declare const validateQueryParams: (query: SearchQuery, contentTypes: ContentType[], pagination: Record<string, {
    pageSize?: string;
    page?: string;
    withCount?: string;
}> | null, filteredContentTypes: string[] | null) => Promise<void>;
