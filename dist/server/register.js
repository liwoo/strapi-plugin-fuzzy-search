"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = __importDefault(require("./graphql"));
const settingsService_1 = __importDefault(require("./services/settingsService"));
exports.default = ({ strapi }) => {
    const settingsServ = (0, settingsService_1.default)();
    const settings = settingsServ.get();
    // build settings structure
    const normalizedSettings = settingsServ.build(settings);
    // reset plugin settings
    settingsServ.set(normalizedSettings);
    if (strapi.plugin('graphql')) {
        strapi.log.info('[fuzzy-search] graphql detected, registering queries');
        (0, graphql_1.default)(strapi);
    }
};
