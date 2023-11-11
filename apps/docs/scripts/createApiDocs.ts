import { DEFAULT_COLLATOR, alphaNumericSort } from "@react-md/core";
import GithubSlugger from "github-slugger";
import { glob } from "glob";
import lodash from "lodash";
import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import prettyMilliseconds from "pretty-ms";
import {
  Node,
  Project,
  TypeFormatFlags,
  type PropertySignature,
} from "ts-morph";
import {
  type ApiLookup,
  type ComponentDocumentation,
  type NamedExample,
  type NamedExtendedType,
  type PropDocumentation,
} from "../src/components/ApiDocs/types.js";
import { type NavigationRouteItem } from "../src/constants/navItems.js";
import { format } from "../src/utils/format.js";
import { GENERATED_FILE_BANNER } from "./constants.js";

const constants = join(process.cwd(), "src", "constants");
const API_LOOKUP_PATH = join(constants, "apiLookup.ts");
const API_ROUTES_PATH = join(constants, "apiRoutes.ts");

console.log("Creating the typescript project ... ");
const start = Date.now();
const project = new Project({
  tsConfigFilePath: "../../packages/core/tsconfig.json",
});
console.log(`Created in ${prettyMilliseconds(Date.now() - start)}`);

// const hooks = ["../../packages/core/src/form/useTextField.ts"];
// const components = ["../../packages/core/src/icon/SVGIcon.tsx"];
// const components = ["../../packages/core/src/app-bar/AppBarTitle.tsx"];
const components = await glob("../../packages/core/src/**/*.tsx", {
  ignore: ["**/__{mocks,tests}__/**", "**/use*"],
});

const overrides: string[] = [];
const unparsed: string[] = [];

