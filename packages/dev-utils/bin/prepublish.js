"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var paths_1 = require("./paths");
var utils_1 = require("./utils");
var runAll = path_1.default.join("..", "..", paths_1.nodeModules, "npm-run-all", "bin", "npm-run-all", "index.js");
function prepublish() {
    try {
        utils_1.exec(runAll + " clean \"test -- --coverage\" build");
    }
    catch (e) {
        console.log(e.message);
    }
}
exports.default = prepublish;
