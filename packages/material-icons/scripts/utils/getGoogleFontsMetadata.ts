import { existsSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";

export interface IconMetadata {
  name: string;
  version: number;
  codepoint: number;
  unsupported_families: string[];
  categories: string[];
  tags: string[];
  sizes_px: number[];
}

export interface FontMetadata {
  host: string;
  asset_url_pattern: string;
  families: string[];
  icons: IconMetadata[];
}

const METADATA_FILENAME = "material-metadata.json";

export async function getGoogleFontsMetadata(): Promise<FontMetadata> {
  if (existsSync(METADATA_FILENAME)) {
    const contents = await readFile(METADATA_FILENAME, "utf8");
    return JSON.parse(contents);
  }

  const response = await fetch(
    "http://fonts.google.com/metadata/icons?incomplete=1&key=material_symbols"
  );
  const text = await response.text();
  const jsonString = text.substring(5);
  const json = JSON.parse(jsonString);
  await writeFile(METADATA_FILENAME, JSON.stringify(json, null, 2));

  return json;
}
