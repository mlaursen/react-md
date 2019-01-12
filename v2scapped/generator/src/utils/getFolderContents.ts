import fs from "fs-extra";

export function getFolderContents(
  folderPath: string,
  filterFn?: (name: string) => boolean
): Promise<string[]> {
  return new Promise((resolve, reject) => {
    fs.readdir(folderPath, (error, files) => {
      if (error) {
        reject(error);
      } else {
        resolve(filterFn ? files.filter(filterFn) : files);
      }
    });
  });
}