const apiLookup: ApiLookup = {};
await Promise.all(
  components.map(async (componentPath) => {
    const slugger = new GithubSlugger();
    const properties: PropDocumentation[] = [];
    const source = project.getSourceFileOrThrow(componentPath);

    let isClient = false;
    let description = "";
    const examples: NamedExample[] = [];
    const exportDeclarations = source.getExportedDeclarations();
    const extendedTypes: NamedExtendedType[] = [];
    for (const [name, declarations] of exportDeclarations) {
      const [declaration] = declarations;
      if (declarations.length !== 1) {
        overrides.push(name);
        continue;
      }

      if (!Node.isVariableDeclaration(declaration)) {
        continue;
      }
      const initializer = declaration.getInitializer();
      if (!Node.isCallExpression(initializer)) {
        continue;
      }

      const id = lodash.kebabCase(name);
      const jsDocs = declaration.getVariableStatementOrThrow().getJsDocs();
      if (
        jsDocs.find((jsdoc) =>
          jsdoc.getTags().find((tag) => tag.getTagName() === "internal")
        )
      ) {
        console.log("SKIP");
        return;
      }

      jsDocs.forEach((jsDoc) => {
        const commentText = jsDoc.getCommentText() || "";
        isClient = commentText.startsWith("**Client");
        const comment = commentText
          .replace(/\*\*(Client|Server) Component\*\*/, "")
          .trim();

        jsDoc.getTags().forEach((tag) => {
          if (tag.getTagName() === "example") {
            const comment = tag.getCommentText() || "";
            if (!comment) {
              return;
            }

            const [exampleName, languageLine, ...remaining] =
              comment.split("\n");
            examples.push({
              name: exampleName,
              code: remaining.slice(0, remaining.length - 1).join("\n"),
              lang: languageLine.replace("```", ""),
            });
          }
        });
        description = comment;
      });

      const [component, ...others] = initializer.getArguments();
      if (
        !component ||
        others.length ||
        !Node.isFunctionExpression(component)
      ) {
        throw new Error(
          "No component or multiple args found. Should be a forwardRef"
        );
      }

      try {
        const propInterfaceName = component
          .getParameterOrThrow("props")
          .getType()
          .getSymbolOrThrow()
          .getName();
        const propInterface = source.getInterfaceOrThrow(propInterfaceName);
        const okProps: PropertySignature[] = propInterface.getProperties();
        propInterface.getExtends().forEach((extension) => {
          // TODO: Figure out how to resolve interfaces for the same file/package
          const extensionType = extension.getType();
          const extendedName = extensionType.getSymbolOrThrow().getName();

          // try to resolve extended types when possible unless its from:
          // - another component
          // - all the HTMLAttributes props that are allowed for all components
          if (!/HTMLAttributes|Props$/.test(extendedName)) {
            const extendedProperties = extensionType.getProperties();
            extendedProperties.forEach((symbol) => {
              const value = symbol.getValueDeclarationOrThrow();
              if (Node.isPropertySignature(value)) {
                okProps.push(value);
              }
            });
          } else {
            extendedTypes.push({
              name: extensionType.getText(
                source,
                TypeFormatFlags.UseAliasDefinedOutsideCurrentScope |
                  TypeFormatFlags.UseFullyQualifiedType |
                  TypeFormatFlags.NoTruncation
              ),
              // TODO
              href: "#",
            });
          }
        });
        okProps.forEach((prop) => {
          const [doc] = prop.getJsDocs();
          const comment = doc?.getCommentText() || "";

          const defaultValue = doc
            ?.getTags()
            .find((tag) => tag.getTagName() === "defaultValue")
            ?.getCommentText();

          const name = prop.getName();

          properties.push({
            id: `${id}-props-${slugger.slug(name)}`,
            name,
            type: prop
              .getType()
              .getText(
                source,
                TypeFormatFlags.UseAliasDefinedOutsideCurrentScope |
                  TypeFormatFlags.UseFullyQualifiedType |
                  TypeFormatFlags.NoTruncation
              )
              .replace(" | undefined", ""),
            required: !prop.getSymbolOrThrow().isOptional(),
            description: comment,
            defaultValue: defaultValue
              ? defaultValue.substring(1, defaultValue.length - 1)
              : undefined,
          });
        });
      } catch (e) {
        console.error("Unable to parse ", name);
      }

      if (!properties.length) {
        unparsed.push(name);
        continue;
      }

      const sortedProperties = properties.slice();
      sortedProperties.sort((a, b) => {
        if (a.required && !b.required) {
          return -1;
        }
        if (!a.required && b.required) {
          return 1;
        }

        return DEFAULT_COLLATOR.compare(a.name, b.name);
      });
      const docs: ComponentDocumentation[] = [
        {
          id,
          name,
          props: sortedProperties,
          isClient,
          examples,
          description,
          extendedTypes,
        },
      ];

      apiLookup[name] = docs;

      // const code = `${GENERATED_FILE_BANNER}
      // import {
      // ComponentAPI,
      // type ComponentDocumentation,
      // } from "@/components/ComponentAPI.jsx";
      // import { type ReactElement } from "react";

      // const docs: ComponentDocumentation[] = ${JSON.stringify(docs)};

      // export default function AvatarAPIPage(): ReactElement {
      // return <ComponentAPI docs={docs} />;
      // }

      // `;

      // const contents = await format(code);
      // await writeFile("src/app/components/avatar/api/page.tsx", contents);
    }
  })
);

await writeFile(
  API_LOOKUP_PATH,
  await format(`${GENERATED_FILE_BANNER}
import { type ApiLookup } from "@/components/ApiDocs/types.js";

export const API_LOOKUP: ApiLookup = ${JSON.stringify(apiLookup)};
`)
);

const apiRoutes = Object.entries(apiLookup).map<NavigationRouteItem>(
  ([_name, [doc]]) => ({
    href: `/${doc.id}`,
    children: doc.name,
    isClient: doc.isClient,
  })
);
await writeFile(
  API_ROUTES_PATH,
  await format(`${GENERATED_FILE_BANNER}
import { type NavigationItem } from "./navItems.js";

export const API_ROUTES: NavigationItem = {
  href: "/api",
  children: "Component API",
  items: ${JSON.stringify(
    alphaNumericSort(apiRoutes, {
      extractor: (item) => item.children,
    })
  )}
}
`)
);

const sorted = unparsed.sort();
console.log(`Unparsed:\n${sorted.map((name) => `- ${name}`).join("\n")}`);
