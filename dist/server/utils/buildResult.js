"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fuzzysort_1 = __importDefault(require("fuzzysort"));
exports.default = ({ model, keys, query, }) => {
    const { pluralName } = model.schemaInfo;
    if (model.fuzzysortOptions.characterLimit) {
        model[pluralName].forEach((entry) => {
            const entryKeys = Object.keys(entry);
            entryKeys.forEach((key) => {
                if (!keys.includes(key))
                    return;
                if (!entry[key])
                    return;
                entry[key] = entry[key].slice(0, model.fuzzysortOptions.characterLimit);
            });
        });
    }
    return {
        schemaInfo: model.schemaInfo,
        uid: model.uid,
        fuzzysortResults: fuzzysort_1.default.go(query, model[pluralName], {
            threshold: model.fuzzysortOptions.threshold,
            limit: model.fuzzysortOptions.limit,
            keys,
            scoreFn: (a) => Math.max(...model.fuzzysortOptions.keys.map((key, index) => a[index] ? a[index].score + key.weight : -9999)),
        }),
    };
};
