"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransformedUserPaginationInput = void 0;
const getTransformedUserPaginationInput = ({ page, pageSize: inputPageSize, start, limit, } = {}) => {
    const { config } = strapi.plugin('graphql');
    const pageSize = inputPageSize || config('defaultLimit');
    return {
        start: (page - 1) * pageSize || start || undefined,
        limit: pageSize || limit || undefined,
    };
};
exports.getTransformedUserPaginationInput = getTransformedUserPaginationInput;
