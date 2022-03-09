import type { NextApiRequest, NextApiResponse } from "next";
import { promises as fs } from "fs";
import type { File } from "formidable";
import { IncomingForm } from "formidable";

import { MAX_UPLOAD_SIZE } from "constants/constraints";

export const config = {
  api: {
    bodyParser: false,
  },
};

function parse(req: NextApiRequest): Promise<readonly File[]> {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm({
      multiples: true,
      maxFields: 1,
      maxFileSize: MAX_UPLOAD_SIZE,
    });
    form.parse(req, (error, _fields, files) => {
      if (error) {
        return reject(error);
      }

      const list = Object.values(files).reduce<File[]>((list, fileOrFiles) => {
        if ("filepath" in fileOrFiles) {
          list.push(fileOrFiles);
        } else {
          list.push(...fileOrFiles);
        }

        return list;
      }, []);
      resolve(list);
    });
  });
}

/**
 * This endpoint will upload files to a temp directory with formidable and then
 * immediately remove them just so that an upload progress demo can be used.
 */
export default async function devnull(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method?.toLowerCase() !== "post") {
    res.status(400).end();
    return;
  }

  const files = await parse(req);
  const errors: NodeJS.ErrnoException[] = [];
  await Promise.all(
    files.map((file) =>
      fs.unlink(file.filepath).catch((error) => {
        errors.push(error);
      })
    )
  );

  // TODO: Actually do something with possible errors?
  if (errors.length) {
    res.status(500);
  }

  res.end();
}
