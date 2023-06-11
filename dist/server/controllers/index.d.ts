declare const _default: {
    searchController: () => {
        search(ctx: import("../interfaces/interfaces").Context): Promise<void | {
            [x: string]: Record<string, unknown>[] | import("../interfaces/interfaces").PaginatedModelResponse<import("../interfaces/interfaces").RESTPaginationMeta>;
        }>;
    };
};
export default _default;
