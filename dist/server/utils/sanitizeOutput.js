"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sanitize_1 = require("@strapi/utils/lib/sanitize");
const sanitizeOutput = (data, contentType, auth) => sanitize_1.contentAPI.output(data, contentType, { auth });
exports.default = sanitizeOutput;
