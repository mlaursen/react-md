import * as React from "react";
import { kebabCase } from "lodash";

import { TextAnchor } from "components/Anchor";
import Link from "components/Link";
import { Markdown } from "components/Markdown";

import { InterfaceOrDefaultProps, ITypeParameter } from "../types.d";

export interface IInterfacesProps {
  interfaces: InterfaceOrDefaultProps[];
}

const TypeParameters: React.FunctionComponent<{ typeParameters: ITypeParameter[] }> = ({ typeParameters }) => {
  if (!typeParameters.length) {
    return null;
  }

  const parts = typeParameters.reduce<React.ReactNode[]>((stuff, param) => {
    const { name, defaultValue, type, typeReferences } = param;
    stuff.push(`${stuff.length ? ", " : ""}${name}${defaultValue ? " = " : ""}`);

    if (!defaultValue || !typeReferences.length) {
      return stuff;
    }

    const regex = new RegExp(typeReferences.join("|"));
    function step(remainingValue: string) {
      const match = remainingValue.match(regex);
      if (!match) {
        if (remainingValue) {
          stuff.push(remainingValue);
        }
        return;
      }

      const [word] = match;
      const index = match.index as number;
      const prefix = index === 0 ? "" : remainingValue.substring(0, index);
      const i = index + word.length;
      let nextRemaining = "";
      if (remainingValue.length > i) {
        nextRemaining = remainingValue.substring(i);
      }

      if (prefix) {
        stuff.push(prefix);
      }

      const section = /^I[A-Z]/.test(word) ? "interface" : "type";
      stuff.push(
        <Link
          key={word}
          to={`#${section}-${kebabCase(word)}`}
          className="definitions-page__type-parameter-link"
        >
          {word}
        </Link>
      );

      if (nextRemaining) {
        step(nextRemaining);
      }
    }

    step(defaultValue);

    return stuff;
  }, []);
  return <code className="definitions-page__type-parameters">{parts}</code>;
};

const NameWithTypeParameters: React.FunctionComponent<{ intf: InterfaceOrDefaultProps }> = ({
  intf: { name, typeParameters, typeReferences },
}) => {
  return (
    <TextAnchor id={`interface-${name}`} title={name} type="headline-4">
      {name}
      <TypeParameters typeParameters={typeParameters} />
    </TextAnchor>
  );
};

export default class Interfaces extends React.Component<IInterfacesProps> {
  public render() {
    const { interfaces } = this.props;
    if (!interfaces.length) {
      return null;
    }

    const [, textProps] = interfaces;
    return (
      <React.Fragment>
        <TextAnchor id="interfaces" title="Interfaces" type="headline-3">
          Interfaces
        </TextAnchor>
        {interfaces.map(intf => (
          <React.Fragment key={intf.name}>
            <NameWithTypeParameters intf={intf} />
            <Markdown markdown={intf.description} />
          </React.Fragment>
        ))}
      </React.Fragment>
    );
  }
}
