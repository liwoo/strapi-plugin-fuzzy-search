import { Context } from '../interfaces/interfaces';
declare const _default: () => {
    search(ctx: Context): Promise<void | {
        [x: string]: Record<string, unknown>[] | import("../interfaces/interfaces").PaginatedModelResponse<import("../interfaces/interfaces").RESTPaginationMeta>;
    }>;
};
export default _default;
