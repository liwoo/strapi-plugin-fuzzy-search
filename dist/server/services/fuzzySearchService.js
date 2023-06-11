"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const buildResult_1 = __importDefault(require("../utils/buildResult"));
const buildTransliteratedResult_1 = __importDefault(require("../utils/buildTransliteratedResult"));
const validateQuery_1 = __importDefault(require("../utils/validateQuery"));
async function getResult(contentType, query, filters, locale) {
    const buildFilteredEntry = async () => {
        await (0, validateQuery_1.default)(contentType, locale);
        const items = await strapi.entityService.findMany(contentType.model.uid, {
            filters: {
                ...(filters && { ...filters }),
                ...(locale && { locale }),
            },
        });
        return {
            uid: contentType.uid,
            modelName: contentType.modelName,
            schemaInfo: contentType.model.info,
            transliterate: contentType.transliterate,
            fuzzysortOptions: contentType.fuzzysortOptions,
            [contentType.model.info.pluralName]: items,
        };
    };
    const filteredEntry = await buildFilteredEntry();
    const keys = filteredEntry.fuzzysortOptions.keys.map((key) => key.name);
    let result = (0, buildResult_1.default)({ model: filteredEntry, keys, query });
    if (filteredEntry.transliterate) {
        result = (0, buildTransliteratedResult_1.default)({
            model: filteredEntry,
            keys,
            query,
            result,
        });
    }
    return result;
}
exports.default = getResult;
