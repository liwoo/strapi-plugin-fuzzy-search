"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const paginateGraphQlResults_1 = require("./paginateGraphQlResults");
const sanitizeOutput_1 = __importDefault(require("./sanitizeOutput"));
// Destructure search results and return them in appropriate/sanitized format
const buildGraphqlResponse = async (searchResult, auth, pagination) => {
    const { service: getService } = strapi.plugin('graphql');
    const { returnTypes } = getService('format');
    const { toEntityResponseCollection } = returnTypes;
    const { fuzzysortResults, uid } = searchResult;
    const results = await Promise.all(fuzzysortResults.map(async (fuzzyRes) => {
        const schema = strapi.getModel(uid);
        const sanitizedEntity = await (0, sanitizeOutput_1.default)(fuzzyRes.obj, schema, auth);
        return sanitizedEntity;
    }));
    const { data: nodes, meta } = (0, paginateGraphQlResults_1.paginateGraphQlResults)(results, pagination);
    return toEntityResponseCollection(nodes, {
        args: meta,
        resourceUID: uid,
    });
};
exports.default = buildGraphqlResponse;
