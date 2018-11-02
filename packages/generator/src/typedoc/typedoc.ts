import path from "path";
import getDocumentablePackages from "./getDocumentablePackages";
import { PACKAGES_FOLDER } from "../constants";
import { Application, ReflectionKind } from "typedoc";

const OPTIONS = {
  name: "react-md",
  mode: "modules",
  readme: false,
  excludeExternals: true,
  excludePrivate: true,
  includeDeclarations: true,
  tsConfig: path.join(PACKAGES_FOLDER, "..", "tsconfig.json"),
};

export default async function typedoc() {
  const packages = await getDocumentablePackages();
  const srcPaths = packages.map(name => path.join(PACKAGES_FOLDER, name, "src"));
  const application = new Application(OPTIONS);
  const srcFiles = application.expandInputFiles(srcPaths).filter(name => !/test/.test(name));
  const project = application.convert(srcFiles);

  console.log(project.getFullName());
  // console.log(project.toStringHierarchy());
  const externals = project.getChildrenByKind(ReflectionKind.ExternalModule);
  // const Text = externals.find(refl => refl.getFullName().endsWith('Text"'));
  // if (Text) {
  //   const sigs = Text.getChildrenByKind(ReflectionKind.Interface);
  //   console.log(sigs.map((sig) => sig.getFullName()))
  //   // const exes = Text.getChildrenByKind(ReflectionKind.ExternalModule);
  //   // console.log(exes.length);
  // }
  // console.log(Text);
  // const interfaces = project.getChildrenByKind(ReflectionKind.Interface);
  // console.log(externals.map(decl => decl.getFullName()));
}
