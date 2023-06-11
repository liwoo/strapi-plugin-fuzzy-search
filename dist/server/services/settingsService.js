"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pluginId_1 = __importDefault(require("../utils/pluginId"));
const settingsService = () => ({
    get() {
        return strapi.config.get(`plugin.${pluginId_1.default}`);
    },
    set(settings) {
        return strapi.config.set(`plugin.${pluginId_1.default}`, settings);
    },
    build(settings) {
        settings.contentTypes.forEach((contentType) => {
            contentType.model = strapi.contentTypes[contentType.uid];
        });
        return settings;
    },
});
exports.default = settingsService;
