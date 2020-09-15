import { join } from "path";
import { shared } from "../shared";
import { documentationRoot, src, COPY_BANNER } from "../constants";
import { glob, format } from "../utils";
import { getRoutes } from "./getRoutes";
import { generate } from "./generate";
import { writeFile } from "fs-extra";

export async function indexer(): Promise<void> {
  await shared(true);

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
  const tocsContents = format(`${COPY_BANNER}import { TOCRecord } from "./types";

const tocs: TOCRecord = ${JSON.stringify(tocs, null, 2)};

export default tocs`);
  await writeFile(tocsPath, tocsContents);

  const searchPath = join(meta, "search.ts");
  const searchContents = format(`${COPY_BANNER}import { RouteMetadata } from "./types";

const metadata: ReadonlyArray<RouteMetadata> = ${JSON.stringify(
    metadata,
    null,
    2
  )};

export default metadata;
`);
  await writeFile(searchPath, searchContents);
}
