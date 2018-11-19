import path from "path";
import fs from "fs-extra";
import { Application, Reflection, ReflectionKind, DeclarationReflection } from "typedoc";

import getDocumentablePackages from "./getDocumentablePackages";
import { PACKAGES_FOLDER } from "../constants";
import { ITypeDocConfig } from "../types.d";
import {
  DocumentedComponent,
  DocumentedProp,
  DocumentedProps,
  InheritedProps,
} from "../../types.d";
import { parseAndFormatComment, getSource, getTypeValue } from "./format";
import { ReferenceType, Type, ReflectionType, ProjectReflection } from "typedoc/dist/lib/models";

const OPTIONS = {
  name: "react-md",
  mode: "modules",
  readme: false,
  excludeExternals: true,
  excludePrivate: true,
  includeDeclarations: true,
  tsConfig: path.join(PACKAGES_FOLDER, "..", "tsconfig.json"),
};

const TYPES_DIR = path.join(PACKAGES_FOLDER, "..", "node_modules", "@types", "react");

function getPropDefaultValue(
  prop: DeclarationReflection,
  defaultProps: DeclarationReflection | null
): string {
  if (!defaultProps) {
    return "";
  }

  if (!defaultProps.children) {
    return "";
  }

  const value = defaultProps.children.find(defaultProp => defaultProp.name === prop.name);
  let defaultValue = "";
  if (value && value.defaultValue) {
    ({ defaultValue } = value);
  }

  return defaultValue.trim();
}

function getFormattedProp(
  prop: DeclarationReflection,
  defaultProps: DeclarationReflection | null,
  project: ProjectReflection
): DocumentedProp {
  const { name, comment, type } = prop;
  return {
    name,
    description: parseAndFormatComment(comment || {}),
    type: getTypeValue(type, project),
    defaultValue: getPropDefaultValue(prop, defaultProps),
  };
}

function getComponentProps(
  componentName: string,
  defaultProps: DeclarationReflection | null,
  propInterfaces: DeclarationReflection[],
  project: ProjectReflection
) {
  let propInterface = propInterfaces.find(prop => prop.name === `I${componentName}Props`);
  if (!propInterface) {
    propInterface = propInterfaces.find(prop => prop.name === `I${componentName}BaseProps`);
  }

  if (!propInterface && /AppBarNav/.test(componentName)) {
    propInterface = propInterfaces.find(prop => prop.name === "IButtonProps");
  }

  if (!propInterface) {
    throw new Error(
      `Unable to find the prop interface for ${componentName}. There needs to be a ` +
        '"I${ComponentName}Props" interface for documentation'
    );
  }

  const declaredProps: DeclarationReflection[] = [];
  const inherited: InheritedProps = {};
  propInterface.children.forEach(prop => {
    if (!prop.flags || !prop.flags.isPrivate) {
      const inheritedFrom = prop.inheritedFrom as ReferenceType | null;
      if (inheritedFrom && !inheritedFrom.name.includes(componentName)) {
        const n = inheritedFrom.name.substring(0, inheritedFrom.name.indexOf("."));
        const list = inherited[n] || [];
        if (!list.includes(prop.name)) {
          list.push(prop.name);
        }

        inherited[n] = list;
      } else {
        declaredProps.push(prop);
      }
    } else {
      // console.log("prop:", prop);
    }
  });

  const props: DocumentedProps = {
    name: propInterface.name,
    description: parseAndFormatComment(propInterface.comment || {}),
    generics: [],
    declared: declaredProps.map(prop => getFormattedProp(prop, defaultProps, project)),
    inherited,
  };

  return props;
}

function compileProject(paths: string[]) {
  const application = new Application(OPTIONS);
  const srcFiles = application.expandInputFiles(paths).filter(name => !/test/.test(name));
  console.log(
    `Converting the source files into a project...\n${paths.map(p => `- ${p}`).join("\n")}`
  );
  const project = application.convert(srcFiles);
  console.log("Done!\n");
  return project;
}
export default async function typedoc(config: ITypeDocConfig) {
  const packages = await getDocumentablePackages();
  const srcPaths = packages.map(name => path.join(PACKAGES_FOLDER, name, "src"));
  const project = compileProject(srcPaths);

  const interfaces = project.getReflectionsByKind(
    ReflectionKind.Interface
  ) as DeclarationReflection[];

  const props = interfaces.filter(intf => /^I.*(?!Default)Props/.test(intf.name));
  const classComponents = project.getReflectionsByKind(ReflectionKind.Class);
  const functionalComponents = project
    .getReflectionsByKind(ReflectionKind.Function)
    .filter(({ name }) => /^[A-Z]/.test(name) && !/Wrapper$/.test(name));

  const components = classComponents.concat(functionalComponents) as DeclarationReflection[];

  console.log("Creating component documentation...");
  const tempDir = path.join(process.cwd(), "docs");
  await fs.ensureDir(tempDir);
  await fs.emptyDir(tempDir);
  await Promise.all(
    components.map(component => {
      // workaround for the ResizeObserrver
      const name = component.name.replace(/Comp$/, "");
      const defaultProps = component.getChildByName("defaultProps") as DeclarationReflection | null;
      const documented: DocumentedComponent = {
        name,
        description: parseAndFormatComment(component.comment || {}),
        source: getSource(component),
        props: getComponentProps(name, defaultProps, props, project),
        generics: [],
      };

      const fileName = path.join(tempDir, `${name}.json`);
      return fs.writeJson(fileName, documented, { spaces: 2 });
    })
  );

  console.log("Done!\n");

  console.log("Creating base attributes documentation...");
  const additionalPaths: string[] = [];
  additionalPaths.push(path.join(TYPES_DIR, "index.d.ts"));
  const project2 = compileProject(additionalPaths);
  const attrs = project2.findReflectionByName("HTMLAttributes");
  const attrs2 = project2.findReflectionByName("React.HTMLAttributes");
  console.log("attrs:", attrs.toObject());
  // console.log("attrs2:", attrs2);
}
