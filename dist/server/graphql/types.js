"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fuzzySearchService_1 = __importDefault(require("../services/fuzzySearchService"));
const settingsService_1 = __importDefault(require("../services/settingsService"));
const buildGraphqlResponse_1 = __importDefault(require("../utils/buildGraphqlResponse"));
const getTransformedGraphqlPaginationInput_1 = require("../utils/getTransformedGraphqlPaginationInput");
const getCustomTypes = (strapi, nexus) => {
    const { service: getService } = strapi.plugin('graphql');
    const { naming } = getService('utils');
    const { utils } = getService('builders');
    const { contentTypes } = (0, settingsService_1.default)().get();
    const { getEntityResponseCollectionName, getFindQueryName, getFiltersInputTypeName, } = naming;
    const { transformArgs } = utils;
    // Extend the SearchResponse type for each registered model
    const extendSearchType = (nexus, model) => {
        return nexus.extendType({
            type: 'SearchResponse',
            definition(t) {
                t.field(getFindQueryName(model), {
                    type: getEntityResponseCollectionName(model),
                    args: {
                        pagination: nexus.arg({ type: 'PaginationArg' }),
                        filters: nexus.arg({ type: getFiltersInputTypeName(model) }),
                        locale: nexus.arg({ type: 'I18NLocaleCode' }),
                    },
                    async resolve(parent, args, ctx, auth) {
                        const { query } = parent;
                        const { pagination, filters, locale } = args;
                        const { start, limit } = (0, getTransformedGraphqlPaginationInput_1.getTransformedUserPaginationInput)(pagination);
                        const { start: transformedStart, limit: transformedLimit, filters: transformedFilters, } = transformArgs({ pagination: { start, limit }, filters }, {
                            contentType: model,
                            usePagination: true,
                        });
                        const contentType = contentTypes.find((contentType) => contentType.model.modelName === model.modelName);
                        const searchResult = await (0, fuzzySearchService_1.default)(contentType, query, transformedFilters, locale);
                        const resultsResponse = await (0, buildGraphqlResponse_1.default)(searchResult, auth, { start: transformedStart, limit: transformedLimit });
                        if (resultsResponse)
                            return resultsResponse;
                        throw new Error(ctx.koaContext.response.message);
                    },
                });
            },
        });
    };
    const searchResponseType = nexus.extendType({
        type: 'Query',
        definition(t) {
            t.field('search', {
                type: 'SearchResponse',
                args: {
                    query: nexus.nonNull(nexus.stringArg('The query string by which the models are searched')),
                    locale: nexus.stringArg('The locale by which to filter the models'),
                },
                async resolve(_parent, args, ctx) {
                    // Destructure the args to get query value
                    const { query, locale } = args;
                    const { auth } = ctx.state;
                    return { query, locale, auth };
                },
            });
        },
    });
    const returnTypes = [searchResponseType];
    contentTypes.forEach((type) => {
        returnTypes.unshift(extendSearchType(nexus, type.model));
    });
    return returnTypes;
};
exports.default = getCustomTypes;
