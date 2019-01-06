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
var lodash_1 = require("lodash");
var paths_1 = require("./paths");
var utils_1 = require("./utils");
function scripts() {
    return __awaiter(this, void 0, void 0, function () {
        var allTsFiles, tsFiles;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, utils_1.glob(paths_1.src + "/**/*.+(ts|tsx)")];
                case 1:
                    allTsFiles = _a.sent();
                    tsFiles = allTsFiles.filter(function (filePath) { return !filePath.includes("__tests__"); });
                    if (!tsFiles.length) {
                        return [2 /*return*/];
                    }
                    console.log("Found typescript files:");
                    console.log(utils_1.list(tsFiles));
                    console.log();
                    return [4 /*yield*/, tsc(false)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, tsc(true)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, definitions()];
                case 4:
                    _a.sent();
                    if (!(tsFiles.length !== 1)) return [3 /*break*/, 6];
                    return [4 /*yield*/, umd()];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.default = scripts;
function tsc(commonjs) {
    return __awaiter(this, void 0, void 0, function () {
        var tempTsConfig, generated;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tempTsConfig = commonjs ? paths_1.tsConfigCommonJS : paths_1.tsConfigESModule;
                    return [4 /*yield*/, fs_extra_1.default.writeJson(tempTsConfig, utils_1.createTsConfig(commonjs ? "commonjs" : "module"))];
                case 1:
                    _a.sent();
                    console.log("Compiling typescript files for " + (commonjs ? "Common jS" : "ES Modules") + "...");
                    utils_1.exec("npx tsc -p " + tempTsConfig);
                    return [4 /*yield*/, fs_extra_1.default.remove(tempTsConfig)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, utils_1.glob((commonjs ? paths_1.lib : paths_1.es) + "/**/*")];
                case 3:
                    generated = _a.sent();
                    console.log("Created:");
                    console.log(utils_1.list(generated));
                    console.log();
                    return [2 /*return*/];
            }
        });
    });
}
function definitions() {
    return __awaiter(this, void 0, void 0, function () {
        var defsToCopy, defs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, utils_1.glob(paths_1.src + "/**/*.d.ts")];
                case 1:
                    defsToCopy = _a.sent();
                    if (!defsToCopy.length) return [3 /*break*/, 3];
                    return [4 /*yield*/, utils_1.copyFiles(defsToCopy, paths_1.types, null)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [4 /*yield*/, utils_1.glob(paths_1.types + "/**/*.d.ts")];
                case 4:
                    defs = _a.sent();
                    console.log("Created the following defintiion files:");
                    console.log(utils_1.list(defs));
                    console.log();
                    return [2 /*return*/];
            }
        });
    });
}
// it seems to break when extending the base config for some reason
var ROLLUP_TSCONFIG = {
    compilerOptions: {
        target: "es5",
        module: "commonjs",
        jsx: "react",
        lib: ["dom", "es2017"],
        noEmit: true,
    },
    include: [paths_1.src],
    exclude: ["**/__tests__/*"],
};
function umd() {
    return __awaiter(this, void 0, void 0, function () {
        var packageName, umdName, config;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, utils_1.getPackageName()];
                case 1:
                    packageName = _a.sent();
                    umdName = "ReactMD" + lodash_1.upperFirst(lodash_1.camelCase(packageName));
                    config = createRollupConfig(packageName, umdName);
                    return [4 /*yield*/, fs_extra_1.default.writeFile(paths_1.rollupConfig, config, "utf8")];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, fs_extra_1.default.writeJson(paths_1.tsConfigRollup, ROLLUP_TSCONFIG, { spaces: 2 })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, rollup(false)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, rollup(true)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, fs_extra_1.default.remove(paths_1.rollupConfig)];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, fs_extra_1.default.remove(paths_1.tsConfigRollup)];
                case 7:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function rollup(production) {
    return __awaiter(this, void 0, void 0, function () {
        var env;
        return __generator(this, function (_a) {
            env = production ? "production" : "development";
            console.log("Creating the " + env + " UMD bundle...");
            utils_1.exec("npx rollup -c", {
                env: {
                    NODE_ENV: env,
                },
            });
            console.log();
            return [2 /*return*/];
        });
    });
}
function createRollupConfig(packageName, umdName) {
    return "const typescript = require('rollup-plugin-typescript');\nconst resolve = require('rollup-plugin-node-resolve');\nconst commonjs = require('rollup-plugin-commonjs');\nconst replace = require('rollup-plugin-replace');\nconst { uglify } = require('rollup-plugin-uglify');\n\nconst isProduction = process.env.NODE_ENV === 'production';\n\nmodule.exports = {\n  input: '" + paths_1.src + "/index.ts',\n  output: {\n    file: `" + paths_1.dist + "/" + packageName + "${isProduction ? '.min' : ''}.js`,\n    name: '" + umdName + "',\n    format: 'umd',\n    globals: {\n      'react': 'React',\n      'react-dom': 'ReactDOM',\n    },\n    sourcemap: !isProduction,\n  },\n  external: ['react', 'react-dom'],\n  plugins: [\n    typescript({\n      tsconfig: '" + paths_1.tsConfigRollup + "',\n    }),\n    resolve(),\n    commonjs(),\n    replace({\n      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),\n    }),\n    isProduction && uglify(),\n  ].filter(Boolean)\n};\n";
}
