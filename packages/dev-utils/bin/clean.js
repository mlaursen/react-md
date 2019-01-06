"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_extra_1 = __importDefault(require("fs-extra"));
var utils_1 = require("./utils");
var paths_1 = require("./paths");
function clean() {
    return utils_1.time(cleanDists, "clean");
}
exports.default = clean;
function cleanDists() {
    return Promise.all([paths_1.es, paths_1.lib, paths_1.dist, paths_1.types].map(function (folder) { return fs_extra_1.default.remove(folder); }));
}
