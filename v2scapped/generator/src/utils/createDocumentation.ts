import path from "path";
import { DeclarationReflection, ProjectReflection } from "typedoc";
import { ReferenceType, UnionType, ReflectionType, ReflectionKind } from "typedoc/dist/lib/models";

import { DocumentedComponent, DocumentedProp, InheritedProps } from "../types";
import { PACKAGES_FOLDER } from "../constants";

import { getFileSource } from "./getFileSource";
import { parseComment } from "./comments";
import { isReferenceType, isUnionType, isReflectionType } from "./isType";
import { getTypeValue } from "./typeFormat";

function getPropDefaultValue(
  prop: DeclarationReflection,
  defaultProps: DeclarationReflection | null
): string {
  let defaultValue = "";
  if (defaultProps) {
    const value = defaultProps.getChildByName(prop.name) as DeclarationReflection;
    if (value && value.defaultValue) {
      ({ defaultValue } = value);
    }
  }

  return defaultValue.trim();
}

function createFormattedProp(
  prop: DeclarationReflection,
  defaultProps: DeclarationReflection | null,
  project: ProjectReflection
): DocumentedProp {
  const { name, comment, type } = prop;

  return {
    name,
    description: parseComment(comment || {}),
    type: getTypeValue(type, project),
    defaultValue: getPropDefaultValue(prop, defaultProps),
  };
}

export function getComponentName(component: DeclarationReflection) {
  return component.name.replace(/Comp$/, "");
}

function findComponentProps(component: DeclarationReflection, project: ProjectReflection) {
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

function findComponentDefaultProps(component: DeclarationReflection, project: ProjectReflection) {
  let reflection = component;
  if (component.kindOf(ReflectionKind.Function)) {
    const sourceFile = getSourceFileReflection(component, project);
    if (sourceFile) {
      reflection = sourceFile;
    }
  }

  return (reflection.findReflectionByName("defaultProps") as DeclarationReflection) || null;
}

const PROP_NAMING_EXCLUDED: string[] = [];

function validateProps(
  component: DeclarationReflection,
  project: ProjectReflection,
  props: DeclarationReflection,
  defaultProps: DeclarationReflection | null
) {
  const name = getComponentName(component);
  const expectedPropsName = `I${name}Props`;
  if (props.name !== expectedPropsName && !PROP_NAMING_EXCLUDED.includes(component.name)) {
    console.log(
      "Expected a prop interface name of `%s`, but instead found `%s`",
      expectedPropsName,
      props.name
    );
    console.log("for the `%s` component.", name);
    console.log();

    console.log("If you are a contributor, just mention that a new documentation rule might need");
    console.log("to be added since this messaged appeared.");
    console.log();
  }

  const expectedDefaultPropsName = `I${name}DefaultProps`;
  if (!defaultProps && project.findReflectionByName(expectedDefaultPropsName)) {
    console.log("There was a `%s` interface defined", expectedDefaultPropsName);
    console.log("but no default props were found. This might be a mistake.");
  }
}

function createComponentProps(
  component: DeclarationReflection,
  project: ProjectReflection
): Pick<DocumentedComponent, "props" | "inherited"> {
  const props = findComponentProps(component, project);
  const defaultProps = findComponentDefaultProps(component, project);
  validateProps(component, project, props, defaultProps);

  const log =
    getComponentName(component) === "AppBarNav" ||
    (props.extendedTypes && props.extendedTypes.length > 1);
  log && console.log(getComponentName(component));
  if (log && props.extendedTypes) {
    props.extendedTypes.forEach(extendedType => {
      if (extendedType.type === "reference") {
        const type = extendedType as ReferenceType;
        console.log("type.toObject():", type.toObject());
      }
    });
  }
  log && console.log();

  if (!props.children) {
    console.log("no children", props.name);
    return { props: [], inherited: {} };
  }

  return {
    props: props.children
      .filter(prop => {
        if (props.flags && props.flags.isPrivate) {
          return false;
        }

        const from = (prop.inheritedFrom && (prop.inheritedFrom as ReferenceType)) || null;
        return !from || from.name.includes(getComponentName(component));
      })
      .map(prop => createFormattedProp(prop, defaultProps, project)),
    inherited: {},
  };
}

export function createDocumentedComponent(
  component: DeclarationReflection,
  project: ProjectReflection
): DocumentedComponent {
  const { props, inherited } = createComponentProps(component, project);

  return {
    name: getComponentName(component),
    description: parseComment(component.comment || {}),
    source: getFileSource(component),
    props,
    inherited,
    generics: [],
  };
}
