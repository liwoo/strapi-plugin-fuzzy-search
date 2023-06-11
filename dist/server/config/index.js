"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = __importDefault(require("./schema"));
exports.default = {
    default() {
        return {
            contentTypes: {},
        };
    },
    async validator(config) {
        await schema_1.default.validate(config);
    },
};
