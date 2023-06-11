declare const getResolversConfig: () => {
    "Query.search": {
        auth: {
            scope: string;
        };
    };
};
export default getResolversConfig;
