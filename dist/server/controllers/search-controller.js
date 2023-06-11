"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("@strapi/utils/lib/errors");
const fuzzySearchService_1 = __importDefault(require("../services/fuzzySearchService"));
const settingsService_1 = __importDefault(require("../services/settingsService"));
const buildRestResponse_1 = __importDefault(require("../utils/buildRestResponse"));
const validateQueryParams_1 = require("../utils/validateQueryParams");
exports.default = () => ({
    async search(ctx) {
        var _a;
        const { contentTypes } = (0, settingsService_1.default)().get();
        const { query, pagination, filters: filtersQuery = {}, locale } = ctx.query;
        const { auth } = ctx.state;
        const queriedContentTypes = filtersQuery && filtersQuery.contentTypes
            ? (_a = filtersQuery.contentTypes) === null || _a === void 0 ? void 0 : _a.split(',')
            : null;
        try {
            await (0, validateQueryParams_1.validateQueryParams)(ctx.query, contentTypes, pagination, queriedContentTypes);
        }
        catch (err) {
            return ctx.badRequest('Invalid query', err.message);
        }
        const queriedContentTypesSet = new Set(queriedContentTypes);
        const filteredContentTypes = (filtersQuery === null || filtersQuery === void 0 ? void 0 : filtersQuery.contentTypes)
            ? [...contentTypes].filter((contentType) => queriedContentTypesSet.has(contentType.model.info.pluralName))
            : contentTypes;
        const results = await Promise.all(filteredContentTypes.map(async (contentType) => await (0, fuzzySearchService_1.default)(contentType, query, filtersQuery[contentType.model.info.pluralName], locale)));
        const response = await (0, buildRestResponse_1.default)(results, auth, pagination, queriedContentTypes);
        if (response) {
            return response;
        }
        else {
            throw new errors_1.NotFoundError();
        }
    },
});
