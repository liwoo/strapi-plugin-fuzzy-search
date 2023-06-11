"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fuzzysort_1 = __importDefault(require("fuzzysort"));
const transliteration_1 = require("transliteration");
exports.default = ({ model, keys, query, result, }) => {
    const { pluralName } = model.schemaInfo;
    /**
     * Transliterate relevant fields for the entry
     */
    model[pluralName].forEach((entry) => {
        const entryKeys = Object.keys(entry);
        entry.transliterations = {};
        entryKeys.forEach((key) => {
            if (!keys.includes(key) || !entry[key])
                return;
            entry.transliterations[key] = (0, transliteration_1.transliterate)(entry[key]);
        });
    });
    const transliterationKeys = keys.map((key) => `transliterations.${key}`);
    const { uid, schemaInfo, fuzzysortOptions } = model;
    const transliteratedResult = {
        uid,
        schemaInfo,
        fuzzysortResults: fuzzysort_1.default.go(query, model[pluralName], {
            threshold: fuzzysortOptions.threshold,
            limit: fuzzysortOptions.limit,
            keys: transliterationKeys,
            scoreFn: (a) => Math.max(...fuzzysortOptions.keys.map((key, index) => a[index] ? a[index].score + key.weight : -9999)),
        }),
    };
    const previousResults = result.fuzzysortResults;
    if (!previousResults.total)
        return transliteratedResult;
    const newResults = [...previousResults];
    // In the chance that a transliterated result scores higher than its non-transliterated counterpart,
    // overwrite the original result with the transliterated result and resort the results
    transliteratedResult.fuzzysortResults.forEach((res) => {
        const origIndex = previousResults.findIndex((origRes) => origRes.obj.id === res.obj.id && origRes.score <= res.score);
        if (origIndex >= 0)
            newResults[origIndex] = res;
    });
    newResults.sort((a, b) => b.score - a.score);
    return result;
};
