"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const search_routes_1 = __importDefault(require("./search-routes"));
exports.default = {
    "content-api": {
        type: "content-api",
        routes: search_routes_1.default,
    },
};
