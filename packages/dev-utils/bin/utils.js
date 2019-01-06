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
var child_process_1 = require("child_process");
var glob_1 = __importDefault(require("glob"));
var performance_now_1 = __importDefault(require("performance-now"));
var pretty_ms_1 = __importDefault(require("pretty-ms"));
var gzip_size_1 = __importDefault(require("gzip-size"));
var filesize_1 = __importDefault(require("filesize"));
var paths_1 = require("./paths");
exports.glob = util_1.promisify(glob_1.default);
function copyFiles(files, dest, message, prefix) {
    if (prefix === void 0) { prefix = "src" + path_1.default.sep; }
    return __awaiter(this, void 0, void 0, function () {
        var log;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    log = function (msg) {
                        if (msg === void 0) { msg = ""; }
                        return message === null ? undefined : console.log(msg);
                    };
                    log(message || "Copying the following files:");
                    return [4 /*yield*/, Promise.all(files.map(function (src) {
                            var currDest = path_1.default.join(dest, src.substring(prefix.length));
                            log("- " + src + " -> " + currDest);
                            return fs_extra_1.default.copy(src, currDest);
                        }))];
                case 1:
                    _a.sent();
                    log();
                    return [2 /*return*/];
            }
        });
    });
}
exports.copyFiles = copyFiles;
function getPackageJson() {
    return fs_extra_1.default.readJson(path_1.default.join(process.cwd(), paths_1.packageJson));
}
exports.getPackageJson = getPackageJson;
function getPackageName(prefixed) {
    if (prefixed === void 0) { prefixed = false; }
    return __awaiter(this, void 0, void 0, function () {
        var packageJson, name;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getPackageJson()];
                case 1:
                    packageJson = _a.sent();
                    name = packageJson.name;
                    return [2 /*return*/, prefixed ? name : name.replace(/.+\//, "")];
            }
        });
    });
}
exports.getPackageName = getPackageName;
function createTsConfig(tsConfigType) {
    var isCommonJS = tsConfigType === "commonjs";
    var isESModule = tsConfigType === "module";
    var isTest = tsConfigType === "test";
    var outDir;
    if (isESModule) {
        outDir = "./es";
    }
    else if (isCommonJS) {
        outDir = "./lib";
    }
    return {
        extends: "../../tsconfig." + (isESModule ? "base" : tsConfigType) + ".json",
        compilerOptions: {
            outDir: outDir,
            rootDir: paths_1.src,
            declaration: isESModule,
            declarationDir: isESModule ? paths_1.types : undefined,
            target: isESModule ? undefined : "es5",
        },
        include: [paths_1.src],
        exclude: isTest ? undefined : ["**/__tests__/*"],
    };
}
exports.createTsConfig = createTsConfig;
function time(fn, command) {
    return __awaiter(this, void 0, void 0, function () {
        var startTime;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Running \"" + command + "\"...");
                    startTime = performance_now_1.default();
                    return [4 /*yield*/, fn()];
                case 1:
                    _a.sent();
                    console.log("Completed \"" + command + "\" in " + pretty_ms_1.default(performance_now_1.default() - startTime));
                    return [2 /*return*/];
            }
        });
    });
}
exports.time = time;
function exec(command, options) {
    if (options === void 0) { options = {}; }
    child_process_1.execSync(command, __assign({ cwd: process.cwd(), stdio: "inherit" }, options, { env: __assign({}, process.env, options.env) }));
}
exports.exec = exec;
function list(things) {
    return things
        .filter(Boolean)
        .map(function (thing) { return "- " + thing; })
        .join("\n");
}
exports.list = list;
function getFileSize(filePath) {
    return filePath + " " + filesize_1.default(gzip_size_1.default.sync(filePath));
}
exports.getFileSize = getFileSize;
function printSizes(filePaths, message) {
    if (typeof filePaths === "string") {
        filePaths = [filePaths];
    }
    console.log(message || "The gzipped file size" + (filePaths.length > 1 ? "s are" : " is") + ":");
    console.log(list(filePaths.map(getFileSize)));
}
exports.printSizes = printSizes;
function printMinifiedSizes(exclude) {
    return __awaiter(this, void 0, void 0, function () {
        var minified;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.glob(paths_1.dist + "/**/*.min*")];
                case 1:
                    minified = _a.sent();
                    if (exclude) {
                        minified = minified.filter(function (name) { return !exclude.test(name); });
                    }
                    printSizes(minified);
                    return [2 /*return*/];
            }
        });
    });
}
exports.printMinifiedSizes = printMinifiedSizes;
