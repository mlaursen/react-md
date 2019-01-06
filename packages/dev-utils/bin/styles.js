"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_extra_1 = __importDefault(require("fs-extra"));
var path_1 = __importDefault(require("path"));
var util_1 = require("util");
var glob_1 = __importDefault(require("glob"));
var postcss_1 = __importDefault(require("postcss"));
var postcss_preset_env_1 = __importDefault(require("postcss-preset-env"));
var postcss_flexbugs_fixes_1 = __importDefault(require("postcss-flexbugs-fixes"));
var uglifycss_1 = __importDefault(require("uglifycss"));
var compileScss_1 = __importDefault(require("./compileScss"));
var paths_1 = require("./paths");
var utils_1 = require("./utils");
var sassdoc_1 = require("./sassdoc");
var glob = util_1.promisify(glob_1.default);
function styles() {
    return __awaiter(this, void 0, void 0, function () {
        var scssFiles, found;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, glob("src/**/*.scss")];
                case 1:
                    scssFiles = _a.sent();
                    if (!scssFiles.length) {
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, utils_1.copyFiles(scssFiles, paths_1.dist)];
                case 2:
                    _a.sent();
                    found = scssFiles.find(function (name) { return /styles\.scss$/.test(name); });
                    if (!found) {
                        return [2 /*return*/];
                    }
                    console.log("Compiling src/styles.scss with the following postcss plugins:");
                    console.log(utils_1.list(["postcss-preset-env", "postcss-flexbugs-fixes"]));
                    console.log();
                    return [4 /*yield*/, compile(false)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, compile(true)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, createScssVariables()];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.default = styles;
function compile(production) {
    return __awaiter(this, void 0, void 0, function () {
        var packageName, srcFile, fileName, outFile, sourceMapFile, compiledScss, postcssResult, css, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, utils_1.getPackageName()];
                case 1:
                    packageName = _a.sent();
                    srcFile = path_1.default.join("src", "styles.scss");
                    fileName = "" + packageName + (production ? ".min" : "") + ".css";
                    outFile = path_1.default.join("dist", fileName);
                    sourceMapFile = outFile + ".map";
                    if (!production) {
                        console.log("Compiling a development css bundle along with a sourcemap to:");
                        console.log(utils_1.list([outFile, !production && sourceMapFile]));
                        console.log();
                    }
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 7, , 8]);
                    compiledScss = compileScss_1.default({
                        file: srcFile,
                        outFile: outFile,
                        sourceMap: !production,
                        outputStyle: "expanded",
                    });
                    return [4 /*yield*/, postcss_1.default([
                            postcss_preset_env_1.default({ stage: 3, autoprefixer: { flexbox: "no-2009" } }),
                            postcss_flexbugs_fixes_1.default(),
                        ]).process(compiledScss.css, {
                            from: srcFile,
                            to: outFile,
                            map: !production && { inline: false },
                        })];
                case 3:
                    postcssResult = _a.sent();
                    if (!postcssResult.map) return [3 /*break*/, 5];
                    return [4 /*yield*/, fs_extra_1.default.writeFile(sourceMapFile, postcssResult.map.toString())];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    css = postcssResult.css;
                    if (production) {
                        css = uglifycss_1.default.processString(css);
                    }
                    checkForInvalidCSS(css);
                    return [4 /*yield*/, fs_extra_1.default.writeFile(outFile, css)];
                case 6:
                    _a.sent();
                    return [3 /*break*/, 8];
                case 7:
                    e_1 = _a.sent();
                    console.log("e.message:", e_1.message);
                    throw e_1;
                case 8: return [2 /*return*/];
            }
        });
    });
}
function checkForInvalidCSS(css) {
    var matches = css.match(/rmd(-[a-z]+)+\(/);
    if (!matches) {
        return;
    }
    console.error("There is invalid compiled css in this bundle. Please check the scss files");
    console.error("to try to fix these issues.");
    console.error(utils_1.list(matches));
    console.error();
    var error = new Error();
    console.error(error.stack);
    throw error;
}
function createScssVariables() {
    return __awaiter(this, void 0, void 0, function () {
        var fileName, packageName, unformattedVariables, variables, contents;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fileName = path_1.default.join(paths_1.dist, "scssVariables.js");
                    console.log("Creating a typescript file to be compiled that contains a list of");
                    console.log("all the scss variables in this project along with their default values.");
                    console.log();
                    return [4 /*yield*/, utils_1.getPackageName()];
                case 1:
                    packageName = _a.sent();
                    return [4 /*yield*/, sassdoc_1.getPackageVariables()];
                case 2:
                    unformattedVariables = _a.sent();
                    variables = unformattedVariables.map(function (variable) {
                        return sassdoc_1.hackVariableValue(variable, packageName);
                    });
                    contents = "module.exports = " + JSON.stringify(variables) + ";";
                    return [4 /*yield*/, fs_extra_1.default.writeFile(fileName, contents)];
                case 3:
                    _a.sent();
                    console.log("Created " + fileName + " with " + variables.length + " variables defined.");
                    console.log();
                    return [2 /*return*/];
            }
        });
    });
}
