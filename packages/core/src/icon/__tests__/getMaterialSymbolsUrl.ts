import { describe, expect, it } from "vitest";

import { getMaterialSymbolsUrl } from "../getMaterialSymbolsUrl.js";
import { MATERIAL_CONFIG } from "../materialConfig.js";
import { DEFAULT_MATERIAL_SYMBOL_NAMES } from "../symbols.js";

describe("getMaterialSymbolsUrl", () => {
  it("should create a correct google font url", () => {
    expect(
      getMaterialSymbolsUrl({
        names: ["favorite"],
        family: "outlined",
        fill: 0,
        grade: 0,
        opticalSize: 48,
        weight: 400,
      })
    ).toBe(
      "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0&icon_names=favorite"
    );
    expect(
      getMaterialSymbolsUrl({
        names: ["favorite"],
        family: "rounded",
        fill: 0,
        grade: 0,
        opticalSize: 48,
        weight: 400,
      })
    ).toBe(
      "https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,400,0,0&icon_names=favorite"
    );
    expect(
      getMaterialSymbolsUrl({
        names: ["favorite"],
        family: "sharp",
        fill: 0,
        grade: 0,
        opticalSize: 48,
        weight: 400,
      })
    ).toBe(
      "https://fonts.googleapis.com/css2?family=Material+Symbols+Sharp:opsz,wght,FILL,GRAD@48,400,0,0&icon_names=favorite"
    );
  });

  it("should sort the names to work with the google fonts api", () => {
    expect(
      getMaterialSymbolsUrl({
        names: ["favorite", "abc", "books_movies_and_music"],
        family: "sharp",
        fill: 0,
        grade: 0,
        opticalSize: 48,
        weight: 400,
      })
    ).toBe(
      "https://fonts.googleapis.com/css2?family=Material+Symbols+Sharp:opsz,wght,FILL,GRAD@48,400,0,0&icon_names=abc,books_movies_and_music,favorite"
    );
  });

  it("should default to the `MATERIAL_CONFIG` settings and `DEFAULT_MATERIAL_SYMBOL_NAMES`", () => {
    expect(getMaterialSymbolsUrl()).toBe(
      getMaterialSymbolsUrl({
        ...MATERIAL_CONFIG,
        names: DEFAULT_MATERIAL_SYMBOL_NAMES,
      })
    );
  });

  it("should support ranges for the values", () => {
    expect(
      getMaterialSymbolsUrl({
        fill: { min: 0, max: 1 },
        grade: { min: -25, max: 200 },
        opticalSize: { min: 20, max: 48 },
        weight: { min: 100, max: 700 },
        names: ["abc"],
      })
    ).toBe(
      "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-25..200&icon_names=abc"
    );
  });
});
