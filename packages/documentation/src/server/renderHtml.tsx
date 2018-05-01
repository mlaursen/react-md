import fs from "fs";
import path from "path";
import React from "react";
import { renderToString } from "react-dom/server";
import { Stats } from "webpack";
import _ from "lodash";

import { default as Document, IDocumentAssets } from "./Document";

interface IManifest {
  [chunkName: string]: string;
}

/**
 * Creates an object containg a list of src paths for all the javascript and css files that
 * should be included on the page by default.
 *
 * @param manifest either a manifest.json file or the manifest that is created in dev mode
 *    by the webpack-dev-middleware
 */
function createAssets(manifest: IManifest = {}): IDocumentAssets {
  return Object.keys(manifest).reduce(({ scripts, styles }, chunkName) => {
    const value = manifest[chunkName];
    if (chunkName.endsWith(".js")) {
      scripts.push(value);
    } else if (chunkName.endsWith(".css")) {
      styles.push(value);
    }

    return { scripts, styles };
  }, { scripts: [], styles: [] });
}

let assets;
const manifestPath = path.join(process.cwd(), "public", "manifest.json");
try {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
  assets = createAssets(manifest);
} catch (e) {
  if (process.env.NODE_ENV === "production") {
    throw new Error(`Unable to find the \`manifest.json\` at \`${manifestPath}`);
  }

  assets = createAssets();
}

export default function renderHtml(req, res) {
  if (_.get(res, "locals.webpackStats")) {
    assets = createAssets(res.locals.webpackStats.toJson().assetsByChunkName);
  }

  res.send(renderToString(<Document assets={assets} />));
}
