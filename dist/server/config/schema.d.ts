import * as yup from 'yup';
declare const pluginConfigSchema: yup.ObjectSchema<{
    contentTypes: {
        uid?: string;
        transliterate?: boolean;
        fuzzysortOptions?: {
            threshold?: number;
            limit?: number;
            keys?: {
                name?: string;
                weight?: number;
            }[];
        };
        modelName?: string;
    }[];
}, yup.AnyObject, {
    contentTypes: "";
}, "">;
export default pluginConfigSchema;
