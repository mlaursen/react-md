import { join } from "path";
import log from "loglevel";
import { documentationRoot, src, BANNER } from "../constants";
import readmes from "../readmes";
import writeFile from "../utils/writeFile";
import generate from "./generate";
import { copySharedToDocs, getRoutes } from "./utils";
import format from "../utils/format";
import copyChangelogs from "../changelogs";
import glob from "../utils/glob";

export default async function indexer(): Promise<void> {
  await readmes();
  await copyChangelogs();
  await copySharedToDocs();
  log.info();

  const guidesFolder = join(documentationRoot, src, "guides");
  const guides = await glob("*.md", { cwd: guidesFolder });
  const changelogsFolder = join(documentationRoot, src, "changelogs");
  const changelogs = await glob("*.md", { cwd: changelogsFolder });
  const blogsFolder = join(documentationRoot, src, "blogs");
  const blogs = await glob("*.md", { cwd: blogsFolder, ignore: ["index.md"] });

  const routes = await getRoutes({
    guides,
    changelogs,
    blogs,
  });
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
