"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePagination = void 0;
const parsePagination = (paginationQuery) => {
    const { page: pageQuery = '1', pageSize: pageSizeQuery = '25', withCount: withCountQuery = 'true', } = paginationQuery;
    const page = pageQuery ? parseInt(pageQuery, 10) : 1;
    const pageSize = pageSizeQuery ? parseInt(pageSizeQuery, 10) : 25;
    const withCount = withCountQuery ? withCountQuery === 'true' : true;
    return { page, pageSize, withCount };
};
exports.parsePagination = parsePagination;
