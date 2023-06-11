"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateQueryParams = void 0;
const querySchema_1 = require("../config/querySchema");
const validateQueryParams = async (query, contentTypes, pagination, filteredContentTypes) => {
    const configModels = new Set(contentTypes.map((contentType) => contentType.model.info.pluralName));
    const validateFilter = (filterModel) => {
        if (!configModels.has(filterModel))
            throw new Error(`Filter query for model '${filterModel}' was found, however this model is not configured in the fuzzy-search config`);
    };
    const validatePaginationQueryParams = async () => {
        const paginatedEntries = Object.entries(pagination);
        for (let [pluralName, paginationValues] of paginatedEntries) {
            if (!configModels.has(pluralName)) {
                throw new Error(`Pagination queries for model '${pluralName}' were found, however this model is not configured in the fuzzy-search config`);
            }
            await querySchema_1.paginationSchema.validate(paginationValues);
        }
    };
    await querySchema_1.querySchema.validate(query);
    if (pagination)
        await validatePaginationQueryParams();
    if (filteredContentTypes)
        filteredContentTypes.forEach((model) => validateFilter(model));
};
exports.validateQueryParams = validateQueryParams;
