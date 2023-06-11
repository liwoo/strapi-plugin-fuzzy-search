"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginateResults = void 0;
const parsePagination_1 = require("./parsePagination");
const paginateResults = async (pagination, pluralNames, resultsResponse) => {
    const currentResult = { ...resultsResponse };
    const paginatedResult = {};
    const buildPaginatedResults = (pluralName) => {
        const { page, pageSize, withCount } = (0, parsePagination_1.parsePagination)(pagination[pluralName]);
        paginatedResult[pluralName] = {
            data: [],
            meta: { pagination: { page: 1, pageSize: 25 } },
        };
        const startIndex = pageSize * (page - 1);
        const endIndex = startIndex + pageSize;
        paginatedResult[pluralName].data = currentResult[pluralName].slice(startIndex, endIndex);
        const meta = {
            pagination: {
                page,
                pageSize,
            },
        };
        if (withCount) {
            const total = resultsResponse[pluralName].length;
            meta.pagination.total = total;
            meta.pagination.pageCount = Math.ceil(total / pageSize);
        }
        paginatedResult[pluralName].meta = meta;
    };
    pluralNames.forEach((pluralName) => {
        if (!pagination[pluralName])
            return;
        buildPaginatedResults(pluralName);
    });
    return { ...resultsResponse, ...paginatedResult };
};
exports.paginateResults = paginateResults;
