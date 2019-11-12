import fs from "fs-extra";
import path from "path";
import { execSync } from "child_process";
import Download from "download";
import unzipper from "unzipper";

import { tempDownloadDir } from "./constants";
import { list } from "./utils";

export async function download(version: string) {
  version = getVersion(version);
  await downloadSource(version);
}

function getVersion(version) {
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

async function downloadSource(version: string) {
  console.log(`Removing ${tempDownloadDir}`);
  await fs.remove(tempDownloadDir);
  await fs.ensureDir(tempDownloadDir);

  const fileName = `material-design-icons-${version}.zip`;
  const downloadUrl = `https://github.com/google/material-design-icons/archive/${version}.zip`;
  console.log(`Downloading: ${downloadUrl}`);
  await Download(downloadUrl, tempDownloadDir);
  await extract(fileName);
}

function extract(fileName: string): Promise<void> {
  return new Promise(resolve => {
    console.log(
      `Unzipping to ${path.join(
        tempDownloadDir,
        fileName.replace(/\.zip$/, "")
      )}`
    );
    fs.createReadStream(path.join(tempDownloadDir, fileName))
      .pipe(unzipper.Extract({ path: tempDownloadDir }))
      .on("close", () => {
        console.log("Done.");
        resolve();
      });
  });
}
