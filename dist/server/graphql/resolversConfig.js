"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getResolversConfig = () => {
    return {
        "Query.search": {
            auth: {
                scope: "plugin::fuzzy-search.searchController.search",
            },
        },
    };
};
exports.default = getResolversConfig;
