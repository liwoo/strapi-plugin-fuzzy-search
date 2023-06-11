"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginateGraphQlResults = void 0;
const paginateGraphQlResults = (results, { limit, start } = {}) => {
    const resultsCopy = [...results];
    const data = resultsCopy.slice(start, start + limit);
    // Strapi only accepts start and limit at meta args
    // and calculates values in toEntityResponseCollection() util
    const meta = {
        start,
        limit,
    };
    return { data, meta };
};
exports.paginateGraphQlResults = paginateGraphQlResults;
