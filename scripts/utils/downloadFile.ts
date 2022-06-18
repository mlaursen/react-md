import https from "https";
import { createWriteStream, unlink } from "node:fs";

export function downloadFile(url: string, fileName: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const stream = createWriteStream(fileName)
      .on("error", (error) => {
        stream.close();
        reject(error);
      })
      .on("finish", () => {
        stream.close();
        console.log("Download complete!");
        resolve();
      });

    https
      .get(url, (response) => {
        response.pipe(stream);
      })
      .on("error", (error) => {
        unlink(fileName, () => reject(error));
      });
  });
}
