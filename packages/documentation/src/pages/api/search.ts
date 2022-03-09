import type { NextApiRequest, NextApiResponse } from "next";
import Fuse from "fuse.js";
import { qsToString, qsToInt } from "utils/routes";
import metadata from "constants/meta/search";

const indexer = new Fuse(metadata, {
  keys: [
    {
      name: "title",
      weight: 0.9,
    },
    {
      name: "summary",
      weight: 0.0005,
    },
    {
      name: "type",
      weight: 0.0095,
    },
  ],
});

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const search = qsToString(req.query.q);
  const from = qsToInt(req.query.from, 0);
  const size = qsToInt(req.query.size, 8);
  if (!search) {
    res.status(403).end();
    return;
  }

  const results = indexer
    .search(search, { limit: from + size })
    .map(({ item }) => item);

  res.status(200).json(results);
};
