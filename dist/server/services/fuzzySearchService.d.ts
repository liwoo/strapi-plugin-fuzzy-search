import { ContentType } from '../interfaces/interfaces';
export default function getResult(contentType: ContentType, query: string, filters: Record<string, unknown>, locale?: string): Promise<{
    schemaInfo: import("@strapi/strapi").SchemaInfo;
    uid: string;
    fuzzysortResults: Fuzzysort.KeysResults<import("../interfaces/interfaces").Entity>;
}>;
