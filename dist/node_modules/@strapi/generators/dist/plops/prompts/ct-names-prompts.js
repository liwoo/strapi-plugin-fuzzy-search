"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pluralize_1 = __importDefault(require("pluralize"));
const slugify_1 = __importDefault(require("@sindresorhus/slugify"));
const utils_1 = __importDefault(require("@strapi/utils"));
const questions = [
    {
        type: 'input',
        name: 'displayName',
        message: 'Content type display name',
        validate: (input) => !!input,
    },
    {
        type: 'input',
        name: 'singularName',
        message: 'Content type singular name',
        default: (answers) => (0, slugify_1.default)(answers.displayName),
        validate(input) {
            if (!utils_1.default.isKebabCase(input)) {
                return 'Value must be in kebab-case';
            }
            return true;
        },
    },
    {
        type: 'input',
        name: 'pluralName',
        message: 'Content type plural name',
        default: (answers) => (0, pluralize_1.default)(answers.singularName),
        validate(input, answers) {
            if (answers.singularName === input) {
                return 'Singular and plural names cannot be the same';
            }
            if (!utils_1.default.isKebabCase(input)) {
                return 'Value must be in kebab-case';
            }
            return true;
        },
    },
];
exports.default = questions;
//# sourceMappingURL=ct-names-prompts.js.map