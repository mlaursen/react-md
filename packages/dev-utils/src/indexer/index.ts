import { join } from "path";
import { documentationRoot, src, BANNER } from "../constants";
import readmes from "../readmes";
import writeFile from "../utils/writeFile";
import generate from "./generate";
import { copySharedToDocs, getRoutes } from "./utils";
import format from "../utils/format";

export default async function indexer(): Promise<void> {
  await readmes();
  await copySharedToDocs();

  const routes = await getRoutes();
  const { tocs, metadata } = await generate(routes);

  const meta = join(documentationRoot, src, "constants", "meta");
  const tocsPath = join(meta, "tocs.ts");
  const tocsContents = format(`${BANNER}import { TOCRecord } from "./types";

const tocs: TOCRecord = ${JSON.stringify(tocs, null, 2)};

export default tocs`);
  await writeFile(tocsPath, tocsContents);

  const searchPath = join(meta, "search.ts");
  const searchContents = format(`${BANNER}import { RouteMetadata } from "./types";

const metadata: ReadonlyArray<RouteMetadata> = ${JSON.stringify(
    metadata,
    null,
    2
  )};

export default metadata;
`);
  await writeFile(searchPath, searchContents);
}
