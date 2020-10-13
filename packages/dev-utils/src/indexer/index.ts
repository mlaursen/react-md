import { writeFile } from "fs-extra";
import { join } from "path";

import { COPY_BANNER, documentationRoot, src } from "../constants";
import { shared } from "../shared";
import { format, glob } from "../utils";
import { generate } from "./generate";
import { getRoutes } from "./getRoutes";

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

const metadata: readonly RouteMetadata[] = ${JSON.stringify(metadata, null, 2)};

export default metadata;
`);
  await writeFile(searchPath, searchContents);
}
