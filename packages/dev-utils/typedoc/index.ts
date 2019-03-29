import { Application, ReflectionKind, DeclarationReflection } from "typedoc";
import path from "path";
import { packagesRoot, src } from "../paths";
import { list } from "../utils";

export default function typedoc() {
  const button = path.join(packagesRoot, "button");
  const buttonSrc = path.join(button, src);
  const app = new Application({
    mode: "modules",
    // logger: "none",
    target: "es5",
    module: "commonjs",
    tsconfig: path.join(button, "tsconfig.json"),
    exclude: ["**/__tests__/**"],
  });

  const project = app.convert(app.expandInputFiles([buttonSrc]));
  if (!project) {
    console.error("Unable to create a project");
    process.exit(1);
  }

  const exports = project.getReflectionsByKind(ReflectionKind.Interface);
  const props = exports[0] as DeclarationReflection;
  console.log(props.extendedTypes);
  const references = props.extendedTypes.filter(t => t.type === "reference");
  console.log("references:", references);
  // const obj = props.toObject();
  // const { extendedTypes } = obj;
  // const references = ex
  // console.log(props.toObject().extendedTypes);
  // props.getReflectionsByKind(ReflectionKind.Variable)
  // props.
  // console.log(list(exports.map(e => e.name)));
  // app.generateJson(project, path.join(button, "tsdoc.json"));
}
