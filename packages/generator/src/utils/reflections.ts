import { ProjectReflection, DeclarationReflection, ReflectionKind, Reflection } from "typedoc";
import { ReferenceType } from "typedoc/dist/lib/models";

export function getExportedComponents(
  project: ProjectReflection,
  only?: ReflectionKind.Class | ReflectionKind.Function
): DeclarationReflection[] {
  let reflections: DeclarationReflection[];
  if (only) {
    reflections = project.getReflectionsByKind(only) as DeclarationReflection[];
  } else {
    reflections = project
      .getReflectionsByKind(ReflectionKind.Class)
      .concat(project.getReflectionsByKind(ReflectionKind.Function)) as DeclarationReflection[];
  }

  return reflections.filter(ref => {
    if (ref.flags.isPrivate || !/^[A-Z]/.test(ref.name)) {
      return false;
    }

    const [source] = ref.sources;
    return (
      source && (source.url || source.fileName).includes(project.name.replace(/@react-md\//, ""))
    );
  });
}

export function getComponentProps(component: DeclarationReflection, project: ProjectReflection) {
  if (component.hasComment() && component.comment.hasTag("props")) {
    const interfaceName = component.comment.getTag("props").text.trim();

    const prop = (project.findReflectionByName(interfaceName) as DeclarationReflection) || null;
    if (!prop) {
      console.log("Unable to find a props interface for `%s`.", component.name);
      console.log(
        "A `@props` tag was added, but unable to find the provided interface: `%s`",
        interfaceName
      );
      console.log();
      process.exit(1);
    }

    return prop;
  }

  const extended = component.extendedTypes.find(
    t => t.type === "reference" && (t as ReferenceType).name === "Component"
  ) as ReferenceType;
  if (extended) {
    const intf = extended.typeArguments.find(ta => ta.type === "reference") as ReferenceType;
    if (intf) {
      const prop = (project.findReflectionByName(intf.name) as DeclarationReflection) || null;
      if (!prop) {
        console.log("Unable to find a props interface for `%s`.", component.name);
        console.log(intf.toObject());
        console.log();
        process.exit(1);
      }

      return prop;
    }
  }

  console.log("Unable to find a props interface for `%s`.", component.name);
  console.log(component.toObject());
  console.log();
  process.exit(1);

  return component;
}

function getSourceFileReflection(reflection: DeclarationReflection, project: ProjectReflection) {
  const [source] = reflection.sources;
  if (source) {
    const fileName = `"${source.fileName.substring(0, source.fileName.indexOf("."))}"`;
    const sourceFile = (project.findReflectionByName(fileName) as DeclarationReflection) || null;
    if (sourceFile) {
      return sourceFile;
    }
  }

  console.log('Unable to find a source file for: "%s"', reflection.name);
  return null;
}

export function findComponentDefaultProps(
  component: DeclarationReflection,
  project: ProjectReflection
) {
  let reflection = component;
  if (component.kindOf(ReflectionKind.Function)) {
    const sourceFile = getSourceFileReflection(component, project);
    if (sourceFile) {
      reflection = sourceFile;
    }
  }

  return (reflection.findReflectionByName("defaultProps") as DeclarationReflection) || null;
}

export function getTopLevelPropTypes(project: ProjectReflection): DeclarationReflection[] {
  return getExportedComponents(project).map(component => getComponentProps(component, project));
}

export function getExportedProps(project: ProjectReflection): DeclarationReflection[] {
  const interfaces = project.getReflectionsByKind(
    ReflectionKind.Interface
  ) as DeclarationReflection[];
  const types = project.getReflectionsByKind(ReflectionKind.TypeAlias) as DeclarationReflection[];

  return interfaces.concat(types).filter(intfOrType => {
    if (intfOrType.flags && intfOrType.flags.isPrivate) {
      return false;
    }

    return intfOrType.name.includes("Props") && !intfOrType.name.includes("Default");
  });
}
