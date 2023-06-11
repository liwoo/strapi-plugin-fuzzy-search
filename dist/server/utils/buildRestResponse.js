"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const paginateResults_1 = require("./paginateResults");
const sanitizeOutput_1 = __importDefault(require("./sanitizeOutput"));
const buildRestResponse = async (searchResults, auth, pagination, queriedContentTypes) => {
    const resultsResponse = {};
    for (const res of searchResults) {
        const sanitizeEntry = async (fuzzyRes) => {
            const schema = strapi.getModel(res.uid);
            return await (0, sanitizeOutput_1.default)(fuzzyRes.obj, schema, auth);
        };
        const buildSanitizedEntries = async () => res.fuzzysortResults.map(async (fuzzyRes) => await sanitizeEntry(fuzzyRes));
        // Since sanitizeOutput returns a promise --> Resolve all promises in async for loop so that results can be awaited correctly
        resultsResponse[res.schemaInfo.pluralName] = await Promise.all(await buildSanitizedEntries());
    }
    if (!pagination)
        return resultsResponse;
    const modelNames = queriedContentTypes || Object.keys(pagination);
    return await (0, paginateResults_1.paginateResults)(pagination, modelNames, resultsResponse);
};
exports.default = buildRestResponse;
