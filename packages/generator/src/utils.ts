import * as fs from "fs-extra";
import * as cpx from "cpx";

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

export type AsyncFilterFunction<T> = (item: T, index?: number, list?: T[]) => Promise<boolean>;

export function filterAsync<T>(list: T[], filterFn: AsyncFilterFunction<T>): Promise<T[]> {
  return Promise.all(list.map(filterFn)).then(booleans => list.filter((_, i) => booleans[i]));
}
