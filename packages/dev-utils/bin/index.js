#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = __importDefault(require("commander"));
var build_1 = __importDefault(require("./build"));
var clean_1 = __importDefault(require("./clean"));
var test_1 = __importDefault(require("./test"));
var prepublish_1 = __importDefault(require("./prepublish"));
var argv = process.argv.slice(2);
if (argv[0] === "test") {
    test_1.default(argv.slice(1));
}
commander_1.default.command("clean").action(function () {
    clean_1.default();
});
commander_1.default
    .command("build [options...]")
    .option("--styles-only", "Only copies the scss files into the dist directory and compiles any styles.scss files to css")
    .option("--scripts-only", "Only compiles the typescript files to ESModules, CommonJS, and UMD.")
    .action(function (_, program) {
    build_1.default(program);
});
commander_1.default.command("prepublish").action(function () {
    prepublish_1.default();
});
commander_1.default.parse(process.argv);
