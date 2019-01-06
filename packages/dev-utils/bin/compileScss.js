"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var node_sass_1 = __importDefault(require("node-sass"));
var paths_1 = require("./paths");
function compileScss(options) {
    var rootNodeModules = path_1.default.join(process.cwd(), "..", "..", paths_1.nodeModules);
    return node_sass_1.default.renderSync(__assign({}, options, { includePaths: [paths_1.src, rootNodeModules] }));
}
exports.default = compileScss;
