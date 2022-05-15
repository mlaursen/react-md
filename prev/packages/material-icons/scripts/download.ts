/* eslint-disable no-console */
import AdmZip from "adm-zip";
import { execSync } from "child_process";
import Download from "download";
import { ensureDir, remove } from "fs-extra";
import { join } from "path";

import { tempDownloadDir } from "./constants";
import { list } from "./utils";

function getVersion(version: string): string {
  const versions = JSON.parse(
    execSync("npm view material-design-icons versions --json").toString()
  );
  if (!version) {
    return versions[versions.length - 1];
  }

  if (!versions.includes(version)) {
    console.error(`Invalid material-design-icons version provided: ${version}`);
    console.error("Choose one of:");
    list(versions);
    process.exit(1);
  }

  return version;
}

async function downloadSource(version: string): Promise<void> {
  console.log(`Removing ${tempDownloadDir}`);
  await remove(tempDownloadDir);
  await ensureDir(tempDownloadDir);

  const downloadUrl = `https://github.com/google/material-design-icons/archive/${version}.zip`;
  console.log(`Downloading: ${downloadUrl}`);
  await Download(downloadUrl, tempDownloadDir);
}

export async function download(version: string): Promise<void> {
  version = getVersion(version);
  const fileName = `material-design-icons-${version}.zip`;
  await downloadSource(version);
  const zipPath = join(tempDownloadDir, fileName);
  const unzippedPath = zipPath.replace(/\.zip$/, "");
  console.log(`Unzipping to ${unzippedPath}`);

  const zip = new AdmZip(zipPath);
  zip.extractAllTo(unzippedPath);
  console.log("Done!");
}
