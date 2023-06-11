import { Entity, FilteredEntry } from '../interfaces/interfaces';
declare const _default: ({ model, keys, query, }: {
    model: FilteredEntry;
    keys: string[];
    query: string;
}) => {
    schemaInfo: import("@strapi/strapi").SchemaInfo;
    uid: string;
    fuzzysortResults: Fuzzysort.KeysResults<Entity>;
};
export default _default;
