declare const _default: {
    bootstrap: ({ strapi }: {
        strapi: import("@strapi/strapi").Strapi;
    }) => void;
    register: ({ strapi }: {
        strapi: import("@strapi/strapi").Strapi;
    }) => void;
    config: {
        default(): {
            contentTypes: {};
        };
        validator(config: import("./interfaces/interfaces").Config): Promise<void>;
    };
    controllers: {
        searchController: () => {
            search(ctx: import("./interfaces/interfaces").Context): Promise<void | {
                [x: string]: Record<string, unknown>[] | import("./interfaces/interfaces").PaginatedModelResponse<import("./interfaces/interfaces").RESTPaginationMeta>;
            }>;
        };
    };
    routes: {
        "content-api": {
            type: string;
            routes: {
                method: string;
                path: string;
                handler: string;
            }[];
        };
    };
    services: {
        settingsService: () => import("./services/settingsService").SettingsService;
        fuzzySearchService: typeof import("./services/fuzzySearchService").default;
    };
};
export default _default;
