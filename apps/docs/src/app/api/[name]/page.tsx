import { ApiDocs } from "@/components/ApiDocs/ApiDocs.jsx";
import { type TableOfContentsItem } from "@/components/TableOfContents/types.js";
import { API_LOOKUP } from "@/constants/apiLookup.js";
import { pascalCase } from "@/utils/strings.js";
import { notFound } from "next/navigation.js";
import { type ReactElement } from "react";

export interface ApiPageProps {
  params: { name: string };
  searchParams: Record<string, unknown>;
}

export default function ApiPage(props: ApiPageProps): ReactElement {
  const { name } = props.params;
  const pascalName = pascalCase(name).replace("Svg", "SVG");
  const docs = API_LOOKUP[pascalName];
  if (!docs) {
    notFound();
  }

  const toc = docs.reduce<TableOfContentsItem[]>((list, doc) => {
    list.push({
      id: doc.id,
      depth: 1,
      value: doc.name,
    });
    list.push({
      id: `${doc.id}-props`,
      depth: 1,
      value: "Props",
      items: doc.props.map((prop) => ({
        id: prop.id,
        value: prop.name,
        depth: 2,
      })),
    });
    return list;
  }, []);

  return <ApiDocs toc={toc} docs={docs} />;
}
