import { Result, TransformedPagination } from '../interfaces/interfaces';
declare const buildGraphqlResponse: (searchResult: Result, auth: Record<string, unknown>, pagination?: TransformedPagination) => Promise<any>;
export default buildGraphqlResponse;
